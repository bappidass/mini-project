import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image_url: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

export default mongoose.model('Product', productSchema);