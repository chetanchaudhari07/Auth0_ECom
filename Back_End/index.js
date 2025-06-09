const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const connect = require('./config/db');


const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(port, () => {
    connect()
        .then(() => console.log('Database connected'))
        .catch(err => console.error('Database connection error:', err));
    console.log(`Server is running on http://localhost:${port}`);
});
