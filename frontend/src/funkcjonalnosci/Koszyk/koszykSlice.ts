import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Koszyk } from "../../app/modele/koszyk";

interface KoszykState {
    koszyk: Koszyk | null;
    status: string;
}

const initialState: KoszykState = {
    koszyk: null,
    status: 'idle'
}

export const dodajKoszykItemAsync = createAsyncThunk<Koszyk, {zwierzeId: number, XXX?: number}>(
    'koszyk/dodajKoszykItemAsync',
    async ({zwierzeId, XXX = 1}, thunkAPI) => {
        try {
            return await agent.Koszyk.dodajItem(zwierzeId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const usunKoszykItemAsync = createAsyncThunk<void, 
    {zwierzeId: number, name?: string}>(
    'koszyk/usunKoszykItemAsync',
    async ({zwierzeId}, thunkAPI) => {
        try {
            await agent.Koszyk.usunItem(zwierzeId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const koszykSlice = createSlice({
    name: 'koszyk',
    initialState,
    reducers: {
        ustawKoszyk: (state, action) => {
            state.koszyk = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(dodajKoszykItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.zwierzeId;
        });
        builder.addCase(dodajKoszykItemAsync.fulfilled, (state, action) => {
            state.koszyk = action.payload;
            state.status = 'idle';
        });
        builder.addCase(dodajKoszykItemAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(usunKoszykItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.zwierzeId + action.meta.arg.name;
        });
        builder.addCase(usunKoszykItemAsync.fulfilled, (state, action) => {
            const {zwierzeId} = action.meta.arg;
            const itemIndex = state.koszyk?.przedmioty.findIndex(i => i.zwierzeId === zwierzeId);
            if (itemIndex === -1 || itemIndex === undefined||state.koszyk==null) return;
            state.koszyk.przedmioty.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(usunKoszykItemAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        })
    })
})

export const {ustawKoszyk} = koszykSlice.actions;