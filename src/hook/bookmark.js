import { supabase } from '../utils/superbase';
import { ensureRestaurant } from './restaurant';
// 내 북마크 목록 - 최신순 (저장 탭용)
// select('*')라 bookmarks 행의 모든 컬럼(종류 컬럼 포함)이 그대로 온다
export async function getMyBookmarks(userId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// bookmarks 테이블에 종류 컬럼이 없어서, 저장할 때 가게 종류를 브라우저에 기억해 마이페이지 이미지에 쓴다
const CATEGORY_KEY = 'bookmarkCategory';

export function readBookmarkCategories() {
  try {
    return JSON.parse(localStorage.getItem(CATEGORY_KEY)) ?? {};
  } catch {
    return {};
  }
}

export function rememberBookmarkCategory(placeId, category) {
  try {
    const map = readBookmarkCategories();
    if (category) map[placeId] = category;
    else delete map[placeId];
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(map));
  } catch {
    // 저장소를 못 써도 이미지만 기본값이 될 뿐이라 무시
  }
}

// insert
export async function insertBookmark({ userId, placeId, placeName, content }) {
  await ensureRestaurant({ placeId });

  const { data, error } = await supabase
    .from('bookmarks')
    .insert([
      {
        user_id: userId,
        place_id: placeId,
        place_name: placeName,
        content,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

// update - 북마크 메모 수정
export async function updateBookmark(bookmarkId, { content }) {
  const { data, error } = await supabase
    .from('bookmarks')
    .update({ content })
    .eq('id', bookmarkId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// delete
export async function deleteBookmark(bookmarkId) {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkId);

  if (error) throw error;
}

// delete - 가게 기준으로 내 북마크 삭제 (홈처럼 북마크 id 없이 가게만 알 때)
// RLS에 막히면 에러 없이 0건이 지워져서, 지워진 행이 없으면 실패로 본다
export async function deleteBookmarkByPlace({ userId, placeId }) {
  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('place_id', placeId)
    .select('id');

  if (error) throw error;
  if (data.length === 0) throw new Error('삭제된 북마크가 없어요.');
}
