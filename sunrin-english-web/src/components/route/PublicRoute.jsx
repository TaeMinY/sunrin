import { Navigate } from "react-router-dom";

// accessToken, refreshToken이 존재할 경우 / 이동

// props.children
// <PublicRoute><div></div></PulibcRoute>

// props.children == <div></div>

// 로그인 회원가입 페이지

function PublicRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    return <Navigate to="/"></Navigate>;
  }

  return children;
}

export default PublicRoute;
