let circles = [];
let paused = false;
let deep = false;
let controls = true;
let bounce = true;
let timer = 0;
// Initial white background
bgColor = 255;
antiColor = 0;

strokeColor = 200;

// Global Variables
minSize = 10;
maxSize = 40;
numCircles = 200;

$(document).ready(function(){
    $('.submit').on("click", function(){
        $('#myForm').css('display', 'none');
        if($('#numCircles').val() > 0 && $('#numCircles').val() < 1000) {
            numCircles = $('#numCircles').val();
        }
        if($('#minSize').val() >= 1 && $('#minSize').val() <= 500) {
            minSize = $('#minSize').val();
        }
        if($('#maxSize').val() >= 1 && $('#maxSize').val() <= 500) {
            maxSize = $('#maxSize').val();
            if(maxSize < minSize) {
                maxSize = minSize
            }
        }
        for(let i = 0; i < numCircles; i++) {
            // console.log(numCircles);
            // console.log(minSize);
            // console.log(maxSize);
            circles[i] = new Circle(random(window.innerWidth), random(window.innerHeight), random(minSize, maxSize), random(255), random(255), random(255), random(255), random(-0.5,0.5), random(-0.5,0.5), random(-0.1,0.1));
        }
        // console.log(numCircles);
        // console.log(minSize);
        // console.log(maxSize);
        paused = false;
        timer = 0;
    });
    $('.cancel').on("click", function(){
        $('#myForm').css('display', 'none');
        paused = false; 
        timer = 0;
    });

});

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(255);
    // Initialize circles with randomness
    for(let i = 0; i < numCircles; i++) {
        circles[i] = new Circle(random(window.innerWidth), random(window.innerHeight), random(minSize, maxSize), random(255), random(255), random(255), random(255), random(-0.5,0.5), random(-0.5,0.5), random(-0.1,0.1));
    }
}
  
function draw() {
    if(!deep) {
        background(bgColor);
    }

    if(paused) {
        for(let i = 0; i < numCircles; i++) {
            circles[i].speedX = 0;
            circles[i].speedY = 0;
            circles[i].rotation = 0;
        }
    } else {
        for(let i = 0; i < numCircles; i++) {
            circles[i].speedX = circles[i].realSpeedX;
            circles[i].speedY = circles[i].realSpeedY;
            circles[i].rotation = circles[i].realRotation;
        }
    }


    for(let i = 0; i < numCircles; i++) {
        circles[i].draw();
    }


    if(controls) {

        push();
        fill(antiColor);
        textSize(16);
        text(round(frameRate()) + ' fps', 5, 25);
        text('Press \'CTRL\' for panel', 5, 50);
        text('Press \'D\' to fade canvas', 5, 75);
        text('Press \'C\' to hide controls', 5, 100);
        pop();

    }

    

    timer ++;

    if(deep) {
        background(bgColor, 200);
    }
}

function mouseClicked() {
    if(bgColor == 255 && !paused && timer > 10) {
        bgColor = 0;
        antiColor = 255;
        strokeColor = 55;
        timer = 0;
    } else if(bgColor == 0 && !paused && timer > 10) {
        bgColor = 255;
        antiColor = 0;
        strokeColor = 200;
        timer = 0;
    }
  
}

function keyPressed() {
    if(keyCode == 32 && !paused) {
        paused = true;
    } else if(keyCode == 32 && paused) {
        paused = false;
    }

    if(keyCode == 68 && !deep) {
        deep = true;
    } else if(keyCode == 68 && deep) {
        deep = false;
    }

    if(keyCode == 67 && !controls) {
        controls = true;
    } else if(keyCode == 67 && controls) {
        controls = false;
    }

    if(keyCode == 66 && !bounce) {
        bounce = true;
    } else if(keyCode == 66 && bounce) {
        bounce = false;
    }

    // Launch customize form with Tab key
    if(keyCode == 17) {
        paused = true;
        document.getElementById('myForm').style.display = 'block';
    }

    

    console.log(keyCode);

}

class Circle {
    constructor(x, y, size, color1, color2, color3, opacity, speedX, speedY, rotation) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color1 = color1;
        this.color2 = color2;
        this.color3 = color3;
        this.opacity = opacity;
        this.speedX = speedX;
        this.speedY = speedY;
        this.realSpeedX = speedX;
        this.realSpeedY = speedY;
        this.rotation = rotation;
        this.realRotation = rotation;
        this.currentRotation = rotation;
    }
  
    draw() {
        
        push();
        stroke(strokeColor, this.opacity);
        fill(this.color1, this.color2, this.color3, this.opacity);
        translate(this.x, this.y);

        if(this.rotation > 0.01 || this.rotation < 0.01) {
            this.currentRotation += this.rotation;
            rotate(this.currentRotation);
            line(-this.size/2, 0, this.size/2, 0);
            line(0, -this.size/2, 0, this.size/2);
        }
        
        ellipse(0, 0, this.size, this.size);

        pop();
    
        this.x += this.speedX;
        this.y += this.speedY;
    
        if(this.x >= window.innerWidth + this.size) {
            this.x = -this.size;
        }
        if(this.x <= -this.size) {
            this.x = window.innerWidth + this.size;
        }
        if(this.y >= window.innerHeight + this.size) {
            this.y = -this.size;
        }
        if(this.y <= -this.size) {
            this.y = window.innerHeight + this.size;
        }
    

        // Tried to make the balls bounce as well

        // if(this.x >= window.innerWidth - this.size) {
        //     this.speedX = -this.speedX;
        // }
        // if(this.x <= this.size) {
        //     this.speedX = -this.speedX;
        // }
        // if(this.y >= window.innerHeight - this.size) {
        //     this.speedY = -this.speedY;
        // }
        // if(this.y <= this.size) {
        //     this.speedY = -this.speedY;
        // }

       
    }
}