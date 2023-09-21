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

// 출력 순서
// This is middleware
// This is router...

// 서버 실행
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})