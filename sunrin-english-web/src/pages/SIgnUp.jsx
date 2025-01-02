import styled, { css } from "styled-components";
import IntroImage from "../assets/images/intro.svg";
import { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SignUpTitle = styled.div`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
`;

function SignUp() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [username, setUsername] = useState("");

  const signUpUser = async () => {
    try {
      if (id == "" || password == "" || passwordCheck == "" || username == "") {
        alert("빈칸을 모두 채워주세요.");
        return;
      }

      if (password != passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      const response = await axios.post("http://localhost:3000/user/signup", {
        id: id,
        password: password,
        username: username,
      });

      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <SignUpContainer>
      <img src={IntroImage} alt="" />
      <SignUpTitle>회원가입</SignUpTitle>
      <Input
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        placeholder="아이디"
        style={css`
          margin-bottom: 4px;
          margin-top: 8px;
        `}
      ></Input>
      <Input
        value={password}
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="비밀번호"
        style={css`
          margin-bottom: 4px;
        `}
      ></Input>
      <Input
        value={passwordCheck}
        type="password"
        onChange={(e) => {
          setPasswordCheck(e.target.value);
        }}
        placeholder="비밀번호 확인"
        style={css`
          margin-bottom: 4px;
        `}
      ></Input>
      <Input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="유저 이름"
        style={css`
          margin-bottom: 24px;
        `}
      ></Input>
      <Button
        onClick={signUpUser}
        type="main"
        style={css`
          margin-bottom: 4px;
        `}
      >
        회원가입
      </Button>
      <Button
        onClick={() => {
          // 뒤로가기
          navigate(-1);
        }}
        type="main-reversal"
      >
        뒤로가기
      </Button>
    </SignUpContainer>
  );
}

export default SignUp;
