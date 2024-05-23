import { Typography } from 'antd';

import './annotate.css';

export default ({ text, copyable = true, className="" }) => (
  <pre className={`rawView ${className}`}>
    <Typography.Text copyable={copyable} className={className}>{text}</Typography.Text>
  </pre>
);
