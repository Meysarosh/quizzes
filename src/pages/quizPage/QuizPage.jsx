import { useSelector } from 'react-redux';
import {
  Main,
  Header,
  Heading,
  ProcessStatus,
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

export function QuizPage() {
  const { questions } = useSelector((state) => state.questions);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setAnswers(Object.values(questions[2].answers).map((el) => el.text));
  }, [questions]);

  function handleSelection(e) {
    setSelectedAnswer(Number(e.currentTarget.attributes.id.value));
  }

  function handleQuizButtonDiscard() {
    setIsModal(true);
  }

  function handleModalButtonCancel() {
    setIsModal(false);
  }

  return (
    <Main>
      <Header>
        <Heading>{questions[2].title}</Heading>
        <ProcessStatus>
          <GoChevronLeft />
          1 / 10
          <GoChevronRight />
        </ProcessStatus>
      </Header>
      <QuestionText>{questions[2].question}</QuestionText>
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
            <CustomRadio>
              <Checked className={selectedAnswer === idx + 1 ? '' : 'hidden'} />
            </CustomRadio>
            {el}
          </RadioContainer>
        ))}
      </Form>
      <Nav>
        <Button $warning={true} onClick={handleQuizButtonDiscard}>
          Discard
        </Button>
        <ForvardButtons>
          <Button>Skip</Button>
          <Button>Next</Button>
        </ForvardButtons>
      </Nav>
      <Modal
        isModal={isModal}
        title="Do you want to discard?"
        text={
          <>
            You are trying to leave quiz evaluation page! <br />
            Your changes will be saved into your profile on leave
          </>
        }
      >
        <Button onClick={handleModalButtonCancel}>Cancel</Button>
        <Button $warning={true}>Discard</Button>
      </Modal>
    </Main>
  );
}
