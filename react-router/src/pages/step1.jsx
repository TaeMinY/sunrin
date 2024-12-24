import { useNavigate } from "react-router-dom";

function step1() {
  const navigate = useNavigate();

  const onStep2 = () => {
    navigate("/step2");
  };

  return <div onClick={onStep2}>step1.jsx</div>;
}

export default step1;
