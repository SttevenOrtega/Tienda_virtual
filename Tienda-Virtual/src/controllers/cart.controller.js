import Cart from '../models/cart.model.js';
import Product from '../models/product.js';

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) {
      cart = { items: [] };
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity, talla } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId) && item.talla === talla);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          talla
        });
      }
      cart = await cart.save();
    } else {
      cart = await Cart.create({
        userId: req.user.id,
        items: [{
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          talla
        }]
      });
    }

    cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId'); // Populate después de guardar
    res.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId, talla } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = cart.items.filter(item => !(item.productId.equals(productId) && item.talla === talla));
      await cart.save();
      const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
      return res.json(updatedCart);
    }
    res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: error.message });
  }
};
