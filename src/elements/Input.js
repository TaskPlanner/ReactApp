import styled, { css } from 'styled-components';

const Input = styled.input`
  font-size: ${({ theme }) => (theme.s)};
  padding: 0.5rem 0.7rem;
  color: ${({ theme }) => (theme.dark100)};
  background: ${({ theme }) => (theme.gray200)};

  ::placeholder {
    color: ${({ theme }) => theme.dark100};
  }

  ${({ radius }) => (
    radius && css`
      border-radius: 100px;
    `
  )};

  ${({ secondary }) => (
    secondary && css`
      font-size: ${({ theme }) => (theme.xs)};
      padding: 0.4rem 0.6rem;
    `
  )};
`;

export default Input;
