const canvas = document.getElementById('head');
//存储画布宽高
const H = canvas.height, W = canvas.width;
const sqrt3 = Math.sqrt(3);
//存储图形
const NUM = 3;
const graphs = [];
// 所有图形的外接圆半径
const radius = H / 4;

// 绘制图形
getVOI();
let oTimer = null;
clearInterval(oTimer);
oTimer = setInterval(function () {
    //更新小球运动状态
    updateVOI();
    //渲染小球
    renderVOI();
}, 20);

function getVOI() {
    let vx = Math.floor(Math.random() * 2 - 4),
        vy = Math.floor(Math.random() * 2 - 4);
    if (canvas.getContext) {
        for (let i = 0; i < NUM; i++) {
            const tempX = Math.floor(Math.random() * (W - radius) + radius);
            const tempY = Math.floor(Math.random() * (H - radius) + radius);
            vx += Math.floor(Math.random() - 2);
            vy += Math.floor(Math.random() - 2);
            const ball = {
                x: tempX,
                y: tempY,
                stepX: vx / 3,
                stepY: vy / 3,
                halfW: 0
            };
            graphs.push(ball);
        }
        graphs[0].halfW = radius * 2 / sqrt3;
        graphs[1].halfW = radius;
        graphs[2].halfW = radius / 2;
    }
}

function updateVOI() {
    for (let i = 0; i < graphs.length; i++) {
        graphs[i].x += graphs[i].stepX;
        graphs[i].y += graphs[i].stepY;
        bumpTest(graphs[i]);
    }
}

// 碰撞检测
function bumpTest(ele) {
    let w = ele.halfW;
    if (ele.x <= w) {
        ele.x = w;
        ele.stepX = -ele.stepX;
    }
    if (ele.x >= W - w) {
        ele.x = W - w;
        ele.stepX = -ele.stepX;
    }
    if (ele.y <= radius) {
        ele.y = radius;
        ele.stepY = -ele.stepY;
    }
    if (ele.y >= H - radius) {
        ele.y = H - radius;
        ele.stepY = -ele.stepY;
    }
}

function renderVOI() {
    //重置画布高度，达到清空画布的效果
    canvas.height = H;
    const color = 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')';
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        // 画 "V"
        ctx.beginPath();
        let x0 = graphs[0].x - radius * 2 / sqrt3,
            y0 = graphs[0].y - radius;
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0 + radius * 4 / sqrt3, y0);
        ctx.lineTo(graphs[0].x, y0 + radius * 2);
        ctx.lineTo(x0, y0);
        ctx.fillStyle = color;
        ctx.globalCompositeOperation = 'xor';
        ctx.closePath();
        ctx.fill();

        // 画 "O"
        ctx.beginPath();
        ctx.arc(graphs[1].x, graphs[1].y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.globalCompositeOperation = 'xor';
        ctx.closePath();
        ctx.fill();

        // 画 "I"
        ctx.beginPath();
        let x = graphs[2].x - radius / 2,
            y = graphs[2].y - radius;
        ctx.moveTo(x, y);
        ctx.lineTo(x + radius, y);
        ctx.lineTo(x + radius, y + radius * 2);
        ctx.lineTo(x, y + radius * 2);
        ctx.lineTo(x, y);
        ctx.fillStyle = color;
        ctx.globalCompositeOperation = 'xor';
        ctx.closePath();
        ctx.fill();
    }
}
