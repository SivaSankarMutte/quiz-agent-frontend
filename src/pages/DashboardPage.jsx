import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
Container,
Card,
CardContent,
Typography,
TextField,
Button,
Grid,
MenuItem
} from "@mui/material";

import api from "../services/api";

import Navbar from "../components/Navbar";


function DashboardPage() {
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  async function generateQuiz() {

    
    try {
      const response = await api.post(
        "/quiz",
        {
          topic, 
          no_of_questions: noOfQuestions
        }
      );

      navigate(
        `/quiz/${response.data.quiz_id}`
      );

    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz");
    }
  }

  return (
<> <Navbar />


<Container
  maxWidth="md"
  sx={{ mt: 4 }}
>

  {user && (

    <Card sx={{ mb: 4 }}>

      <CardContent>

        <Typography
          variant="h4"
          gutterBottom
        >
          Welcome {user.username}
        </Typography>

        <Typography
          color="text.secondary"
        >
          {user.email}
        </Typography>

      </CardContent>

    </Card>

  )}

  <Grid container spacing={3}>

    <Grid item xs={12}>

      <Card>

        <CardContent>

          <Typography
            variant="h5"
            gutterBottom
          >
            Generate Quiz
          </Typography>

          <TextField
            fullWidth
            label="Enter Topic"
            value={topic}
            onChange={(e) =>
              setTopic(
                e.target.value
              )
            }
          />

          <TextField
            select
            label="Questions"
            value={noOfQuestions}
            onChange={(e) =>
                setNoOfQuestions(
                Number(e.target.value)
                )
            }
            >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                (num) => (
                <MenuItem
                    key={num}
                    value={num}
                >
                    {num}
                </MenuItem>
                )
            )}
            </TextField>

            <br/>
            <br/>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={generateQuiz}
          >
            Generate Quiz
          </Button>

        </CardContent>

      </Card>

    </Grid>

  </Grid>

</Container>


</>
);

}

export default DashboardPage;