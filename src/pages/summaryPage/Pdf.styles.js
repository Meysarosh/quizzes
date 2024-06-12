import styled from 'styled-components';

const Content = styled.div`
  position: absolute;
  top: -1000rem;
  width: 84rem;
  height: 118.8rem;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  color: black;
  border: 1px solid grey;
  background-color: white;
`;

const Header = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: baseline;
  column-gap: 5rem;
  fill: black;
`;

const Heading = styled.h2`
  color: black;
  font-size: 3rem;
`;

const Main = styled.div`
  margin-top: 5rem;
`;

const Title = styled.h3`
  color: black;
  font-size: 2rem;
`;

const TitleSec = styled.h3`
  color: black;
  font-size: 2rem;
  font-weight: 400;
`;

const Ul = styled.ul`
  padding: 2rem 0;
  border-top: 1px solid black;
  list-style-type: none;
`;

const Li = styled.li`
  font-size: 2rem;
`;

const Box = styled.div`
  display: flex;
  padding-top: 2rem;
  column-gap: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border-top: 1px solid black;
`;

const BoxEl = styled.div`
  padding: 1.5rem;
  border: 1px dotted black;
  margin-bottom: 2rem;
`;

export { Content, Header, Title, TitleSec, Heading, Main, Ul, Li, Box, BoxEl };
