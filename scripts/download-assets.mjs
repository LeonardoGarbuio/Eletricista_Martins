import { writeFile, mkdir } from 'node:fs/promises';
await mkdir('public/images', { recursive: true });
const assets = {
  architecture: 'photo-1600585154340-be6161a56a0c',
  interior: 'photo-1600210492486-724fe5c67fb0',
  kitchen: 'photo-1600566753086-00f18fb6b3ea',
};
for (const [name, id] of Object.entries(assets)) {
  const response = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${name === 'architecture' ? 1800 : 1000}&q=82`);
  if (!response.ok) throw new Error(`Asset ${name}: ${response.status}`);
  await writeFile(`public/images/${name}.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${name}`);
}
