import { Button, Icon, Input, message, Modal, Popconfirm } from 'antd';
import React from 'react';
import { ChromePicker } from 'react-color';
import { addCourse, deleteCourse, updateCourse } from '../../api/course';
import './CourseBlock.css';

interface IProps {
  courseName: string;
  teacherName: string;
  courseRoom: string;
  modalVisible: boolean;
  className: string;
  week?: number;
  id: number;
  color: string;
  updateCourseState?: any;
  cancelAdd?: any;
}

interface IState {
  visible: boolean;
  colorVisible: boolean;
  courseName: string;
  teacherName: string;
  courseRoom: string;
  myRef: any;
  id: number;
  optionsStyle: object;
  modalInfo: any;
  color: string;
  chromePickerColor: string;
}

class CourseBlock extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      visible: this.props.modalVisible,
      courseName: this.props.courseName,
      teacherName: this.props.teacherName,
      courseRoom: this.props.courseRoom,
      color: this.props.color,
      myRef: React.createRef(),
      id: this.props.id || 0,
      optionsStyle: {
        display: 'none',
      },
      modalInfo: {
        courseName: this.props.courseName,
        courseRoom: this.props.courseRoom,
        teacherName: this.props.teacherName,
        color: this.props.color,
      },
      colorVisible: false,
      chromePickerColor: '',
    };
  }

  public componentDidUpdate(prevProps: any) {
    if (prevProps.modalVisible !== this.props.modalVisible) {
      this.setState({
        visible: this.props.modalVisible,
      });
    }
    if (prevProps.color !== this.props.color) {
      this.setState({
        color: this.props.color,
      });
    }
  }

  public handleOk = () => {
    const data = {
      name: this.state.modalInfo.courseName,
      start: Number(this.state.myRef.current.parentNode.style.top.slice(0, -2)) / 44,
      time: Number(this.state.myRef.current.parentNode.style.height.slice(0, -2)) / 44,
      color: this.state.modalInfo.color,
      week: this.props.week,
      id: this.props.id ? this.props.id : this.state.id,
      teacherName: this.state.modalInfo.teacherName,
    };
    if (data.id > 0) {
      updateCourse(data).then(() => {
        message.success('修改成功');
        this.props.updateCourseState();
        this.setState({
          visible: false,
        });
      }).catch((error) => {
        console.error(error);
      });
    } else {
      addCourse(data).then((response: any) => {
        this.setState({
          id: response.id,
        });
        message.success('添加成功');
        this.props.updateCourseState();
        this.setState({
          visible: false,
        });
      }).catch((error) => {
        console.error(error);
      });
    }

  }

  public handleCancel = () => {
    this.setState({
      visible: false,
    });
    if (this.props.id <= 0 || this.state.id <= 0) {
      this.props.cancelAdd();
    }
  }

  public changeInfo = () => {
    this.setState({
      modalInfo: {
        courseName: this.state.courseName,
        courseRoom: this.state.courseRoom,
        teacherName: this.state.teacherName,
        color: this.state.color,
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

  public deleteCourse = (arg: boolean) => {
    const data = {
      id: this.state.id,
      name: this.state.courseName,
      all: arg,
    };
    deleteCourse(data).then(() => {
      message.success('删除成功');
      this.props.updateCourseState();
    }).catch((error) => {
      console.error(error);
    });
  }

  /**
   * submitColor
   */
  public submitColor = () => {
    const modalInfo = this.state.modalInfo;
    modalInfo.color = this.state.chromePickerColor;
    this.setState({
      colorVisible: false,
      modalInfo,
    });
  }

  /**
   * cancelColor
   */
  public cancelColor = () => {
    this.setState({
      colorVisible: false,
    });
  }

  /**
   * showColor
   */
  public showColor = () => {
    this.setState({
      chromePickerColor: `#${this.state.modalInfo.color}`,
      colorVisible: true,
    });
  }

  /**
   * handleColorChangeComplete
   */
  public handleColorChangeComplete = (color: any) => {
    this.setState({
      chromePickerColor: color.hex.slice(1),
    });
  }

  public render() {
    return (
      <div
        className={`course-container ${this.props.className}`}
        ref={this.state.myRef}
        style={{backgroundColor: `#${this.state.color}`}}
      >
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
          <Popconfirm
            title='请选择您的删除要求'
            onConfirm={this.deleteCourse.bind(this, true)}
            onCancel={this.deleteCourse.bind(this, false)}
            okText='删除所有同名板块'
            cancelText='只删除此板块'
          >
            <Icon type='delete' title='删除'/>
          </Popconfirm>
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
          <div className='input-item color'>
            <span className='input-item__title'>&nbsp;颜&nbsp;&nbsp;色&nbsp;</span>
            <div
              className='colorBlock'
              style={{backgroundColor: `#${this.state.modalInfo.color}`}}
              onClick={this.showColor}
              title='修改颜色'
            />
            <Modal
              visible={this.state.colorVisible}
              closable={false}
              footer={null}
              className='colorPickerModal'
            >
              <ChromePicker color={this.state.chromePickerColor} onChangeComplete={this.handleColorChangeComplete}/>
              <Button type='primary' size='small' className='colorSubmit' onClick={this.submitColor}>确定</Button>
              <Button size='small' className='colorSubmit' onClick={this.cancelColor}>取消</Button>
            </Modal>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CourseBlock;
