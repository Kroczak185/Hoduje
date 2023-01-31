import { Grid } from "@mui/material";
import { Zwierze } from "../../app/modele/zwierze";
import { useAppSelector } from "../redux/configureStore";
import ZwierzeKarta from "./ZwierzeKarta";
import ZwierzeKartaSzkielet from "./ZwierzeKartaSzkielet";

interface Props {
    zwierzeta: Zwierze[];
}

export default function ZwierzeLista({ zwierzeta }: Props) {
    const { zwierzetaZaladowane } = useAppSelector(state => state.katalog);
    return (
        <Grid container spacing={4}>
            {zwierzeta.map(zwierze => (
                <Grid item xs={4} key={zwierze.id}>
                    {!zwierzetaZaladowane ? (
                        <ZwierzeKartaSzkielet />
                    ) : (
                        <ZwierzeKarta zwierze={zwierze} />
                    )}
                </Grid>
            ))}
        </Grid>
    )
}