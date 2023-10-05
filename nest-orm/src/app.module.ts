import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as Joi from 'joi'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppController } from './app.controller'
import { UserEntity } from './users/users.entity'
import { UsersModule } from './users/users.module'
import { ProfileEntity } from './profiles/profiles.entity'
import { BlogEntity } from './blogs/blogs.entity'
import { VisitorEntity } from './visitors/visitors.entity'
import { TagEntity } from './tags/tags.entity'
import { BlogsModule } from './blogs/blogs.module'
import { TagsModule } from './tags/tags.module'
import { VisitorsModule } from './visitors/visitors.module'
import { ProfilesModule } from './profiles/profiles.module'
import { VisitorsModule } from './visitors/visitors.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: configService.get('DB_HOST'),
    // process.env.DB_HOST 대신 ConfigService를 사용한 것
    // 환경 변수가 module 말고 utils 등 다른 곳에서 쓰이는 경우도 있는데 이때는 proccess를 사용해주면 되는 듯?
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [UserEntity, ProfileEntity, BlogEntity, VisitorEntity, TagEntity],
    synchronize: true, //! set 'false' in production
    // ddl문 자동 생성. 이거 false하고 migration 해야 함
    autoLoadEntities: true,
    logging: true, // recommend: set 'false' in production
    keepConnectionAlive: true, // 연결 될 때까지 연결 시도
  }),
  inject: [ConfigService], // configService를 사용하기 위해서 의존성 주입을 한 것
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 환경변수 validation
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(5000),
        SECRET_KEY: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    BlogsModule,
    TagsModule,
    VisitorsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
