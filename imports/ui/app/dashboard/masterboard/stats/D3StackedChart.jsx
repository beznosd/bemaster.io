import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

class D3Axis extends Component {
  componentDidUpdate(){
    this.renderAxis();
  }
  componentDidMount(){
    this.renderAxis();
  }
  renderAxis(){
    let _self = this;
    this.axis = d3.svg.axis().scale(this.props.scale).orient(this.props.orient).ticks(this.props.ticks);
    if(this.props.tickFormat!=null && this.props.axisType==='x'){
      this.axis.tickFormat(d3.time.format(this.props.tickFormat));
    }

    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis);
  }
  render(){
    let translate = "translate(0,"+(this.props.h)+")";
    return (
      <g className={this.props.className} transform={this.props.axisType=='x'?translate:""} >
      </g>
    );
  }
}

class D3Grid extends Component {
  componentDidUpdate(){
    this.renderGrid();
  }
  componentDidMount(){
    this.renderGrid();
  }
  renderGrid(){
    this.grid = d3.svg.axis().scale(this.props.scale).orient(this.props.orient).ticks(this.props.ticks).tickSize(-this.props.len, 0, 0).tickFormat("");
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.grid);
  }
  render(){
    let translate = "translate(0,"+(this.props.h)+")";
    return(
      <g className={this.props.className} transform={this.props.gridType=='x'?translate:""}>
      </g>
    );
  }
}

class D3StackedChart extends Component{
  createChart(_self){
    if(this.props.color.length>0){
        this.color=d3.scale.ordinal()
            .range(this.props.color);
    }else{
        this.color=d3.scale.category20();
    }

    this.w = this.props.width - (this.props.margin.left + this.props.margin.right);
    this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);

    this.stacked = d3.layout.stack()(_self.props.keys.map((key,i)=>{
        return _self.props.data.map((d,j)=>{
            return {x: d[_self.props.xData], y: d[key] };
        })
    }));

    this.xScale = d3.scale.ordinal()
        .rangeRoundBands([0, this.w], .35)
        .domain(this.stacked[0].map((d)=>{ return d.x; }));

    this.yScale = d3.scale.linear()
        .range([this.h, 0])
        .domain([0, d3.max(this.stacked[this.stacked.length - 1],(d)=>{ return d.y0 + d.y; })])
        .nice();

    this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
  }

  createElements(element,i){
    let object;
    let _self=this;

    switch(element.type){
      case 'xGrid':
        object=<D3Grid h={this.h} len={this.h} scale={this.xScale} gridType="x" key={i} {...this.props} {...element.props}/>;
        break;

      case 'yGrid':
        object=<D3Grid h={this.h} len={this.w} scale={this.yScale} gridType="y" key={i} {...this.props} {...element.props}/>;
        break;

      case 'xAxis':
        object=<D3Axis h={this.h} scale={this.xScale} axisType="x" key={i} {...this.props} {...element.props}/>;
        break;

      case 'yAxis':
        object=<D3Axis h={this.h} scale={this.yScale} axisType="y" key={i} {...this.props} {...element.props}/>;
        break;
    }
    return object;
  }

  render(){
    this.createChart(this);

    let elements;
    let _self=this;

    if(this.props.children!=null) {
        if (Array.isArray(this.props.children)) {
            elements=this.props.children.map(function(element,i){
                return _self.createElements(element,i)
            });
        }else{
            elements=this.createElements(this.props.children,0)
        }
    }

    let bars=_self.stacked.map((data,i)=>{

      let rects=data.map((d,j)=>{

        let fill="";

          if(_self.props.twoColorScheme) {
            fill = _self.color(j);
            if (i > 0) {
              fill = "#e8e8e9";
            }
          }

        return (<rect x={_self.xScale(d.x)}  y={_self.yScale(d.y + d.y0)} fill={fill}
                      height={_self.yScale(d.y0) - _self.yScale(d.y + d.y0)} width={_self.xScale.rangeBand()} key={j}></rect>
        );

      });

      let fill;
      if(!_self.props.twoColorScheme){
        fill=_self.color(i);
      }

      return (<g key={i} fill={fill}>
          {rects}
        </g>
      );
    });

    return (
      <div>
        <svg id={this.props.chartId} width={this.props.width} height={this.props.height}>
          <g transform={this.transform}>
            {elements}
            {bars}
          </g>
        </svg>
      </div>
    );
  }
}

export default D3StackedChart;
