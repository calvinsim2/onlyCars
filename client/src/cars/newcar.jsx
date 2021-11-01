import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import axios from 'axios';

const URL = "/api/cars/";

function NewCar({addCar}) {

  const createCar = async (info) => {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info)
    });
    const data = await res.json();
    console.log(data);
    addCar(data);
  }

const validationSchema = yup.object({
  brand: yup
    .string('Enter Car Brand')
    .required('Brand is required'),
  model: yup
    .string('Enter your model')
    .required('Model is required'),
  original_owner: yup
    .string('Enter the original owner')
    .required('Owner is required'),
  rental_rate: yup
    .string('Enter the rental rate')
    .required('Rental rate is required'),
  fuelType: yup
    .string('Enter the Fuel Type')
    .required('Fuel type is required'),
});

  const formik = useFormik({
    initialValues: {
      brand: 'Mazda',
      model: 'Mx5',
      original_owner: 'id',
      rental_rate: '20',
      fuelType: 'petrol'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        createCar(values);
    },
  });

 

  return (
    <Grid container>
      <form onSubmit={formik.handleSubmit}>
      <TextField
          fullWidth
          id="brand"
          name="brand"
          label="brand"
          type="string"
          value={formik.values.brand}
          onChange={formik.handleChange}
          error={formik.touched.brand && Boolean(formik.errors.brand)}
          helperText={formik.touched.brand && formik.errors.brand}
        />
        <TextField
          fullWidth
          id="model"
          name="model"
          label="model"
          type="string"
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
        />
        <TextField
          fullWidth
          id="original_owner"
          name="original_owner"
          label="Original Owner"
          type="string"
          value={formik.values.original_owner}
          onChange={formik.handleChange}
          error={formik.touched.original_owner && Boolean(formik.errors.original_owner)}
          helperText={formik.touched.original_owner && formik.errors.original_owner}
        />
        <TextField
          fullWidth
          id="rental_rate"
          name="rental_rate"
          label="Rental Rate"
          type="number"
          value={formik.values.rental_rate}
          onChange={formik.handleChange}
          error={formik.touched.rental_rate && Boolean(formik.errors.rental_rate)}
          helperText={formik.touched.rental_rate && formik.errors.rental_rate}
        />
         <TextField
          fullWidth
          id="fuelType"
          name="fuelType"
          label="Fuel Type"
          type="string"
          value={formik.values.fuelType}
          onChange={formik.handleChange}
          error={formik.touched.fuelType && Boolean(formik.errors.fuelType)}
          helperText={formik.touched.fuelType && formik.errors.fuelType}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Grid>
  );
};

export default NewCar;