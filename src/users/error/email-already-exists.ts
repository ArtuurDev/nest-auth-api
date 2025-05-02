export class EmailAlreadyExistsError {
    message: string
    code: number
    constructor() {
        this.message = 'Email already exists';
        this.code = 409;
    }


}