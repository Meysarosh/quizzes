import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBlocker, useLocation, useNavigate, useParams } from 'react-router';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
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
  CheckboxContainer,
  CheckboxInput,
  CustomCheckbox,
  CustomCheckboxChecked,
} from './QuizPage.styles';
import {
  getQuestion,
  updateUserData,
  updateQuizData,
  getQuestionById,
  getQuizById,
} from '../../store/actions';
import { setSelectedOptions, endQuiz } from '../../store/slices/quizSlice';
import { setUserMessage, setUserError } from '../../store/slices/userSlice';
import { Modal } from '../../components/modal';
import { Highlight } from '../../components/highlight/Highlight';
import { LoaderWrapper } from '../../components/loader/LoaderWrapper';

export function QuizPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

  const { quiz, currentQuestion, selectedOptions } = useSelector((state) => state.quiz);
  const { user, history, error } = useSelector((state) => state.user);

  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [isBlocked, setIsBlocked] = useState(true);

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      quiz.id && isBlocked && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    !isBlocked && dispatch(endQuiz());
    !isBlocked && navigate(`/summary/${id}`);
  }, [isBlocked, navigate, id, dispatch]);

  useEffect(() => {
    error === 'Quiz Not Found' && navigate('/*');
  }, [error, navigate]);

  useEffect(() => {
    if (!quiz.id && history.at(-1) === location.pathname && isBlocked) {
      dispatch(getQuizById({ id }));
    }
  }, [quiz.id, history, location.pathname, dispatch, id, isBlocked]);

  useEffect(() => {
    history.at(-1) === location.pathname &&
      !currentQuestion &&
      quiz.questions.length > 0 &&
      quiz.id &&
      dispatch(
        getQuestionById({
          id: quiz.submittedAnswers.includes(null)
            ? quiz.questions[quiz.submittedAnswers.indexOf(null)]
            : quiz.questions[0],
        })
      ).then(() => {
        setSelectedAnswer(quiz.submittedAnswers.includes(null) ? null : quiz.submittedAnswers[0]);
        quiz.submittedAnswers.includes(null) &&
          setCurrentPosition(quiz.submittedAnswers.indexOf(null) + 1);
      });
  }, [currentQuestion, quiz, dispatch, history, location.pathname]);

  useEffect(() => {
    !currentQuestion &&
      quiz.questions.length === 0 &&
      quiz.id &&
      history.at(-1) === location.pathname &&
      dispatch(getQuestion());
  }, [currentQuestion, history, location.pathname, quiz, dispatch]);

  useEffect(() => {
    setSelectedAnswer(null);
    currentQuestion?.answers &&
      setAnswers(Object.values(currentQuestion.answers).map((el) => el.text));
  }, [currentQuestion]);

  useEffect(() => {
    selectedOptions[currentPosition - 1] && setSelectedAnswer(selectedOptions[currentPosition - 1]);
  }, [currentPosition, selectedOptions, selectedAnswer]);

  function handleSelection(e) {
    const currAnswerId = Number(e.currentTarget.attributes.id.value);

    if (!quiz.submittedAnswers[currentPosition - 1]) {
      let newSelectedAnswer;

      if (currentQuestion.isMulti) {
        !selectedAnswer && (newSelectedAnswer = [currAnswerId]);
        if (selectedAnswer) {
          const idx = selectedAnswer.indexOf(currAnswerId);
          idx === -1 && (newSelectedAnswer = [...selectedAnswer, currAnswerId]);
          if (idx > -1) {
            const newArr = [...selectedAnswer];
            newArr.splice(idx, 1);
            newSelectedAnswer = newArr;
          }
        }
      } else newSelectedAnswer = currAnswerId;

      setSelectedAnswer(newSelectedAnswer);
      dispatch(setSelectedOptions({ idx: currentPosition - 1, value: newSelectedAnswer }));
    }
  }

  function handleBtnForward() {
    currentPosition === quiz.questions.length &&
      currentPosition !== quiz.filters.quantity &&
      updateQuiz(false, false);
    showNextQuestion(true, false);
  }

  function handleBtnSkip() {
    currentPosition === quiz.questions.length &&
      currentPosition !== quiz.filters.quantity &&
      updateQuiz(false, false);
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
    // dispatch(endQuiz());
    blocker.proceed();
  }

  function isEqual(a, b) {
    let result = true;

    a.length != b.length && (result = false);

    a.forEach((el) => !b.find((e) => e === el) && (result = false));

    return result;
  }

  function handleBtnSubmit() {
    if (selectedAnswer) {
      const answerStat = structuredClone(user.answerStat);
      const answeredQuestions = structuredClone(user.answeredQuestions);
      const isCorrect = selectedAnswer.length
        ? isEqual(selectedAnswer, currentQuestion.correct_answer)
        : selectedAnswer === currentQuestion.correct_answer;
      const bank = quiz.filters.quizBank;

      if (answeredQuestions[bank]) {
        const idx = answeredQuestions[bank].findIndex(({ id }) => id === currentQuestion.id);

        idx > -1
          ? (answeredQuestions[bank][idx].answer = selectedAnswer)
          : answeredQuestions[bank].push({
              id: currentQuestion.id,
              answer: selectedAnswer,
              isCorrect,
            });
      } else {
        answeredQuestions[bank] = [
          {
            id: currentQuestion.id,
            answer: selectedAnswer,
            isCorrect,
          },
        ];
      }

      if (!answerStat[bank]) {
        answerStat[bank] = {
          correct: 0,
          incorrect: 0,
        };
      }

      isCorrect && (answerStat[bank].correct += 1);
      !isCorrect && (answerStat[bank].incorrect += 1);

      dispatch(updateUserData({ answeredQuestions, answerStat }));

      if (currentPosition < quiz.filters.quantity) {
        updateQuiz(false, true);
        showNextQuestion(true, true);
      }
      if (currentPosition === quiz.filters.quantity) {
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

    dispatch(updateQuizData({ isFinished, submittedAnswers: newAnswers }));
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

      dispatch(getQuestionById({ id: quiz.questions[index] })).then(() => {
        setSelectedAnswer(quiz.submittedAnswers[index]);
      });

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
      dispatch(getQuestion());
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

  const classCustomCheckbox = () => {
    return quiz.submittedAnswers[currentPosition - 1] ? 'border-disabled' : '';
  };

  const classChecked = (idx) => {
    return selectedAnswer === idx + 1
      ? quiz.submittedAnswers[currentPosition - 1]
        ? 'background-disabled'
        : ''
      : 'hidden';
  };

  const classMultiChecked = (idx) => {
    if (selectedAnswer && selectedAnswer.length > 0)
      return selectedAnswer.includes(idx + 1)
        ? quiz.submittedAnswers[currentPosition - 1]
          ? 'border-disabled'
          : ''
        : 'hidden';
    return 'hidden';
  };

  return (
    <Main>
      <Header>
        <Heading>{quiz.filters.topic}</Heading>
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
      <LoaderWrapper>
        {currentQuestion && (
          <>
            <Highlight>
              <QuestionText className="question" key={currentQuestion.id}>
                {currentQuestion.question}
              </QuestionText>
            </Highlight>
            <Form>
              {answers.map((el, idx) => {
                if (!currentQuestion.isMulti)
                  return (
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
                  );
                else
                  return (
                    <CheckboxContainer key={el} htmlFor={idx + 1}>
                      <CheckboxInput
                        type="checkbox"
                        name="answer"
                        id={idx + 1}
                        onChange={handleSelection}
                        checked={
                          selectedAnswer && selectedAnswer.length > 0
                            ? selectedAnswer.includes(idx + 1)
                              ? true
                              : false
                            : false
                        }
                      />
                      <CustomCheckbox className={classCustomCheckbox()}>
                        <CustomCheckboxChecked className={classMultiChecked(idx)} />
                      </CustomCheckbox>
                      {el}
                    </CheckboxContainer>
                  );
              })}
            </Form>
          </>
        )}
      </LoaderWrapper>
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
  );
}
