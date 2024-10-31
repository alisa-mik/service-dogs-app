import styled from "styled-components";

// Form Container for the form
export const FormContainer = styled.div`
  direction: rtl;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

// Form Item - each form field wrapper
export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

// Form Title
export const FormTitle = styled.h2`
margin: 0;
  text-align: center;
  color: #333;
`;

// Label for form inputs
export const Label = styled.label`
  font-weight: 600;
  color: #444;
`;

// Button Group for form navigation buttons
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
