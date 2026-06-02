// One-off: convert PNG panoramas to JPG q88 AND pad to true 2:1 equirectangular ratio.
// Adds black bars top/bottom so the sphere mapping is geometrically correct.
import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const DIR = 'public/panoramas';

const files = (await readdir(DIR))
  .filter((f) => f.toLowerCase().endsWith('.png'));

if (files.length === 0) {
  console.log('No PNG panoramas found.');
  process.exit(0);
}

console.log(`Converting ${files.length} panoramas → JPG (q88) + 2:1 letterbox\n`);

for (const file of files) {
  const inPath = join(DIR, file);
  const outPath = inPath.replace(/\.png$/i, '.jpg');

  const meta = await sharp(inPath).metadata();
  const W = meta.width;
  const H = meta.height;
  const targetH = Math.round(W / 2);

  const padTotal = targetH - H;
  const padTop = Math.floor(padTotal / 2);
  const padBottom = padTotal - padTop;

  await sharp(inPath)
    .extend({
      top: Math.max(0, padTop),
      bottom: Math.max(0, padBottom),
      left: 0,
      right: 0,
      background: { r: 0, g: 0, b: 0 },
    })
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath);

  const beforeMB = ((await stat(inPath)).size / 1024 / 1024).toFixed(2);
  const afterMB = ((await stat(outPath)).size / 1024 / 1024).toFixed(2);

  console.log(
    `${file.padEnd(20)} ${W}x${H} (${beforeMB} MB)  →  ${file.replace('.png', '.jpg').padEnd(20)} ${W}x${targetH} (${afterMB} MB)`,
  );
}

// Move PNG originals into _originals/ as backup, then they can be deleted later
const backupDir = join(DIR, '_originals');
const { mkdir, rename } = await import('node:fs/promises');
await mkdir(backupDir, { recursive: true });
for (const file of files) {
  await rename(join(DIR, file), join(backupDir, file));
}

console.log(`\n✓ PNG originals moved to ${backupDir}/ as backup.`);
console.log('✓ JPGs are now the active panorama files.');
