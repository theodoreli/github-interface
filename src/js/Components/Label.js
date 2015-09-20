import React from 'react';
import './Label.scss!';

export default class Label extends React.Component { //remember that classes are not hoisted (contrary to functions)
    constructor(props) {
        super(props);
        this.state = this.props;
        this.state.labels = this.state.labels || []; // safety, so that later when we call .map it doesnt fart

        let propsLabels = this.props.labels;

        // this if block is for normalization of our labels data --> when we detect that color is an array rather than a value (it could be name or url as well)
        // it is needed currently inside Issues.js as I surmise that passing the labels array through React-router's query (which strigifies it to key value pairs) gives us this strange data structure
        if (Array.isArray(propsLabels) && propsLabels.length > 0 && Array.isArray(propsLabels[0].color)) {
            let labelColor = propsLabels[0].color;
            let labelName = propsLabels[0].name;
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
