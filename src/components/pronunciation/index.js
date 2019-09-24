// @flow
import * as React from 'react';
import classNames from 'classnames';
import Button from '../button';
import './style.css';

type Props = {
    url: string,
    className?: string | { [className: string]: * },
}

type State = {
    playStarted: boolean,
};

export default class Pronunciation extends React.Component<Props, State> {
    state = {
        playStarted: false,
    };

    pronunciationEl: ?HTMLAudioElement;

    componentDidMount() {
        this.play();
    }

    play = () => {
        if (this.pronunciationEl) {
            this.pronunciationEl.play();
        }
    };

    stop = () => {
        if (this.pronunciationEl) {
            this.pronunciationEl.pause();
            this.pronunciationEl.currentTime = 0;
            this.setState({
                playStarted: false,
            });
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
                { playStarted
                    ? (
                        <Button
                            leftIcon="stop"
                            leftIconClassName="pronunciation-icon"
                            onClick={this.stop}
                        />
                    )
                    : (
                        <Button
                            leftIcon="speaker"
                            leftIconClassName="pronunciation-icon"
                            onClick={this.play}
                        />
                    )
                }
            </div>
        );
    };
}
