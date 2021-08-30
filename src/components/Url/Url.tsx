import { EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { FC, useState } from "react";
import "./Url.css";

export const Url: FC = () => {
  const [value, setValue] = useState("http://localhost:5601");

  const submitUrl = () => {
    (window as any)?.api?.send("toMain", value);
    console.log((window as any)?.api);
  };

  return (
    <div className="url-input">
      <Input
        addonAfter={<EditOutlined />}
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={true}
        style={{ textAlign: "center" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitUrl();
          }
        }}
      />
    </div>
  );
};
