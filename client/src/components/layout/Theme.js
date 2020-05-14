import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    common: {
      arcBlue: "#0B72B9",
      arcOrange: "#FFBA60",
    },
    primary: {
      main: "#0B72B9",
    },
    secondary: {
      main: "#FFBA60",
    },
  },
});

export default theme;
