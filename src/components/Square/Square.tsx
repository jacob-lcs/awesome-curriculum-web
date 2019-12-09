import React from 'react';

import './Square.css';

// interface IState {
//   course: string[];
//   week: string[];
// }

class Square extends React.Component<{}, {}> {

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
          <div className='square-col'/>
          <div className='square-col'/>
          <div className='square-col'/>
          <div className='square-col'/>
          <div className='square-col'/>
          <div className='square-col'/>
          <div className='square-col'/>
        </div>
      </div>
    );
  }
}

export default Square;
