import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserData(): string {
    return 'User data fetched successfully.';
  }
}
