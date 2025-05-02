import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Roles_Key } from "./roles";
import { Role } from "../../config/enum";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwt: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(Roles_Key, [
            context.getHandler(),
            context.getClass(),
          ])
        if(!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest()
        const {authorization} = request.headers
        if(!authorization) {
            throw new UnauthorizedException({
                error: true,
                message: 'Token obrigatorio'
            })
        }
        const [type, token] = authorization.split(' ') 
        if(type !== 'Bearer' || !token) {
            throw new UnauthorizedException({
                error: true,
                message: 'token mal formatado'
            })
        }
        try {
            const payload = this.jwt.verify(token)
            request.user = payload
            if(!requiredRoles.includes(payload.role)) {
                throw new UnauthorizedException()
            }
            if(payload.role === Role.Admin) {
                return true
            }
            const {id} = request.params
            if(id !== payload.sub) {
                throw new ForbiddenException('Não tem permissão para acessar este recurso')
            }
            return true
        }
        catch(err) {
            if(err instanceof ForbiddenException) {
                throw err
            }
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }
}