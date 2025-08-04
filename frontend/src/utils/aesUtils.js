// // 📁 utils/aesUtils.js
// import CryptoJS from 'crypto-js';

// const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte key
// const iv = CryptoJS.enc.Utf8.parse('6543210987654321');  // 16-byte IV

// export const encryptMessage = (message) => {
//   const encrypted = CryptoJS.AES.encrypt(message, key, {
//     iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return encrypted.toString(); // 📌 base64 encoded
// };

// export const decryptMessage = (ciphertext) => {
//   try {
//     const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
//       iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     return decrypted.toString(CryptoJS.enc.Utf8); // 📌 readable string
//   } catch (err) {
//     console.error('❌ AES decryption failed:', err.message);
//     return '[DECRYPTION ERROR]';
//   }
// };
import CryptoJS from 'crypto-js';

export const encryptMessage = (message, keyHex) => {
  const key = CryptoJS.enc.Hex.parse(keyHex); // 🔐 key from server
  const iv = CryptoJS.enc.Utf8.parse('6543210987654321'); // keep fixed or change if you want

  const encrypted = CryptoJS.AES.encrypt(message, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};

export const decryptMessage = (ciphertext, keyHex) => {
  try {
    const key = CryptoJS.enc.Hex.parse(keyHex);
    const iv = CryptoJS.enc.Utf8.parse('6543210987654321');

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error('❌ AES decryption failed:', err.message);
    return '[DECRYPT ERROR]';
  }
};
