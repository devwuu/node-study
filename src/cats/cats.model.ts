export type Cat = {
    id: string,
    name: string,
    age: number,
    friends: string[]
};

export let cats: Cat[] = [
    {
        id: "a1",
        name: "cat1",
        age: 3,
        friends: ['a2']
    },
    {
        id: "a2",
        name: "cat2",
        age: 3,
        friends: ['a1', 'a3', 'a4']
    },
    {
        id: "a3",
        name: "cat3",
        age: 3,
        friends: ['a2', 'a1']
    },
    {
        id: "a4",
        name: "cat4",
        age: 3,
        friends: []
    },
]