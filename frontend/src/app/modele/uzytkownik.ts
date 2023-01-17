import { Koszyk } from "./koszyk";

export interface Uzytkownik {
    email: string;
    token: string;
    koszyk?: Koszyk;
}