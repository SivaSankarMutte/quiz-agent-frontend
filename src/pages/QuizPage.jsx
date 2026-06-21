import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
Container,
Card,
CardContent,
Typography,
Radio,
RadioGroup,
FormControlLabel,
Button,
Box,
CircularProgress
} from "@mui/material";

import api from "../services/api";

import Navbar from "../components/Navbar";


function QuizPage() {

const { quizId } = useParams();

const navigate = useNavigate();

const [quiz, setQuiz] = useState(null);

const [answers, setAnswers] = useState({});

const [result, setResult] = useState(null);



useEffect(() => {


if (quizId) {
  fetchQuiz();
}


}, [quizId]);

async function fetchQuiz() {


try {

  const response =
    await api.get(`/quiz/${quizId}`);

  setQuiz(response.data);

} catch (error) {

  console.error(error);

}


}

function handleAnswerChange(
questionId,
answer
) {


setAnswers(
  prev => ({
    ...prev,
    [questionId]: answer
  })
);


}

async function submitQuiz() {


const payload = {

  answers: Object.entries(
    answers
  ).map(
    ([questionId, selectedAnswer]) => ({
      question_id: Number(
        questionId
      ),
      selected_answer:
        selectedAnswer
    })
  )
};

try {

  const response =
    await api.post(
      `/quiz/${quizId}/submit`,
      payload
    );

  setResult(
    response.data
  );

} catch (error) {

  console.error(error);

  alert(
    "Failed to submit quiz"
  );
}


}

if (!quiz) {

return (
<> <Navbar />

  <Container
    sx={{
      mt: 5,
      textAlign: "center"
    }}
  >
    <CircularProgress />
  </Container>
</>

);
}


if (result) {

return (
<> <Navbar />


  <Container
    maxWidth="sm"
    sx={{ mt: 5 }}
  >

    <Card>

      <CardContent>

        <Typography
          variant="h4"
          gutterBottom
        >
          Quiz Submitted
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
        >
          Score:
          {" "}
          {result.score}
          /
          {result.total_questions}
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
        >
          Percentage:
          {" "}
          {result.percentage}%
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            navigate(
              `/quiz/${quizId}/leaderboard`
            )
          }
        >
          View Leaderboard
        </Button>

      </CardContent>

    </Card>

  </Container>
</>


);
}


return (
<> <Navbar />


<Container
  maxWidth="md"
  sx={{ mt: 4 }}
>

  <Typography
    variant="h4"
    gutterBottom
  >
    {quiz.topic}
  </Typography>
  
    <Typography
      color="text.secondary"
    >
      Questions: {quiz.no_of_questions}
    </Typography>

  {
    quiz.questions.map(
      (
        question,
        index
      ) => (

        <Card
          key={question.id}
          sx={{ mb: 3 }}
        >

          <CardContent>

            <Typography
              variant="h6"
              gutterBottom
            >
              {index + 1}.
              {" "}
              {question.question_text}
            </Typography>

            <RadioGroup
              value={
                answers[
                  question.id
                ] || ""
              }
              onChange={(e) =>
                handleAnswerChange(
                  question.id,
                  e.target.value
                )
              }
            >

              <FormControlLabel
                value="A"
                control={<Radio />}
                label={
                  question.option_a
                }
              />

              <FormControlLabel
                value="B"
                control={<Radio />}
                label={
                  question.option_b
                }
              />

              <FormControlLabel
                value="C"
                control={<Radio />}
                label={
                  question.option_c
                }
              />

              <FormControlLabel
                value="D"
                control={<Radio />}
                label={
                  question.option_d
                }
              />

            </RadioGroup>

          </CardContent>

        </Card>
      )
    )
  }

  <Box
    sx={{
      textAlign: "center",
      mb: 5
    }}
  >

    <Button
      variant="contained"
      size="large"
      onClick={submitQuiz}
    >
      Submit Quiz
    </Button>

  </Box>

</Container>


</>
);
}

export default QuizPage;
