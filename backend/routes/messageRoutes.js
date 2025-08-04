// routes/messageRoutes.js

import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// 🔹 Save a new message
router.post('/send', async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = new Message({
      sender,
      receiver,
      text,
      timestamp: new Date()
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully' });

  } catch (error) {
    console.error('❌ Error saving message:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 Get chat history between two users
router.get('/history', async (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'Missing users in query' });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error('❌ Error fetching chat history:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
