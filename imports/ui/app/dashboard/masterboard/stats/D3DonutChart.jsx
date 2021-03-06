import React, { Component } from 'react';

class DonutChartShadow extends Component {
  componentWillMount() {
    const radius = this.props.height;

    const outerRadius = radius / this.props.innerRadiusRatio + 1;
    const innerRadius = outerRadius - this.props.shadowSize;

    this.arc = d3.svg.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    this.transform = `translate(${radius / 2}, ${radius / 2})`;
  }

  createChart(_self) {
    const paths = (this.props.pie(this.props.data)).map((d, i) => {

      let c = d3.hsl(_self.props.color(i));
      c = d3.hsl((c.h + 5), (c.s - 0.07), (c.l - 0.10));

      return (
        <path fill={c} d={_self.arc(d)} key={i}></path>
      );
    });
    return paths;
  }

  render() {
    let paths = this.createChart(this);

    return (
      <g transform={this.transform}>
        {paths}
      </g>
    );
  }
}

class DonutChartPath extends Component {
  componentWillMount() {
    const radius = this.props.height;

    const outerRadius = radius / 2;
    const innerRadius = radius / this.props.innerRadiusRatio;

    this.arc = d3.svg.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    this.transform = `translate(${radius / 2}, ${radius / 2})`;
  }

  createChart(_self) {
    const paths = (this.props.pie(this.props.data)).map((d, i) => {
      return (
        <path fill={_self.props.color(i)} d={_self.arc(d)} key={i}></path>
      );
    });
    return paths;
  }

  render() {
    const paths = this.createChart(this);

    return (
      <g transform={this.transform}>
        {paths}
      </g>
    );
  }
}

class DonutChartLegend extends Component{
  createChart(_self) {
    const texts = (this.props.pie(this.props.data)).map((d, i) => {
      const transform = `translate(10, ${i + 30})`;

      const rectStyle = {
        fill: _self.props.color(i),
        stroke: _self.props.color(i)
      };

      const textStyle = {
        fill: _self.props.color(i)
      };

      return (
        <g transform={transform} key={i}>
          <rect width="20" height="20" style={rectStyle} rx={_self.props.radius} ry={_self.props.radius}></rect>
          <text x="30" y="15" className="browser-legend" style={textStyle}>{d.data[_self.props.label]}</text>
        </g>
      );
    });
    return texts;
  }

  render() {
    const style = {
      visibility: 'visible'
    };

    if (this.props.width <= this.props.height + 70) {
      style.visibility = 'hidden';
    }

    const texts = this.createChart(this);
    const legendY = this.props.height / 2 - this.props.data.length * 30 / 2;

    const transform = `translate(${this.props.width / 2 + 80}, ${legendY})`;

    return (
      <g is transform={transform} style={style}>
        {texts}
      </g>
    );
  }
}

class D3DonutChart extends Component {
  componentWillMount() {
    const _self = this;

    this.pie = d3.layout.pie()
        .value(d => d[_self.props.point])
        .padAngle(this.props.padAngle)
        .sort(null);

    this.color = d3.scale.ordinal()
        .range(this.props.color);

    this.setState({ width: this.props.width });
  }

  render() {
    let shadow;
    if (this.props.enable3d) {
      shadow = (
        <DonutChartShadow
          width={this.state.width}
          height={this.props.height}
          innerRadiusRatio={this.props.innerRadiusRatio}
          pie={this.pie} color={this.color} data={this.props.data}
          shadowSize={this.props.shadowSize}
        />
      );
    }

    let legend;

    if (this.props.children != null) {
      if (!Array.isArray(this.props.children)) {
        if (this.props.children.type === 'legend') {
          legend = (
            <DonutChartLegend
              pie={this.pie}
              color={this.color}
              data={this.props.data}
              width={this.state.width}
              height={this.props.height}
              label={this.props.label}
              radius={this.props.children.props.radius} 
            />
          );
        }
      }
    }

    return (
      <div>
        <svg id={this.props.id} width={this.state.width} height={this.props.height}>
          {shadow}
          <DonutChartPath 
            width={this.state.width}
            height={this.props.height}
            innerRadiusRatio={this.props.innerRadiusRatio}
            pie={this.pie}
            color={this.color}
            data={this.props.data}
          >
          </DonutChartPath>
          {legend}
        </svg>
      </div>
    );
  }
}

export default D3DonutChart;
