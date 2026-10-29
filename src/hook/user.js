// /src/hook/user.js
import { supabase } from '../utils/superbase';

// 1. 회원 목록 조회
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('id, auth_id, nickname, profile_image, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 2. 회원 정보 조회
export async function getUser(userId) {
  if (!userId) throw new Error('사용자 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('users')
    .select('id, auth_id, nickname, profile_image, created_at, updated_at')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// 2-1. 인증 ID(auth.users.id)로 회원 정보 조회
export async function getUserByAuthId(authId) {
  if (!authId) throw new Error('인증 ID가 필요합니다.');

  const { data, error } = await supabase
    .from('users')
    .select('id, auth_id, nickname, profile_image, created_at, updated_at')
    .eq('auth_id', authId)
    .single();

  if (error) throw error;
  return data;
}

// 프로필 이미지를 Storage 버킷(profile-image)에 올리고 볼 수 있는 주소를 반환
// 폴더 첫 칸을 auth id로 해야 "내 폴더에만 업로드" 보안 정책을 걸 수 있음
export async function uploadProfileImage(file) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const authId = session?.user?.id;
  if (!authId) throw new Error('로그인이 필요합니다.');

  const ext = file.name.split('.').pop();
  const path = `${authId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from('profile-image')
    .upload(path, file, { contentType: file.type });
  if (error) throw error;

  const { data } = supabase.storage.from('profile-image').getPublicUrl(path);
  return data.publicUrl;
}

// users 행 + 로그인 이메일을 화면에서 쓰는 모양으로 변환
const toProfile = (row, email) => ({
  id: row.id,
  email,
  nickname: row.nickname,
  profileImage: row.profile_image,
});

// 현재 Supabase 세션의 사용자 프로필 (로그인 안 했으면 null)
export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  const authUser = data.session?.user;
  if (!authUser) return null;
  return toProfile(await getUserByAuthId(authUser.id), authUser.email);
}

// 로그인: 성공하면 프로필, 실패하면 Error
export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  return toProfile(await getUserByAuthId(data.user.id), data.user.email);
}

export const logOut = () => supabase.auth.signOut();

// 3. 회원 등록
export async function createUser({
  authId,
  email,
  nickname,
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
      profile_image: profileImage,
    })
    .select('id, auth_id, nickname, profile_image, created_at, updated_at')
    .single();

  if (error) throw error;
  return data;
}

// 4. 회원 정보 수정
export async function updateUser(userId, { nickname, profileImage }) {
  if (!userId) throw new Error('사용자 ID가 필요합니다.');

  const updateData = {};

  if (nickname !== undefined) updateData.nickname = nickname;
  if (profileImage !== undefined) updateData.profile_image = profileImage;

  if (Object.keys(updateData).length === 0) {
    throw new Error('수정할 회원 정보가 없습니다.');
  }

  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', userId)
    .select('id, auth_id, nickname, profile_image, created_at, updated_at')
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
