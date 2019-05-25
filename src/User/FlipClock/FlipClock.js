import './flipclock.sass'

import React from 'react'


const AnimatedCard = ({ animation, digit }) => {
    return (
        <div className={`flipCard ${animation}`}>
            <span>{digit}</span>
        </div>
    );
};


const StaticCard = ({ position, digit }) => {
    return (
        <div className={position}>
            <span>{digit}</span>
        </div>
    );
};

let start = true;
let duration;
const FlipUnitContainer = ({ digit, shuffle, unit }) => {
    // assign digit values
    let currentDigit;
    let previousDigit;

    if (duration !== null) {
        currentDigit = digit;
        previousDigit = digit + 1;

        if (start) {
            previousDigit = currentDigit
            start = false
        }
        else {
            if (unit !== 'hours') {
                previousDigit = previousDigit === 60
                    ? 59
                    : previousDigit;
            }
        }
    }
    else {
        currentDigit = digit;
        previousDigit = digit - 1;

        previousDigit = previousDigit === -1
            ? 0
            : previousDigit;
    }
    // to prevent a value


    // add zero
    if (currentDigit < 10) {
        currentDigit = `0${currentDigit}`;
    }
    if (previousDigit < 10) {
        previousDigit = `0${previousDigit}`;
    }

    // shuffle digits
    const digit1 = shuffle
        ? previousDigit
        : currentDigit;
    const digit2 = !shuffle
        ? previousDigit
        : currentDigit;

    // shuffle animations
    const animation1 = shuffle
        ? 'fold'
        : 'unfold';
    const animation2 = !shuffle
        ? 'fold'
        : 'unfold';

    return (
        <div className={'flipUnitContainer'}>
            <StaticCard
                position={'upperCard'}
                digit={currentDigit}
            />
            <StaticCard
                position={'lowerCard'}
                digit={previousDigit}
            />
            <AnimatedCard
                digit={digit1}
                animation={animation1}
            />
            <AnimatedCard
                digit={digit2}
                animation={animation2}
            />
        </div>
    );
};

// class component
class FlipClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            hoursShuffle: true,
            minutes: 0,
            minutesShuffle: true,
            seconds: 0,
            secondsShuffle: true,
        };
    }

    componentDidMount() {
        duration = this.props.duration
        if (this.props.duration !== null) {
            const propstime = (this.props.duration) ? this.props.duration.split(":") : []
            const time = new Date();
            const h = time.getHours();
            const m = time.getMinutes();
            const s = time.getSeconds();
            this.setState({ h, m, s, hours: parseInt(propstime[0]), minutes: parseInt(propstime[1]), seconds: parseInt(propstime[2]) })
            this.timerID = setInterval(
                () => this.updateReverseTime(),
                50
            );
        }
        else {
            this.timerID = setInterval(
                () => this.updateTime(),
                50
            );
        }
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    updateTime() {

        const time = new Date();
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();
        if (this.state.h !== h || this.state.m !== m || this.state.s !== s) {

            let hours = this.state.hours
            let minutes = this.state.minutes;
            let seconds = this.state.seconds;
            if (seconds < 60) {
                seconds = seconds + 1;
                this.setState({
                    seconds,
                    secondsShuffle: !this.state.secondsShuffle
                })
            } else {
                if (seconds === 60) {
                    minutes = minutes + 1;
                    if (minutes < 60) {
                        this.setState({
                            minutes,
                            seconds: 0,
                            secondsShuffle: !this.state.secondsShuffle,
                            minutesShuffle: !this.state.minutesShuffle
                        })
                    }
                    else {
                        hours = hours + 1
                        this.setState({
                            hours,
                            minutes: 0,
                            seconds: 0,
                            hoursShuffle: !this.state.hoursShuffle,
                            minutesShuffle: !this.state.minutesShuffle,
                            secondsShuffle: !this.state.secondsShuffle
                        })
                    }
                }
            }
        }
        this.setState({ h, m, s })

    }
    updateReverseTime() {
        if (this.props.duration !== null) {
            const time = new Date();
            const h = time.getHours();
            const m = time.getMinutes();
            const s = time.getSeconds();
            if (this.state.h !== h || this.state.m !== m || this.state.s !== s) {

                if (this.state.hours !== 0 || this.state.minutes !== 0 || this.state.seconds !== 0) {
                    let hours = this.state.hours
                    let minutes = this.state.minutes;
                    let seconds = this.state.seconds;
                    if (seconds !== 0) {
                        seconds = seconds - 1;
                        if (seconds !== 0) {
                            this.setState({
                                seconds,
                                secondsShuffle: !this.state.secondsShuffle
                            })
                        }
                        else {
                            if (hours === 0 && minutes === 0) {
                                this.setState({
                                    seconds,
                                    secondsShuffle: !this.state.secondsShuffle
                                })
                            }
                            else {
                                if (minutes === 0) {
                                    minutes=59
                                    hours=hours-1
                                    this.setState({
                                        seconds,
                                        minutes,
                                        hours,
                                        hoursShuffle: !this.state.hoursShuffle,
                                        minutesShuffle: !this.state.minutesShuffle,
                                        secondsShuffle: !this.state.secondsShuffle
                                    })
                                }
                                else {
                                    this.setState({
                                        seconds,
                                        secondsShuffle: !this.state.secondsShuffle
                                    })
                                }
                            }
                        }
                    }
                    else if (minutes !== 0) {
                        minutes = minutes - 1;
                        
                        if (minutes !== 0) {
                            seconds=59;
                            this.setState({
                                minutes,
                                seconds,
                                minutesShuffle: !this.state.minutesShuffle,
                                secondsShuffle: !this.state.secondsShuffle
                            })
                        }
                        else {
                            if (hours !== 0) {
                                minutes=59;
                                seconds=59;
                                hours=hours-1;
                                this.setState({
                                    minutes,
                                    seconds,
                                    hours,
                                    hoursShuffle: !this.state.hoursShuffle,
                                    minutesShuffle: !this.state.minutesShuffle,
                                    secondsShuffle: !this.state.secondsShuffle
                                })
                            }
                            else {
                                seconds=59;
                                this.setState({
                                    minutes,
                                    seconds,
                                    minutesShuffle: !this.state.minutesShuffle,
                                    secondsShuffle: !this.state.secondsShuffle,
                                })
                            }
                        }
                    }
                    else {
                        if (hours !== 0) {
                            minutes=59;
                            seconds=59;
                            hours=hours-1;
                            this.setState({
                                minutes,
                                seconds,
                                hours,
                                hoursShuffle: !this.state.hoursShuffle,
                                minutesShuffle: !this.state.minutesShuffle,
                                secondsShuffle: !this.state.secondsShuffle
                            })
                        }
                    }
                    this.props.getTime(hours,minutes,seconds)
                }
                else {
                    this.props.onTimeOut()
                }
               
            }
            this.setState({ h, m, s })
        }
    }

    render() {
        const {
            hours,
            minutes,
            seconds,
            hoursShuffle,
            minutesShuffle,
            secondsShuffle
        } = this.state;

        return (
            <div className={'flipClock'}>
                <FlipUnitContainer
                    unit={'hours'}
                    digit={hours}
                    shuffle={hoursShuffle}
                />
                <FlipUnitContainer
                    unit={'minutes'}
                    digit={minutes}
                    shuffle={minutesShuffle}
                />
                <FlipUnitContainer
                    unit={'seconds'}
                    digit={seconds}
                    shuffle={secondsShuffle}
                />
            </div>
        );
    }
}
export default FlipClock 