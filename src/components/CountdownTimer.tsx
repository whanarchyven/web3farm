import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

interface countdownInterface {
    time:number,
    prefix?:string,
    timeLimits:'hours'|'minutes'|'seconds'
}

// Random component
const Completionist = () => <span>Selling start!</span>;

// Renderer callback with condition

const CountdownTimer = ({time, timeLimits, prefix}:countdownInterface) => {

    const renderer = ({ hours, minutes, seconds, completed }:any) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            switch (timeLimits){
                case "hours": return <span>{hours} {prefix}</span>;
                case "minutes":return <span>{hours}:{minutes} {prefix}</span>;
                case "seconds":return <span>{hours}:{minutes}:{seconds} {prefix}</span>;
            }
        }
    };


    return (
        <Countdown
            date={Date.now() + time}
            renderer={renderer}
        />
    );
};

export default CountdownTimer;