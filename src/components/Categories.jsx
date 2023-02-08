import { useState } from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ['All', 'Meet', 'Vegetarian', 'Grill', 'Spicy', 'Сalzone'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
