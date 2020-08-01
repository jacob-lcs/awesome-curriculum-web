
import { Avatar, Icon } from 'antd';
import React from 'react';
import './About.css';

class Draw extends React.Component<{}, {}> {

  /**
   * toLink
   */
  public toLink(link: string) {
    window.open(link, '_blank');
  }
  public render() {
    return (
      <div className='about-container'>
        <Avatar
          src='http://image.lcs.show/%E5%A4%B4%E5%83%8F.jpg'
          size={80}
        />
        <h2 className='about-title'>Jacob</h2>
        <p className='about-jieshao'>希望你能够喜欢我做的工具，代码在完工之后将会在github开源，敬请关注</p>
        <div className='about-icons'>
          <Icon type='github' className='about-icon' title='GitHub' onClick={this.toLink.bind(this, 'https://github.com/lcs1998')}/>
          <Icon type='heart' className='about-icon'  title='博客' onClick={this.toLink.bind(this, 'https://www.cnblogs.com/Jacob98/')}/>
        </div>
      </div>
    );
  }
}

export default Draw;
