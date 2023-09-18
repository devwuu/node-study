
// 티입 호환
interface Ironman{
    name: string
}

class Avengers {
    name!: string;
}

let iroman : Ironman = new Avengers();
// Avengers 가 Ironman의 구현체가 아닌데도 에러가 발생하지 않는다.
// 구조적 타이핑

let hero: Avengers;
let devwuu2 = {
    name: "devwuu",
    location : "seoul"
};
hero = devwuu2;
// name 속성을 동일하게 갖고 있기 때문에 호환된다고 봄

function assemble(a: Avengers){
    console.log(a.name);
}

assemble(devwuu2);

// 이넘타입은 number와 호환되지만 이넘타입끼리는 호환되지 않습니다
enum Status {
    "Ready",
    "Waiting"
}

enum Color{
    "Red",
    "Blue"
}

let status1 = Status.Ready;
status1 = 0;
// status1 = Color.Red; 같은 0값이지만 대입될 수 없음

// 클래스 타입은 스태틱 멤버와 생성자를 제외하고 속성값을 비교해 호환합니다
class Member{
    username!: string;
    number! : number;
    static whois(){
        console.log("i am MEMBER");
    }
}

class User{
    static username : string ;
    address! : string;

}

let user: User = new User();
// user = new Member(); // static 멤버인 username, whois는 비교 대상에서 제외되고 address와 number가 남아서 비교되기 때문에 할당될 수 없다

// 제네릭은 속성에 타입 인자<T>가 할당되어있는지를 기준으로 비교합니다
class Empty<T>{
}

let numers:Empty<number> = new Empty();
let strings : Empty<string> = new Empty();
numers = strings;
// T 타입의 속성이 없기 때문에 에러가 발생하지 않는다

class NotEmpty<T> {
    data!: T;
}

let numbers : NotEmpty<number> = new NotEmpty();
let stringss : NotEmpty<string> = new NotEmpty();
// numbers = stringss;  // T 타입의 속성이 있기 때문에 에러가 발생한다