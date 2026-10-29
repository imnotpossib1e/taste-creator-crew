import { Bookmark } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookmarkSheet from '../storeDetail/BookmarkSheet';
import { useBookmark } from '../../hook/useBookmark';
import { selectIsRestaurantLoaded } from '../../redux/store';
import Skeleton from '../../components/Skeleton';
import './rankingList.css';

// 순위 숫자를 진하게 보여줄 상위 등수
const TOP_RANK = 3;

// 순위 한 줄 - 가게 정보를 누르면 상세(/store/:id)로 이동, 오른쪽은 북마크 버튼
// 북마크 버튼은 링크 밖에 둔다 (링크 안에 있으면 북마크를 눌러도 이동해 버림)
function RankingItem({ store, rank, isSaved, onBookmarkClick }) {
  return (
    <li className="rankingItem">
      <span className={rank <= TOP_RANK ? 'rankingRank top' : 'rankingRank'}>
        {rank}
      </span>

      <Link to={`/store/${store.id}`} className="rankingInfo">
        <div className="rankingTitle">
          <div className="rankingThumb" />
          <strong>{store.name}</strong>
        </div>
        <p>
          <span>{store.category_group}</span>
          <span>
            별점 {store.rating_avg.toFixed(1)} 리뷰 {store.review_count}
          </span>
        </p>
      </Link>

      <button
        type="button"
        className="rankingBookmark"
        aria-label={`${store.name} 저장`}
        aria-pressed={isSaved}
        onClick={() => onBookmarkClick(store)}
      >
        <Bookmark
          size={24}
          fill={isSaved ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
      </button>
    </li>
  );
}

// 가게 목록을 불러오는 동안 - 순위 줄(동그라미 + 이름·정보 + 북마크) 모양으로 5줄
function RankingListSkeleton() {
  return (
    <ol
      className="rankingList"
      aria-busy="true"
      aria-label="인기 순위 불러오는 중"
    >
      {[1, 2, 3, 4, 5].map(n => (
        <li key={n} className="rankingItem">
          <Skeleton width="30px" height="30px" radius="50%" />
          <div className="rankingInfo">
            <Skeleton width="50%" height="16px" />
            <Skeleton width="70%" height="13px" />
          </div>
          <Skeleton width="24px" height="24px" />
        </li>
      ))}
    </ol>
  );
}

function RankingList({ restaurants, sortBy }) {
  const isLoaded = useSelector(selectIsRestaurantLoaded);
  // 홈/상세와 같은 북마크 로직 - 빈 아이콘은 저장, 채워진 아이콘은 저장 취소
  const {
    savedIds,
    sheetStore,
    handleBookmarkClick,
    closeSheet,
    saveBookmark,
  } = useBookmark();
  // redux 원본이 바뀌지 않도록 복사한 뒤 정렬
  const sortedStores = [...restaurants].sort((a, b) => b[sortBy] - a[sortBy]);

  if (!isLoaded) {
    return <RankingListSkeleton />;
  }

  if (sortedStores.length === 0) {
    return <p className="rankingEmpty">아직 등록된 가게가 없어요.</p>;
  }

  return (
    <>
      <ol className="rankingList">
        {sortedStores.map((store, index) => (
          <RankingItem
            key={store.id}
            store={store}
            rank={index + 1}
            isSaved={savedIds.includes(store.id)}
            onBookmarkClick={handleBookmarkClick}
          />
        ))}
      </ol>

      {sheetStore && (
        <BookmarkSheet
          restaurant={sheetStore}
          onClose={closeSheet}
          onSave={saveBookmark}
        />
      )}
    </>
  );
}

export default RankingList;
