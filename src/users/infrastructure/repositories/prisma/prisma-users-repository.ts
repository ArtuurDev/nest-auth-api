import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/application/repositories/users-repository";
import { PrismaService } from "../../database/prisma/prisma.service";
import { User } from "@prisma/client";
import { UpdateUserUseCaseRequest } from "src/users/application/use-cases/update-user";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {

    constructor(
        private prisma: PrismaService
    ) {}

    async createUser(user: any): Promise<any> {
        
        return this.prisma.user.create({
            data: user
        })
    }

    async findUserById(id: string): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async findUserByEmail(email: string): Promise<any> {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }
    
    async updateUser(user: UpdateUserUseCaseRequest): Promise<any> {
        return this.prisma.user.update({
            where: {
                id: user.userId
            }, data: {
                name: user.name,
                password: user.password 
            }
        })
    }

    async deleteUser(id: string): Promise<any> {
        return this.prisma.user.delete({
            where: {
                id
            }
        })  
    }
    async findAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

}