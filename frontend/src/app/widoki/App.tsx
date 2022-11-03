import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route } from "react-router-dom";
import Autor from "../../funkcjonalnosci/autor/Autor";
import Home from "../../funkcjonalnosci/home/Home";
import Katalog from "../../funkcjonalnosci/katalog/Katalog";
import ZwierzeSzczegoly from "../../funkcjonalnosci/katalog/ZwierzeSzczegoly";
import Kontakt from "../../funkcjonalnosci/kontakt/Kontact";
import Naglowek from "./Naglowek";

function App() {
  const [trybCiemny, ustawTrybCiemny] = useState(false);
  const paletteType  = trybCiemny ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function zmienStyl() {
    ustawTrybCiemny(!trybCiemny);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Naglowek trybCiemny={trybCiemny} zmienStyl={zmienStyl} />
      <Container>
        <Route exact path='/' component={Home} />
        <Route exact path='/katalog' component={Katalog} />
        <Route path='/katalog/:id' component={ZwierzeSzczegoly} />
        <Route path='/autor' component={Autor} />
        <Route path='/kontakt' component={Kontakt} />
      </Container>
    </ThemeProvider>
  );
}

export default App;