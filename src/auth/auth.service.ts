import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async adminLogin(email: any, password: any) {
        const member = await this.adminService.findByEmail(email);

        if (member) {
            const match = await bcrypt.compare(password, member.password);

            if (match) {
                return {
                    access_token: this.jwtService.sign({
                        id: member.id,
                        email: member.email,
                        name: member.name,
                        surname: member.surname
                    })
                };
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }
    }

    async userLogin(email: any, password: any) {
        const member = await this.userService.findByEmail(email);

        if (member) {
            const match = await bcrypt.compare(password, member.password);

            if (match) {
                return {
                    access_token: this.jwtService.sign({
                        id: member.id,
                        email: member.email,
                        name: member.name,
                        surname: member.surname
                    })
                };
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }
    }
}