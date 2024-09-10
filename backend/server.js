const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const imageRoutes = require('./routes/imageRoutes');
const identityRoutes = require('./routes/identityRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', imageRoutes);
app.use('/api', identityRoutes);
app.use('/api', wishlistRoutes)

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});