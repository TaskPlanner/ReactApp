import styled, { css } from 'styled-components';

const Button = styled.button`
  font-size: ${({ theme }) => (theme.s)};
  line-height: ${({ theme }) => (theme.s)};
  color: ${({ theme }) => (theme.blue200)};
  border: 0.15rem solid ${({ theme }) => (theme.blue200)};
  background: transparent;
  padding: 0.5rem;
  font-weight: 900;
  border-radius: 100px;
  :hover, &.active, &.archive {
    background: ${({ theme }) => (theme.blue200)};
    color: white;
  }

  ${({ s }) => (
    s && css`
      font-size: 1.6rem;
      line-height: 1.6rem;
      padding: 0.4rem;
      border: none;
      color: ${({ theme }) => (theme.blue200)};
      :hover, &.active, &.archive {
        background: none;
        color: ${({ theme }) => (theme.blue200)};
      }
    `
  )};

  ${({ xs }) => (
    xs && css`
      font-size: 0.8rem;
      line-height: 0.8rem;
      padding: 0.2rem;
      border: none;
      color: ${({ theme }) => (theme.blue200)};
      :hover, &.active, &.archive {
        background: none;
        color: ${({ theme }) => (theme.blue200)};
      }
    `
  )};

  ${({ l }) => (
    l && css`
      font-size: 0.8rem;
      line-height: 0.8rem;
      padding: 0.8rem;
      border: 0.2rem solid ${({ theme }) => (theme.blue200)};
    `
  )};

  ${({ xl }) => (
    xl && css`
      font-size: 1.2rem;
      line-height: 1.2rem;
      padding: 1.2rem;
      border: 0.2rem solid ${({ theme }) => (theme.blue200)};
    `
  )};
`;

export default Button;
