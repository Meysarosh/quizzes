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
  Modal,
  ModalWindow,
  ModalTitle,
  ModalText,
  ButtonsContainer,
} from './QuizPage.styles';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useEffect, useState } from 'react';

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

  function handleModalButtonDiscard() {
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
      <Modal className={isModal ? '' : 'hidden'}>
        <ModalWindow>
          <ModalTitle>Do you want to discard?</ModalTitle>
          <ModalText>
            You are trying to leave quiz evaluation page!
            <br /> Your changes will be saved into your profile on leave
          </ModalText>
          <ButtonsContainer>
            <Button onClick={handleModalButtonDiscard}>Discard</Button>
            <Button $warning={true}>Leave</Button>
          </ButtonsContainer>
        </ModalWindow>
      </Modal>
    </Main>
  );
}
