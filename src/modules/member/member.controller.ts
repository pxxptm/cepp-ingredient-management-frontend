import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MemberService } from './member.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from '../auth/decorator/currentuser.decorator';
import { IUser } from '../user/interface/user.interface';

@ApiTags('member')
@Controller('member')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('restaurant')
  async getRestaurantsByUserId(@CurrentUser() iuser: IUser) {
    return await this.memberService.getRestaurantsByUserId(iuser.sub);
  }

  @Get('user/:restaurantId')
  async getUsersByRestaurantId(@Param('restaurantId') restaurantId: string) {
    return await this.memberService.getUsersByRestaurantId(restaurantId);
  }
}
