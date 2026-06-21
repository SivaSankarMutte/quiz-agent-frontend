import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import {
Container,
Card,
CardContent,
Typography,
TextField,
Button,
Box,
Link
} from "@mui/material";


function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  }

  return (
<Container
maxWidth="sm"
sx={{
minHeight: "100vh",
display: "flex",
alignItems: "center"
}}

>


<Card
  sx={{
    width: "100%",
    p: 2
  }}
>

  <CardContent>

    <Typography
      variant="h4"
      align="center"
      gutterBottom
    >
      Quiz Generator
    </Typography>

    <Typography
      align="center"
      color="text.secondary"
      sx={{ mb: 3 }}
    >
      Login to continue
    </Typography>

    <Box
      component="form"
      onSubmit={handleLogin}
    >

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        Login
      </Button>

    </Box>

    <Typography
      align="center"
      sx={{ mt: 3 }}
    >
      Don't have an account?{" "}
      <Link
        component="button"
        onClick={() =>
          navigate(
            "/register"
          )
        }
      >
        Register
      </Link>
    </Typography>

  </CardContent>

</Card>


  </Container>
);

}

export default LoginPage;