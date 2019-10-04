// @flow

import * as React from 'react';
import Overlay from '../overlay';
import Button from '../button';
import Icon from '../icon';
import Loading from '../loading';
import type {
    TranslationResponse,
    TranslationSaveRequest,
    ErrorObject,
} from '../../types';
import Pronunciation from '../pronunciation';
import OtherTranslations from './OtherTranslations';
import Definitions from './Definitions';
import Examples from './Examples';
import './style.css';

type Props = {
    apiUrl: string,
    translation: TranslationResponse, // eslint-disable-line
    imageLoading: boolean,
    image?: string,
    imageError: ?ErrorObject,
    getImage: (word: string) => *,
    onClose: () => *,
    onWordSelect: (data: TranslationSaveRequest) => *,
};

type State = {
    id?: number,
    word?: string,
    strangeWord?: boolean,
    translationWord?: string,
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

    static getDerivedStateFromProps(newProps: Props) {
        const translation = newProps.translation || {};

        if (translation) {
            const word = translation.word;
            let translationWord = translation.translation;
            let strangeWord;
            let newState = {
                id: translation.id,
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
                translationWord,
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
            id,
            word,
            strangeWord,
        } = this.state;

        if (
            !id
            && !prevState.word
            && word
            && !strangeWord
            && !image
            && !imageLoading
            && !imageError
        ) {
            this.props.getImage(word);
        }
    }

    selectMainTranslationWord = (value?: string) => {
        const {
            translation,
            image,
        } = this.props;
        const {
            id,
            word,
            pronunciation,
        } = this.state;
        const translationWord = value;

        if (translation && translation.raw && word && pronunciation && translationWord) {
            this.props.onWordSelect({
                id,
                word,
                translation: translationWord,
                pronunciationURL: pronunciation,
                image,
                raw: JSON.stringify(translation.raw),
            });
        }
    };

    close = () => {
        const { onClose } = this.props;

        if (onClose instanceof Function) {
            onClose();
        }
    };

    render() {
        const {
            apiUrl,
            imageLoading,
            imageError,
        } = this.props;
        const {
            id,
            word,
            strangeWord,
            translationWord,
            highestRelevantTranslation,
            pronunciation,
            otherTranslations,
            definitions,
            definitionsSynonyms,
            examples,
        } = this.state;
        let image = this.props.image;

        if (this.state.image) {
            image = `${apiUrl}${this.state.image}`;
        }

        if (!word || !highestRelevantTranslation) {
            return null;
        }

        const verified = translationWord === highestRelevantTranslation[0][0]
            && highestRelevantTranslation[0][4];

        return (
            <Overlay
                className="translation-container"
                contentClassName="translation-container-content"
                withCloseButton
                closeIconClassName="translation-container-close-icon"
                primary
                withBlurredBackground
                onClick={this.close}
            >
                <div className="translation-head">
                    <div className="th-translation-container">
                        <div className="thtc-original">{word}</div>
                        <div className="thtc-separator">
                            <Icon src="right-arrow" className="thtc-direction-icon" />
                        </div>
                        <div className="thtc-translation">
                            {translationWord}
                            {!!verified && (
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
                        { !strangeWord && !id && (
                            <Button
                                leftIcon="save"
                                leftIconClassName="th-save-button-icon"
                                onClick={() => {
                                    this.selectMainTranslationWord(translationWord);
                                }}
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
