import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Autor from "../../funkcjonalnosci/autor/Autor";
import ErrorPage from "../../funkcjonalnosci/error/ErrorPage";
import Home from "../../funkcjonalnosci/home/Home";
import Katalog from "../../funkcjonalnosci/katalog/Katalog";
import ZwierzeSzczegoly from "../../funkcjonalnosci/katalog/ZwierzeSzczegoly";
import Kontakt from "../../funkcjonalnosci/kontakt/Kontact";
import Naglowek from "./Naglowek";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

function App() {
  const [trybCiemny, ustawTrybCiemny] = useState(false);
  const paletteType = trybCiemny ? 'dark' : 'light'
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
      <ToastContainer position="bottom-right" />
      <CssBaseline />
      <Naglowek trybCiemny={trybCiemny} zmienStyl={zmienStyl} />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/katalog' component={Katalog} />
          <Route path='/katalog/:id' component={ZwierzeSzczegoly} />
          <Route path='/autor' component={Autor} />
          <Route path='/kontakt' component={Kontakt} />
          <Route path='/errorstest' component={ErrorPage} />
          <Route path='/server-error' component={ServerError} />
          <Route component={NotFound} />
        </Switch>

      </Container>
    </ThemeProvider>
  );
}

export default App;