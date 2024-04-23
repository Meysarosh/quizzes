import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Table, Th, Td, Button } from './QuizzesTable.styles';
import { useEffect } from 'react';
import { getUserQuizzes } from '../../../store/actions/getUserQuizzes';
import { prepairQuizForCopy } from '../../../store/slices/quizSlice';
import { updateUserData } from '../../../store/actions';
import { createNewQuiz, getQuizById } from '../../../store/actions';
import { useLocation, useNavigate } from 'react-router';

export function QuizzesTable() {
  const tableHead = ['Quiz', 'Progress', 'Enrolled on', 'Status', 'Actions'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.token);
  const { user, history } = useSelector((state) => state.user);
  const { quizzes } = useSelector((state) => state.userQuizzes);
  const { quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    location.pathname === history.at(-1) && dispatch(getUserQuizzes({ token, id: user.id }));
  }, [dispatch, token, user.id, location.pathname, history]);

  useEffect(() => {
    quiz.id && !quiz.isFinished && navigate(`/quiz/${quiz.id}`);
  }, [quiz, navigate]);

  useEffect(() => {
    quiz.id && quiz.isFinished && dispatch(prepairQuizForCopy());
  }, [quiz, dispatch]);

  useEffect(() => {
    !quiz.date &&
      quiz.questions.length > 0 &&
      dispatch(createNewQuiz({ token, quiz: { ...quiz, date: Date.now() } })).then((res) => {
        dispatch(
          updateUserData({
            token,
            user: {
              ...user,
              password: 'Yahyahyah-1',
              quizzes: {
                ...user.quizzes,
                unfinished: [...user.quizzes.unfinished, res.payload.id],
              },
            },
          })
        );
        navigate(`/quiz/${res.payload.id}`);
      });
  }, [quiz, dispatch, navigate, token, user]);

  function handleActionBtn(id) {
    dispatch(getQuizById({ token, id }));
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {tableHead.map((el) => (
              <Th key={el}>{el}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {quizzes.map(
            ({
              quizId,
              date,
              quizBank,
              topic,
              questionsQuantity,
              correctAnswersQuantity,
              isFinished,
            }) => (
              <tr key={quizId}>
                <Td>
                  {quizBank} - {topic}
                </Td>
                <Td
                  className={
                    (correctAnswersQuantity / questionsQuantity) * 100 > 50 ? 'green' : 'red'
                  }
                >
                  {correctAnswersQuantity}/{questionsQuantity}
                </Td>
                <Td>{new Date(date).toUTCString()}</Td>
                <Td>{isFinished ? 'Finished' : 'Unfinished'}</Td>
                <Td>
                  <Button onClick={() => handleActionBtn(quizId)}>
                    {isFinished ? 'Retake' : 'Resume'}
                  </Button>
                </Td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
