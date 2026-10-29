import './skeleton.css';

// 불러오는 동안 내용 자리에 보여주는 회색 상자 - 크기·모서리는 쓰는 곳에서 정한다
// 장식이라 스크린리더는 건너뛰고, "불러오는 중" 안내는 감싸는 목록(aria-busy)이 맡는다
function Skeleton({ width = '100%', height = '14px', radius = '6px' }) {
  return (
    <span
      className="skeleton"
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
