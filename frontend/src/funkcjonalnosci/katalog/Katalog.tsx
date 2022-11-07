import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Zwierze } from "../../app/modele/zwierze";
import Ladowanie from "../../app/widoki/Ladownie";
import ZwierzeLista from "./ZwierzeLista";


export default function Katalog() {

    const [zwierzeta, ustawZwierzeta] = useState<Zwierze[]>([]);
    const [ladowanie, ustawLadowanie] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then(products => ustawZwierzeta(products))
            .catch(error => console.log(error))
            .finally(() => ustawLadowanie(false));
    }, [])
    
    if (ladowanie) 
    // return <LoadingComponent message='Loading products...' />
    return <Ladowanie message="Ładowanie zwierząt..." />
 
    return (
        <>
            <ZwierzeLista zwierzeta={zwierzeta}/>
        </>
    )
}