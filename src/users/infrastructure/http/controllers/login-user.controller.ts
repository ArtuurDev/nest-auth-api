import { Body, Controller, InternalServerErrorException, Post, Res } from "@nestjs/common";
import { LoginUserUseCase } from "src/users/application/use-cases/login-user";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { EmailNotExistsError } from "src/users/error/email-not-exists";
import { PasswordIncorrect } from "src/users/error/password-incorrect";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";

export const requestSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type requestBody = z.infer<typeof requestSchema>

@Controller()
export class LoginUserController {
    constructor(
        private LoginUser: LoginUserUseCase,
        private jwtService: JwtService,
    ) {}

    @Post('/login')
    async handle(@Body(new ZodValidationPipe(requestSchema)) body: requestBody, @Res() res: Response) {

        const {email,password} = body

        try {
            const user = await this.LoginUser.execute({
                email,
                password
            })
            if(user instanceof EmailNotExistsError || user instanceof PasswordIncorrect) {
                return res.status(user.code).json({
                    error: true,
                    message: user.message
                })
            }
            return res.status(201).json({
                accessToken: this.jwtService.sign({
                    sub: user.id,
                    email: user.email,
                    role: user.permision
                })
            })
        } 
        catch(err) {
            console.log(err)
            throw new InternalServerErrorException(err)
        }   
    }
}