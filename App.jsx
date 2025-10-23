import React from "react"
import padsData from "./pads"
import Pad from "./Pad"

export default function App() {
    const [pads, setPads] = React.useState(padsData)

    // turn a pad ON
    function press(id) {
        setPads(prev =>
            prev.map(item => (item.id === id ? { ...item, on: true } : item))
        );
    }

    // turn a pad OFF
    function release(id) {
        setPads(prev =>
            prev.map(item => (item.id === id ? { ...item, on: false } : item))
        );
    }

    const buttonElements = pads.map(pad => (
        <Pad
            key={pad.id}
            id={pad.id}
            color={pad.color}
            on={pad.on}
            sound={`/sounds/${pad.sound}`}
            label={pad.label}
            press={press}
            release={release}
        />
    ));

    return (
        <main>
            <div className="pad-container">
                {buttonElements}
            </div>
        </main>
    )
}
