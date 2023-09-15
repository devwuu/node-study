
// 인터페이스
// 자바의 인터페이스와 거의 동일

// 인터페이스를 이용해서 타입을 지정할 수도 있다.
// 단, 이 경우엔 인터페이스에 정의된 속성이 모두 있어야 한다.
interface people {
    age: number
    // job: string
}
let logAge2 = (obj : people) => {
    console.log(`logAge2 ${obj.age}`)
}

let person = {
    name: 'anne',
    age: 10
}
logAge2(person)

// 만약 속성을 optional하게 주고 싶은 경우엔 속성 뒤에 ? 를 추가해준다
interface workman {
    age: number,
    job? : string
}
let logAge3 = (obj: workman) => {
    console.log(`logAge3 ${obj.age}`)
    console.log(`logAge3 ${obj.job ?? 'none'}`) // 옵션 속성으로 정의해주면 기본값 셋팅을 해줘야 에러가 발생하지 않는다.
}
logAge3(person)

// 읽기 전용 속성도 만들 수 있다
interface Beer{
    readonly brand : string,
    name: String
}

let cass : Beer = {
    name: "카스",
    brand: "진로"
}
// cass.brand = "하이트" // 읽기 전용 속성이기 때문에 객체 선언 후 수정할 수 없습니다
// 읽기 전용 배열도 있어요
let readonlyArr : ReadonlyArray<number> = [1, 2, 3];
// readonlyArr[0] = 2; // 읽기 전용 배열이기 때문에 수정할 수 없어요

// 인덱스 시그니처
interface MyBeer{
    [etc : string] : any // [etc : string] 속성의 키를 나타내는 부분. etc는 키 이름(그냥 변수 명)이고 string은 그 키의 타입이다.
    // 일반적으로 [key : string] 이라고 쓴다고 한다.
    // : any 는 속성의 value의 타입을 정하는 부분이다. 어떤 타입이든 가능하다는 any를 쓴 것
}

// 인터페이스에 함수 타입을 정의할 수도 있다
// 자바 람다식이랑 비슷하게 사용
// 파라미터와 return type을 정의한다
interface login{
    (username: string, password: string) :boolean;
}

let isLogin: login = (id: string, pw: string) => {
    console.log('is login?');
    return true;
}

// 인터페이스를 클래스로 구현할 수도 있다.
interface CraftBear {
    brandName: string,
    bearName() : string
}

class MyBear implements CraftBear{
    brandName: string = "카스"

    bearName(): string {
        return `My ${this.brandName}`;
    }
}

// 인터페이스 상속도 가능하다
interface Human {
    name : string
}

interface Female{
    age : number
}

// 이런 식으로 여러개 상속도 가능하다
interface Developer extends Human, Female{
    skill: string;
}

// 여러개 구현도 가능하다
class Devwuu implements Human, Female{
    age: number = 10;
    name: string = "devwuu";

}

let devwuu : Developer = {
    name: "devwuu",
    skill: "typescript",
    age: 0
}

let devwuu1 = {} as Developer;
devwuu1.name = "devwuu";
devwuu1.skill = "typescript"


// 인터페이스에 속성, 함수, 익명함수 모두 사용할 수 있다
// 인터페이스를 함수로 구현할 수 있다.
interface Wine {
    brand: string,
    isDelicious() : void,
    () : void
}

function redWine() : Wine {
    let my = (function () {
        console.log("this is redwine")
    }) as Wine;
    my.brand = "redwine";
    my.isDelicious = () => {
        console.log("is delecious!")
    }
    return my;
}

// 할당해서 사용하기
let veryRedWine = redWine();
veryRedWine();
veryRedWine.isDelicious();

// 그냥 사용하기
redWine().isDelicious();

// 익명함수가 없는 경우는 조금 더 복잡하지만 구현할 수 있다
interface shampain {
    brand: string,
    isDelicious() : void
}

function whiteShampain () : shampain {
    let my : shampain = {
        brand : "white",
        isDelicious() {
            console.log("is delicious!")
        }
    }
    return my;

    // return {
    //     brand : "white",
    //     isDelicious() {
    //         console.log("is delicious!")
    //     }
    // };
}

console.log(whiteShampain().brand)
whiteShampain().isDelicious();

// 함수 선언식 말고 함수 표현식으로도 구현할 수 있다.
let iceWine = ():Wine => {
    let my = (()=>{ console.log("ice wine") }) as Wine;
    my.brand = "ice Wine";
    my.isDelicious = () => {
        console.log("is delicious!!");
    }
    return my;
}

console.log(iceWine().brand);
iceWine().isDelicious();
