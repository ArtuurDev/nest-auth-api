export class UserIdNotExistsError {
    message: string
    code: number
    constructor() {
        this.message = 'User not exists';
        this.code = 409;
    }


}