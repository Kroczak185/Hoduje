import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../../app/api/agent";
import { Uzytkownik } from "../../app/modele/uzytkownik";
import { ustawKoszyk } from "../Koszyk/koszykSlice";

interface KontoState {
    uzytkownik: Uzytkownik | null;
}

const initialState: KontoState = {
    uzytkownik: null
}

export const zalogujUzytkownik = createAsyncThunk<Uzytkownik, FieldValues>(
    'konto/zalogujUzytkownik',
    async (data, thunkAPI) => {
        try {
            const uzytkownikDto = await agent.Konto.login(data);
            const {koszyk, ...uzytkownik} = uzytkownikDto;
            if (koszyk) thunkAPI.dispatch(ustawKoszyk(koszyk));
            localStorage.setItem('uzytkownik', JSON.stringify(uzytkownik));
            return uzytkownik;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchAktualnyUzytkownik = createAsyncThunk<Uzytkownik>(
    'konto/fetchAktualnyUzytkownik',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUzytkownik(JSON.parse(localStorage.getItem('uzytkownik')!)));
        try {
            const uzytkownikDto = await agent.Konto.aktualnyUzytkownik();
            const {koszyk, ...uzytkownik} = uzytkownikDto;
            if (koszyk) thunkAPI.dispatch(ustawKoszyk(koszyk));
            localStorage.setItem('uzytkownik', JSON.stringify(uzytkownik));
            return uzytkownik;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('uzytkownik')) return false;
        }
    }
)

export const kontoSlice = createSlice({
    name: 'konto',
    initialState,
    reducers: {
        wyloguj: (state) => {
            state.uzytkownik = null;
            localStorage.removeItem('uzytkownik');
            history.push('/');
        },
        setUzytkownik: (state, action) => {
            state.uzytkownik = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchAktualnyUzytkownik.rejected, (state) => {
            state.uzytkownik = null;
            localStorage.removeItem('uzytkownik');
            toast.error('Sesja wygasla, zaloguj sie ponownie');
            history.push('/');
        });
        builder.addMatcher(isAnyOf(zalogujUzytkownik.fulfilled, fetchAktualnyUzytkownik.fulfilled), (state, action) => {
            state.uzytkownik = action.payload;
        });
        builder.addMatcher(isAnyOf(zalogujUzytkownik.rejected), (state, action) => {
            throw action.payload;
        })
    })
})

export const {wyloguj, setUzytkownik} = kontoSlice.actions;