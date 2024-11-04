import "./styles.css";
const navigationsEl = document.querySelector(".navigations");
const menuBtnEl = document.querySelector(".menu-btn");
const xBtnEl = document.querySelector(".x-btn");
const overlayEl = document.querySelector(".overlay");

document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("click", () => hideSidebar());
	window.addEventListener("resize", () => {
		if (window.innerWidth >= 767) {
			hideSidebar();
		}
	});
	menuBtnEl.addEventListener("click", (e) => {
		console.log("clicked");
		e.stopPropagation();
		showSidebar();
	});

	navigationsEl.addEventListener("click", (e) => {
		e.stopPropagation();
	});

	xBtnEl.addEventListener("click", (e) => {
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
