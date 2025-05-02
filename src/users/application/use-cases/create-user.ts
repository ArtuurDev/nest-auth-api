import { UsersRepository } from "../repositories/users-repository";
import { EmailAlreadyExistsError } from "src/users/error/email-already-exists";
import { CryptografyRepository } from "../repositories/cryptografy-repository";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

export interface CreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class CreateUserUseCase {

    constructor(
        private userRepository: UsersRepository,
        private cryptografyRepository: CryptografyRepository
    ) {}

    async execute({ email, name, password}: CreateUserUseCaseRequest): Promise<
    User | 
    EmailAlreadyExistsError | 
    Error > {

        const emailAlreadyExists = await this.userRepository.findUserByEmail(email);
        if(emailAlreadyExists) {
            return new EmailAlreadyExistsError()
        }

        const passwordHash = await this.cryptografyRepository.hashPassword(password)
        
        try {
            const user = await this.userRepository.createUser({
                email,
                name,
                password: passwordHash
            })          
            return user
        } 
        catch (error) {
            throw new Error(error)
        }
    } 
}