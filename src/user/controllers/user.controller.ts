import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { User } from '../models/user.model';
// import { GetUser } from '../get-user.decorator';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(
    @Req() req: any) {
    return req.user;
  }
}
