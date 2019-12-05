import { Button, Checkbox, Form, Icon, Input, message} from 'antd';
import React from 'react';
import { login } from '../../../api/user';
import { setName, setToken } from '../../../utils/auth';

interface IProps {
  form: any;
}

interface IState {
  name: string;
  activeKey: string;
}

class Login extends React.Component<IProps, IState> {

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      const data = {
        email: values.username,
        password: values.password,
      };
      login(data).then(() => {
        message.success('登陆成功！');
      });
    });
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
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
          })(<Checkbox>记住我</Checkbox>)}
          <span className='login-form-forgot'>
            忘记密码
              </span>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            登录
              </Button>
          Or <span className='login-form-register'>现在去注册!</span>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'login' })(Login);

export default LoginForm;
