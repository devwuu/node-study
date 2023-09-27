import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
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
import { CurrentUser } from '../common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/utils/multer.options';

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
    summary: '모든 고양이 가져오기',
  })
  @Get('/all')
  findCats() {
    return this.catsService.findAll();
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
  @UseGuards(JwtAuthGuard) // 로그인된 사용자만 이용 가능
  // @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats'))) // 다중 파일 업로드
  @UseInterceptors(FileInterceptor('image', multerOptions('cats'))) // 단일 파일 업로드
  saveImg(
    @CurrentUser() cat: CatsRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('saved...', file);
    return this.catsService.uploadImg(cat, file);
  }
}
