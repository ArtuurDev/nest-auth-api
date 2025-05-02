import { Controller, ForbiddenException, Get, Param, Request, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth-guard";
import { Role } from "../../config/enum";
import { Roles } from "../auth/roles";
import { FetchProfileUser } from "src/users/application/use-cases/fetch-profile-user";
import { UserIdNotExistsError } from "src/users/error/id-not-exists";
import { Response } from "express";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('users')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
@Roles(Role.Admin, Role.User)
export class FetchProfileUserController {

    constructor(
        private fetchProfile: FetchProfileUser
    ) {}

    @Get('profile/user/:id')
    @ApiResponse({
            status: 200,
            description: "Retorna o perfil do usuario. É necessário estar autenticado. cole o id do user gerado na criação no campo id",
        })
        @ApiResponse({
            status: 401,
            description: "Não autorizado. Você precisa estar logado.",
        })
    async handle(@Request() req, @Param('id') id: string, @Res() res: Response) {

        try {
            const user = await this.fetchProfile.execute({
            id
        })
            if(user instanceof UserIdNotExistsError) {
                return res.status(user.code).json({
                message: user.message
            })
        }
            return res.status(201).json({
            profile: user
        })
        }
        catch(err) {
            throw new Error(err)
        }
    }
}