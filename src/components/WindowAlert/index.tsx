import React, { FC } from "react";
import styles from "./Alert.module.scss";

interface AlertProps {
  title: string;
  color: string;
}

export const WindowAlert: FC<AlertProps> = ({ title, color }) => {
  return (
    <div className={styles.alert} style={{ background: color }}>
      <p>{title}</p>
    </div>
  );
};
