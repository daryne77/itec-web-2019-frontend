export interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    code: string;
}

export interface LoginRequestModel {
    email: string;
    password: string;
}


export interface AuthSession {
    username: string;
    token: string;
    tokenType: string;
    expiration: string;
    roles: string;
}

export interface ForgotPasswordModel {
    email: string;
}

export interface ConfirmationRequestModel {
    userId: string;
    token: string;
}
