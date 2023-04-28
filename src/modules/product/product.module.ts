import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [],
  imports: [DatabaseModule],
})
export class AdditionalModule {}
