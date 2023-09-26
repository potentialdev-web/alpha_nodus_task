import React from "react";
import Alert from "react-bootstrap/Alert";

export interface SimpleAlertProps {
  /**
   * The variant of the alert. Can be one of: "primary", "secondary", "success", "danger", "warning", "info", "light", "dark".
   */
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";

  /**
   * The message to display in the alert.
   */
  msg: string;
}

export const SimpleAlert = ({ variant, msg }: SimpleAlertProps) => {
  return <Alert variant={variant}>{msg}</Alert>;
};
