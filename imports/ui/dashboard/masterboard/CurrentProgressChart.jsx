import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import React, {Component} from 'react';
import d3 from 'd3';
import {_} from 'underscore';
import { TimerTime } from '../../../api/TimerTime.js';


class Line extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { path, stroke, fill, strokeWidth } = this.props;
    return (
      <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        />
    );
  }
}
Line.defaultProps = {
  stroke: 'blue',
  fill: 'none',
  strokeWidth: 3
}

class LineDataSeries extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {data, colors, xScale, yScale, interpolationType} = this.props;
    let line = d3.svg.line()
    .interpolate(interpolationType)
    .x((d) => {return xScale(d.x);})
    .y((d) => {return yScale(d.y);});

    let lines = _.map(data.points, (series, id) => {
      console.log(series);
      return (
        <Line
          path={line(series)}
          seriesName={series.name}
          stroke={colors(id)}
          key={id}
        />
      );
    });
    return(
      <g>
        <g>{lines}</g>
      </g>
    );
  }
}
LineDataSeries.defaultProps = {
  interpolationType: 'cardinal',
  colors: d3.scale.category10(),
}

class CurrentProgressChart extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    let {width, height, data} = this.props;

    let xScale = d3.scale.ordinal()
    .domain(data.xValues)
    .rangePoints([0, width]);

    let yScale = d3.scale.linear()
    .range([height, 10])
    .domain([data.yMin, data.yMax]);

    return (
      <svg width={width} height={height}>
        <LineDataSeries
          xScale={xScale}
          yScale={yScale}
          data={this.props.data}
          width={width}
          height={height}
          />
      </svg>
    );
  }
}
CurrentProgressChart.defaultProps = {
  width: '300',
  height: '300',
  data: {
    points: [
      [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
        { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ]
    ],
    xValues: [0,1,2,3,4,5,6],
    yMin: 0,
    yMax: 30
  }
}

export default CurrentProgressChart;
