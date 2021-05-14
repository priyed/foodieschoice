import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Check from "@material-ui/icons/Check";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "cursive"].join(","),
  },
});

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#000",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#000",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#000",
    borderRadius: "50%",
    display: "flex",
    width: 22,
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#fff",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
    margin: "auto",
  },
  completed: {
    color: "#fff",
    zIndex: 1,
    fontSize: 18,
    margin: "auto",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (error) {
        if (activeStep !== steps.length) history.push("/");
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep + 1);

  const backStep = () =>
    setActiveStep((previousActiveStep) => previousActiveStep - 1);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  const Confirmation = () =>
    order.customer ? (
      <ThemeProvider theme={theme}>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}{" "}
          </Typography>
          <Divider className="divider" />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Store
        </Button>
      </ThemeProvider>
    ) : isFinished ? (
      <ThemeProvider theme={theme}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h5">Thank you for your purchase</Typography>
          <Divider className="divider" />
        </div>
        <br />
        <div style={{ textAlign: "center", margin: "30px" }}>
          <Button component={Link} to="/" variant="outlined" type="button">
            Back to Store
          </Button>
        </div>
      </ThemeProvider>
    ) : (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5"></Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        timeout={timeout}
      />
    );

  return (
    <div className={classes.root}>
      <div className="checkout-heading">
        <h4>Checkout</h4>
      </div>
      <main className="checkout-layout">
        <Paper className="paper">
          <Stepper
            activeStep={activeStep}
            className="stepper"
            connector={<QontoConnector />}
            alternativeLabel
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <div className="step">{step}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;
