import { PropTypes } from 'prop-types';
import { Card, CardTitle, CardTopic, Button } from './QuizCard.styles';
import { useDispatch, useSelector } from 'react-redux';
import { createNewQuiz } from '../../store/actions/createNewQuiz';
import { setQuizBankFilter } from '../../store/slices/questionsSlice';
import { getAvailableQuestionsQuantity } from '../../store/actions/getAvailableQuestionsQuntity';
import { useNavigate } from 'react-router';
import { updateUserData } from '../../store/actions';

export function QuizCard({ title, topic }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filters } = useSelector((state) => state.questions);
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const { quiz } = useSelector((state) => state.quiz);

  function handleBtnStart() {
    dispatch(
      getAvailableQuestionsQuantity({
        token,
        filters: {
          ...filters,
          quizBank: title,
          topic,
        },
      })
    ).then((res) => {
      dispatch(
        createNewQuiz({
          token,
          quiz: {
            ...quiz,
            userId: user.id,
            filters: {
              ...filters,
              quizBank: title,
              topic,
              quantity: filters.quantity
                ? filters.quantity < res.payload
                  ? filters.quantity
                  : res.payload
                : res.payload,
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
    <Card>
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
