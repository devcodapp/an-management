import { Module } from '@nestjs/common';
import { CategoryAdditionalModule } from './modules/category-additional/category-additional.module';
import { AdditionalModule } from './modules/additional/additional.module';
import { CloudinaryModule } from '@shared/modules/cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { OptionModule } from './modules/option/option.module';
import { CategoryProductModule } from './modules/category-product/category-product.module';
import { SuboptionModule } from './modules/suboption/suboption.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import { WorkerModule } from '@modules/worker/worker.module';
@Module({
  imports: [
    CategoryAdditionalModule,
    DatabaseModule,
    AdditionalModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    OptionModule,
    CompanyModule,
    CategoryProductModule,
    SuboptionModule,
    AuthModule,
    WorkerModule,
  ],
})
export class AppModule {}
