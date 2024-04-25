import { useDispatch, useSelector } from 'react-redux';
import {
  Main,
  Header,
  Heading,
  ActionsContainer,
  SuccessBar,
  GreenBar,
  RedBar,
  Span,
  BtnBlock,
  Button,
  Icon,
  Section,
  QuestionContainer,
  QuestionTitle,
  Ul,
  Li,
} from './SummaryPage.styles';
import { useEffect, useState } from 'react';
import {
  createNewQuiz,
  getQuestionsForSummary,
  getQuizById,
  updateUserData,
} from '../../store/actions';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createSummaryResults, resetSummary } from '../../store/slices/summarySlice';
import { AiTwotoneQuestionCircle } from 'react-icons/ai';
import { prepairQuizForCopy } from '../../store/slices/quizSlice';
import { Tooltip } from '../../components/tooltip';

export function SummaryPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { token } = useSelector((state) => state.token);
  const { history, user } = useSelector((state) => state.user);
  const { quiz } = useSelector((state) => state.quiz);
  const { questions, correctlyAnsweredQid, incorrectlyAnsweredQid } = useSelector(
    (state) => state.summary
  );

  const [isUserAction, setIsUserAction] = useState(false);
  const [correctCount, setCorrectCount] = useState(null);
  const [incorrectCount, setIncorrectCount] = useState(null);
  const [isHiddenRetakeTooltip, setIsHiddenRetakeTooltip] = useState(true);
  const [isHiddenRetakeAllTooltip, setIsHiddenRetakeAllTooltip] = useState(true);

  useEffect(() => {
    setCorrectCount((correctlyAnsweredQid.length / questions.length) * 100);
    setIncorrectCount((incorrectlyAnsweredQid.length / questions.length) * 100);
  }, [correctlyAnsweredQid.length, incorrectlyAnsweredQid.length, questions.length]);

  useEffect(() => {
    !isUserAction &&
      (!quiz.id || quiz.id != Number(id)) &&
      location.pathname === history.at(-1) &&
      dispatch(getQuizById({ token, id }));
  }, [dispatch, token, history, location.pathname, id, quiz.id, isUserAction]);

  useEffect(() => {
    quiz.id === Number(id) &&
      location.pathname === history.at(-1) &&
      quiz.isFinished &&
      dispatch(
        getQuestionsForSummary({
          token,
          questions: quiz.questions,
          quizBank: quiz.filters.quizBank,
        })
      );
  }, [dispatch, quiz.id, quiz, token, id, history, location.pathname]);

  useEffect(() => {
    quiz.id && questions.length > 0 && dispatch(createSummaryResults(quiz.submittedAnswers));
  }, [questions, quiz.submittedAnswers, dispatch, quiz.id]);

  useEffect(() => {
    isUserAction &&
      !quiz.id &&
      dispatch(createNewQuiz({ token, quiz: { ...quiz, date: Date.now() } })).then((res) => {
        dispatch(resetSummary());
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
  }, [token, user, quiz, isUserAction, navigate, dispatch]);

  function handleBtnRetake() {
    incorrectlyAnsweredQid.length > 0 && retake(false);
  }

  function handleBtnRetakeAll() {
    retake(true);
  }

  function handleBtnLeave() {
    navigate('/home');
  }

  function retake(isAll) {
    const payload = isAll ? null : incorrectlyAnsweredQid;
    setIsUserAction(true);
    dispatch(prepairQuizForCopy(payload));
  }

  const isAnswered = (questionId, answerId) => {
    return quiz.submittedAnswers[questionId] === answerId + 1;
  };

  const isCorrect = (questionId, answerId) => {
    return quiz.correctAnswers[questionId] === answerId + 1;
  };

  return (
    <Main>
      <Header>
        <Heading>
          Quiz #{`${id}`} Summary: <i>{quiz.filters.topic}</i>
        </Heading>
        <ActionsContainer>
          <BtnBlock>
            <Button
              onClick={handleBtnRetake}
              className={incorrectCount === 0 ? 'background-disabled' : ''}
            >
              Retake
            </Button>
            <Icon
              onMouseEnter={() => setIsHiddenRetakeTooltip(false)}
              onMouseLeave={() => setIsHiddenRetakeTooltip(true)}
            >
              <AiTwotoneQuestionCircle />
            </Icon>
            <Tooltip className={isHiddenRetakeTooltip ? 'hidden' : ''}>
              Select this option to retake the quiz with unanswered and incorrectly answered
              questions.
            </Tooltip>
          </BtnBlock>
          <BtnBlock>
            <Button onClick={handleBtnRetakeAll}>Retake All</Button>
            <Icon
              onMouseEnter={() => setIsHiddenRetakeAllTooltip(false)}
              onMouseLeave={() => setIsHiddenRetakeAllTooltip(true)}
            >
              <AiTwotoneQuestionCircle />
            </Icon>
            <Tooltip className={isHiddenRetakeAllTooltip ? 'hidden' : ''}>
              Select this option to retake the quiz with all questions.
            </Tooltip>
          </BtnBlock>
          <Button onClick={handleBtnLeave}>Leave</Button>
        </ActionsContainer>
        <SuccessBar>
          <GreenBar $width={`${correctCount}%`}>
            {correctCount > 0 && <Span>{Math.round(correctCount)}%</Span>}
          </GreenBar>
          <RedBar $width={`${incorrectCount}%`}>
            {incorrectCount > 0 && <Span>{Math.round(incorrectCount)}%</Span>}
          </RedBar>
        </SuccessBar>
      </Header>
      <Section>
        {questions?.map((q, qId) => (
          <QuestionContainer key={q.id}>
            <QuestionTitle>{q.question}</QuestionTitle>
            <Ul>
              {Object.values(q.answers).map((el, aId) => (
                <Li
                  className={isAnswered(qId, aId) ? (isCorrect(qId, aId) ? 'green' : 'red') : ''}
                  key={el.text}
                >
                  {el.text}
                </Li>
              ))}
            </Ul>
          </QuestionContainer>
        ))}
      </Section>
    </Main>
  );
}
