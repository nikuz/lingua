// @flow

export type TranslationResponse = {
    id?: number,
    word: string,
    translation?: string,
    pronunciation?: string,
    raw: Array<any>,
    image?: string,
    created_at?: string,
};

export type ImageResponse = {
    images: string[],
};

export type TranslationSaveRequest = {
    id?: number,
    word: string,
    translation: string,
    pronunciationURL?: string,
    image?: string,
    raw: string,
};

export type Translation = {
    id: number,
    word: string,
    translation: string,
    pronunciation: string,
    raw: Array<any>,
    image: string,
    created_at?: string,
};

export type TranslationsListType = {
    from: number,
    to: number,
    totalAmount: number,
    translations: Translation[],
};

export type TranslationsListAmountResponse = {
    value: number,
};
