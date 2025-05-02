import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateUserUseCase } from "src/users/application/use-cases/create-user";
import { UsersRepository } from "src/users/application/repositories/users-repository";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { CryptografyRepository } from "src/users/application/repositories/cryptografy-repository";
import { InfraCryptografyRepository } from "../repositories/cryptografy/infra-cryptografy-repository";
import { CreateUserController } from "./controllers/create-user.controller";
import { FindManyUsersController } from "./controllers/find-many-users.controller";
import { FindManyUsersUseCase } from "src/users/application/use-cases/find-many-users";
import { DeleteUserUseCase } from "src/users/application/use-cases/delete-user";
import { DeleteUserController } from "./controllers/delete-user.controller";
import { UpdateUserController } from "./controllers/update-user.controller";
import { UpdateUserUseCase } from "src/users/application/use-cases/update-user";
import { AuthModule } from "./auth/auth.module";
import { LoginUserUseCase } from "src/users/application/use-cases/login-user";
import { LoginUserController } from "./controllers/login-user.controller";
import { FetchProfileUser } from "src/users/application/use-cases/fetch-profile-user";
import { FetchProfileUserController } from "./controllers/fetch-profiler-user.controller";

@Module({
    imports: [
        DatabaseModule,
        AuthModule
    ],
    controllers: [
        CreateUserController,
        FindManyUsersController,
        DeleteUserController,
        UpdateUserController,
        LoginUserController,
        FetchProfileUserController
    ],
    providers: [
        CreateUserUseCase, 
        FindManyUsersUseCase,
        DeleteUserUseCase,
        UpdateUserUseCase,
        LoginUserUseCase,
        FetchProfileUser,

        {
            provide: UsersRepository,
            useClass: PrismaUsersRepository
        }, 
        {
            provide: CryptografyRepository,
            useClass: InfraCryptografyRepository
        }
    ]
})
export class HttpModule {}