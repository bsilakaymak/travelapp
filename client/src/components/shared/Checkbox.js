import React from 'react';
import styled from 'styled-components';
const Label = styled.label`
  position: relative;
  display: flex;
  cursor: pointer;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    margin-right: 10px;
  }
`;
const StyledInput = styled.input`
  display: none;
  &:checked + ${Label}::before {
    font-family: 'Font Awesome 5 Free';
    content: '\f00c';
    display: inline-block;
    vertical-align: middle;
    font-weight: 900;
    color: #3f51b5;
    margin-right: 10px;
    box-shadow: 1px 1px 7px 0px rgba(0, 0, 255, 0.5);
  }
`;
export const CheckBoxHolder = styled.div`
  min-width: 250px;
  margin-bottom: 10px;
`;
const Checkbox = (props) => {
  return (
    <CheckBoxHolder>
      <StyledInput
        id={props.id}
        type='checkbox'
        value={props.value}
        onChange={props.onchange}
      />
      <Label htmlFor={props.htmlFor}>{props.label}</Label>
    </CheckBoxHolder>
  );
};

export default Checkbox;
