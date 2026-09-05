/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/gateway/src/api-key.guard.ts"
/*!*******************************************!*\
  !*** ./apps/gateway/src/api-key.guard.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiKeyGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let ApiKeyGuard = class ApiKeyGuard {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'] ?? request.headers['X-Api-Key'];
        const expectedApiKey = this.configService.get('API_KEY') ?? process.env.API_KEY;
        if (!expectedApiKey) {
            throw new common_1.UnauthorizedException('API key is not configured');
        }
        if (apiKey !== expectedApiKey) {
            throw new common_1.UnauthorizedException('Invalid API key');
        }
        return true;
    }
};
exports.ApiKeyGuard = ApiKeyGuard;
exports.ApiKeyGuard = ApiKeyGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ApiKeyGuard);


/***/ },

/***/ "./apps/gateway/src/gateway.controller.ts"
/*!************************************************!*\
  !*** ./apps/gateway/src/gateway.controller.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const gateway_service_1 = __webpack_require__(/*! ./gateway.service */ "./apps/gateway/src/gateway.service.ts");
const api_key_guard_1 = __webpack_require__(/*! ./api-key.guard */ "./apps/gateway/src/api-key.guard.ts");
let GatewayController = class GatewayController {
    gatewayService;
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    getHello() {
        return this.gatewayService.getServiceHealth();
    }
    getServiceHealth() {
        return this.gatewayService.getServiceHealth();
    }
    getUserHealth() {
        return this.gatewayService.getUserHealth();
    }
    getUserHello() {
        return this.gatewayService.getUserHello();
    }
    getUserById(id) {
        return this.gatewayService.getUserById(id);
    }
    editUserProfile(id, updates) {
        return this.gatewayService.editUserProfile(id, updates);
    }
    verifyEmail(body) {
        return this.gatewayService.verifyEmail(body.email);
    }
    findOrganizers(state, city, category, t) {
        return this.gatewayService.findOrganizers({ state, city, category, t });
    }
    createUser(user) {
        return this.gatewayService.createUser(user);
    }
    loginUser(data) {
        return this.gatewayService.loginUser(data);
    }
};
exports.GatewayController = GatewayController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], GatewayController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('service-health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], GatewayController.prototype, "getServiceHealth", null);
__decorate([
    (0, common_1.Get)('user-health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], GatewayController.prototype, "getUserHealth", null);
__decorate([
    (0, common_1.Get)('user-hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], GatewayController.prototype, "getUserHello", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], GatewayController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)('user/:id/profile'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], GatewayController.prototype, "editUserProfile", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], GatewayController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Get)('organizers'),
    __param(0, (0, common_1.Query)('state')),
    __param(1, (0, common_1.Query)('city')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('t')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], GatewayController.prototype, "findOrganizers", null);
__decorate([
    (0, common_1.Post)('create-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], GatewayController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], GatewayController.prototype, "loginUser", null);
exports.GatewayController = GatewayController = __decorate([
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof gateway_service_1.GatewayService !== "undefined" && gateway_service_1.GatewayService) === "function" ? _a : Object])
], GatewayController);


/***/ },

/***/ "./apps/gateway/src/gateway.module.ts"
/*!********************************************!*\
  !*** ./apps/gateway/src/gateway.module.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const gateway_controller_1 = __webpack_require__(/*! ./gateway.controller */ "./apps/gateway/src/gateway.controller.ts");
const gateway_service_1 = __webpack_require__(/*! ./gateway.service */ "./apps/gateway/src/gateway.service.ts");
const api_key_guard_1 = __webpack_require__(/*! ./api-key.guard */ "./apps/gateway/src/api-key.guard.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule;
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            microservices_1.ClientsModule.register([
                {
                    name: 'Service Client',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [process.env.rabbitmq ?? 'amqp://localhost:5672'],
                        queue: process.env.service ?? 'service',
                        queueOptions: { durable: false },
                    },
                },
                {
                    name: 'User Client',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [process.env.rabbitmq ?? 'amqp://localhost:5672'],
                        queue: process.env.user_queue ?? 'user_queue',
                        queueOptions: { durable: false },
                    },
                },
            ]),
        ],
        controllers: [gateway_controller_1.GatewayController],
        providers: [gateway_service_1.GatewayService, api_key_guard_1.ApiKeyGuard],
    })
], GatewayModule);


/***/ },

/***/ "./apps/gateway/src/gateway.service.ts"
/*!*********************************************!*\
  !*** ./apps/gateway/src/gateway.service.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let GatewayService = class GatewayService {
    serviceClient;
    userClient;
    constructor(serviceClient, userClient) {
        this.serviceClient = serviceClient;
        this.userClient = userClient;
    }
    async getServiceHealth() {
        const response = await (0, rxjs_1.firstValueFrom)(this.serviceClient.send('service.health', {}));
        return response;
    }
    async getUserHealth() {
        const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.health', {}));
        return response;
    }
    async getUserHello() {
        const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.getHello', {}));
        return response;
    }
    async createUser(user) {
        const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.create-user', user));
        return response;
    }
    async loginUser(data) {
        const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.login', data));
        return response;
    }
    async getUserById(id) {
        const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.get-public-profile', { id }));
        return response;
    }
    async editUserProfile(id, updates) {
        const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.edit-profile', { id, updates }));
        return response;
    }
    async verifyEmail(email) {
        const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.verify-email', { email }));
        return response;
    }
    async findOrganizers(filter) {
        const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send('user.find-organizers', filter));
        return response;
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('Service Client')),
    __param(1, (0, common_1.Inject)('User Client')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientRMQ !== "undefined" && microservices_1.ClientRMQ) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientRMQ !== "undefined" && microservices_1.ClientRMQ) === "function" ? _b : Object])
], GatewayService);


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/microservices"
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
(module) {

module.exports = require("@nestjs/microservices");

/***/ },

/***/ "dotenv/config"
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
(module) {

module.exports = require("dotenv/config");

/***/ },

/***/ "rxjs"
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
(module) {

module.exports = require("rxjs");

/***/ }

/******/ 	});
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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
/*!**********************************!*\
  !*** ./apps/gateway/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const gateway_module_1 = __webpack_require__(/*! ./gateway.module */ "./apps/gateway/src/gateway.module.ts");
async function bootstrap() {
    process.title = 'gateway';
    const logger = new common_1.Logger('GatewayBootstrap');
    const port = parseInt(process.env.gateWay || '3001', 10);
    const app = await core_1.NestFactory.create(gateway_module_1.GatewayModule);
    app.enableShutdownHooks();
    app.enableCors();
    await app.listen(port);
    logger.log(`Gateway is running on http://localhost:${port}`);
}
bootstrap();

})();

/******/ })()
;