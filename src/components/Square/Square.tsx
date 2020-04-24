import { Modal} from 'antd';
import React from 'react';
import { queryCourse } from '../../api/course';
import CourseBlock from '../CourseBlock/CourseBlock';
import CourseInfo from '../CourseInfo/CourseInfo';
import LabelSelector from '../LabelSelector/LabelSelector';

import './Square.css';

interface IData {
  name: string;
  room: string;
  teacherName: string;
  time: object[];
  courseNo: '';
}

interface IState {
  mouseDown: boolean;
  courseList: any[];
  courseDetailVisible: boolean;
  courseDetailData: IData;
  labelVisible: boolean;
}

interface IProps {
  updateCourseList: any;
}
class Square extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mouseDown: false,
      courseList: [],
      courseDetailVisible: false,
      courseDetailData: {
        name: '',
        room: '',
        teacherName: '',
        time: [],
        courseNo: '',
      },
      labelVisible: false,
    };
  }

  public componentDidMount = () => {
    this.getData();
  }

  /**
   * getData
   */
  public getData = () => {
    queryCourse()
      .then((response: any) => {
        this.setState({
          courseList: response.data,
        });
        if (!response.label) {
          this.setState({
            labelVisible: true,
          });
        }
        const courses: string[] = [];
        const res: any[] = [];
        for (const item of this.state.courseList) {
          if (!courses.includes(item.name)) {
            courses.push(item.name);
            res.push({
              id: item.id,
              name: item.name,
              choose: false,
              courseNo: item.courseNo,
            });
          }
        }
        this.props.updateCourseList(res);
      })
      .catch((error) => console.error(error));
  }

  public onMouseMove = (e: any) => {
    if (!this.state.mouseDown) {
      return;
    }
    e.persist();
    const top = e.pageY - 100;
    const elementTop = this.state.courseList[this.state.courseList.length - 1].start * 44;
    if (top > elementTop) {
      const courseList = this.state.courseList;
      courseList[courseList.length - 1].time = Math.floor(
        (top - elementTop) / 44,
      ) + 1;
      this.setState({
        courseList,
      });
    }
  }

  public onMouseDown = (e: any) => {
    if (e.target.className !== 'square-col') {
      return;
    }
    const squareCols = document.getElementsByClassName('square-col');
    const week = Array.from(squareCols).findIndex((item) => item === e.target);
    const courseList = this.state.courseList;
    courseList.push({
      id: '-1',
      name: '实例名称',
      week,
      start: Math.floor((e.pageY - 100) / 44),
      time: 1,
      color: '0FC4A7',
      teacherName: 'Jacob',
      room: 'C121',
      courseNo: '',
    });
    this.setState({
      mouseDown: true,
      courseList,
    });
    e.persist();
  }

  /**
   * cancelAdd
   */
  public cancelAdd = () => {
    const courseList = this.state.courseList;
    courseList.splice(courseList.length - 1, 1);
    this.setState({
      courseList,
    });
  }

  public onMouseUp = (e: any) => {
    if (!this.state.mouseDown) {
      return;
    }
    const courseList = this.state.courseList;
    courseList[courseList.length - 1].id = 0;
    this.setState({
      mouseDown: false,
      courseList,
    });
  }

  /**
   * showCourseDetail
   */
  public showCourseDetail = (name: string) => {
    const courses = this.state.courseList.filter((item) => item.name === name);
    const courseDetailData = this.state.courseDetailData;
    courseDetailData.name = name;
    courseDetailData.room = 'C121';
    courseDetailData.teacherName = courses[0].teacherName;
    courseDetailData.courseNo = courses[0].courseNo;
    courseDetailData.time = [];
    for (const item of courses) {
      courseDetailData.time.push({
        week: item.week,
        start: item.start,
        time: item.time,
      });
    }
    this.setState({
      courseDetailVisible: true,
      courseDetailData,
    });
  }

  /**
   * hideModal
   */
  public hideModal = () => {
    this.setState({
      courseDetailVisible: false,
    });
  }

  public closeSelector = () => {
    this.setState({
      labelVisible: false,
    });
  }

  public render() {
    return (
      <div className='square-container'>
        <Modal
          visible={this.state.courseDetailVisible}
          onCancel={this.hideModal}
          footer={null}
          centered={true}
          width={400}
        >
          <CourseInfo data={this.state.courseDetailData}/>
        </Modal>
        <Modal
          visible={this.state.labelVisible}
          title='请选择您感兴趣的栏目(至少六个)'
          closable={false}
          width={1000}
          footer={null}
        >
          <LabelSelector close={this.closeSelector} />
        </Modal>
        <div className='week'>
          <div className='week-item' />
          {
            ['一', '二', '三', '四', '五', '六', '日'].map((item) => {
              return <div className='week-item' key={item}>星期{item}</div>;
            })
          }
        </div>
        <div className='square'>
          <div className='square-col'>
          {
            ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三'].map((item) => {
            return <div className='square-col-course' key={item}>第{item}节课</div>;
            })
          }
          </div>
          {[1, 2, 3, 4, 5, 6, 7].map((e) => {
            return (
              <div
                className='square-col'
                onMouseMove={this.onMouseMove}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                key={e}
              >
                {this.state.courseList
                  .filter((course) => course.week === e)
                  .map((course) => {
                    return (
                      <div
                        key={course.id}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: 44 * course.time,
                          top: 44 * course.start,
                        }}
                      >
                        <CourseBlock
                          courseList={this.state.courseList}
                          courseName={course.name}
                          courseRoom={course.room}
                          teacherName={course.teacherName}
                          modalVisible={course.id ? false : true}
                          className=''
                          color={course.color}
                          week={course.week}
                          courseNo={course.courseNo}
                          id={course.id}
                          updateCourseState={this.getData}
                          cancelAdd={this.cancelAdd}
                          click={this.showCourseDetail.bind(this, course.name)}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Square;
