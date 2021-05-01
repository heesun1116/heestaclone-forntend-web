import styled from "styled-components";

const SFormError = styled.span`
  color: orangered;
  font-weight: 600;
  font-size: 12px;
  padding: 8px;
`;

function FormError({ message }) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
