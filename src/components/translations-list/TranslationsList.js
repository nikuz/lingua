// @flow

import * as React from 'react';
import type { Translation } from '../../types';
import { ButtonRed } from '../button';
import Pronunciation from '../pronunciation';
import Loading from '../loading';
import './style.css';

type Props = {
    data: Translation[],
    total: number,
    apiUrl: string,
    loading: boolean,
    onScroll: () => *,
    onSelect: (translation: Translation) => *,
    onDelete: (translation: Translation) => *,
};

export default class TranslationsList extends React.Component<Props> {
    componentDidMount() {
        document.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollHandler);
    }

    thresholdIsSet: boolean = false;

    scrollHandler = () => {
        const { onScroll } = this.props;
        const documentElement = document.documentElement;

        if (documentElement instanceof HTMLElement) {
            const scrollHeight = documentElement.scrollHeight;
            const scrollPosition = documentElement.scrollTop;
            const height = documentElement.offsetHeight;


            if (scrollHeight - scrollPosition < height + 100) {
                if (!this.thresholdIsSet && onScroll instanceof Function) {
                    this.thresholdIsSet = true;
                    onScroll();
                }
            } else {
                this.thresholdIsSet = false;
            }
        }
    };

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
                <ButtonRed
                    leftIcon="delete"
                    leftIconClassName="tli-delete-icon"
                    className="tli-delete"
                    onClick={() => this.props.onDelete(item)}
                />
                <div
                    className="blocker"
                    onClick={() => this.props.onSelect(item)}
                />
            </li>
        );
    };

    render() {
        const {
            data,
            total,
            loading,
        } = this.props;

        if (!data.length) {
            return (
                <p className="translations-list-empty">
                  No translations found
                </p>
            );
        }

        return (
            <div className="translations-list-container">
                <p className="translations-list-total">
                    Total:
                    &nbsp;
                    <strong>{total}</strong>
                </p>
                <ul className="translations-list">
                    {data.map((item) => this.renderListItem(item))}
                    <li className="translations-list-loading">
                        { loading && <Loading size="small" /> }
                    </li>
                </ul>
            </div>
        );
    }
}
