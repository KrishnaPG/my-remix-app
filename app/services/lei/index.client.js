import { getAPIRequest } from "./config.client";

/**
 * Suggest search terms
 * @param {String} queryText the string to be auto-completed
 * @param {String} field can be one of ["fulltext", "owns", "ownedBy"]
 */
export function getAutoCompletions(queryText, field = "fulltext") {
  return getAPIRequest(`autocompletions?field=${field}&q=${queryText}`).then(({ data }) => data);
}

/**
 * Suggest search terms
 * @param {String} queryText the string to be fuzzy-searched ("Did You Mean" kind of search)
 * @param {String} field can be one of ["fulltext", "owns", "ownedBy"]
 */
export function getFuzzyCompletions(queryText, field = "entity.legalName") {
  return getAPIRequest(`fuzzycompletions?field=${field}&q=${queryText}`).then(({ data }) => data);
}

export function getSelfRecord(id) {
  return getAPIRequest(`lei-records/${id}`).then(({ data }) => data);
}

export function getParentRecord(id) {
  return getAPIRequest(`lei-records/${id}/direct-parent`).then(({ data }) => data);
}

export function getUltimateParentRecord(id) {
  return getAPIRequest(`lei-records/${id}/ultimate-parent`).then(({ data }) => data);
}

export function getDirectChildren(id) {
  return getAPIRequest(`lei-records/${id}/direct-children`).then(({ data }) => data);
}

export function getUltimateChildren(id) {
  return getAPIRequest(`lei-records/${id}/ultimate-children`).then(({ data }) => data);
}

const FnMap = {
  "self": getSelfRecord,
  "parent": getParentRecord,
  "ultimate-parent": getUltimateParentRecord,
  "children": getDirectChildren,
  "ultimate-children": getUltimateChildren
}
export function getRecord(id, relation) {
  return !relation ? getSelfRecord(id) : FnMap[relation](id);
}

export function getISINs(id) {
  return getAPIRequest(`lei-records/${id}/isins`).then(({ data }) => data);
}