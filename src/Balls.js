const colors = ['#ff5733','#9cff33',"#33b8ff","#f033ff","#ff3349"];

function Ball(x,y,dx,dy,r) {
    this.x = x;
    this.y = y;
    this.dirX = dx;
    this.dirY = dy;
    this.radius = r; 
    this.color = colors[Math.floor(Math.random()*5)];
};

Ball.prototype.drawBall = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

Ball.prototype.updateBall = function(ctx) {
    //check for collisions with the wall
    if(this.x + this.radius > 500 || this.x - this.radius < 0) {
        this.dirX *= -1;
    }
    if(this.y + this.radius > 500 || this.y - this.radius < 0) {
        this.dirY *= -1;
    }
    //replace moved ball
    this.x += this.dirX;
    this.y += this.dirY;
}

export { Ball };