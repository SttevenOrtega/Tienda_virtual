import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

export const createOrder = async (req, res) => {
  const { shippingInfo, paymentMethod, carrito } = req.body;
  console.log('Received order data:', req.body);

  try {
    const totalAmount = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log('Total amount:', totalAmount);

    const newOrder = new Order({
      userId: req.user.id,
      items: carrito.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        talla: item.talla,
        name: item.name,
        price: item.price,
        image: item.image,
      })),
      shippingInfo,
      paymentMethod,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    console.log('Order saved:', savedOrder);

    await Cart.findOneAndDelete({ userId: req.user.id });
    console.log('Cart cleared for user:', req.user.id);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
