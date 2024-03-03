const VITE_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY.replace(/\\n/g, '\n');

export async function encryptWithPublicKey(data) {
  const dataStr = typeof data === 'object' ? JSON.stringify(data) : data;

  // Convertir la clave pública PEM a un formato que la Web Crypto API pueda usar
  const spkiKey = await window.crypto.subtle.importKey(
    'spki',
    convertPemToBinary(VITE_PUBLIC_KEY),
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt']
  );

  // Cifrar los datos
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    spkiKey,
    new TextEncoder().encode(dataStr)
  );

  // Convertir el resultado a Base64
  return bufferToBase64(new Uint8Array(encrypted));
}

function convertPemToBinary(pem) {
  const base64Lines = pem.split('\n').filter((line) => line.trim() && !line.includes('---'));
  const base64String = base64Lines.join('');
  const binaryDerString = atob(base64String);
  return new Uint8Array([...binaryDerString].map((char) => char.charCodeAt(0)));
}

function bufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
