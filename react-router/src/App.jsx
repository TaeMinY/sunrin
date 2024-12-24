import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0px; 
    padding: 0px;
  }
`;
const Text = styled.a`
  color: red;
  font-size: 30px;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      App.jsx
      <Outlet></Outlet>
      <div className="text">TEXT</div>
      <Text>TEXT-styledcomponents</Text>
    </>
  );
}

export default App;
