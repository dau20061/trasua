import { useState, useEffect } from 'react';
import { categoryService } from '../services/api';
import './CategoryManagement.css';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    description: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data.filter(cat => cat.slug !== 'all'));
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
      alert('Không thể tải danh mục. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, formData);
        alert('Cập nhật danh mục thành công!');
      } else {
        await categoryService.createCategory(formData);
        alert('Thêm danh mục mới thành công!');
      }

      setShowModal(false);
      resetForm();
      loadCategories();
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      description: category.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (window.confirm(`Bạn có chắc muốn xóa danh mục "${categoryName}"?\n\nLưu ý: Các món thuộc danh mục này sẽ không bị xóa.`)) {
      try {
        await categoryService.deleteCategory(categoryId);
        alert('Xóa danh mục thành công!');
        loadCategories();
      } catch (error) {
        console.error('Lỗi khi xóa:', error);
        alert('Không thể xóa danh mục. Vui lòng thử lại!');
      }
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      icon: '',
      description: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading) {
    return <div className="category-loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="category-management">
      <div className="category-header">
        <h1>📂 Quản lý danh mục</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          ➕ Thêm danh mục mới
        </button>
      </div>

      <div className="category-stats">
        <div className="stat-card">
          <div className="stat-number">{categories.length}</div>
          <div className="stat-label">Tổng danh mục</div>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-slug">/{category.slug}</p>
            {category.description && (
              <p className="category-description">{category.description}</p>
            )}
            <div className="category-actions">
              <button 
                className="btn-action btn-edit"
                onClick={() => handleEdit(category)}
                title="Sửa"
              >
                ✏️ Sửa
              </button>
              <button 
                className="btn-action btn-delete"
                onClick={() => handleDelete(category._id, category.name)}
                title="Xóa"
              >
                🗑️ Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? '✏️ Sửa danh mục' : '➕ Thêm danh mục mới'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label htmlFor="name">Tên danh mục *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="VD: Trà sữa"
                />
              </div>

              <div className="form-group">
                <label htmlFor="slug">Slug (URL) *</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="tra-sua"
                  pattern="[a-z0-9-]+"
                  title="Chỉ chấp nhận chữ thường, số và dấu gạch ngang"
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                  Tự động tạo từ tên danh mục
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="icon">Icon (Emoji) *</label>
                <div className="emoji-selector">
                  {['🧋', '☕', '🍹', '🥤', '🍰', '🍵', '🥛', '🍊', '🍓', '🍋', '🥝', '🍑', '🍇', '🍉', '🍌'].map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      className={`emoji-btn ${formData.icon === emoji ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, icon: emoji }))}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  required
                  placeholder="🧋"
                  maxLength="2"
                  style={{ marginTop: '10px' }}
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                  Chọn emoji phía trên hoặc nhập emoji tùy chỉnh
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Mô tả ngắn về danh mục này..."
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  {editingCategory ? '💾 Cập nhật' : '➕ Thêm danh mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManagement;
