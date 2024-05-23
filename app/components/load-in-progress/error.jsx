import { Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

export default function LoadError(props) {
  return (
    <div className={styles.centerInParent + " " + props.className}>
      <Typography.Text
        type={props.msgType || 'danger'}
        className={styles.loadErrMsg}
        strong={true}
        copyable={true}
        mark={false}
      >
        {props.icon || <WarningOutlined className={styles.icon} />}
        {props.msg || props.children || 'Failed to load the resource'}
      </Typography.Text>
    </div>
  );
};
