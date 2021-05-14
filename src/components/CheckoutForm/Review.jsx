import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "cursive"].join(","),
  },
});

const Review = ({ checkoutToken }) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h6"
        style={{ margin: "0 20px", padding: "10px 0" }}
        gutterBottom
      >
        <h4>Order Review</h4>
        <List disablePadding>
          {checkoutToken.live.line_items.map((product) => (
            <ListItem key={product.name}>
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${product.quantity}`}
              />
              <Typography variant="body2"></Typography>
            </ListItem>
          ))}
          <ListItem style={{ padding: "10px 0" }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              {checkoutToken.live.subtotal.formatted_with_symbol}
            </Typography>
          </ListItem>
        </List>
      </Typography>
    </ThemeProvider>
  );
};

export default Review;
