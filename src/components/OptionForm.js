import React from "react";

import { Form, Button, Space, Input } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

//@ATT:this was created to make nested dynamic elements! This is hard!
const OptionForm = props => {
  return (
    <>
      <Form.List name={[props.fieldKey, "options"]}>
        {(options, { add, remove }) => {
          return (
            <div>
              {options.map((option, index2) => (
                <Space
                  key={option.key}
                  style={{ display: "flex", marginBottom: 8,width:'95%' }}
                  align="start"
                >
                  <Form.Item
                    // name={"aar"}
                    {...option}
                    name={[option.name, "option"]}
                    fieldKey={[option.fieldKey, "option"]}
                    key={index2}
                    // noStyle
                    rules={[
                      {
                        required: true,
                        message: "Option is Missing"
                      }
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        padding: "5px 10px",
                        margin: "8px 0",
                        boxSizing: "border-box"
                      }}
                      placeholder="Option"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                  style={{
                    padding: "10px 5px"
                  }}
                    onClick={() => {
                      remove(option.name);
                    }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
                  <PlusOutlined /> Add Option
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </>
  );
};

export default OptionForm;
