// import * as d3 from 'd3';
import moment from 'moment';
import React from 'react';
import {Component} from 'react';
import D3TimeAreaChart from './D3TimeAreaChart.jsx';
import D3TimeLineChart from './D3TimeLineChart.jsx';
import D3DonutChart from './D3DonutChart.jsx';
import D3StackedChart from './D3StackedChart.jsx';

class AwesomeChartsContainer extends Component {
  render(){
    return (
      <div className="col s12">
        <MainRangeSelection/>
        <Cards />
        <MainContainer />
        <SubContainer />
      </div>
    );
  }
}

class Range extends Component {
  render(){
    return(
      <div>
        <span className="range-span">
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill="#e58c72"/>
          </svg>
          <span className="padding-left-5">7 days</span>
        </span>
        <span className="range-span">
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill="#8f8f8f"/>
          </svg>
          <span className="padding-left-5">30 days</span>
        </span>
      </div>
    );
  }
}

class MainRangeSelection extends Component {
  render(){
    return(
      <div className="row range-custom">
        <div className="range-custom-child">
          <Range />
        </div>
      </div>
    );
  }
}


class Cards extends Component {
  render(){
    let color=['#53c79f','#64b0cc','#7a6fca','#ca6f96','#e58c72','#e5c072'];
    let cards = color.map((d,i)=> {
      let style={
        'backgroundColor':d
      };
      return(
        <div className="col s2 custom_padding margin-below-20" key={i}>
          <div className="card" style={style}>
            <div className="card-content">
              <div className="col s6">
                  Visitors
              </div>
              <div className="col s6">
                  70%
              </div>
            </div>
            <hr className="hr-custom"/>
            <div className="col s12">
                3,502
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="row">
        {cards}
      </div>
    );
  }
}

class Panel extends Component {
  render(){
    return(
      <div className="bg">
        {this.props.children}
      </div>
    );
  }
}

class PanelHeader extends Component {
  render(){
    return(
      <div className="panel-header">
        <div className="pull-left panel-title">{this.props.title}</div>
        <div className="pull-right line-height-30">
            {this.props.children}
        </div>
      </div>
    );
  }
}

class MainContainer extends Component {
  render(){
    let color=['#53c79f','#e58c72','#7a6fca','#ca6f96','#64b0cc','#e5c072'];
    let dataPie = [
            { name: 'Maintenance' },
            { name: 'New Development' },
            { name: 'Support'},
            { name: 'ISLA'},
            { name: 'Others'}

        ];

    for(let i=0,j=4;i<5;++i,--j){

        let d=dataPie[j];
        d.count=Math.floor((Math.random() * 50) + 5);
        dataPie[j]=d;
    }

    let dataBar=[
            { month:'Jan', new:20, old:30 },
            { month:'Feb', new:29, old:83 },
            { month:'Mar', new:86, old:75 },
            { month:'Apr', new:13, old:57 },
            { month:'May', new:30, old:23 },
            { month:'Jun', new:50, old:27 }

        ];
    let keys=['new','old'];
    var margin={
      top: 20, right: 30, bottom: 40, left: 50
    };
    for(let i=0,j=5;i<6;++i,--j){

            let d=dataBar[i];
            d.new=Math.floor((Math.random() * 200) + 5);
            d.old=Math.floor((Math.random() * 200) + 5);


            dataBar[i]=d;
        }

    return(
      <div className="row">
        <div className="col m6 custom_padding" >
          <Panel>
            <PanelHeader title="Traffic Source">
              <Range/>
            </PanelHeader>
            <D3DonutChart id="bs_chart" data={dataPie} color={color} height={300} width={500}
                        enable3d={true} innerRadiusRatio={3} padAngle={0} label="name" shadowSize={10} point="count">
              <legend radius={10}></legend>
            </D3DonutChart>
          </Panel>
        </div>
        <div className="col m6 custom_padding" >
          <Panel>
            <PanelHeader title="Traffic Source">
              <Range/>
            </PanelHeader>
            <D3StackedChart data={dataBar} width="600" height="350" margin={margin} xData="month"
                      id="stacked-bar" keys={keys} color={color} twoColorScheme={true}>
              <yGrid orient="left" className="y-grid" ticks={5}/>
              <xAxis orient="bottom" className="axis" ticks={5}/>
              <yAxis orient="left" className="axis" ticks={5}/>
            </D3StackedChart>
          </Panel>
        </div>
      </div>
    );
  }
}

class SubContainer extends Component {
  render(){
    let parseDate = d3.time.format("%m-%d-%Y").parse;

    let data = [];
    // for(let i=0;i<15;++i){
    //
    //     let d={day:moment().subtract(i, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 80) + 50)};
    //     d.date = parseDate(d.day);
    //     data[i]=d;
    // }

    let dataArea=[];
    for(let i=0,j=0;i<15;++i,++j){
      let d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 30) + 5),type:'A'};
          d.date = parseDate(d.day);
          dataArea[i]=d;
          data[i]=d;
    }
    for(let i=15,j=0;i<30;++i,++j){
      let d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 40) + 20),type:'B'};
        d.date = parseDate(d.day);
        dataArea[i]=d;
    }
    for(let i=30,j=0;i<45;++i,++j){
      let d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 50) + 30),type:'C'};
        d.date = parseDate(d.day);
        dataArea[i]=d;
    }
    let margin = {left: 30, right: 30, top: 30, bottom: 30};
    return(
      <div className="row">
        <div className="col m6 custom_padding" >
          <Panel>
            <PanelHeader title="Traffic Source">
              <Range/>
            </PanelHeader>
            <D3TimeAreaChart width="600" height="350" margin={margin} xData="date" data={dataArea} yData="count" type="type"
                 yMaxBuffer={10} id="multi-area-chart" interpolations="cardinal">
                <yGrid orient="left" className="y-grid" ticks={5}/>
                <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                <yAxis orient="left" className="axis" ticks={5}/>
                <area className="area" fill="#ca6f96" value="C"/>
                <area className="area" fill="#53c79f" value="B"/>
                <area className="area" fill="#e58c72" value="A"/>
            </D3TimeAreaChart>
          </Panel>
        </div>
        <div className="col m6 custom_padding" >
          <Panel>
            <PanelHeader title="Traffic Source">
              <Range/>
            </PanelHeader>
            <D3TimeLineChart width="600" height="350" data={data} xData="date" yData="count" margin={margin}
                 yMaxBuffer={10} id="line-chart">
                <defs>
                    <gradient color1="#fff" color2="#53c79f" id="area"/>
                </defs>
                {/*<xGrid orient="bottom" className="y-grid" ticks={4}/>*/}
                <yGrid orient="left" className="y-grid" ticks={5}/>
                <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                <yAxis orient="left" className="axis" ticks={5}/>
                <area className="area" fill="url(#area)"/>
                <path className="line shadow" strokeLinecap="round"/>
                <dots r="5" format="%b %e" removeFirstAndLast={false}/>
                <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Date" yValue="Count"/>
            </D3TimeLineChart>
          </Panel>
        </div>
      </div>
    );
  }
}

export default AwesomeChartsContainer;
