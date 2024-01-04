import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
  
    },
   
});

export default mongoose.model('User', UserSchema);