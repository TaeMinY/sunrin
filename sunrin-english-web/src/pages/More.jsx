import Header from "../components/common/Header";
import styled from "styled-components";
import axios from "axios";
import axiosInstance from "../utils/axios";

import { useNavigate } from "react-router-dom";

const MoreContainer = styled.div`
  min-height: calc(100% - 72px - 61px);
`;
const ListItem = styled.div`
  width: 100%;
  padding: 15px 20px;
  color: #333;

  font-size: 12px;
  font-weight: 500;

  cursor: pointer;
`;

const Line = styled.div`
  width: 100%;
  height: 6px;
  background-color: #efefef;
`;

function More() {
  const navigate = useNavigate();

  const getWord = async () => {
    // 100개 단어 불러오기 ( API, AXIOS 이용 )
    // const response = await axios.get("https://englishword.fly.dev");
    // localStorage.setItem("word", JSON.stringify(response.data.data));
    try {
      const response = await axiosInstance.post("/word/csat/save");

      if (response) {
        alert("데이터를 호출하였습니다.");
      } else {
        throw "";
      }
    } catch (e) {
      alert("데이터를 호출하지 못했습니다.");
    }
  };
  const initData = async () => {
    // 단어 삭제하기
    // localStorage.removeItem("word");
    try {
      const response = await axiosInstance.post("/word/init");

      if (response) {
        alert("데이터를 초기화하였습니다.");
      } else {
        throw "";
      }
    } catch (e) {
      alert("데이터 초기화를 실패하였습니다.");
    }
  };

  const logout = () => {
    const status = window.confirm("로그아웃을 하시겠습니까?");

    if (status) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigate("/signin");
    }
  };

  return (
    <>
      <Header>더보기</Header>
      <MoreContainer>
        <ListItem onClick={getWord}>수능 단어 100개 가져오기</ListItem>
        <ListItem onClick={initData}>데이터 초기화</ListItem>
        <Line></Line>
        <ListItem onClick={logout}>로그아웃</ListItem>
      </MoreContainer>
    </>
  );
}

export default More;
