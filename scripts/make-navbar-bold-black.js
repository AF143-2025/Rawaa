const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_emblem_only.png';
const outputPath = 'c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_navbar_logo_black_edge.png';

const data = fs.readFileSync(inputPath);
const src = PNG.sync.read(data);
const { width, height } = src;

const out = new PNG({ width, height });

// Bolder stroke radius for smaller navbar display (3.8px)
const strokeRadius = 3.8;
const outlineColor = [0, 0, 0]; // Pure solid black

const alphaMap = new Float32Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    alphaMap[width * y + x] = src.data[((width * y + x) << 2) + 3] / 255.0;
  }
}

const rCeil = Math.ceil(strokeRadius);
const strokeAlpha = new Float32Array(width * height);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const selfA = alphaMap[width * y + x];
    if (selfA >= 0.98) {
      strokeAlpha[width * y + x] = 1.0;
      continue;
    }

    let maxA = selfA;
    for (let dy = -rCeil; dy <= rCeil; dy++) {
      const ny = y + dy;
      if (ny < 0 || ny >= height) continue;
      for (let dx = -rCeil; dx <= rCeil; dx++) {
        const nx = x + dx;
        if (nx < 0 || nx >= width) continue;

        const dist = Math.hypot(dx, dy);
        if (dist <= strokeRadius) {
          const neighborA = alphaMap[width * ny + nx];
          if (neighborA > 0.08) {
            // Strong step falloff for bold crisp edge
            const falloff = dist <= strokeRadius - 1 ? 1.0 : Math.max(0, strokeRadius - dist);
            const val = neighborA * falloff;
            if (val > maxA) maxA = val;
          }
        }
      }
    }
    strokeAlpha[width * y + x] = Math.min(1.0, maxA);
  }
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const fgA = alphaMap[width * y + x];
    const sA = strokeAlpha[width * y + x];

    if (sA <= 0.04) {
      out.data[idx] = 0;
      out.data[idx + 1] = 0;
      out.data[idx + 2] = 0;
      out.data[idx + 3] = 0;
      continue;
    }

    const fgR = src.data[idx];
    const fgG = src.data[idx + 1];
    const fgB = src.data[idx + 2];

    const outA = fgA + sA * (1 - fgA);
    const strokeWeight = sA * (1 - fgA);
    const r = (fgR * fgA + outlineColor[0] * strokeWeight) / outA;
    const g = (fgG * fgA + outlineColor[1] * strokeWeight) / outA;
    const b = (fgB * fgA + outlineColor[2] * strokeWeight) / outA;

    out.data[idx] = Math.round(Math.min(255, Math.max(0, r)));
    out.data[idx + 1] = Math.round(Math.min(255, Math.max(0, g)));
    out.data[idx + 2] = Math.round(Math.min(255, Math.max(0, b)));
    out.data[idx + 3] = Math.round(Math.min(255, Math.max(0, outA * 255)));
  }
}

fs.writeFileSync(outputPath, PNG.sync.write(out));
fs.writeFileSync('C:/Users/amera/.gemini/antigravity/brain/389fb960-4f33-4fb9-9f98-14e0e19f7ff8/rawaa_navbar_logo_black_edge.png', PNG.sync.write(out));
console.log('Bold black navbar logo generated successfully!');
