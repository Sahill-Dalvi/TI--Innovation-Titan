import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      ".app": {
        fontFamily: "'Roboto', Arial, sans-serif",
        backgroundColor: "#ffff",
      },
    },
  },
});

export default theme;
