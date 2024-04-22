"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBApapterAuth = void 0;
const mongodb_1 = require("mongodb");
const users_1 = require("../../../entities/users");
class MongoDBApapterAuth {
    constructor() {
        this.PASSWORD_BD = process.env.PASSWORD_BD;
        this.USER_BD = process.env.USER_BD;
        this.urlConnectionBD = `mongodb+srv://${this.USER_BD}:${this.PASSWORD_BD}@users.kodntjx.mongodb.net/?retryWrites=true&w=majority`;
        this.client = new mongodb_1.MongoClient(this.urlConnectionBD);
        this.db = 'userData';
        this.collection = 'users';
    }
    // USERS
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = this.client.db(this.db);
                const users = database.collection(this.collection);
                return yield users.findOne({ email: email });
            }
            catch (error) {
                throw new Error('Não foi possivel achar no BD');
            }
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name } = user;
                const newUser = new users_1.User(name, email, password);
                const database = this.client.db(this.db);
                const users = database.collection(this.collection);
                yield users.insertOne(newUser);
            }
            catch (error) {
                throw new Error('Não foi add user ao BD');
            }
        });
    }
    userAlreadyExists(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = user;
                const database = this.client.db(this.db);
                const users = database.collection(this.collection);
                const userExists = yield users.findOne({ email: email });
                return userExists ? true : false;
            }
            catch (error) {
                throw new Error('Não foi possivel achar no BD');
            }
        });
    }
}
exports.MongoDBApapterAuth = MongoDBApapterAuth;
