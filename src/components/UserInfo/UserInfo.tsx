import { Avatar, Button, Input, message } from 'antd';
import React from 'react';
import { uploadFile } from '../../api/common';
import { logout, updateName } from '../../api/user';
import { getAvatar, getEmail, getName, removeInfo, setAvatar, setName } from '../../utils/auth';
import compressFile from '../../utils/compress';
import './UserInfo.css';

interface IState {
  logoutLoding: boolean;
  avatar: string;
  editName: boolean;
  userName: string;
  inputName: string;
}

class UserInfo extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      logoutLoding: false,
      avatar: getAvatar() as string,
      editName: false,
      userName: getName() as string,
      inputName: '',
    };
  }

  public logout = () => {
    this.setState({
      logoutLoding: true,
    });
    logout().then(() => {
      removeInfo();
      this.setState({
        logoutLoding: false,
      });
    }).catch((error) => {
      console.error(error);
      this.setState({
        logoutLoding: false,
      });
    });
    window.location.reload();
  }

  /**
   * inputFileChange
   */
  public inputFileChange = (event: any) => {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      compressFile(file, (res: any) => {
        const formData = new FormData();
        formData.append('file', res);
        uploadFile(formData).then((response: any) => {
          setAvatar(`http://47.102.117.126:3000/${response.fileName}`, {
            expires: 15,
          });
          this.setState({
            avatar: `http://47.102.117.126:3000/${response.fileName}`,
          });
          message.success('更改成功');
        }).catch((error) => {
          console.error(error);
        });
      });

    }
  }

  /**
   * editName
   */
  public editName = () => {
    this.setState({
      editName: true,
    });
  }

  /**
   * updateName
   */
  public updateName = () => {
    const data = {
      name: this.state.inputName,
    };
    updateName(data).then((response) => {
      setName(this.state.inputName, {
        expires: 15,
      });
      message.success('修改成功！');
      this.setState({
        editName: false,
        userName: this.state.inputName,
      });
    });
  }

  /**
   * inputChange
   */
  public inputChange = (e: any) => {
    this.setState({
      inputName: e.target.value,
    });
  }

  /**
   * updateName
   */
  public cancleUpdateName = () => {
    this.setState({
      editName: false,
    });
  }

  public render() {
    return(
      <div className='UserInfo-container'>
        <div className='UserInfo-avatar'>
          <Avatar size={100} src={this.state.avatar} />
          <input type='file' accept='image/*' className='upload' title='更换头像' onChange={this.inputFileChange}/>
        </div>
        {
          this.state.editName ?
          <div>
            <Input placeholder='请输入用户昵称'
              size='small'
              defaultValue={this.state.userName}
              className='UserInfo-name edit'
              onChange={this.inputChange}
            />
            <Button type='primary' size='small' onClick={this.updateName} style={{marginRight: '5px'}}>确定</Button>
            <Button type='primary' size='small' defaultValue={this.state.userName} onClick={this.cancleUpdateName}>
              取消
            </Button>
          </div>
          :
          <span className='UserInfo-name' onClick={this.editName}>{this.state.userName}</span>
        }
        <span className='UserInfo-email'>{getEmail()}</span>
        <Button type='primary' block={true} onClick={this.logout} loading={this.state.logoutLoding}>
          退出登录
        </Button>
      </div>
    );
  }
}

export default UserInfo;
