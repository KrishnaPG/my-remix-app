import React from "react";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chart = null;
    this.counter = 0;
    this.timer = null;
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
    if (this.chart) this.chart.destroy();
    this.onChartDestroy();
  }
  componentDidMount() {
    this.chart = new this.props.G2.Chart({
      container: this.chartRef.current,
      autoFit: true,
      height: this.props.height || 500,
      ...this.props.initOptions,
    });

    // gather the initial data
    this.onChartInit(this.chart);
    // resize once to fit the container
    this.chart.forceFit();
    // render the initial data
    this.chart.render();

    this.timer = setInterval(() => {
      if (this.animateNextFrame(++this.counter) === false) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }, this.props.animOptions?.interval || 1000);
  }

  render() {
    return <div ref={this.chartRef}></div>;
  }

  // override functions for sub-classes
  onChartInit(chart) {}
  animateNextFrame(counter) { return false; }
  onChartDestroy() {}
}
