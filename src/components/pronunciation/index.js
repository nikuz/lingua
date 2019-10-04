// @flow
import * as React from 'react';
import classNames from 'classnames';
import Button from '../button';
import './style.css';

type Props = {
    url: string,
    autoplay?: boolean,
    className?: string | { [className: string]: * },
}

type State = {
    playStarted: boolean,
};

export default class Pronunciation extends React.Component<Props, State> {
    static defaultProps = {
        autoplay: false,
    };

    state = {
        playStarted: false,
    };

    pronunciationEl: ?HTMLAudioElement;

    componentDidMount() {
        if (this.props.autoplay) {
            this.play();
        }
    }

    play = () => {
        if (this.pronunciationEl) {
            this.pronunciationEl.play();
        }
    };

    stop = () => {
        const audioEl = this.pronunciationEl;
        if (audioEl) {
            audioEl.pause();
            audioEl.currentTime = 0;
            this.setState({
                playStarted: false,
            });
        }
    };

    playToggle = () => {
        const { playStarted } = this.state;
        if (playStarted) {
            this.stop();
        } else {
            this.play();
        }
    };

    playStartedHandler = () => {
        this.setState({
            playStarted: true,
        });
    };

    playStoppedHandler = () => {
        this.setState({
            playStarted: false,
        });
    };

    render() {
        const {
            url,
            className,
        } = this.props;

        if (!url) {
            return null;
        }

        const { playStarted } = this.state;
        const containerClassName = classNames(
            'pronunciation-container',
            className
        );

        return (
            <div className={containerClassName}>
                <audio
                    ref={(el) => this.pronunciationEl = el}
                    src={url}
                    onPlay={this.playStartedHandler}
                    onEnded={this.playStoppedHandler}
                />
                <Button
                    leftIcon={playStarted ? 'stop' : 'speaker'}
                    leftIconClassName="pronunciation-icon"
                    onClick={this.playToggle}
                />
            </div>
        );
    }
}
