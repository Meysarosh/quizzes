import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PropTypes } from 'prop-types';
import { Card, CardTitle, CardTopic, Button } from './QuizCard.styles';
import { createNewQuiz, getAvailableQuestions } from '../../../../store/actions';
import { setQuizBankFilter } from '../../../../store/slices/filtersSlice';
import { setIsRedirecting } from '../../../../store/slices/userSlice';

export function QuizCard({ title, topic }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedFilters } = useSelector((state) => state.filters);

  function handleBtnStart() {
    dispatch(setIsRedirecting(true));
    dispatch(
      getAvailableQuestions({
        quizBank: title,
        topic,
      })
    ).then((res) => {
      const quantity = selectedFilters.quantity
        ? Math.min(selectedFilters.quantity, res.payload.data.length)
        : res.payload.data.length;

      dispatch(
        createNewQuiz({
          filters: {
            ...selectedFilters,
            quizBank: title,
            topic,
            quantity,
          },
        })
      ).then((res) => {
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
