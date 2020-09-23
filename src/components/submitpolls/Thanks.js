import React from 'react';
import { Form, Input, Button, Card, Radio, Checkbox, InputNumber } from "antd";
import "./Index.css";
 
function Thanks() {
  const greeting = 'Your response has been submitted. Thanks!';
 
  return (
    <div className="survey-index">
      <div className="survey-box thanks">
        <div className="survey-response-message">
            {greeting}
        </div>
      </div>
    </div>
  );
}
 
export default Thanks;