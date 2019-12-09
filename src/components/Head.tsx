import { Avatar, Drawer, Icon, Layout, Popconfirm, Popover } from 'antd';
import React from 'react';
import { logout } from '../api/user';
import Draw from './Draw';

import '../style/Head.css';

interface IProps {
  downloadImg: any;
}

interface IState {
  visible: boolean;
}

const { Header } = Layout;
class Head extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  public downloadImg = () => {
    this.props.downloadImg();
  }

  public openDrawer = () => {
    this.setState({
      visible: true,
    });
  }
  public onDrawerClose = () => {
    this.setState({
      visible: false,
    });
  }
  public logout = () => {
    logout();
    window.location.reload();
  }

  public render() {
    return (
      <div>
        <Header className='head'>
          <Popover content='打开菜单' placement='bottom'>
            <div className='head__item menu' onClick={this.openDrawer}>
              <Icon type='menu' className='head__item-icon' />
            </div>
          </Popover>
          <div className='head__item img'>
            <img src={require('../assets/img/logo.png')} alt='课程助手' className='head__name-img' />
            <span className='head__name-text'>课程助手</span>
          </div>
          <Popover content='保存课表' placement='bottom'>
            <div className='head__item download' onClick={this.downloadImg}>
              <Icon type='cloud-download' className='head__item-icon' />
            </div>
          </Popover>
          <Popover content='前往打卡' placement='bottom'>
            <div className='head__item'>
              <Icon type='hourglass' className='head__item-icon' />
            </div>
          </Popover>
          <Popconfirm
            title='确定退出登录吗？'
            okText='Yes'
            cancelText='No'
            onConfirm={this.logout}
            placement='bottom'
          >
            <Avatar
              src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
              className='head__avatar'
            />
          </Popconfirm>
        </Header>
        <Drawer
          title='我的菜单'
          placement='left'
          closable={false}
          onClose={this.onDrawerClose}
          visible={this.state.visible}
        >
          <Draw />
        </Drawer>
      </div>
    );
  }
}

export default Head;
