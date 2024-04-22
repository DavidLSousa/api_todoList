"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTAdapter {
    constructor() {
        this.secret = String(process.env.SECRET);
        this.exp = '1d';
    }
    sign(email) {
        try {
            return jsonwebtoken_1.default.sign({ email }, this.secret, { expiresIn: this.exp });
        }
        catch (error) {
            throw new Error('ERRO na criação do token');
        }
    }
    verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.JWTAdapter = JWTAdapter;
