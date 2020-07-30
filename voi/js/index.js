// logo文字VOI消失
function hideLogo() {
    let svg = document.getElementById("svg"),
        timer = null, alpha = 100;
    clearInterval(timer);
    // 让VOI的logo消失
    timer = setInterval(function () {
        if (alpha === 0) {
            clearInterval(timer);
            svg.style.display = "none";
            showMenu();
        } else {
            alpha -= 10;
            svg.style.opacity = alpha / 100;
            svg.style.filter = 'alpha(opacity:' + alpha + ')';
        }
    }, 30);
}

// 菜单出现
function showMenu() {
    let menu = document.getElementById("menu"),
        timer = null, alpha = 0;
    clearInterval(timer);
    // 让菜单出现
    menu.style.display = "block";
    menu.style.opacity = alpha / 100;
    timer = setInterval(function () {
        if (alpha === 100) {
            clearInterval(timer);
        } else {
            alpha += 10;
            menu.style.opacity = alpha / 100;
            menu.style.filter = 'alpha(opacity:' + alpha + ')';
        }
    }, 30);
}

// 设置页面重定向逻辑
/**
 * @return {boolean}
 */
function IsPC() {
    const userAgentInfo = navigator.userAgent,
        Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    for (let v = 0; v < Agents.length; v++)
        if (userAgentInfo.indexOf(Agents[v]) > 0) return false;
    return true;
}

let isClicked = [0, 0, 0],
    links = ['play.html', 'contact.html', 'about.html'];

function direct(dest) {
    let id = parseInt(dest);
    // 如果是电脑，悬浮的时候文字已经放大清晰，只需要点击一次
    if (IsPC()) window.location.href = links[id];
    else {
        // 如果是手机操作，那么第一次点击放大，第二次就打开页面
        for (let i = 0; i < isClicked.length; i++) {
            if (id !== i)
                isClicked[i] = 0;
        }
        if (++isClicked[id] === 2) {
            window.location.href = links[id];
            isClicked[id] = 0;
        }
    }
}