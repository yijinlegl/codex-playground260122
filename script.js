const toggleButton = document.getElementById("modeToggle");
const focusList = document.getElementById("focusList");

const extraFocusItems = [
  "女儿的绘画作品上传相册",
  "家庭财务与旅行预算更新",
  "亲子运动挑战 30 分钟",
];

let focusMode = false;

toggleButton.addEventListener("click", () => {
  focusMode = !focusMode;
  document.body.classList.toggle("focus-mode", focusMode);
  toggleButton.textContent = focusMode ? "退出专注模式" : "切换专注模式";

  if (focusMode) {
    const fragment = document.createDocumentFragment();
    extraFocusItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      fragment.appendChild(li);
    });
    focusList.appendChild(fragment);
  } else {
    while (focusList.children.length > 3) {
      focusList.removeChild(focusList.lastElementChild);
    }
  }
});
