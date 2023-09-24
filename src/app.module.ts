import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';
import { PersonalModule } from './personal/personal.module';
import { MeterModule } from './meter/meter.module';
import { RoleModule } from './role/role.module';
import { ComplaintModule } from './complaint/complaint.module';
import { ComplaintCategoryModule } from './complaint_category/complaint_category.module';
import { ComplaintImagesModule } from './complaint_images/complaint_images.module';
import { ComplaintHandlingModule } from './complaint_handling/complaint_handling.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, PersonalModule, MeterModule, RoleModule, ComplaintModule, ComplaintCategoryModule, ComplaintImagesModule, ComplaintHandlingModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
