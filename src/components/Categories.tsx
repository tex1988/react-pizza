import { FC, memo, MemoExoticComponent, ReactElement } from 'react';

type CategoriesProps = {
  value: number,
  onChangeCategory: (id: number) => void
}

export const categoriesList: String[] = ['All', 'Meet', 'Vegetarian', 'Grill', 'Spicy', 'Combined'];

const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categoriesList.map((category, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
