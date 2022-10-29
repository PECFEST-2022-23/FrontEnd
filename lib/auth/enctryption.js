const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

const encrypt = (string) => cryptr.encrypt(string);

const decrypt = (string) => cryptr.decrypt(string);

export { encrypt, decrypt };
