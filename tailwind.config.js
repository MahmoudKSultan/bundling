/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				primary: "#872F8B",
				secondray: "#777171",
			},
			fontFamily: {
				cairo: ["Cairo", "sans-serif"],
			},
		},
	},
	plugins: [],
};
