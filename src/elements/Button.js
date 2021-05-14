import styled, { css } from 'styled-components';

const Button = styled.button`
  font-size: ${({ theme }) => (theme.s)};
  color: ${({ theme }) => (theme.blue200)};
  border: 0.15rem solid ${({ theme }) => (theme.blue200)};
  padding: 0.4rem 0.6rem;
  background: transparent;
  font-weight: 900;
  border-radius: 100px;

  :hover, &.active, &.archive {
    background: ${({ theme }) => (theme.blue200)};
    color: white;
  }

  ${({ secondary }) => (
    secondary && css`
      font-size: ${({ theme }) => (theme.xs)};
      color: ${({ theme }) => (theme.blue100)};
      border: 0.15rem solid ${({ theme }) => (theme.blue100)};
      padding: 0.3rem 0.5rem;

      :hover, &.active {
        background: ${({ theme }) => (theme.blue100)};
      }
    `
  )};
`;

export default Button;
