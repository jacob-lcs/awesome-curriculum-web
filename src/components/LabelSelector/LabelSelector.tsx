import React from 'react';
import {queryLabel, submitUserLabel} from '../../api/recommend';

import { Button, message, Tag } from 'antd';

const { CheckableTag } = Tag;

interface IState {
  labelData: any;
  checkStatus: number[];
  loading: boolean;
}

interface IPorps {
  close: any;
}

class LabelSelector extends React.Component<IPorps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      labelData: [],
      checkStatus: [],
      loading: false,
    };
  }

  public componentDidMount = () => {
    this.getData();
  }

  public getData = () => {
    queryLabel().then((res: any) => {
      this.setState({
        labelData: res.data,
      });
    });
  }

  public submit = () => {
    if (this.state.checkStatus.length < 6) {
      message.warning('至少选择六个标签哦');
    } else {
      this.setState({
        loading: true,
      });
      submitUserLabel({id: this.state.checkStatus}).then((res: any) => {
        message.success('我们会给您推荐个性化的课程');
        this.props.close();
        this.setState({
          loading: false,
        });
      });
    }
  }

  public handleChange = (id: number, checked: boolean) => {
    const checkStatus = this.state.checkStatus;
    if (checked) {
      checkStatus.push(id);
    } else {
      const index = checkStatus.indexOf(id);
      checkStatus.splice(index, 1);
    }
    this.setState({checkStatus});
  }

  public render() {
    return (
      <div>
        {
          this.state.labelData.map((item: any, index: number) => {
            return (
            <div key={`parent${index}`} style={{marginBottom: 5}}>
              <h3>{item.name}</h3>
              {
                item.children.map((child: any, i: number) => {
                return <CheckableTag
                        style={{cursor: 'pointer'}}
                        checked={this.state.checkStatus.includes(child.id)}
                        onChange={this.handleChange.bind(this, child.id)}
                        key={`child${i}`} >
                  {child.name}
                </CheckableTag>;
                })
              }
            </div>
            );
          })
        }
        <div style={{margin: 10, textAlign: 'right'}}>
          <Button type='primary' onClick={this.submit} loading={this.state.loading}>确定</Button>
        </div>
      </div>
    );
  }
}

export default LabelSelector;
