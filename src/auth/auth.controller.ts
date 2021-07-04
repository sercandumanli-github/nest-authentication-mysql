import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('auth/admin/login')
    async adminLogin(@Body() req) {
        return this.authService.adminLogin(req.email, req.password);
    }

    @Post('auth/login')
    async login(@Body() req) {
        return this.authService.userLogin(req.email, req.password);
    }
}
