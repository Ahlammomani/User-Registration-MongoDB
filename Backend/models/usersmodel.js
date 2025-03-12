const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]

});

const user = mongoose.model("user", userSchema);
module.exports = user;