
// Problem 1
const filterEvenNumbers = (value: number[]): number[] =>  value.filter(num => num % 2 === 0);
filterEvenNumbers([1, 2, 3, 4, 5, 6]);


// Problem 2
const reverseString =(value:string)=>{
    return value.split("").reverse().join("");
}
reverseString("typescript");


// Problem 3
const checkType=(value: string | number)=>{
    if (typeof value === "string") {
        return "String"
    }else{
        return "Number"
    }
}

checkType("Hello");
checkType(42);


// Problem 4
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { id: 1, name: "John Doe", age: 21 };

getProperty(user, "name");


// Problem 5
interface Book {
    title: string;
    author: string;
    publishedYear: number;
}


const toggleReadStatus= (book: Book)=>{
    return{
        ...book,
        isRead:true
    }
}

const myBook = { title: "TypeScript Guide", author: "Jane Doe", publishedYear: 2024 };
toggleReadStatus(myBook);

class Person {
    name: string
    age: number

    constructor (name:string , age:number) {
        this.name = name
        this.age = age
    }
    getInfo(){
        return (`Name ${this.name}, Age ${this.age}`)
    }
}

class Student extends Person {
    private grade : string

    constructor (name:string, age:number, grade: string) {
        super(name,age)
        this.grade = grade
    }

    getDetails(){
        return (`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
}

const student = new Student("Alice", 20, "A");
student.getDetails();





const getIntersection=(arr1: number[], arr2: number[])=>{
    return([...arr1].filter(x => arr2.includes(x)));

}   

getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])

