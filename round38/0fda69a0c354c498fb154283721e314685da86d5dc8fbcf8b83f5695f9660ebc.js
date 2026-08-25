export default function generate(THREE) {
  const pitcher = new THREE.Group();
  pitcher.name = "pitcher";

  const vessel_group = new THREE.Group();
  vessel_group.name = "vessel_group";

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";

  pitcher.add(handle_group, vessel_group);

  function createMarbleTexture() {
    const width = 256;
    const height = 256;
    const data = new Uint8Array(width * height * 4);
    const tau = Math.PI * 2;
    const palette = [
      [12, 82, 139],
      [0, 186, 211],
      [13, 198, 173],
      [76, 203, 47],
      [229, 220, 22],
      [248, 126, 24],
      [211, 43, 43],
      [190, 43, 121],
      [112, 40, 178],
      [35, 62, 171],
      [18, 157, 190],
      [22, 117, 80],
    ];

    for (let y = 0; y < height; y++) {
      const v = y / (height - 1);

      for (let x = 0; x < width; x++) {
        const u = x / (width - 1);
        const warp =
          u +
          0.145 *
            Math.sin(
              tau *
                (v * 1.85 +
                  0.18 * Math.sin(tau * u * 2) +
                  0.07 * Math.sin(tau * v * 3))
            );
        const wave1 = Math.sin(tau * warp);
        const wave2 = Math.sin(
          tau * (warp * 2 - v * 0.62 + wave1 * 0.13)
        );
        const wave3 = Math.sin(
          tau * (warp * 3 + v * 0.48 + wave2 * 0.11)
        );
        const flow =
          v * 2.15 + wave1 * 0.72 + wave2 * 0.31 + wave3 * 0.14;
        const wrappedFlow = flow - Math.floor(flow);
        const palettePosition = wrappedFlow * palette.length;
        const colorIndex = Math.floor(palettePosition) % palette.length;
        const nextIndex = (colorIndex + 1) % palette.length;
        const localBlend = palettePosition - Math.floor(palettePosition);
        const smoothBlend =
          localBlend * localBlend * (3 - 2 * localBlend);

        const colorA = palette[colorIndex];
        const colorB = palette[nextIndex];

        let red =
          colorA[0] + (colorB[0] - colorA[0]) * smoothBlend;
        let green =
          colorA[1] + (colorB[1] - colorA[1]) * smoothBlend;
        let blue =
          colorA[2] + (colorB[2] - colorA[2]) * smoothBlend;

        const cloud =
          0.5 +
          0.5 *
            Math.sin(
              tau *
                (u * 4 -
                  v * 1.7 +
                  0.22 * Math.sin(tau * (u + v)))
            );
        const cloudyMix = 0.12 + cloud * 0.22;
        const cloudColor = palette[
          (colorIndex + 5 + Math.floor(cloud * 2)) %
            palette.length
        ];

        red = red * (1 - cloudyMix) + cloudColor[0] * cloudyMix;
        green =
          green * (1 - cloudyMix) + cloudColor[1] * cloudyMix;
        blue =
          blue * (1 - cloudyMix) + cloudColor[2] * cloudyMix;

        const luminance =
          0.83 +
          0.17 *
            (0.5 +
              0.5 *
                Math.sin(
                  tau * (u * 5 + v * 3 + wave1 * 0.18)
                ));
        red *= luminance;
        green *= luminance;
        blue *= luminance;

        const fleckField = Math.abs(
          Math.sin(tau * (u * 37 + v * 53 + wave1 * 1.7)) *
            Math.sin(tau * (u * 19 - v * 41 + wave2 * 1.3))
        );
        if (fleckField > 0.996) {
          red = 220;
          green = 194;
          blue = 139;
        }

        const index = (y * width + x) * 4;
        data[index] = Math.max(0, Math.min(255, Math.round(red)));
        data[index + 1] = Math.max(
          0,
          Math.min(255, Math.round(green))
        );
        data[index + 2] = Math.max(
          0,
          Math.min(255, Math.round(blue))
        );
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBAFormat
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    if (THREE.SRGBColorSpace !== undefined) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.needsUpdate = true;
    return texture;
  }

  function createWoodTexture() {
    const width = 128;
    const height = 128;
    const data = new Uint8Array(width * height * 4);
    const tau = Math.PI * 2;

    for (let y = 0; y < height; y++) {
      const v = y / (height - 1);

      for (let x = 0; x < width; x++) {
        const u = x / (width - 1);
        const grainPhase =
          v * 54 +
          1.15 * Math.sin(tau * u) +
          0.38 * Math.sin(tau * (u * 3 + v * 0.4));
        const grain =
          0.5 + 0.5 * Math.sin(grainPhase * tau);
        const fineGrain = Math.pow(
          0.5 +
            0.5 *
              Math.sin(
                tau *
                  (v * 93 +
                    u * 5 +
                    0.5 * Math.sin(tau * u * 2))
              ),
          11
        );
        const warmVariation =
          0.5 +
          0.5 *
            Math.sin(
              tau * (u * 2 + v * 0.65 + grain * 0.12)
            );

        const index = (y * width + x) * 4;
        data[index] = Math.max(
          0,
          Math.min(
            255,
            Math.round(117 + warmVariation * 45 - fineGrain * 68)
          )
        );
        data[index + 1] = Math.max(
          0,
          Math.min(
            255,
            Math.round(
              59 +
                warmVariation * 28 +
                grain * 9 -
                fineGrain * 46
            )
          )
        );
        data[index + 2] = Math.max(
          0,
          Math.min(
            255,
            Math.round(
              29 +
                warmVariation * 16 +
                grain * 5 -
                fineGrain * 25
            )
          )
        );
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBAFormat
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    if (THREE.SRGBColorSpace !== undefined) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.needsUpdate = true;
    return texture;
  }

  const marbleTexture = createMarbleTexture();
  const woodTexture = createWoodTexture();

  const pitcher_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: marbleTexture,
    metalness: 0.0,
    roughness: 0.3,
  });

  const mouth_interiorMat = new THREE.MeshStandardMaterial({
    color: 0x35aeb3,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const inner_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x174f72,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const wooden_handleMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: woodTexture,
    metalness: 0.0,
    roughness: 0.6,
  });

  const handle_grainMat = new THREE.MeshStandardMaterial({
    color: 0x4a2514,
    metalness: 0.0,
    roughness: 0.6,
  });

  const handle_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xb87947,
    metalness: 0.0,
    roughness: 0.6,
  });

  const pitcher_bodyProfile = [
    new THREE.Vector2(0.00, -1.30),
    new THREE.Vector2(0.68, -1.30),
    new THREE.Vector2(0.78, -1.27),
    new THREE.Vector2(0.86, -1.18),
    new THREE.Vector2(0.92, -1.02),
    new THREE.Vector2(0.97, -0.78),
    new THREE.Vector2(1.00, -0.48),
    new THREE.Vector2(1.01, -0.15),
    new THREE.Vector2(0.99, 0.18),
    new THREE.Vector2(0.95, 0.45),
    new THREE.Vector2(0.88, 0.70),
    new THREE.Vector2(0.79, 0.92),
    new THREE.Vector2(0.70, 1.10),
    new THREE.Vector2(0.64, 1.27),
    new THREE.Vector2(0.61, 1.43),
    new THREE.Vector2(0.62, 1.57),
    new THREE.Vector2(0.67, 1.69),
    new THREE.Vector2(0.76, 1.78),
    new THREE.Vector2(0.84, 1.82),
  ];

  const pitcher_bodyGeom = new THREE.LatheGeometry(
    pitcher_bodyProfile,
    64
  );
  const pitcher_body = new THREE.Mesh(
    pitcher_bodyGeom,
    pitcher_bodyMat
  );
  pitcher_body.name = "pitcher_body";
  vessel_group.add(pitcher_body);

  const mouth_interiorProfile = [
    new THREE.Vector2(0.00, 1.56),
    new THREE.Vector2(0.24, 1.57),
    new THREE.Vector2(0.48, 1.68),
    new THREE.Vector2(0.68, 1.80),
  ];

  const mouth_interiorGeom = new THREE.LatheGeometry(
    mouth_interiorProfile,
    64
  );
  const mouth_interior = new THREE.Mesh(
    mouth_interiorGeom,
    mouth_interiorMat
  );
  mouth_interior.name = "mouth_interior";
  vessel_group.add(mouth_interior);

  const inner_shadowGeom = new THREE.CircleGeometry(0.25, 40);
  const inner_shadow = new THREE.Mesh(
    inner_shadowGeom,
    inner_shadowMat
  );
  inner_shadow.name = "inner_shadow";
  inner_shadow.rotation.x = -Math.PI / 2;
  inner_shadow.position.y = 1.565;
  vessel_group.add(inner_shadow);

  const flared_rimGeom = new THREE.TorusGeometry(
    0.80,
    0.055,
    16,
    72
  );
  const flared_rimMat = pitcher_bodyMat;
  const flared_rim = new THREE.Mesh(
    flared_rimGeom,
    flared_rimMat
  );
  flared_rim.name = "flared_rim";
  flared_rim.rotation.x = Math.PI / 2;
  flared_rim.position.y = 1.82;
  vessel_group.add(flared_rim);

  const base_ringGeom = new THREE.TorusGeometry(
    0.70,
    0.025,
    10,
    56
  );
  const base_ringMat = pitcher_bodyMat;
  const base_ring = new THREE.Mesh(
    base_ringGeom,
    base_ringMat
  );
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = -1.295;
  vessel_group.add(base_ring);

  const wooden_handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.60, 1.16, -0.08),
      new THREE.Vector3(0.86, 1.39, -0.08),
      new THREE.Vector3(1.22, 1.58, -0.08),
      new THREE.Vector3(1.55, 1.55, -0.08),
      new THREE.Vector3(1.79, 1.31, -0.08),
      new THREE.Vector3(1.91, 0.94, -0.08),
      new THREE.Vector3(1.92, 0.53, -0.08),
      new THREE.Vector3(1.82, 0.12, -0.08),
      new THREE.Vector3(1.62, -0.29, -0.08),
      new THREE.Vector3(1.36, -0.67, -0.08),
      new THREE.Vector3(1.08, -0.98, -0.08),
      new THREE.Vector3(0.86, -1.06, -0.08),
    ],
    false,
    "centripetal"
  );

  const wooden_handleGeom = new THREE.TubeGeometry(
    wooden_handlePath,
    112,
    0.15,
    18,
    false
  );
  const wooden_handle = new THREE.Mesh(
    wooden_handleGeom,
    wooden_handleMat
  );
  wooden_handle.name = "wooden_handle";
  handle_group.add(wooden_handle);

  const upper_handle_mountGeom = new THREE.SphereGeometry(
    0.17,
    24,
    14
  );
  const upper_handle_mountMat = wooden_handleMat;
  const upper_handle_mount = new THREE.Mesh(
    upper_handle_mountGeom,
    upper_handle_mountMat
  );
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.64, 1.15, -0.08);
  upper_handle_mount.scale.set(1.15, 0.78, 0.92);
  handle_group.add(upper_handle_mount);

  const lower_handle_mountGeom = new THREE.SphereGeometry(
    0.17,
    24,
    14
  );
  const lower_handle_mountMat = wooden_handleMat;
  const lower_handle_mount = new THREE.Mesh(
    lower_handle_mountGeom,
    lower_handle_mountMat
  );
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.88, -1.04, -0.08);
  lower_handle_mount.scale.set(1.05, 0.72, 0.92);
  handle_group.add(lower_handle_mount);

  function createHandleGrain(t0, t1, phase) {
    const points = [];
    const count = 15;

    for (let i = 0; i < count; i++) {
      const ratio = i / (count - 1);
      const t = t0 + (t1 - t0) * ratio;
      const point = wooden_handlePath.getPoint(t);
      point.x += 0.012 * Math.sin(phase + ratio * Math.PI * 3);
      point.y += 0.010 * Math.sin(phase * 0.7 + ratio * Math.PI * 4);
      point.z += 0.148;
      points.push(point);
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      36,
      0.007,
      6,
      false
    );
    return new THREE.Mesh(geometry, handle_grainMat);
  }

  const handle_grain_1 = createHandleGrain(
    0.08,
    0.30,
    0.3
  );
  handle_grain_1.name = "handle_grain_1";
  handle_group.add(handle_grain_1);

  const handle_grain_2 = createHandleGrain(
    0.34,
    0.55,
    1.2
  );
  handle_grain_2.name = "handle_grain_2";
  handle_group.add(handle_grain_2);

  const handle_grain_3 = createHandleGrain(
    0.60,
    0.80,
    2.1
  );
  handle_grain_3.name = "handle_grain_3";
  handle_group.add(handle_grain_3);

  const handle_grain_4 = createHandleGrain(
    0.83,
    0.96,
    2.8
  );
  handle_grain_4.name = "handle_grain_4";
  handle_group.add(handle_grain_4);

  const handle_highlightPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.86, 1.39, 0.069),
      new THREE.Vector3(1.22, 1.58, 0.069),
      new THREE.Vector3(1.55, 1.55, 0.069),
      new THREE.Vector3(1.79, 1.31, 0.069),
      new THREE.Vector3(1.91, 0.94, 0.069),
    ],
    false,
    "centripetal"
  );

  const handle_highlightGeom = new THREE.TubeGeometry(
    handle_highlightPath,
    40,
    0.011,
    7,
    false
  );
  const handle_highlight = new THREE.Mesh(
    handle_highlightGeom,
    handle_highlightMat
  );
  handle_highlight.name = "handle_highlight";
  handle_group.add(handle_highlight);

  function fitToUnitCube(THREE, root) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    root.scale.setScalar(scale);
    root.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(THREE, pitcher);
  return pitcher;
}