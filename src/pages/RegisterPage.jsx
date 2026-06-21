import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

import api from "../services/api";

function RegisterPage() {

const navigate = useNavigate();

const [username, setUsername] =
useState("");

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

async function handleRegister(e) {


e.preventDefault();

try {

  await api.post(
    "/auth/register",
    {
      username,
      email,
      password
    }
  );

  alert(
    "Registration successful"
  );

  navigate("/");

} catch (error) {

  console.error(error);

  alert(
    "Registration failed"
  );

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
        Create Account
      </Typography>

      <Typography
        align="center"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Register to start taking quizzes
      </Typography>

      <Box
        component="form"
        onSubmit={
          handleRegister
        }
      >

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          margin="normal"
        />

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
          Register
        </Button>

      </Box>

      <Typography
        align="center"
        sx={{ mt: 3 }}
      >
        Already have an account?{" "}
        <Link
          component="button"
          onClick={() =>
            navigate("/")
          }
        >
          Login
        </Link>
      </Typography>

    </CardContent>

  </Card>

</Container>


);
}

export default RegisterPage;
