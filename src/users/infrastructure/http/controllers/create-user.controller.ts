import { Body, ConflictException, Controller, InternalServerErrorException, Post, Res, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserUseCase } from "src/users/application/use-cases/create-user";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { EmailAlreadyExistsError } from "src/users/error/email-already-exists";
import { Response } from "express";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import {createZodDto} from 'nestjs-zod'

export const zodSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
})

export class CreateUserDto extends createZodDto(zodSchema) {}


@ApiTags('users')
@Controller()
@UsePipes(new ZodValidationPipe(zodSchema))
export class CreateUserController {

    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}

    @Post("create/users")
    @ApiResponse({ status: 201, description: "User created successfully." })
    @ApiResponse({ status: 409, description: "Validation error." })
    @ApiBody({
        description: "Payload for creating a user",
        schema: {
            example: {
                name: "John Doe",
                email: "johndoe@gmail.com",
                password: "securePassword123",
                confirmPassword: "securePassword123",
            },
        },
    })
    async handle(@Body() body: CreateUserDto, @Res() res: Response) {

        const {email, password, name} = body
        try {
            const user = await this.createUserUseCase.execute({
                email,
                password,
                name
            })
            if(user instanceof EmailAlreadyExistsError) {
                return res.status(user.code).json({
                    message: user.message
                })
            } 
            return res.status(201).json({
                message: 'user created',
                user
            })
        }
        catch(err) {
            throw err
        }
    }
}