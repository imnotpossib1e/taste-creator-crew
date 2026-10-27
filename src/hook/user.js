// /src/hook/user.js
import { supabase } from '../utils/superbase';

// 1. 회원 목록 조회
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('id, auth_id, nickname, category, profile_image, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 2. 회원 정보 조회
export async function getUser(userId) {
  if (!userId) throw new Error('사용자 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('users')
    .select('id, auth_id, nickname, category, profile_image, created_at, updated_at')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// 3. 회원 등록
export async function createUser({
  authId,
  email,
  nickname,
  category = null,
  profileImage = null,
}) {
  if (!authId || !email || !nickname) {
    throw new Error('인증 ID, 이메일, 닉네임은 필수입니다.');
  }

  const { data, error } = await supabase
    .from('users')
    .insert({
      auth_id: authId,
      email,
      nickname,
      category,
      profile_image: profileImage,
    })
    .select('id, auth_id, nickname, category, profile_image, created_at, updated_at')
    .single();

  if (error) throw error;
  return data;
}

// 4. 회원 정보 수정
export async function updateUser(userId, {
  nickname,
  category,
  profileImage,
}) {
  if (!userId) throw new Error('사용자 ID가 필요합니다.');

  const updateData = {};

  if (nickname !== undefined) updateData.nickname = nickname;
  if (category !== undefined) updateData.category = category;
  if (profileImage !== undefined) updateData.profile_image = profileImage;

  if (Object.keys(updateData).length === 0) {
    throw new Error('수정할 회원 정보가 없습니다.');
  }

  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', userId)
    .select('id, auth_id, nickname, category, profile_image, created_at, updated_at')
    .single();

  if (error) throw error;
  return data;
}

// 5. 회원 삭제
export async function deleteUser(userId) {
  if (!userId) throw new Error('사용자 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)
    .select('id')
    .single();

  if (error) throw error;
  return data;
}