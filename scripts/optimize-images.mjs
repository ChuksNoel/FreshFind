// Original artwork is retained. Run with the bundled runtime's sharp package.
import { createRequire } from 'node:module';
import { mkdir, stat } from 'node:fs/promises';
const require = createRequire(process.env.FRESHFIND_RUNTIME_PACKAGE);
const sharp = require('sharp');
await mkdir('public/images/optimized', { recursive: true });
const jobs = [
  ['src/assets/Images/LandingTree/Treetop.webp', 'canopy', [640, 1120]],
  ['src/assets/Images/LandingTree/stump2.webp', 'roots', [760]],
  ['src/assets/Images/LandingTree/bark2.webp', 'bark', [216]],
  ...['lagos-market-hero', 'lagos-market-stall', 'seasonal-produce'].map(name => [`public/images/${name}.webp`, name, [160, 480, 960]]),
  ...['bananas', 'carrots', 'cucumber', 'pepper', 'spinach', 'tomatoes', 'watermelon', 'yam'].map(name => [`public/images/produce/${name}.webp`, name, [320, 400]]),
];
for (const [input, name, widths] of jobs) {
  for (const width of widths) {
    const output = `public/images/optimized/${name}-${width}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: name === 'canopy' ? 58 : 76, alphaQuality: 75, effort: 6 }).toFile(output);
    console.log(`${output}: ${Math.round((await stat(output)).size / 1024)} KB`);
    if (name === 'canopy' || name === 'seasonal-produce') {
      const avif = output.replace('.webp', '.avif');
      await sharp(input).resize({ width, withoutEnlargement: true }).avif({ quality: 48, effort: 6 }).toFile(avif);
      console.log(`${avif}: ${Math.round((await stat(avif)).size / 1024)} KB`);
    }
  }
}
