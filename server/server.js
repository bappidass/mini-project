import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
 origin:  'https://mini-project-phi-ruddy.vercel.app',
}));

// app.use(cors({
//   origin:  'http://localhost:5173',
//  }));
  
app.use(express.json());

app.use('/api/products', productRoutes);



const connectDB = async () => {
  try {
      const conn = await mongoose.connect('mongodb+srv://company1:company1>@cluster0.iehhi.mongodb.net/marketplace?retryWrites=true&w=majority&appName=Cluster0');
      console.log(`MongoDB Connected: ${conn.connection.host}`);

      // Handle connection events
      mongoose.connection.on('error', err => {
          console.error(`MongoDB connection error: ${err}`);
      });

      mongoose.connection.on('disconnected', () => {
          console.log('MongoDB disconnected');
      });

      // Handle application termination
      process.on('SIGINT', async () => {
          await mongoose.connection.close();
          console.log('MongoDB connection closed through app termination');
          process.exit(0);
      });

  } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1);
  }
};



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});