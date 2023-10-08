import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaginationProps } from '@shared/dtos/pagination-body';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';
import { NumberInterceptor } from 'src/interceptors/number/number.interceptor';

import { CreateRoleBody } from './dto/create-role.body';
import { FilterRoleBody } from './dto/filter-role.body';
import { SaveRoleBody } from './dto/save-role.body';
import { UserRoleBody } from './dto/user-role.body';
import { RolePaginated } from './entities/role';
import { AddUserRole } from './use-cases/add-user-role';
import { AddUsersRole } from './use-cases/add-users-role';
import { CreateRole } from './use-cases/create-role';
import { DeleteRole } from './use-cases/delete-role';
import { FilterRole } from './use-cases/filter-role';
import { GetRole } from './use-cases/get-role';
import { PaginationRole } from './use-cases/pagination-role';
import { RemoveUserRole } from './use-cases/remove-user-role';
import { RemoveUsersRole } from './use-cases/remove-users-role';
import { SaveRole } from './use-cases/save-role';
import { IRoleView, RoleViewModel } from './view-models/role';

@UseGuards(AuthGuard)
@UseInterceptors(BooleanInterceptor, NumberInterceptor, ClassSerializerInterceptor)
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
    private removeUsersRole: RemoveUsersRole,
    private paginationRole: PaginationRole
    ) { }

  @Get()
  async roles(
    @Query() query: FilterRoleBody,
  ): Promise<{ roles: IRoleView[] } | null> {
    const { roles } = await this.filterRole.execute(query);

    if (!roles) {
      return null;
    }

    return {
      roles: roles?.map(RoleViewModel.toHTTP),
    };
  }

  @Get('pagination')
  async rolesPagination(
    @Query() query: FilterRoleBody,
    @Query() pagination: PaginationProps,
  ): Promise<RolePaginated> {
    const roles = await this.paginationRole.execute(query, pagination);

    return {
      items: roles.items?.map(RoleViewModel.toHTTP),
      pagination: roles.pagination
    };
  }

  @Get(':id')
  async role(
    @Param('id') roleId: string,
  ): Promise<{ role: IRoleView } | null> {
    const { role } = await this.getRole.execute({
      roleId,
    });

    if (!role) {
      return null;
    }

    return {
      role: RoleViewModel.toHTTP(role),
    };
  }

  @Post()
  async create(
    @Body() body: CreateRoleBody,
  ): Promise<{ role: IRoleView }> {
    const { role } = await this.createRole.execute(body);
    return {
      role: RoleViewModel.toHTTP(role,),
    };
  }

  @Put()
  async update(
    @Body() body: SaveRoleBody,
  ): Promise<{ role: IRoleView }> {
    const { role } = await this.saveRole.execute(body);

    return {
      role: RoleViewModel.toHTTP(role),
    };
  }

  @Patch('delete/:roleId')
  async delete(
    @Param('roleId') roleId: string,
  ): Promise<{ role: IRoleView }> {
    const { role } = await this.deleteRole.execute({
      roleId,
    });

    return {
      role: RoleViewModel.toHTTP(role),
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
