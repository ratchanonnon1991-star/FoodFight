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
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
const create_room_service_1 = require("./create-room.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const join_room_service_1 = require("./join-room.service");
const room_preview_service_1 = require("./room-preview.service");
let RoomController = class RoomController {
    createRoomService;
    joinRoomService;
    roomPreviewService;
    constructor(createRoomService, joinRoomService, roomPreviewService) {
        this.createRoomService = createRoomService;
        this.joinRoomService = joinRoomService;
        this.roomPreviewService = roomPreviewService;
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
    getRoom(roomId, currentUser) {
        return this.joinRoomService.getRoom(roomId, currentUser.sub);
    }
    joinRoom(roomId, currentUser) {
        return this.joinRoomService.joinRoom(roomId, currentUser.sub);
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
exports.RoomController = RoomController = __decorate([
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [create_room_service_1.CreateRoomService,
        join_room_service_1.JoinRoomService,
        room_preview_service_1.RoomPreviewService])
], RoomController);
//# sourceMappingURL=room.controller.js.map