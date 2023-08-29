import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';
import { CreateRoleBody } from './dto/create-role.body';
import { FilterRoleBody } from './dto/filter-role.body';
import { SaveRoleBody } from './dto/save-role.body';
import { CreateRole } from './use-cases/create-role';
import { DeleteRole } from './use-cases/delete-role';
import { FilterRole } from './use-cases/filter-role';
import { GetRole } from './use-cases/get-role';
import { SaveRole } from './use-cases/save-role';
import { IRoleView, RoleViewModel } from './view-models/role';

@UseGuards(AuthGuard)
@UseInterceptors(BooleanInterceptor)
@Controller('role')
export class RoleController {
  constructor(
    private createRole: CreateRole,
    private saveRole: SaveRole,
    private getRole: GetRole,
    private filterRole: FilterRole,
    private deleteRole: DeleteRole) { }

    @Get()
    async roles(
      @Query() query: FilterRoleBody,
    ): Promise<{ role: IRoleView[] } | null> {
      const { roles } = await this.filterRole.execute(query);
  
      if (!roles) {
        return null;
      }
  
      return {
        role: roles?.map(RoleViewModel.toHTTP),
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
        role: RoleViewModel.toHTTP(role),
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
}
