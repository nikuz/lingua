// @flow
import * as React from 'react';
import { ButtonBlue } from '../button';
import Icon from '../icon';

const SHOW_MIN_EXAMPLES = 1;

type Props = {
    word: string,
    examples?: Array<any>,
};

type State = {
    expanded: boolean,
};

export default class TranslationExamplesView extends React.Component<Props, State> {
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
            examples,
        } = this.props;
        const { expanded } = this.state;

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

                    const l = expanded
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

        const withExpandButton = examplesCount > SHOW_MIN_EXAMPLES
            && examplesCount - examplesShown > 0;

        if (withExpandButton) {
            result.push(
                <ButtonBlue
                    key="expand-button"
                    text={
                        expanded
                            ? 'Show less examples'
                            : `Show more ${examplesCount - examplesShown} examples`
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
