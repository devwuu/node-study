import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// createParamDecorator를 사용해서 http param과 관련된 데코레이터를 만들 수 있다
// 여기선 request에서 user를 가져와 반환해주는 데코레이터를 만들었다.
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
