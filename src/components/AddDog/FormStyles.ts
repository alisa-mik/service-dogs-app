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

// Text Input
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

// TextArea for medical info
export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  min-height: 100px;
  &:focus {
    border-color: #007bff;
  }
`;

// Select input
export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

// Button Group for form navigation buttons
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Success Message
export const SuccessMessage = styled.div`
  color: green;
  font-weight: bold;
  text-align: center;
`;
