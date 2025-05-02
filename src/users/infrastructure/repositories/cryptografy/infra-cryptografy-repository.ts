import { CryptografyRepository } from "src/users/application/repositories/cryptografy-repository";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class InfraCryptografyRepository implements CryptografyRepository{
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 8)
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
    
}