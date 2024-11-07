import ogImage from "./assets/images/opengraph.png"
import "./styles.css";
const navigationsEl = document.querySelector(".navigations");
const menuBtnEl = document.querySelector(".menu-btn");
const xBtnEl = document.querySelector(".x-btn");
const overlayEl = document.querySelector(".overlay");
const accordionEls = document.querySelectorAll(".accordion-el");
const links = navigationsEl.querySelectorAll("li > a")

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

	accordionEls.forEach((el) =>
		el.addEventListener("click", () => {
			el.classList.toggle("h-10");
			// rotate the arrow
			const arrow = el.querySelector("img");
			arrow.classList.toggle("rotate-180");
		})
	);
});

function showSidebar() {
	overlayEl.classList.remove("hidden");
	navigationsEl.classList.remove("hidden", "-translate-x-64");
}

function hideSidebar() {
	overlayEl.classList.add("hidden");
	navigationsEl.classList.add("hidden");
}
