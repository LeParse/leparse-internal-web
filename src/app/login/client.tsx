"use client";

import { useState } from "react";
import { Background, LoginForm } from "@leparse/ui";

import { Container } from "./styles";

const Client = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Container>
      <Background />
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        loginFunction={() => {}}
        logo={"/assets/images/logo.png"}
      />
    </Container>
  );
};

export default Client;
