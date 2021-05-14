import styled from 'styled-components';

const Title = styled.h1`
  font-size: ${({ theme, secondary }) => (secondary ? theme.xl : theme.l)};
  color: ${({ theme }) => (theme.dark200)};
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export default Title;
