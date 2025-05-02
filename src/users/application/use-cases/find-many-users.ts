import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class FindManyUsersUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute(): Promise<User[] | Error> {
        try {
           const users =  await this.usersRepository.findAllUsers()
            return users
        }
        catch (error) {
            throw new Error(error)
        }                                       
    }
}