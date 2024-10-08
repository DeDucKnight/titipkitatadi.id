const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const imageRoutes = require('./routes/imageRoutes');
const identityRoutes = require('./routes/identityRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const sizeMetricRoutes = require('./routes/sizeMetricRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(cors());
    console.log('CORS enabled for development');
} else {
    console.log('CORS handled by NGINX in production');
}

app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', imageRoutes);
app.use('/api', identityRoutes);
app.use('/api', wishlistRoutes);
app.use('/api', sizeMetricRoutes);
app.use('/api', announcementRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});