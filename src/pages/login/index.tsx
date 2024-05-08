import React, { useState } from "react";
import styles from "./styles.module.less";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(0); // 倒计时时间
  const [isSending, setIsSending] = useState<boolean>(false); // 是否正在发送验证码

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    navigate("/index");
    // 这里可以添加发送验证码的逻辑和验证码验证逻辑
  };

  const onSendVerificationCode = () => {
    // 在这里添加发送验证码的逻辑
    console.log("Sending verification code...");
    // 设置倒计时为60秒
    setCountdown(60);
    // 设置正在发送状态为true
    setIsSending(true);
    // 开始倒计时
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          // 倒计时结束，重置状态
          setIsSending(false);
          clearInterval(intervalId);
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  return (
    <div className={`${styles.login_container} flex-jcb`}>
      <Card className={styles.login_form}>
        <div className={`center ${styles.form_content}`}>
          <Title level={2}>欢迎使用机考系统</Title>
          <p className="font-14">请使用邮箱证码登录</p>
          <Form
            className="mt-20"
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "请输入您的邮箱!" }]}
            >
              <Input
                prefix={<MobileOutlined className="site-form-item-icon" />}
                placeholder="请输入邮箱"
              />
            </Form.Item>
            <Form.Item
              name="verificationCode"
              rules={[
                { required: true, message: "Please input verification code!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入验证码"
                addonAfter={
                  <Button
                    type="link"
                    style={{ height: "30px" }}
                    disabled={isSending || countdown > 0}
                    onClick={onSendVerificationCode}
                  >
                    {countdown > 0 ? `${countdown} s` : "发送验证码"}
                  </Button>
                }
              />
            </Form.Item>
            {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
            {/* </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login_form_button"
                style={{ width: "100%" }}
              >
                登录
              </Button>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </div>
      </Card>
      <div className={styles.pic_right}>
        <div className={`center ${styles.top_circle}`}></div>
      </div>
    </div>
  );
};

export default Login;
