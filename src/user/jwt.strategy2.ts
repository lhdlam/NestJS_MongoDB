
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { JwtPayload } from './jwt-payload.intertface';
import { User } from './models/user.model';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY  || config.get('jwt.secret'),
    });
  }


  /**
   * function check user
   * @param payload 
   * @returns 
   */
  async validate(payload: JwtPayload):Promise<any> {
    const { email } = payload;
    const user = await this.userRepository.findByCondition({ email: email});
    if (!user) {
      throw new UnauthorizedException();
    }

    // const reponse_user = {
    //   name: user.name,
    //   email: user.email,
    // }
    return user
  }
}