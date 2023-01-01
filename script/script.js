const imgURL = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = imgURL;

const SPEED = 3.1;

// ширина и высота птицы
const SIZE = [51, 36];

let index = 0;
let br = 200
let an = 0
let ch = null
let sa = 0

function fall() {
    if (br < (canvas.height - SIZE[1] / 2)) {
        br = br + 2
    } else {
        sa = 2
    }

    if (an < 60) {
        an = an + 0.7
    }

}

function jump() {
    if (br > ch - 100) {
        br = br - 2
    } else {
        sa = 0
    }

    if (an > -60) {
        an = an - 0.7
    }
}

function gameOver() {

}



const render = () => {
    index += 0.3;

    const backgroudX = -((index * SPEED) % canvas.width);

    const bgSource = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    };

    const bgPartOneResult = {
        x: backgroudX + canvas.width,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    };

    const bgPartTwoResult = {
        x: backgroudX,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    };

    ctx.drawImage(
        img,

        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,

        bgPartOneResult.x,
        bgPartOneResult.y,
        bgPartOneResult.width,
        bgPartOneResult.height
    );

    ctx.drawImage(
        img,

        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,

        bgPartTwoResult.x,
        bgPartTwoResult.y,
        bgPartTwoResult.width,
        bgPartTwoResult.height
    );


    // изображение птицы, которое копируем
    // из изображения-источника
    const birdSource = {
        x: 432,
        y: Math.floor((index % 9) / 3) * SIZE[1],
        width: SIZE[0],
        height: SIZE[1],
    };

    if (sa == 0) {
        fall()
    } else if (sa == 1) {
        jump()
    } else {
        gameOver()
    }


    let der = an * Math.PI / 180
    // координаты, по которым птица
    // будет расположена на Canvas
    const birdResult = {
        x: -SIZE[0] / 2, //,
        y: -SIZE[1] / 2, //br,
        width: SIZE[0],
        height: SIZE[1],
    };

    ctx.save()

    ctx.translate(canvas.width / 2, br)
    ctx.rotate(der)

    ctx.drawImage(
        img,

        birdSource.x,
        birdSource.y,
        birdSource.width,
        birdSource.height,

        birdResult.x,
        birdResult.y,
        birdResult.width,
        birdResult.height
    );

    ctx.restore()

    canvas.addEventListener('click', () => {
        ch = br
        sa = 1
    })

    window.requestAnimationFrame(render);
};

img.onload = render;