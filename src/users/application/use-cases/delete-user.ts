import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserIdNotExistsError } from "src/users/error/id-not-exists";
import { UsersRepository } from "../repositories/users-repository";


export interface DeleteUserUseCaseRequest {
    userId: string
}
  
@Injectable()
export class DeleteUserUseCase {

    constructor(
        private userRepository: UsersRepository,
    ) {}


    async execute({ userId }: DeleteUserUseCaseRequest): Promise<User | UserIdNotExistsError | Error> {

        const user = await this.userRepository.findUserById(userId)
        if(!user) {
            return new UserIdNotExistsError()
        }

        try {
            const deletedUser = await this.userRepository.deleteUser(userId)
            return deletedUser
        } catch(err) {
            throw new Error(err)
        }
    }

}