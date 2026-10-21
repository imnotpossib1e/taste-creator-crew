import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // registerType: PWA 등록 방식을 설정
      // 'autoUpdate'로 설정하면 서비스 워커가 자동으로 업데이트됨
      registerType: "autoUpdate",
      // manifest: 웹앱의 메타정보 설정 (홈 화면에 표시될 이름, 아이콘 등)
      manifest: {
        // 앱의 전체 이름 (설치 후 앱 이름으로 표시됨)
        name: "My App",

        // 앱 이름이 길 경우 짧게 줄여서 표시
        short_name: "App",

        // 앱이 시작될 URL (일반적으로 루트 경로로 설정)
        start_url: "/",

        // 앱의 실행 형태 (standalone: 앱처럼 보이도록 브라우저 UI 제거)
        display: "standalone",

        // 배경 색상 (앱이 로딩될 때 표시됨)
        background_color: "#ffffff",

        // 브라우저 주소창, 툴바의 테마 색상
        theme_color: "#42b983",

        // 홈 화면에 추가될 아이콘들
        icons: [
          {
            // 아이콘 이미지 경로 (public 폴더에 있어야 함)
            src: "icon.png",
            // 이미지 크기 (픽셀 단위)
            sizes: "192x192",
            // 이미지 타입
            type: "image/png",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
