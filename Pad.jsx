import React from "react"

export default function Pad(props) {
    const audioRef = React.useRef(null)

    function handleClick() {
        const audio = audioRef.current
        if (!audio) return

        props.press(props.id)
        audio.currentTime = 0
        audio.play().catch(() => {
            props.release(props.id)
        })
    }

    function handleEndedOrError() {
        props.release(props.id)
    }

    return (
        <button
            style={{ backgroundColor: props.color }}
            className={props.on ? "on" : undefined}
            onClick={handleClick}
            aria-pressed={props.on}
        >
            <span className="pad-label">{props.label}</span>
            <audio
                ref={audioRef}
                src={props.sound}
                preload="auto"
                onEnded={handleEndedOrError}
                onError={handleEndedOrError}
            />
        </button>
    )
}
