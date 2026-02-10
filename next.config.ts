/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 1. 정적 파일로 내보내기 설정 (필수)

  // 2. 깃허브 레포지토리 이름이 'Wordrobe' (대소문자 일치)
  // basePath를 설정하면 자동으로 자산/링크 앞에 붙습니다.
  basePath: "/Wordrobe",

  // assetPrefix는 basePath가 있으면 보통 불필요하며, 잘못 설정 시 문제 발생 가능. 삭제.

  // 3. 이미지 최적화 끄기 (Next Image는 서버 없이 작동 안 함)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
