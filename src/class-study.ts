class Developer{
    readonly name: string;
    position:string = ""; // 초기화를 해주지 않으면 에러가 발생합니다. config를 바꿔주면 에러를 막을 수 있긴 하지만 여기선 초기화로 진행합니다
    constructor(name: string) {
        this.name = name;
    }
}

let john = new Developer("John");
// john.name = "jane"; // readonly 속성은 수정할 수 없습니다
console.log(john.name);
john.position = "back";
console.log(john.position);

//접근제한자
class Person{

    private _name: string = "";
    private _age: number = 10;
    // private job: string = "";     // 속성에 _ prefix가 없으면 속성 이름과 geeter setter 의 이름이 겹치는 것으로 인식해 에러가 발생합니다

    // 타입스크립트의 getter 와 setter는 함수처럼 사용하는 것이 아니라 속성처럼 사용합니다
    // getter와 setter를 사용해서 속성에 접근할 수 있게 합니다

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    // get job(): string{
    //     return this.job;
    // }
}

let josh = new Person();
josh.name = "josh";
console.log(josh.name);
console.log(josh.age);
// josh.age = 20;  //setter 가 없으면 readonly 속성으로 인식합니다


// 추상 클래스
abstract class Female{
    abstract printName() :void; // 자식 클래스에서 꼭 구현을 해줘야 한다
    printGender():void{
        console.log("Female");
    }
    // 추상 메서드와 구현된 메서드 모두 작성할 수 있다
}

class BackendDev extends Female{
    printName() {
        console.log("devwuu");
    }
}

let backendDev = new BackendDev();
// let female = new Female(); 추상클래스는 생성자를 직접 사용할 수 없다
let female:Female = new BackendDev();
backendDev.printName();