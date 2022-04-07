
export interface Book {
    id: number;
    title: string;
    chapters: Chapter[];
}

export interface Chapter {
    title: string;
    paragraphs: Paragraph[];
}

export interface Paragraph {
    text: string;
}