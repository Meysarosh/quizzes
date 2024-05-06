import { PropTypes } from 'prop-types';
import { Card, CardTitle, CardTopic, Button } from './QuizCard.styles';
import { useDispatch, useSelector } from 'react-redux';
import { createNewQuiz } from '../../store/actions/createNewQuiz';
import { setQuizBankFilter } from '../../store/slices/filtersSlice';
import { getAvailableQuestions } from '../../store/actions/getAvailableQuestions';
import { useNavigate } from 'react-router';
import { updateUserData } from '../../store/actions';

export function QuizCard({ title, topic }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedFilters } = useSelector((state) => state.filters);
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const { quiz } = useSelector((state) => state.quiz);

  function handleBtnStart() {
    dispatch(
      getAvailableQuestions({
        token,
        answeredQuestions: user.quizzes.answeredQuestions,
        filters: {
          ...selectedFilters,
          quizBank: title,
          topic,
        },
      })
    ).then((res) => {
      const data = res.payload.data;
      const quantity = selectedFilters.quantity
        ? selectedFilters.quantity < data.length
          ? selectedFilters.quantity
          : data.length
        : data.length;

      dispatch(
        createNewQuiz({
          token,
          quiz: {
            ...quiz,
            userId: user.id,
            filters: {
              ...selectedFilters,
              quizBank: title,
              topic,
              quantity,
            },
            date: Date.now(),
          },
        })
      ).then((res) => {
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
        dispatch(setQuizBankFilter());
        navigate(`/quiz/${res.payload.id}`);
      });
    });
  }

  return (
    <Card className="card">
      <CardTitle>{title}</CardTitle>
      <CardTopic>{topic}</CardTopic>
      <Button onClick={handleBtnStart}>Start</Button>
    </Card>
  );
}

QuizCard.propTypes = {
  title: PropTypes.string,
  topic: PropTypes.string,
};
