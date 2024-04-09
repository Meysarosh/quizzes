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
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoIosArrowDropup } from 'react-icons/io';

export function HomePage() {
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [topVisibility, setTopVisibility] = useState(false);
  const { filteredQuestions } = useSelector((state) => state.questions);
  const [topics, setTopics] = useState([]);

  function handleClick() {
    setFilterVisibility((filterVisibility) => !filterVisibility);
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

  useEffect(() => {
    setTopics(readTopics(filteredQuestions));
  }, [filteredQuestions]);

  return (
    <Main>
      <Aside className={filterVisibility ? '' : 'filter-hidden'}>
        <Filters onClick={handleClick} />
      </Aside>
      <Header>
        <PageTitle>Quizzes</PageTitle>
        <FilterButton onClick={handleClick}>
          <HiOutlineAdjustmentsHorizontal />
        </FilterButton>
      </Header>
      <Content>
        {topics.map(({ topic, title }) => (
          <QuizCard key={topic} title={title} topic={topic} />
        ))}
      </Content>
      <BackToTopButton $isVisible={topVisibility} onClick={scroll}>
        <IoIosArrowDropup />
      </BackToTopButton>
    </Main>
  );
}

function scroll() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

function readTopics(questions) {
  return [
    ...questions.reduce((acc, { title, topic }) => {
      return acc.add(JSON.stringify({ title, topic }));
    }, new Set()),
  ].map((el) => JSON.parse(el));
}
