import React from 'react';
// import d3 from 'd3';
import {Component} from 'react';
import ReactDOM from 'react-dom';

class Visitors extends Component {
  render(){
    return(
      <div>
        <h3>Visitors to your site</h3>
        <div className="bottom-right-svg">
          <Linechart/>
        </div>
      </div>
    )
  }
}

class Axis extends Component {
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

class Grid extends Component {
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

class D3TimeAreaChart extends Component {
    constructor(props) {
      super(props);
      this.state = {width: props.width};
    }
    createChart(_self){
    this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
    this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);

    // console.log("this.w", this.w);
    // console.log("this.h", this.h);

    this.xScale = d3.time.scale()
        .domain(d3.extent(this.props.data,(d)=>{
          return d[_self.props.xData];
        }))
        .rangeRound([0, this.w]);

    this.yScale = d3.scale.linear()
        .domain([0,d3.max(this.props.data,(d)=>{
            return d[_self.props.yData]+_self.props.yMaxBuffer;
        })])
        .range([this.h, 0]);

    this.area = d3.svg.area()
        .x((d)=>{return this.xScale(d[_self.props.xData]);})
        .y0(this.h)
        .y1((d)=>{return this.yScale(d[_self.props.yData]);})
        .interpolate(this.props.interpolations);
        let interpolations = [
                "linear",
                "step-before",
                "step-after",
                "basis",
                "basis-closed",
                "cardinal",
                "cardinal-closed"];

    this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
  }
  createElements(element,i){
    this.createChart(this);
    let object;
    let _self=this;

    switch(element.type){

        case 'xGrid':
            object=<Grid h={this.h} len={this.h} scale={this.xScale} gridType="x" key={i} {...this.props} {...element.props}/>;
            break;

        case 'yGrid':
            object=<Grid h={this.h} len={this.w} scale={this.yScale} gridType="y" key={i} {...this.props} {...element.props}/>;
            break;

        case 'xAxis':
            object=<Axis h={this.h} scale={this.xScale} axisType="x" key={i} {...this.props} {...element.props}/>;
            break;

        case 'yAxis':
            object=<Axis h={this.h} scale={this.yScale} axisType="y" key={i} {...this.props} {...element.props}/>;
            break;

        case 'area':

            let data=[];

            for(let k=0,j=0;k<this.props.data.length;++k){
                if(this.props.data[k][_self.props.type]===element.props.value){
                    data[j]=this.props.data[k];
                    // console.log("this.props.data[k][_self.props.type]", this.props.data[k][_self.props.type]);
                    // console.log("element.props.value", element.props.value);
                    // console.log("new data", data);
                    ++j;
                }
            }
            object=<path className={element.props.className} d={this.area(data)} key={i} fill={element.props.fill}/>;
            break;

    }
    return object;
  }
  render(){
    let elements;
    let _self=this;

    if(this.props.children!=null) {
        if (Array.isArray(this.props.children)) {
            elements=this.props.children.map((element,i) => {
                return _self.createElements(element,i)
            });
        }else{
            elements=this.createElements(this.props.children,0)
        }
    }

    return (
        <div>
            <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

                <g transform={this.transform}>
                    {elements}
                </g>
            </svg>
        </div>
    );
  }
}

export default D3TimeAreaChart;
