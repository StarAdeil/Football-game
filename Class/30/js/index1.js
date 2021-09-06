class Block {
	constructor(width,height,color){
		this["Ширина"] = width;
		this["Высота"] = height;
		this["Цвет"] = color;
	}
	creatBlock(id){
		id.style.width = this["Ширина"]+"px";
		id.style.height = this["Высота"]+"px";
		id.style.backgroundColor = this["Цвет"];
	}
}
class Circle extends Block{
	constructor(width,height,color,radius){
		super(width,height,color);
		this["Радиус"] = radius;
	} 
	creatCircle(id){
		this.creatBlock(id);
		id.style.borderRadius = this["Радиус"];
	}
}



let block1 = new Block(200,50,"red");
block1.creatBlock(document.getElementById("box"));
let block2 = new Circle(200,200,"red","50%");
block2.creatCircle(document.getElementById("circle"));
