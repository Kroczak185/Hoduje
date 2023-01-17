import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ErrorPage from "../../funkcjonalnosci/error/ErrorPage";
import Home from "../../funkcjonalnosci/home/Home";
import Katalog from "../../funkcjonalnosci/katalog/Katalog";
import ZwierzeSzczegoly from "../../funkcjonalnosci/katalog/ZwierzeSzczegoly";
import Naglowek from "./Naglowek";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import KoszykPage from "../../funkcjonalnosci/Koszyk/KoszykPage";
import Ladowanie from "./Ladownie";
import RezerwacjaPage from "../../funkcjonalnosci/rezerwacja/RezerwacjaPage";
import { useAppDispatch } from "../../funkcjonalnosci/sklep/configureStore";
import { fetchKoszykAsync, ustawKoszyk } from "../../funkcjonalnosci/Koszyk/koszykSlice";
import { fetchAktualnyUzytkownik } from "../../funkcjonalnosci/konto/kontoSlice";
import Rejestracja from "../../funkcjonalnosci/konto/Rejestracja";
import Login from "../../funkcjonalnosci/konto/Login";
import Ruty from "./Ruty";
import { green, orange, red, yellow } from "@mui/material/colors";

function App() {
  const dispatch = useAppDispatch();
  const [ladowanie, ustawLadowanie] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchAktualnyUzytkownik());
      await dispatch(fetchKoszykAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => ustawLadowanie(false));
  }, [initApp])

  const [trybCiemny, ustawTrybCiemny] = useState(true);
  const paletteType = trybCiemny ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      },
      primary: {
        main: green[500],
      },
      secondary: {
        main: orange[500],
      }
    },
    typography:{
      fontFamily:"Century Gothic"
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
          <Route path='/errorstest' component={ErrorPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/koszyk' component={KoszykPage} />
          <Ruty path='/rezerwacja' component={RezerwacjaPage} />
          <Route path='/logowanie' component={Login} />
          <Route path='/rejestracja' component={Rejestracja} />
          <Route component={NotFound} />
        </Switch>

      </Container>
    </ThemeProvider>
  );
}

export default App;