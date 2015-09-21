import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let footerWrapper = {
      marginTop: '30px',
      textAlign: 'center'
    };

    return (
      <div style={footerWrapper}>
        <span style={{fontWeight: '400'}}>Source code & Readme</span> <a href="//github.com/theodoreli/github-interface">github.com/theodoreli/github-interface</a>
      </div>
    )
  }
}
