import {Cat, cats} from './cats.model';
import e from "express";

// 전체 고양이 조회
export const findAll = () : Cat[] => {
    return cats;
}

// 특정 고양이 데이터 조회
// 동적 라우팅 :paramName , req.params.paramName
export const findById = (id : string) : Cat | undefined => {
   return cats.find(c=> c.id === id);
}

// 고양이 등록
export const create = (cat : Cat) : Cat => {
    cats.push(cat);
    console.log('cats', cats);
    return cat;
}

// 고양이 전체 수정
export const updateAllById = (updated: Cat) : Cat => {
    cats.forEach((cat, index) => {
        if(cat.id === updated.id) cats[index] = updated;
    });
    console.log('cats', cats);
    return updated;
}

// 고양이 부분 수정
export const updateById = (updated: Cat) : Cat | {} => {
    let result = {};
    cats.forEach((cat, index) => {
        if(cat.id === updated.id) {
            cats[index] = {...cat, ...updated};
            result = cats[index];
            console.log(result);
        }
    });
    return result;
}

// 고양이 삭제
export const deleteById = (id: string) : Cat[] => {
    let index = cats.findIndex( (c:Cat) => c.id === id);
    cats.splice(index, 1);
   return cats;
}