import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaDane } from "../../app/modele/podzial";
import { Zwierze, ZwierzeParametry } from "../../app/modele/zwierze";
import { RootState } from "../redux/configureStore";

const zwierzetaAdapter = createEntityAdapter<Zwierze>();

interface KatalogState {
    zwierzetaZaladowane: boolean;
    filtryZaladowane: boolean;
    status: string;
    typy: string[];
    lokalizacja: string[];
    zwierzeParametry: ZwierzeParametry;
    metaDane: MetaDane | null;
}

const zwierzeAdapter = createEntityAdapter<Zwierze>();

function axiosParametry(zwierzeParametry: ZwierzeParametry) {
    const parametry = new URLSearchParams();
    parametry.append('numerStrony', zwierzeParametry.numerStrony.toString());
    parametry.append('wielkoscStrony', zwierzeParametry.wielkoscStrony.toString());
    parametry.append('sortuj', zwierzeParametry.sortuj);
    if (zwierzeParametry.szukaj) parametry.append('szukaj', zwierzeParametry.szukaj);
    if (zwierzeParametry.typy.length > 0) parametry.append('typy', zwierzeParametry.typy.toString());
    if (zwierzeParametry.lokalizacja.length > 0) parametry.append('lokalizacja', zwierzeParametry.lokalizacja.toString());
    return parametry;
}

export const fetchZwierzetaAsync = createAsyncThunk<Zwierze[], void, {state: RootState}>(

    'katalog/fetchZwierzetaAsync',
    async (_, thunkAPI) => {
        const params = axiosParametry(thunkAPI.getState().katalog.zwierzeParametry);
        try {
            const response = await agent.Katalog.list(params);
            thunkAPI.dispatch(setMetaDane(response.metaDane));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchZwierzeAsync = createAsyncThunk<Zwierze, number>(
    'katalog/fetchZwierzeAsync',
    async (zwierzeId, thunkAPI) => {
        try {
            return await agent.Katalog.details(zwierzeId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'katalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Katalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function initParams() {
    return {
        numerStrony: 1,
        wielkoscStrony: 6,
        sortuj: 'nazwa',
        typy: [],
        lokalizacja: []
    }
}

export const katalogSlice = createSlice({
    name: 'katalog',
    initialState: zwierzetaAdapter.getInitialState<KatalogState>({
        zwierzetaZaladowane: false,
        filtryZaladowane: false,
        status: 'idle',
        typy: [],
        lokalizacja: [],
        zwierzeParametry: initParams(),
        metaDane: null
    }),
    reducers: {
        setZwierzeParams: (state, action) => {
            state.zwierzetaZaladowane = false;
            state.zwierzeParametry = {...state.zwierzeParametry, ...action.payload, pageNumber: 1};
        },
        setNumerStrony: (state, action) => {
            state.zwierzetaZaladowane = false;
            state.zwierzeParametry = {...state.zwierzeParametry, ...action.payload};
        },
        setMetaDane: (state, action) => {
            state.metaDane = action.payload;
        },
        resetZwierzeParams: (state) => {
            state.zwierzeParametry = initParams();
        },
        setZwierze: (state, action) => {
            zwierzeAdapter.upsertOne(state, action.payload);
            state.zwierzetaZaladowane = false;
        },
        removeZwierze: (state, action) => {
            zwierzeAdapter.removeOne(state, action.payload);
            state.zwierzetaZaladowane = false;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchZwierzetaAsync.pending, (state) => {
            state.status = 'pendingFetchZwierzeta';
        });
        builder.addCase(fetchZwierzetaAsync.fulfilled, (state, action) => {
            zwierzetaAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.zwierzetaZaladowane = true;
        });
        builder.addCase(fetchZwierzetaAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchZwierzeAsync.pending, (state) => {
            state.status = 'pendingFetchZwierze';
        });
        builder.addCase(fetchZwierzeAsync.fulfilled, (state, action) => {
            zwierzetaAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchZwierzeAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.typy = action.payload.typy;
            state.lokalizacja = action.payload.lokalizacja;
            state.filtryZaladowane = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        })
    })
})

export const zwierzeSelectors = zwierzetaAdapter.getSelectors((state: RootState) => state.katalog);

export const {setZwierzeParams, resetZwierzeParams, setMetaDane, setNumerStrony, setZwierze, removeZwierze} = katalogSlice.actions;