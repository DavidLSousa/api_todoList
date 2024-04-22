"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScryptAdaper = void 0;
const crypto_1 = require("crypto");
class ScryptAdaper {
    constructor() {
        this.KEYLEN_SCRYPT = Number(process.env.KEYLEN_SCRYPT);
    }
    hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(this.KEYLEN_SCRYPT).toString('base64');
        const derivedKey = (0, crypto_1.scryptSync)(password, salt, this.KEYLEN_SCRYPT)
            .toString('base64');
        return {
            hash: derivedKey,
            salt: salt
        };
    }
    checkPassword(password, dataPassword) {
        const derivedNewKey = (0, crypto_1.scryptSync)(password, dataPassword.salt, this.KEYLEN_SCRYPT)
            .toString('base64');
        return derivedNewKey === dataPassword.hash;
    }
}
exports.ScryptAdaper = ScryptAdaper;
