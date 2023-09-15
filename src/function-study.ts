
// 함수 선언식
function add(a: number, b:number ) : number {
    return a + b;
}

console.log(add(1, 2));

// 함수 표현식
const plus = (a: number, b:number) : number => {
    return a + b;
}

console.log(plus(10, 11));

// 함수의 파라미터 정의
function printName( obj: { name: string } ) : void {
    console.log(`my name is ${obj.name}`);
}
printName({name: "kate"})

// 함수의 파라미터를 타입으로 정의
interface Person {
    name: string,
    age : number
}

const developer = ( a : Person ) => {
    console.log(`name: ${a.name} , age: ${a.age}`);
}

developer({age: 10, name:"길동"});