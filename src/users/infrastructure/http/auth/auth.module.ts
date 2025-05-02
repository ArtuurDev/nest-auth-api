import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Env } from "../../config/env";

@Module({
    imports: [JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory (config: ConfigService<Env>) {
            const secret = config.get('JWT_SECRET')
            console.log(secret)

            return {
                secret
            }
        } 
    })], 
    exports: [JwtModule]

})
export class AuthModule {}