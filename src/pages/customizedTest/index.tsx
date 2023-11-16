import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import PButton from "../../components/button";


const CustomizedTest: React.FC = () => {
  const [ dataForm ] = Form.useForm();

  function showCon() {
    console.log(console)
    console.log(process.env.FE_C_URL, '------')
  }

  return <>
    111
  </>
}


export default CustomizedTest;