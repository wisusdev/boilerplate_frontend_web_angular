export interface LoginResponseInterface {
    data: {
        type: string;
        id: string;
        attributes: {
            user: {
                first_name: string;
                last_name: string;
                username: string;
                email: string;
                avatar: string | null;
                language: string;
            };
        };
        relationships: {
            roles: string[];
            permissions: string[];
            access: {
                token: string;
                token_type: string;
                expires_at: string;
            };
        };
    };
}
