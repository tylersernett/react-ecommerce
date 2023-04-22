import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { createContext, useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51M9KOcLv6KFHr5HhP9FBIHZCPqDoI1OzKsXcQL4VPX9cEBuptdbl0D7SYsexV79OCwUloA52X91luONgiMIDu0ej00yO36jqq8"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  //formik functions below...
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // copy the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true, //this prop is not a part of billing address, so explicitly add it here
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema[activeStep]}>
          {/*      ======CHECKOUT=====       */}
          {/*      ↳Payment  ↳Shipping      */}
          {/*                    ↳address  */}
          {/* payment:values, touched, errors, handleBlur, handleChange             shipping:values, touched, errors, handleChange, handleBlur, setFieldValue */}
          {/* address: __type__, values, touched, errors, handleBlur, handleChange */}
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
            //000 <CheckoutContext.Provider value={{values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue}}>
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} />
              )}
              {isSecondStep && (
                <Payment values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange}/>
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[400],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                      "&:hover": {
                        backgroundColor: shades.primary[300],
                      }
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.secondary[600],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                    "&:hover": {
                      backgroundColor: shades.secondary[700],
                    }
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
            //000 </CheckoutContext.Provider>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

//000 export const CheckoutContext = createContext();

const phoneRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const checkoutSchema = [
  //FIRST STEP
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required").max(50, 'entry too long'),
      lastName: yup.string().required("required").max(50, 'entry too long'),
      country: yup.string().required("required").max(50, 'entry too long'),
      street1: yup.string().required("required").max(50, 'entry too long'),
      street2: yup.string().max(50, 'entry too long'),
      city: yup.string().required("required").max(50, 'entry too long'),
      state: yup.string().required("required").max(50, 'entry too long'),
      zipCode: yup.string().required("required").matches(/^[0-9]+$/, "digits only").min(5, 'not enough digits'),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      //only require validation on following fields (except street2) when isSameAddress is FALSE
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required").max(50, 'entry too long'),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required").max(50, 'entry too long'),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required").max(50, 'entry too long'),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required").max(50, 'entry too long'),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required").max(50, 'entry too long'),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required").max(50, 'entry too long'),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required").matches(/^[0-9]+$/, "digits only").min(5, 'not enough digits'),
      }),
    }),
  }),
  //SECOND STEP
  yup.object().shape({
    email: yup.string().email('invalid email').required("required"),
    phoneNumber: yup.string().required("required").matches(phoneRegEx, 'invalid phone number'),
  }),
];

export default Checkout;