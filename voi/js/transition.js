const canvas = document.getElementById("head"), ctx = canvas.getContext('2d');
const H = window.innerHeight, W = window.innerWidth,
    R = H / 20, diff = R / 20;
let vertices = [], timer = null;
for (let i = R / 2; i < W; i += R) {
    for (let j = R / 2; j < H; j += R) {
        vertices.push({
            x: i,
            y: j,
            radius: 2 * R
        });
    }
}
// console.log(vertices.length);
clearInterval(timer);

// 开场特效，屏幕黑点遍布，底色为白色
window.onload = function() {
    let dist = Math.floor(Math.sqrt((W / 2 - R / 2) ** 2 + (H / 2 - R / 2) ** 2));
    timer = setInterval(function () {
        canvas.height = H;
        canvas.width = W;
        ctx.rect(0, 0, W, H);
        ctx.fillStyle = "white";
        ctx.fill();
        let continueDrawing = false;
        for (let i = 0; i < vertices.length; i++) {
            let currentDist = Math.floor(Math.sqrt((W / 2 - vertices[i].x) ** 2 + (H / 2 - vertices[i].y) ** 2));
            if (dist <= currentDist) {
                vertices[i].radius -= diff;
            }
            if (vertices[i].radius > 0) {
                ctx.beginPath();
                ctx.arc(vertices[i].x, vertices[i].y, vertices[i].radius, 0, 2 * Math.PI);
                ctx.fillStyle = "black";
                ctx.closePath();
                ctx.fill();
                continueDrawing = true;
            }
        }
        if (!continueDrawing) {
            clearInterval(timer);
        }
        dist -= R / 2;
    }, 20);
}
