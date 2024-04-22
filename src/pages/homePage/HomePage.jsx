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
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoIosArrowDropup } from 'react-icons/io';
import { getQuestionsBanksAndTopics } from '../../store/actions';
import { useLocation } from 'react-router';

export function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [topVisibility, setTopVisibility] = useState(false);
  const { token } = useSelector((state) => state.token);
  const { history } = useSelector((state) => state.user);
  const { availableTopics, quizBanks } = useSelector((state) => state.filters);

  useEffect(() => {
    quizBanks.length === 0 &&
      history.at(-1) === location.pathname &&
      dispatch(getQuestionsBanksAndTopics({ token }));
  }, [quizBanks, dispatch, token, history, location]);

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
        {availableTopics?.map(({ topic, title }) => (
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
