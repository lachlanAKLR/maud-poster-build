export default function addLineBreaks(input: any): JSX.Element {
  const text = String(input);
  const parts = text.split(",").filter((part) => part.trim() !== "");

  const elements = parts.flatMap((part, index) =>
    index < parts.length - 1 ? [part.trim(), <br key={index} />] : [part.trim()]
  );

  return <>{elements}</>;
}
