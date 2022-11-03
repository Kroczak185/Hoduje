import { Grid } from "@mui/material";
import { Zwierze } from "../../app/modele/zwierze";
import ZwierzeKarta from "./ZwierzeKarta";

interface Props {
    zwierzeta: Zwierze[];
}

export default function ZwierzeLista({ zwierzeta }: Props) {
    return (
        <Grid container spacing={3}>
            {zwierzeta.map(zwierze => (
                <Grid item xs={'auto'} key={zwierze.id}>
                    <ZwierzeKarta zwierze={zwierze} />
                </Grid>
            ))}
        </Grid>
    )
}