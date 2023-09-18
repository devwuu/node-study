
// 유니온 타입
// 둘 중 한가지 타입을 만족합니다
function add(a: number | string, b: number|string):number{
    let parsedA: number = 0;
    let parsedB: number = 0;

    if(typeof a === 'string'){
        parsedA = parseInt(a);
    }
    if(typeof b === 'string'){
        parsedB = parseInt(b);
    }
    if (typeof a === 'number'){
        parsedA = a;
    }
    if (typeof b === 'number'){
        parsedB = b;
    }

    return parsedA + parsedB;
}

console.log(add("1", "2"));

// 인터섹션 타입
// 둘 모두를 만족하는 타입입니다
interface Person {
    name: string,
    age: number,
    gender: string
}

interface Developer {
    skill: string,
    gender: string
}

type Backend = Person & Developer;
// Backend 타입은 사람과 개발자 타입을 모두 만족시키는 타입이 됩니다.
// 즉 Backend타입은
// {
//     name: string,
//     age: number,
//     skill : string
// }
// 으로 정의됩니다.
let devwuu : Backend = {
    name: "devwuu",
    age: 20,
    skill: "nodejs",
    gender: "F"
}


// type 키워드는 타입 알리아스를 정할때 사용한다
// 새로운 타입을 정의하거나 기존 타입들로 새 타입을 만들 때 사용할 수 있다.
// typeof는 오브젝트의 타입을 추출할 때 사용한다

let satbyeol = {
    name: "샛별",
    age: 12,
    gender: "F"
}

type dog = typeof satbyeol;

let dalii : dog = {
    name: "샛별",
    age: 10,
    gender: "F"
}

// 특정 오브젝트에서 타입을 추출해 해당 타입으로 새로운 오브젝트를 만들 수 있다.

// keyof는 해당 타입에서 키를 추출하여 문자열 유니온 타입으로 만듭니다
type dog2 = keyof typeof satbyeol;
let dalii2 : dog2 ; // dalii2 는 [ name | age | gender ] 타입이 됩니다. 즉 name 타입 또는 age 타입 또는 gender 타입이 됩니다.

enum Level {
    "Error" = "e",
    "Debug" = "d"
}

type LogLevel = keyof typeof Level; // Level의 key 값인 [ "Error" | "Debug" ] 타입
function printLevel (key : LogLevel){
    console.log(Level[key]); // key를 가지고 value를 출력
}

printLevel("Error"); // "Error"key의 value인 e 출력

// 유니온 타입을 사용할 때 주의할 점

class Dev {
    position! :string;
    gender! : string;
}



function printValue(obj : Person | Dev):void{
    // obj.name; --> 에러
    // obj 타입이 Person으로 들어올지 Developer로 들어올지 알 수 없기 때문에
    // 한 쪽 타입에만 있는 필드를 가져다가 사용할 수 없다.
    // 양쪽 다 있는 필드의 경우에 상관 없음
    console.log(obj.gender);

    // 만약 한쪽에만 있는 필드에 접근하고 싶다면 타입가드를 이용해 범위를 좁혀줘야 합니다.
    if ("name" in obj){
        console.log(obj.name);
    }
    if(obj instanceof Dev){
        console.log(obj.position); // 인터페이스는 instanceof 로 거를 수 없다
    }
    if(isDevType(obj)){
        console.log(obj.position); // 사용자정의 타입가드 함수
    }
}

// obj is Dev 는 타입가드를 정의하기 위해 사용
// 이 함수의 return 이 true 일 경우 obj가 Dev 타입임을 알려준다
// 그냥 boolean으로 정의하게 되면 이 retrun이 true여도 해당 타입이 Dev인지 알지 못해서
// console.log(obj.position); 에서 에러가 발생하게 된다
function isDevType(obj : any): obj is Dev{
    return obj.position !== undefined;
}

export {

}