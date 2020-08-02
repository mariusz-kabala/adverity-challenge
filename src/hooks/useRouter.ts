import { useState, useContext, useEffect, useCallback } from "react";
import { DataContext, SetupContext } from "context";

export enum Steps {
  loadData,
  setupData,
  filters,
}

export const useRouter = () => {
  const [steps, setSteps] = useState<
    {
      name: Steps;
      isEnabled: boolean;
    }[]
  >([
    {
      name: Steps.loadData,
      isEnabled: true,
    },
    {
      name: Steps.setupData,
      isEnabled: false,
    },
    {
      name: Steps.filters,
      isEnabled: false,
    },
  ]);

  const onClick = useCallback(
    (step: Steps) => {      
      const stepToCheck = steps.find((s) => s.name === step);

      if (!stepToCheck || !stepToCheck.isEnabled) {
        return;
      }

      setCurrentStep(step)
    },
    [steps]
  );

  const setup = useContext(SetupContext);
  const { data } = useContext(DataContext);

  const [currentStep, setCurrentStep] = useState<Steps>(Steps.loadData);

  useEffect(() => {
    if (
      data.length > 0 &&
      (!setup.time ||
        !setup.dateFormat ||
        setup.dimensions.length === 0 ||
        setup.metrics.length === 0 ||
        setup.timeRange.length !== 2)
    ) {
      setCurrentStep(Steps.setupData);
    }

    if (
      data.length > 0 &&
      setup.time &&
      setup.dateFormat &&
      setup.dimensions.length > 0 &&
      setup.metrics.length > 0 &&
      setup.timeRange.length === 2
    ) {
      setSteps([
        {
          name: Steps.loadData,
          isEnabled: true,
        },
        {
          name: Steps.setupData,
          isEnabled: true,
        },
        {
          name: Steps.filters,
          isEnabled: true,
        },
      ]);
    }
  }, [setup, data]);

  return {
    steps,
    currentStep,
    onClick,
  };
};
