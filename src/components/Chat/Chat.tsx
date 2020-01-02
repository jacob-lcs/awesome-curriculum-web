import { Avatar, Button, Divider, Icon, Input, Popover } from 'antd';
import React from 'react';
import io from 'socket.io-client';
import { getAvatar, getName, getToken } from '../../utils/auth';
import './Chat.css';

let socket: any = '';

interface ICourse {
  name: string;
  choose: boolean;
}

interface IState {
  avatar: string;
  name: string;
  courseList: ICourse[];
  chooseCourse: string;
  chatContent: any;
}

class Chat extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      avatar: getAvatar() as string,
      name: getName() as string,
      courseList: [
        {
          name: '数据结构',
          choose: true,
        },
        {
          name: '高等数学',
          choose: false,
        },
        {
          name: '大学英语',
          choose: false,
        },
      ],
      chooseCourse: '数据结构',
      chatContent: [],
    };
  }

  /**
   * handleCourseClick
   */
  public handleCourseClick = (name: any) => {
    const courseList = this.state.courseList;
    courseList.forEach((e) => (e.choose = false));
    const index = courseList.findIndex((e) => e.name === name);
    courseList[index].choose = true;
    this.setState({
      courseList,
      chooseCourse: name,
    });
  }

  /**
   * sendMessage
   */
  public sendMessage = () => {

  }

  public componentDidMount = () => {
    // 建立websocket连接
    socket = io('https://coursehelper.online:5000');
    socket.on('open', () => {
      console.log('客户端已连接');
      socket.emit('binding', {
        from: getToken(),
      });
    });

    // this.state.socket.onmessage = (event: any) => {
    //   const data = JSON.parse(event.data);
    //   const chatContent = this.state.chatContent;
    //   console.log(data);
    //   const fil = chatContent.filter((item: any) => item.courseName === data.courseName);
    //   if (!fil.length) {
    //     console.log(111);
    //     chatContent.push({
    //       courseName: data.courseName,
    //       data: [{
    //         id: data.id,
    //         content: data.content,
    //       }],
    //     });
    //     console.log(data.courseName, chatContent);
    //   } else {
    //     const f = chatContent.find((item: any) => item.courseName === data.courseName);
    //     console.log(f);
    //     f.data.push({
    //       id: data.id,
    //       content: data,
    //     });
    //   }
    //   this.setState({
    //     chatContent,
    //   });
    // };
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
          <Popover content='课程群聊目前只支持自动导入的课程' placement='right'>
            <Icon
              type='question-circle'
              className='chat-container__user-icon'
            />
          </Popover>
        </div>
        <div className='chat-container__chat-list'>
          {this.state.courseList.map((course) => {
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
          <div className='content__chat'>
            {this.state.chatContent.find(
              (item: any) => item.courseName === this.state.chooseCourse,
            ) ? (
              this.state.chatContent
                .find((item: any) => item.courseName === this.state.chooseCourse)
                .data.map((item: any, index: number) => {
                  return <div key={index}>item.content</div>;
                })
            ) : (
              <div />
            )}
          </div>
          <div className='content__input'>
            <Icon type='smile' className='content__input__emoji' />
            <Input className='content__input__edit' />
            <Button onClick={this.sendMessage}>发送</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
