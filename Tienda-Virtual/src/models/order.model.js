import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  shippingInfo: {
    email: { type: String, required: true },
    novedades: { type: Boolean, default: false },
    pais: { type: String, required: true },
    region: { type: String, required: true },
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    cedula: { type: String, required: true },
    address: { type: String, required: true },
    referencias: { type: String },
    city: { type: String, required: true },
    departamento: { type: String, required: true },
    postalCode: { type: String, required: true },
    telefono: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
