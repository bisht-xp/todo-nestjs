import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor() {}

    singup() {
        return "Signup is working";
    }

    singin() {
        return "Signin is working";
    }
}