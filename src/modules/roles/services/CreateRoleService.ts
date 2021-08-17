import CreateRoleDto from '../dtos/CreateRoleDTO';
import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../infra/typeorm/entities/RoleEntity';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class CreateRoleService {
    public constructor(
        @Inject('RolesRepository') private rolesRepository: IRolesRepository,
    ) {}

    public async execute(role: CreateRoleDto): Promise<Role> {
        return await this.rolesRepository.create(role);
    }
}
