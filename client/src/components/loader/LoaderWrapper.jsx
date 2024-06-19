import { useSelector } from 'react-redux';
import { Loader } from './Loader';
import { PropTypes, oneOfType } from 'prop-types';
import { Centered } from './Loader.styles';

export function LoaderWrapper({ children }) {
  const { isLoading, isPaginating } = useSelector((state) => state.user);

  return (
    <>
      {isLoading && !isPaginating && (
        <Centered>
          <Loader />
        </Centered>
      )}
      {children}
    </>
  );
}

LoaderWrapper.propTypes = {
  children: oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
};
