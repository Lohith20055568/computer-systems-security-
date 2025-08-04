
import AESKey from '../models/AESKey.js';
import crypto from 'crypto';

export const getOrCreateAESKey = async (req, res) => {
  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    return res.status(400).json({ message: 'Missing user1 or user2' });
  }

  const sortedUsers = [user1, user2].sort();

  try {
    let keyDoc = await AESKey.findOne({ users: sortedUsers });

    if (!keyDoc) {
      const newKey = crypto.randomBytes(32).toString('hex'); // 256-bit key
      keyDoc = new AESKey({ users: sortedUsers, key: newKey });
      await keyDoc.save();
      console.log('🔐 New AES key generated');
    }

    res.status(200).json({ key: keyDoc.key });
  } catch (err) {
    console.error('Error generating AES key:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

