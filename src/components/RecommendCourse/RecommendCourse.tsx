import { Card, Icon, message } from 'antd';
import React from 'react';
import {collectCourse, deleteFavorite} from '../../api/course';
import './RecommendCourse.css';

const { Meta } = Card;

interface IProps {
  name: string;
  imgUrl: string;
  from: string;
  url: string;
  id: number;
  favorite: boolean;
}

interface IState {
  favorite: boolean;
}

class RecommendCourse extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      favorite: this.props.favorite,
    };
  }

  /**
   * toDetail
   */
  public toDetail = () => {
    window.open(this.props.url);
  }

  public onImgError = (el: any) => {
    el.src = 'https://profile.csdnimg.cn/3/3/9/3_tian_ci';
  }

  public collect = (id: number) => {
    collectCourse({courseId: id}).then((res: any) => {
      message.success('收藏成功');
      this.setState({
        favorite: true,
      });
    }).catch((e: any) => {
      console.error(e);
    });
  }
  public cancelCollect = (id: number) => {
    deleteFavorite({courseId: id}).then((res: any) => {
      message.success('取消收藏成功');
      this.setState({
        favorite: false,
      });
    }).catch((e: any) => {
      console.error(e);
    });
  }

  public render() {
    return (
      <div>
        <Card
          hoverable={true}
          style={{ width: 300, margin: '0 auto', marginTop: 20 }}
          cover={<img alt='example' src={this.props.imgUrl} onError={this.onImgError} onClick={this.toDetail}/>}
        >
          <Meta title={this.props.name} description={this.props.from} />
          {
            !this.state.favorite ?
            <Icon
              type='heart'
              className='collect'
              title='收藏'
              onClick={this.collect.bind(this, this.props.id)}/> :
            <Icon
              type='heart'
              className='collect'
              theme='twoTone'
              twoToneColor='#eb2f96'
              title='取消收藏'
              onClick={this.cancelCollect.bind(this, this.props.id)}/>
          }
        </Card>
      </div>
    );
  }
}

export default RecommendCourse;
