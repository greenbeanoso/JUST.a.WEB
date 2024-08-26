var currentRotation = 0;
var isDragging = false; // 定義拖動狀態為假
var startX; // 定義開始拖動時的 X 座標
var stopX;
var box = document.getElementById("titleBOX");
var slider = document.getElementById("slider");
var content = document.getElementById("content");
var TitleText = document.getElementById("TitleText");
var buttons = document.getElementsByClassName("button");
var light = 100;

function UpdateColor() {
  light = Math.abs(((100 + currentRotation / 3.6) % 100) * 2 - 100);
  box.style.backgroundColor = `hsl(0, 0%, ${light}%)`;
  content.style.backgroundColor = `hsl(0, 0%, ${light}%)`;
  content.style.color = `hsl(0, 0%, ${100 - light}%)`;
  // text-shadow: -15px 5px #c7c7c7, 15px -5px #5e5e5e;
  // -webkit-text-stroke: 2px#000000;
  TitleText.style.textShadow = `-15px 5px hsl(0, 0%, ${
    50 + light / 2
  }%), 15px -5px hsl(0, 0%, ${50 - light / 2}%);`;
  TitleText.style.webkitTextStroke = `2px hsl(0, 0%, ${100 - light}%)`;
}

slider.style.transform = `rotate(${currentRotation}deg)`;
// 'mousedown' 事件，當用戶按下滑鼠時開始拖動
slider.addEventListener("mousedown", (e) => {
  isDragging = true; // 設置拖動狀態為真
  startX = e.clientX; // 記錄滑鼠按下時的 X 座標
  box.style.cursor = "grabbing"; // 改變游標為抓取狀態
});

// 'mousemove' 事件，當用戶拖動滑鼠時執行
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    // 計算拖動的距離，並根據需要更新 slider 的位置
    var deltaX = e.clientX - startX;
    var newRotation = currentRotation - deltaX / 100;
    // 更新元素的transform属性
    slider.style.transform = `rotate(${newRotation}deg)`;
    currentRotation = newRotation;
    if (currentRotation > 360 || currentRotation < -360) {
      currentRotation = currentRotation % 36;
    }
    // console.log(light);
    UpdateColor();
  }
});

// 'mouseup' 事件，當用戶鬆開滑鼠時停止拖動
document.addEventListener("mouseup", (e) => {
  if (isDragging) {
    isDragging = false; // 設置拖動狀態為假
    stopX = e.clientX; // 記錄滑鼠鬆開時的 X 座標
    box.style.cursor = "default"; // 恢復游標為默認狀態
  }
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    if (e.target.id === "sun") {
      currentRotation = 0;
    } else if (e.target.id === "moon") {
      currentRotation = 180;
    }
    slider.style.transform = `rotate(${currentRotation}deg)`;
    UpdateColor();
  });
}
