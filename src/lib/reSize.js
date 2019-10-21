import React, { Component } from "react";
import _ from 'lodash';

export default function reSize(Wrapped) {
  return class extends Component {
    
    constructor(props){
      super(props);
      this.state = { 
        width: 0, 
        height: 0 
      };
    }

    componentDidMount() {
      this.update();
      window.addEventListener("resize", this.update);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.update);
    }

    update = () => {
      this.setState({ 
        width: window.innerWidth, 
        height: window.innerHeight,
      });
    };

    report(){
      return _.cloneDeep(this.state);
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          reSize={{
            width: this.state.width,
            height: this.state.height,
          }}
        />
      );
    }
  };
}