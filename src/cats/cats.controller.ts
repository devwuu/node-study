import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { CatsRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatResponseDto } from './dto/cat.response.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';
import { CurrentUser } from '../common/decorators/user.decorator';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '현재 고양이 가져오기',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findCurrentCat(@CurrentUser() cat) {
    return cat;
  }

  @ApiOperation({
    summary: '회원가입',
  })
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: CatResponseDto,
  })
  @Post()
  async signUp(@Body() body: CatsRequestDto) {
    console.log('body', body);
    const saved = await this.catsService.signUp(body);
    return saved;
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('/login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.login(data);
  }

  // @ApiOperation({
  //   summary: '로그아웃',
  // })
  // @Post('/logout')
  // logout() {
  //   return 'logout';
  // }

  @ApiOperation({
    summary: '고양이 이미지 업로드',
  })
  @Post('/upload')
  saveImg() {
    return 'save new img';
  }
}
