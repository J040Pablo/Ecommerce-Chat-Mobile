import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: { type: String, required: true },
    sentBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;