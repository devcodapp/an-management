import { Module } from '@nestjs/common';
import { CategoryAdditionalModule } from './modules/category-additional/category-additional.module';
import { DatabaseModule } from './modules/database/database.module';
import { AdditionalModule } from './modules/additional/additional.module';
import { CloudinaryModule } from '@shared/modules/cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';
@Module({
  imports: [
    CategoryAdditionalModule,
    DatabaseModule,
    AdditionalModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CompanyModule,
  ],
})
export class AppModule {}
