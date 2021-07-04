import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) { }

    findAll(): Promise<Admin[]> {
        return this.adminRepository.find();
    }

    findOne(id: string): Promise<Admin> {
        return this.adminRepository.findOne(id);
    }

    findByEmail(email: string): Promise<Admin> {
        return this.adminRepository.findOne({
            where: {
                email: email,
                is_active: true
            },
        });
    }

    async remove(id: string): Promise<void> {
        await this.adminRepository.delete(id);
    }
}