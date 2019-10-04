// @flow
import * as React from 'react';
import Overlay from '../overlay';
import Button from '../button';

type Props = {
    opened: boolean,
    images: string[],
    onSelect: (image: string) => *,
    onClose: () => *,
};

export default function TranslationImagePicker(props: Props) {
    const {
        opened,
        images,
    } = props;

    if (!opened) {
        return null;
    }

    return (
        <Overlay
            withCloseButton
            className="translation-image-picker-overlay"
            contentClassName="translation-image-picker-overlay-content"
            onClick={props.onClose}
        >
            {images.map((image: string, key: number) => (
                <Button
                    key={key}
                    className="tipo-button"
                    onClick={() => props.onSelect(image)}
                >
                    <img
                        src={image}
                        className="tipo-image"
                    />
                </Button>
            ))}
        </Overlay>
    );
}
