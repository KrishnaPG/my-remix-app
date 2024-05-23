import { useState } from "react";
import { useAsyncEffect } from "ahooks";

import * as duckdb from "@duckdb/duckdb-wasm";

const singletonPromise = require("@fict/utils/singleton-promise");

const gDuckDBInstances = new Map(); // Tracks the singleton instances of DuckDB

export class DuckDBClient extends duckdb.AsyncDuckDB {
  cleanup() {
    return this.terminate().finally(() => {
      if (this.key) singletonPromise.reset(this.key, gDuckDBInstances); // remove this instance from the singletons
      this.key = null;
    });
  }

  async execQuery(sql) {
    const retVal = { result: null, error: null };
    const conn = await this.connect().catch((ex) => {
      retVal.error = ex;
    });
    if (conn) {
      await conn
        .query(sql)
        .then((arrow) => {
          retVal.result = arrow;
        })
        .catch((ex) => {
          retVal.error = ex;
        });
      conn.close().catch(this.logger.error); // this is a promise, but we do not wait for its return
    }
    return retVal;
  }

  async execQueries(sqlArray) {
    const retVal = { result: [], error: null };
    const conn = await this.connect().catch((ex) => {
      retVal.error = ex;
    });
    if (conn) {
      for (const sql of sqlArray) {
        const queryResult = { result: null, error: null };
        await conn
          .query(sql)
          .then((arrow) => {
            queryResult.result = arrow;
          })
          .catch((ex) => {
            queryResult.error = ex;
          });
        retVal.result.push(queryResult);
      }
      conn.close().catch(this.logger.error); // this is a promise, but we do not wait for its return
    }
    return retVal;
  }

  static terminateAll() {
    return Promise.all(gDuckDBInstances.map((dbI) => dbI.cleanup()));
  }

  static async _init({ jsBundle, logger, config }) {
    // Select a bundle based on browser checks
    return duckdb
      .selectBundle(jsBundle)
      .then(async (bundle) => {
        const worker_url = URL.createObjectURL(
          new Blob([`importScripts("${bundle.mainWorker}");`], { type: "text/javascript" })
        );

        // Instantiate the asynchronus version of DuckDB-wasm
        const worker = new Worker(worker_url);
        const db = new DuckDBClient(logger, worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
        URL.revokeObjectURL(worker_url);

        return db;
      })
      .then(async (db) => {
        config && (await db.open(config));
        return db;
      });
  }

  static init({
    jsBundle = duckdb.getJsDelivrBundles(),
    logger = new duckdb.ConsoleLogger(),
    key = "default",
    config,
    initQuery
  } = {}) {
    return singletonPromise(
      () =>
        DuckDBClient._init({ jsBundle, logger, config }).then(async (dbI) => {
          dbI.key = key;
          initQuery && await dbI.execQuery(initQuery); // if execQuery() returns any error here, we ignore it
          return dbI;
        }),
      key,
      `DuckDB instance: ${key}`,
      gDuckDBInstances
    );
  }
}

export function getDuckDBInstance(key, config, initQuery) {
  return DuckDBClient.init({ key, config, initQuery });
}

/**
 * Returns a new DuckDBClient instance
 * @param {string} key when the key is same, an already existing DB instance will be returned for that key
 */
export function useDuckDB({ key = "default", config, initQuery } = {}) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [dDBi, setDBi] = useState(null);
  const [error, setError] = useState(null);

  useAsyncEffect(async () => {
    const dbi = await getDuckDBInstance(key, config, initQuery).catch(setError);
    dbi && setDBi(dbi);
    setIsInitializing(false);
  }, []);
  return { dDBi, isInitializing, error };
}

export function useDuckDBQuery({ sql, key = "default", config, initQuery }) {
  const { dDBi, isInitializing, error: initError } = useDuckDB({ key, config, initQuery });
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryError, setQueryError] = useState(null);
  const [result, setResult] = useState(null);

  useAsyncEffect(async () => {
    if (!dDBi || !sql || sql.length <= 0) return;

    setIsQuerying(true);
    const queryFn = Array.isArray(sql) ? "execQueries" : "execQuery";
    await dDBi[queryFn](sql).then(({ result, error }) => (error ? setQueryError(error) : setResult(result)));
    setIsQuerying(false);
  }, [dDBi, sql]);

  return {
    dDBi,
    isInitializing,
    isQuerying,
    isFetching: isInitializing || isQuerying,
    initError,
    queryError,
    error: initError || queryError,
    result,
  };
}

export default DuckDBClient;
