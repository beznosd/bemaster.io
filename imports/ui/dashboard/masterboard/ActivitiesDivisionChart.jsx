import React, { Component } from 'react';
import d3 from 'd3';

class Arc extends Component {
    constructor() {
        super();

        this.arc = d3.svg.arc();
    }

    componentWillMount() {
        this.updateD3(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }

    updateD3(newProps) {
      this.arc.innerRadius(newProps.innerRadius);
      this.arc.outerRadius(newProps.outerRadius);
    }

    render() {
      return (
            <path d={this.arc(this.props.data)}
                  style={{fill: this.props.color}}></path>
        );
    }
}

class LabeledArc extends Arc {
    render() {
        let [labelX, labelY] = this.arc.centroid(this.props.data),
            labelTranslate = `translate(${labelX}, ${labelY})`;

        return (
            <g>
                {super.render()}
            </g>
        );
    }
}

class PieChart extends Component {
  constructor(props) {
      super(props);
      this.pie = d3.layout.pie()
                   .value((d) => d.value);
      this.colors = d3.scale.category10();
  }

    arcGenerator(d, i) {
      return (
            <LabeledArc key={`arc-${i}`}
                        data={d}
                        innerRadius={this.props.innerRadius}
                        outerRadius={this.props.outerRadius}
                        color={this.colors(i)} />
        );
    }

    render() {
      let pie = this.pie(this.props.data),
            translate = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={translate}>
                {pie.map((d, i) => this.arcGenerator(d, i))}
            </g>
        );
    }
}

class ActivitiesDivisionChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div className='row'>
          <div className='col s2'>
            <ul>
              <li><p>First Activity</p></li>
              <li><p>Second Activity</p></li>
            </ul>
          </div>
          <div className='col s10'>
            <svg width={300} height={300}>
              <PieChart
                x={150}
                y={150}
                outerRadius={130}
                innerRadius={80}
                data={this.props.data}
              />
            </svg>
          </div>
        </div>
      );
  }
}
ActivitiesDivisionChart.defaultProps = {
  data: [{value: 500-185, label: 'Code lines'},{value: 185, label: 'Empty lines'}]
}


export default ActivitiesDivisionChart;
