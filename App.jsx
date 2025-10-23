import React from "react"
import padsData from "./pads"
import Pad from "./Pad"

export default function App() {
    // unlock audio on first user gesture
    React.useEffect(() => {
        const unlock = () => {
            const a = new Audio()
            a.muted = true
            a.play().catch(() => { })
            window.removeEventListener('pointerdown', unlock)
        }
        window.addEventListener('pointerdown', unlock, { once: true })
        return () => window.removeEventListener('pointerdown', unlock)
    }, [])

    const [pads, setPads] = React.useState(padsData)

    // turn a pad on
    function press(id) {
        setPads(prev => prev.map(item => item.id === id ? { ...item, on: true } : item))
    }

    // turn a pad off
    function release(id) {
        setPads(prev => prev.map(item => item.id === id ? { ...item, on: false } : item))
    }

    const buttonElements = pads.map(pad => (
        <Pad
            key={pad.id}
            id={pad.id}
            color={pad.color}
            on={pad.on}
            sound={`${import.meta.env.BASE_URL}sounds/${pad.sound}`}
            label={pad.label}
            press={press}
            release={release}
        />
    ))

    return (
        <main>
            <div className="pad-container">{buttonElements}</div>
        </main>
    )
}
