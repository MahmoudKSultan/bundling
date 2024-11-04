import "./styles/main.scss";
import "./styles/button.scss";

// import { format } from "date-fns";
import React from "react";
import { createRoot } from "react-dom/client";
import wallpaper from "./assets/wallpaper.jpg";

// import _ from "lodash"; // not ree-shakable
import { isOdd } from "./isOdd";
import TestComponent from "./comp";
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
const randomNumber = generateRandomNumber();
console.log(randomNumber);
console.log(isOdd(randomNumber));
// console.log(_.sum([1, 2, 3, 4, 5]));

// console.log(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
async function hey() {
    await Promise.resolve();

    return "Hey!";
}

hey();

console.log("hello world");
console.log("hello world");
console.log("hello world");

function App() {
    const [count, setCount] = React.useState<number>(0);
    // return React.createElement(
    //     "button",
    //     {
    //         onClick: () => setCount(count + 1),
    //         style: {
    //             cursor: "pointer",
    //             background: "transparent",
    //             color: "black",
    //             border: "2px solid black",
    //         },
    //     },
    //     `Click me ${count}`
    // );
    return (
        <TestComponent>
            <button className="btn" onClick={() => setCount(count + 1)}>
                Counter {count}
            </button>
            <button
                onClick={() => {
                    throw new Error("error");
                }}
            >
                Show an error
            </button>
            <img src={wallpaper} alt="wallpaper" width={500} height={500} />
        </TestComponent>
    );
}

createRoot(document.getElementById("root") as HTMLElement).render(
    React.createElement(App)
);
