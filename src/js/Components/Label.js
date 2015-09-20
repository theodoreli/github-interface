import React from 'react';
import './Label.scss!';

export default class Label extends React.Component { //remember that classes are not hoisted (contrary to functions)
    constructor(props) {
        super(props);
        this.state = this.props;
        // this if block is for normalization of our labels data. 
        // it is needed currently inside Issues.js as I surmise that passing the labels array through React-router's query (which strigifies it to key value pairs) gives us this strange data structure

        if (this.props.labels.length > 0 && Array.isArray(this.props.labels[0].color)) {
            let labelColor = this.props.labels[0].color;
            let labelName = this.props.labels[0].name;
            let ret = [];

            // we are essentially zipping up our two arrays
            //    eg. values at position 0 of Arrays Color and Name both would have been an object {color, name} before being 'querified' by React-router
            Array.from(labelColor.keys()).forEach( x => {
                ret.push({
                    color: labelColor[x],
                    name: labelName[x]
                });
            });
            console.log(ret);
            this.state.labels = ret;
        }

    }

    render() {
      var labelBuilder = function(label) {
console.log(label)
        return (
          <span className="label" style={{backgroundColor: '#'+label.color}}>{label.name}</span>
        )
      };
        return (
            <span>{ this.state.labels.map(labelBuilder) }</span>
        )
    }
}
