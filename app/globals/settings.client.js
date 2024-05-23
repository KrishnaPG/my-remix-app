/**
 * Copyright © 2020 Cenacle Research India Private Limited.
 * All Rights Reserved.
 */
const settings = window.gSettings;

export function getNotificationLogLimit() {
	return settings.Notifications.maxQLength.value;
}

export function getServerBaseURL() {
  return settings.server.URLs.base;
}

export function getAPIURL(apiRoute) {
  return getServerBaseURL() + settings.server.URLs[apiRoute];
}

export function getCASDoorConfig() {
  return settings.casdoor;
}

export function getStorageKeys() {
  return settings.storageKeys;
}

export function getExternalUrl(key) {
  return settings.external.URLs[key];
}

export function getUIOptions() {
  return settings.ui.options;
}

export function getBGImage(index) {
  const bgSettings = settings.ui.background;
  return getUIOptions().noBGImage ? bgSettings.default : bgSettings.images[index % bgSettings.images.length];
}

export default settings;