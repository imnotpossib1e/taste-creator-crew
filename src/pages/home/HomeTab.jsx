import './homeTab.css';
import { tabs } from './homeConstants';

function HomeTab({ selectedTab, setSelectedTab }) {
  return (
    <div className="homeTab">
      {tabs.map(item => (
        <button
          key={item}
          onClick={() => setSelectedTab(item)}
          className={selectedTab === item ? 'active' : ''}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default HomeTab;
