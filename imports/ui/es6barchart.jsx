import React, {Component} from 'react';
import d3 from 'd3';
import {_} from 'underscore';

class Chart extends Component{
  constructor(props){
    super(props);

  }
  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
}
Chart.defaultProps = {
    width: 0,
    height: 0,
    offset: 0
};
class Bar extends Component{
  render() {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height} 
        x={this.props.offset} y={this.props.availableHeight - this.props.height} />
    );
  }
}
Bar.defaultProps = {
  width: 0,
  height: 0,
  offset: 0
};
class DataSeries extends Component{
  render() {
    let props = this.props;

    let xScale = d3.scale.linear()
                  .range([0, this.props.width]);
    let bars = _.map(this.props, (point, i)=> {
      return (
        <Bar height={props.height} width={xScale(point)} offset={0} availableHeight={props.height} color={props.color} key={i} />
      );
    });

    return (
      <g>{bars}</g>
    );
  }
}
DataSeries.defaultProps = {
  title: '',
  data: []
};
class TotalTimeChart extends Component {
  render(){
    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries data={[ 0.1 ]} width={this.props.width} height={this.props.height} color="green" />
      </Chart>
    );
  }
}
BarChart.defaultProps = {
  width: '100%',
  height: 100
};
export default TotalTimeChart