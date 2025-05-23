import React from "react";

interface IProps {
  labelType: "form-control" | "normal-input";
  children: React.ReactNode;
  rightLabel?: string;
  leftLabel?: string;
  bottomLeftLabel?: React.ReactNode;
  [key: string]: unknown;
}

const Label = ({
  leftLabel,
  labelType = "normal-input",
  children,
  rightLabel = "",
  bottomLeftLabel,
  ...other
}: IProps) => {
  const labelTypeClasses =
    labelType === "form-control"
      ? "form-control"
      : "input input-bordered flex items-center gap-2";

  const labelElement = (
    <div className="label">
      {labelType === "form-control" && (
        <span className="label-text">{leftLabel}</span>
      )}
      {rightLabel && <span className="label-text-alt">{rightLabel}</span>}
    </div>
  );

  return (
    <label className={`${labelTypeClasses} `} {...other}>
      {labelElement}
      {children}
      {bottomLeftLabel && bottomLeftLabel}
    </label>
  );
};

export default Label;
