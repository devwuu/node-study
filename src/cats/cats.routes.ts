import {Cat, cats} from './cats.model';
import { Router, Request, Response } from 'express';

const router: Router = Router();

// 전체 고양이 조회
router.get('/cats', (req: Request, res: Response)=> {
    try {
        const response : Cat[] = cats;
        res.status(200).send({
            status: "success",
            cats : response
        });
    }catch (e: any){
        res.status(500).send({
            status: "fail",
            message: e.message
        })
    }
})

// 특정 고양이 데이터 조회
// 동적 라우팅 :paramName , req.params.paramName
router.get('/cats/:id', (req: Request, res:Response) => {
    res.status(200)
        .send( cats.find(c=> c.id === req.params.id) );
});

// 고양이 create
router.post('/cats', (req: Request, res: Response) =>{
    try {
        cats.push(req.body);
        console.log('cats', cats);
        res.status(201)
            .send({
                status: "success",
                cat: req.body
            })
    }catch (e: any) {
        res.status(500)
            .send({
                status: "fail",
                message: e.message
            });
    }
});

export default router;