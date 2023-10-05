import { Router } from 'express';
import * as service from './cats.service';
import { Request, Response } from 'express';
import { Cat } from './cats.model';


const router: Router = Router();

// 전체 고양이 조회
router.get('/cats', (req: Request, res: Response)=> {
    try {
        const response : Cat[] = service.findAll();
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
        .send( service.findById(req.params.id) );
});

// 고양이 등록
router.post('/cats', (req: Request, res: Response) =>{
    try {
        let created = service.create(req.body);
        res.status(201)
            .send({
                status: "success",
                cat: created
            })
    }catch (e: any) {
        res.status(500)
            .send({
                status: "fail",
                message: e.message
            });
    }
});

// 고양이 전체 수정
router.put("/cats", (req: Request, res : Response) => {
    let updated = service.updateAllById(req.body);
    res.status(200)
        .send(updated);
});

// 고양이 부분 수정
router.patch('/cats', (req: Request, res:Response) => {
    let updated = service.updateById(req.body);
    res.status(200)
        .send(updated);
})

// 고양이 삭제
router.delete('/cats/:id', (req: Request, res : Response) => {
    let result = service.deleteById(req.params.id);
    res.status(200)
        .send(result);
})

export default router;