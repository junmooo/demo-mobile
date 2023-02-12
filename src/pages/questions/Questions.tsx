import React, { useEffect, useState } from "react";
import styles from "./demo.module.scss";
import { useIntl } from "react-intl";

interface Iprops {}

const Question = React.memo(function Demo(props: Iprops) {
  const intl = useIntl();

  return <div className={styles.container}>hello</div>;
});

export default Question;
