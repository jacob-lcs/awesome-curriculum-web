import { Button, Form, Icon, Input, message } from 'antd';
import React from 'react';
import { register, registerCode } from '../../../api/user';
import isEmail from '../../../utils/isEmail';

interface IProps {
  form: any;
  toRegister: any;
}

interface IState {
  email: string;
}

class Register extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
    };
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (values['password-again'] !== values['password-register']) {
        message.error('两次密码输入不一致！');
      } else {
        const data = {
          email: values['username-register'],
          password: values['password-again'],
          verificationCode: values['verification-code'],
        };
        register(data).then((response) => {
          message.success('注册成功，请登录');
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  }

  public handleEmailChange = (event: any) => {
    this.setState({
      email: event.target.value,
    });
  }

  public getRegisterCode = () => {
    const value: string = this.state.email;
    if (value.length === 0) {
      message.warning('请输入邮箱账号');
    } else if (!isEmail(value)) {
      message.warning('请输入正确的邮箱账号');
    } else {
      registerCode({ email: value }).then((response) => {
        message.success('验证码发送成功，请查收');
      }).catch((e) => {
        console.error(e);
      });
    }
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username-register', {
            rules: [{ required: true, message: '请输入你的邮箱账号!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='邮箱账号'
              type='email'
              className='email-input'
              onChange={this.handleEmailChange}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password-register', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='密码'
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password-again', {
            rules: [{ required: true, message: '与第一次输入不匹配!' }],
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='请再次输入密码'
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={this.getRegisterCode}>
            发送验证码
          </Button>
          {getFieldDecorator('verification-code', {
            rules: [{ required: true, message: '请输入邮箱验证码!' }],
          })(
            <Input
              prefix={<Icon type='message' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='邮箱验证码'
              className='verification-code-input'
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RegisterForm = Form.create({
  name: 'register',
})(Register);

export default RegisterForm;
