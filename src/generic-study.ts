
function getStr<T>(str: T): T{
    return str;
}

console.log(getStr("Hi"));
console.log(getStr(10));
console.log(getStr<string>("hello"))

// any 를 사용하지 않는 이유 : any는 타입검사를 하지 않기 때문
// getStr<string>(10); ==> 에러 발생. T를 string 으로 정의했는데 number값을 주었기 때문

// todo 조금 더 깊은 이해가 필요
// 제네릭 인터페이스
function logText<T>(text: T){
    return text;
}

let text : <T>(text: T) => T = logText;
        // text 변수 타입       // value

let text2: {<T>(text: T): T} = logText;

interface GenericLogText{
    <T>(text: T) : T;
}

let text4 : GenericLogText = logText;
// 인터페이스를 만들어서 타입을 이렇게 정해줄 수도 있다

// text1, text2, text4와 logText는 같은 의미의 함수이다
// text와 text2, text4에 logText 함수를 대입한 것과 같은 의미이다


let text3 = logText<string>;

interface GenericLogText2<T>{
    <T>(text: T) : T;
}

let text5 : GenericLogText2<string> = logText;
let text6 : GenericLogText2<number> = logText;

console.log(logText("hello"))
console.log(text("ty"))
console.log(text3("world"))
// console.log(text3(0)) T 타입을 string으로 정했기 때문에 에러가 발생한다
console.log(text4("hi"))
console.log(text5("10"))
console.log(text5(1)) // 이 친구는 왜 에러가 안나지?
console.log(text6("안녕하세요")) // 이 친구는 왜 에러가 안나지?

// 제네릭 클래스
class GenericMath<T> {
    pi! : T;
    sum!: (a: T, b: T) => T;
    // ! : 해당 속성이 항상 undefined나 null이 아님을 알려준다
}

let math = new GenericMath<number>();

// 제네릭 제약 조건
class LengthWise{
    length!: number;
}

function logTexts<T extends LengthWise>(str : T): T {
    console.log(str.length); // 제네릭 타입을 LengthWise의 자식 타입으로 한정하여 length가 있을 수 밖에 없음을 알려준다
    return str;
}

function getProperty<T, O extends keyof T>(obj: T, key: O): T[O]{
                    // T타입과 T타입의 키인 O로 제약조건을 준다
    return obj[key];
}

let obj = {
    name: "hello",
    job: "world"
}

console.log(getProperty(obj, "name"));
// console.log(getProperty(obj, "age")); // age는 obj의 속성이름 중에 없기 때문에 에러가 발생한다