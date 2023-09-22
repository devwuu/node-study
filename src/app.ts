import * as express from 'express';
import * as bodyParser from 'body-parser';
import catRouter from './cats/cats.routes';

class Server {
    private app : express.Application;
    private static server : Server;
    private constructor() {
        const app : express.Application = express();
        this.app = app;
    }

    public static getExpress(){
        if(this.server){
            return this.server.app;
        }else{
           this.listen();
        }
    }

    public static listen(){
        if(!this.server){
            this.server = new Server();
            this.server.setMiddleware();
            // 서버 실행
            this.server.app.listen(8000, () => {
                console.log(`Example app listening at http://localhost:${8000}`);
            })
        }else{
            console.log("server already listen...");
        }
    }

    private setRoutes() {
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.send("hello cats world!"); // 응답
        });
        this.app.use(catRouter); // 라우터 등록, 미들웨어를 이용해서 라우터를 분리한다
    }

    private setMiddleware(){
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json()); // json body를 읽을 수 있도록 미들웨어 추가
        // 미들 웨어를 제일 마지막에 넣어두면 에러 처리할 때 사용할 수도 있다.
        this.setRoutes();
        this.app.use((req, res, next)=>{
            console.log("Router is Not exist");
            res.send("Not found").status(404);
        });
    }

}

function init() {
    Server.listen();
}

init();
