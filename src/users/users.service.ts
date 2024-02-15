import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(userId: string): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(user: User): User {
    const newUser = { id: uuidv4(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, user: Partial<User>): User {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getMany(): User[] {
    return this.users;
  }

  create(user: User): User {
    const newUser = { id: uuidv4(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(userId: string, updateUser: Partial<User>): User {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUser };
      return this.users[index];
    }
    return null;
  }

  deleteById(userId: string): void {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
