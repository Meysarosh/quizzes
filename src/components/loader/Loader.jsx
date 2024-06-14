import { FaArrowsRotate } from 'react-icons/fa6';
import { LoaderContainer } from './Loader.styles';
import { useSelector } from 'react-redux';

export function Loader() {
  const { isLoading } = useSelector((state) => state.user);

  return (
    <LoaderContainer className={isLoading ? 'rotating' : ''}>
      <FaArrowsRotate />
    </LoaderContainer>
  );
}
