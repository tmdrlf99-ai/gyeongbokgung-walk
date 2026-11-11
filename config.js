// 함께 걷기(실시간 접속) 설정
// Supabase 프로젝트의 URL과 anon public 키를 넣으면 같은 주소로 접속한 사람끼리 서로 보입니다.
// 비워 두면 혼자 걷기 모드로 동작합니다. (README.md 3단계 참고)
window.GBG_CONFIG = {
  supabaseUrl: '',        // 예: 'https://abcdefgh.supabase.co'
  supabaseAnonKey: '',    // 예: 'eyJhbGciOi...' (anon public 키. service_role 키는 절대 넣지 마세요)
  roomName: 'gyeongbokgung-walk'
};
