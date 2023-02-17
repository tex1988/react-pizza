export const categoriesList = ['All', 'Meet', 'Vegetarian', 'Grill', 'Spicy', 'Combined'];

function Categories({ value, onChangeCategory }) {
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
