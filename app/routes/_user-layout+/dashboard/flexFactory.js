/**
 * Copyright © 2020 Cenacle Research India Private Limited.
 * All Rights Reserved.
 */
import React, { Suspense } from 'react';

// preloaded chunk starts loading in parallel with the parent chunk.
// pre-fetch chunk starts loading *after* parent is loaded and when the browser is idle.

const Notifications = React.lazy(() => import(/* webpackChunkName: "fl-notify" */ './Notifications'));
const Properties = React.lazy(() => import(/* webpackChunkName: "fl-props" */ './Properties'));
const Settings = React.lazy(() => import(/* webpackChunkName: "fl-settings" */ './Settings'));

const ControlCenter = React.lazy(() => import(/* webpackChunkName: "fl-control-center" */ './ControlCenter.jsx'));
const FlagResults = React.lazy(() => import(/* webpackChunkName: "fl-flag-result" */ './panels/flag-results/result-list.jsx'));

const LCAddNew = React.lazy(() => import(/* webpackChunkName: "fl-lc-add-new" */ './panels/letter-of-credits/AddNew.jsx'));

const Loader = React.lazy(() => import(/* webpackChunkName: "loader" */ './panels/loader/index.jsx'));

const MedAI = React.lazy(() => import(/* webpackChunkName: "MedAI" */ './panels/medAI/main.jsx'));
const MedAIPatientShow = React.lazy(() => import(/* webpackChunkName: "patient-show" */ './panels/medAI/patients/id.jsx'));
const MedAINewDiagnosis = React.lazy(() => import(/* webpackChunkName: "new-diagnosis" */ './panels/medAI/patients/new_diagnosis.jsx'));

const OrgAddNew = React.lazy(() => import(/* webpackChunkName: "org-add-new" */ './panels/orgs/AddNew.jsx'));
const OrgSearch = React.lazy(() => import(/* webpackChunkName: "org-search" */ "./panels/orgs/search.jsx"));

const PaymentAppList = React.lazy(() => import(/* webpackChunkName: "pay-app-list" */ './panels/payment-applications/list.jsx'));
const PaymentAppShow = React.lazy(() => import(/* webpackChunkName: "pay-app-show" */ './panels/payment-applications/show.jsx'));
const Screening = React.lazy(() => import(/* webpackChunkName: "screening" */ './panels/screening/main.jsx'));

const componentMap = {
  Notifications: () => (
    <Suspense fallback={<div className="LoadingMsg">Loading the Notifications...</div>}>
      <Notifications></Notifications>
    </Suspense>
  ),
  Properties: (flNode) => (
    <Suspense fallback={<div className="LoadingMsg">Loading the Properties...</div>}>
      <Properties {...flNode.getConfig()}></Properties>
    </Suspense>
  ),
  Settings: () => (
    <Suspense fallback={<div className="LoadingMsg">Loading the Settings...</div>}>
      <Settings></Settings>
    </Suspense>
  ),

  ControlCenter: () => (
    <Suspense fallback={<div className="LoadingMsg">Loading the ControlCenter...</div>}>
      <ControlCenter></ControlCenter>
    </Suspense>
  ),
  "Flag.Results": (flNode) => (
    <Suspense fallback={<div className="LoadingMsg">Loading the Flag.Results...</div>}>
      <FlagResults {...flNode.getConfig()}></FlagResults>
    </Suspense>
  ),

  Loader: () => (
    <Suspense fallback={<div className="LoadingMsg">Loading the view: Loader...</div>}>
      <Loader />
    </Suspense>
  ),

  "LC.AddNew": () => (
    <Suspense fallback={<div className="LoadingMsg">Loading the view: LC.AddNew...</div>}>
      <LCAddNew />
    </Suspense>
  ),

  MedAI: () => (
    <Suspense fallback={<div className="LoadingMsg">Loading the view: MedAI...</div>}>
      <MedAI />
    </Suspense>
  ),

  "Org.AddNew": () => (
    <Suspense fallback={<div className="LoadingMsg">Loading the view: Org.AddNew...</div>}>
      <OrgAddNew />
    </Suspense>
  ),
  "Org.Search": () => (
    <Suspense fallback={<div className="LoadingMsg">Loading the view: Org.Search...</div>}>
      <OrgSearch />
    </Suspense>
  ),

  "PaymentApp.List": () => (
    <Suspense
      fallback={<div className="LoadingMsg">Loading the view: PaymentApplications.List...</div>}
    >
      <PaymentAppList />
    </Suspense>
  ),
  "PaymentApp.Show": (flNode) => (
    <Suspense
      fallback={<div className="LoadingMsg">Loading the view: PaymentApplications.Show...</div>}
    >
      <PaymentAppShow {...flNode.getConfig()} />
    </Suspense>
  ),

  Screening: (flNode) => (
    <Suspense fallback={<div className="LoadingMsg">Loading the view: Screening...</div>}>
      <Screening {...flNode.getConfig()} />
    </Suspense>
  ),

  "Patient.Show": (flNode) => (
    <Suspense fallback={<div className="LoadingMsg">Loading the view: Patient.Show...</div>}>
      <MedAIPatientShow {...flNode.getConfig()} />
    </Suspense>
  ),
  "Patient.newDiagnosis": (flNode) => (
    <Suspense fallback={<div className="LoadingMsg">Loading the view: Patient New Case...</div>}>
      <MedAINewDiagnosis {...flNode.getConfig()} />
    </Suspense>
  ),

  test: () => <h2>Hello World!!</h2>,
};

// the flexLayout UI factory
export default function (node) {
  var component = node.getComponent();
  const renderFn = componentMap[component];
  return renderFn ? renderFn(node) : <h2>Missing: {component}</h2>;
}

export function iconFactory(node) {
  return node.getIcon();
}