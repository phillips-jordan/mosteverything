class Shape {
    toString() {
        return "This shape has an area of " + this.area() + " and perimeter " + this.perimeter();
    }
}

class Rectangle extends Shape{
    constructor(a,b){
        super();
        this.width = a;
        this.height = b 
    }
    area(){
        return this.width*this.height
    }
    perimeter() {
        return (this.width+this.height)*2
    }
    // A rectangle is a shape
    // Every rectangle has a width and a height
    // Implement the constructor
    // Implement the area and perimeter methods
    // The constructor has two arguments: width and height
}

class Square extends Rectangle{
    constructor(a) {
        super(a,a);
    }
    // A square is a rectangle
    // Every square has a width and a height
    // The height and width of a square are always the same
    // Implement the constructor
    // Do not implement the area and perimeter methods. They should be inherited from Rectangle
    // The constructor has one argument
}


module.exports = {Shape, Rectangle, Square};