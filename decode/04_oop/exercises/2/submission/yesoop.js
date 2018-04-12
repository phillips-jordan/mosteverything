class Teacher {
    constructor(n){
        this.name = n;
        this.hoursTaught = 0;
    }
    teach(student) {
        student.fundamentalsProficiency = student.fundamentalsProficiency + 1;
        this.hoursTaught = this.hoursTaught + 1;
    }
    dadJoke() {
        console.log(this + " made a funny");
    }
}

class Student {
    constructor(n, we){
        this.name = n;
        this.fundamentalsProficiency = 0;
        this.workEthic = we;
    }
    getProficiency(student) {
        return this.fundamentalsProficiency;
    }
    doProject() {
        if (this.fundamentalsProficiency < 5) {
            console.log(this.name + " was not ready to take on the project");
        } else {
            console.log(this.name + " successfully completed the project!");
        }
    }
    study() {
        this.fundamentalsProficiency = this.fundamentalsProficiency + this.workEthic;
    }
}


var jack = new Teacher("jack");
var bob = new Student("bob", 10);
var susan = new Student("susan", 12);
jack.teach(bob);
jack.teach(susan);
bob.doProject();
susan.doProject();
bob.study();
susan.study();
bob.doProject();
susan.doProject();


