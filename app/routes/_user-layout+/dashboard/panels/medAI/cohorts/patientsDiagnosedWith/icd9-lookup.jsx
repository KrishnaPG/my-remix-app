import React from 'react';
import { Select } from 'antd';
import { useRequest } from 'ahooks';
import { getICD9CodesForDiagnosis } from '../../mimic3';

const ICD9Lookup = ({ initial = [], defaultValue, onChange = () => { } }) => {
  const { data: { results = initial } = {}, loading, run, cancel } = useRequest(
    getICD9CodesForDiagnosis,
    {
      throttleInterval: 500,
      manual: true,
      throwOnError: false,
    },
  );
  return (
    <Select
      allowClear={false}
      showSearch
      placeholder="Start typing the diagnosis"
      defaultValue={defaultValue}
      popupMatchSelectWidth={true}
      filterOption={false}
      onBlur={cancel}
      onChange={onChange}
      onSearch={run}
      options={results}
      loading={loading}
      style={{ minWidth: 300 }}
    ></Select>
  );
};

export default React.memo(ICD9Lookup, (prevProps, nextProps) => true);
