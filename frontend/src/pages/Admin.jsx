import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { drinkService, categoryService, uploadService } from '../services/api';
import './Admin.css';

function Admin() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDrink, setEditingDrink] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [drinksRes, categoriesRes] = await Promise.all([
        drinkService.getAllDrinks(),
        categoryService.getAllCategories(),
      ]);
      setDrinks(drinksRes.data);
      setCategories(categoriesRes.data.filter(cat => cat.slug !== 'all'));
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      alert('Không thể tải dữ liệu. Vui lòng thử lại!');
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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!');
        return;
      }

      // Kiểm tra kích thước (max 30MB)
      if (file.size > 30 * 1024 * 1024) {
        alert('Kích thước ảnh không được vượt quá 30MB!');
        return;
      }

      setImageFile(file);
      
      // Tạo preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.image;

      // Nếu có file ảnh mới, upload lên server
      if (imageFile) {
        setUploading(true);
        try {
          const uploadResult = await uploadService.uploadImage(imageFile);
          // Nếu là Cloudinary URL (bắt đầu bằng https://res.cloudinary.com) thì dùng trực tiếp
          // Nếu không thì ghép với backend URL
          imageUrl = uploadResult.data.url.startsWith('https://res.cloudinary.com')
            ? uploadResult.data.url
            : `${import.meta.env.VITE_API_URL.replace('/api', '')}${uploadResult.data.url}`;
        } catch (uploadError) {
          console.error('Lỗi upload ảnh:', uploadError);
          alert('Không thể upload ảnh. Vui lòng thử lại!');
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      const drinkData = {
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price),
        isAvailable: true,
      };

      if (editingDrink) {
        await drinkService.updateDrink(editingDrink._id, drinkData);
        alert('Cập nhật món thành công!');
      } else {
        await drinkService.createDrink(drinkData);
        alert('Thêm món mới thành công!');
      }

      setShowModal(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  const handleEdit = (drink) => {
    setEditingDrink(drink);
    setFormData({
      name: drink.name,
      price: drink.price.toString(),
      image: drink.image,
      description: drink.description,
      category: drink.category,
    });
    setImagePreview(drink.image);
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (drinkId, drinkName) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${drinkName}"?`)) {
      try {
        await drinkService.deleteDrink(drinkId);
        alert('Xóa món thành công!');
        loadData();
      } catch (error) {
        console.error('Lỗi khi xóa:', error);
        alert('Không thể xóa món. Vui lòng thử lại!');
      }
    }
  };

  const handleToggleBestseller = async (drinkId) => {
    try {
      const response = await drinkService.toggleBestseller(drinkId);
      alert(response.message);
      loadData();
    } catch (error) {
      console.error('Lỗi khi cập nhật bestseller:', error);
      alert('Không thể cập nhật. Vui lòng thử lại!');
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingDrink(null);
    setImageFile(null);
    setImagePreview('');
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading) {
    return <div className="admin-loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>🛠️ Quản lý thực đơn</h1>
        <div className="admin-header-actions">
          <Link to="/admin/categories" className="btn btn-secondary">
            📂 Quản lý danh mục
          </Link>
          <button className="btn btn-primary" onClick={handleAddNew}>
            ➕ Thêm món mới
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-number">{drinks.length}</div>
          <div className="stat-label">Tổng số món</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{categories.length}</div>
          <div className="stat-label">Danh mục</div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên món</th>
              <th>Giá tiền</th>
              <th>Nhóm món</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {drinks.map((drink) => (
              <tr key={drink._id}>
                <td>
                  <img 
                    src={drink.image} 
                    alt={drink.name}
                    className="table-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                    }}
                  />
                </td>
                <td className="table-name">
                  {drink.isBestseller && <span className="bestseller-badge">⭐ Bestseller</span>}
                  {drink.name}
                </td>
                <td className="table-price">{drink.price.toLocaleString('vi-VN')}₫</td>
                <td>
                  <span className="category-badge">{drink.category}</span>
                </td>
                <td className="table-description">{drink.description}</td>
                <td className="table-actions">
                  <button 
                    className={`btn-action ${drink.isBestseller ? 'btn-bestseller active' : 'btn-bestseller'}`}
                    onClick={() => handleToggleBestseller(drink._id)}
                    title={drink.isBestseller ? 'Bỏ đánh dấu bestseller' : 'Đánh dấu bestseller'}
                  >
                    ⭐
                  </button>
                  <button 
                    className="btn-action btn-edit"
                    onClick={() => handleEdit(drink)}
                    title="Sửa"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(drink._id, drink.name)}
                    title="Xóa"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingDrink ? '✏️ Sửa món' : '➕ Thêm món mới'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="name">Tên món *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="VD: Trà sữa trân châu"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Giá tiền (VNĐ) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="1000"
                    placeholder="VD: 35000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Nhóm món *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Chọn nhóm món --</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.slug}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image">Hình ảnh *</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <label htmlFor="imageFile" className="file-input-label">
                    📁 Chọn ảnh từ máy tính
                  </label>
                  <div className="upload-info">
                    {imageFile ? (
                      <span className="file-name">✅ {imageFile.name}</span>
                    ) : (
                      <span className="file-hint">Chấp nhận: JPG, PNG, GIF, WebP, TIF (Max 30MB)</span>
                    )}
                  </div>
                </div>
                
                {imagePreview && (
                  <div className="image-preview">
                    <img 
                      src={imagePreview} 
                      alt="Preview"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200?text=Invalid+Image';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Mô tả *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Mô tả ngắn gọn về món này..."
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                  disabled={uploading}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={uploading}
                >
                  {uploading ? '⏳ Đang upload...' : (editingDrink ? '💾 Cập nhật' : '➕ Thêm món')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Admin;
