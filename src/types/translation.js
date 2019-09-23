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
