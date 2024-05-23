import React from 'react';
import { usePerspective, LoadError, LoadInProgress } from './usePerspective';
import { getExternalUrl } from '../../globals/settings.client';

// import '@finos/perspective-viewer/src/themes/material.dark.less';
import styles from './styles.module.css';

class Perspective extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isInitializing: true };
    // perspective viewer and table references
    this.pspViewerRef = React.createRef();
    this.pspTable = null;
    this.pspViewConfig = this.props.viewConfig;
    this.disposeOnChangeHandler = null;
  }

  componentDidMount() {
    // we need this to avoid the rendering issue when tab is hidden
    //subscribeToEvTabSwitch(this.onEvTabSwitch);

    // create a table with schema first, then update it with the data from props, then bind it to the view
    this.pspTable = this.props.Worker.table(this.props.schema);
    this.updateTableData()
      .then(() => this.pspViewerRef.current.restore(this.pspViewConfig))
      .then(() => this.pspViewerRef.current.load(this.pspTable))
      .then(() => {
        /*
        this.pspViewerRef.current.addEventListener('perspective-click', this.onViewerClick);
        this.pspViewerRef.current.addEventListener(
          'perspective-update-complete',
          this.onViewerUpdated,
        );*/
        this.setState({ isInitializing: false });
      });
    // whenever the data changes, update our table (which will automatically update the view)
    // useful to reflect the crossFilter data updates
    if (this.props.data.onChange)
      this.disposeOnChangeHandler = this.props.data.onChange((eventType) => this.updateTableData());
  }

  updateTableData() {
    if (this.props.data?.fn)
      return this.props.data.fn(this.props.data.param).then((data) => this.pspTable.replace(data));
    return this.pspTable.replace(this.props.data);
  }

  componentWillUnmount() {
    //unSubscribeToEvTabSwitch(this.onEvTabSwitch);
    if (this.disposeOnChangeHandler) {
      this.disposeOnChangeHandler();
      this.disposeOnChangeHandler = null;
    }
    if (this.pspViewerRef.current) {
      this.pspViewerRef.current.delete();
      this.pspViewerRef.current = null;
    }
    if (this.pspTable) {
      this.pspTable.delete();
      this.pspTable = null;
    }
  }

  render() {
    return (
      <>
        {this.state.isInitializing && (
          <LoadInProgress
            tip="Loading data..."
            className={this.props.className + ' ' + styles.overlay9}
          />
        )}
        <perspective-viewer
          ref={this.pspViewerRef}
          class={this.props.className + ' perspective-viewer-material-dark'}
        />
      </>
    );
  }

  // this event is triggered by the perspective viewer on click
  onViewerClick = (ev) => {
    console.log('clicked: ', ev);
    // TODO: this event is not yet implemented in the Perspective !!
  };

  // this event is triggered by the perspective viewer on update complete
  // Ref: https://perspective.finos.org/docs/md/js.html#update-events
  onViewerUpdated = (ev) => {
    console.log('onViewerUpdated: ', ev);
  };

  // This event is triggered by the App when the 'loading', 'staging', 'live' tabs are switched
  onEvTabSwitch = (ev) => {
    // if this tab / DOM node became visible, trigger redraw to
    // ensure the perspective is correctly drawn
    if (ev.detail.tabName === 'liveData') {
      if (this.pspViewerRef.current) this.pspViewerRef.current.notifyResize(true);
    }
  };
}

export default React.memo(
  ({ clsLoading, msgLoading = "Preparing Explorer...", ...props }) => {
    const loadStatus = usePerspective(
      getExternalUrl("finosPerspScript"),
      getExternalUrl("finosViewerScript"),
      getExternalUrl("finsoPlugins"),
    );
    if (loadStatus.state === 'error')
      return <LoadError msg={loadStatus.error} className={clsLoading} />;
    if (loadStatus.state !== 'ready')
      return <LoadInProgress tip={msgLoading} className={clsLoading} />;

    return <Perspective Worker={loadStatus.sharedWorker} {...props} />;
  },
  () => true,
);
