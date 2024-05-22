import { PropTypes } from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addHighlighted, removeHighlighted } from '../../store/slices/highlightSlice';

export function Highlight({ children }) {
  const dispatch = useDispatch();
  const componentRef = useRef(null);

  const { highlight } = useSelector((state) => state.highlight);
  const { currentQuestion } = useSelector((state) => state.quiz);

  const [currentClass, setCurrentClass] = useState('');
  const [currentTarget, setCurrentTarget] = useState(null);

  const createHighlightedSentence = useCallback((highlightedRanges, textToHighlight, id) => {
    const highlightedSentence = [];
    let position = highlightedRanges.length - 1;

    highlightedSentence.push(textToHighlight.slice(highlightedRanges[position][1]));
    while (position > -1) {
      highlightedSentence.unshift(
        `<span class='highlighted' data-id='${id}' id='span${position}'>${textToHighlight.slice(highlightedRanges[position][0], highlightedRanges[position][1])}</span>`
      );
      position > 0
        ? highlightedSentence.unshift(
            textToHighlight.slice(
              highlightedRanges[position - 1][1],
              highlightedRanges[position][0]
            )
          )
        : highlightedSentence.unshift(textToHighlight.slice(0, highlightedRanges[position][0]));
      position -= 1;
    }

    return highlightedSentence.join('');
  }, []);

  function createClass(text) {
    return `${text.slice(0, 3)}${text.length}${text.slice(-3)}`;
  }

  useEffect(() => {
    const highlightedData = currentQuestion
      ? highlight.highlighted.find(({ id }) => id === `${currentQuestion.id}`)
      : currentClass
        ? highlight.highlighted.find(({ id }) => id == currentClass)
        : null;

    if (highlight.isHighlight && highlightedData && highlightedData.range.length > 0) {
      const { range, text, id } = highlightedData;
      const highlightedSentence = createHighlightedSentence(range, text, id);
      componentRef.current.firstChild.innerHTML = highlightedSentence;
    }

    if (highlightedData && (!highlight.isHighlight || highlightedData.range.length === 0)) {
      componentRef.current.firstChild.innerHTML = highlightedData.text;
    }
  }, [createHighlightedSentence, highlight, currentClass, currentQuestion]);

  function handleMouseDown({ target }) {
    setCurrentTarget(target);
  }

  function handleMouseUp({ target }) {
    if (highlight.isHighlight && componentRef.current) {
      if (target.classList.contains('highlighted') && target === currentTarget) {
        dispatch(removeHighlighted({ id: target.dataset.id, idx: Number(target.id.slice(4)) }));
      } else {
        const text = target.classList.contains('highlighted')
          ? target.parentElement.textContent
          : target.textContent;
        const currentSelection = window.getSelection().toString();
        let start = text.search(currentSelection);
        const end = start + currentSelection.length;

        if (start > -1 && currentSelection != '?' && end - start > 0) {
          const className = target.closest('.question')
            ? `${currentQuestion.id}`
            : createClass(text);

          setCurrentClass(className);
          dispatch(
            addHighlighted({
              id: className,
              text: text,
              range: [start, end],
            })
          );
        }
      }
    }
  }

  return (
    <div ref={componentRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {children}
    </div>
  );
}

Highlight.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
