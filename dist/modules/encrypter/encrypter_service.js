"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncrypterService = void 0;
class EncrypterService {
    constructor(encrypter) {
        this.encrypter = encrypter;
    }
    hashPassword(password) {
        try {
            return this.encrypter.hashPassword(password);
        }
        catch (error) {
            return error.message;
        }
    }
    checkPassword(password, dataPassword) {
        try {
            return this.encrypter.checkPassword(password, dataPassword);
        }
        catch (error) {
            return error.message;
        }
    }
}
exports.EncrypterService = EncrypterService;
