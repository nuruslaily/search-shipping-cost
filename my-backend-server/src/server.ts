import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes';
import provinceRoutes from './routes/provinceRoutes';
import cityRoutes from './routes/cityRoutes';
import costRoutes from './routes/costRoutes';

config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/provinces', provinceRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/cost', costRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

