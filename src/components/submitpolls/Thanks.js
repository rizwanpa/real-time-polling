import React from 'react';
import { Form, Input, Button, Card, Radio, Checkbox, InputNumber } from "antd";
import "./Index.css";
import greeTick from './../../icons/greenTick.png'
 
function Thanks() {
  const greeting = 'Your vote is submitted sucessfully, Thanks for Your time!';
 
  return (
    <div className="survey-index">
      <div className="survey-box">
        <div className="thanks">{greeting}</div>
        <div className="survey-code">
          <div className="icons">
          <img src={greeTick} alt="green-tick"/>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Thanks;