import { Button, Icon, Input,  message, Modal, Popconfirm, Popover, Select } from 'antd';
import React from 'react';
import { ChromePicker } from 'react-color';
import { addCourse, deleteCourse, updateCourse } from '../../api/course';
import './CourseBlock.css';

const {Option} = Select;
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
  click: any;
  courseList: any;
  courseNo: string;
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
  week: any;
  courseNo: string;
}

class CourseBlock extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      visible: this.props.modalVisible,
      courseName: this.props.courseName,
      teacherName: this.props.teacherName,
      courseRoom: this.props.courseRoom,
      courseNo: this.props.courseNo,
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
        courseNo: this.props.courseNo,
        color: this.props.color,
        time: this.props.courseList.filter((course: any) => course.name === this.props.courseName),
      },
      colorVisible: false,
      chromePickerColor: '',
      week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    };
    console.log(this.state.modalInfo.time);
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
    const timeList = [];
    for (const item of this.state.modalInfo.time) {
      timeList.push({
        start: item.start,
        time: item.time,
        week: item.week,
      });
    }
    const data = {
      name: this.state.modalInfo.courseName,
      start: Number(this.state.myRef.current.parentNode.style.top.slice(0, -2)) / 44,
      time: Number(this.state.myRef.current.parentNode.style.height.slice(0, -2)) / 44,
      color: this.state.modalInfo.color,
      week: this.props.week,
      id: this.props.id ? this.props.id : this.state.id,
      teacherName: this.state.modalInfo.teacherName,
      room: this.state.modalInfo.courseRoom,
      courseNo: this.state.modalInfo.courseNo,
      timeList,
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
        courseName: this.props.courseName,
        courseRoom: this.props.courseRoom,
        teacherName: this.props.teacherName,
        courseNo: this.props.courseNo,
        color: this.props.color,
        time: this.props.courseList.filter((course: any) => course.name === this.props.courseName),
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
  /**
   * courseNoChange
   */
  public courseNoChange = (e: any) => {
    const modalInfo = this.state.modalInfo;
    modalInfo.courseNo = e.target.value;
    this.setState({
      modalInfo,
    });
  }
  /**
   * startChange
   */
  public startChange = (e: any, index: any) => {
    e.persist();
    const modalInfo = this.state.modalInfo;
    modalInfo.time[index].start = Number(e.target.value)   - 1;
    this.setState({
      modalInfo,
    });
  }

  /**
   * timeChange
   */
  public timeChange = (e: any, index: number) => {
    e.persist();
    const modalInfo = this.state.modalInfo;
    modalInfo.time[index].time = e.target.value - modalInfo.time[index].start;
    this.setState({
      modalInfo,
    });
  }

  /**
   * weekChange
   */
  public weekChange = (e: any, index: number) => {
    const modalInfo = this.state.modalInfo;
    modalInfo.time[index].week = e;
    this.setState({
      modalInfo,
    });
  }

  /**
   * deleteTime
   */
  public deleteTime(index: number) {
    const modalInfo = this.state.modalInfo;
    modalInfo.time.splice(index, 1);
    this.setState({
      modalInfo,
    });
  }

  /**
   * addTime
   */
  public addTime(index: number) {
    const modalInfo = this.state.modalInfo;
    modalInfo.time.push({
      week: 1,
      start: 1,
      time: 1,
    });
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
          onClick={this.props.click}
        >
          {this.props.courseName}&nbsp;——&nbsp;
          {this.props.courseRoom}<br />
          {this.props.teacherName}
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
            addonBefore='课 程 号'
            value={this.state.modalInfo.courseNo}
            className='input-item'
            onChange={this.courseNoChange}
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
            <span className='input-item__title'>&nbsp;颜&nbsp;&nbsp;色&nbsp;&nbsp;</span>
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
          <div className='input-item time'>
            <div className='input-item__title time'>
              <span>上课时间</span>
            </div>
            <div className='input-item__time'>
              {
                this.state.modalInfo.time
                .map((e: any, index: number) => {
                  return(
                    <div key={index} style={{marginBottom: 10}}>
                      <Select
                        value={e.week}
                        style={{ width: 90 }}
                        // tslint:disable-next-line: jsx-no-lambda
                        onChange={(event: any) => {
                          this.weekChange(event, index);
                        }}>
                        {
                          this.state.week.map((item: any, i: any) => {
                            return <Option key={i} value={i + 1}>{item}</Option>;
                          })
                        }
                      </Select>
                      &nbsp;&nbsp;&nbsp;第&nbsp;
                      <Input
                        className='input-item__time__item'
                        type='number'
                        value={e.start + 1}
                        // tslint:disable-next-line: jsx-no-lambda
                        onChange={(event: any) => {
                          this.startChange(event, index);
                        }}/>
                      &nbsp;—&nbsp;
                      <Input
                        className='input-item__time__item'
                        type='number'
                        value={e.start + e.time}
                        // tslint:disable-next-line: jsx-no-lambda
                        onChange={(event: any) => {
                          this.timeChange(event, index);
                        }}/>&nbsp;节
                      <Popover placement='right' content='删除' trigger='hover'>
                        <Icon
                          type='minus-circle'
                          className='input-item__time__add'
                          style={{color: 'red'}}
                          onClick={this.deleteTime.bind(this, index)}/>
                      </Popover>
                      {
                        index === (this.state.modalInfo.time.length - 1) ? (
                          <Popover placement='right' content='添加' trigger='hover'>
                            <Icon
                              type='plus-circle'
                              className='input-item__time__add'
                              onClick={this.addTime.bind(this, index)}/>
                          </Popover>
                        ) : null
                      }
                    </div>
                  );
                })
              }

            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CourseBlock;
