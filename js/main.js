var body = document.getElementById("body");
var baguepi = document.getElementById("baguepi");

var baguettes = 20;
var rotatingCounter = 0;

class Baguette {
    constructor(id, style){
        this.id = id;
        this.img = document.createElement("div");
        this.img.classList.add('js-baguette');

        this.img.id = this.id;

        this.img.style.width = style.size;
        this.img.style.height = style.size;

        this.img.style.backgroundImage = "url('http://localhost/baguette/img/baguette.png')";
        this.img.style.backgroundSize = style.size+"px "+style.size+"px";

        this.img.style.top = style.top;
        this.img.style.left = style.left;

        this.img.style.transform = "rotate("+style.rotate+"deg)";

        this.img.style.opacity = style.opacity;
    }

    display() {
        body.appendChild(this.img);
        this.img.addEventListener("click", this.click.bind(this));
    }

    click() {
        if(!this.img.classList.contains("rotate")){
            this.img.classList.add("rotate");
            rotatingCounter++;
        }else{

            //get current angle of the rotation of img
            var tr = window.getComputedStyle(this.img).getPropertyValue("transform");

            var values = tr.split('(')[1],
            values = values.split(')')[0],
            values = values.split(',');

            console.log(values[1]);

            var angle = Math.round(Math.asin(values[1]) * (180/Math.PI));
            console.log(angle);

            this.img.classList.remove("rotate");

            this.img.style.transform = "rotate("+angle+"deg)";
            rotatingCounter--;
        } 

        if(rotatingCounter == baguettes) {
            baguepi.classList.add("display");
        }
    }
}

var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var style = {
    size: "0",
    top: "0",
    left: "0",
    rotate: "0",
    opacity: "0"
};

for(var i = 0; i < baguettes; i++){
    style.size = getRandomNumber(35, 200);

    style.top = getRandomNumber(0, winHeight - (style.size+25));
    style.left = getRandomNumber(0, winWidth - (style.size+25));

    style.rotate = getRandomNumber(0, 359);

    style.opacity = getRandomNumber(0.1, 1);
    
    baguette = new Baguette(i, style);
    baguette.display();
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;  
}