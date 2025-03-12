const User = require("../models/usersmodel");
const Order = require("../models/order");

const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;

       
        const totalAmount = products.reduce((sum, item) => sum + item.price * item.quantity, 0);


        const order = new Order({ user: userId, products, totalAmount });
        await order.save();

      
        User.orders.push(order._id);
        await User.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder};
