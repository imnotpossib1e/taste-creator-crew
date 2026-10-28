import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  // 로그인 세션을 localStorage 대신 sessionStorage에 저장 (탭 닫으면 로그아웃)
  auth: { storage: window.sessionStorage },
});
