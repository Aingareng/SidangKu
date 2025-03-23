export function log(
  message: string,
  level: number = 0,
  type: "other" | "component" = "component"
): void {
  let styling: string = "padding: 0.15rem; background: #04406b; color: #fcfabd";

  if (type === "other") {
    styling = "padding: 0.15rem; background: #210957; color: #ede6b2";
  }

  const indent: string = "- ".repeat(level);

  console.log("%c" + indent + message, styling);
}
