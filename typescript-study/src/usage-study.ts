

// 인덱싱
// 배열 요소를 제한하거나 접근을 제한하려면 인터페이스를 이용하면 된다
interface StringArray{
    [index: number] : string
}

interface ReadonlyStringArray {
    readonly [index: number] : string
}

let stringarr : StringArray = ['안', '녕'];
console.log(stringarr[0]);
stringarr[1] = 'heollo';
console.log(stringarr[1]);

let readOnlyArr : ReadonlyStringArray = ['안', '녕'];
// readOnlyArr[0] = "안녕"; // readonly 속성이기 때문에 한 번 초기호 된 이후엔 변경할 수 없다


// 유틸리티 타입
// 이미 정의해놓은 타입을 변환하기 좋은 타입 문법

interface Address {
    email : string,
    office: string,
    home: string
}

type MayHaveEmail = Partial<Address>;
// Partial : 특정 타입의 부분집합을 만족하는 타입을 정의한다 ( 특정 타입의 일부분(혹은 전체)을 만족하는 타입을 정의한다 )
let emails: MayHaveEmail = {
    email: "test@gmail"
};
let officeAndHome : MayHaveEmail = {
    office: "서울",
    home: "경기"
}
let allAddr : MayHaveEmail = {
    office: "서울",
    home: "경기",
    email: "test@gmail.com"
}

// Pick : 특정 타입에서 몇개의 속성만 골라 타입을 정의한다
const home : Pick<Address, 'email'> = {
    email : "test@gmail",
    // home: "경기" // email 만 선택 했기 때문에 추가 불가능
}

// 여러개 속성 선택도 가능합니다
const homeAndEmail : Pick<Address, 'email' | 'home'> = {
    email: "test@gmail",
    home: "경기"
};

interface Book {
    name: string,
    author: string,
    code: string
}

// Omit : 특정 타입에서 특정 속성을 제외한 타입을 정의한다
const cookBook : Omit<Book, 'code'> = {
    name: "요리비결",
    author: "백종원"
}

// 여러개의 속성을 제외할 수도 있습니다
const receiptBook : Omit<Book, 'code' | 'author'> = {
    name: "요리비법"
}

// 맵드 타입
// 기존에 정의되어 있던 ""타입""을 새로운 타입으로 변환해주는 문법을 의미합니다
// js의 map API 함수를 적용한 것이라고 보면 됨

type fruits = 'apple' | 'banana' | 'berry';
type FruitsPrice = {
    [K in fruits] : number
}
let menus : FruitsPrice = {
    apple: 100,
    banana: 200,
    berry: 300
}

interface User {
    name: string,
    job: string,
    age: number
}

type Subset<T> = {
    [K in keyof T]? : T[K]
    // T 타입의 키를 키로 만들고, value는 T 타입의 값의 타입으로 한다
    // ?  연산자는 optional 함을 이미한다
    // 따라서 T 타입의 속성 일부를 가지는 새로운 타입을 의미한다
}

let newbie : Subset<User> = {
    name: "Hello",
    age: 20
}
let oldbie : Subset<User> = {
    age: 30
}


// 비슷한 타입을 새로 선언해야할 때 사용할 수 있다
type UserInsert = {
    [K in keyof User] ? : User[K]
}

let newUser : UserInsert = {
    age: 100
}



export {

}