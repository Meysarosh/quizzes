import {
  PageTitle,
  Main,
  Content,
  Header,
  FilterButton,
  Aside,
  BackToTopButton,
} from './HomePage.styles';
import { QuizCard } from '../../components/quizCard/QuizCard';
import { Filters } from './components/Filters';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function HomePage() {
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [topVisibility, setTopVisibility] = useState(false);
  const { questions } = useSelector((state) => state.questions);

  function handleClick() {
    setFilterVisibility((filterVisibility) => !filterVisibility);
  }

  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 250 && !topVisibility) setTopVisibility(true);
      if (position < 250 && topVisibility) setTopVisibility(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [topVisibility]);

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
        {questions.topics.map((el) => (
          <QuizCard key={el.topic} title={el.title} topic={el.topic} />
        ))}
      </Content>
      <BackToTopButton $isVisible={topVisibility} onClick={scroll}></BackToTopButton>
    </Main>
  );
}
