import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoIosArrowDropup } from 'react-icons/io';
import {
  PageTitle,
  Main,
  Content,
  Header,
  FilterButton,
  Aside,
  BackToTopButton,
} from './HomePage.styles';
import { Filters, QuizCard } from './components';
import { getQuestionsBanksAndTopics } from '../../store/actions';

export function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const filtersRef = useRef(null);

  const [filterVisibility, setFilterVisibility] = useState(false);
  const [topVisibility, setTopVisibility] = useState(false);

  const { history } = useSelector((state) => state.user);
  const { availableTopics, quizBanks } = useSelector((state) => state.filters);

  useEffect(() => {
    quizBanks.length === 0 &&
      history.at(-1) === location.pathname &&
      dispatch(getQuestionsBanksAndTopics());
  }, [quizBanks, dispatch, history, location]);

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
    function handleClickOutsideFilters({ target }) {
      filtersRef.current &&
        !filtersRef.current.contains(target) &&
        filterVisibility &&
        setFilterVisibility((prev) => !prev);
    }
    document.addEventListener('mousedown', handleClickOutsideFilters);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideFilters);
    };
  }, [filtersRef, filterVisibility]);

  function handleClick() {
    setFilterVisibility((filterVisibility) => !filterVisibility);
  }

  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <Main>
      <Aside ref={filtersRef} className={filterVisibility ? '' : 'filter-hidden'}>
        <Filters onClick={handleClick} />
      </Aside>
      <Header>
        <PageTitle>Quizzes</PageTitle>
        <FilterButton onClick={handleClick}>
          <HiOutlineAdjustmentsHorizontal />
        </FilterButton>
      </Header>
      <Content>
        {availableTopics.map(({ topic, title }) => (
          <QuizCard key={topic} title={title} topic={topic} />
        ))}
      </Content>
      <BackToTopButton $isVisible={topVisibility} onClick={scroll}>
        <IoIosArrowDropup />
      </BackToTopButton>
    </Main>
  );
}
