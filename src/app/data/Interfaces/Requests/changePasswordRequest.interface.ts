export interface ChangePasswordRequestInterface {
    data: {
        type: string;
        id: string;
        attributes: {
            current_password: string;
            password: string;
            password_confirmation: string;
        }
    }
}
