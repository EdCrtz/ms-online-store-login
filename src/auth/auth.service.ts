import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const userDto: UserDTO = {
      name: username,
      password: password,
      id: '',
      email: '',
      createdAt: undefined,
      updatedAt: undefined,
      orders: [],
      products: [],
    };
    const user = await this.usersService.getUser(userDto);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(data: any) {
    const payload = {
      name: data.user.name,
      id: data.user.id,
      email: data.user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return { user: decoded };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
