"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
const create_room_service_1 = require("./create-room.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const join_room_service_1 = require("./join-room.service");
const location_search_service_1 = require("./location-search.service");
const room_preview_service_1 = require("./room-preview.service");
const room_realtime_service_1 = require("./room-realtime.service");
const set_ready_dto_1 = require("./dto/set-ready.dto");
const transfer_host_dto_1 = require("./dto/transfer-host.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
let RoomController = class RoomController {
    createRoomService;
    joinRoomService;
    locationSearchService;
    roomPreviewService;
    roomRealtimeService;
    constructor(createRoomService, joinRoomService, locationSearchService, roomPreviewService, roomRealtimeService) {
        this.createRoomService = createRoomService;
        this.joinRoomService = joinRoomService;
        this.locationSearchService = locationSearchService;
        this.roomPreviewService = roomPreviewService;
        this.roomRealtimeService = roomRealtimeService;
    }
    createRoom(currentUser, dto) {
        return this.createRoomService.createRoom(currentUser.sub, dto);
    }
    findRoomByCode(roomCode) {
        return this.roomPreviewService.findRoomByCode(roomCode);
    }
    findRoomByInviteToken(inviteToken) {
        return this.roomPreviewService.findRoomByInviteToken(inviteToken);
    }
    searchLocations(query = '', latitude = '', longitude = '') {
        return this.locationSearchService.search(query, parseOptionalCoordinate(latitude), parseOptionalCoordinate(longitude));
    }
    reverseLocation(latitude = '', longitude = '') {
        return this.locationSearchService.reverse(Number(latitude || Number.NaN), Number(longitude || Number.NaN));
    }
    getCurrentRoom(currentUser) {
        return this.joinRoomService.getCurrentRoom(currentUser.sub);
    }
    updateRoom(roomId, dto, currentUser) {
        return this.joinRoomService.updateRoom(roomId, currentUser.sub, dto);
    }
    closeRoom(roomId, currentUser) {
        return this.joinRoomService.closeRoom(roomId, currentUser.sub);
    }
    roomEvents(roomId, currentUser) {
        return (0, rxjs_1.from)(this.joinRoomService.getRoom(roomId, currentUser.sub)).pipe((0, rxjs_1.switchMap)(() => (0, rxjs_1.concat)((0, rxjs_1.of)({ data: { type: 'room-updated', roomId } }), this.roomRealtimeService.subscribe(roomId))));
    }
    getRoom(roomId, currentUser) {
        return this.joinRoomService.getRoom(roomId, currentUser.sub);
    }
    joinRoom(roomId, currentUser) {
        return this.joinRoomService.joinRoom(roomId, currentUser.sub);
    }
    setReady(roomId, dto, currentUser) {
        return this.joinRoomService.setReady(roomId, currentUser.sub, dto.isReady);
    }
    startRoom(roomId, currentUser) {
        return this.joinRoomService.startRoom(roomId, currentUser.sub);
    }
    leaveRoom(roomId, currentUser) {
        return this.joinRoomService.leaveRoom(roomId, currentUser.sub);
    }
    transferHost(roomId, dto, currentUser) {
        return this.joinRoomService.transferHost(roomId, currentUser.sub, dto.memberId);
    }
    kickMember(roomId, memberId, currentUser) {
        return this.joinRoomService.kickMember(roomId, currentUser.sub, memberId);
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('code/:roomCode'),
    __param(0, (0, common_1.Param)('roomCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findRoomByCode", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('invite/:inviteToken'),
    __param(0, (0, common_1.Param)('inviteToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findRoomByInviteToken", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('location-search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('lat')),
    __param(2, (0, common_1.Query)('lon')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "searchLocations", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('location-reverse'),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lon')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "reverseLocation", null);
__decorate([
    (0, common_1.Get)('current'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "getCurrentRoom", null);
__decorate([
    (0, common_1.Patch)(':roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)(':roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "closeRoom", null);
__decorate([
    (0, common_1.Sse)(':roomId/events'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], RoomController.prototype, "roomEvents", null);
__decorate([
    (0, common_1.Get)(':roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Post)(':roomId/join'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "joinRoom", null);
__decorate([
    (0, common_1.Patch)(':roomId/ready'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, set_ready_dto_1.SetReadyDto, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "setReady", null);
__decorate([
    (0, common_1.Post)(':roomId/start'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "startRoom", null);
__decorate([
    (0, common_1.Delete)(':roomId/leave'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "leaveRoom", null);
__decorate([
    (0, common_1.Post)(':roomId/transfer-host'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transfer_host_dto_1.TransferHostDto, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "transferHost", null);
__decorate([
    (0, common_1.Delete)(':roomId/members/:memberId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Param)('memberId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "kickMember", null);
exports.RoomController = RoomController = __decorate([
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [create_room_service_1.CreateRoomService,
        join_room_service_1.JoinRoomService,
        location_search_service_1.LocationSearchService,
        room_preview_service_1.RoomPreviewService,
        room_realtime_service_1.RoomRealtimeService])
], RoomController);
function parseOptionalCoordinate(value) {
    return value.trim() ? Number(value) : undefined;
}
//# sourceMappingURL=room.controller.js.map