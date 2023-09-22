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

// 고양이 업데이트
router.put("/cats", (req: Request, res : Response) => {
    cats.forEach((cat, index) => {
                    // cat은 요소에 접근하기 위해 선언된 변수이기 때문에 cat 을 바꾼다고 값이 바뀌진 않는다
                    // 값을 바꾸려면 index가 필요함
        if(cat.id === req.body.id) cats[index] = req.body;
    });
    console.log('cats', cats);
    res.status(200)
        .send(req.body);
});

router.patch('/cats', (req: Request, res:Response) => {
    let result = {};
    cats.forEach((cat, index) => {
        if(cat.id === req.body.id) {
            cats[index] = {...cat, ...req.body};
            // cat과 req.body의 속성 및 값으로 새로운 객체를 만든다
            // 만약 둘이 겹치는 속성이 있으면 그 속성의 값은 req.body의 값으로 덮어씌워진다
            // 중복되는 속성의 경우 뒤쪽에 있는 객체 속성의 값으로 덮어씌워지기 때문에 순서가 중요하다!
            result = cats[index];
            console.log(result);
        }
    });
    res.status(200)
        .send(result);
})

router.delete('/cats/:id', (req: Request, res : Response) => {
    let index = cats.findIndex( (c:Cat) => c.id === req.params.id);
    cats.splice(index, 1);
    // import 된 요소는 다시 값을 할당할 수가 없어서 요소를 제외하는 식으로 구현함 (filter 사용 못했음...)
    res.status(200)
        .send(cats);
})

export default router;