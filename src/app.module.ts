import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoryAdditionalModule } from './modules/category-additional/category-additional.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [CategoryAdditionalModule, DatabaseModule],
  providers: [AppService],
})
export class AppModule {}
