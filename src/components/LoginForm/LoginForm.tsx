import { Tabs } from 'antd';
import React from 'react';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import './LoginForm.css';

const { TabPane } = Tabs;

interface IProps {
  form: any;
}

interface IState {
  name: string;
  activeKey: string;
}

export default class NormalLoginForm extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      activeKey: '1',
    };
  }

  public onTabClick = (e: any) => {
    this.setState({
      activeKey: e,
    });
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  public render() {
    return (
      <div className='container'>
        <Tabs activeKey={this.state.activeKey} onTabClick={this.onTabClick}>
          <TabPane tab='登录' key='1'>
            <LoginForm />
          </TabPane>
          <TabPane tab='注册' key='2'>
            <RegisterForm />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
