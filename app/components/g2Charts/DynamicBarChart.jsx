import React, { useG2, LoadError, LoadInProgress } from './useG2';
import AnimatedChart from './AnimatedChart';

import styles from './styles.module.css';

class AnimatedBarChart extends AnimatedChart {
  constructor(props) {
    super(props);
    this.dataKeys = Object.keys(this.props.data);
    this.dataValues = Object.values(this.props.data).map((source) =>
      source.sort((a, b) => a[this.props.interval.label] - b[this.props.interval.label]),
    );
  }
  onChartInit() {
    this.chart.data(this.dataValues[0]);
    this.chart.scale(this.props.scale);
    this.chart.coordinate('rect').transpose();
    this.chart.tooltip(this.props.tooltip);
    for (let legend in this.props.legends) this.chart.legend(legend, this.props.legends[legend]);
    for (let axis in this.props.axes)
      this.chart.axis(axis, {
        animateOption: {
          update: {
            duration: 1000,
            easing: 'easeLinear',
          },
        },
        ...this.props.axes[axis],
      });

    this.chart.annotation().text({
      position: ['95%', '90%'],
      content: this.dataKeys[this.counter],
      style: {
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#ddd',
        textAlign: 'end',
      },
      animate: false,
    });
    this.chart
      .interval({ sortable: false })
      .position(this.props.interval.position)
      .color(this.props.interval.color.key, this.props.interval.color.value)
      .label(this.props.interval.label, (value) => {
        // if (value !== 0) {
        return {
          animate: {
            appear: {
              animation: 'label-appear',
              delay: 0,
              duration: 1000,
              easing: 'easeLinear',
            },
            update: {
              animation: 'label-update',
              duration: 1000,
              easing: 'easeLinear',
            },
          },
          offset: 5,
        };
        // }
      })
      .animate({
        appear: {
          duration: 1000,
          easing: 'easeLinear',
        },
        update: {
          duration: 1000,
          easing: 'easeLinear',
        },
      })
      .tooltip(this.props.interval.tooltip);
  }

  animateNextFrame(counter) {
    if (counter >= this.dataKeys.length) return false; // stop the animation

    this.chart.annotation().clear(true);
    this.chart.annotation().text({
      position: ['95%', '90%'],
      content: this.dataKeys[counter],
      style: {
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#ddd',
        textAlign: 'end',
      },
      animate: false,
    });

    this.chart.changeData(this.dataValues[counter]);

    return true; // more animation pending
  }
}

const DynamicBarChart = ({ loadStatus: extLoadStatus, ...props }) => {
  const loadStatus = useG2(extLoadStatus);
  if (loadStatus.state === 'error')
    return <LoadError msg={loadStatus.error} className={styles.g2ChartLoading} />;
  if (loadStatus.state !== 'ready')
    return (
      <LoadInProgress tip="Preparing Dynamic BarChart ..." className={styles.g2ChartLoading} />
    );

  return <AnimatedBarChart G2={window.G2} {...props} />;
};

export default DynamicBarChart;
