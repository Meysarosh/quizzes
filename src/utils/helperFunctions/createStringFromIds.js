export function createString(isCorrect, isIncorrect, isUnanswered, answered, questionToExclude) {
  let string;

  isCorrect && isIncorrect && isUnanswered && (string = '');

  isCorrect &&
    isIncorrect &&
    !isUnanswered &&
    (string = answered
      .map(({ id }) => {
        if (!questionToExclude.includes(id)) return `&id=${id}`;
      })
      .join(''));

  isCorrect &&
    !isIncorrect &&
    isUnanswered &&
    (string = answered
      .map(({ id, isCorrect }) => {
        if (!isCorrect) return `&id_ne=${id}`;
      })
      .join(''));

  isCorrect &&
    !isIncorrect &&
    !isUnanswered &&
    (string = answered
      .map(({ id, isCorrect }) => {
        if (isCorrect && !questionToExclude.includes(id)) return `&id=${id}`;
      })
      .join(''));

  !isCorrect &&
    isIncorrect &&
    isUnanswered &&
    (string = answered
      .map(({ id, isCorrect }) => {
        if (isCorrect) return `&id_ne=${id}`;
      })
      .join(''));

  !isCorrect &&
    !isIncorrect &&
    isUnanswered &&
    (string = answered
      .map(({ id }) => {
        if (!questionToExclude.includes(id)) return `&id_ne=${id}`;
      })
      .join(''));

  !isCorrect &&
    isIncorrect &&
    !isUnanswered &&
    (string = answered
      .map(({ id, isCorrect }) => {
        if (!questionToExclude.includes(id) && !isCorrect) return `&id=${id}`;
      })
      .join(''));

  return string;
}
