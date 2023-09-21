
// type은 타입변수를 선언할 때 사용합니다
// 값을 선언하는 것이 아니라 정의한 타입을 쉽게 참조하기 위해 사용합니다
type StrType = string;
let str : StrType = "hello";
console.log(str);

type Developer = {
    name: string,
    position: string
}

let frontend : Developer = {
    name: "hi",
    position: "front"
}

// 제네릭도 사용 가능합니다
type Hello<T> = {
    name : T
}

let world : Hello<number> = {
    name: 10
}

// 타입과 인터페이스의 차이점은 인터페이스는 확장이 가능한데 타입은 확장이 불가능한 점입니다
interface Dev{
    name: string
}

interface Backend extends Dev{
    position : string
}
class Frontend implements Dev{
    name = "world"
}
// 타입은 상속이나 구현이 안됩니다
// 따라서 확장성을 고려해서 인터페이스나 클래스로 만드는 것을 고려해보는 것이 좋겠습니다







export {

}