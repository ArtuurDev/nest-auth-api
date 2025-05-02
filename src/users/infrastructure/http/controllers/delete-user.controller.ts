import { Controller, Delete, Param, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { DeleteUserUseCase } from "src/users/application/use-cases/delete-user";
import { UserIdNotExistsError } from "src/users/error/id-not-exists";
import { AuthGuard } from "../auth/auth-guard";
import { Roles } from "../auth/roles";
import { Role } from "../../config/enum";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";


@ApiTags('users')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
@Roles(Role.Admin, Role.User)
export class DeleteUserController {

    constructor(
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    @Delete("delete/user/:id")
    @ApiParam({
        name: "id",
        required: true,
        description: "O ID do usuário que será deletado.",
        example: "12345",
    })
    async handle(@Param('id') id, @Res() res: Response) {

        if(!id) {
            return res.status(400).json({
                message: 'User ID is required'
            })
        }       
        try {
            const user = await this.deleteUserUseCase.execute({
                userId: id
            })
            if(user instanceof UserIdNotExistsError) {
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