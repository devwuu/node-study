import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  findAll(){
    return 'find all';
  }
  @Get('/:id')
  findById(@Param('id') id: string){
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
