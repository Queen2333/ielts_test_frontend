import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import PartTabs from '../../components/partTabs';

const Examination: React.FC = () => {
  const [ dataForm ] = Form.useForm();

  function showCon() {
    console.log(console)
    console.log(process.env.FE_C_URL, '------')
  }

  return <>
    <PartTabs />
  </>
}


export default Examination;