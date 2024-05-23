import React, { useG2, LoadError, LoadInProgress } from './useG2';
import AnimatedChart from './AnimatedChart';

import styles from './styles.module.css';

class AnimatedBubbleChart extends AnimatedChart {
  constructor(props) {
    super(props);
    this.dataKeys = Object.keys(this.props.data);
    this.dataValues = Object.values(this.props.data);
  }
  onChartInit(chart) {
    const key = this.dataKeys[0];
    chart.data(this.props.data[key]);
    chart.scale(this.props.scale);

    chart.tooltip(this.props.tooltip);
    for (let legend in this.props.legends) chart.legend(legend, this.props.legends[legend]);
    for (let axis in this.props.axes) chart.axis(axis, this.props.axes[axis]);

    const pointProps = this.props.point;
    chart
      .point()
      .position(pointProps.position)
      .color(pointProps.color.key || pointProps.color, pointProps.color.value)
      .size(pointProps.size.key || pointProps.size, pointProps.size.value)
      .shape(pointProps.shape)
      .animate({
        update: {
          duration: 200,
          easing: 'easeLinear',
        },
      })
      .tooltip(pointProps.tooltip)
      .style(pointProps.style);

    chart.annotation().text({
      position: ['50%', '50%'],
      content: key,
      style: {
        fontSize: 200,
        fill: '#999',
        textAlign: 'center',
        fillOpacity: 0.3,
      },
      top: false,
      animate: false,
    });
  }

  animateNextFrame(counter) {
    if (counter >= this.dataKeys.length) return false; // stop the animation

    const key = this.dataKeys[counter];
    this.chart.annotation().clear(true);
    this.chart.annotation().text({
      position: ['50%', '50%'],
      content: key,
      style: {
        fontSize: 200,
        fill: '#999',
        textAlign: 'center',
        fillOpacity: 0.3,
      },
      top: false,
      animate: false,
    });
    this.chart.changeData(this.props.data[key]);

    return true; // more animation pending
  }
}

const DynamicBubbleChart = ({ loadStatus: extLoadStatus, ...props }) => {
  const loadStatus = useG2(extLoadStatus);
  if (loadStatus.state === 'error')
    return <LoadError msg={loadStatus.error} className={styles.g2ChartLoading} />;
  if (loadStatus.state !== 'ready')
    return (
      <LoadInProgress tip="Preparing Dynamic BubbleChart ..." className={styles.g2ChartLoading} />
    );

  return <AnimatedBubbleChart G2={window.G2} {...props} />;
};

export default DynamicBubbleChart;
