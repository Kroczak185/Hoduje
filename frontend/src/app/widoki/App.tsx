import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Katalog from "../../funkcjonalnosci/katalog/Katalog";
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
        <Katalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;