import { Input, Tabs } from 'antd';
import React from 'react';
import {getFavoriteCourse, searchCourse} from '../../api/course';
import RecommendCourse from '../RecommendCourse/RecommendCourse';
import './Draw.css';

const { TabPane } = Tabs;

const { Search } = Input;

interface IState {
  visible: boolean;
  searchCourseList: any;
  favoriteCourse: any;
  searchIndex: number;
  searchMore: boolean;
  favoriteIndex: number;
  favoriteMore: boolean;
  searchContent: string;
}

class Draw extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      searchCourseList: [],
      favoriteCourse: [],
      searchIndex: 1,
      favoriteIndex: 1,
      searchMore: true,
      favoriteMore: true,
      searchContent: '',
    };
  }

  public componentDidMount = () => {
    this.search('');
    this.getFavorite();
  }

  public showDrawer = () => {
    this.setState({
      visible: true,
    });
  }

  public search = (content: string) => {
    searchCourse({page: this.state.searchIndex, content}).then((response: any) => {
      if (this.state.searchIndex === 1) {
        this.setState({
          searchCourseList: response.data,
        });
      } else {
        const searchCourseList = this.state.searchCourseList;
        searchCourseList.push(...response.data);
        this.setState({
          searchCourseList,
        });
      }
      if (response.data.length < 20) {
        this.setState({
          searchMore: false,
        });
      } else {
        this.setState({
          searchIndex: this.state.searchIndex + 1,
        });
      }
    });
  }

  public onClose = () => {
    this.setState({
      visible: false,
    });
  }

  /**
   * onSearch
   */
  public onSearch = (value: any) => {
    this.setState({
      searchIndex: 1,
      searchContent: value,
    });
    this.search(value);
  }

  public getFavorite = () => {
    const favoriteCourse = this.state.favoriteCourse;
    getFavoriteCourse({page: this.state.favoriteIndex}).then((res: any) => {
      if (this.state.favoriteIndex === 1) {
        this.setState({
          favoriteCourse: res.data,
        });
      } else {
        favoriteCourse.push(...res.data);
        this.setState({
          favoriteCourse,
        });
      }
      if (res.data.length < 20) {
        this.setState({
          favoriteMore: false,
        });
      } else {
        this.setState({
          favoriteIndex: this.state.favoriteIndex + 1,
        });
      }
    });
  }
  public render() {
    return (
      <div>
        <div>
          <Tabs defaultActiveKey='1' className='courseTab'>
            <TabPane tab='搜索及推荐' key='1'>
              <div className='search__block'>
                <Search
                  placeholder='搜索课程'
                  onSearch={this.onSearch}
                  style={{ width: 200 }}
                />
              </div>
              {
                this.state.searchCourseList.map((item: any, index: number) => (
                  <RecommendCourse
                    key={index}
                    name={item.name}
                    from={item.resource}
                    imgUrl={item.imgUrl}
                    url={item.site}
                    id={item.id}
                    favorite={item.favorite}/>
                ))
              }
              {
                this.state.searchMore ?
                <div style={{textAlign: 'center', margin: 5, cursor: 'pointer'}}
                  onClick={this.search.bind(this, this.state.searchContent)}>
                  <span>—————加载更多————</span>
                </div> :
                <div style={{textAlign: 'center', margin: 5}}>
                  <span>—————没有更多了哦————</span>
                </div>
              }

            </TabPane>
            <TabPane tab='我的收藏' key='2'>
            {
                this.state.favoriteCourse.map((item: any, index: number) => (
                  <RecommendCourse
                    key={index}
                    name={item.name}
                    from={item.resource}
                    imgUrl={item.imgUrl}
                    url={item.site}
                    id={item.id}
                    favorite={item.favorite}/>
                ))
              }
              {
                this.state.favoriteMore ?
                <div style={{textAlign: 'center', margin: 5, cursor: 'pointer'}} onClick={this.getFavorite}>
                  <span>—————加载更多————</span>
                </div> :
                <div style={{textAlign: 'center', margin: 5}}>
                  <span>—————没有更多了哦————</span>
                </div>
              }
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Draw;
