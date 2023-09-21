import * as express from 'express';
import * as bodyParser from 'body-parser';
import { cats } from './app.model';

const app: express.Express = express();
const port: number = 8000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// 미들웨어로서의 express
app.use((req, res, next)=>{
    console.log("This is middleware");
    next(); // request 와 mapping 되는 router를 실행합니다
})
// 출력 순서
// This is middleware
// This is router...

// 만약 특정 Url에만 middleware를 적용하고 싶다면..router에 next 함수를 파라미터로 추가해주면 middleware가 된다
app.get('/cats/a2', (req: express.Request, res: express.Response, next) => {
    console.log("find a2 cat...");
    next(); // router 실행
});
// 출력 순서
// This is middleware
// find a2 cat...
// This is router...

// routers ==> Spring의 Request Mapping
// get(url: /) 요청하면 응답은...
app.get('/', (req: express.Request, res: express.Response) => {
    console.log("This is router...")
    res.send({ cats }); // 응답
});

app.get('/cats/a1', (req: express.Request, res:express.Response) => {
    console.log("This is router...")
    res.send( cats.find(c=> c.id === 'a1') );
})

app.get('/cats/a2', (req: express.Request, res:express.Response) => {
    console.log("This is router...")
    res.send( cats.find(c=> c.id === 'a2') );
})

// app.use((req, res, next)=>{
//     console.log("This is middleware");
//     next(); // request 와 mapping 되는 router를 실행합니다
// })
// 코드를 위에서부터 실행시켜서 중간에 matching 되는 router를 찾으면 더이상 진행되지 않음
// 따라서 뒤에 있는 middleware의 경우 실행되지 않는다. (라우터에서 응답하고 끝나버리기 때문)
// 미들웨어는 코드 위치가 중요하다!

// 미들 웨어를 제일 마지막에 넣어두면 에러 처리할 때 사용할 수도 있다.
app.use((req, res, next)=>{
    console.log("Roter is Not exist");
    res.send("Not found").status(404);
})

// 서버 실행
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})