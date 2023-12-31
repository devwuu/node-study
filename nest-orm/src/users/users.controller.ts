import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from './users.service'
import { UserLogInDTO } from './dtos/user-login.dto'
import { UserRegisterDTO } from './dtos/user-register.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './users.entity'
import { Repository } from 'typeorm'
import { OnlyPrivateInterceptor } from '../common/interceptors/only-private.interceptor'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { UserDTO } from './dtos/user.dto'
import { JwtAuthGuard } from './jwt/jwt.guard'

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name)

  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyPrivateInterceptor) // 로그인된 user가 아닐 경우 401 에러
  async getCurrentUser(@CurrentUser() currentUser: UserDTO) {
    return currentUser
  }

  @Post()
  async signUp(@Body() userRegisterDTO: UserRegisterDTO) {
    return await this.usersService.registerUser(userRegisterDTO)
  }

  @Post('login')
  async logIn(
    @Body() userLoginDTO: UserLogInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { jwt, user } = await this.usersService.verifyUserAndSignJwt(
      userLoginDTO.email,
      userLoginDTO.password,
    )
    response.cookie('jwt', jwt, { httpOnly: true }).status(200) // jwt token을 쿠키(header)에 담아서 보낸다
    return user
  }

  @Post('logout') // passthrough: 쿠키, 헤더 등을 특정 상황에 맞게 조작이 가능하게 하는 옵션
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt') // 쿠키(header)에 담긴 jwt token을 제거
  }
}
