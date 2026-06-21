import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";

import {
Container,
Card,
CardContent,
Typography,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
Chip
} from "@mui/material";


function MyAttemptsPage() {

  const [attempts, setAttempts] =
    useState([]);

  useEffect(() => {
    fetchAttempts();
  }, []);

  async function fetchAttempts() {

    try {

      const response =
        await api.get(
          "/quiz/my-attempts"
        );

      setAttempts(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  }

  if (attempts.length === 0) {

return (
<> <Navbar />


  <Container
    sx={{ mt: 5 }}
  >
    <Typography
      variant="h5"
      align="center"
    >
      No quiz attempts yet.
    </Typography>
  </Container>
</>


);
}


  return (
<> <Navbar />


<Container
  maxWidth="lg"
  sx={{ mt: 4 }}
>

  <Card>

    <CardContent>

      <Typography
        variant="h4"
        gutterBottom
      >
        My Attempts
      </Typography>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Topic
            </TableCell>

            <TableCell>
              Score
            </TableCell>

            <TableCell>
              Attempted At
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {
            attempts.map(
              (attempt) => (

                <TableRow
                  key={attempt.quiz_id}
                >

                  <TableCell>
                    {attempt.topic}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={`${attempt.score}/${attempt.total_questions}`}
                    />

                  </TableCell>

                  <TableCell>

                    {
                      new Date(
                        attempt.attempted_at
                      ).toLocaleString()
                    }

                  </TableCell>

                </TableRow>
              )
            )
          }

        </TableBody>

      </Table>

    </CardContent>

  </Card>

</Container>


</>
);

}

export default MyAttemptsPage;