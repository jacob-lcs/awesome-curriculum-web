import { Avatar, Button, Divider, Icon, Input, message, Popover } from 'antd';
import Picker from 'emoji-picker-react';
import React from 'react';
import io from 'socket.io-client';
import { uploadFile } from '../../api/common';
import { checkMessageSendByMyself, queryHistoryMessage } from '../../api/message';
import { getAvatar, getName, getSchool, getToken } from '../../utils/auth';
import compressFile from '../../utils/compress';
import './Chat.css';

let socket: any = '';

interface IState {
  avatar: string;
  name: string;
  chooseCourse: string;
  chatContent: any;
  messageInput: string;
  socket: any;
  request: boolean;
}

interface IProps {
  courseList: any[];
}

class Chat extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      avatar: getAvatar() as string,
      name: getName() as string,
      chooseCourse: '数据结构',
      chatContent: [],
      messageInput: '',
      socket: '',
      request: false,
    };
  }

  /**
   * onEmojiClick
   */
  public onEmojiClick = (event: any, emojiObject: any) => {
    const messageInput = this.state.messageInput;
    this.setState({
      messageInput: `${messageInput}${emojiObject.emoji}`,
    });
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
        formData.append('notAvatar', 'true');
        uploadFile(formData).then((response: any) => {
          this.state.socket.emit('send message', {
            from: getToken(),
            content: `https://lcs.show:3000/${response.fileName}`,
            to: this.props.courseList.filter((x: any) => x.name === this.state.chooseCourse)[0],
            school: getSchool(),
            type: 'image',
          });
        }).catch((error) => {
          console.error(error);
        });
      });

    }
  }
  // tslint:disable-next-line: member-ordering
  public emojiPicker = (
    <div>
      <Picker onEmojiClick={this.onEmojiClick}/>
    </div>
  );

  // tslint:disable-next-line: member-ordering
  public messageTypePicker = (
    <div>
      <div>
      发送图片
      <input
        type='file'
        accept='image/*' className='upload' onChange={this.inputFileChange} style={{height: '20px'}}/>
      </div>
      <hr/>
      <div style={{cursor: 'pointer'}}>发送代码</div>
    </div>
  );

  /**
   * handleCourseClick
   */
  public handleCourseClick = (name: any) => {
    this.props.courseList.forEach((e) => (e.choose = false));
    const index = this.props.courseList.findIndex((e) => e.name === name);
    this.props.courseList[index].choose = true;
    this.setState({
      chooseCourse: name,
    });
  }

  /**
   * watchScroll
   */
  public watchScroll = () => {
    const contentChat = document.getElementsByClassName('content__chat')[0];
    if (contentChat.scrollTop === 0
        && !this.state.request
        && this.state.chatContent.find((x: any) => x.courseName === this.state.chooseCourse).data.length !== 0) {
      this.setState({
        request: true,
      });
      const data = this.state.chatContent.find((x: any) => x.courseName === this.state.chooseCourse).data[0];
      queryHistoryMessage(data).then((response: any) => {
        const messageContent = this.state.chatContent;
        messageContent.find((x: any) => x.courseName === this.state.chooseCourse).data.unshift(...response.data);
        this.setState({
          chatContent: messageContent,
        });
        this.setState({
          request: false,
        });
      });
    }
  }

  /**
   * getMessageData
   */
  public getMessageData = () => {
    const data = {
      id: 0,
      data: this.props.courseList,
      school: getSchool(),
    };
    queryHistoryMessage(data).then((response: any) => {
      this.setState({
        chatContent: response.data,
      });
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
      this.setState({
        request: false,
      });
    });
  }

  /**
   * messageInputChange
   */
  public messageInputChange = (e: any) => {
    this.setState({
      messageInput: e.target.value,
    });
  }

  /**
   * scrollToBottom
   */
  public scrollToBottom = () => {
    const contentChat = document.getElementsByClassName('content__chat')[0];
    contentChat.scrollTop = contentChat.scrollHeight;
  }

  /**
   * sendMessage
   */
  public sendMessage = () => {
    if (this.state.messageInput.length) {
      this.state.socket.emit('send message', {
        from: getToken(),
        content: this.state.messageInput,
        to: this.props.courseList.filter((x: any) => x.name === this.state.chooseCourse)[0],
        school: getSchool(),
        type: 'text',
      });
      this.setState({
        messageInput: '',
      });
    } else {
      message.warning('请不要输入空内容');
    }

  }

  /**
   * insertMessage
   */
  // tslint:disable-next-line: max-line-length
  public insertMessage(name: string, content: string, from: any, id: number, time: string, self: boolean, type: string) {
    const chatContent = this.state.chatContent;
    const res = chatContent.find((item: any) => item.courseName === name);
    if (res) {
      res.data.push({
        self,
        content,
        from,
        id,
        time,
        type,
      });
    } else {
      chatContent.push({
        courseName: name,
        data: [{
          self,
          content,
          from,
          id,
          time,
          type,
        }],
      });
    }
    this.setState({
      chatContent,
    });
  }
  public componentDidMount = () => {
    // 建立websocket连接
    socket = io('https://lcs.show:5000');
    socket.on('open', () => {
      console.log('客户端已连接');
      socket.emit('binding', {
        from: getToken(),
        groups: this.props.courseList,
        school: getSchool(),
      });
      socket.on('broadcast message', (data: any) => {
        checkMessageSendByMyself({id: data.id}).then((res: any) => {
          this.insertMessage(data.courseName, data.content, data.from, data.id, data.time, res.res, data.type);
          this.scrollToBottom();
        });
      });
    });
    this.setState({
      socket,
    });
    this.handleCourseClick(this.props.courseList[0].name);
    this.getMessageData();

  }

  public render() {
    return (
      <div className='chat-container'>
        <div className='chat-container__user'>
          <Avatar
            size={40}
            src={this.state.avatar}
            className='chat-container__user-avatar'
          />
          <span className='chat-container__user-name'>{this.state.name}</span>
          <Popover content='与你的学校、课程各项信息相同的用户会进入同一个群聊' placement='right'>
            <Icon
              type='question-circle'
              className='chat-container__user-icon'
            />
          </Popover>
        </div>
        <div className='chat-container__chat-list'>
          {this.props.courseList.map((course) => {
            return (
              <div
                className='course-item'
                key={course.name}
                style={{
                  backgroundColor: course.choose ? '#3D9F92' : '#4AA89B',
                }}
                onClick={this.handleCourseClick.bind(this, course.name)}
              >
                <Avatar size='large' className='course-item__avatar'>
                  {course.name[0]}
                </Avatar>
                <span className='course-item__name'>{course.name}</span>
              </div>
            );
          })}
        </div>
        <div className='chat-container__content'>
          <div className='content__header'>
            <span>{this.state.chooseCourse}</span>
          </div>
          <Divider />
          <div className='content__chat' onScroll={this.watchScroll}>
            {this.state.chatContent.find(
              (item: any) => item.courseName === this.state.chooseCourse,
            ) ? (
              this.state.chatContent
                .find((item: any) => item.courseName === this.state.chooseCourse)
                .data.map((item: any, index: number) => {
                  return !item.self ? <div key={index} className='message--2l0Oz '>
                  <img
                    className='avatar--2ifA1'
                    src={item.from.avatar}
                    alt=''
                    style={{width: '44px', height: '44px', borderRadius: '22px'}}
                  />
                  <div className='right--39-4H'>
                    <div className='nicknameTimeBlock--2H_Hk'>
                      <span className='nickname--3Gfts'>{item.from.username}</span>
                      {/* <span className='time--3uGVq'>19:40</span> */}
                    </div>
                    <div className='contentButtonBlock--3wqjA'>
                      <div className='content--2PkJk'>
                          <div className='textMessage--371Pk'>
                        {
                          item.type === 'text' ? item.content :
                          <img src={item.content} alt='图片' style={{maxWidth: '80%'}}/>
                        }
                        </div>
                      </div>
                    </div>
                    <div className='arrow--1BPRE'/>
                  </div>
                </div> : <div className='message--2l0Oz self--2uoUC'  key={index}>
                  <img
                    className='avatar--2ifA1'
                    src={item.from.avatar}
                    alt=''
                    style={{width: '44px', height: '44px', borderRadius: '22px'}}
                  />
                  <div className='right--39-4H'>
                    <div className='nicknameTimeBlock--2H_Hk'>
                      <span className='nickname--3Gfts'>{item.from.username}</span>
                      {/* <span className='time--3uGVq'>昨天 17:01</span> */}
                    </div>
                    <div className='contentButtonBlock--3wqjA'>
                      <div className='content--2PkJk'>
                        <div className='textMessage--371Pk'>
                        {
                          item.type === 'text' ? item.content :
                          <img src={item.content} alt='图片' style={{maxWidth: '80%'}}/>
                        }
                        </div>
                      </div>
                    </div>
                    <div className='arrow--1BPRE'/>
                  </div>
                </div>
                ;
                })
            ) : (
              <div />
            )}
          </div>
          <div className='content__input'>
            <Popover content={this.emojiPicker} trigger='click'>
              <Icon type='smile' className='content__input__emoji' />
            </Popover>
            <Popover content={this.messageTypePicker} trigger='click'>
              <Icon type='plus-circle' className='content__input__emoji' />
            </Popover>
            <Input className='content__input__edit' value={this.state.messageInput} onChange={this.messageInputChange}/>
            <Button onClick={this.sendMessage} style={{marginRight: '10px'}}>发送</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
