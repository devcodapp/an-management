import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoryAdditionalModule } from './modules/category-additional/category-additional.module';
import { DatabaseModule } from './modules/database/database.module';
import { AdditionalModule } from './modules/additional/additional.module';

@Module({
  imports: [CategoryAdditionalModule, DatabaseModule, AdditionalModule],
  providers: [AppService],
})
export class AppModule {}
