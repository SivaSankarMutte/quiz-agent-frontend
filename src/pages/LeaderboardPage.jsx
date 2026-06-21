import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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


function LeaderboardPage() {

  const { quizId } = useParams();

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [quizId]);

  async function fetchLeaderboard() {

    try {

      const response = await api.get(
        `/quiz/${quizId}/leaderboard`
      );

      setLeaderboard(response.data);

    } catch (error) {

      console.error(error);

    }
  }

  function getRank(rank) {

    if (rank === 1) {
        return "🥇";
    }

    if (rank === 2) {
        return "🥈";
    }

    if (rank === 3) {
        return "🥉";
    }

        return rank;
    }


  return (
<> <Navbar />


<Container
  maxWidth="md"
  sx={{ mt: 4 }}
>

  <Card>

    <CardContent>

      <Typography
        variant="h4"
        gutterBottom
      >
        Leaderboard
      </Typography>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Rank
            </TableCell>

            <TableCell>
              User
            </TableCell>

            <TableCell>
              Score
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {
            leaderboard.map(
              (
                entry,
                index
              ) => (

                <TableRow
                  key={
                    entry.username
                  }
                >

                  <TableCell>
                    {
                      getRank(
                        index + 1
                      )
                    }
                  </TableCell>

                  <TableCell>
                    {entry.username}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={`${entry.score}/${entry.total_questions}`}
                    />

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

export default LeaderboardPage;