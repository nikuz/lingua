// @flow

import * as React from 'react';
import classNames from 'classnames';
import Overlay, { OverlayError } from '../overlay';
import Button, { ButtonBlue } from '../button';
import Icon from '../icon';
import type { TranslationResponse } from '../../types';
import './style.css';

const SHOW_MIN_TRANSLATIONS = 5;
const SHOW_MIN_DEFINITIONS = 1;
const SHOW_MIN_EXAMPLES = 1;

type Props = {
    translation: TranslationResponse,
    clear: () => *,
};

type State = {
    word?: string,
    translation?: string,
    image?: string,
    highestRelevantTranslation?: Array<any>,
    otherTranslations?: Array<any>,
    definitions?: Array<any>,
    definitionsSynonyms?: Array<any>,
    examples?: Array<any>,
    pronunciation?: string,
    showAllOtherTranslations: boolean,
    showAllDefinitions: boolean,
    showAllExample: boolean,
};

export default class TranslationView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const translation = props.translation;

        let newState = {
            word: translation.word,
            translation: translation.translation,
            image: translation.image,
            pronunciation: translation.pronunciation,
            showAllOtherTranslations: false,
            showAllDefinitions: false,
            showAllExample: false,
        };

        if (translation.raw) {
            const raw = translation.raw;
            const highestRelevantTranslation = raw[0];
            const otherTranslations = raw[1];
            const definitions = raw[12];
            const definitionsSynonyms = raw[11];
            const examples = raw[13];

            newState = {
                ...newState,
                highestRelevantTranslation,
                otherTranslations,
                definitions,
                definitionsSynonyms,
                examples,
            };
        }

        this.state = newState;
    }

    pronunciationEl: ?HTMLAudioElement;

    selectMainTranslationWord = (word: string) => {
        console.log(word);
    };

    playPronunciation = () => {
        if (this.pronunciationEl) {
            this.pronunciationEl.play();
        }
    };

    renderExpandButton = (type: string, text: string) => {
        const value = this.state[type];
        return (
            <ButtonBlue
                key={`${type}-expand-button`}
                text={text}
                className="tc-expand-button"
                onClick={() => {
                    this.setState({
                        [type]: !value,
                    });
                }}
            />
        );
    };

    renderOtherTranslationsItem = (item: Array<[] | string | number>) => {
        const word = String(item[0]);
        const synonyms = item[1];
        const frequency = Number(item[3]);
        const frequencySecondSectionClassName = classNames(
            'otci-frequency-item',
            frequency > 0.001 && 'active'
        );
        const frequencyThirdSectionClassName = classNames(
            'otci-frequency-item',
            frequency > 0.1 && 'active'
        );

        return (
            <div key={word} className="otc-item">
                <div className="otci-word">
                    <Button
                        className="otci-word-btn"
                        onClick={() => this.selectMainTranslationWord(word)}
                    >
                        {word}
                    </Button>
                </div>
                <div className="otci-synonyms">
                    {Array.isArray(synonyms) && synonyms.join(', ')}
                </div>
                <div className="otci-frequency">
                    <div className="otci-frequency-item active" />
                    <div className={frequencySecondSectionClassName} />
                    <div className={frequencyThirdSectionClassName} />
                </div>
            </div>
        );
    };

    renderOtherTranslations = () => {
        const {
            word,
            otherTranslations,
            showAllOtherTranslations,
        } = this.state;

        if (!otherTranslations) {
            return null;
        }

        let otherTranslationsCount = 0;
        let otherTranslationsShown = 0;

        const result = [
            <div
                key="other-translations"
                className="translation-category-container other-translations"
            >
                <h2 className="tc-title">
                    Translations of
                    &nbsp;
                    <span>{word}</span>
                </h2>
                {otherTranslations.map((category) => {
                    const categoryName = category[0];
                    const translations = category[2];
                    const categoryData = [];

                    otherTranslationsCount += translations.length;

                    const l = showAllOtherTranslations
                        ? translations.length
                        : SHOW_MIN_TRANSLATIONS;

                    for (let i = 0; i < l; i++) {
                        if (translations[i]) {
                            categoryData.push(translations[i]);
                            otherTranslationsShown++;
                        }
                    }

                    return (
                        <div key={categoryName} className="ot-category">
                            <h3 className="tc-subcategory-title">{categoryName}</h3>
                            {categoryData.map(this.renderOtherTranslationsItem)}
                        </div>
                    );
                })}
            </div>,
        ];

        if (otherTranslationsCount > SHOW_MIN_TRANSLATIONS) {
            result.push(
                this.renderExpandButton(
                    'showAllOtherTranslations',
                    showAllOtherTranslations
                        ? 'Show less translations'
                        : `Show more ${otherTranslationsCount - otherTranslationsShown} translations`
                )
            );
        }

        return result;
    };

    renderDefinitionsItem = (item: Array<string | number>, categoryName: string, key: number) => {
        const { definitionsSynonyms } = this.state;
        const definition = String(item[0]);
        const synonymsId = Number(item[1]);
        const example = String(item[2]);

        let synonyms;
        let synonymsCategory;
        if (definitionsSynonyms) {
            definitionsSynonyms.forEach((synonymsCategoryItem) => {
                if (synonymsCategoryItem[0] === categoryName) {
                    synonymsCategory = synonymsCategoryItem[1];
                }
            });
        }

        if (synonymsCategory) {
            synonymsCategory.forEach((synonym) => {
                if (Number(synonym[1]) === synonymsId) {
                    synonyms = synonym[0];
                }
            });
        }

        return (
            <div key={definition} className="dc-item">
                <div className="dci-number">{key + 1}</div>
                <div className="dci-text">{definition}</div>
                {example && (
                    <p className="dci-example">
                        &quot;
                        {example}
                        &quot;
                    </p>
                )}
                {synonyms && (
                    <div className="dci-synonyms">
                        <h4 className="dcis-title">Synonyms</h4>
                        {synonyms.map((synonymItem) => (
                            <div
                                key={synonymItem}
                                className="dc-item-synonym"
                            >
                                {synonymItem}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    renderDefinitions = () => {
        const {
            word,
            definitions,
            showAllDefinitions,
        } = this.state;

        if (!definitions) {
            return null;
        }

        let definitionsCount = 0;
        let definitionsShown = 0;

        const result = [
            <div
                key="definitions"
                className="translation-category-container definitions"
            >
                <h2 className="tc-title">
                    Definitions of
                    &nbsp;
                    <span>{word}</span>
                </h2>
                {definitions.map((category) => {
                    const categoryName = category[0];
                    const definitionsList = category[1];
                    const categoryData = [];

                    definitionsCount += definitionsList.length;

                    const l = showAllDefinitions
                        ? definitionsList.length
                        : SHOW_MIN_DEFINITIONS;

                    for (let i = 0; i < l; i++) {
                        categoryData.push(definitionsList[i]);
                        definitionsShown++;
                    }

                    return (
                        <div key={categoryName} className="definitions-category">
                            <h3 className="tc-subcategory-title">{categoryName}</h3>
                            {categoryData.map((item, key) => (
                                this.renderDefinitionsItem(item, categoryName, key)
                            ))}
                        </div>
                    );
                })}
            </div>,
        ];

        if (definitionsCount > SHOW_MIN_DEFINITIONS) {
            result.push(
                this.renderExpandButton(
                    'showAllDefinitions',
                    showAllDefinitions
                        ? 'Show less definitions'
                        : `Show more ${definitionsCount - definitionsShown} definitions`
                )
            );
        }

        return result;
    };

    renderExamples = () => {
        const {
            word,
            examples,
            showAllExample,
        } = this.state;

        if (!examples) {
            return null;
        }

        let examplesCount = 0;
        let examplesShown = 0;

        const result = [
            <div
                key="examples"
                className="translation-category-container examples"
            >
                <h2 className="tc-title">
                    Examples of
                    &nbsp;
                    <span>{word}</span>
                </h2>
                {examples.map((category, key) => {
                    const categoryData = [];

                    examplesCount += category.length;

                    const l = showAllExample
                        ? category.length
                        : SHOW_MIN_EXAMPLES;

                    for (let i = 0; i < l; i++) {
                        categoryData.push(category[i]);
                        examplesShown++;
                    }

                    return (
                        <div
                            key={key}
                            className="examples-category"
                        >
                            {categoryData.map((item, itemKey) => (
                                <div key={itemKey} className="examples-item">
                                    <p
                                        dangerouslySetInnerHTML={{ __html: item[0] }}
                                        className="examples-text"
                                    />
                                    <Icon src="quote" className="examples-icon" />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>,
        ];

        if (examplesCount > SHOW_MIN_EXAMPLES) {
            result.push(
                this.renderExpandButton(
                    'showAllExample',
                    showAllExample
                        ? 'Show less examples'
                        : `Show more ${examplesCount - examplesShown} examples`
                )
            );
        }

        return result;
    };

    render() {
        const {
            word,
            highestRelevantTranslation,
            pronunciation,
        } = this.state;

        if (!word || !highestRelevantTranslation) {
            return null;
        }

        let { translation } = this.state;

        if (!translation) {
            translation = highestRelevantTranslation[0][0];
        }

        if (word.toLowerCase() === translation.toLowerCase()) {
            return (
                <OverlayError
                    message="Can't translate"
                    onClick={this.props.clear}
                />
            );
        }

        return (
            <Overlay
                contentClassName="translation-container"
                withCloseButton
                closeIconClassName="translation-container-close-icon"
                onClick={this.props.clear}
            >
                <div>
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
                        <div className="tho-transcription">
                            {highestRelevantTranslation[1][3]}
                        </div>
                        { pronunciation && (
                            <div className="tho-pronunciation">
                                <audio
                                    ref={(el) => this.pronunciationEl = el}
                                    src={pronunciation}
                                    autoPlay
                                    crossOrigin="anonymous"
                                />
                                <Button
                                    leftIcon="speaker"
                                    leftIconClassName="tho-pronunciation-icon"
                                    onClick={this.playPronunciation}
                                />
                            </div>
                        ) }
                    </div>
                    {this.renderOtherTranslations()}
                    {this.renderDefinitions()}
                    {this.renderExamples()}
                </div>
            </Overlay>
        );
    }
}
