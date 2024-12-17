"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Next.js router
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../Reducer/AuthSlice';
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import Image from "next/image";

const defaultTheme = createTheme();

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        loginData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const decodedToken = jwtDecode(response.data.token);
      sessionStorage.setItem('token', response.data.token);
      dispatch(setLoggedIn());
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem("userEmail", decodedToken.email);

      alert("Login successful");
      router.push("/"); // Use Next.js router for navigation
    } catch (error) {
      console.error(error);
      alert("Unable to login", error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          backgroundImage: `url(/bg.jpg)`, // Ensure the path to the public folder asset
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        ></div>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            position: "relative",
            zIndex: 2,
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <CssBaseline />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image src="/raid-logo.png" alt="Logo" width={150} height={150} />
              {/* <Typography
                className="geologica-bold reg-text"
                sx={{ mt: 2, textAlign: "center" }}
              >
                RAIDS AI
              </Typography> */}
            </Box>
            <Typography
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "54px",
                fontWeight: "700",
              }}
            >
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "#fff", backgroundColor: "black" },
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00afff",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00afff",
                    },
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "#fff", backgroundColor: "black" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                        style={{ color: "#fff" }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00afff",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00afff",
                    },
                  },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#00afff",
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: "16px",
                }}
                sx={{
                  "&:hover": { backgroundColor: "#fff", color: "#00afff" },
                }}
              >
                Sign In
              </Button>
              <Link
                href="/Register"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  marginTop: "8px",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {"Don't have an account? Sign up"}
              </Link>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default SignIn;
