import styled from "styled-components";
export const Message = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  
  // Condicional baseado na prop 'type'
  background-color: ${(props) => (props.type === "success" ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.type === "success" ? "#155724" : "#721c24")};
  border: 1px solid ${(props) => (props.type === "success" ? "#c3e6cb" : "#f5c6cb")};
`;
export const Container = styled.div`
  background-color: #1c2431;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  margin: 50px auto;
  color: white;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.3);
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: none;
  outline: none;
`;

export const FileInput = styled.input`
  padding: 5px;
  color: white;
`;

export const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;

  &:hover {
    background-color: #357ab7;
  }
`;
