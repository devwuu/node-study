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
  UseFilters
} from "@nestjs/common";
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from "../http-exception.filter";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  findAll(){
    throw new HttpException('API IS BROKEN', HttpStatus.FORBIDDEN);
    return 'find all';
  }
  @Get('/:id')
  // @UseFilters(HttpExceptionFilter) // 필터는 특정 메서드, 특정 컨트롤러에만 적용할 수도 있다
  findById(@Param('id', ParseIntPipe) id: number){

    // Pipe는 자동으로 형변환 및 validation을 해줍니다
    console.log(typeof id);

    // throw new HttpException('API IS BROKEN', HttpStatus.FORBIDDEN);
    // 에러 처리를 할 때 보통 이 에렇게 많이 사용합니다. 여기서 status는 http code
    return 'find By id';
  }
  @Post()
  create(@Body() body: Body){
    return 'create';
  }
  @Put('/:id')
  updateById(@Body('id') cat: Body){
    return 'update all';
  }
  @Patch('/:id')
  updatePartialById(@Body('id') cat: Body){
    return 'update partial';
  }
  @Delete('/:id')
  deleteById(@Param('id') id: string){
    return 'delete';
  }
}
