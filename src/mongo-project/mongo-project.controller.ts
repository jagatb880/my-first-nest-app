import { Body, Controller, Get, Post } from '@nestjs/common';
import { Developer } from './schemas/developer.schema';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { MongoDeveloperService } from './mongo-project.service';
import { Project } from './schemas/project.schema';

// Many to many relationship between Developer and Project
// {
//   "name": "Alice Johnson",
//   "projects": [
//     { "name": "E-commerce Platform" },
//     { "name": "Mobile Banking App" }
//   ]
// }

@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: MongoDeveloperService) {}

  @Post()
  async create(
    @Body() createDeveloperDto: CreateDeveloperDto,
  ): Promise<Developer> {
    return this.developerService.createDeveloper(createDeveloperDto);
  }

  @Get()
  async findAll(): Promise<Developer[]> {
    return this.developerService.getAllDevelopers();
  }
}

@Controller('project')
export class ProjectController {
  constructor(private readonly developerService: MongoDeveloperService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.developerService.getAllProjects();
  }
}
