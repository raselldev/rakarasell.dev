export function generateImage({
  text,
  size = 200,
}: {
  text: string;
  size?: number;
}): string {
  const colors = ["#38bdf8", "#818cf8", "#0ca5e9", "#2dd4bf"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const canvas = document.createElement("canvas");
  canvas.width = size * 3;
  canvas.height = size * 3;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas rendering context not available.");

  // Set background color
  ctx.fillStyle = randomColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text style
  ctx.font = `${size / 2}px Arial`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Generate initials from text
  const initials = text
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  // Draw initials in the center of the canvas
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  // Return image as Base64
  return canvas.toDataURL("image/png");
}
