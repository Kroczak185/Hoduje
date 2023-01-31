import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { setZwierzeParams } from "./katalogSlice";

export default function ZwierzeSzukaj() {
    const {zwierzeParametry} = useAppSelector(state => state.katalog);
    const [szukaj, setSzukaj] = useState(zwierzeParametry.szukaj);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setZwierzeParams({szukaj: event.target.value}))
    }, 1000)

    return (
        <TextField
            label='Wyszukaj zwierze'
            variant='outlined'
            fullWidth
            value={szukaj || ''}
            onChange={(event: any) => {
                setSzukaj(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}