"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import Link from "next/link";
import Image from "next/image";

const defaultTheme = createTheme();

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Validate inputs
    if (!fullName.trim()) {
      setError("Full Name is required");
      return;
    }

    if (password !== rePassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const signUpData = {
        fullName: fullName.trim(), // Ensure it's trimmed
        email,
        password,
      };

      console.log("SignUp Data:", signUpData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/Register`,
        signUpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Sign-up successful!");
      router.push("/login");
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      setError(
        error.response?.data?.error || "Unable to sign up. Please try again."
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          backgroundImage: `url(/bg.jpg)`,
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
              SIGN UP
            </Typography>
            {error && (
              <Typography
                color="error"
                style={{
                  color: "red",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                {error}
              </Typography>
            )}
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
                id="fullName"
                label="Full Name"
                name="fullName"
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="rePassword"
                label="Re-Enter Password"
                type={showRePassword ? "text" : "password"}
                id="rePassword"
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "#fff", backgroundColor: "black" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle re-password visibility"
                        onClick={handleToggleRePassword}
                        edge="end"
                        style={{ color: "#fff" }}
                      >
                        {showRePassword ? <Visibility /> : <VisibilityOff />}
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
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
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
                Sign Up
              </Button>
              <Link
                href="/login"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  marginTop: "8px",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {"Already have an account? Sign in"}
              </Link>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default SignUp;
