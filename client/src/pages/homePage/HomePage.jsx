import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoIosArrowDropup } from 'react-icons/io';
import { Loader } from '../../components/loader/Loader';
import { LoaderWrapper } from '../../components/loader/LoaderWrapper';
import {
  PageTitle,
  Main,
  Content,
  Header,
  FilterButton,
  Aside,
  BackToTopButton,
  PaginateContainer,
  PaginateBtn,
} from './HomePage.styles';
import { Filters, QuizCard } from './components';
import { getQuestionsBanksAndTopics, getPaginatedTopics } from '../../store/actions';

const PaginationRange = 8;

export function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const filtersRef = useRef(null);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [topVisibility, setTopVisibility] = useState(false);

  const [nextLoad, setNextLoad] = useState(`&_page=1&_limit=${PaginationRange}`);
  const [loadPermit, setLoadPermit] = useState(true);
  const [localPagination, setLocalPagination] = useState(0);

  const { history, isLoading, isPaginating } = useSelector((state) => state.user);
  const { availableTopics, quizBanks, selectedFilters } = useSelector((state) => state.filters);

  const paginate = useCallback(() => {
    nextLoad &&
      loadPermit &&
      dispatch(getPaginatedTopics(nextLoad)).then((res) => {
        if (res.type === 'getPaginatedTopics/fulfilled') {
          setLoadPermit(false);
          res.payload.headers.includes('prev') &&
            setLocalPagination((prev) => prev + PaginationRange);
          if (!res.payload.headers.includes('next')) setNextLoad(null);
          else {
            const str = res.payload.headers
              .split(',')
              .filter((el) => el.includes('next'))[0]
              .split(';')[0]
              .trim()
              .slice(-18, -1);
            setNextLoad(str);
          }
        }
      });
  }, [dispatch, nextLoad, loadPermit]);

  useEffect(() => {
    quizBanks.length === 0 &&
      history.at(-1) === location.pathname &&
      dispatch(getQuestionsBanksAndTopics());
  }, [quizBanks, dispatch, history, location]);

  useEffect(() => {
    paginate();
  }, [paginate]);

  useEffect(() => {
    setLocalPagination(PaginationRange);
  }, [selectedFilters.quizBank]);

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
  }, [topVisibility, paginate]);

  function handleClickOutsideFilters({ target }) {
    filtersRef.current &&
      !filtersRef.current.contains(target) &&
      filterVisibility &&
      setFilterVisibility((prev) => !prev);
  }

  function handleClickFiltersBtn() {
    setFilterVisibility((filterVisibility) => !filterVisibility);
  }

  function handlePaginate() {
    if (!selectedFilters.quizBank) {
      setLoadPermit(true);
      paginate();
    } else {
      setLocalPagination((prev) => prev + PaginationRange);
    }
  }

  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  const classPaginateBtn =
    (nextLoad || selectedFilters.quizBank) && !(localPagination > availableTopics.length)
      ? ''
      : 'hidden';

  return (
    <Main onMouseDown={handleClickOutsideFilters}>
      <Aside ref={filtersRef} className={filterVisibility ? '' : 'filter-hidden'}>
        <Filters onClick={handleClickFiltersBtn} />
      </Aside>
      <Header>
        <PageTitle>Quizzes</PageTitle>
        <FilterButton onClick={handleClickFiltersBtn}>
          <HiOutlineAdjustmentsHorizontal />
        </FilterButton>
      </Header>
      <LoaderWrapper>
        <Content>
          {availableTopics.slice(0, localPagination).map(({ topic, title }) => (
            <QuizCard key={topic} title={title} topic={topic} />
          ))}
        </Content>
      </LoaderWrapper>
      {isPaginating && <Loader />}
      <PaginateContainer className={isLoading ? 'transparent' : ''}>
        <PaginateBtn onClick={handlePaginate} className={classPaginateBtn}>
          {isLoading ? 'Loading more...' : 'Load more...'}
        </PaginateBtn>
      </PaginateContainer>
      <BackToTopButton $isVisible={topVisibility} onClick={scroll}>
        <IoIosArrowDropup />
      </BackToTopButton>
    </Main>
  );
}
