import React from "react";

function TestComponent({ children }: { children: React.ReactNode }) {
    return (
        <div>
            TestComponent
            <br />
            {children}
        </div>
    );
}

export default TestComponent;
