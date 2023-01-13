

/* 
성능 최적화 방법 2 퓨어 컴포넌트 
아래 방법 1에 구현된 shouldComponentUpdate가 자동으로 구현된다
import React, { PureComponent } from 'react';

class Test extends PureComponent {
  state = {
    counter: 0,
  };

  onClick = () => {
    this.setState({});
  };
  render() {
    console.log('랜더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

*/


/* 

성능 최적화 방법 1

import React, { Component } from 'react';

class Test extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
	if(this.state.counter !== nextState.counter){
		return true;
	}
	return false;
  } // 스테이트가 바뀌지않아도 렌더링되는걸 막아줌 

  onClick = () => {
    this.setState({});
  };
  render() {
    console.log('랜더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

*/
export default Test;