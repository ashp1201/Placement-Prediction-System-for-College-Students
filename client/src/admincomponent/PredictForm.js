import React from "react";
import "./PredictForm.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import Typography from '@mui/material/Typography';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function PredictForm() {
  const formik = useFormik({
    initialValues: {
      tenth_marks: '',
      twelth_marks: '',
      cgpa: '',
      internships: '',
      backlog: '',
      innovative_project: '',
      communication_level: ''
    },
    validate: (values) => {
      const errors = {};
      if (values.cgpa < 4.0 || values.cgpa > 10.0) {
        errors.cgpa = 'CGPA must be between 4.0 and 10.0';
      }
      if (values.communication_level < 1 || values.communication_level > 5) {
        errors.communication_level = 'Communication level must be between 1 and 5';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
       
        const data = await response.json();
        console.log(data); // Output received from Flask API
       
        // Handle prediction result here
        if (data.result === 'Student Not placed') {
          toast.error('Student cannot be placed');
        } else {
          toast.success('Student can be placed');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to get prediction result');
      }
    },
  });

  return (
    <div className="predict">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <form className="predict_container" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Student Placement Prediction
        </Typography>
        <div className="predict_username">
          <Select
  fullWidth
  {...formik.getFieldProps('tenth_marks')}
  name="tenth_marks"
  label="Tenth Marks"
  required
  displayEmpty
  inputProps={{ shrink: false }}
>
  <MenuItem value="" disabled>
    Select Tenth Percentage
  </MenuItem>
  <MenuItem value={50}>40-60</MenuItem>
  <MenuItem value={70}>60-80</MenuItem>
  <MenuItem value={80}>80-90</MenuItem>
  <MenuItem value={90}>Above 90</MenuItem>
</Select>

        </div>
        <div className="predict_username">
        <Select
  fullWidth
  {...formik.getFieldProps('twelth_marks')}
  name="twelth_marks"
  label="Twelth Marks"
  required
  displayEmpty
  inputProps={{ shrink: false }}
>
  <MenuItem value="" disabled>
    Select Twelth Percentage
  </MenuItem>
  <MenuItem value={50}>40-60</MenuItem>
  <MenuItem value={70}>60-80</MenuItem>
  <MenuItem value={80}>80-90</MenuItem>
  <MenuItem value={90}>Above 90</MenuItem>
</Select>

        </div>
        <div className="predict_username">
          <TextField
            {...formik.getFieldProps('cgpa')}
            fullWidth 
            name="cgpa"
            label="CGPA"
            type="number"
            required
            error={formik.touched.cgpa && formik.errors.cgpa ? true : false}
            helperText={formik.touched.cgpa && formik.errors.cgpa ? formik.errors.cgpa : null}
          />
        </div>
        <div className="predict_username">
        <Select
  fullWidth
  {...formik.getFieldProps('internships')}
  name="internships"
  label="Internships"
  required
  displayEmpty
  inputProps={{ shrink: false }}
>
  <MenuItem value="" disabled>
    Select Internships
  </MenuItem>
  <MenuItem value={0}>None</MenuItem>
  <MenuItem value={1}>At least 1 internship</MenuItem>
</Select>

        </div>
        <div className="predict_username">
        <Select
  fullWidth
  {...formik.getFieldProps('backlog')}
  name="backlog"
  label="Backlog"
  required
  displayEmpty
  inputProps={{ shrink: false }}
>
  <MenuItem value="" disabled>
    Select Backlog
  </MenuItem>
  <MenuItem value={0}>None</MenuItem>
  <MenuItem value={1}>Backlog in some subject</MenuItem>
</Select>

        </div>
        <div className="predict_username">
        <Select
  fullWidth
  {...formik.getFieldProps('innovative_project')}
  name="innovative_project"
  label="Innovative Project"
  required
  displayEmpty
  inputProps={{ shrink: false }}
>
  <MenuItem value="" disabled>
    Select Innovative Project
  </MenuItem>
  <MenuItem value={0}>None</MenuItem>
  <MenuItem value={1}>At least 1 project</MenuItem>
</Select>

        </div>
        <div className="predict_username">
          <Select
           fullWidth 
            {...formik.getFieldProps('communication_level')}
            name="communication_level"
            label="Communication Level"
            required
            displayEmpty
  inputProps={{ shrink: false }}
          >
            <MenuItem value="" disabled>
    Level your Communication skill
  </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </div>
        <div className="btn_predict">
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Predict Placement
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PredictForm;
