import React from 'react';
import './Label.scss!';

//remember that classes are not hoisted (contrary to functions)
export default class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.state.labels = this.state.labels || [];
    let propsLabels = this.props.labels;

    if (Array.isArray(propsLabels) && propsLabels.length > 0 && Array.isArray(propsLabels[0].color)) {
        let labelColor = propsLabels[0].color;
        let labelName = propsLabels[0].name;
        let labelArray = [];

        Array.from(labelColor.keys()).forEach( x => {
            labelArray.push({
                color: labelColor[x],
                name: labelName[x]
            });
        });

        this.state.labels = labelArray;
    }
  } // constructor

  render() {
    var labelBuilder = function(label) {
      return (
        <span className="label" style={{backgroundColor: '#'+label.color}}>
          {label.name}
        </span>
      )
    };

    return (
      <span>{this.state.labels.map(labelBuilder)}</span>
    )
  }
}
