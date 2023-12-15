import styled from "styled-components";
import { AnimatedPage } from "@leparse/ui";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginForm = styled(AnimatedPage)`
  width: 35%;
  height: 60%;

  background: white;
`;
