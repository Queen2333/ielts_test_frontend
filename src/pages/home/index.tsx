import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import PButton from "../../components/button";


const Home = () => {


  const [ dataForm ] = Form.useForm()

  function showCon() {
    console.log(console)
    console.log(process.env.FE_C_URL, '------')
  }

  return <>
    <Form layout="inline" form={dataForm}>
      <Form.Item label="test date" name="date">
        <DatePicker/>
      </Form.Item>
      <Form.Item label="user name" name="userName">
        <Input/>
      </Form.Item>
      <Form.Item>
        <Button onClick={showCon}>保存</Button>
      </Form.Item>
    </Form>

    <PButton>test</PButton>
  </>
}


export default Home;