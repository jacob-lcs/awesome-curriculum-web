import React from 'react';

interface IProps {
  // visible: boolean;
}

interface IState {
  visible: boolean;
}

class Draw extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  public showDrawer = () => {
    this.setState({
      visible: true,
    });
  }

  public onClose = () => {
    this.setState({
      visible: false,
    });
  }
  public render() {
    return (
      <div>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </div>
    );
  }
}

export default Draw;
