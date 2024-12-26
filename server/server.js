import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
 origin: 'https://mini-project-phi-ruddy.vercel.app',
}));
  
app.use(express.json());

app.use('/api/products', productRoutes);


mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://company1:company1>@cluster0.iehhi.mongodb.net/marketplace?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});