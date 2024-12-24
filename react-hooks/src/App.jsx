import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  function upCount() {
    setCount(3);
  }

  useEffect(() => {
    console.log("처음 랜더링된 후에 딱 한번만 실행");
  }, []);
  useEffect(() => {
    console.log("상태가 변경될때");
  });
  useEffect(() => {
    console.log("count 상태가 변경될때");
  }, [count]);

  useEffect(() => {
    console.log("name 상태가 변경될때");
  }, [name]);

  useEffect(() => {
    return () => {
      console.log("해당 페이지가 DOM에서 제거되기 전에 실행, clean up함수");
    };
  });

  return (
    <>
      <div className="card">
        <button onClick={upCount}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
