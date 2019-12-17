import React from 'react';
import ReactDOM from 'react-dom';
import { queryCourse } from '../../api/course';
import CourseBlock from '../CourseBlock/CourseBlock';

import './Square.css';

interface IState {
  element: HTMLElement;
  div: HTMLElement;
  mouseDown: boolean;
  fillBlock: HTMLElement;
}

class Square extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      element: document.createElement('div'),
      div: document.createElement('div'),
      mouseDown: false,
      fillBlock: document.createElement('div'),
    };
  }

  public componentDidMount = () => {
    queryCourse().then((response: any) => {
      for (const item of response.data) {
        const courseInfo = {
          courseName: item.name,
          courseRoom: 'C121',
          teacherName: 'Jacob',
          modalVisible: false,
          className: '',
          first: false,
          week: item.week,
          id: item.id,
        };
        const target = document.getElementsByClassName('square-col')[item.week] as HTMLElement;
        const height = 44 * item.time;
        const top = 44 * item.start;
        this.insertCourseBlock(target, height, top, courseInfo);
      }
    }).catch((error) => console.error(error));
  }

  public onMouseMove = (e: any) => {
    // if (e.target.className !== 'square-col') { return; }
    if (!this.state.mouseDown) {return; }
    e.persist();
    const top = e.pageY - 100;
    // const elementTop = this.state.div.style.top as string;
    // if (top > Number(elementTop.slice(0, -2))) {
    //   const div = this.state.div;
    //   div.style.height = `${(Math.floor((top - Number(elementTop.slice(0, -2))) / 44) + 1) * 44}px`;
    //   this.setState({
    //     div,
    //   });
    // }
    const elementTop = this.state.fillBlock.style.top as string;
    if (top > Number(elementTop.slice(0, -2))) {
      const fillBlock = this.state.fillBlock;
      fillBlock.style.height = `${(Math.floor((top - Number(elementTop.slice(0, -2))) / 44) + 1) * 44}px`;
      this.setState({
        fillBlock,
      });
    }
  }

  public onMouseDown = (e: any) => {
    if (e.target.className !== 'square-col') { return; }
    this.setState({
      mouseDown: true,
    });
    e.persist();
    const fillBlock = e.target.getElementsByClassName('fill')[0] as HTMLElement;
    const top = Math.floor((e.pageY - 100) / 44) * 44;
    fillBlock.style.top = `${top}px`;
    fillBlock.style.height = '44px';
    this.setState({
      fillBlock,
    });
  }

  public insertCourseBlock = (target: HTMLElement, height: number, top: number, courseInfo: any) => {
    const div = document.createElement('div');
    target.appendChild(div);
    div.style.position = 'absolute';
    div.style.width = '100%';
    div.style.height = `${height}px`;
    div.style.top = `${top}px`;
    const component = React.createElement(CourseBlock, courseInfo);
    ReactDOM.render(component, div);
  }

  public onMouseUp = (e: any) => {
    if (!this.state.mouseDown) {return; }
    this.setState({
      mouseDown: false,
    });
    const fillBlock = this.state.fillBlock;
    const div = document.createElement('div');
    const target = fillBlock.parentNode as HTMLElement;
    const squareCols = document.getElementsByClassName('square-col');
    const week = Array.from(squareCols).findIndex(e => e === target);
    target.appendChild(div);
    div.style.position = 'absolute';
    div.style.width = '100%';
    div.style.height = fillBlock.style.height;
    div.style.top = fillBlock.style.top;
    const component = React.createElement(CourseBlock, {
      courseName: '实例名称',
      courseRoom: 'C121',
      teacherName: 'Jacob',
      modalVisible: true,
      className: '',
      first: true,
      week,
    });
    ReactDOM.render(component, div);
    fillBlock.style.height = '0px';
    this.setState({
      fillBlock,
    });

  }

  public render() {
    return (
      <div className='square-container'>
        <div className='week'>
          <div className='week-item'/>
          <div className='week-item'>星期一</div>
          <div className='week-item'>星期二</div>
          <div className='week-item'>星期三</div>
          <div className='week-item'>星期四</div>
          <div className='week-item'>星期五</div>
          <div className='week-item'>星期六</div>
          <div className='week-item'>星期日</div>
        </div>
        <div className='square'>
          <div className='square-col'>
            <div className='square-col-course'>第一节课</div>
            <div className='square-col-course'>第二节课</div>
            <div className='square-col-course'>第三节课</div>
            <div className='square-col-course'>第四节课</div>
            <div className='square-col-course'>第五节课</div>
            <div className='square-col-course'>第六节课</div>
            <div className='square-col-course'>第七节课</div>
            <div className='square-col-course'>第八节课</div>
            <div className='square-col-course'>第九节课</div>
            <div className='square-col-course'>第十节课</div>
            <div className='square-col-course'>第十一节课</div>
            <div className='square-col-course'>第十二节课</div>
            <div className='square-col-course'>第十三节课</div>
          </div>
          <div
            className='square-col'
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <CourseBlock
              className='fill'
              courseName='实例名称'
              teacherName='Jacob'
              courseRoom='C121'
              modalVisible={false}
              first={true}
            />
          </div>
          <div
            className='square-col'
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <CourseBlock
              className='fill'
              courseName='实例名称'
              teacherName='Jacob'
              courseRoom='C121'
              modalVisible={false}
              first={true}
            />
          </div>
          <div
            className='square-col'
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <CourseBlock
              className='fill'
              courseName='实例名称'
              teacherName='Jacob'
              courseRoom='C121'
              modalVisible={false}
              first={true}
            />
          </div>
          <div
            className='square-col'
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <CourseBlock
              className='fill'
              courseName='实例名称'
              teacherName='Jacob'
              courseRoom='C121'
              modalVisible={false}
              first={true}
            />
          </div>
          <div
            className='square-col'
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <CourseBlock
              className='fill'
              courseName='实例名称'
              teacherName='Jacob'
              courseRoom='C121'
              modalVisible={false}
              first={true}
            />
          </div>
          <div
            className='square-col'
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <CourseBlock
              className='fill'
              courseName='实例名称'
              teacherName='Jacob'
              courseRoom='C121'
              modalVisible={false}
              first={true}
            />
          </div>
          <div
            className='square-col'
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <CourseBlock
              className='fill'
              courseName='实例名称'
              teacherName='Jacob'
              courseRoom='C121'
              modalVisible={false}
              first={true}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default Square;
