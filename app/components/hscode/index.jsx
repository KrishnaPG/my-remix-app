import React from "react";
import { useDuckDBQuery } from "../../globals/duckdb.client";
import LoadInProgress, { LoadError } from "../../components/load-in-progress";

// returns the HSCode description from its number
export function useHSCode(hsCode) {
  const retVal = useDuckDBQuery({
    sql: `select * from HSCodesTable where hscode='${hsCode.toString().slice(0, 6)}'`,
    key: "hsCodes",
    config: {
      query: {
        castBigIntToDouble: true,
      },
    },
    initQuery: `CREATE TABLE IF NOT EXISTS HSCodesTable AS SELECT * FROM "https://raw.githubusercontent.com/datasets/harmonized-system/master/data/harmonized-system.csv"`,
  });
  return retVal;
}

function _HSCodeDescription({ hsCode, className }) {
  const { isFetching, result, error } = useHSCode(hsCode);

  if (error) return <LoadError msg={error?.message} />;
  if (isFetching) return <LoadInProgress>Retrieving HSCode Descriptions...</LoadInProgress>;
  if (!result?.numRows) return <div />;
    
  return <div className={className}>{result.get(0).toJSON().description}</div>;
}

export default React.memo(_HSCodeDescription, (prevProps, nextProps) => prevProps.hsCode == nextProps.hsCode);
