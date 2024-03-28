import { PropTypes } from 'prop-types';

import { Card, CardTitle, CardTopic, Button } from './QuizCard.styles';

export function QuizCard({ title, topic }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardTopic>{topic}</CardTopic>
      <Button>Start</Button>
    </Card>
  );
}

QuizCard.propTypes = {
  title: PropTypes.string,
  topic: PropTypes.string,
};
