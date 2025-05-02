import { UserIdNotExistsError } from "src/users/error/id-not-exists";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

export interface FetchProfileUserRequest {
    id: string
}

@Injectable()
export class FetchProfileUser {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ id }: FetchProfileUserRequest): Promise<User | UserIdNotExistsError | Error> {

        try {
            const user = await this.usersRepository.findUserById(id)
            if(!user) {
                return new UserIdNotExistsError()
            }
            return user
        }
        catch(err) {
            throw new Error(err)
        }
    }
}