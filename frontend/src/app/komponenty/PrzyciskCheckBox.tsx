import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    zaznaczony?: string[];
    onChange: (items: string[]) => void;
}

export default function PrzyciskCheckBox({items, zaznaczony, onChange}: Props) {
    const [zaznaczonyItems, setZaznaczonyItems] = useState(zaznaczony || []);

    function handleZaznaczony(wartosc: string) {
        const currentIndex = zaznaczonyItems.findIndex(item => item === wartosc);
        let newZaznaczony: string[] = [];
        if (currentIndex === -1) newZaznaczony = [...zaznaczonyItems, wartosc];
        else newZaznaczony = zaznaczonyItems.filter(item => item !== wartosc);
        setZaznaczonyItems(newZaznaczony);
        onChange(newZaznaczony);
    }

    return (
        <FormGroup>
            {items?.map(item => (
                <FormControlLabel 
                    control={<Checkbox 
                        checked={zaznaczonyItems.indexOf(item) !== -1}
                        onClick={() => handleZaznaczony(item)}
                    />} 
                    label={item} 
                    key={item} 
                />
            ))}
        </FormGroup>
    )
}