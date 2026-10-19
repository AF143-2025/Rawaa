const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_logo_clean.png';
const outputPath = 'c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_logo_clean.png';
const outputPathBlack = 'c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_logo_black_edge.png';
const outputPathLogo = 'c:/Users/amera/Documents/antigravity/radiant-curie/public/logo.png';
const artifactPath = 'C:/Users/amera/.gemini/antigravity/brain/389fb960-4f33-4fb9-9f98-14e0e19f7ff8/rawaa_exact_logo_black_edge.png';

const data = fs.readFileSync(inputPath);
const src = PNG.sync.read(data);
const { width, height } = src;

// Create an expanded canvas or same size with black contour
const out = new PNG({ width, height });

// Radius for the black stroke
const strokeRadius = 2.5;
const outlineColor = [5, 10, 20]; // Deep rich obsidian black

// Copy original pixels into an array for fast lookup
const alphaMap = new Float32Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    alphaMap[width * y + x] = src.data[idx + 3] / 255.0;
  }
}

// Compute distance field / max dilation for the stroke
const strokeAlpha = new Float32Array(width * height);
const rCeil = Math.ceil(strokeRadius);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const selfA = alphaMap[width * y + x];
    if (selfA >= 0.95) {
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
          if (neighborA > 0.05) {
            // Falloff factor based on distance
            const falloff = Math.max(0, 1 - (dist / strokeRadius) * 0.5);
            const val = neighborA * falloff;
            if (val > maxA) maxA = val;
          }
        }
      }
    }
    strokeAlpha[width * y + x] = Math.min(1.0, maxA);
  }
}

// Composite: Foreground over Black Stroke
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const fgA = alphaMap[width * y + x];
    const sA = strokeAlpha[width * y + x];

    if (sA <= 0.02) {
      out.data[idx] = 0;
      out.data[idx + 1] = 0;
      out.data[idx + 2] = 0;
      out.data[idx + 3] = 0;
      continue;
    }

    const fgR = src.data[idx];
    const fgG = src.data[idx + 1];
    const fgB = src.data[idx + 2];

    // The stroke provides an underlying dark border
    // Composite: fg over stroke
    // alpha_out = fgA + sA * (1 - fgA)
    const outA = fgA + sA * (1 - fgA);

    // Color = (fgColor * fgA + strokeColor * sA * (1 - fgA)) / outA
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

const buf = PNG.sync.write(out);
fs.writeFileSync(outputPath, buf);
fs.writeFileSync(outputPathBlack, buf);
fs.writeFileSync(outputPathLogo, buf);
fs.writeFileSync(artifactPath, buf);

// Also generate the emblem-only version with black outline
const emblemIn = fs.readFileSync('c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_emblem_only.png');
const srcEmb = PNG.sync.read(emblemIn);
const outEmb = new PNG({ width, height });

const alphaMapEmb = new Float32Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    alphaMapEmb[width * y + x] = srcEmb.data[((width * y + x) << 2) + 3] / 255.0;
  }
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const fgA = alphaMapEmb[width * y + x];

    let maxA = fgA;
    for (let dy = -rCeil; dy <= rCeil; dy++) {
      const ny = y + dy;
      if (ny < 0 || ny >= height) continue;
      for (let dx = -rCeil; dx <= rCeil; dx++) {
        const nx = x + dx;
        if (nx < 0 || nx >= width) continue;
        const dist = Math.hypot(dx, dy);
        if (dist <= strokeRadius) {
          const val = alphaMapEmb[width * ny + nx] * Math.max(0, 1 - (dist / strokeRadius) * 0.5);
          if (val > maxA) maxA = val;
        }
      }
    }

    const sA = Math.min(1.0, maxA);
    if (sA <= 0.02) {
      outEmb.data[idx] = 0;
      outEmb.data[idx + 1] = 0;
      outEmb.data[idx + 2] = 0;
      outEmb.data[idx + 3] = 0;
      continue;
    }

    const fgR = srcEmb.data[idx];
    const fgG = srcEmb.data[idx + 1];
    const fgB = srcEmb.data[idx + 2];

    const outA = fgA + sA * (1 - fgA);
    const strokeWeight = sA * (1 - fgA);
    const r = (fgR * fgA + outlineColor[0] * strokeWeight) / outA;
    const g = (fgG * fgA + outlineColor[1] * strokeWeight) / outA;
    const b = (fgB * fgA + outlineColor[2] * strokeWeight) / outA;

    outEmb.data[idx] = Math.round(Math.min(255, Math.max(0, r)));
    outEmb.data[idx + 1] = Math.round(Math.min(255, Math.max(0, g)));
    outEmb.data[idx + 2] = Math.round(Math.min(255, Math.max(0, b)));
    outEmb.data[idx + 3] = Math.round(Math.min(255, Math.max(0, outA * 255)));
  }
}

fs.writeFileSync('c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_emblem_only.png', PNG.sync.write(outEmb));

console.log('Successfully added crisp black outline to transparent logo!');
