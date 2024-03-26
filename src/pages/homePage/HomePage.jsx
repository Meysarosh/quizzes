import {
  PageTitle,
  Main,
  Content,
  Header,
  FilterButton,
  Aside,
  BackToTop,
} from './HomePage.styles';
import { QuizCard } from '../../components/quizCard/QuizCard';
import { Filters } from './components/Filters';
import { useState } from 'react';

const quizes = [
  { id: 1, title: 'Title', topic: 'Topic' },
  { id: 2, title: 'Title', topic: 'Topic' },
  { id: 3, title: 'Title', topic: 'Topic' },
  { id: 4, title: 'Title', topic: 'Topic' },
  { id: 5, title: 'Title', topic: 'Topic' },
  { id: 6, title: 'Title', topic: 'Topic' },
  { id: 7, title: 'Title', topic: 'Topic' },
  { id: 8, title: 'Title', topic: 'Topic' },
  { id: 9, title: 'Title', topic: 'Topic' },
  { id: 10, title: 'Title', topic: 'Topic' },
  { id: 11, title: 'Title', topic: 'Topic' },
  { id: 12, title: 'Title', topic: 'Topic' },
];

export function HomePage() {
  const [filterVisibility, setFilterVisibility] = useState(false);

  function handleClick() {
    setFilterVisibility((filterVisibility) => !filterVisibility);
  }

  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <Main>
      <Aside $isVisible={filterVisibility}>
        <Filters onClick={handleClick} />
      </Aside>
      <Header>
        <PageTitle>Quizzes</PageTitle>
        <FilterButton onClick={handleClick} />
      </Header>
      <Content>
        {quizes.map((quiz) => (
          <QuizCard key={quiz.id} title={quiz.title} topic={quiz.topic} />
        ))}
      </Content>
      <BackToTop onClick={scroll}></BackToTop>
    </Main>
  );
}
