import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';

class D3Dots extends Component {
  render() {
    const _self = this;

    let data = [];

    if (this.props.removeFirstAndLast) {
      for (let i = 0; i < this.props.data.length; i++) {
        data[i - 1] = this.props.data[i];
      }
    } else {
      data = this.props.data;
    }

    const circles = data.map((d, i) =>
      <circle
        className="dot"
        r={_self.props.r}
        cx={_self.props.x(d[_self.props.xData])}
        cy={_self.props.y(d[_self.props.yData])}
        key={i}
        onMouseOver={_self.props.showToolTip}
        onMouseOut={_self.props.hideToolTip}
        data-key={d3.time.format(_self.props.format)(d[_self.props.xData])}
        data-value={d[_self.props.yData]}
      />
    );

    return <g>{circles}</g>;
  }
}

class D3Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const _self = this;
    this.axis = d3.svg.axis()
      .scale(this.props.scale)
      .orient(this.props.orient)
      .ticks(this.props.ticks);

    if (this.props.tickFormat != null && this.props.axisType === 'x') {
      this.axis.tickFormat(d3.time.format(this.props.tickFormat));
    }

    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis);
  }

  render() {
    const translate = `translate(0, ${this.props.h})`;
    return (
      <g className={this.props.className} transform={this.props.axisType === 'x' ? translate : ''}></g>
    );
  }
}

class D3Grid extends Component {
  componentDidMount() {
    this.renderGrid();
  }

  componentDidUpdate() {
    this.renderGrid();
  }

  renderGrid() {
    this.grid = d3.svg.axis()
      .scale(this.props.scale)
      .orient(this.props.orient)
      .ticks(this.props.ticks)
      .tickSize(-this.props.len, 0, 0)
      .tickFormat('');

    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.grid);
  }

  render() {
    let translate = `translate(0, ${this.props.h})`;
    return(
      <g className={this.props.className} transform={this.props.gridType === 'x' ? translate : ''}></g>
    );
  }
}

class D3ToolTip extends Component {
  render() {
    let visibility = 'hidden';
    let transform = '';
    let x = 0;
    let y = 0;
    const width = 150;
    const height = 70;
    const transformText = `translate(${width / 2},${height / 2 - 5})`;
    let transformArrow = '';

    if (this.props.tooltip.display === true) {
      const position = this.props.tooltip.pos;

      x = position.x;
      y = position.y;
      visibility = 'visible';

      if (y > height) {
        transform = `translate(${x - width / 2}, ${y - height - 20})`;
        transformArrow = `translate(${width / 2 - 20}, ${height - 0.2})`;
      } else if (y < height) {
        transform = `translate(${x - width / 2}, ${Math.round(y) + 20})`;
        transformArrow = `translate(${width / 2 - 20}, 0) rotate(180,20,0)`;
      }
    } else {
      visibility = 'hidden';
    }

    return (
      <g transform={transform}>
          <rect class={this.props.bgStyle} is width={width} height={height} rx="5" ry="5" visibility={visibility} />
          <polygon class={this.props.bgStyle} is points="10,0  30,0  20,10" transform={transformArrow} visibility={visibility} />
          <text is visibility={visibility} transform={transformText}>
            <tspan is x="0" class={this.props.textStyle1} text-anchor="middle">{`${this.props.xValue} : ${this.props.tooltip.data.key}`}</tspan>
            <tspan is x="0" class={this.props.textStyle2} text-anchor="middle" dy="25">{`${this.props.yValue} : ${this.props.tooltip.data.value}`}</tspan>
          </text>
      </g>
    );
  }
}

class D3Gradient extends Component {
  render(){
      return(
          <defs>
              <linearGradient is id={this.props.id} x1="0%" y1="100%" x2="0%" y2="0%" spreadMethod="pad">
                  <stop is offset="10%" stop-color={this.props.color1} stop-opacity={.4}/>
                  <stop is offset="80%" stop-color={this.props.color2} stop-opacity={1}/>
              </linearGradient>
          </defs>
      );
  }
}

class D3TimeLineChart extends Component{
  constructor(props) {
    super(props);
    this.state = {width: props.width, tooltip: {display:false,data:{key:'',value:''}}};
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
  }
  createChart(_self){
      this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
      this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);

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
          .x((d)=>{
              return this.xScale(d[_self.props.xData]);
          })
          .y0(this.h)
          .y1((d)=>{
              return this.yScale(d[_self.props.yData]);
          }).interpolate(this.props.interpolations);

      this.line = d3.svg.line()
          .x((d)=>{
              return this.xScale(d[_self.props.xData]);
          })
          .y((d)=>{
              return this.yScale(d[_self.props.yData]);
          }).interpolate(this.props.interpolations);

      this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
  }

  createElements(element,i){
    let object;
    switch(element.type){
        case 'dots':
            object=(<D3Dots x={this.xScale} y={this.yScale} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}
                {...this.props} {...element.props} key={i}/>);
            break;

        case 'tooltip':
            object=<D3ToolTip tooltip={this.state.tooltip} key={i} {...this.props} {...element.props}/>;
            break;

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

        case 'area':
            object=<path className={element.props.className} d={this.area(this.props.data)} key={i} fill={element.props.fill}/>;
            break;
        case 'path':
            object=<path className={element.props.className} d={this.line(this.props.data)} strokeLinecap={element.props.strokeLinecap} key={i}/>;
            break;

    }
    return object;
  }

  createDefs(element,i){
    let object;
    switch(element.type){
        case 'gradient':
            object=(<D3Gradient id={element.props.id} color1={element.props.color1} color2={element.props.color2}/>);
            break;
    }
    return object;
  }
  showToolTip(e){
      e.target.setAttribute('fill', '#FFFFFF');

      this.setState({tooltip:{
          display:true,
          data: {
              key:e.target.getAttribute('data-key'),
              value:e.target.getAttribute('data-value')
              },
          pos:{
              x:e.target.getAttribute('cx'),
              y:e.target.getAttribute('cy')
          }

          }
      });
  }

  hideToolTip(e){
      e.target.setAttribute('fill', '#7dc7f4');
      this.setState({tooltip:{ display:false,data:{key:'',value:''}}});
  }

  render(){
    this.createChart(this);

    let elements;
    let defs;
    let _self=this;

    if(this.props.children!=null) {
        if (Array.isArray(this.props.children)) {
            elements=this.props.children.map((element,i)=>{

                if(element.type!="defs")
                    return _self.createElements(element,i)
            });

            for(let i=0;i<this.props.children.length;++i){
                if(this.props.children[i].type=="defs"){

                    let config=this.props.children[i].props.children;
                    if(config!=null){
                        if(Array.isArray(config)){
                            defs=config.map((elem,i)=>{
                                return this.createDefs(elem,i)
                            });
                        }else{
                            defs=this.createDefs(config,0);
                        }
                    }

                }
            }

        }else{
            elements=this.createElements(this.props.children,0)
        }
    }

    return (
        <div>
            <svg id={this.props.id} width={this.state.width} height={this.props.height}>
                {defs}
                <g transform={this.transform}>
                    {elements}

                </g>

            </svg>

        </div>
    );
  }
}

export default D3TimeLineChart;
