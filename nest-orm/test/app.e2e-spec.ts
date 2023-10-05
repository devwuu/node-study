import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

// describe: 테스트 설명, 테스트를 하나의 모듈로 묶음
describe('AppController (e2e)', () => {
  let app: INestApplication

  // 테스트 전에 먼저 실행되는 로직
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    // nest app mount
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  // describe 안에 describe를 또 사용할 수 있다.
  //   AppController (e2e)
  //     ✓ / (GET) (16 ms)
  //     hello jest
  //       ✓ 2 + 2 = 4 (376 ms)
  describe('hello jest', () => {
    test('2 + 2 = 4', () => {
      expect(2 + 2).toBe(4)
    })
  })

  describe('users', () => {
    // 하나의 테스트 단위
    // test 나 it 이나 동일한 것임. 다만 nest 에서는 기본적으로 it을 사용
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/') // get 으로 / 에 요청하겠다
        .expect(200) // 기대되는 결과
        .expect('typeorm in nest, just coding')
    })

    it('/users (GET)', async () => {
      const requests = await request(app.getHttpServer()).get('/users')
      expect(requests.statusCode).toBe(401)
    })

    it('/users (POST)', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test1@gmail.com',
          username: 'test',
          password: '1234',
        })
        .expect(201)
    })

    it('/users/login (POST)', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: 'test1@gmail.com',
          password: '1234',
        })
        .expect(200)
        .expect((res) => res.headers['set-cookie']['jwt'] !== null)
    })
  })
})
