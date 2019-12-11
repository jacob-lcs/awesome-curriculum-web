import { Icon, Input, message, Modal } from 'antd';
import React from 'react';
import { addCourse, updateCourse } from '../../api/course';
import './CourseBlock.css';

interface IProps {
  courseName: string;
  teacherName: string;
  courseRoom: string;
  modalVisible: boolean;
  className: string;
  first: boolean;
  week?: number;
  id?: number;
}

interface IState {
  visible: boolean;
  courseName: string;
  teacherName: string;
  courseRoom: string;
  first: boolean;
  myRef: any;
  id: number;
  optionsStyle: object;
  modalInfo: any;
}

class CourseBlock extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      visible: this.props.modalVisible,
      courseName: this.props.courseName,
      teacherName: this.props.teacherName,
      courseRoom: this.props.courseRoom,
      first: this.props.first,
      myRef: React.createRef(),
      id: this.props.id || 0,
      optionsStyle: {
        display: 'none',
      },
      modalInfo: {
        courseName: '',
        courseRoom: '',
        teacherName: '',
      },
    };
  }

  public handleOk = () => {
    this.setState({
      courseName: this.state.modalInfo.courseName,
      courseRoom: this.state.modalInfo.courseRoom,
      teacherName: this.state.modalInfo.teacherName,
    });
    const data = {
      name: this.state.modalInfo.courseName,
      start: Number(this.state.myRef.current.parentNode.style.top.slice(0, -2)) / 44,
      time: Number(this.state.myRef.current.parentNode.style.height.slice(0, -2)) / 44,
      color: '0FC4A7',
      week: this.props.week,
      id: this.state.id,
    };

    if (this.state.id) {
      updateCourse(data).then(() => {
        message.success('修改成功');
      }).catch((error) => {
        console.error(error);
      });
    } else {
      addCourse(data).then((response: any) => {
        this.setState({
          id: response.id,
        });
        message.success('添加成功');
      }).catch((error) => {
        console.error(error);
      });
    }

    this.setState({
      visible: false,
      first: false,
    });
  }

  public handleCancel = () => {
    this.setState({
      visible: false,
    });
    if (this.state.first) {
      const parentNode = this.state.myRef.current.parentNode;
      parentNode.style.display = 'none';
    }

  }

  public onMouseUp = () => {
    this.setState({
      modalInfo: {
        courseName: this.state.courseName,
        courseRoom: this.state.courseRoom,
        teacherName: this.state.teacherName,
      },
    });
    this.setState({
      visible: true,
    });
  }

  public changeInfo = () => {
    this.setState({
      modalInfo: {
        courseName: this.state.courseName,
        courseRoom: this.state.courseRoom,
        teacherName: this.state.teacherName,
      },
    });
    this.setState({
      visible: true,
    });
  }

  public courseNameChange = (e: any) => {
    const modalInfo = this.state.modalInfo;
    modalInfo.courseName = e.target.value;
    this.setState({
      modalInfo,
    });
  }

  public courseRoomChange = (e: any) => {
    const modalInfo = this.state.modalInfo;
    modalInfo.courseRoom = e.target.value;
    this.setState({
      modalInfo,
    });
  }

  public teacherNameChange = (e: any) => {
    const modalInfo = this.state.modalInfo;
    modalInfo.teacherName = e.target.value;
    this.setState({
      modalInfo,
    });
  }

  public showOptions = () => {
    this.setState({
      optionsStyle: {
        display: 'block',
      },
    });
  }

  public closeOptions = () => {
    this.setState({
      optionsStyle: {
        display: 'none',
      },
    });
  }

  public render() {
    return (
      <div className={`course-container ${this.props.className}`} ref={this.state.myRef}>
        <div
          className='course'
          onMouseEnter={this.showOptions}
          onMouseLeave={this.closeOptions}
        >
          {this.state.courseName}&nbsp;——&nbsp;
          {this.state.courseRoom}<br />
          {this.state.teacherName}
        </div>
        <div
          className='options'
          onMouseEnter={this.showOptions}
          onMouseLeave={this.closeOptions}
          style={this.state.optionsStyle}
        >
          <Icon type='edit' title='编辑' onClick={this.changeInfo}/>
          <Icon type='delete' title='删除'/>
          <Icon type='sound' title='进入群聊'/>
        </div>
        <Modal
          title='修改课程信息'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            addonBefore='课程名称'
            value={this.state.modalInfo.courseName}
            className='input-item'
            onChange={this.courseNameChange}
          />
          <Input
            addonBefore='上课教室'
            value={this.state.modalInfo.courseRoom}
            className='input-item'
            onChange={this.courseRoomChange}
          />
          <Input
            addonBefore='课程老师'
            value={this.state.modalInfo.teacherName}
            className='input-item'
            onChange={this.teacherNameChange}
          />
        </Modal>
      </div>
    );
  }
}

export default CourseBlock;
