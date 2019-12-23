import React from 'react';
import { queryCourse } from '../../api/course';
import CourseBlock from '../CourseBlock/CourseBlock';

import './Square.css';

interface IState {
  mouseDown: boolean;
  courseList: any[];
}

class Square extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mouseDown: false,
      courseList: [],
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

  public render() {
    return (
      <div className='square-container'>
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
                        key={course.week + course.name + course.teacherName}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: 44 * course.time,
                          top: 44 * course.start,
                        }}
                      >
                        <CourseBlock
                          courseName={course.name}
                          courseRoom='C121'
                          teacherName={course.teacherName}
                          modalVisible={course.id ? false : true}
                          className=''
                          color={course.color}
                          week={course.week}
                          id={course.id}
                          updateCourseState={this.getData}
                          cancelAdd={this.cancelAdd}
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
