import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
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
import KoszykPage from "../../funkcjonalnosci/Koszyk/KoszykPage";
import { getCookie } from "../format/cena";
import agent from "../api/agent";
import Ladowanie from "./Ladownie";
import RezerwacjaPage from "../../funkcjonalnosci/rezerwacja/RezerwacjaPage";
import { useAppDispatch } from "../../funkcjonalnosci/sklep/configureStore";
import { ustawKoszyk } from "../../funkcjonalnosci/Koszyk/koszykSlice";

function App() {
  const dispatch = useAppDispatch();
  const [ladowanie, ustawLadowanie] = useState(true);

  useEffect(()=>{
    const kupiecId = getCookie('KupiecId');
    if (kupiecId){
      agent.Koszyk.get()
      .then(koszyk=>dispatch(ustawKoszyk(koszyk)))
      .catch(error => console.log(error))
      .finally(()=>ustawLadowanie(false))
    }else{
      ustawLadowanie(false)
    }
  }, [dispatch])

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


  if (ladowanie) return <Ladowanie message='Inicjalizowanie aplikacji...' />

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
          <Route path='/koszyk' component={KoszykPage} />
          <Route path='/rezerwacja' component={RezerwacjaPage} />
          <Route component={NotFound} />
        </Switch>

      </Container>
    </ThemeProvider>
  );
}

export default App;