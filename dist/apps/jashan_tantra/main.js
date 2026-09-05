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
exports.AppModule = void 0;
const common_1 = __webpack_require__(4);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const event_controller_1 = __webpack_require__(7);
const event_service_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(9);
const config_1 = __webpack_require__(14);
const fs = __importStar(__webpack_require__(15));
const path = __importStar(__webpack_require__(16));
const event_entity_1 = __webpack_require__(11);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
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
            typeorm_1.TypeOrmModule.forFeature([event_entity_1.Event]),
        ],
        controllers: [app_controller_1.AppController, event_controller_1.EventController],
        providers: [app_service_1.AppService, event_service_1.EventService],
    })
], AppModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(2);
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getServiceHealth() {
        return this.appService.getHello();
    }
    getServiceHello() {
        return this.appService.getHello();
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)('service.health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getServiceHealth", null);
__decorate([
    (0, microservices_1.MessagePattern)('service.getHello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getServiceHello", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(4);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventController = void 0;
const common_1 = __webpack_require__(4);
const event_service_1 = __webpack_require__(8);
const create_event_dto_1 = __webpack_require__(12);
const update_event_dto_1 = __webpack_require__(13);
let EventController = class EventController {
    eventService;
    constructor(eventService) {
        this.eventService = eventService;
    }
    async registerEvent(data) {
        return this.eventService.createEvent(data);
    }
    async editEvent(id, updates) {
        return this.eventService.updateEvent(id, updates);
    }
    async cancelEvent(id) {
        return this.eventService.cancelEvent(id);
    }
    async getEvent(id) {
        return this.eventService.getEventById(id);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)('events/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_event_dto_1.CreateEventDto !== "undefined" && create_event_dto_1.CreateEventDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "registerEvent", null);
__decorate([
    (0, common_1.Patch)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_event_dto_1.UpdateEventDto !== "undefined" && update_event_dto_1.UpdateEventDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "editEvent", null);
__decorate([
    (0, common_1.Post)('events/:id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "cancelEvent", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof event_service_1.EventService !== "undefined" && event_service_1.EventService) === "function" ? _a : Object])
], EventController);


/***/ }),
/* 8 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventService = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(9);
const typeorm_2 = __webpack_require__(10);
const event_entity_1 = __webpack_require__(11);
let EventService = class EventService {
    eventRepository;
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async createEvent(createEventDto) {
        const event = this.eventRepository.create({
            requestedBy: createEventDto.requestedBy,
            toOrganizer: createEventDto.toOrganizer,
            status: 'pending',
            eventDate: createEventDto.eventDate
                ? new Date(createEventDto.eventDate)
                : null,
            about: createEventDto.about ?? null,
            requirements: createEventDto.requirements ?? null,
            reviews: createEventDto.reviews ?? null,
            additionalDetails: createEventDto.additionalDetails ?? null,
        });
        return await this.eventRepository.save(event);
    }
    async updateEvent(eventId, updates) {
        const event = await this.eventRepository.findOne({ where: { id: eventId } });
        if (!event) {
            throw new Error('Event not found');
        }
        if (updates.eventDate) {
            event.eventDate = new Date(updates.eventDate);
        }
        if (updates.about !== undefined) {
            event.about = updates.about;
        }
        if (updates.requirements !== undefined) {
            event.requirements = updates.requirements;
        }
        if (updates.reviews !== undefined) {
            event.reviews = updates.reviews;
        }
        if (updates.additionalDetails !== undefined) {
            event.additionalDetails = updates.additionalDetails;
        }
        if (updates.status !== undefined) {
            event.status = updates.status;
        }
        return await this.eventRepository.save(event);
    }
    async cancelEvent(eventId) {
        const event = await this.eventRepository.findOne({ where: { id: eventId } });
        if (!event) {
            throw new Error('Event not found');
        }
        event.status = 'cancelled';
        return await this.eventRepository.save(event);
    }
    async getEventById(eventId) {
        const event = await this.eventRepository.findOne({ where: { id: eventId } });
        if (!event) {
            throw new Error('Event not found');
        }
        return {
            ...event,
            organizerPhone: null,
        };
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], EventService);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Event = void 0;
const typeorm_1 = __webpack_require__(10);
let Event = class Event {
    id;
    requestedBy;
    toOrganizer;
    status;
    eventDate;
    about;
    requirements;
    reviews;
    additionalDetails;
    createdAt;
    updatedAt;
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "requestedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "toOrganizer", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], Event.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, default: null }),
    __metadata("design:type", Object)
], Event.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, default: null }),
    __metadata("design:type", Object)
], Event.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, default: null }),
    __metadata("design:type", Object)
], Event.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, default: null }),
    __metadata("design:type", Object)
], Event.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, default: null }),
    __metadata("design:type", Object)
], Event.prototype, "additionalDetails", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Event.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Event.prototype, "updatedAt", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)('events')
], Event);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateEventDto = void 0;
class CreateEventDto {
    requestedBy;
    toOrganizer;
    eventDate;
    about;
    requirements;
    reviews;
    additionalDetails;
}
exports.CreateEventDto = CreateEventDto;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateEventDto = void 0;
class UpdateEventDto {
    eventDate;
    about;
    requirements;
    reviews;
    additionalDetails;
    status;
}
exports.UpdateEventDto = UpdateEventDto;


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
const app_module_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
async function bootstrap() {
    process.title = 'user';
    const logger = new common_1.Logger('UserBootstrap');
    const port = process.env.userPort ? parseInt(process.env.userPort, 10) : 3002;
    const rmqUrl = process.env.rabbitmq ?? "amqp://localhost:5672";
    const queue = process.env.service ?? "service";
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [rmqUrl],
            queue,
            queueOptions: {
                durable: false
            }
        }
    });
    app.enableShutdownHooks();
    await app.listen();
    logger.log(`Jashan tantra service is running on ${port} from rabbit maq`);
}
bootstrap();

})();

/******/ })()
;