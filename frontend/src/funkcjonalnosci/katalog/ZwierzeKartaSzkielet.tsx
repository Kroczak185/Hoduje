import { Card, CardActions, CardContent, CardHeader, Grid, Skeleton } from "@mui/material";

export default function ZwierzeKartaSzkielet() {
    return (
        <Grid item xs component={Card}>
            <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />
            <CardHeader
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                }
            />
            <CardContent>
                <>
                    <Skeleton animation="wave" height={27} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={30} width="80%" />
                </>
            </CardContent>
            <CardActions>
                <>
                    <Skeleton animation="wave" height={20} width='40%' />
                    <Skeleton animation="wave" height={20} width="20%" />
                </>
            </CardActions>
        </Grid>
    )
}