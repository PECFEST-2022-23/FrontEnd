const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

const encrypt = (string) => (string == null ? null : cryptr.encrypt(string));

const decrypt = (string) => (string == null ? null : cryptr.decrypt(string));

export { encrypt, decrypt };
