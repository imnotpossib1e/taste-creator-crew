// 서버 연결 전까지 쓰는 로컬 저장소 인증 (브라우저 localStorage)
// ponytail: 테스트용. 서버가 생기면 이 파일의 두 함수만 API 호출로 교체한다.
const USERS_KEY = 'tcc:users';
const SESSION_KEY = 'tcc:session';

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

// 비밀번호는 평문 대신 SHA-256 해시로 저장 (이메일을 salt 로 사용)
const hash = async (email, password) => {
  const bytes = new TextEncoder().encode(`${email}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const normalize = (email) => email.trim().toLowerCase();

export const getSession = () => read(SESSION_KEY, null);

export const logOut = () => localStorage.removeItem(SESSION_KEY);

// 성공하면 { ok: true }, 실패하면 { ok: false, message }
export const signUp = async ({ email, password, nickname }) => {
  const users = read(USERS_KEY, []);
  const id = normalize(email);
  if (users.some((user) => user.email === id)) {
    return { ok: false, message: '이미 가입된 이메일입니다.' };
  }
  users.push({
    email: id,
    nickname: nickname.trim(),
    passwordHash: await hash(id, password),
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { ok: true };
};

export const logIn = async ({ email, password }) => {
  const id = normalize(email);
  const user = read(USERS_KEY, []).find((u) => u.email === id);
  // 이메일 없음 / 비밀번호 틀림을 구분하지 않는다
  if (!user || user.passwordHash !== (await hash(id, password))) {
    return { ok: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: user.email, nickname: user.nickname }),
  );
  return { ok: true };
};
