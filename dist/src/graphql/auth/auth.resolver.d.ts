import { AuthService } from '../../auth/auth.service';
import { LoginInput } from './inputs/login.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(input: LoginInput): Promise<{
        access_token: string;
    }>;
    me(user: any): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
