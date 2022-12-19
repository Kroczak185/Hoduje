import { Container, Typography } from "@mui/material"
import Tlo from "../../app/widoki/Tlo"

export default function Home(){
    return(
        <Container>
            <Tlo amount={40} />
            <Typography variant="h2">Witaj na stronie domowej</Typography>
        </Container>
    )
}