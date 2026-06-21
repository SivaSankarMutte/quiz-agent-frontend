import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem("token");

    navigate("/");
  }

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Quiz App
        </Typography>

        <Button
          color="inherit"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          onClick={() =>
            navigate("/attempts")
          }
        >
          My Attempts
        </Button>

        <Button
            color="inherit"
            onClick={() =>
                navigate("/quizzes")
            }
            >
            All Quizzes
        </Button>

        <Button
          color="inherit"
          onClick={logout}
        >
          Logout
        </Button>

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;