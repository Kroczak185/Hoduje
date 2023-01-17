export interface Zwierze {
    id: number;
    nazwa: string;
    opis: string;
    cena: number;
    wiek: number;
    waga: number;
    plec: number;
    zdjecieUrl: string;
    typ: string;
    gatunek: string;
    lokalizacja: string;
    zarezerwowane: boolean;
}

export interface ZwierzeParametry {
    sortuj: string;
    szukaj?: string;
    typy: string[];
    lokalizacja: string[];
    numerStrony: number;
    wielkoscStrony: number;
}