const Order = require('../models/Orders');

module.exports.createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const order = await Order.create(orderData);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Could not create the order' });
    }
};