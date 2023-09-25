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
  findAll(){
    throw new HttpException('API IS BROKEN', HttpStatus.FORBIDDEN);
    return 'find all';
  }
  @Get('/:id')
  // @UseFilters(HttpExceptionFilter) // 필터는 특정 메서드, 특정 컨트롤러에만 적용할 수도 있다
  findById(@Param('id', ParseIntPipe, PositiveIntPipe) id: number){

    // Pipe는 자동으로 형변환 및 validation을 해줍니다
    console.log(typeof id);
    // Pipe는 여러개를 등록해서 사용 할 수 있습니다
    // 여러개를 사용할 경우 앞에서부터 순차적으로 실행됩니다 ( pipe-filter pattern)
    // 만약 중간에 validation error가 발생한다면 exception을 일으키며 로직을 탈출함

    // throw new HttpException('API IS BROKEN', HttpStatus.FORBIDDEN);
    // 에러 처리를 할 때 보통 이 에렇게 많이 사용합니다. 여기서 status는 http code

    // 필터, 파이프랑 관련된 라이프 사이클
    //https://docs.nestjs.com/faq/request-lifecycle#summary
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
