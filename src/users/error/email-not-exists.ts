export class EmailNotExistsError {
    message: string
    code: number
    constructor() {
        this.message = 'E-mail not exists';
        this.code = 409;
    }


}