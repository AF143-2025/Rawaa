const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:/Users/amera/.gemini/antigravity/brain/389fb960-4f33-4fb9-9f98-14e0e19f7ff8/.user_uploaded/media_1792435696118_d9731057.png';
const data = fs.readFileSync(inputPath);
const src = PNG.sync.read(data);
const { width, height } = src;

function createTransparentVersion(options = { removeSlogan: false, removeRAWAA: false }) {
  const out = new PNG({ width, height });

  // Sample corner background colors
  const corners = [
    [src.data[0], src.data[1], src.data[2]],
    [src.data[(width - 1) << 2], src.data[((width - 1) << 2) + 1], src.data[((width - 1) << 2) + 2]],
    [src.data[(width * (height - 1)) << 2], src.data[((width * (height - 1)) << 2) + 1], src.data[((width * (height - 1)) << 2) + 2]],
    [src.data[(width * height - 1) << 2], src.data[((width * height - 1) << 2) + 1], src.data[((width * height - 1) << 2) + 2]],
  ];

  for (let y = 0; y < height; y++) {
    const ty = y / (height - 1);
    for (let x = 0; x < width; x++) {
      const tx = x / (width - 1);
      const idx = (width * y + x) << 2;

      // Filter out dark droplet artifact near x=95-122, y=380-394
      if (x >= 94 && x <= 122 && y >= 380 && y <= 395) {
        out.data[idx] = 0;
        out.data[idx + 1] = 0;
        out.data[idx + 2] = 0;
        out.data[idx + 3] = 0;
        continue;
      }

      // If user wants clean logo without slogan (Y >= 450)
      if (options.removeSlogan && y >= 450) {
        out.data[idx] = 0;
        out.data[idx + 1] = 0;
        out.data[idx + 2] = 0;
        out.data[idx + 3] = 0;
        continue;
      }

      // If user wants emblem only (Y >= 400)
      if (options.removeRAWAA && y >= 400) {
        out.data[idx] = 0;
        out.data[idx + 1] = 0;
        out.data[idx + 2] = 0;
        out.data[idx + 3] = 0;
        continue;
      }

      const r = src.data[idx];
      const g = src.data[idx + 1];
      const b = src.data[idx + 2];

      // Estimated background at (x,y)
      const topR = corners[0][0] * (1 - tx) + corners[1][0] * tx;
      const topG = corners[0][1] * (1 - tx) + corners[1][1] * tx;
      const topB = corners[0][2] * (1 - tx) + corners[1][2] * tx;

      const botR = corners[2][0] * (1 - tx) + corners[3][0] * tx;
      const botG = corners[2][1] * (1 - tx) + corners[3][1] * tx;
      const botB = corners[2][2] * (1 - tx) + corners[3][2] * tx;

      const bgR = topR * (1 - ty) + botR * ty;
      const bgG = topG * (1 - ty) + botG * ty;
      const bgB = topB * (1 - ty) + botB * ty;

      const bgMax = Math.max(bgR, bgG, bgB);
      const maxVal = Math.max(r, g, b);

      // Contrast thresholds
      // For text areas (y > 400), background is slightly darker, text is thinner
      let lowThresh = bgMax + 16;
      let highThresh = bgMax + 55;

      if (y > 400) {
        lowThresh = bgMax + 12;
        highThresh = bgMax + 45;
      }

      let alpha = 0;
      if (maxVal > lowThresh) {
        if (maxVal >= highThresh) {
          alpha = 1.0;
        } else {
          const t = (maxVal - lowThresh) / (highThresh - lowThresh);
          alpha = t * t * (3 - 2 * t);
        }
      }

      if (alpha <= 0.02) {
        out.data[idx] = 0;
        out.data[idx + 1] = 0;
        out.data[idx + 2] = 0;
        out.data[idx + 3] = 0;
      } else {
        // Color de-contamination (un-blacking fringe for pure white canvas)
        let fgR = (r - (1 - alpha) * bgR) / alpha;
        let fgG = (g - (1 - alpha) * bgG) / alpha;
        let fgB = (b - (1 - alpha) * bgB) / alpha;

        // Slight contrast & vibrancy curve for white backgrounds
        // If foreground is pure white/cyan chrome, retain brilliance
        fgR = Math.min(255, Math.max(0, fgR));
        fgG = Math.min(255, Math.max(0, fgG));
        fgB = Math.min(255, Math.max(0, fgB));

        out.data[idx] = Math.round(fgR);
        out.data[idx + 1] = Math.round(fgG);
        out.data[idx + 2] = Math.round(fgB);
        out.data[idx + 3] = Math.round(alpha * 255);
      }
    }
  }

  return out;
}

// 1. Full transparent (emblem + RAWAA + slogan)
const fullPNG = createTransparentVersion({ removeSlogan: false, removeRAWAA: false });
fs.writeFileSync('c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_logo_full.png', PNG.sync.write(fullPNG));
fs.writeFileSync('C:/Users/amera/.gemini/antigravity/brain/389fb960-4f33-4fb9-9f98-14e0e19f7ff8/rawaa_exact_logo_full.png', PNG.sync.write(fullPNG));

// 2. Clean transparent (emblem + RAWAA, no bottom slogan)
const cleanPNG = createTransparentVersion({ removeSlogan: true, removeRAWAA: false });
fs.writeFileSync('c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_logo_clean.png', PNG.sync.write(cleanPNG));
fs.writeFileSync('c:/Users/amera/Documents/antigravity/radiant-curie/public/logo.png', PNG.sync.write(cleanPNG));
fs.writeFileSync('C:/Users/amera/.gemini/antigravity/brain/389fb960-4f33-4fb9-9f98-14e0e19f7ff8/rawaa_exact_logo_clean.png', PNG.sync.write(cleanPNG));

// 3. Emblem only (pure calligraphy mark)
const emblemPNG = createTransparentVersion({ removeSlogan: true, removeRAWAA: true });
fs.writeFileSync('c:/Users/amera/Documents/antigravity/radiant-curie/public/brand/rawaa_exact_emblem_only.png', PNG.sync.write(emblemPNG));

console.log('Generated all transparent versions successfully!');
