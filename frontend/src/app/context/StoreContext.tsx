import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Koszyk } from "../modele/koszyk";

interface StoreContextValue {
    koszyk: Koszyk | null;
    ustawKoszyk: (koszyk: Koszyk) => void;
    usunItem: (zwierzeId: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Oops - wystapił błąd');
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [koszyk, ustawKoszyk] = useState<Koszyk | null>(null);

    function usunItem(zwierzeId: number) {
        if (!koszyk) return;
        const copy = koszyk;
        const items = [...koszyk.przedmioty];
        const itemIndex = items.findIndex(i => i.zwierzeId === zwierzeId);
        if (itemIndex >= 0) {
            items.splice(itemIndex, 1);
            copy.przedmioty = items;
            {console.log("siema")}
            ustawKoszyk(copy);
        }
    }

    return (
        <StoreContext.Provider value={{koszyk, ustawKoszyk, usunItem}}>
            {children}
        </StoreContext.Provider>
    )
}