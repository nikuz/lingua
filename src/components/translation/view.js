// @flow

import * as React from 'react';
import Overlay, { OverlayError } from '../overlay';
import Button from '../button';
import Icon from '../icon';
import Loading from '../loading';
import type {
    TranslationResponse,
    ErrorObject,
} from '../../types';
import Pronunciation from '../pronunciation';
import OtherTranslations from './OtherTranslations';
import Definitions from './Definitions';
import Examples from './Examples';
import './style.css';

type Props = {
    apiUrl: string,
    translation: TranslationResponse,
    error: ?ErrorObject,
    imageLoading: boolean,
    image: ?string,
    imageError: ?ErrorObject,
    getImage: (word: string) => *,
    clear: () => *,
    removePronunciation: (word: string) => *,
};

type State = {
    word?: string,
    strangeWord?: boolean,
    translation?: string,
    image?: string,
    highestRelevantTranslation?: Array<any>,
    otherTranslations?: Array<any>,
    definitions?: Array<any>,
    definitionsSynonyms?: Array<any>,
    examples?: Array<any>,
    pronunciation?: string,
};

export default class TranslationView extends React.Component<Props, State> {
    state = {};

    shouldComponentUpdate = (nextProps: Props) => (
        (!this.props.translation && !!nextProps.translation)
        || (this.props.translation && !nextProps.translation)
        || this.props.error !== nextProps.error
        || (
            this.props.translation
            && nextProps.translation
            && this.props.translation.word !== nextProps.translation.word
        )
    );

    static getDerivedStateFromProps(newProps: Props) {
        const translation = newProps.translation || {};

        if (translation) {
            const word = translation.word;
            let translationWord = translation.translation;
            let strangeWord;
            let newState = {
                image: translation.image,
                pronunciation: translation.pronunciation,
            };

            let highestRelevantTranslation;
            let otherTranslations;
            let definitions;
            let definitionsSynonyms;
            let examples;

            if (translation.raw) {
                const raw = translation.raw;
                highestRelevantTranslation = raw[0];
                otherTranslations = raw[1];
                definitions = raw[12];
                definitionsSynonyms = raw[11];
                examples = raw[13];

                if (!translationWord) {
                    translationWord = highestRelevantTranslation[0][0];
                }

                strangeWord = word.toLowerCase() === translationWord.toLowerCase();
            }

            newState = {
                ...newState,
                word,
                strangeWord,
                translation: translationWord,
                highestRelevantTranslation,
                otherTranslations,
                definitions,
                definitionsSynonyms,
                examples,
            };

            return newState;
        }

        return null;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const {
            image,
            imageLoading,
            imageError,
        } = this.props;
        const {
            word,
            strangeWord,
        } = this.state;

        if (
            !prevState.word && word
            && !strangeWord
            && !image
            && !imageLoading
            && !imageError
        ) {
            this.props.getImage(word);
        }
    }

    selectMainTranslationWord = (word: string) => {
        console.log(word);
    };

    close = () => {
        const { word } = this.state;
        if (word) {
            this.props.removePronunciation(word);
        }
        this.props.clear();
    };

    render() {
        const {
            apiUrl,
            error,
            imageLoading,
            image,
            imageError,
        } = this.props;
        const {
            word,
            strangeWord,
            translation,
            highestRelevantTranslation,
            pronunciation,
            otherTranslations,
            definitions,
            definitionsSynonyms,
            examples,
        } = this.state;

        if (error) {
            return (
                <OverlayError
                    message={error.message}
                    onClick={this.props.clear}
                />
            );
        }

        if (!word || !highestRelevantTranslation) {
            return null;
        }

        return (
            <Overlay
                className="translation-container"
                contentClassName="translation-container-content"
                withCloseButton
                closeIconClassName="translation-container-close-icon"
                primary
                onClick={this.close}
            >
                <div className="translation-head">
                    <div className="th-translation-container">
                        <div className="thtc-original">{word}</div>
                        <div className="thtc-separator">
                            <Icon src="right-arrow" className="thtc-direction-icon" />
                        </div>
                        <div className="thtc-translation">
                            {translation}
                            {!!highestRelevantTranslation[0][4] && (
                                <Icon src="verified" className="th-verified-icon" />
                            )}
                        </div>
                    </div>
                    <div className="th-transcription">
                        {highestRelevantTranslation[1][3]}
                    </div>
                    <div className="th-footer">
                        { pronunciation && (
                            <Pronunciation
                                url={`${apiUrl}${pronunciation}`}
                            />
                        ) }
                        { !strangeWord && (
                            <Button
                                leftIcon="save"
                                leftIconClassName="th-save-button-icon"
                                onClick={this.selectMainTranslationWord}
                            />
                        ) }
                    </div>
                    <div className="th-image-container">
                        { imageLoading && <Loading size="small" /> }
                        { imageError && (
                            <Icon
                                src="broken-image"
                                className="thic-error"
                            />
                        ) }
                        { image && (
                            <img
                                src={image}
                                className="thic-image"
                            />
                        ) }
                    </div>
                </div>
                <OtherTranslations
                    word={word}
                    data={otherTranslations}
                    onSelect={this.selectMainTranslationWord}
                />
                <Definitions
                    word={word}
                    data={definitions}
                    synonymsData={definitionsSynonyms}
                />
                <Examples
                    word={word}
                    data={examples}
                />
            </Overlay>
        );
    }
}
