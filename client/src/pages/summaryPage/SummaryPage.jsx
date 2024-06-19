import { useDispatch, useSelector } from 'react-redux';
import {
  Main,
  Header,
  Heading,
  ActionsContainer,
  SuccessBar,
  GreenBar,
  RedBar,
  GreyBar,
  Span,
  Button,
  PdfBtnsContainer,
  BtnPrint,
  Icon,
  Section,
  QuestionContainer,
  QuestionTitle,
  Ul,
  Li,
} from './SummaryPage.styles';
import { useEffect, useState } from 'react';
import { createNewQuiz, getQuestionsForSummary, getQuizById } from '../../store/actions';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createSummaryResults, resetSummary } from '../../store/slices/summarySlice';
import { AiTwotoneQuestionCircle } from 'react-icons/ai';
import { prepairQuizForCopy } from '../../store/slices/quizSlice';
import { Tooltip } from '../../components/tooltip';
import { Highlight } from '../../components/highlight/Highlight';
import { Pdf } from './Pdf';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { BsFiletypePdf } from 'react-icons/bs';
import { IoPrintOutline } from 'react-icons/io5';
import { LoaderWrapper } from '../../components/loader/LoaderWrapper';

export function SummaryPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { history, user } = useSelector((state) => state.user);
  const { quiz, isPending } = useSelector((state) => state.quiz);
  const {
    questions,
    correctlyAnsweredQid,
    incorrectlyAnsweredQid,
    partialyAnsweredQ,
    unansweredQid,
  } = useSelector((state) => state.summary);

  const [isUserAction, setIsUserAction] = useState(false);
  const [correctCount, setCorrectCount] = useState(null);
  const [incorrectCount, setIncorrectCount] = useState(null);
  const [unansweredCount, setUnansweredCount] = useState(null);

  function partialCorrectCount(arr) {
    return arr.reduce((acc, curr) => {
      return acc + curr.result;
    }, 0);
  }

  function partialIncorerctCount(arr) {
    return arr.reduce((acc, curr) => {
      return acc + (1 - curr.result);
    }, 0);
  }

  useEffect(() => {
    setCorrectCount(
      ((correctlyAnsweredQid.length +
        (partialyAnsweredQ ? partialCorrectCount(partialyAnsweredQ) : 0)) /
        questions.length) *
        100
    );
    setIncorrectCount(
      ((incorrectlyAnsweredQid.length +
        (partialyAnsweredQ ? partialIncorerctCount(partialyAnsweredQ) : 0)) /
        questions.length) *
        100
    );
    setUnansweredCount((unansweredQid.length / questions.length) * 100);
  }, [
    correctlyAnsweredQid.length,
    incorrectlyAnsweredQid.length,
    unansweredQid.length,
    questions.length,
    partialyAnsweredQ,
    history,
  ]);

  useEffect(() => {
    !isUserAction &&
      !isPending &&
      (!quiz.id || quiz.id != Number(id)) &&
      location.pathname === history.at(-1) &&
      dispatch(getQuizById({ id }));
  }, [dispatch, history, location.pathname, id, quiz.id, isUserAction, isPending]);

  useEffect(() => {
    quiz.id === Number(id) &&
      location.pathname === history.at(-1) &&
      quiz.isFinished &&
      dispatch(getQuestionsForSummary());
  }, [dispatch, quiz, id, history, location.pathname]);

  useEffect(() => {
    quiz.id === Number(id) &&
      location.pathname === history.at(-1) &&
      !quiz.isFinished &&
      !isPending &&
      navigate('/*');
  }, [dispatch, navigate, quiz, isPending, id, history, location.pathname]);

  useEffect(() => {
    quiz.id &&
      questions.length > 0 &&
      quiz.isFinished &&
      dispatch(createSummaryResults(quiz.submittedAnswers));
  }, [questions, quiz, dispatch]);

  useEffect(() => {
    isUserAction &&
      !quiz.id &&
      dispatch(createNewQuiz()).then((res) => {
        dispatch(resetSummary());
        navigate(`/quiz/${res.payload.id}`);
      });
  }, [quiz, isUserAction, navigate, dispatch]);

  function handleBtnRetake() {
    unansweredQid.length + incorrectlyAnsweredQid.length + partialyAnsweredQ.length > 0 &&
      retake(false);
  }

  function handleBtnRetakeAll() {
    retake(true);
  }

  function handleBtnLeave() {
    navigate('/home');
  }

  function retake(isAll) {
    const payload = isAll
      ? null
      : [...unansweredQid, ...incorrectlyAnsweredQid, ...partialyAnsweredQ.map(({ id }) => id)];
    setIsUserAction(true);
    dispatch(prepairQuizForCopy(payload));
  }

  const isAnswered = (questionId, answerId) => {
    return questions[questionId].isMulti
      ? quiz.submittedAnswers[questionId]
        ? quiz.submittedAnswers[questionId].includes(answerId + 1)
        : false
      : quiz.submittedAnswers[questionId] === answerId + 1;
  };

  const shouldBeAnswered = (questionId, answerId) => {
    return questions[questionId].isMulti
      ? quiz.correctAnswers[questionId]
        ? quiz.correctAnswers[questionId].includes(answerId + 1)
        : false
      : quiz.correctAnswers[questionId] === answerId + 1;
  };

  const isCorrect = (questionId, answerId) => {
    return questions[questionId].isMulti
      ? quiz.correctAnswers[questionId]
        ? quiz.correctAnswers[questionId].includes(answerId + 1)
        : false
      : quiz.correctAnswers[questionId] === answerId + 1;
  };

  const classAnswer = (qId, aId) => {
    if (quiz.id)
      return isAnswered(qId, aId)
        ? isCorrect(qId, aId)
          ? 'green'
          : 'red'
        : shouldBeAnswered(qId, aId)
          ? 'yellow'
          : '';
  };

  const isUnanswered = (qId) => {
    return unansweredQid.includes(qId)
      ? 'background-disabled question_container'
      : 'question_container';
  };

  function checkWidth(id) {
    if (document.getElementById(id)) {
      const answerWidth = document.getElementById(id).parentElement.offsetWidth;
      const questionContainerWidth = document
        .getElementById(id)
        .closest('.question_container').offsetWidth;

      if ((answerWidth / questionContainerWidth) * 100 > 80) return 'top';
    }
    return 'right';
  }

  async function createPdf() {
    const element = document.getElementById('pdf-element');

    const A4_WIDTH = 595.28;
    const WIDTH_MARGIN = 10;
    const HEIGHT_MARGIN = 10;

    const pdf = new jsPDF('p', 'pt', 'a4');

    const canvas = await html2canvas(element);

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgWidth = A4_WIDTH - 2 * WIDTH_MARGIN;
    const imgHeight = (imgWidth / canvasWidth) * canvasHeight;

    const pageImg = canvas.toDataURL('image/png', 1.0);
    const usedHeight = HEIGHT_MARGIN;

    pdf.addImage(pageImg, 'png', WIDTH_MARGIN, usedHeight, imgWidth, imgHeight);

    return pdf;
  }

  async function savePdf() {
    const pdf = await createPdf();
    pdf.save(`summary.pdf`);
  }

  async function printPdf() {
    const pdf = await createPdf();
    window.open(pdf.output('bloburl'), '_blank');
  }

  if (quiz.isFinished)
    return (
      <Main>
        <Header>
          <Heading>
            Quiz #{`${id}`} Summary: <i>{quiz.filters.topic}</i>
          </Heading>
          <ActionsContainer>
            <Tooltip
              text="Select this option to retake the quiz with unanswered and incorrectly answered
              questions."
              position="top"
            >
              <Button
                onClick={handleBtnRetake}
                className={
                  incorrectCount === 0 && unansweredCount === 0 ? 'background-disabled' : ''
                }
              >
                Retake
              </Button>
              <Icon>
                <AiTwotoneQuestionCircle />
              </Icon>
            </Tooltip>
            <Tooltip
              text="Select this option to retake the quiz with all questions."
              position="right"
            >
              <Button onClick={handleBtnRetakeAll}>Retake All</Button>
              <Icon>
                <AiTwotoneQuestionCircle />
              </Icon>
            </Tooltip>
            <Tooltip
              text="Press this button if you want to leave the summary page."
              position="left"
            >
              <Button onClick={handleBtnLeave}>Leave</Button>
            </Tooltip>
            <PdfBtnsContainer>
              <Tooltip text="Click if you want to save your summary to pdf file." position="bottom">
                <BtnPrint onClick={savePdf} data-testid="save-pdf">
                  <BsFiletypePdf />
                </BtnPrint>
              </Tooltip>
              <Tooltip text="Click if you want to print your summary." position="bottom">
                <BtnPrint onClick={printPdf}>
                  <IoPrintOutline />
                </BtnPrint>
              </Tooltip>
            </PdfBtnsContainer>
          </ActionsContainer>
          <Tooltip
            text={`Your correct answers score is ${Math.round(correctCount)}%`}
            position="bottom"
          >
            <SuccessBar>
              <GreenBar $width={`${correctCount}%`}>
                {correctCount > 0 && <Span>{Math.round(correctCount)}%</Span>}
              </GreenBar>
              <RedBar $width={`${incorrectCount}%`}>
                {incorrectCount > 0 && <Span>{Math.round(incorrectCount)}%</Span>}
              </RedBar>
              <GreyBar $width={`${unansweredCount}%`}>
                {unansweredCount > 0 && (
                  <Span>{100 - Math.round(correctCount) - Math.round(incorrectCount)}%</Span>
                )}
              </GreyBar>
            </SuccessBar>
          </Tooltip>
        </Header>
        <LoaderWrapper>
          <Section>
            {questions.length > 0 &&
              questions.map((q, qId) => (
                <QuestionContainer key={q.id} className={isUnanswered(q.id)}>
                  <Highlight>
                    <QuestionTitle>{q.question}</QuestionTitle>
                  </Highlight>
                  <Ul>
                    {Object.values(q.answers).map((el, aId) => (
                      <Li key={el.text}>
                        {classAnswer(qId, aId) === 'yellow' ? (
                          <Tooltip
                            key={aId}
                            position={checkWidth(`tooltip${q.id}${aId}`)}
                            text="Yellow colored is the correct answer that wasn't checked"
                          >
                            <Highlight key={aId}>
                              {<p className={classAnswer(qId, aId)}>{el.text}</p>}
                            </Highlight>
                            <Icon id={`tooltip${q.id}${aId}`}>
                              <AiTwotoneQuestionCircle />
                            </Icon>
                          </Tooltip>
                        ) : (
                          <Highlight>
                            <p className={classAnswer(qId, aId)}>{el.text}</p>
                          </Highlight>
                        )}
                      </Li>
                    ))}
                  </Ul>
                </QuestionContainer>
              ))}
          </Section>
        </LoaderWrapper>
        <Pdf
          user={user}
          quiz={quiz}
          correct={correctlyAnsweredQid.length}
          incorrect={incorrectlyAnsweredQid.length + partialyAnsweredQ.length}
          unanswered={unansweredQid.length}
        />
      </Main>
    );
}
