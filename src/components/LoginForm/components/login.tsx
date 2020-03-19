import { Button, Checkbox, Form, Icon, Input, message } from 'antd';
import React from 'react';
import { login } from '../../../api/user';
import { setAvatar, setEmail, setName, setSchool, setToken } from '../../../utils/auth';

interface IProps {
  form: any;
}

interface IState {
  remember: boolean;
}

class Login extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      remember: true,
    };
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      login(data).then((response: any) => {
        let options = {};
        if (this.state.remember) {
          options = {
            expires: 15,
          };
        }
        setToken(response.token, options);
        setName(response.username, options);
        setEmail(values.email, options);
        setSchool(response.school, options);
        setAvatar(`https://coursehelper.online:3000/${response.avatar}`, options);
        message.success('登录成功！');
        window.location.reload();
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  public onRememberChange = (e: any) => {
    this.setState({
      remember: e.target.checked,
    });
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入你的邮箱账号!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='邮箱账号'
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox onChange={this.onRememberChange}>记住我</Checkbox>)}
          {/* <span className='login-form-forgot'>
            忘记密码
          </span> */}
          <Button type='primary' htmlType='submit' className='login-form-button'>
            登录
              </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'login' })(Login);

export default LoginForm;
