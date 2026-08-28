export default function generate(THREE) {
  const root = new THREE.Group();
  const stone = new THREE.Group();
  stone.scale.set(1.17, 0.92, 0.94);
  root.add(stone);

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function smoothstep(min, max, value) {
    const t = clamp((value - min) / (max - min), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function mixColor(target, source, amount) {
    target[0] += (source[0] - target[0]) * amount;
    target[1] += (source[1] - target[1]) * amount;
    target[2] += (source[2] - target[2]) * amount;
  }

  function offset2D(x, y) {
    let value =
      Math.imul(x + 1, 374761393) ^
      Math.imul(y + 1, 668265263);
    value = Math.imul(value ^ (value >>> 13), 1274126177);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
  }

  function valueNoise2D(x, y) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const a = offset2D(ix, iy);
    const b = offset2D(ix + 1, iy);
    const c = offset2D(ix, iy + 1);
    const d = offset2D(ix + 1, iy + 1);
    const ab = a + (b - a) * sx;
    const cd = c + (d - c) * sx;
    return ab + (cd - ab) * sy;
  }

  function fractalNoise2D(x, y, octaves) {
    let total = 0;
    let weight = 0;
    let amplitude = 0.55;
    for (let i = 0; i < octaves; i++) {
      total += valueNoise2D(x, y) * amplitude;
      weight += amplitude;
      x = x * 2.03 + 17.17;
      y = y * 2.01 - 11.43;
      amplitude *= 0.5;
    }
    return total / weight;
  }

  function periodicNoise2D(u, v, octaves) {
    let total = 0;
    let weight = 0;
    let amplitude = 0.55;
    for (let i = 0; i < octaves; i++) {
      const phase = i * 7.31;
      total +=
        valueNoise2D(
          u * Math.PI * 2 + phase * 0.13,
          v * Math.PI * 2 + phase * 0.09
        ) * amplitude;
      weight += amplitude;
      u = (u + 0.19) * 2.03;
      v = (v - 0.14) * 2.01;
      amplitude *= 0.5;
    }
    return total / weight;
  }

  const textureW = 512;
  const textureH = 256;
  const colorData = new Uint8Array(textureW * textureH * 4);
  const bumpData = new Uint8Array(textureW * textureH * 4);

  const baseColor = [184, 151, 116];
  const sageColor = [158, 157, 137];
  const warmColor = [199, 153, 108];
  const rustColor = [151, 84, 55];
  const paleColor = [211, 207, 190];
  const darkColor = [55, 57, 51];

  for (let y = 0; y < textureH; y++) {
    const v = (y + 0.5) / textureH;
    for (let x = 0; x < textureW; x++) {
      const u = (x + 0.5) / textureW;

      const broad = periodicNoise2D(u, v, 4);
      const grain = periodicNoise2D(
        u + 0.23,
        v - 0.17,
        4
      );
      const micro = periodicNoise2D(
        u * 2.7 + 0.11,
        v * 2.5 - 0.08,
        3
      );
      const mineral = periodicNoise2D(
        u * 3.2 - 0.19,
        v * 3.0 + 0.14,
        3
      );

      const color = [
        baseColor[0] + (broad - 0.5) * 24,
        baseColor[1] + (broad - 0.5) * 20,
        baseColor[2] + (broad - 0.5) * 17
      ];

      const sageMask = smoothstep(
        0.53,
        0.66,
        0.48 + broad * 0.28 + grain * 0.12
      ) * 0.38;
      mixColor(color, sageColor, sageMask);

      const warmthMask = smoothstep(
        0.54,
        0.68,
        grain + broad * 0.18
      ) * 0.22;
      mixColor(color, warmColor, warmthMask);

      const rustField =
        periodicNoise2D(
          u - 0.31,
          v + 0.12,
          4
        ) +
        periodicNoise2D(
          u + 0.41,
          v - 0.27,
          3
        ) * 0.28;
      const rustMask = smoothstep(
        0.69,
        0.77,
        rustField
      ) *
        smoothstep(0.34, 0.56, broad + grain * 0.25) *
        0.72;
      mixColor(color, rustColor, rustMask);

      const paleField =
        periodicNoise2D(
          u + 0.08,
          v + 0.37,
          4
        ) +
        periodicNoise2D(
          u - 0.47,
          v - 0.18,
          3
        ) * 0.24;
      const paleMask =
        smoothstep(0.735, 0.79, paleField) * 0.48;
      mixColor(color, paleColor, paleMask);

      const darkField =
        periodicNoise2D(
          u + 0.33,
          v - 0.06,
          4
        ) +
        periodicNoise2D(
          u - 0.21,
          v + 0.43,
          3
        ) * 0.18;
      const darkMask =
        smoothstep(0.79, 0.84, darkField) * 0.58;
      mixColor(color, darkColor, darkMask);

      const poreNoise =
        valueNoise2D(u * textureW * 2.2, v * textureH * 2.2) +
        valueNoise2D(
          u * textureW * 4.1 + 13,
          v * textureH * 4.1 + 7
        ) * 0.35;
      const poreMask = smoothstep(
        0.91,
        0.955,
        poreNoise
      );
      mixColor(color, darkColor, poreMask * 0.34);

      const fleck =
        valueNoise2D(u * textureW * 3.7 + 9, v * textureH * 3.7 + 21) +
        valueNoise2D(u * textureW * 6.3 - 17, v * textureH * 6.3 + 5) * 0.3;
      const paleFleck = smoothstep(
        0.945,
        0.975,
        fleck
      );
      mixColor(color, paleColor, paleFleck * 0.72);

      const darkFleck = smoothstep(
        0.955,
        0.982,
        valueNoise2D(u * textureW * 5.1 + 31, v * textureH * 5.1 + 19)
      );
      mixColor(color, darkColor, darkFleck * 0.78);

      const mineralLine =
        1 -
        Math.abs(
          periodicNoise2D(
            u + 0.27,
            v - 0.36,
            4
          ) - 0.5
        ) * 2;
      const mineralMask =
        smoothstep(0.965, 0.995, mineralLine) *
        smoothstep(0.48, 0.66, mineral) *
        0.35;
      mixColor(color, paleColor, mineralMask);

      const bump = clamp(
        0.5 +
          (broad - 0.5) * 0.24 +
          (grain - 0.5) * 0.18 +
          (micro - 0.5) * 0.24 +
          (mineral - 0.5) * 0.08 -
          poreMask * 0.13 +
          paleFleck * 0.018 +
          darkFleck * 0.012 +
          paleMask * 0.008,
        0,
        1
      );

      const index = (y * textureW + x) * 4;
      colorData[index] = Math.round(clamp(color[0], 0, 255));
      colorData[index + 1] = Math.round(clamp(color[1], 0, 255));
      colorData[index + 2] = Math.round(clamp(color[2], 0, 255));
      colorData[index + 3] = 255;

      const bumpValue = Math.round(clamp(bump * 255, 0, 255));
      bumpData[index] = bumpValue;
      bumpData[index + 1] = bumpValue;
      bumpData[index + 2] = bumpValue;
      bumpData[index + 3] = 255;
    }
  }

  const colorTexture = new THREE.DataTexture(
    colorData,
    textureW,
    textureH,
    THREE.RGBAFormat,
    THREE.UnsignedByteType
  );
  colorTexture.wrapS = THREE.RepeatWrapping;
  colorTexture.wrapT = THREE.ClampToEdgeWrapping;
  colorTexture.minFilter = THREE.LinearFilter;
  colorTexture.magFilter = THREE.LinearFilter;
  colorTexture.generateMipmaps = false;
  if (THREE.SRGBColorSpace !== undefined) {
    colorTexture.colorSpace = THREE.SRGBColorSpace;
  }
  colorTexture.needsUpdate = true;

  const bumpTexture = new THREE.DataTexture(
    bumpData,
    textureW,
    textureH,
    THREE.RGBAFormat,
    THREE.UnsignedByteType
  );
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;
  bumpTexture.minFilter = THREE.LinearFilter;
  bumpTexture.magFilter = THREE.LinearFilter;
  bumpTexture.generateMipmaps = false;
  bumpTexture.needsUpdate = true;

  const stone_bodyGeom = new THREE.SphereGeometry(1, 128, 96);
  const stonePositions = stone_bodyGeom.attributes.position;

  for (let i = 0; i < stonePositions.count; i++) {
    const x = stonePositions.getX(i);
    const y = stonePositions.getY(i);
    const z = stonePositions.getZ(i);
    const length = Math.sqrt(x * x + y * y + z * z) || 1;
    const nx = x / length;
    const ny = y / length;
    const nz = z / length;

    const broad =
      Math.sin(nx * 3.2 + ny * 2.1 - nz * 1.7) * 0.52 +
      Math.sin(ny * 5.1 - nz * 3.4 + nx * 1.8) * 0.31 +
      Math.sin((nx + ny - nz) * 7.3) * 0.17;
    const fine =
      Math.sin(nx * 18.7 + ny * 13.1 + nz * 9.4) * 0.55 +
      Math.sin(nx * 29.3 - ny * 21.7 + nz * 17.1) * 0.28 +
      Math.sin((nx + ny) * 43.1 - nz * 31.7) * 0.17;

    const surfaceRadius =
      1 + broad * 0.006 + fine * 0.0015;
    const px = nx * surfaceRadius;
    let py = ny * surfaceRadius * 0.98;
    const pz = nz * surfaceRadius * 0.96;

    if (py < -0.885) {
      py = -0.885 + (py + 0.885) * 0.12;
    }

    stonePositions.setXYZ(i, px, py, pz);
  }

  stonePositions.needsUpdate = true;
  stone_bodyGeom.computeVertexNormals();
  stone_bodyGeom.computeBoundingBox();
  stone_bodyGeom.computeBoundingSphere();

  const stone_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: colorTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.018,
    metalness: 0.0,
    roughness: 0.9
  });
  const stone_body = new THREE.Mesh(stone_bodyGeom, stone_bodyMat);
  stone.add(stone_body);

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