import Purchase from '../models/purchase.model.js';

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id });
    res.json(purchases);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPurchase = async (req, res) => {
  try {
    const { items, total, address } = req.body;
    const newPurchase = new Purchase({
      user: req.user.id,
      items,
      total,
      address
    });
    await newPurchase.save();
    res.json(newPurchase);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
