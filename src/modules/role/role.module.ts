import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/modules/database/database.module';

import { RoleController } from './role.controller';
import { AddUserRole } from './use-cases/add-user-role';
import { AddUsersRole } from './use-cases/add-users-role';
import { CreateRole } from './use-cases/create-role';
import { DeleteRole } from './use-cases/delete-role';
import { FilterRole } from './use-cases/filter-role';
import { GetManyRoles } from './use-cases/get-many-roles';
import { GetRole } from './use-cases/get-role';
import { RemoveUserRole } from './use-cases/remove-user-role';
import { RemoveUsersRole } from './use-cases/remove-users-role';
import { SaveRole } from './use-cases/save-role';

@Module({
  controllers: [RoleController],
  providers: [CreateRole, SaveRole, GetRole, FilterRole, DeleteRole, AddUserRole, RemoveUserRole, AddUsersRole, RemoveUsersRole, GetManyRoles],
  imports: [DatabaseModule]
})
export class RoleModule { }
