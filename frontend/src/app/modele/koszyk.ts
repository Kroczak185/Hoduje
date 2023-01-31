export interface KoszykPrzedmiot {
    zwierzeId: number;
    nazwa: string;
    cena: number;
    zdjecieUrl: string;
    typ: string;
    gatunek: string;
    lokalizacja: string;
    email: string;
}

export interface Koszyk {
    id: number;
    kupiecId: string;
    przedmioty: KoszykPrzedmiot[];
}



