import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import d3 from 'd3';
import { _ } from 'underscore';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      offset: 0
    };
  }
  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
}

class Bar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <rect
        fill={this.props.color}
        width={this.props.width}
        height={this.props.height}
        x={this.props.offset}
        y={this.props.availableHeight - this.props.height}
      />
    );
  }
}

class BarDataSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  render() {
    const props = this.props;
    // console.log(this.props.data);

    const xScale = d3.scale.linear()
                  .range([0, this.props.width]);
    const bars = _.map(this.props.data, (point, i) => 
      <Bar 
        height={props.height}
        width={xScale(point)}
        offset={0}
        availableHeight={props.height}
        color={props.color}
        key={i}
      />
    );

    return <g>{bars}</g>;
  }
}

class TotalTimeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '100%',
      height: 60,
      data: (((this.props.timerTime[0].seconds * 1000) + (this.props.timerTime[0].minutes * 60 * 1000)) / (20 * 60 * 1000))
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // let compileTotalTime = ((((nextProps.timerTime[0].seconds * 60)*60)+((nextProps.timerTime[0].minutes)*60)+(nextProps.timerTime[0].seconds))/(((nextProps.timerTime[0].seconds * 10)*60)*60));
    const compileTotalTime = (((nextProps.timerTime[0].seconds * 1000) + (nextProps.timerTime[0].minutes * 60 * 1000)) / (20 * 60 * 1000));
    this.setState({ data: compileTotalTime });
  }

  render() {
    console.log(this.state.data);
    return (
      <Chart width={this.state.width} height={this.state.height}>
        <BarDataSeries data={[this.state.data]} width={this.state.width} height={this.state.height} color="green" />
      </Chart>
    );
  }
}

export default TotalTimeChart;
