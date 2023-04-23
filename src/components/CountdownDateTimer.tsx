import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

interface countdownInterface {
    time:Date,
}

// Random component
const Completionist = () => <span>Presale start!</span>;

// Renderer callback with condition

const CountDownDateTimer = ({time}:countdownInterface) => {

    const renderer = ({ hours, minutes, seconds, completed, days }:any) => {
        return <span className={'font-normal text-orange font-museo'}>{days} days {hours} hours <br/>  {minutes} minutes {seconds} seconds</span>
    };


    return (
        <Countdown
            date={time}
            renderer={renderer}
        />
    );
};

export default CountDownDateTimer;