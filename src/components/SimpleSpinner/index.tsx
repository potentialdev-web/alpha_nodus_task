import React from "react";
import Spinner from "react-bootstrap/Spinner";

export interface SimpleSpinnerProps {
  /**
   * The type fo the animation effect. Can be one of "border", "grow", undefined
   */
  animation: "border" | "grow" | undefined;
}

export const SimpleSpinner = ({ animation }: SimpleSpinnerProps) => {
  return <Spinner animation={animation} />;
};
