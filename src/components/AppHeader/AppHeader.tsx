import React, { FC } from "react";
import { Typography } from "antd";

const { Title } = Typography;

export const AppHeader: FC = () => {
  return (
    <div>
      <Title level={3} style={{ paddingTop: "3px" }}>
        {/* Kib - Kibana visualizer */}
      </Title>
    </div>
  );
};
