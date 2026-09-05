/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserServiceModule = void 0;
const common_1 = __webpack_require__(4);
const user_service_controller_1 = __webpack_require__(5);
const user_service_service_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const config_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(11);
const fs = __importStar(__webpack_require__(15));
const path = __importStar(__webpack_require__(16));
let UserServiceModule = class UserServiceModule {
};
exports.UserServiceModule = UserServiceModule;
exports.UserServiceModule = UserServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const sslEnabled = config.get('DB_SSL') === 'true';
                    const certPath = path.resolve(process.cwd(), 'apps', 'user-service', 'ca.pem');
                    return {
                        type: 'postgres',
                        host: config.get('DB_HOST'),
                        port: Number(config.get('DB_PORT')),
                        username: config.get('DB_USERNAME'),
                        password: config.get('DB_PASSWORD'),
                        database: config.get('DB_NAME'),
                        ssl: sslEnabled
                            ? {
                                ca: fs.existsSync(certPath)
                                    ? fs.readFileSync(certPath, 'utf8')
                                    : undefined,
                                rejectUnauthorized: false,
                            }
                            : false,
                        autoLoadEntities: true,
                        synchronize: true,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
        ],
        controllers: [user_service_controller_1.UserServiceController],
        providers: [user_service_service_1.UserServiceService],
    })
], UserServiceModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserServiceController = void 0;
const common_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(2);
const user_service_service_1 = __webpack_require__(6);
const create_user_dto_1 = __webpack_require__(12);
const login_dto_1 = __webpack_require__(13);
let UserServiceController = class UserServiceController {
    userServiceService;
    constructor(userServiceService) {
        this.userServiceService = userServiceService;
    }
    getHello() {
        return this.userServiceService.getHello();
    }
    getUserHealth() {
        return this.userServiceService.getHello();
    }
    createUser(user) {
        return this.userServiceService.createuser(user);
    }
    loginUser(data) {
        return this.userServiceService.loginUser(data.email ?? '', data.password ?? '');
    }
    editProfile(data) {
        return this.userServiceService.editProfile(data.id, data.updates);
    }
    verifyEmail(data) {
        return this.userServiceService.sendEmailVerification(data.email);
    }
    findOrganizers(filter) {
        return this.userServiceService.findOrganizers(filter);
    }
    getUserById(data) {
        return this.userServiceService.getUserById(data.id);
    }
    getPublicUserProfile(data) {
        return this.userServiceService.getPublicUserProfile(data.id);
    }
};
exports.UserServiceController = UserServiceController;
__decorate([
    (0, common_1.Get)(),
    (0, microservices_1.MessagePattern)('user.getHello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserServiceController.prototype, "getHello", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserServiceController.prototype, "getUserHealth", null);
__decorate([
    (0, common_1.Post)('create-user'),
    (0, microservices_1.MessagePattern)('user.create-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserServiceController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, microservices_1.MessagePattern)('user.login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserServiceController.prototype, "loginUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.edit-profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserServiceController.prototype, "editProfile", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.verify-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserServiceController.prototype, "verifyEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.find-organizers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserServiceController.prototype, "findOrganizers", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.get-by-id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserServiceController.prototype, "getUserById", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.get-public-profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserServiceController.prototype, "getPublicUserProfile", null);
exports.UserServiceController = UserServiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_service_1.UserServiceService !== "undefined" && user_service_service_1.UserServiceService) === "function" ? _a : Object])
], UserServiceController);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserServiceService = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(7);
const bcrypt = __importStar(__webpack_require__(8));
const jwt = __importStar(__webpack_require__(9));
const typeorm_2 = __webpack_require__(10);
const user_entity_1 = __webpack_require__(11);
let UserServiceService = class UserServiceService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getHello() {
        return 'Hello World!';
    }
    async createuser(createUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password ?? '', 10);
        const newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return await this.userRepository.save(newUser);
    }
    async loginUser(email, password) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (!existingUser) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const secret = process.env.JWT_SECRET || 'AAshinamBhasnamKratitanamadharamsathram';
        const token = jwt.sign({
            sub: existingUser.id,
            email: existingUser.email,
        }, secret, { expiresIn: '1h' });
        return {
            message: 'Login Successful',
            token,
        };
    }
    async editProfile(userId, updates) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const { email, password, ...allowedUpdates } = updates;
        if (password) {
            allowedUpdates.password = await bcrypt.hash(password, 10);
        }
        Object.assign(user, allowedUpdates);
        return await this.userRepository.save(user);
    }
    async sendEmailVerification(email) {
        const brevoApiKey = process.env.BREVO_API_KEY;
        const appUrl = process.env.APP_URL || 'http://localhost:3000';
        const secret = process.env.JWT_SECRET || 'AAshinamBhasnamKratitanamadharamsathram';
        if (!brevoApiKey) {
            throw new Error('Brevo API key is not configured');
        }
        const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
        const verificationLink = `${appUrl}/verify-email?token=${token}`;
        const fetchFn = globalThis.fetch;
        if (!fetchFn) {
            throw new Error('Global fetch is not available in this runtime');
        }
        await fetchFn('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': brevoApiKey,
            },
            body: JSON.stringify({
                sender: { email: process.env.BREVO_SENDER_EMAIL ?? 'no-reply@example.com' },
                to: [{ email }],
                subject: 'Verify your email',
                htmlContent: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
            }),
        });
        return {
            message: 'Verification email queued',
            verificationLink,
        };
    }
    async findOrganizers(filter) {
        const query = this.userRepository.createQueryBuilder('user');
        query.where('user.role = :role', { role: 'organizer' });
        if (filter.state) {
            query.andWhere('user.state = :state', { state: filter.state });
        }
        if (filter.city) {
            query.andWhere('user.city = :city', { city: filter.city });
        }
        if (filter.category) {
            query.andWhere('user.category = :category', { category: filter.category });
        }
        if (filter.t) {
            query.andWhere('(user.name ILIKE :t OR user.about ILIKE :t OR user.category ILIKE :t)', { t: `%${filter.t}%` });
        }
        return await query.getMany();
    }
    async getUserById(userId) {
        return await this.userRepository.findOne({
            where: { id: userId },
        });
    }
    async getPublicUserProfile(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const { password, ...rest } = user;
        return {
            ...rest,
            phoneNumber: user.contactHidden ? null : user.phoneNumber ?? null,
        };
    }
};
exports.UserServiceService = UserServiceService;
exports.UserServiceService = UserServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserServiceService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(10);
let User = class User {
    id;
    email;
    password;
    name;
    category;
    age;
    state;
    city;
    about;
    phoneNumber;
    address;
    reviews;
    posts;
    emailVerified;
    emailHidden;
    contactHidden;
    role;
    isActive;
    isVerified;
    createdAt;
    updatedAt;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "emailHidden", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "contactHidden", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
class CreateUserDto {
    email;
    password;
    name;
    category;
    age;
    role;
}
exports.CreateUserDto = CreateUserDto;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(2);
const user_service_module_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
async function bootstrap() {
    process.title = 'user';
    const logger = new common_1.Logger('UserBootstrap');
    const port = process.env.userPort ? parseInt(process.env.userPort, 10) : 3002;
    const rmqUrl = process.env.rabbitmq ?? "amqp://localhost:5672";
    const queue = process.env.user_queue ?? "user_queue";
    const app = await core_1.NestFactory.createMicroservice(user_service_module_1.UserServiceModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [rmqUrl],
            socketOptions: { heartbeat: 60 },
            queue,
            queueOptions: {
                durable: false
            }
        }
    });
    app.enableShutdownHooks();
    await app.listen();
    logger.log(`User service is running on ${port} from rabbit maq`);
}
bootstrap();

})();

/******/ })()
;