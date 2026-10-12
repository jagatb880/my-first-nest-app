import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateDeveloperDto } from './dto/create-developer.dto';

@Injectable()
export class MongoDeveloperService {
  constructor(
    @InjectModel(Developer.name)
    private readonly developerModel: Model<Developer>,
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async createDeveloper(devData: CreateDeveloperDto): Promise<Developer> {
    // Create projects
    const createdProjects = await this.projectModel.insertMany(
      devData.projects,
    );
    const projectIds = createdProjects.map((p) => p._id);

    // Create developer referencing projects
    const developer = await this.developerModel.create({
      name: devData.name,
      projects: projectIds,
    });

    // Update each project to reference this developer (many-to-many)
    await Promise.all(
      createdProjects.map((project) =>
        this.projectModel.findByIdAndUpdate(project._id, {
          $push: { developers: developer._id },
        }),
      ),
    );

    return developer.populate('projects');
  }

  async getAllDevelopers(): Promise<Developer[]> {
    return this.developerModel.find().populate('projects').exec();
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectModel.find().populate('developers').exec();
  }
}
