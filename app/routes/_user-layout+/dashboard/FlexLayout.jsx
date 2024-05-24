import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Layout, Actions, Model } from 'flexlayout-react';

import { default as flexFactory, iconFactory } from './flexFactory';
import { subscribeToEvPanelAdd, unSubscribeToEvPanelAdd } from '../../../globals';
import { LoadError } from '../../../components/load-in-progress';

import "./style-variables.css"
import "./style-flex-overrides.css";

const onModelChange = () => { };

const addPanel = (ev, layout, layoutModel) => {
  const existingTab = ev.detail.bringToFocus ? layoutModel.getNodeById(ev.detail.id) : null;
  existingTab ?
    layoutModel.doAction(Actions.selectTab(ev.detail.id)) :
    layout.addTabToActiveTabSet(ev.detail);
};

export default ({ layoutModel }) => {
  const { t } = useTranslation();
  const layoutRef = useRef();

  useEffect(() => {
    // subscribe to panel-add request on mount
    const onPanelAdd = ev => addPanel(ev, layoutRef.current, layoutModel);
    subscribeToEvPanelAdd(onPanelAdd);
    // cleanup on unmount
    return () => {
      unSubscribeToEvPanelAdd(onPanelAdd);
    };
  }, []);

  if (!layoutModel) return <LoadError msg={t("messages.error.emptyLayoutModel")} />

  return (
    <Layout
      ref={layoutRef}
      factory={flexFactory}
      iconFactory={iconFactory}
      model={layoutModel}
      onModelChange={onModelChange}
    />
  );
}

export { Model };