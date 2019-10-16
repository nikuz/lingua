// @flow

import * as React from 'react';
import Overlay from '../overlay';
import Button, { ButtonTransparent } from '../button';
import Icon from '../icon';
import Loading from '../loading';
import FloatButton from '../float-button';
import { translationSelectors } from '../../selectors';
import type {
    TranslationResponse,
    TranslationSaveRequest,
    ErrorObject,
} from '../../types';
import Pronunciation from '../pronunciation';
import OtherTranslations from './OtherTranslations';
import Definitions from './Definitions';
import Examples from './Examples';
import ImagePicker from './ImagePicker';
import './style.css';

type Props = {
    apiUrl: string,
    translation: TranslationResponse, // eslint-disable-line
    randomWord: ?string,
    imageLoading: boolean,
    image?: string,
    images: string[],
    imagePickerOpened: boolean,
    imageError: ?ErrorObject,
    randomWordDeleteLoading: boolean,
    getImage: (word: string) => *,
    onClose: () => *,
    onWordSelect: (data: TranslationSaveRequest) => *,
    selectImage: (image: string) => *,
    toggleImagePickerVisibility: () => *,
    deleteRandomWord: () => *,
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
    autoSpellingFix?: string,
};

export default class TranslationView extends React.Component<Props, State> {
    state = {};

    static getDerivedStateFromProps(newProps: Props) {
        const translation = newProps.translation || {};

        if (translation) {
            let word = translation.word;
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
            let autoSpellingFix = null;

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

                if (word !== highestRelevantTranslation[0][1]) {
                    autoSpellingFix = word;
                    word = highestRelevantTranslation[0][1];
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
                autoSpellingFix,
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
            && !translationSelectors.isCyrillicWord(word)
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

        if (translation && translation.raw && word && translationWord) {
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

    selectImage = (image: string) => {
        this.props.selectImage(image);
        this.props.toggleImagePickerVisibility();
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
            images,
            imageError,
            imagePickerOpened,
            randomWord,
            randomWordDeleteLoading,
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
            autoSpellingFix,
        } = this.state;
        let image = this.props.image;

        if (this.state.image) {
            image = `${apiUrl}${this.state.image}`;
        }

        if (!word || !highestRelevantTranslation) {
            return null;
        }

        const isCyrillicWord = translationSelectors.isCyrillicWord(word);
        const verified = translationWord === highestRelevantTranslation[0][0]
            && highestRelevantTranslation[0][4];
        const transcription = highestRelevantTranslation[1] && highestRelevantTranslation[1][3];

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
                            { isCyrillicWord && (
                                <Button
                                    text={translationWord}
                                    onClick={() => {
                                        this.selectMainTranslationWord(translationWord);
                                    }}
                                />
                            ) }
                            { !isCyrillicWord && translationWord }
                            {!!verified && (
                                <Icon src="verified" className="th-verified-icon" />
                            )}
                        </div>
                    </div>
                    <div className="th-transcription">
                        {transcription}
                    </div>
                    <div className="th-footer">
                        { pronunciation && (
                            <Pronunciation
                                url={`${apiUrl}${pronunciation}`}
                            />
                        ) }
                        { !isCyrillicWord && !strangeWord && !id && (
                            <Button
                                leftIcon="save"
                                leftIconClassName="th-save-button-icon"
                                disabled={imageLoading}
                                onClick={() => {
                                    this.selectMainTranslationWord(translationWord);
                                }}
                            />
                        ) }
                        { id && (
                            <ButtonTransparent
                                leftIcon="check"
                                leftIconClassName="th-save-button-icon-check"
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
                            <ButtonTransparent onClick={this.props.toggleImagePickerVisibility}>
                                <img
                                    src={image}
                                    className="thic-image"
                                />
                            </ButtonTransparent>
                        ) }
                        { !id && images.length > 1 && (
                            <Button
                                leftIcon="expand"
                                className="thic-image-expand-button"
                                onClick={this.props.toggleImagePickerVisibility}
                            />
                        ) }
                    </div>
                </div>
                { autoSpellingFix && (
                    <div className="tc-spelling-fix">
                        Original word
                        `
                        <b>{autoSpellingFix}</b>
                        `
                        had a spelling mistake
                    </div>
                ) }
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
                <ImagePicker
                    images={images}
                    currentImage={image}
                    opened={imagePickerOpened}
                    onClose={this.props.toggleImagePickerVisibility}
                    onSelect={this.selectImage}
                />
                { randomWord && !strangeWord && (
                    <FloatButton
                        icon="block"
                        color="red"
                        loading={randomWordDeleteLoading}
                        onClick={this.props.deleteRandomWord}
                    />
                ) }
            </Overlay>
        );
    }
}
