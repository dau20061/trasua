import { useEffect, useState } from 'react';
import { categoryService } from '../services/api';
import './CategoryFilter.css';

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories([{ id: 0, name: 'Tất cả', slug: 'all' }, ...response.data]);
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="category-filter-loading">Đang tải...</div>;
  }

  return (
    <div className="category-filter">
      <div className="category-filter-container">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.slug ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
