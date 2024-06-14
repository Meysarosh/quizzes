import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer,
  Table,
  Th,
  Td,
  Button,
  ButtonsContainer,
  BtnClear,
  LabelSC,
  InputSC,
  BtnSort,
  FiltersContainer,
  FilterElement,
  BtnFilterVisibility,
} from './QuizzesTable.styles';
import { useEffect, useReducer, useRef, useState } from 'react';
import { getUserQuizzes } from '../../../store/actions/getUserQuizzes';
import { prepairQuizForCopy } from '../../../store/slices/quizSlice';
import { createNewQuiz, getQuizById } from '../../../store/actions';
import { useLocation, useNavigate } from 'react-router';
import Select from 'react-select';
import { selectStylesQuizTable } from '../../../styles/selectStylesQuizTable';
import { AiOutlineClear } from 'react-icons/ai';
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa';
import { TbTriangleInvertedFilled, TbTriangleFilled } from 'react-icons/tb';
import { LoaderWrapper } from '../../../components/loader/LoaderWrapper';

export function QuizzesTable() {
  const tableHead = ['Quiz', 'Progress', 'Enrolled on', 'Status', 'Actions'];
  const optionsProgress = [
    { value: 'passed', label: 'passed', isDisabled: false },
    { value: 'failed', label: 'failed', isDisabled: false },
  ];
  const optionsDate = [
    { value: 'tooday', label: 'tooday', isDisabled: false },
    { value: 'week', label: 'last week', isDisabled: false },
    { value: 'month', label: 'this month', isDisabled: false },
  ];
  const optionsStatus = [
    { value: 'finished', label: 'finished', isDisabled: false },
    { value: 'unfinished', label: 'unfinished', isDisabled: false },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const progressRef = useRef();
  const dateRef = useRef();
  const statusRef = useRef();

  const { history } = useSelector((state) => state.user);
  const { quizzes } = useSelector((state) => state.userQuizzes);
  const { quiz } = useSelector((state) => state.quiz);

  const [tableData, setTableData] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectProgress, setSelectProgress] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
  const [options, setOptions] = useState([optionsProgress, optionsDate, optionsStatus]);

  const [sortState, sort] = useReducer(
    (state, action) => {
      state.active = action.type;
      if (action.type === 'Progress') {
        if (!state.progress || state.progress == 'desc') {
          setTableData((prev) =>
            [...prev].sort(
              (a, b) =>
                a.correctAnswersQuantity / a.questionsQuantity -
                b.correctAnswersQuantity / b.questionsQuantity
            )
          );
          return { ...state, progress: 'asc' };
        } else {
          setTableData((prev) =>
            [...prev].sort(
              (a, b) =>
                b.correctAnswersQuantity / b.questionsQuantity -
                a.correctAnswersQuantity / a.questionsQuantity
            )
          );
          return { ...state, progress: 'desc' };
        }
      }

      if (action.type === 'date') {
        if (!state.date || state.date === 'desc') {
          setTableData((prev) => [...prev].sort((a, b) => a.date - b.date));
          return { ...state, date: 'asc' };
        } else {
          setTableData((prev) => [...prev].sort((a, b) => b.date - a.date));
          return { ...state, date: 'desc' };
        }
      }

      if (action.type === 'reset') return { progress: null, date: null };
    },
    { progress: null, date: null, active: null }
  );

  useEffect(() => {
    setTableData(quizzes);
  }, [quizzes]);

  useEffect(() => {
    location.pathname === history.at(-1) && dispatch(getUserQuizzes());
  }, [dispatch, location.pathname, history]);

  useEffect(() => {
    quiz.id && !quiz.isFinished && navigate(`/quiz/${quiz.id}`);
  }, [quiz, navigate]);

  useEffect(() => {
    quiz.id && quiz.isFinished && dispatch(prepairQuizForCopy());
  }, [quiz, dispatch]);

  useEffect(() => {
    !quiz.date &&
      quiz.questions.length > 0 &&
      dispatch(createNewQuiz()).then((res) => {
        navigate(`/quiz/${res.payload.id}`);
      });
  }, [quiz, dispatch, navigate]);

  useEffect(() => {
    let filteredQuizzes = [];
    searchText.length === 0 && (filteredQuizzes = quizzes);
    searchText.length > 0 &&
      (filteredQuizzes = quizzes.filter((el) =>
        el.topic.toLowerCase().includes(searchText.toLowerCase())
      ));
    selectProgress === 'passed' &&
      (filteredQuizzes = filteredQuizzes.filter(
        (el) => el.correctAnswersQuantity >= el.questionsQuantity / 2
      ));
    selectProgress === 'failed' &&
      (filteredQuizzes = filteredQuizzes.filter(
        (el) => el.correctAnswersQuantity < el.questionsQuantity / 2
      ));
    selectDate === 'tooday' &&
      (filteredQuizzes = filteredQuizzes.filter(
        (el) => el.date > Date.parse(new Date().toDateString())
      ));
    selectDate === 'month' &&
      (filteredQuizzes = filteredQuizzes.filter(
        (el) => el.date > Date.parse(`${new Date().getFullYear()} ${new Date().getMonth() + 1}`)
      ));
    selectDate === 'week' &&
      (filteredQuizzes = filteredQuizzes.filter((el) => el.date > el.date - 1000 * 3600 * 24 * 7));

    selectStatus === 'finished' &&
      (filteredQuizzes = filteredQuizzes.filter((el) => el.isFinished));
    selectStatus === 'unfinished' &&
      (filteredQuizzes = filteredQuizzes.filter((el) => !el.isFinished));

    setTableData(filteredQuizzes);
  }, [searchText, selectProgress, selectDate, selectStatus, quizzes]);

  useEffect(() => {
    setOptions([
      [
        {
          value: 'passed',
          label: 'passed',
          isDisabled: !tableData.find(
            (el) => el.correctAnswersQuantity >= el.questionsQuantity / 2
          ),
        },
        {
          value: 'failed',
          label: 'failed',
          isDisabled: !tableData.find((el) => el.correctAnswersQuantity < el.questionsQuantity / 2),
        },
      ],
      [
        {
          value: 'tooday',
          label: 'tooday',
          isDisabled: !tableData.find((el) => el.date > Date.parse(new Date().toDateString())),
        },
        {
          value: 'week',
          label: 'last week',
          isDisabled: !tableData.find((el) => el.date > el.date - 1000 * 3600 * 24 * 7),
        },
        {
          value: 'month',
          label: 'this month',
          isDisabled: !tableData.find(
            (el) => el.date > Date.parse(`${new Date().getFullYear()} ${new Date().getMonth() + 1}`)
          ),
        },
      ],
      [
        {
          value: 'finished',
          label: 'finished',
          isDisabled: !tableData.find((el) => el.isFinished),
        },
        {
          value: 'unfinished',
          label: 'unfinished',
          isDisabled: !tableData.find((el) => !el.isFinished),
        },
      ],
    ]);
  }, [tableData]);

  function handleActionBtn(action, id) {
    action === 'quiz' && dispatch(getQuizById({ id }));
    action === 'summary' && navigate(`/summary/${id}`);
  }

  function handleSearch({ target }) {
    setSearchText(target.value);
  }

  function handleProgres(e) {
    setSelectProgress(e.value);
  }

  function handleDate(e) {
    setSelectDate(e.value);
  }

  function handleStatus(e) {
    setSelectStatus(e.value);
  }

  function handleClear() {
    sort({ type: 'reset' });
    setSearchText('');
    progressRef.current.setValue('');
    dateRef.current.setValue('');
    statusRef.current.setValue('');
  }

  function handleFiltersVisibility() {
    setIsFiltersVisible((prev) => !prev);
  }

  return (
    <>
      <BtnFilterVisibility onClick={handleFiltersVisibility}>
        {isFiltersVisible ? 'Hide' : 'Show'} filters{' '}
        {isFiltersVisible ? <TbTriangleFilled /> : <TbTriangleInvertedFilled />}
      </BtnFilterVisibility>
      <FiltersContainer className={isFiltersVisible ? 'visible' : 'invisible'}>
        <FilterElement>
          <LabelSC htmlFor="searchTopic">By name:</LabelSC>
          <InputSC
            id="searchTopic"
            placeholder="Search for topic:"
            onChange={handleSearch}
            value={searchText}
          />
        </FilterElement>
        <FilterElement>
          <LabelSC htmlFor="progress">
            By progress:
            <Select
              ref={progressRef}
              inputId="progress"
              options={options[0]}
              onChange={handleProgres}
              styles={selectStylesQuizTable}
            />
          </LabelSC>
        </FilterElement>
        <FilterElement>
          <LabelSC htmlFor="date">
            By date:
            <Select
              ref={dateRef}
              name="date"
              options={options[1]}
              onChange={handleDate}
              styles={selectStylesQuizTable}
            />
          </LabelSC>
        </FilterElement>
        <FilterElement>
          <LabelSC>
            By status:
            <Select
              ref={statusRef}
              name="status"
              options={options[2]}
              onChange={handleStatus}
              styles={selectStylesQuizTable}
            />
          </LabelSC>
        </FilterElement>
        <FilterElement>
          <BtnClear onClick={handleClear}>
            Clear filters | <AiOutlineClear />
          </BtnClear>
        </FilterElement>
      </FiltersContainer>

      <TableContainer>
        <LoaderWrapper>
          <Table>
            <thead>
              <tr>
                {tableHead.map((el) => (
                  <Th key={el}>
                    {el}
                    {(el === 'Progress' || el === 'Enrolled on') && (
                      <BtnSort
                        className={
                          sortState.active
                            ? sortState.active === el ||
                              (sortState.active === 'date' && el === 'Enrolled on')
                              ? 'red'
                              : ''
                            : ''
                        }
                        onClick={() => sort({ type: el === 'Progress' ? 'Progress' : 'date' })}
                      >
                        {el === 'Progress' && sortState.progress !== 'desc' && (
                          <FaSortAmountUpAlt />
                        )}
                        {el === 'Progress' && sortState.progress === 'desc' && (
                          <FaSortAmountDownAlt />
                        )}
                        {el === 'Enrolled on' && sortState.date !== 'desc' && <FaSortAmountUpAlt />}
                        {el === 'Enrolled on' && sortState.date === 'desc' && (
                          <FaSortAmountDownAlt />
                        )}
                      </BtnSort>
                    )}
                  </Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(
                ({
                  quizId,
                  date,
                  quizBank,
                  topic,
                  questionsQuantity,
                  correctAnswersQuantity,
                  isFinished,
                }) => (
                  <tr key={quizId}>
                    <Td>
                      {quizBank} - {topic}
                    </Td>
                    <Td
                      className={
                        (correctAnswersQuantity / questionsQuantity) * 100 >= 50 ? 'green' : 'red'
                      }
                    >
                      {correctAnswersQuantity}/{questionsQuantity}
                    </Td>
                    <Td>{new Date(date).toUTCString()}</Td>
                    <Td>{isFinished ? 'Finished' : 'Unfinished'}</Td>
                    <Td>
                      <ButtonsContainer>
                        <Button onClick={() => handleActionBtn('quiz', quizId)}>
                          {isFinished ? 'Retake' : 'Resume'}
                        </Button>
                        {isFinished && (
                          <Button onClick={() => handleActionBtn('summary', quizId)}>
                            Summary
                          </Button>
                        )}
                      </ButtonsContainer>
                    </Td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </LoaderWrapper>
      </TableContainer>
    </>
  );
}
