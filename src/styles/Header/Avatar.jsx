import styled from 'styled-components';

export const Avatar = styled.div`
  height: 2.375rem;
  width: 2.375rem;
  border-radius: 50%;
  border: 2px solid var(--input-label-color);
  background-image: url(${(props) => props.$img});
  background-size: cover;

  &:hover {
    cursor: pointer;
  }
`;
