export abstract class UsersRepository {
    abstract createUser(user: any): Promise<any>
    abstract findUserById(id: string): Promise<any>;
    abstract findUserByEmail(email: string): Promise<any>;
    abstract updateUser(id: string, user: any): Promise<any>;
    abstract deleteUser(id: string): Promise<any>;
    abstract findAllUsers(): Promise<any[]>;
}