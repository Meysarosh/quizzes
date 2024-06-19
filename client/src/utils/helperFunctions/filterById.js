export function filterByIds(
  data,
  answeredQuestions,
  isCorrectlyAnswered,
  isIncorrectlyAnswered,
  isUnanswered
) {
  return data.reduce((acc, curr) => {
    isCorrectlyAnswered &&
      isIncorrectlyAnswered &&
      answeredQuestions?.find(({ id }) => id === curr.id) &&
      acc.push(curr);
    isUnanswered &&
      isCorrectlyAnswered &&
      (!answeredQuestions?.find(({ id }) => id === curr.id) ||
        answeredQuestions?.find(
          ({ id, answer }) => id === curr.id && answer === curr.correct_answer
        )) &&
      acc.push(curr);
    isUnanswered &&
      isIncorrectlyAnswered &&
      (!answeredQuestions?.find(({ id }) => id === curr.id) ||
        answeredQuestions?.find(
          ({ id, answer }) => id === curr.id && answer != curr.correct_answer
        )) &&
      acc.push(curr);
    isUnanswered &&
      !isCorrectlyAnswered &&
      !isIncorrectlyAnswered &&
      !answeredQuestions?.find(({ id }) => id === curr.id) &&
      acc.push(curr);
    isCorrectlyAnswered &&
      !isUnanswered &&
      !isIncorrectlyAnswered &&
      answeredQuestions?.find(
        ({ id, answer }) => id === curr.id && answer === curr.correct_answer
      ) &&
      acc.push(curr);
    isIncorrectlyAnswered &&
      !isCorrectlyAnswered &&
      !isUnanswered &&
      answeredQuestions?.find(
        ({ id, answer }) => id === curr.id && answer != curr.correct_answer
      ) &&
      acc.push(curr);
    return acc;
  }, []);
}
