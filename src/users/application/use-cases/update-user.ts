import { UserIdNotExistsError } from "src/users/error/id-not-exists"
import { UsersRepository } from "../repositories/users-repository"
import { User } from "@prisma/client"
import { CryptografyRepository } from "../repositories/cryptografy-repository"
import { Injectable } from "@nestjs/common"

export interface UpdateUserUseCaseRequest {
    userId: string
    name?: string
    password?: string
}

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private userRepository: UsersRepository,
        private criptography: CryptografyRepository, 
    ) {}

    async execute({ userId, name, password }: UpdateUserUseCaseRequest): Promise<UserIdNotExistsError | User | Error> {
        
        const userExists = await this.userRepository.findUserById(userId)
        if(!userExists) {
            return new UserIdNotExistsError()
        }

        try {
            const updatedUser = await this.userRepository.updateUser({
                userId,
                name,
                password
            })
            return updatedUser
        } catch(err) {
            throw new Error(err)
        }
    }
}