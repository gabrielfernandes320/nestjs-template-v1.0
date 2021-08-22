import UpdateRoleDTO from 'src/modules/roles/dtos/UpdateRoleDTO';
import CreateRoleDTO from 'src/modules/roles/dtos/CreateRoleDTO';
import {
    RoleMock,
    CreateRoleDtoMock,
    UpdateRoleDtoMock,
} from './../../factories/RoleFactory';
import { RolesController } from './RolesController';
import ListRoleService from '../../services/ListRoleService';
import { Role } from '../typeorm/entities/RoleEntity';
import { Test } from '@nestjs/testing';
import JwtAuthenticationGuard from '../../../auth/guards/JwtAuthenticationGuard';
import CreateRoleService from '../../services/CreateRoleService';
import UpdateRoleService from '../../services/UpdateRoleService';
import DeleteRoleService from '../../services/DeleteRoleService';
import ShowRoleService from '../../services/ShowRoleService';

describe('RolesController', () => {
    let rolesController: RolesController;
    const mockRoles: Role[] = RoleMock.buildList(10);

    const mockListRolesService = {
        execute: jest.fn(async () => mockRoles),
    };
    const mockCreateRolesService = {
        execute: jest.fn(async (createRoleDto: CreateRoleDTO) => createRoleDto),
    };
    const mockUpdateRolesService = {
        execute: jest.fn(
            async (id: number, updateRoleDto: UpdateRoleDTO) => mockRoles,
        ),
    };
    const mockDeleteRolesService = {
        execute: jest.fn(async () => mockRoles),
    };

    const mockShowRoleService = {
        execute: jest.fn(async () => mockRoles[0]),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [
                {
                    provide: ListRoleService,
                    useValue: mockListRolesService,
                },
                {
                    provide: CreateRoleService,
                    useValue: mockCreateRolesService,
                },
                {
                    provide: UpdateRoleService,
                    useValue: mockUpdateRolesService,
                },
                {
                    provide: DeleteRoleService,
                    useValue: mockDeleteRolesService,
                },
                {
                    provide: ShowRoleService,
                    useValue: mockShowRoleService,
                },
                JwtAuthenticationGuard,
            ],
        }).compile();

        rolesController = moduleRef.get<RolesController>(RolesController);
    });

    describe('findAll', () => {
        it('should return an array of roles', async () => {
            expect(await rolesController.findAll({})).toEqual(mockRoles);
        });
    });

    describe('show', () => {
        it('should return a role', async () => {
            expect(await rolesController.findOne(0)).toEqual(mockRoles[0]);
        });
    });

    describe('create', () => {
        it('should create a role', async () => {
            const mockRoleDto = CreateRoleDtoMock.build();

            expect(await rolesController.create(mockRoleDto)).toEqual(
                mockRoleDto,
            );
        });
    });

    // describe('update', () => {
    //     it('should update a role', async () => {
    //         const mockRoleDto = CreateRoleDtoMock.build();

    //         // expect(await rolesController.create(mockRoleDto)).toEqual(
    //         //     mockRoleDto,
    //         // );
    //         expect(
    //             await rolesController.update(+1, {} as UpdateRoleDTO),
    //         ).toEqual(mockRoleDto);
    //     });
    // });

    describe('remove', () => {
        it('should remove a role', async () => {
            expect(await rolesController.remove(0)).toHaveBeenCalled();
        });
    });
});
