import { Divider } from 'antd';
import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  public render() {
    return(
      <div className='footer'>
         <Divider />
        <span>Made With</span>
        <span className='heart'>&nbsp;❤&nbsp;</span>
        <span>By Jacob</span><br/>
        <span>Welcome To My&nbsp;
          <a href='https://github.com/lcs1998' target='_blank' rel='noreferrer noopener'>GitHub</a>
        &nbsp;!</span>
        <span>&nbsp;JS天下第一！</span>
      </div>
    );
  }
}

export default Footer;
