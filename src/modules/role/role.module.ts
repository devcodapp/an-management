import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { RoleController } from './role.controller';
import { CreateRole } from './use-cases/create-role';
import { DeleteRole } from './use-cases/delete-role';
import { FilterRole } from './use-cases/filter-role';
import { GetRole } from './use-cases/get-role';
import { SaveRole } from './use-cases/save-role';

@Module({
  controllers: [RoleController],
  providers: [CreateRole, SaveRole, GetRole, FilterRole, DeleteRole],
  imports: [DatabaseModule]
})
export class RoleModule {}
