import { Controller, Get, UseGuards } from "@nestjs/common"
import { FindManyUsersUseCase } from "src/users/application/use-cases/find-many-users"
import { AuthGuard } from "../auth/auth-guard"
import { Roles } from "../auth/roles"
import { Role } from "../../config/enum"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags('users')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
@Roles(Role.Admin)
export class FindManyUsersController {
    constructor(
        private findManyUsersUseCase: FindManyUsersUseCase) {}

    @Get("list/users")
    @ApiResponse({
        status: 200,
        description: "Retorna uma lista de usuários. É necessário estar autenticado como administrador.",
    })
    @ApiResponse({
        status: 401,
        description: "Não autorizado. Você precisa estar logado.",
    })
    @ApiResponse({
        status: 403,
        description: "Proibido. Você precisa ter privilégios de administrador.",
    })
    async handle() {

        try {
            const users = await this.findManyUsersUseCase.execute()
            return users
        }
        catch (error) {
            throw error
        }               
    }   
}