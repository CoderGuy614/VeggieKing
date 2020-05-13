import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

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
