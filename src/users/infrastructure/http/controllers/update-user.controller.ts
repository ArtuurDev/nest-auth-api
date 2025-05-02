import { Body, Controller, Param, Put, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Response } from "express";
import { UpdateUserUseCase } from "src/users/application/use-cases/update-user";
import { UserIdNotExistsError } from "src/users/error/id-not-exists";
import { AuthGuard } from "../auth/auth-guard";
import { Role } from "../../config/enum";
import { Roles } from "../auth/roles";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import {createZodDto} from 'nestjs-zod'

export const zodSchema = z.object({
  name: z.string().min(1).max(255),
  password: z.string().min(8).max(255),
  confirmPassword: z.string().min(8).max(255),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

export class CreateUserDto extends createZodDto(zodSchema) {}


@ApiTags('users')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
@Roles(Role.Admin, Role.User)
export class UpdateUserController {

    constructor(
        private updateUser: UpdateUserUseCase
    ) {}

    @Put("update/user/:id")
    @ApiBody({
            description: "Payload for update a user",
            schema: {
                example: {
                    name: "John Doe",
                    email: "johndoe@gmail.com",
                    password: "securePassword123",
                    confirmPassword: "securePassword123",
                },
            },
        })
    async handle(@Body(new ZodValidationPipe(zodSchema)) body: CreateUserDto, 
    @Param('id') id: string, 
    @Res() res: Response,
    @Req() req) {

        const { password, name } = body

        try {
            const deletedUser = await this.updateUser.execute({
                userId: id,
                password,
                name
            })
            if(deletedUser instanceof UserIdNotExistsError) {
                return res.status(deletedUser.code).json({
                    message: deletedUser.message
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