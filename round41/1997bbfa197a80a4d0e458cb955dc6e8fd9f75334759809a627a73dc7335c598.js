export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "marbled_sphere";

  function clampByte(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }

  function smoothstep(edge0, edge1, value) {
    const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  function mix(a, b, t) {
    return a + (b - a) * t;
  }

  function hash3(ix, iy, iz) {
    let h = Math.imul(ix, 374761393);
    h = (h + Math.imul(iy, 668265263) + Math.imul(iz, 1442695041)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967295;
  }

  function smoothValueNoise(x, y, z, cells) {
    const gx = Math.floor(x * cells);
    const gy = Math.floor(y * cells);
    const gz = Math.floor(z * cells);
    const fx = x * cells - gx;
    const fy = y * cells - gy;
    const fz = z * cells - gz;

    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const sz = fz * fz * (3 - 2 * fz);

    const c000 = hash3(gx, gy, gz);
    const c100 = hash3(gx + 1, gy, gz);
    const c010 = hash3(gx, gy + 1, gz);
    const c110 = hash3(gx + 1, gy + 1, gz);
    const c001 = hash3(gx, gy, gz + 1);
    const c101 = hash3(gx + 1, gy, gz + 1);
    const c011 = hash3(gx, gy + 1, gz + 1);
    const c111 = hash3(gx + 1, gy + 1, gz + 1);

    const x00 = mix(c000, c100, sx);
    const x10 = mix(c010, c110, sx);
    const x01 = mix(c001, c101, sx);
    const x11 = mix(c011, c111, sx);
    const y0 = mix(x00, x10, sy);
    const y1 = mix(x01, x11, sy);
    return mix(y0, y1, sz);
  }

  function fractalField(x, y, z, cells, octaves) {
    let sum = 0;
    let weight = 0.55;
    let totalWeight = 0;

    for (let octave = 0; octave < octaves; octave++) {
      sum += smoothValueNoise(
        x * cells + octave * 17.23,
        y * cells - octave * 11.71,
        z * cells + octave * 7.49,
        1
      ) * weight;
      totalWeight += weight;
      cells *= 2.03;
      weight *= 0.5;
    }

    return sum / totalWeight;
  }

  const textureW = 256;
  const textureH = 128;
  const textureData = new Uint8Array(textureW * textureH * 4);

  for (let py = 0; py < textureH; py++) {
    const v = (py + 0.5) / textureH;
    const latitude = (v - 0.5) * Math.PI;
    const sphereY = Math.sin(latitude);
    const latitudeRadius = Math.cos(latitude);

    for (let px = 0; px < textureW; px++) {
      const u = (px + 0.5) / textureW;
      const longitude = u * Math.PI * 2;
      const sphereX = Math.cos(longitude) * latitudeRadius;
      const sphereZ = Math.sin(longitude) * latitudeRadius;

      const broad = fractalField(sphereX, sphereY, sphereZ, 2.4, 4);
      const cloud = fractalField(sphereX + 0.83, sphereY - 0.41, sphereZ + 1.17, 4.8, 4);
      const detail = fractalField(sphereX - 0.36, sphereY + 0.68, sphereZ - 0.22, 10.5, 3);
      const wisp = fractalField(sphereX + 1.41, sphereY + 0.19, sphereZ - 0.77, 18, 2);

      const patchLevel = smoothstep(0.48, 0.73, cloud + (broad - 0.5) * 0.14);
      const veilLevel = smoothstep(0.57, 0.78, wisp + detail * 0.18);
      const inclusionLevel = smoothstep(0.70, 0.87, detail * 0.72 + wisp * 0.28);
      const darkLevel = smoothstep(0.76, 0.91, 1 - detail) *
        smoothstep(0.43, 0.66, broad);

      let red = mix(63, 112, broad);
      let green = mix(166, 210, broad);
      let blue = mix(232, 246, broad);

      red = mix(red, 239, patchLevel * 0.78);
      green = mix(green, 247, patchLevel * 0.78);
      blue = mix(blue, 252, patchLevel * 0.78);

      red = mix(red, 205, veilLevel * 0.35);
      green = mix(green, 232, veilLevel * 0.35);
      blue = mix(blue, 247, veilLevel * 0.35);

      red = mix(red, 247, inclusionLevel * 0.88);
      green = mix(green, 250, inclusionLevel * 0.88);
      blue = mix(blue, 255, inclusionLevel * 0.88);

      red = mix(red, 25, darkLevel * 0.72);
      green = mix(green, 104, darkLevel * 0.72);
      blue = mix(blue, 188, darkLevel * 0.72);

      const index = (py * textureW + px) * 4;
      textureData[index] = clampByte(red);
      textureData[index + 1] = clampByte(green);
      textureData[index + 2] = clampByte(blue);
      textureData[index + 3] = 255;
    }
  }

  const marbled_texture = new THREE.DataTexture(
    textureData,
    textureW,
    textureH,
    THREE.RGBAFormat,
    THREE.UnsignedByteType
  );
  marbled_texture.name = "marbled_texture";
  marbled_texture.wrapS = THREE.RepeatWrapping;
  marbled_texture.wrapT = THREE.ClampToEdgeWrapping;
  marbled_texture.magFilter = THREE.LinearFilter;
  marbled_texture.minFilter = THREE.LinearFilter;
  marbled_texture.generateMipmaps = false;
  if (THREE.SRGBColorSpace !== undefined) {
    marbled_texture.colorSpace = THREE.SRGBColorSpace;
  }
  marbled_texture.needsUpdate = true;

  const sphereGeom = new THREE.SphereGeometry(0.5, 96, 64);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: marbled_texture,
    metalness: 0.0,
    roughness: 0.3
  });
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  sphere.name = "sphere";
  sphere.rotation.y = -0.18;
  root.add(sphere);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}