import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  margin: 1rem 0;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.span`
  font-size: 1.7rem;
  color: #e81c4f;
  font-weight: bold;
  text-decoration: none;
`;

export const Body = styled.div`
  padding: 1rem 0;
  color: #555;
  font-size: 1.1rem;
  width: 100%;
`;

export const Button = styled.span`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  border-radius: 2px;
  background: #eee;
  a {
    display: flex;
    align-self: stretch;
    padding: 0.6rem 0.5rem;
    text-decoration: none;
    color: #333;
  }
`;

export default Title;
