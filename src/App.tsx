import React, { FC } from "react";
import { Layout } from "antd";
import "./App.css";
import { AppHeader, Logo, Url } from "./components";

const { Header, Content } = Layout;

export const App: FC = () => {
  return (
    <div className="App">
      <Header
        style={{ height: "40px", backgroundColor: "#143C3E" }}
        className="header"
      >
        <AppHeader />
      </Header>
      <Content>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Logo />
          <div className="center">
            <Url />
          </div>
        </div>
      </Content>
    </div>
  );
};

export default App;
