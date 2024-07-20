
let backgroundPixels = [];
let range = 2;
let quality = 80;

function create_backgroundPixel(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = 1;
    this.height = 1;
    this.updatedInCycle = false;
}


function setup() {
    createCanvas(quality, quality);
    for (let x = 0; x < quality; x++) {
        for (let y = 0; y < quality; y++) {
            backgroundPixels.push(new create_backgroundPixel(x, y, "sky"));
        }
    }
    frameRate(50)
}


function draw() {
    background(30)
    noStroke();

    for (let i = 0; i < backgroundPixels.length; i++) {
        if (backgroundPixels[i].type == "sky") {
            fill(color(137, 207, 240));
        }

        if (backgroundPixels[i].type == "sand") {
            fill(color(218, 247, 166));
        }

        if (mouseIsPressed) {
            if (floor(mouseX) == backgroundPixels[i].x && floor(mouseY) == backgroundPixels[i].y) {
                backgroundPixels[i].type = "sand"

            }
        }

        rect(backgroundPixels[i].x, backgroundPixels[i].y, backgroundPixels[i].width, backgroundPixels[i].height);
    }

}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



function updatePixels() {
    for (let i = 0; i < backgroundPixels.length; i++) {
        backgroundPixels[i].updatedInCycle = false;
    }

    for (let i = 0; i < backgroundPixels.length; i++) {

        if (backgroundPixels[i].updatedInCycle == true) {
            continue;
        }

        if (backgroundPixels[i].type == "sand") {
            for (let i2 = 0; i2 < backgroundPixels.length; i2++) {
                if ((backgroundPixels[i].y + 1) == backgroundPixels[i2].y && backgroundPixels[i].x == backgroundPixels[i2].x) {
                    if (backgroundPixels[i2].type == "sky") {
                        backgroundPixels[i2].type = "sand";
                        backgroundPixels[i].type = "sky";
                        backgroundPixels[i2].updatedInCycle = true;
                    }
                }
            }
        }
    }

}

myInterval = setInterval(updatePixels, 60);
