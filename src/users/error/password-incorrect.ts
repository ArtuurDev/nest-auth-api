export class PasswordIncorrect {
    message: string
    code: number
    constructor() {
        this.message = 'Password Incorret';
        this.code = 409;
    }


}