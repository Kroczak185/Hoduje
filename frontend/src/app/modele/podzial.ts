export interface MetaDane {
    aktualnaStrona: number;
    iloscStron: number;
    wielkoscStrony: number;
    suma: number;
}

export class PodzialOdpowiedz<T> {
    items: T;
    metaDane: MetaDane;

    constructor(items: T, MetaDane: MetaDane) {
        this.items = items;
        this.metaDane = MetaDane;
    }
}