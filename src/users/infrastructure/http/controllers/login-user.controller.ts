import { Body, Controller, InternalServerErrorException, Post, Res } from "@nestjs/common";
import { LoginUserUseCase } from "src/users/application/use-cases/login-user";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { EmailNotExistsError } from "src/users/error/email-not-exists";
import { PasswordIncorrect } from "src/users/error/password-incorrect";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import {createZodDto} from 'nestjs-zod'

export const requestSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export class LoginUserDto extends createZodDto(requestSchema) {}

@ApiTags('users')
@Controller()
export class LoginUserController {
    constructor(
        private LoginUser: LoginUserUseCase,
        private jwtService: JwtService,
    ) {}

    @Post('/login')
    @ApiResponse({status: 201})
    @ApiResponse({status: 409})
    @ApiBody({
        description: 'Payload para realizar login de um usuário admin, esse já está criado, para logar com um user comum crie-o e faça login.',
        schema: {
            oneOf: [
                {
                    description: "Exemplo de login como administrador",
                    example: {
                        email: "emaildoadmistrador@gmail.com",
                        password: "securePassword123",
                    },
                },
                {
                    description: "Exemplo de login como usuário comum",
                    example: {
                        email: "seuemail@gmail.com",
                        password: "suasenha",
                    },
                },
            ],
        }
    })
    async handle(@Body(new ZodValidationPipe(requestSchema)) body: LoginUserDto, @Res() res: Response) {

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