import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (key: never, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  },
);
