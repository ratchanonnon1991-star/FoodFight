"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const create_room_service_1 = require("./create-room.service");
const join_room_service_1 = require("./join-room.service");
const location_search_service_1 = require("./location-search.service");
const room_controller_1 = require("./room.controller");
const room_preview_service_1 = require("./room-preview.service");
const room_realtime_service_1 = require("./room-realtime.service");
let RoomModule = class RoomModule {
};
exports.RoomModule = RoomModule;
exports.RoomModule = RoomModule = __decorate([
    (0, common_1.Module)({
        controllers: [room_controller_1.RoomController],
        providers: [
            create_room_service_1.CreateRoomService,
            join_room_service_1.JoinRoomService,
            location_search_service_1.LocationSearchService,
            room_preview_service_1.RoomPreviewService,
            room_realtime_service_1.RoomRealtimeService,
        ],
        exports: [RoomModule],
    })
], RoomModule);
//# sourceMappingURL=room.module.js.map