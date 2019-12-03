import React from 'react';

import '../style/Square.css';

interface IProps {
  className: string;
}

interface IState {
  course: string[];
  week: string[];
}

class Square extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      course: ['第一节课', '第二节课', '第三节课', '第四节课', '第五节课', '第六节课', '第七节课',
         '第八节课', '第九节课', '第十节课', '第十一节课', '第十二节课', '第十三节课'],
      week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期七'],
    };
  }

  public render() {
    const course = this.state.course;
    return (
      <div>
        <table className='square'>
          <tbody>
            <tr className='square-week__name'>
              <td/>
              <td>{this.state.week[0]}</td>
              <td>{this.state.week[1]}</td>
              <td>{this.state.week[2]}</td>
              <td>{this.state.week[3]}</td>
              <td>{this.state.week[4]}</td>
              <td>{this.state.week[5]}</td>
              <td>{this.state.week[6]}</td>
            </tr>
            {course.map((name) =>
              <tr key={name}>
                <td className='square-course__name'>{name}</td>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
                <td/>
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Square;
