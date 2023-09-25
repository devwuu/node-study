import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param, ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters, UseInterceptors
} from "@nestjs/common";
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from "../common/exceptions/http-exception.filter";
import { PositiveIntPipe } from "../common/pipes/positiveInt.pipe";
import { SuccessInterceptor } from "../common/interceptors/success.interceptor";

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findCurrentCat(){
    return 'find current cat';
  }
  @Post()
  signUp(){
    return 'save new cat';
  }

  @Post('/login')
  login(){
    return 'login';
  }

  @Post('/logout')
  logout(){
    return 'logout';
  }

  @Post('/upload')
  saveImg(){
    return 'save new img';
  }

}
