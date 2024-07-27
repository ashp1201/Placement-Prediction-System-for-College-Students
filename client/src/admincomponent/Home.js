import AdminNavbar from "./AdminNavbar";
import React, { useEffect, useRef, useState } from "react";
import "./AdminDashboard.css";
import img1 from '../asserts/g1.jpg';
import img2 from '../asserts/g2.jpg';
import MUIButton from "@mui/material/Button"; // Renamed Button to MUIButton to avoid conflict

import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Grid, Typography, Container } from "@mui/material"; // Removed duplicate import of Button
import { Link, useNavigate } from "react-router-dom"; // Combined import statements

function Home() {
    const navigate = useNavigate();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const dropdownRef = useRef(null);
  
    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };
  
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsSidebarVisible(false);
        }
      };
  
      document.addEventListener("click", handleOutsideClick);
  
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, [dropdownRef]);
  
    return (
      <div className="admin">
        <AdminNavbar toggleSidebar={toggleSidebar} dropdownRe={dropdownRef} />
  
        <Paper className={`${isSidebarVisible ? "visible" : "invisible"}`}>
          <MenuList className="sidebar-menulist">
            <MenuItem
              onClick={() => {
                navigate('/admin/dashboard');
              }}
              className="menucontent"
            >
              field_1
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/dashboard/viewlocation");
              }}
              className="menucontent"
            >
              field2
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/home/predictform");
              }}
              className="menucontent"
            >
              Predict Form
            </MenuItem>
          </MenuList>
        </Paper>

        <Container maxWidth="md" style={{ background:'#F8E5EE', height:'400px', width:'100vw' }}>
          <Typography variant="h4" sx={{ color:'black' }} gutterBottom>
            Welcome, Training Placement Officer!
          </Typography>
          <Typography variant="body1" sx={{ color: 'black' }} paragraph>
            In this dashboard, you can manage various aspects of the training placement process such as viewing student placements, updating placement records, and more.
          </Typography> 
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop:'5rem' }}>
            <MUIButton
              variant="contained"
              color="primary"
              component={Link}
              to="/admin/dashboard"
              style={{ marginLeft: "4rem" }}
            >
              View Dashboard
            </MUIButton>
            <MUIButton
              variant="contained"
              color="secondary"
              component={Link}
              to="/admin/home/predictform"
              style={{ marginLeft: "5rem" }}
            >
              Go to Predict Form
            </MUIButton>
          </div>
        </Container>

        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                    Streamwise vs Number of Students Placed
                </Typography>
                <img src={img1} alt="Graph" style={{ maxWidth: '100%', height: 'auto' }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                    Total Students Placed vs Not Placed
                </Typography>
                <img src={img2} alt="Graph" style={{ maxWidth: '100%', height: 'auto' }} />
            </Grid>
        </Grid>
      </div>
    );
}

export default Home;
