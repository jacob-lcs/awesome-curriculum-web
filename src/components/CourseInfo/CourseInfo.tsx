import React from 'react';
import './CourseInfo.css';

interface IData {
  name: string;
  room: string;
  teacherName: string;
  time: any[];
}

interface IProps {
  data: IData;
}

interface IState {
  nums: string[];
}

class CourseInfo extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      nums: ['一', '二', '三', '四', '五', '六', '日'],
    };
  }

  public render() {
    return (
      <div className='course-detail-container'>
        <div className='course-detail-title'>课程详情</div>
        <div className='course-detail-item'>
          <div className='course-detail-name'>课程名称:</div>
          <div className='course-detail-content'>{this.props.data.name}</div>
        </div>
        <div className='course-detail-item'>
          <div className='course-detail-name'>上课教室:</div>
          <div className='course-detail-content'>{this.props.data.room}</div>
        </div>
        <div className='course-detail-item'>
          <div className='course-detail-name'>老师姓名:</div>
          <div className='course-detail-content'>
            {this.props.data.teacherName}
          </div>
        </div>
        <div className='course-detail-item'>
          <div className='course-detail-name'>上课时间:</div>
          <div className='course-detail-content' style={{textAlign: 'left'}}>
            {this.props.data.time.map((item) => {
              return (
                <div key={item.start + '' + item.time + item.week} style={{marginBottom: '10px'}}>
                  <span>
                    星期{this.state.nums[item.week - 1]}
                  </span>&nbsp;&nbsp;&nbsp;
                  <span>
                    第
                    <span style={{fontWeight: 'bold'}}>{item.start}</span>
                    节课 -- 第
                    <span style={{fontWeight: 'bold'}}>{item.start + item.time - 1}</span>
                    节课
                  </span>
                </div>

              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseInfo;
