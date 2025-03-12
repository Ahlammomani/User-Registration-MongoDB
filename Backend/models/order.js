const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    usersmodel: {type: mongoose.Schema.Types.ObjectId,ref: 'Uusersmodel',required: true },
    products:{type: mongoose.Schema.Types.ObjectId,ref: 'products',required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String,
  enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
