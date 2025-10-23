import React from "react"

export default function Pad(props) {
    const audioRef = React.useRef(null);

    // light up the pad and play the sound
    function handleClick() {
        const audio = audioRef.current;
        if (!audio) return;

        props.press(props.id);
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }

    // turn the pad OFF when the sound ends
    function handleEnded() {
        props.release(props.id);
    }


    return (
        <button
            style={{ backgroundColor: props.color }}
            className={props.on ? "on" : undefined}
            onClick={handleClick}
        >
            <span className="pad-label">{props.label}</span>
            <audio ref={audioRef} src={props.sound} preload="auto" onEnded={handleEnded} />
        </button>
    )
}