import { Controller, Get, Query, UseGuards, Version } from '@nestjs/common';
import JwtAuthenticationGuard from '../../../auth/guards/JwtAuthenticationGuard';
import ListPermissionDTO from '../../dtos/ListPermissionDTO';
import ListPermissionService from '../../services/ListPermissionService';

@UseGuards(JwtAuthenticationGuard)
@Controller({
    version: '1',
    path: 'permissions',
})
export class PermissionsController {
    public constructor(private listPermissionService: ListPermissionService) {}

    @Get()
    public async findAll(@Query() query: any) {
        return await this.listPermissionService.execute(query);
    }
}
