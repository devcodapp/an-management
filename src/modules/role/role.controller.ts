import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { FieldViewModel } from '@shared/view-models/select-fields';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';

import { FilterBaseBody } from '@shared/dtos/filter-base-body';
import { CreateRoleBody } from './dto/create-role.body';
import { FilterRoleBody } from './dto/filter-role.body';
import { SaveRoleBody } from './dto/save-role.body';
import { UserRoleBody } from './dto/user-role.body';
import { Role } from './entities/role';
import { AddUserRole } from './use-cases/add-user-role';
import { AddUsersRole } from './use-cases/add-users-role';
import { CreateRole } from './use-cases/create-role';
import { DeleteRole } from './use-cases/delete-role';
import { FilterRole } from './use-cases/filter-role';
import { GetRole } from './use-cases/get-role';
import { RemoveUserRole } from './use-cases/remove-user-role';
import { RemoveUsersRole } from './use-cases/remove-users-role';
import { SaveRole } from './use-cases/save-role';
import { IRoleView } from './view-models/role';

@UseGuards(AuthGuard)
@UseInterceptors(BooleanInterceptor)
@Controller('role')
export class RoleController {

  constructor(
    private createRole: CreateRole,
    private saveRole: SaveRole,
    private getRole: GetRole,
    private filterRole: FilterRole,
    private deleteRole: DeleteRole,
    private addUserRole: AddUserRole,
    private removeUserRole: RemoveUserRole,
    private addUsersRole: AddUsersRole,
    private removeUsersRole: RemoveUsersRole
    ) { }

  @Get()
  async roles(
    @Query() query: FilterRoleBody,
  ): Promise<{ roles: Role[] } | null> {
    const { roles } = await this.filterRole.execute(query);

    if (!roles) {
      return null;
    }

    return {
      roles: roles?.map((role) => FieldViewModel.toHTTP(role, query.fields.split(','))),
    };
  }

  @Get(':id')
  async role(
    @Param('id') roleId: string,
    @Query() { fields }: FilterBaseBody,
  ): Promise<{ role: IRoleView } | null> {
    const { role } = await this.getRole.execute({
      roleId,
    });

    if (!role) {
      return null;
    }

    return {
      role: FieldViewModel.toHTTP(role, fields.split(',')),
    };
  }

  @Post()
  async create(
    @Body() body: CreateRoleBody,
    @Query() { fields }: FilterBaseBody,
  ): Promise<{ role: IRoleView }> {
    const { role } = await this.createRole.execute(body);
    return {
      role: FieldViewModel.toHTTP(role, fields.split(',')),
    };
  }

  @Put()
  async update(
    @Body() body: SaveRoleBody,
    @Query() { fields }: FilterBaseBody,
  ): Promise<{ role: IRoleView }> {
    const { role } = await this.saveRole.execute(body);

    return {
      role: FieldViewModel.toHTTP(role, fields.split(',')),
    };
  }

  @Patch('delete/:roleId')
  async delete(
    @Param('roleId') roleId: string,
    @Query() { fields }: FilterBaseBody,
  ): Promise<{ role: IRoleView }> {
    const { role } = await this.deleteRole.execute({
      roleId,
    });

    return {
      role: FieldViewModel.toHTTP(role, fields.split(',')),
    };
  }

  @Post('user')
  async addUser(@Body() body: UserRoleBody){
    await this.addUserRole.execute(body)
  }

  @Post('users')
  async addUsers(@Body() body: UserRoleBody[]){
    await this.addUsersRole.execute(body)
  }

  @Post('user/remove')
  async removeUser(@Body() body: UserRoleBody){
    await this.removeUserRole.execute(body)
  }

  @Post('users/remove')
  async removeUsers(@Body() body: UserRoleBody[]){
    await this.removeUsersRole.execute(body)
  }
}
