import React, { Component } from "react";
import ContentProps from './Props';

class Content extends Component {

  static propTypes = ContentProps;

  render() {

    const probably_url = (typeof this.props.show === 'string');

    const rendered = ( 
      <React.Fragment>
        {(probably_url) ? (
          <iframe title={this.props.title} style={{
            width: '100%',
            height: '100%',
            border: 0,
          }} src={this.props.show} />
        ) : (
          <div>{this.props.show}</div>
        )} 
      </React.Fragment>
    );

    return rendered;
  }
}

export default Content;