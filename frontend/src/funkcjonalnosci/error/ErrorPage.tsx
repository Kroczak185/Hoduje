import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function ErrorPage() {
    const [errorWalidacji, setErrorWalidacji] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('nie powinieneś tego widzieć'))
            .catch(error => setErrorWalidacji(error));
    }

    return (
        <Container>
            <Typography gutterBottom variant='h2'>Test obsługi blędów</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}>Test Walidacji</Button>
            </ButtonGroup>
            {errorWalidacji.length > 0 && 
                <Alert severity='error'>
                    <AlertTitle>Error walidacji</AlertTitle>
                    <List>
                        {errorWalidacji.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            } 
        </Container>
    )
}