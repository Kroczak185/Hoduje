import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props {
    opcje: any[];
    onChange: (event: any) => void;
    zaznaczonaWartosc: string;
}

export default function PrzyciskRadio({opcje, onChange, zaznaczonaWartosc}: Props) {
    return (
        <FormControl component="fieldset">
            <RadioGroup onChange={onChange} value={zaznaczonaWartosc}>
                {opcje.map(({ value, label }) => (
                    <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}