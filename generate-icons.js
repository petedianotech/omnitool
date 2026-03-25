import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#2563eb'; // Tailwind blue-600
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.2);
  ctx.fill();

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.6}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('O', size/2, size/2 + size * 0.05);

  const buffer = canvas.toBuffer('image/png');
  const dir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, `icon-${size}.png`), buffer);
  console.log(`Generated icon-${size}.png`);
}

generateIcon(192);
generateIcon(512);
generateIcon(180); // apple touch icon
