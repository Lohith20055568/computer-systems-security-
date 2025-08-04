
import express from 'express';
import AESKey from '../models/AESKey.js';
import crypto from 'crypto';

const router = express.Router();

//  POST: Exchange AES Key between two users (user1, user2)
router.post('/exchange-key', async (req, res) => {
  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'user1 and user2 are required' });
  }

  const users = [user1, user2].sort(); //  Always sort to prevent duplicates

  try {
    let keyDoc = await AESKey.findOne({ users });

    if (!keyDoc) {
      const newKey = crypto.randomBytes(32).toString('hex'); // 256-bit AES key
      keyDoc = await AESKey.create({ users, key: newKey });
      console.log('New AES key generated and saved');
    } else {
      console.log(' AES key already exists');
    }

    return res.status(200).json({ key: keyDoc.key });
  } catch (err) {
    console.error(' AES key exchange error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
