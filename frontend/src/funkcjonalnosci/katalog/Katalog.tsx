import { useEffect, useState } from "react";
import { Zwierze } from "../../app/modele/zwierze";
import ZwierzeLista from "./ZwierzeLista";


export default function Katalog() {

    const [zwierzeta, ustawZwierzeta] = useState<Zwierze[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/backend/zwierzeta')
            .then(response => response.json())
            .then(data => ustawZwierzeta(data))
    }, [])

    return (
        <>
            <ZwierzeLista zwierzeta={zwierzeta}/>
        </>
    )
}