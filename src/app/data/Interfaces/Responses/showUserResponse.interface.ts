export interface ShowUserResponseInterface {
    data: {
        type: string;
        id: string;
        attributes: {
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            email_verified_at: string | null;
            created_at: string;
            updated_at: string;
        },
        relationships: {
            roles: string[];
        }
    }
}
