"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./styles.css");
var navigationsEl = document.querySelector(".navigations");
var menuBtnEl = document.querySelector(".menu-btn");
var xBtnEl = document.querySelector(".x-btn");
var overlayEl = document.querySelector(".overlay");
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function () {
    return hideSidebar();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 767) {
      hideSidebar();
    }
  });
  menuBtnEl.addEventListener("click", function (e) {
    console.log("clicked");
    e.stopPropagation();
    showSidebar();
  });
  navigationsEl.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  xBtnEl.addEventListener("click", function (e) {
    e.stopPropagation();
    hideSidebar();
  });
});
function showSidebar() {
  overlayEl.classList.remove("hidden");
  navigationsEl.classList.remove("hidden", "-translate-x-64");
}
function hideSidebar() {
  overlayEl.classList.add("hidden");
  navigationsEl.classList.add("hidden");
}