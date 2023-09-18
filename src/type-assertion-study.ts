
// 타입 단언
// 다른 언어늬 타입 캐스팅과 비슷한 방식으로 개발자가 확정적으로 타입을 정해주는 방식입니다


let str = "Hello world" as string;

interface Developer {
    position: string
}

// let back : Developer = {}  // position을 초기화해주지 않으면 에러가 발생한다
let back : Developer = {} as Developer; // 타입을 단언해주면 에러가 사라진다





export {

}