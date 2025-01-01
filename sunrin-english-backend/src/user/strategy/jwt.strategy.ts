import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload, done: VerifyCallback): Promise<any> {
    try {
      const user = await this.userRepository.findByAccountId(payload.accountId);

      if (user) {
        if (user.isBlocked == true) {
          throw new ForbiddenException('차단된 계정');
        }
        return done(null, user);
      } else {
        throw new UnauthorizedException(
          '토큰이 유효하지 않음',
          'INVALID_TOKEN',
        );
      }
    } catch (e) {
      return done(e);
    }
  }
}
