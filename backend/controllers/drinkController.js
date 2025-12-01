import Drink from '../models/Drink.js';

// Lấy tất cả đồ uống
export const getAllDrinks = async (req, res) => {
  try {
    const { category, available } = req.query;
    
    let filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (available !== undefined) {
      filter.isAvailable = available === 'true';
    }

    const drinks = await Drink.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: drinks.length,
      data: drinks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đồ uống',
      error: error.message,
    });
  }
};

// Lấy một đồ uống theo ID
export const getDrinkById = async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    
    if (!drink) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đồ uống',
      });
    }

    res.json({
      success: true,
      data: drink,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin đồ uống',
      error: error.message,
    });
  }
};

// Tạo đồ uống mới
export const createDrink = async (req, res) => {
  try {
    const drink = await Drink.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Đồ uống đã được tạo thành công',
      data: drink,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi tạo đồ uống',
      error: error.message,
    });
  }
};

// Cập nhật đồ uống
export const updateDrink = async (req, res) => {
  try {
    const drink = await Drink.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!drink) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đồ uống',
      });
    }

    res.json({
      success: true,
      message: 'Đồ uống đã được cập nhật',
      data: drink,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi cập nhật đồ uống',
      error: error.message,
    });
  }
};

// Xóa đồ uống
export const deleteDrink = async (req, res) => {
  try {
    const drink = await Drink.findByIdAndDelete(req.params.id);

    if (!drink) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đồ uống',
      });
    }

    res.json({
      success: true,
      message: 'Đồ uống đã được xóa',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa đồ uống',
      error: error.message,
    });
  }
};

// Tìm kiếm đồ uống
export const searchDrinks = async (req, res) => {
  try {
    const { q } = req.query;
    
    const drinks = await Drink.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    });

    res.json({
      success: true,
      count: drinks.length,
      data: drinks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tìm kiếm đồ uống',
      error: error.message,
    });
  }
};
