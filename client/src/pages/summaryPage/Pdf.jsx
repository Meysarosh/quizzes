import { useEffect, useState } from 'react';
import './Pdf.styles';
import { Content, Header, Heading, Main, Ul, Li, Title, TitleSec, Box, BoxEl } from './Pdf.styles';
import { PropTypes } from 'prop-types';

export function Pdf({ user, quiz, correct, incorrect, unanswered }) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    let correct = 0;
    let incorrect = 0;
    Object.keys(user.answerStat).forEach((bank) => {
      correct += user.answerStat[bank].correct;
      incorrect += user.answerStat[bank].incorrect;
    });

    setResults([correct, incorrect]);
  }, [user.answerStat]);

  return (
    <Content id="pdf-element">
      <Header>
        <img src="/src/assets/img/logo.png"></img>
        <Heading>Quiz summary and user statistics.</Heading>
      </Header>
      <Main>
        <Title>User data:</Title>
        <Ul>
          <Li>Name: {user.fullname}</Li>
          <Li>Username: {user.username}</Li>
          <Li>Date: {new Date(Date.now()).toUTCString()}</Li>
        </Ul>
        <Title>Quiz statistics:</Title>
        <Ul>
          <Li>Quiz bank: {quiz.filters.quizBank}</Li>
          <Li>Quiz id: {quiz.id}</Li>
          <Li>Topic: {quiz.filters.topic}</Li>
          <Li>
            Difficulty level:{' '}
            {quiz.filters.difficulty.length === 0 ? 'All' : quiz.filters.difficulty.join(', ')}
          </Li>
          <Li>Questions quantity: {quiz.filters.quantity}</Li>
          <Li>Correctly answered questions qty: {correct}</Li>
          <Li>Incorrectly answered questions: {incorrect}</Li>
          <Li>Skipped questions: {unanswered}</Li>
        </Ul>
        <Title>User statistics:</Title>
        <Box>
          <BoxEl>
            <TitleSec>React answers:</TitleSec>
            <Ul>
              <Li data-testid="react-correct">
                correct: {user.answerStat.React ? user.answerStat.React.correct : 0}
              </Li>
              <Li>incorrect: {user.answerStat.React ? user.answerStat.React.incorrect : 0}</Li>
            </Ul>
          </BoxEl>
          <BoxEl>
            <TitleSec>HTML answers:</TitleSec>
            <Ul>
              <Li data-testid="html-correct">
                correct: {user.answerStat.HTML ? user.answerStat.HTML.correct : 0}
              </Li>
              <Li>incorrect: {user.answerStat.HTML ? user.answerStat.HTML.incorrect : 0}</Li>
            </Ul>
          </BoxEl>
          <BoxEl>
            <TitleSec>CSS answers:</TitleSec>
            <Ul>
              <Li data-testid="css-correct">
                correct: {user.answerStat.CSS ? user.answerStat.CSS.correct : 0}
              </Li>
              <Li>incorrect: {user.answerStat.CSS ? user.answerStat.CSS.incorrect : 0}</Li>
            </Ul>
          </BoxEl>
          <BoxEl>
            <TitleSec>SCSS answers:</TitleSec>
            <Ul>
              <Li data-testid="scss-correct">
                correct: {user.answerStat.SCSS ? user.answerStat.SCSS.correct : 0}
              </Li>
              <Li>incorrect: {user.answerStat.SCSS ? user.answerStat.SCSS.incorrect : 0} </Li>
            </Ul>
          </BoxEl>
          <BoxEl>
            <TitleSec>JavaScript answers:</TitleSec>
            <Ul>
              <Li data-testid="java-correct">
                correct: {user.answerStat.JavaScript ? user.answerStat.JavaScript.correct : 0}
              </Li>
              <Li>
                incorrect: {user.answerStat.JavaScript ? user.answerStat.JavaScript.incorrect : 0}
              </Li>
            </Ul>
          </BoxEl>
          <BoxEl>
            <TitleSec>TypeScript answers:</TitleSec>
            <Ul>
              <Li data-testid="type-correct">
                correct: {user.answerStat.TypeScript ? user.answerStat.TypeScript.correct : 0}
              </Li>
              <Li>
                incorrect: {user.answerStat.TypeScript ? user.answerStat.TypeScript.incorrect : 0}
              </Li>
            </Ul>
          </BoxEl>
          <BoxEl>
            <TitleSec>Total answers:</TitleSec>
            <Ul>
              <Li>correct: {results ? results[0] : 0}</Li>
              <Li>incorrect: {results ? results[1] : 0}</Li>
            </Ul>
          </BoxEl>
        </Box>
      </Main>
    </Content>
  );
}

Pdf.propTypes = {
  user: PropTypes.object,
  quiz: PropTypes.object,
  correct: PropTypes.number,
  incorrect: PropTypes.number,
  unanswered: PropTypes.number,
};
