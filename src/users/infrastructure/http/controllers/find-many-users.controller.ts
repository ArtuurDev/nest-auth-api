import { Controller, Get, UseGuards } from "@nestjs/common"
import { FindManyUsersUseCase } from "src/users/application/use-cases/find-many-users"
import { AuthGuard } from "../auth/auth-guard"
import { Roles } from "../auth/roles"
import { Role } from "../../config/enum"

@Controller()
@UseGuards(AuthGuard)
@Roles(Role.Admin)
export class FindManyUsersController {
    constructor(
        private findManyUsersUseCase: FindManyUsersUseCase) {}

    @Get("/users")
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