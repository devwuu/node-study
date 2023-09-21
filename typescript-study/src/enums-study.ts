
enum Direction {
    "East",
    "North",
    "South",
    "West"
} // value는 0부터 시작

console.log(Direction.East);

//타입처럼 사용할 수 았어요
function printDriection(d: Direction) :void {
    console.log(d);
}

printDriection(Direction.South);

enum Gender {
    "Female" = "F",
    "Male" = "M",
    "Etc"= "E",
    // "N"
} // value를 할당하기 시작하면 전부 할당해줘야 합니다. 일부만 값을 할당해줄 순 없어요

console.log(Gender.Female);

// 숫자 value와 문자 value를 섞어 쓸 수 있습니다.
enum Mixed{
    "Str" = "s",
    "Number" = 12
}

console.log(Mixed.Str);
console.log(Mixed.Number);

// 이넘은 런타임 시에 실제 객체 형태로 존재합니다
enum Alphabet{
    X, Y, Z
}

function printX(obj: { X: number }){
    console.log(` X is ... ${obj.X}`);
}

printX(Alphabet); // 파라미터 key와 enum의 key가 동일하고 타입이 일치해야 합니다

// 사실 이거랑 똑같은 거 아닌가...?
function printName1(obj: {name: string}){
    console.log(`name is...  ${obj.name}`);
}

printName1({name: "princess"});

enum Princess {
    name = "pink"
}
printName1(Princess);

// 이넘 사용시 주의사항 keyof, keyogf와 typeof를 같이 써야 한다
// todo 나중에  type에 대해 공부한 뒤에 복습하기

enum LogLevel {
    "Error"= "ERROR",
    "Debug" = "DEBUG"
}

type LogLevelString = keyof typeof LogLevel;
let levels : LogLevelString = "Error";
console.log(levels)


// 리버스 맵핑
enum Study{
    typescript,
    java
}
let javaKey = Study.java; // java의 key 값을 가져온다
console.log(Study[javaKey]); // key값으로 value 접근
// 단, 리버스 맵핑은 문자형 이넘에는 불가능하다

enum Studys {
    typestript = "TY",
    java = "JAVA"
}

let tyKey = Studys.typestript;
// console.log(Studys[tyKey]); index(숫자)가 아니라서 접근 불가

export {

}