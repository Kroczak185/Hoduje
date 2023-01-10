import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Zwierze } from "../../app/modele/zwierze";
import { RootState } from "../sklep/configureStore";

const zwierzesAdapter = createEntityAdapter<Zwierze>();

export const fetchZwierzesAsync = createAsyncThunk<Zwierze[]>(
    'katalog/fetchZwierzesAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchZwierzeAsync = createAsyncThunk<Zwierze, number>(
    'katalog/fetchZwierzeAsync',
    async (zwierzeId, thunkAPI) => {
        try {
            return await agent.Catalog.details(zwierzeId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const katalogSlice = createSlice({
    name: 'katalog',
    initialState: zwierzesAdapter.getInitialState({
        zwierzesLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchZwierzesAsync.pending, (state) => {
            state.status = 'pendingFetchZwierzes';
        });
        builder.addCase(fetchZwierzesAsync.fulfilled, (state, action) => {
            zwierzesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.zwierzesLoaded = true;
        });
        builder.addCase(fetchZwierzesAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchZwierzeAsync.pending, (state) => {
            state.status = 'pendingFetchZwierze';
        });
        builder.addCase(fetchZwierzeAsync.fulfilled, (state, action) => {
            zwierzesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchZwierzeAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        })
    })
})

export const zwierzeSelectors = zwierzesAdapter.getSelectors((state: RootState) => state.katalog);