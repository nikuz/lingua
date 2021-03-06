// @flow
import * as React from 'react';
import { ButtonBlue } from '../button';

const SHOW_MIN_DEFINITIONS = 1;

type ItemProps = {
    id: number,
    data: Array<string | number>,
    categoryName: string,
    synonymsData?: Array<any>,
}

const Item = (props: ItemProps) => {
    const { synonymsData } = props;
    const definition = String(props.data[0]);
    const synonymsId = props.data[1];
    const example = String(props.data[2]);

    let synonyms;
    let synonymsCategory;
    if (synonymsData) {
        synonymsData.forEach((synonymsCategoryItem) => {
            if (synonymsCategoryItem[0] === props.categoryName) {
                synonymsCategory = synonymsCategoryItem[1];
            }
        });
    }

    if (synonymsCategory) {
        synonymsCategory.forEach((synonym) => {
            if (synonym[1] === synonymsId) {
                synonyms = synonym[0];
            }
        });
    }

    return (
        <div className="dc-item">
            <div className="dci-number">{props.id}</div>
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

type Props = {
    word: string,
    data?: Array<any>,
    synonymsData?: Array<any>,
};

type State = {
    expanded: boolean,
};

export default class TranslationDefinitionsView extends React.Component<Props, State> {
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
            synonymsData,
        } = this.props;
        const { expanded } = this.state;

        if (!data) {
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
                {data.map((category, key) => {
                    const categoryName = category[0];
                    const definitionsList = category[1];
                    const categoryData = [];

                    definitionsCount += definitionsList.length;

                    const l = expanded
                        ? definitionsList.length
                        : SHOW_MIN_DEFINITIONS;

                    for (let i = 0; i < l; i++) {
                        categoryData.push(definitionsList[i]);
                        definitionsShown++;
                    }

                    return (
                        <div key={`${categoryName}-${key}`} className="definitions-category">
                            <h3 className="tc-subcategory-title">{categoryName}</h3>
                            {categoryData.map((item, itemKey) => (
                                <Item
                                    key={itemKey}
                                    id={itemKey + 1}
                                    data={item}
                                    categoryName={categoryName}
                                    synonymsData={synonymsData}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>,
        ];

        const withExpandButton = definitionsCount > SHOW_MIN_DEFINITIONS
            && definitionsCount - definitionsShown > 0;

        if (withExpandButton) {
            result.push(
                <ButtonBlue
                    key="expand-button"
                    text={
                        expanded
                            ? 'Show less definitions'
                            : `Show more ${definitionsCount - definitionsShown} definitions`
                    }
                    className="tc-expand-button"
                    onClick={this.expand}
                />
            );
        } else {
            result.push(
                <div
                    key="expand-button-replacement"
                    className="tc-expand-replacement"
                />
            );
        }

        return result;
    }
}
