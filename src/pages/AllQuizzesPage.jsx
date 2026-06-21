import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid
} from "@mui/material";

import api from "../services/api";
import Navbar from "../components/Navbar";

function AllQuizzesPage() {

  const [quizzes, setQuizzes] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {

    const response =
      await api.get(
        "/quiz/all"
      );

    setQuizzes(
      response.data
    );
  }

  return (
    <>
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{ mt: 4 }}
      >

        <Typography
          variant="h4"
          gutterBottom
        >
          All Quizzes
        </Typography>

        <Grid
          container
          spacing={2}
        >

          {quizzes.map(
            quiz => (

              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={quiz.quiz_id}
              >

                <Card>

                  <CardContent>

                    <Typography
                      variant="h6"
                    >
                      {quiz.topic}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        >
                        {quiz.no_of_questions}
                         -Questions
                    </Typography>

                    {
                    quiz.attempted ? (
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Your Score: {quiz.score}
                        </Typography>
                        <Button
                          sx={{ mt: 2 }}
                          variant="contained"
                          onClick={() =>
                            navigate(
                              `/quiz/${quiz.quiz_id}/leaderboard`
                            )
                          }
                        >
                          View Leaderboard
                        </Button>
                      </>
                    ) : (
                      <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            onClick={() =>
                            navigate(
                                `/quiz/${quiz.quiz_id}`
                                )
                            }
                        >
                            Open Quiz
                        </Button>
                    )}
                  </CardContent>

                </Card>

              </Grid>
            )
          )}

        </Grid>

      </Container>
    </>
  );
}

export default AllQuizzesPage;