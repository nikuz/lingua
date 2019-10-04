// @flow

import * as React from 'react';
import type { Translation } from '../../types';
import Pronunciation from '../pronunciation';
import './style.css';

type Props = {
    data: Translation[],
    apiUrl: string,
    // onScroll: () => *,
    onSelect: (translation: Translation) => *,
};

export default class TranslationsList extends React.Component<Props> {
    renderListItem = (item: Translation) => {
        const { apiUrl } = this.props;

        return (
            <li key={item.id} className="tl-item">
                { item.pronunciation && (
                    <Pronunciation
                        url={`${apiUrl}${item.pronunciation}`}
                        className="tli-pronunciation"
                    />
                ) }
                <div className="tli-content">
                    <div className="tli-word">{item.word}</div>
                    <div className="tli-translation">{item.translation}</div>
                </div>
                { item.image && (
                    <div className="tli-image-wrapper">
                        <img src={`${apiUrl}${item.image}`} className="tli-image" />
                    </div>
                ) }
                <div
                    className="blocker"
                    onClick={() => this.props.onSelect(item)}
                />
            </li>
        );
    };

    render() {
        const { data } = this.props;

        return (
            <ul className="translations-list">
                {data.map((item) => this.renderListItem(item))}
            </ul>
        );
    }
}
