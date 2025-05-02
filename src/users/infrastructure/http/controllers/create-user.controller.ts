import { Body, ConflictException, Controller, InternalServerErrorException, Post, Res, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserUseCase } from "src/users/application/use-cases/create-user";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { EmailAlreadyExistsError } from "src/users/error/email-already-exists";
import { Response } from "express";
import { AuthGuard } from "../auth/auth-guard";
import { Roles } from "../auth/roles";
import { Role } from "../../config/enum";

export const zodSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
})

export type CreateUserRequest  = z.infer<typeof zodSchema>


@Controller()
@UsePipes(new ZodValidationPipe(zodSchema))
export class CreateUserController {

    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}

    @Post("/users")
    async handle(@Body() body: CreateUserRequest, @Res() res: Response) {

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
                message: 'success'
            })
        }
        catch(err) {
            throw err
        }
    }

}