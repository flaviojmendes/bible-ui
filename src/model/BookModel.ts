
export interface Testament {
    abbrev: string;
    name: string;
    books: Book[];
}

export interface Book {
    abbrev: string;
    name: string;
    chapters: string;
}

export interface Chapter {
    verses: string[];
}

export interface Verse {
    text: string;
    book: string;
    verse: number;
    chapter: number;
}
