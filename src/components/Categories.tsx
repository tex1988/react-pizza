import { ReactElement } from 'react';

type Props = {
  value: number,
  onChangeCategory: (id: number) => void
}

export const categoriesList: String[] = ['All', 'Meet', 'Vegetarian', 'Grill', 'Spicy', 'Combined'];

function Categories({ value, onChangeCategory }: Props): ReactElement | null {
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
}

export default Categories;
