const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const port = 4018;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/b18/users', userRoutes);
app.use('/b18/products', productRoutes);
app.use('/b18/orders', orderRoutes);

mongoose.connect("mongodb+srv://kylhrmys:admin123@course-booking.bnldhbv.mongodb.net/s49-s53?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


mongoose.connection.once('open', () => console.log('You are now connected to MongoDB Atlas'));

if (require.main === module) {
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now running on port ${process.env.PORT || port}`)
    })
}

module.exports = { app, mongoose };