export interface StoreUserRequestInterface {
    data: {
        type: string;
        attributes: {
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            password: string;
            password_confirmation: string;
            roles: string[];
        }
    }
}
