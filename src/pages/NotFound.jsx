import { useRouteError } from 'react-router-dom';

export default function NotFound() {
  // errorElement로도 쓰이므로 진짜 원인(렌더링/로딩 에러)을 콘솔에 남긴다
  const error = useRouteError();
  if (error) console.error(error);
  return <>NotFound</>;
}
