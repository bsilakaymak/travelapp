import styled from 'styled-components';
export const Label = styled.label`
  font-weight: 500;
  color: ${({ color }) => (color ? color : '#fff')};
  position: absolute;
  pointer-events: none;
  left: 25px;
  top: 30px;
  transition: 0.2s ease all;
`;
export const FormTitle = styled.h3`
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
  text-align: center;
`;
export const Input = styled.input`
  width: ${({ small }) => (small ? '50%;' : '100%')};
  padding: 10px 20px;
  margin: 8px 0;
  outline: none;
  color: ${({ color }) => color};
  border: none;
  border-bottom: 1px solid
    ${({ borderColor }) => (borderColor ? borderColor : '#fff')};
  &:focus ~ ${Label}, :not(:focus):valid ~ ${Label} {
    top: 10px;
    left: 15px;
    font-size: 11px;
  }
  background: ${({ background }) => background};
  @media (max-width: 576px) {
    width: 100%;
  }
`;
export const InputHolder = styled.div`
  position: relative;
  padding-top: 10px;
`;
export const Form = styled.form`
  z-index: 1;
  color: #fff;
  flex-direction: column;
  display: flex;
  padding: 1rem;
  border-radius: 7px;
  border: 1px solid #fff;
  width: ${({ width }) => (width ? width : '81%')};
  background: rgba(0, 0, 0, 0.3);
  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
    width: ${({ md }) => (md ? md : '30%')};
  }

  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
  }
`;
