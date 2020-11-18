import { Ball } from "./Balls";

const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
let numBalls = 2000;
let balls = [];

const btns = document.querySelectorAll(".btn");
const num = document.getElementById("num");
let t0, t1;
let tt0, tt1;

//btns with timing in console of functions, huge difference
btns[1].addEventListener('click', function() {
    t0 = performance.now();
    complexCalc();
    t1 = performance.now();
    console.log("time to execute in ms",t1-t0);
});

//web workers
let worker = new Worker('Worker.js');

btns[0].addEventListener('click', function() {
    worker.postMessage("start");
    tt0 = performance.now();
    initBalls();
    animate();
});
worker.onmessage = function(e) {
    let d = e.data;
    num.innerText = d[e.data.length - 1];
    tt1 = performance.now();
    console.log("time to execute in ms",tt1-tt0);
};

function initBalls() {
    for(let i = 0; i < numBalls; i++) {
        let radius = 10;
        let x = Math.random() * (canvas.width-radius*2);
        let y = Math.random() * (canvas.width-radius*2);
        let dx = Math.floor((Math.random()*5)-1);
        let dy = Math.floor((Math.random()*5)-1);
        let b = new Ball(x,y,dx,dy,radius);
        balls.push(b);
    };
    //console.log(balls);
}

function animate() {
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
    balls.forEach(ball => {
        ball.drawBall(canvasContext);
        ball.updateBall(canvasContext);
    });
    requestAnimationFrame(animate);
};

function complexCalc() {
    let list = [];
    let number = 0;
    for(let i = 0; i < 3000000; i++) {
            number = i;
            list.push(number);
            num.innerText = number;
    };
    initBalls();
    animate();
}

