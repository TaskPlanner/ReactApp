import styled from 'styled-components';

const Text = styled.p`
  font-size: ${({ theme, secondary }) => (secondary ? theme.xs : theme.s)};
  color: ${({ theme }) => (theme.dark100)};
  letter-spacing: 0.05rem;
  margin: 0;
  padding: 0;
`;

export default Text;
