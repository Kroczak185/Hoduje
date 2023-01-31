import { Typography, Grid, Paper, Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import agent from "../../app/api/agent";
import { Zwierze } from "../../app/modele/zwierze";
import { setZwierze } from "../katalog/katalogSlice";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";

export default function ZwierzeForm() {

    const [nazwa,setNazwa] = useState("");
    const [opis,setOpis] = useState("");
    const [zdjecieUrl,setZdjecieUrl] = useState("");
    const [cena,setCena] = useState(0);
    const [wiek,setWiek] = useState(0);
    const [waga,setWaga] = useState(0);
    const [typ,setTyp] = useState("");
    const [gatunek,setGatunek] = useState("");
    const [lokalizacja,setLokalizacja] = useState("");

    const dispatch = useAppDispatch();

    const { uzytkownik } = useAppSelector(state => state.konto);

    async function handleSubmitData() {
        var zwierzeT: Zwierze = {
            id: 12,
            nazwa: nazwa,
            opis: opis,
            cena: cena,
            wiek: wiek,
            waga: waga,
            zdjecieUrl: zdjecieUrl,
            typ: typ,
            gatunek: gatunek,
            lokalizacja: lokalizacja,
            zarezerwowane: false,
            email: uzytkownik?.email ? uzytkownik?.email : "udefined"
        };
        
        try {
            let response: Zwierze;
            response = await agent.Admin.postZwierze(zwierzeT);
            console.log(response)
            
            dispatch(setZwierze(response));

        } catch (error) {
            console.log(error)
        }
    }
    if (!uzytkownik) return <Redirect to={{pathname: "/logowanie"}}/>
    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Dodaj ogłoszenie
            </Typography>
            <form onSubmit={handleSubmitData}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField fullWidth value={nazwa} onChange={(newVal) => setNazwa(newVal.target.value)} name='nazwa' label='Tytuł' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={typ} onChange={(newVal) => setTyp(newVal.target.value)} name='typ' label='Typ' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={gatunek} onChange={(newVal) => setGatunek(newVal.target.value)} name='gatunek' label='Gatunek' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={cena} onChange={(newVal) => setCena(Number(newVal.target.value))} type='number' name='cena' label='Cena w groszach' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={wiek} onChange={(newVal) => setWiek(Number(newVal.target.value))} type='number' name='wiek' label='Wiek w latach' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={waga} onChange={(newVal) => setWaga(Number(newVal.target.value))} type='number' name='waga' label='Waga w dag' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={zdjecieUrl} onChange={(newVal) => setZdjecieUrl(newVal.target.value)} type='text' name='zdjecieUrl' label='Link do Zdjęcia' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={opis} onChange={(newVal) => setOpis(newVal.target.value)} multiline={true} rows={4} name='opis' label='Opis' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={lokalizacja}  onChange={(newVal) => setLokalizacja(newVal.target.value)} type='text' name='lokalizacja' label='Lokalizacja' />
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={handleSubmitData} variant='contained' color='success'>Potwierdź</Button>
                </Box>
            </form>
        </Box>
    )
}