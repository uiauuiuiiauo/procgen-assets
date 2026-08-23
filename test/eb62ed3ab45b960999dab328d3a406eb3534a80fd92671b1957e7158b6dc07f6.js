export default function generate(THREE) {
  const root = new THREE.Group();
  const galaxy_sphere = new THREE.Group();
  root.add(galaxy_sphere);

  const textureWidth = 512;
  const textureHeight = 256;
  const textureData = new Uint8Array(textureWidth * textureHeight * 4);

  function clampByte(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }

  function hash01(index, salt) {
    let value = Math.imul(index + 1, 0x045d9f3b) ^
      Math.imul(salt + 17, 0x27d4eb2d);
    value = Math.imul(value ^ (value >>> 16), 0x045d9f3b);
    value ^= value >>> 15;
    return (value >>> 0) / 4294967295;
  }

  const galaxyCenters = [
    [0.15, 0.49, 0.22, 0.16],
    [0.38, 0.55, 0.24, 0.14],
    [0.64, 0.48, 0.23, 0.17],
    [0.86, 0.58, 0.21, 0.13],
    [0.53, 0.72, 0.20, 0.12],
    [0.47, 0.28, 0.22, 0.13],
    [0.74, 0.73, 0.16, 0.10],
  ];

  const galaxyOffsets = [
    [-0.04, 0.02],
    [0.03, -0.03],
    [-0.02, 0.04],
    [0.05, -0.01],
    [-0.03, 0.03],
    [0.02, -0.04],
    [0.04, 0.01],
  ];

  for (let py = 0; py < textureHeight; py++) {
    const v = (py + 0.5) / textureHeight;

    for (let px = 0; px < textureWidth; px++) {
      const u = (px + 0.5) / textureWidth;
      const fineNoise = hash01(px + py * textureWidth, 3);
      const cloudNoise = hash01(
        Math.floor(px / 3) + Math.floor(py / 3) * 171,
        7
      );
      const broadNoise = hash01(
        Math.floor(px / 7) + Math.floor(py / 7) * 73,
        13
      );

      let blue = 0;
      let cyan = 0;
      let pink = 0;
      let cream = 0;
      let core = 0;
      let dust = 0;

      for (let gi = 0; gi < galaxyCenters.length; gi++) {
        const center = galaxyCenters[gi];
        const offset = galaxyOffsets[gi];
        let du = u - center[0] + offset[0] * (v - 0.5);
        du -= Math.floor(du + 0.5);
        const dv = v - center[1] + offset[1] * (du * 1.4);
        const angle = Math.atan2(dv / center[3], du / center[2]);
        const radial =
          (du * du) / (center[2] * center[2]) +
          (dv * dv) / (center[3] * center[3]);

        const wave =
          0.58 +
          0.17 * Math.sin(angle * 2.0 + gi * 0.8) +
          0.11 * Math.sin(angle * 5.0 - radial * 4.0 + gi);
        const envelope = Math.exp(-radial * 1.35);
        const detail = 0.55 + cloudNoise * 0.45;
        const centerLight = Math.exp(-radial * 5.0);

        blue += envelope * wave * detail * 0.46;
        cream += centerLight * detail * 0.24;
        core += Math.exp(-radial * 20.0) * 0.16;

        const phase =
          angle * 2.0 -
          radial * 4.7 +
          gi * 0.91 +
          Math.sin(v * 8.0) * 0.35;
        const pinkMask =
          0.5 + 0.5 * Math.sin(phase + 1.7 + broadNoise);
        const cyanMask =
          0.5 + 0.5 * Math.sin(phase - 1.8 - fineNoise);

        pink += envelope * wave * pinkMask * 0.18;
        cyan += envelope * wave * cyanMask * 0.16;

        const filament =
          Math.pow(
            Math.max(
              0,
              Math.sin(phase * 1.7 + broadNoise * 5.0)
            ),
            7
          ) *
          Math.exp(-Math.abs(radial - 0.7) * 5.0);
        dust += filament * 0.42;
      }

      blue = Math.min(1, blue);
      cyan = Math.min(0.75, cyan);
      pink = Math.min(0.75, pink);
      cream = Math.min(0.75, cream);
      core = Math.min(0.65, core);
      dust = Math.min(0.7, dust);

      const spaceVariation = 0.82 + broadNoise * 0.32;
      let red =
        3.5 +
        blue * 8.0 +
        pink * 72.0 +
        cream * 82.0 +
        core * 65.0 -
        dust * 28.0;
      let green =
        8.0 +
        blue * 17.0 +
        cyan * 76.0 +
        pink * 19.0 +
        cream * 73.0 +
        core * 74.0 -
        dust * 34.0;
      let blueChannel =
        28.0 +
        blue * 78.0 +
        cyan * 105.0 +
        pink * 72.0 +
        cream * 63.0 +
        core * 85.0 -
        dust * 24.0;

      const dimStar = hash01(px + py * textureWidth, 19);
      if (dimStar > 0.992) {
        const tiny = 38 + Math.pow(dimStar - 0.992, 2) * 1300;
        red += tiny;
        green += tiny;
        blueChannel += tiny;
      }

      const index = (py * textureWidth + px) * 4;
      textureData[index] = clampByte(red * spaceVariation);
      textureData[index + 1] = clampByte(green * spaceVariation);
      textureData[index + 2] = clampByte(
        blueChannel * spaceVariation
      );
      textureData[index + 3] = 255;
    }
  }

  function addTextureStar(x, y, red, green, blue, size) {
    const radius = Math.ceil(size);
    const centerX = Math.floor(x);
    const centerY = Math.floor(y);

    for (let oy = -radius; oy <= radius; oy++) {
      for (let ox = -radius; ox <= radius; ox++) {
        const distance = Math.sqrt(ox * ox + oy * oy);
        if (distance > size) continue;

        let px = (Math.round(x) + ox + textureWidth) % textureWidth;
        let py = (Math.round(y) + oy + textureHeight) % textureHeight;
        if (px < 0) px += textureWidth;
        if (py < 0) py += textureHeight;

        const index = (py * textureWidth + px) * 4;
        const blend = Math.min(1, 0.35 + (1 - distance / size) * 0.9);
        textureData[index] = clampByte(
          textureData[index] * (1 - blend) + red * blend
        );
        textureData[index + 1] = clampByte(
          textureData[index + 1] * (1 - blend) + green * blend
        );
        textureData[index + 2] = clampByte(
          textureData[index + 2] * (1 - blend) + blue * blend
        );
      }
    }
  }

  for (let i = 0; i < 1800; i++) {
    const x = hash01(i, 31) * textureWidth;
    const y = hash01(i, 37) * textureHeight;
    const size = 0.32 + hash01(i, 43) * 1.08;
    const tone = hash01(i, 47);

    let red = 238;
    let green = 245;
    let blue = 255;

    if (tone < 0.28) {
      red = 105;
      green = 210;
      blue = 255;
    } else if (tone < 0.54) {
      red = 255;
      green = 184;
      blue = 95;
    } else if (tone < 0.75) {
      red = 255;
      green = 112;
      blue = 185;
    } else if (tone < 0.89) {
      red = 175;
      green = 225;
      blue = 255;
    }

    addTextureStar(x, y, red, green, blue, size);
  }

  for (let i = 0; i < 140; i++) {
    const x = hash01(i, 59) * textureWidth;
    const y = hash01(i, 61) * textureHeight;
    const size = 1.15 + hash01(i, 67) * 2.1;
    const tone = hash01(i, 71);
    let red = 255;
    let green = 242;
    let blue = 218;

    if (tone < 0.3) {
      red = 90;
      green = 225;
      blue = 255;
    } else if (tone < 0.59) {
      red = 255;
      green = 145;
      blue = 65;
    } else if (tone < 0.82) {
      red = 255;
      green = 82;
      blue = 175;
    }

    addTextureStar(x, y, red, green, blue, size);
  }

  const galaxy_texture = new THREE.DataTexture(
    textureData,
    textureWidth,
    textureHeight,
    THREE.RGBAFormat
  );
  galaxy_texture.wrapS = THREE.RepeatWrapping;
  galaxy_texture.wrapT = THREE.ClampToEdgeWrapping;
  galaxy_texture.magFilter = THREE.LinearFilter;
  galaxy_texture.minFilter = THREE.LinearFilter;
  galaxy_texture.generateMipmaps = false;
  if (THREE.SRGBColorSpace) {
    galaxy_texture.colorSpace = THREE.SRGBColorSpace;
  }
  galaxy_texture.needsUpdate = true;

  const galaxy_surfaceGeom = new THREE.SphereGeometry(1, 128, 64);
  const galaxy_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: galaxy_texture,
    emissive: 0xffffff,
    emissiveMap: galaxy_texture,
    emissiveIntensity: 0.48,
    metalness: 0.0,
    roughness: 0.58,
  });
  const galaxy_surface = new THREE.Mesh(
    galaxy_surfaceGeom,
    galaxy_surfaceMat
  );
  galaxy_sphere.add(galaxy_surface);

  const starGeom = new THREE.CircleGeometry(1, 12);

  const white_starsMat = new THREE.MeshStandardMaterial({
    color: 0xfff8df,
    emissive: 0xfff8df,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const gold_starsMat = new THREE.MeshStandardMaterial({
    color: 0xffb34f,
    emissive: 0xffb34f,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const cyan_starsMat = new THREE.MeshStandardMaterial({
    color: 0x65ddff,
    emissive: 0x65ddff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const pink_starsMat = new THREE.MeshStandardMaterial({
    color: 0xff75c8,
    emissive: 0xff75c8,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const blue_starsMat = new THREE.MeshStandardMaterial({
    color: 0xa7cfff,
    emissive: 0xa7cfff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });

  const starCount = 260;
  const white_stars = new THREE.InstancedMesh(
    starGeom,
    white_starsMat,
    starCount
  );
  const gold_stars = new THREE.InstancedMesh(
    starGeom,
    gold_starsMat,
    starCount
  );
  const cyan_stars = new THREE.InstancedMesh(
    starGeom,
    cyan_starsMat,
    starCount
  );
  const pink_stars = new THREE.InstancedMesh(
    starGeom,
    pink_starsMat,
    starCount
  );
  const blue_stars = new THREE.InstancedMesh(
    starGeom,
    blue_starsMat,
    starCount
  );

  galaxy_sphere.add(
    white_stars,
    gold_stars,
    cyan_stars,
    pink_stars,
    blue_stars
  );

  const starMeshes = [
    white_stars,
    gold_stars,
    cyan_stars,
    pink_stars,
    blue_stars,
  ];
  const starCounters = [0, 0, 0, 0, 0];
  const totalStars = starCount * starMeshes.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const localNormal = new THREE.Vector3(0, 0, 1);
  const normal = new THREE.Vector3();
  const starPosition = new THREE.Vector3();
  const starScale = new THREE.Vector3();
  const starQuaternion = new THREE.Quaternion();
  const starMatrix = new THREE.Matrix4();

  for (let i = 0; i < totalStars; i++) {
    const verticalJitter = (hash01(i, 83) - 0.5) * 0.55;
    const y = Math.max(
      -0.995,
      Math.min(0.995, 1 - (2 * (i + 0.5)) / totalStars + verticalJitter)
    );
    const horizontal = Math.sqrt(Math.max(0, 1 - y * y));
    const angle =
      i * goldenAngle +
      (hash01(i, 89) - 0.5) * 0.48 +
      (1 - y * y) * 0.18;

    normal.set(
      Math.cos(angle) * horizontal,
      y,
      Math.sin(angle) * horizontal
    ).normalize();

    const sizeNoise = hash01(i, 97);
    let size = 0.0022 + Math.pow(sizeNoise, 5) * 0.008;
    if (i % 173 === 0) size = 0.014;
    if (i % 41 === 0) size = Math.max(size, 0.006);

    starPosition.copy(normal).multiplyScalar(1.009);
    starQuaternion.setFromUnitVectors(localNormal, normal);
    starScale.set(size, size, 1);
    starMatrix.compose(starPosition, starQuaternion, starScale);

    const colorIndex = i % starMeshes.length;
    starMeshes[colorIndex].setMatrixAt(
      starCounters[colorIndex],
      starMatrix
    );
    starCounters[colorIndex]++;
  }

  for (const starMesh of starMeshes) {
    starMesh.instanceMatrix.needsUpdate = true;
  }

  const equatorial_seamGeom = new THREE.TorusGeometry(
    1.006,
    0.006,
    8,
    160
  );
  const equatorial_seamMat = new THREE.MeshStandardMaterial({
    color: 0x02030a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const equatorial_seam = new THREE.Mesh(
    equatorial_seamGeom,
    equatorial_seamMat
  );
  equatorial_seam.rotation.x = Math.PI / 2;
  galaxy_sphere.add(equatorial_seam);

  function fitToUnitCube(rootObject) {
    const box = new THREE.Box3().setFromObject(rootObject);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    rootObject.scale.setScalar(scale);
    rootObject.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}