interface IProps {
  isOutline?: boolean;
  colorType?:
    | "badge-neutral"
    | "badge-primary"
    | "badge-secondary"
    | "badge-accent"
    | "badge-ghost"
    | "badge-info"
    | "badge-success"
    | "badge-warning"
    | "badge-error";
  label?: string;
}
export default function Badge({
  colorType = "badge-primary",
  isOutline = false,
  label = "label",
}: IProps) {
  let classNameValue = `badge ${colorType}`;

  if (isOutline) {
    classNameValue += " badge-outline";
  }

  return <div className={classNameValue}>{label}</div>;
}
