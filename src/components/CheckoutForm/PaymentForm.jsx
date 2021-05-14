import React from "react";
import { Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import "./styles.css";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "cursive"].join(","),
  },
});

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  checkoutToken,
  backStep,
  nextStep,
  onCaptureCheckout,
  shippingData,
  timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      timeout();
      nextStep();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <h3 gutterBottom style={{ margin: "20px" }}>
        Payment method
      </h3>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div
                className="payment-form-actions"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  className="back-to-address-form"
                  variant="outlined"
                  onClick={backStep}
                >
                  Back
                </Button>
                <Button
                  variant="container"
                  type="submit"
                  disabled={!stripe}
                  color="primary"
                  className="pay-btn"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </ThemeProvider>
  );
};

export default PaymentForm;
