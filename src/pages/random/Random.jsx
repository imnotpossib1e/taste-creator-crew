import { useState } from 'react';
import './random.css';
import RandomHeader from './RandomHeader';
import RandomCategory from './RandomCategory';
import RandomResult from './RandomResult';
import { randomCategories } from './randomConstants';

function Random() {
  const [selectedCategory, setSelectedCategory] = useState(randomCategories[0]);

  return (
    <div className="random">
      <main>
        <RandomHeader />
        <RandomCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <RandomResult />
      </main>
    </div>
  );
}

export default Random;
