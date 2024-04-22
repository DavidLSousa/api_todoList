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
exports.ControllerAuth = void 0;
const auth_model_1 = require("../modules/auth/model/auth_model");
const mongodb_adapter_auth_1 = require("../modules/auth/model/mongodb_adapter_auth");
const auth_services_1 = require("../modules/auth/services/auth_services");
const jwt_adapter_1 = require("../modules/auth/services/jwt_adapter");
const encrypter_service_1 = require("../modules/encrypter/encrypter_service");
const scrypt_adapter_1 = require("../modules/encrypter/scrypt_adapter");
class ControllerAuth {
    constructor(express) {
        this.express = express;
        this.optionsCookies = {
            httpOnly: true,
            maxAge: 30 * 60 * 10000,
            samiSite: 'none',
            // secure: true
        };
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.express.getRequest().body;
            const DBAdapterAuth = new mongodb_adapter_auth_1.MongoDBApapterAuth();
            const userDB = yield new auth_model_1.ModelAuth(DBAdapterAuth).findUser(user.email);
            if (!userDB)
                return this.express
                    .sendResponse(404, { userRegistered: Boolean(userDB) });
            // Checking Password is correct
            const scryptAdapter = new scrypt_adapter_1.ScryptAdaper();
            const passwordIsValid = new encrypter_service_1.EncrypterService(scryptAdapter)
                .checkPassword(String(user.password), userDB.password);
            if (!passwordIsValid)
                return this.express.sendResponse(401, { passwordInvalid: true });
            // Get new token
            const authAdapter = new jwt_adapter_1.JWTAdapter();
            const newToken = yield new auth_services_1.AuthUser(authAdapter).auth(user.email);
            // Send Response
            this.express.sendResponseWithCookieToken(newToken, this.optionsCookies);
            this.express.sendResponse(200, { userRegistered: Boolean(userDB) });
        });
    }
    signUp() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.express.getRequest().body;
            // Checking if the user exists in the database 
            const DBAdapterAuth = new mongodb_adapter_auth_1.MongoDBApapterAuth();
            const userExists = yield new auth_model_1.ModelAuth(DBAdapterAuth).userAlreadyExists(user);
            if (userExists)
                return this.express
                    .sendResponse(422, { userRegistered: userExists });
            // Encrypting password
            const scryptAdapter = new scrypt_adapter_1.ScryptAdaper();
            const dataPassword = new encrypter_service_1.EncrypterService(scryptAdapter)
                .hashPassword(String(user.password));
            user.password = dataPassword;
            // Add User to database
            new auth_model_1.ModelAuth(DBAdapterAuth).addUser(user);
            // Getting token
            const authAdapter = new jwt_adapter_1.JWTAdapter();
            const newToken = yield new auth_services_1.AuthUser(authAdapter).auth(user.email);
            this.express.sendResponseWithCookieToken(newToken, this.optionsCookies);
            this.express.sendResponse(200, { userRegistered: userExists });
        });
    }
    verifyToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = this.express.getRequest().cookies;
            if (!token)
                return this.express.sendResponse(422, { tokenIsValid: false });
            const authAdapter = new jwt_adapter_1.JWTAdapter();
            const tokenIsValid = yield new auth_services_1.AuthUser(authAdapter).isAuth(token);
            return this.express.sendResponse(200, { tokenIsValid: Boolean(tokenIsValid) });
        });
    }
    logOut() {
        return __awaiter(this, void 0, void 0, function* () {
            this.express.sendResponseWithCookieToken('tokenInvalido', {
                httpOnly: true,
                maxAge: 10000,
                // samiSite: 'none',
                // secure: true
            });
            return this.express.sendResponse(422, { userLogout: true });
        });
    }
}
exports.ControllerAuth = ControllerAuth;
