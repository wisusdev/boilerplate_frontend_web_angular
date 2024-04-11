export interface ResetPassword {
    data: {
        token: string;
        password: string;
        password_confirmation: string;
    }
}