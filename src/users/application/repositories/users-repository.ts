import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UpdateUserUseCaseRequest } from "../use-cases/update-user";

@Injectable()
export abstract class UsersRepository {
    abstract createUser(user: any): Promise<User>
    abstract findUserById(id: string): Promise<User | undefined>;
    abstract findUserByEmail(email: string): Promise<User | undefined>;
    abstract updateUser(data: UpdateUserUseCaseRequest): Promise<User>;
    abstract deleteUser(id: string): Promise<any>;
    abstract findAllUsers(): Promise<User[]>;
}