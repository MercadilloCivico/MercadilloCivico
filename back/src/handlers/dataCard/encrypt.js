const crypto = require('crypto');
const { PRIVATE_KEY } = require('../../../config/env.config');

const encrypt = async (encryptedText) => {
  const privateKey = PRIVATE_KEY.replace(/\\n/g, '\n');
  try {
    const decryptedBuffer = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(encryptedText, 'base64')
    );

    // Intentar parsear el JSON descifrado
    const decryptedData = JSON.parse(decryptedBuffer.toString('utf-8'));
    console.log('Objeto descifrado:', decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error al descifrar:', error);
    throw new Error('Error al descifrar:', error); // o manejar el error de manera adecuada
  }
};

module.exports = encrypt;
