import { supabase } from '../utils/superbase';
import { ensureRestaurant } from './restaurant';

// 내 북마크 목록 - 최신순 (저장 탭용)
export async function getMyBookmarks(userId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('id, place_id, place_name, content, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// insert
export async function insertBookmark({ userId, placeId, placeName, content }) {
  await ensureRestaurant({ placeId, placeName });

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
