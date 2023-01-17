import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import Przewijanie from "../../app/komponenty/Przewijanie";
import PrzyciskCheckBox from "../../app/komponenty/PrzyciskCheckBox";
import PrzyciskRadio from "../../app/komponenty/PrzyciskRadio";
import Ladowanie from "../../app/widoki/Ladownie";
import { useAppDispatch, useAppSelector } from "../sklep/configureStore";
import { fetchFilters, fetchZwierzetaAsync, setNumerStrony, setZwierzeParams, zwierzeSelectors } from "./katalogSlice";
import ZwierzeLista from "./ZwierzeLista";
import ZwierzeSzukaj from "./ZwierzeSzukaj";

const opcjeSortowania = [
    { value: 'nazwa', label: 'Alfebetycznie' },
    { value: 'cenaMalejaco', label: 'Cena - Od najwyższej do najniższej' },
    { value: 'cena', label: 'Cena - Od najniższej do najwyższej' },
]

export default function Katalog() {
    const zwierzeta = useAppSelector(zwierzeSelectors.selectAll);
    const { zwierzetaZaladowane, filtryZaladowane, typy, lokalizacja, zwierzeParametry, metaDane } = useAppSelector(state => state.katalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!zwierzetaZaladowane) dispatch(fetchZwierzetaAsync());
    }, [zwierzetaZaladowane, dispatch]);

    useEffect(() => {
        if (!filtryZaladowane) dispatch(fetchFilters());
    }, [filtryZaladowane, dispatch]);

    if (!filtryZaladowane) return <Ladowanie message="Ładowanie zwierząt..." />

    return (
        <>
            <Paper sx={{ mb: 2 }}>
                <ZwierzeSzukaj />
            </Paper>
            <Grid container columnSpacing={4}>
                <Grid item xs={3}>

                    <Paper sx={{ mb: 2, p: 2 }}>
                        <PrzyciskRadio
                            zaznaczonaWartosc={zwierzeParametry.sortuj}
                            opcje={opcjeSortowania}
                            onChange={(e) => dispatch(setZwierzeParams({ sortuj: e.target.value }))}
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <PrzyciskCheckBox
                            items={typy}
                            zaznaczony={zwierzeParametry.typy}
                            onChange={(items: string[]) => dispatch(setZwierzeParams({ typy: items }))}
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <PrzyciskCheckBox
                            items={lokalizacja}
                            zaznaczony={zwierzeParametry.lokalizacja}
                            onChange={(items: string[]) => dispatch(setZwierzeParams({ lokalizacja: items }))}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ZwierzeLista zwierzeta={zwierzeta} />
                </Grid>
                <Grid item xs={3} />

                <Grid item xs={9} sx={{ mb: 2 }}>
                    {metaDane &&
                        <Przewijanie
                            metaDane={metaDane}
                            onPageChange={(page: number) => dispatch(setNumerStrony({ numerStrony: page }))}
                        />}
                </Grid>
            </Grid>
        </>

    )
}