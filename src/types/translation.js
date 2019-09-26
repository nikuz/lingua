// @flow

export type TranslationResponse = {
    id?: number,
    word: string,
    translation?: string,
    pronunciation: string,
    raw: Array<any>,
    image?: string,
    created_at?: string,
};

export type ImageResponse = {
    image: string,
};

export type TranslationSaveRequest = {
    id?: number,
    word: string,
    translation: string,
    pronunciationURL: string,
    image?: string,
    raw: string,
};
