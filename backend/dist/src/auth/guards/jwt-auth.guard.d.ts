import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '../../infrastructure/jwt/jwt.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflector;
    constructor(jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractToken;
}
