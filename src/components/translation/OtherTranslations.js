// @flow
import * as React from 'react';
import classNames from 'classnames';
import Button, { ButtonBlue } from '../button';

const SHOW_MIN_TRANSLATIONS = 5;

type ItemProps = {
    data: Array<[] | string | number>,
    onClick: (word: string) => *,
}

const Item = (props: ItemProps) => {
    const word = String(props.data[0]);
    const synonyms = props.data[1];
    const frequency = Number(props.data[3]);
    const frequencySecondSectionClassName = classNames(
        'otci-frequency-item',
        frequency > 0.001 && 'active'
    );
    const frequencyThirdSectionClassName = classNames(
        'otci-frequency-item',
        frequency > 0.1 && 'active'
    );

    return (
        <div className="otc-item">
            <div className="otci-word">
                <Button
                    className="otci-word-btn"
                    onClick={() => props.onClick(word)}
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

type Props = {
    word: string,
    data?: Array<any>,
    onSelect: (word: string) => *,
};

type State = {
    expanded: boolean,
};

export default class TranslationOthersView extends React.Component<Props, State> {
    state = {
        expanded: false,
    };

    expand = () => {
        const { expanded } = this.state;
        this.setState({
            expanded: !expanded,
        });
    };

    render() {
        const {
            word,
            data,
        } = this.props;
        const { expanded } = this.state;

        if (!data) {
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
                {data.map((category) => {
                    const categoryName = category[0];
                    const translations = category[2];
                    const categoryData = [];

                    otherTranslationsCount += translations.length;

                    const l = expanded
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
                            {categoryData.map((item, key) => (
                                <Item
                                    key={key}
                                    data={item}
                                    onClick={this.props.onSelect}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>,
        ];

        if (otherTranslationsCount > SHOW_MIN_TRANSLATIONS) {
            result.push(
                <ButtonBlue
                    key="expand-button"
                    text={
                        expanded
                            ? 'Show less translations'
                            : `Show more ${otherTranslationsCount - otherTranslationsShown} translations`
                    }
                    className="tc-expand-button"
                    onClick={this.expand}
                />
            );
        }

        return result;
    }
}
