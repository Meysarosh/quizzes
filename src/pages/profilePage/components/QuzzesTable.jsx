import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Table, Th, Td, Button, ButtonsContainer } from './QuizzesTable.styles';
import { useEffect } from 'react';
import { getUserQuizzes } from '../../../store/actions/getUserQuizzes';
import { prepairQuizForCopy } from '../../../store/slices/quizSlice';
import { createNewQuiz, getQuizById } from '../../../store/actions';
import { useLocation, useNavigate } from 'react-router';

export function QuizzesTable() {
  const tableHead = ['Quiz', 'Progress', 'Enrolled on', 'Status', 'Actions'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { history } = useSelector((state) => state.user);
  const { quizzes } = useSelector((state) => state.userQuizzes);
  const { quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    location.pathname === history.at(-1) && dispatch(getUserQuizzes());
  }, [dispatch, location.pathname, history]);

  useEffect(() => {
    quiz.id && !quiz.isFinished && navigate(`/quiz/${quiz.id}`);
  }, [quiz, navigate]);

  useEffect(() => {
    quiz.id && quiz.isFinished && dispatch(prepairQuizForCopy());
  }, [quiz, dispatch]);

  useEffect(() => {
    !quiz.date &&
      quiz.questions.length > 0 &&
      dispatch(createNewQuiz()).then((res) => {
        navigate(`/quiz/${res.payload.id}`);
      });
  }, [quiz, dispatch, navigate]);

  function handleActionBtn(action, id) {
    action === 'quiz' && dispatch(getQuizById({ id }));
    action === 'summary' && navigate(`/summary/${id}`);
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
                  <ButtonsContainer>
                    <Button onClick={() => handleActionBtn('quiz', quizId)}>
                      {isFinished ? 'Retake' : 'Resume'}
                    </Button>
                    {isFinished && (
                      <Button onClick={() => handleActionBtn('summary', quizId)}>Summary</Button>
                    )}
                  </ButtonsContainer>
                </Td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
