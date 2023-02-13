function Categories({ value, onChangeCategory }) {
  const categories = ['All', 'Meet', 'Vegetarian', 'Grill', 'Spicy', 'Сalzone'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
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
