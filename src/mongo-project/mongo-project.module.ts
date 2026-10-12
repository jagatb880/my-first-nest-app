import { Module } from '@nestjs/common';
import { MongoDeveloperService } from './mongo-project.service';
import {
  DeveloperController,
  ProjectController,
} from './mongo-project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from './schemas/developer.schema';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [MongoDeveloperService],
  controllers: [DeveloperController, ProjectController],
})
export class MongoProjectModule {}
