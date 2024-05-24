import React, { Suspense, useEffect, useState } from 'react';
import Perspective from '../../../../../../../components/finos/main';
import styles from '../styles.module.css';

const getFiltered = (ndx) => Promise.resolve(ndx.allFiltered());

const CFPerspective = (props) => {
  return (
    <Perspective
      clsLoading={styles.cfPerLoading}
      data={{ param: props.ndx, fn: getFiltered, onChange: props.ndx.onChange }}
      schema={{
        hadmId: 'string',
        admissionAge: 'float',
        losHospital: 'float',
        firstHospStay: 'boolean',
        hospitalExpireFlag: 'boolean',
        deathAge: 'float',
        diagnosis: 'string',
        seqNum: 'integer',
        insurance: 'string',
        ethnicity: 'string',
        gender: 'string',
        language: 'string',
        maritalStatus: 'string',
        religion: 'string',
      }}
      viewConfig={{
        plugin: 'datagrid',
        'row-pivots': ['seqNum', 'gender'],
        aggregates: {
          admissionAge: 'median',
          losHospital: 'median',
          firstHospStay: 'dominant',
          hospitalExpireFlag: 'dominant',
          deathAge: 'median',
          diagnosis: 'dominant',
          seqNum: 'count',
          insurance: 'dominant',
          ethnicity: 'dominant',
          gender: 'dominant',
          language: 'dominant',
          maritalStatus: 'dominant',
          religion: 'dominant',
        },
        filter: null,
        sort: null,
      }}
      className={props.className}
    />
  );
};

export default React.memo(CFPerspective, (prevProps, nextProps) => true);
