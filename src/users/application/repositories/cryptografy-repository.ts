import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class CryptografyRepository {
    abstract hashPassword(password: string): Promise<string>;
    abstract comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}