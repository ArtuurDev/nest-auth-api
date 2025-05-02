import { EmailNotExistsError } from "src/users/error/email-not-exists";
import { UsersRepository } from "../repositories/users-repository";
import { CryptografyRepository } from "../repositories/cryptografy-repository";
import { PasswordIncorrect } from "src/users/error/password-incorrect";
import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

export interface LoginUserUseCaseRequest {
    email: string
    password: string
}

@Injectable()
export class LoginUserUseCase {
    constructor(
       private usersRepository: UsersRepository,
       private criptografy: CryptografyRepository
    ) {}

    async execute({email, password}: LoginUserUseCaseRequest): Promise<EmailNotExistsError | PasswordIncorrect |  User> {

        const user = await this.usersRepository.findUserByEmail(email)
        if(!user) {
            return new EmailNotExistsError()
        }

        const passwordIsValid = await this.criptografy.comparePassword(password, user.password)
        if(!passwordIsValid) {
            return new PasswordIncorrect()
        }

        return user
    }

}