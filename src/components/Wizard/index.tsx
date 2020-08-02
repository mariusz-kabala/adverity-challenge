/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback } from "react";
import cx from "classnames";
import { useRouter, Steps } from "hooks";
import { DataSource } from "components/DataSource";
import { Setup } from "components/Setup";
import { Filters } from "components/Filters";
import styles from "./styles.module.scss";

export const Wizard: FC = () => {
  const { steps, currentStep, onClick } = useRouter();
  const goToFilters = useCallback(() => {
    onClick(Steps.filters);
  }, [onClick]);
  return (
    <div className={styles.wrapper}>
      {steps
        .filter((step) => step.name === currentStep)
        .map((step) => {
          switch (step.name) {
            case Steps.loadData:
              return <DataSource key={`step-${step.name}`} />;

            case Steps.setupData:
              return <Setup goNext={goToFilters} key={`step-${step.name}`} />;

            case Steps.filters:
              return <Filters key={`step-${step.name}`} />;

            default:
              return <div key={`step-${step.name}`} />;
          }
        })}
      <ul className={styles.navigation}>
        {steps.map((step) => (
          <li
            className={cx({
              [styles.disabled]: !step.isEnabled,
              [styles.current]: step.name === currentStep,
            })}
            key={`nav-${step.name}`}
          >
            <a onClick={() => onClick(step.name)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
