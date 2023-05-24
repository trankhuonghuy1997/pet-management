"use strict";
// hàm lưu dữ liệu vào local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// hàm lấy dữ liệu vào local storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//  Bổ sung Animation cho Sidebar
const sideBar = document.querySelector("#sidebar");
const closeSideBar = document.querySelector(".close__sidebar");

sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});
