import { useDispatch, useSelector } from 'react-redux';
import {
  Main,
  Header,
  Heading,
  ProcessStatus,
  ArrowButton,
  QuestionText,
  Form,
  RadioContainer,
  RadioInput,
  CustomRadio,
  Checked,
  Nav,
  ForvardButtons,
  Button,
} from './QuizPage.styles';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { Modal } from '../../components/modal';
import {
  getQuestion,
  updateUserData,
  updateQuizData,
  getQuestionById,
  getQuizById,
} from '../../store/actions';
import { endQuiz, setSelectedOptions } from '../../store/slices/quizSlice';
import { useBlocker, useLocation, useNavigate, useParams } from 'react-router';
import { deepCopyOAO } from '../../utils/helperFunctions/deepCopyOAO';
import { setUserMessage, setUserError } from '../../store/slices/userSlice';

export function QuizPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { quiz, currentQuestion, selectedOptions } = useSelector((state) => state.quiz);
  const { user, history, error } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);

  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [isBlocked, setIsBlocked] = useState(true);

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      quiz.id && isBlocked && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    !isBlocked && navigate(`/summary/${id}`);
  }, [isBlocked, navigate, id]);

  useEffect(() => {
    error === 'Quiz Not Found' && navigate('/*');
  }, [error, navigate]);

  useEffect(() => {
    if (!quiz.id && history.at(-1) === location.pathname) {
      dispatch(getQuizById({ token, id }));
    }
  }, [quiz.id, history, location.pathname, dispatch, token, id]);

  useEffect(() => {
    history.at(-1) === location.pathname &&
      !currentQuestion &&
      quiz.questions.length > 0 &&
      quiz.id &&
      dispatch(getQuestionById({ token, filters: quiz.filters, id: quiz.questions[0] })).then(
        () => {
          setSelectedAnswer(quiz.submittedAnswers[0]);
        }
      );
  }, [currentQuestion, quiz, dispatch, token, history, location.pathname]);

  useEffect(() => {
    !currentQuestion &&
      quiz.questions.length === 0 &&
      quiz.id &&
      history.at(-1) === location.pathname &&
      dispatch(
        getQuestion({
          answeredQuestions: user.quizzes.answeredQuestions,
          token,
          prevQuestions: [],
          filters: quiz.filters,
        })
      );
  }, [
    currentQuestion,
    history,
    location.pathname,
    quiz,
    token,
    dispatch,
    user.quizzes.answeredQuestions,
  ]);

  useEffect(() => {
    setSelectedAnswer(null);
    currentQuestion?.answers &&
      setAnswers(Object.values(currentQuestion.answers).map((el) => el.text));
  }, [currentQuestion]);

  useEffect(() => {
    selectedOptions[currentPosition - 1] && setSelectedAnswer(selectedOptions[currentPosition - 1]);
  }, [currentPosition, selectedOptions, selectedAnswer]);

  function handleSelection(e) {
    if (!quiz.submittedAnswers[currentPosition - 1]) {
      setSelectedAnswer(Number(e.currentTarget.attributes.id.value));
      dispatch(
        setSelectedOptions({
          idx: currentPosition - 1,
          value: Number(e.currentTarget.attributes.id.value),
        })
      );
    }
  }

  function handleBtnForward() {
    currentPosition === quiz.questions.length && updateQuiz(false, false);
    showNextQuestion(true, false);
  }

  function handleBtnSkip() {
    currentPosition === quiz.questions.length && updateQuiz(false, false);
    showNextQuestion(true, false);
  }

  function handleBtnBackward() {
    showNextQuestion(false, false);
  }

  function handleBtnDiscard() {
    navigate('/home');
  }

  function handleModalBtnCancel() {
    blocker.reset();
  }

  function handleModalBtnDiscard() {
    dispatch(setUserMessage('You can always find your unfinished quizzes at Profile Page.'));
    dispatch(endQuiz());
    blocker.proceed();
  }

  function handleBtnSubmit() {
    if (selectedAnswer) {
      const answeredQuestions = deepCopyOAO(user.quizzes.answeredQuestions);

      if (answeredQuestions[quiz.filters.quizBank]) {
        const idx = answeredQuestions[quiz.filters.quizBank].findIndex(
          ({ id }) => id === currentQuestion.id
        );

        idx > -1
          ? (answeredQuestions[quiz.filters.quizBank][idx].answer = selectedAnswer)
          : answeredQuestions[quiz.filters.quizBank].push({
              id: currentQuestion.id,
              answer: selectedAnswer,
            });
      } else {
        answeredQuestions[quiz.filters.quizBank] = [
          { id: currentQuestion.id, answer: selectedAnswer },
        ];
      }

      if (currentPosition < quiz.filters.quantity) {
        dispatch(
          updateUserData({
            token,
            user: {
              ...user,
              password: user.username,
              quizzes: {
                ...user.quizzes,
                answeredQuestions,
              },
            },
          })
        );
        updateQuiz(false, true);
        showNextQuestion(true, true);
      }
      if (currentPosition === quiz.filters.quantity) {
        const idx = user.quizzes.unfinished.indexOf(quiz.id);
        const unfinished = [...user.quizzes.unfinished];
        unfinished.splice(idx, 1);
        const finished = new Set(user.quizzes.finished).add(quiz.id);

        dispatch(
          updateUserData({
            token,
            user: {
              ...user,
              password: user.username,
              quizzes: {
                ...user.quizzes,
                answeredQuestions,
                finished: [...finished],
                unfinished,
              },
            },
          })
        );
        updateQuiz(true, true);
        setIsBlocked(false);
      }
    } else dispatch(setUserError('Select an answer before proceed!'));
  }

  function updateQuiz(isFinished, isAnswer) {
    const newAnswers = [...quiz.submittedAnswers];
    newAnswers[currentPosition - 1] = isAnswer
      ? selectedAnswer
      : quiz.submittedAnswers[currentPosition - 1] ?? null;

    return dispatch(
      updateQuizData({
        token,
        quiz: {
          ...quiz,
          isFinished,
          submittedAnswers: newAnswers,
        },
      })
    );
  }

  function showNextQuestion(isForward, isNextUnsubmited) {
    const idx = [...quiz.submittedAnswers].slice(currentPosition).indexOf(null);

    if (
      (isForward && currentPosition < quiz.questions.length) ||
      (!isForward && currentPosition > 1)
    ) {
      const index = isForward
        ? isNextUnsubmited
          ? idx > -1
            ? idx + currentPosition
            : quiz.questions.length - 1
          : currentPosition
        : currentPosition - 2;

      dispatch(getQuestionById({ token, filters: quiz.filters, id: quiz.questions[index] })).then(
        () => {
          setSelectedAnswer(quiz.submittedAnswers[index]);
        }
      );

      setCurrentPosition((prev) =>
        isForward ? (isNextUnsubmited ? index + 1 : prev + 1) : prev - 1
      );
    }
    if (
      isForward &&
      currentPosition === quiz.questions.length &&
      quiz.questions.length < quiz.filters.quantity
    ) {
      setCurrentPosition((prev) => prev + 1);
      dispatch(
        getQuestion({
          answeredQuestions: user.quizzes.answeredQuestions,
          token,
          prevQuestions: [...quiz.questions, currentQuestion.id],
          filters: quiz.filters,
        })
      );
    }
  }

  const classArrowBtnBack = () => {
    return currentPosition === 1 ? 'menu-disabled' : '';
  };

  const classArrowBtnForw = () => {
    return quiz.filters.quantity === currentPosition ? 'menu-disabled' : '';
  };

  const classCustomRadio = () => {
    return quiz.submittedAnswers[currentPosition - 1] ? 'border-disabled' : '';
  };

  const classChecked = (idx) => {
    return selectedAnswer === idx + 1
      ? quiz.submittedAnswers[currentPosition - 1]
        ? 'background-disabled'
        : ''
      : 'hidden';
  };

  return (
    currentQuestion && (
      <Main>
        <Header>
          <Heading>{currentQuestion.topic}</Heading>
          <ProcessStatus>
            <ArrowButton onClick={handleBtnBackward} className={classArrowBtnBack()}>
              <GoChevronLeft />
            </ArrowButton>
            {currentPosition} / {quiz.filters.quantity}
            <ArrowButton onClick={handleBtnForward} className={classArrowBtnForw()}>
              <GoChevronRight />
            </ArrowButton>
          </ProcessStatus>
        </Header>
        <QuestionText>{currentQuestion.question}</QuestionText>
        <Form>
          {answers.map((el, idx) => (
            <RadioContainer key={el} htmlFor={idx + 1}>
              <RadioInput
                type="radio"
                name="answer"
                id={idx + 1}
                onChange={handleSelection}
                checked={selectedAnswer === idx + 1 ? true : false}
              />
              <CustomRadio className={classCustomRadio()}>
                <Checked className={classChecked(idx)} />
              </CustomRadio>
              {el}
            </RadioContainer>
          ))}
        </Form>
        <Nav>
          <Button $warning={true} onClick={handleBtnDiscard}>
            Discard
          </Button>
          <ForvardButtons>
            <Button onClick={handleBtnSkip}>Skip</Button>
            <Button onClick={handleBtnSubmit}>
              {currentPosition === quiz.filters.quantity ? 'Finish' : 'Submit'}
            </Button>
          </ForvardButtons>
        </Nav>
        {blocker.state === 'blocked' ? (
          <Modal
            isModal={true}
            title="Do you want to discard?"
            text={
              <>
                You are trying to leave quiz evaluation page! <br />
                Your changes will be saved into your profile on leave
              </>
            }
          >
            <Button onClick={handleModalBtnCancel}>Cancel</Button>
            <Button $warning={true} onClick={handleModalBtnDiscard}>
              Discard
            </Button>
          </Modal>
        ) : null}
      </Main>
    )
  );
}
