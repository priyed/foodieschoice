import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, Button, Grid } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import "./styles.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "cursive"].join(","),
  },
});

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();

  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");

  const states = Object.entries(shippingSubdivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    console.log(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
    fetchSubdivisions();
  }, [checkoutToken.id]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  return (
    <ThemeProvider theme={theme}>
      <h4 className="address-heading">Shipping Details</h4>

      <div className="form-container">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) => next({ ...data, shippingSubdivision }))}
          >
            <Grid container spacing={3}>
              <FormInput name="firstaName" label="First Name" />
              <FormInput name="lastName" label="Last Name" />
              <FormInput name="email" label="Email" />
              <FormInput name="address1" label="Address" />
              <Grid item xs={12} sm={6}>
                <InputLabel>State</InputLabel>
                <Select
                  value={shippingSubdivision ? shippingSubdivision : " "}
                  fullWidth
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                >
                  {states.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <br />
            <br />
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="address-form-actions"
            >
              <Button className="back-to-cart-btn" component={Link} to="/cart">
                Back to Cart
              </Button>
              <Button className="next-btn" type="submit">
                Next
              </Button>
            </div>
            <br />
            <br />
          </form>
        </FormProvider>
      </div>
    </ThemeProvider>
  );
};

export default AddressForm;
