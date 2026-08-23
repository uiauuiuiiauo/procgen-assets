export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "mixed_berry_custard_tart";

  const crust_group = new THREE.Group();
  crust_group.name = "crust_group";
  root.add(crust_group);

  const filling_group = new THREE.Group();
  filling_group.name = "filling_group";
  root.add(filling_group);

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xe2a24a,
    metalness: 0.0,
    roughness: 0.9,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xf0b85d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const toastedMat = new THREE.MeshStandardMaterial({
    color: 0xa85e20,
    metalness: 0.0,
    roughness: 0.9,
  });
  const fillingMat = new THREE.MeshStandardMaterial({
    color: 0xf39ac3,
    metalness: 0.0,
    roughness: 0.3,
  });
  const paleSwirlMat = new THREE.MeshStandardMaterial({
    color: 0xffc4d9,
    metalness: 0.0,
    roughness: 0.3,
  });
  const pinkSwirlMat = new THREE.MeshStandardMaterial({
    color: 0xee659b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const creamSwirlMat = new THREE.MeshStandardMaterial({
    color: 0xf9d5e3,
    metalness: 0.0,
    roughness: 0.3,
  });
  const darkSwirlMat = new THREE.MeshStandardMaterial({
    color: 0x68103c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blackberryMat = new THREE.MeshStandardMaterial({
    color: 0x171321,
    metalness: 0.0,
    roughness: 0.3,
  });
  const raspberryMat = new THREE.MeshStandardMaterial({
    color: 0xa40735,
    metalness: 0.0,
    roughness: 0.3,
  });
  const berryHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xf5afd1,
    metalness: 0.0,
    roughness: 0.3,
  });

  function createFlutedTartGeometry() {
    const segments = 144;
    const flutes = 24;
    const profile = [
      { r: 1.08, y: 0.00, a: 0.025, phase: 0.0 },
      { r: 1.16, y: 0.05, a: 0.035, phase: 0.5 },
      { r: 1.30, y: 0.55, a: 0.050, phase: 1.0 },
      { r: 1.39, y: 0.72, a: 0.055, phase: 1.0 },
      { r: 1.31, y: 0.80, a: 0.050, phase: 1.0 },
      { r: 1.17, y: 0.68, a: 0.035, phase: 1.0 },
      { r: 1.08, y: 0.12, a: 0.020, phase: 0.5 },
      { r: 1.02, y: 0.04, a: 0.010, phase: 0.0 },
    ];

    const positions = [];
    const indices = [];

    for (let p = 0; p < profile.length; p++) {
      const point = profile[p];
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const flute = point.a * Math.cos(flutes * angle + point.phase * Math.PI);
        const rough = 0.006 * Math.sin(5 * angle + p * 0.7) * (point.y / 0.72);
        const radius = point.r + flute + rough;
        positions.push(
          Math.cos(angle) * radius,
          point.y,
          Math.sin(angle) * radius
        );
      }
    }

    const row = segments + 1;
    for (let p = 0; p < profile.length; p++) {
      const nextProfile = (p + 1) % profile.length;
      for (let i = 0; i < segments; i++) {
        const a = p * row + i;
        const b = nextProfile * row + i;
        const c = nextProfile * row + i + 1;
        const d = p * row + i + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createCustardGeometry() {
    const segments = 128;
    const rings = 18;
    const radius = 1.22;
    const positions = [0, 0.34, 0];
    const indices = [];

    for (let j = 1; j <= rings; j++) {
      const s = j / rings;
      const edgeFade = j === rings ? 0.35 : 1;
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const radialWarp =
          edgeFade *
          (0.022 * Math.sin(3 * angle + 0.4) +
            0.012 * Math.sin(7 * angle + 1.1));
        const r = radius * s * (1 + radialWarp);
        const hill = 0.12 * (1 - Math.pow(s, 1.55));
        const waves =
          edgeFade *
          (0.055 * Math.sin(2 * angle + 0.6) * (0.35 + 0.65 * s) +
            0.038 * Math.sin(5 * angle - 0.8) +
            0.020 * Math.cos(9 * angle + 0.3) +
            0.026 * Math.sin(3 * angle + 1.5 * s));
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = 0.82 + hill + waves;
        positions.push(x, y, z);
      }
    }

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(0, 1 + next, 1 + i);
    }

    for (let j = 0; j < rings - 1; j++) {
      const inner = 1 + j * segments;
      const outer = inner + segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = inner + i;
        const b = inner + next;
        const c = outer + i;
        const d = outer + next;
        indices.push(a, b, c, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function fillingHeightAt(x, z) {
    const radius = Math.sqrt(x * x + z * z);
    const s = Math.min(radius / 1.22, 1);
    const angle = Math.atan2(z, x);
    const hill = 0.12 * (1 - Math.pow(s, 1.55));
    const waves =
      0.050 * Math.sin(2 * angle + 0.6) * (0.35 + 0.65 * s) +
      0.032 * Math.sin(5 * angle - 0.8) +
      0.017 * Math.cos(9 * angle + 0.3) +
      0.022 * Math.sin(3 * angle + 1.5 * s);
    return 0.82 + hill + waves;
  }

  function createRimPoints(radius, baseY, amplitude, waves, phase) {
    const points = [];
    const count = 72;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const r =
        radius +
        amplitude * Math.cos(12 * angle + phase) +
        0.008 * Math.sin(25 * angle + phase);
      const y =
        baseY +
        0.026 * Math.sin(waves * angle + phase) +
        0.012 * Math.cos((waves - 2) * angle);
      points.push(
        new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r)
      );
    }
    return points;
  }

  const crust_shellGeom = createFlutedTartGeometry();
  const crust_shell = new THREE.Mesh(crust_shellGeom, crustMat);
  crust_shell.name = "crust_shell";
  crust_group.add(crust_shell);

  const crust_baseGeom = new THREE.TorusGeometry(1.10, 0.065, 10, 96);
  const crust_base = new THREE.Mesh(crust_baseGeom, crustMat);
  crust_base.name = "crust_base";
  crust_base.rotation.x = Math.PI / 2;
  crust_base.position.y = 0.055;
  crust_group.add(crust_base);

  const bottom_crust_bandGeom = new THREE.TorusGeometry(
    1.105,
    0.035,
    8,
    96
  );
  const bottom_crust_band = new THREE.Mesh(
    bottom_crust_bandGeom,
    toastedMat
  );
  bottom_crust_band.name = "bottom_crust_band";
  bottom_crust_band.rotation.x = Math.PI / 2;
  bottom_crust_band.position.y = 0.035;
  crust_group.add(bottom_crust_band);

  const crust_rimGeom = new THREE.TorusGeometry(1.29, 0.13, 14, 112);
  const crust_rim = new THREE.Mesh(crust_rimGeom, rimMat);
  crust_rim.name = "crust_rim";
  crust_rim.rotation.x = Math.PI / 2;
  crust_rim.position.y = 0.765;
  crust_group.add(crust_rim);

  const crust_inner_edgeGeom = new THREE.TorusGeometry(
    1.17,
    0.028,
    8,
    96
  );
  const crust_inner_edge = new THREE.Mesh(
    crust_inner_edgeGeom,
    toastedMat
  );
  crust_inner_edge.name = "crust_inner_edge";
  crust_inner_edge.rotation.x = Math.PI / 2;
  crust_inner_edge.position.y = 0.785;
  crust_group.add(crust_inner_edge);

  const rim_crimpPoints = createRimPoints(
    1.30,
    0.862,
    0.018,
    12,
    0.2
  );
  const rim_crimpGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(rim_crimpPoints, true, "centripetal"),
    144,
    0.047,
    8,
    true
  );
  const rim_crimp = new THREE.Mesh(rim_crimpGeom, rimMat);
  rim_crimp.name = "rim_crimp";
  crust_group.add(rim_crimp);

  const rim_toasted_linePoints = createRimPoints(
    1.285,
    0.904,
    0.012,
    10,
    0.8
  );
  const rim_toasted_lineGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      rim_toasted_linePoints,
      true,
      "centripetal"
    ),
    128,
    0.018,
    7,
    true
  );
  const rim_toasted_line = new THREE.Mesh(
    rim_toasted_lineGeom,
    toastedMat
  );
  rim_toasted_line.name = "rim_toasted_line";
  crust_group.add(rim_toasted_line);

  const dummy = new THREE.Object3D();

  const crust_crumbsGeom = new THREE.IcosahedronGeometry(1, 0);
  const crust_crumbs = new THREE.InstancedMesh(
    crust_crumbsGeom,
    rimMat,
    88
  );
  crust_crumbs.name = "crust_crumbs";
  for (let i = 0; i < 88; i++) {
    if (i < 60) {
      const t = ((i * 17) % 61) / 60;
      const angle = i * 2.3999632297;
      const radius =
        1.115 +
        0.255 * t +
        0.014 * Math.sin(3 * angle + 0.4);
      const y =
        0.79 +
        0.085 * Math.sin(i * 1.71) +
        0.025 * Math.cos(5 * angle);
      dummy.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      dummy.rotation.set(i * 0.31, angle, i * 0.19);
      const size = 0.018 + 0.018 * (0.5 + 0.5 * Math.sin(i * 2.13));
      dummy.scale.set(size * 1.3, size * 0.75, size);
    } else {
      const k = i - 60;
      const angle = k * 2.3999632297 + 0.35;
      const y = 0.10 + 0.55 * (((k * 11) % 29) / 28);
      const t = y / 0.72;
      const radius =
        1.10 +
        0.27 * t +
        0.035 * Math.cos(24 * angle) +
        0.007;
      dummy.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      dummy.rotation.set(k * 0.2, angle, k * 0.37);
      const size = 0.012 + 0.014 * (0.5 + 0.5 * Math.sin(k * 1.83));
      dummy.scale.set(size, size * 0.7, size * 1.2);
    }
    dummy.updateMatrix();
    crust_crumbs.setMatrixAt(i, dummy.matrix);
  }
  crust_crumbs.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_crumbs);

  const crust_toast_spotsGeom = new THREE.SphereGeometry(1, 8, 5);
  const crust_toast_spots = new THREE.InstancedMesh(
    crust_toast_spotsGeom,
    toastedMat,
    34
  );
  crust_toast_spots.name = "crust_toast_spots";
  for (let i = 0; i < 34; i++) {
    const angle = i * 2.3999632297 + 0.7;
    const y = 0.10 + 0.54 * (((i * 9) % 35) / 34);
    const t = y / 0.72;
    const radius =
      1.10 +
      0.27 * t +
      0.035 * Math.cos(24 * angle) +
      0.010;
    dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, i * 0.41);
    const size = 0.018 + 0.020 * (0.5 + 0.5 * Math.sin(i * 1.47));
    dummy.scale.set(size * 1.45, size * 0.55, 0.007);
    dummy.updateMatrix();
    crust_toast_spots.setMatrixAt(i, dummy.matrix);
  }
  crust_toast_spots.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_toast_spots);

  const fillingGeom = createCustardGeometry();
  const filling = new THREE.Mesh(fillingGeom, fillingMat);
  filling.name = "filling";
  filling_group.add(filling);

  const surface_moundsGeom = new THREE.SphereGeometry(1, 20, 10);
  const surface_mounds = new THREE.InstancedMesh(
    surface_moundsGeom,
    fillingMat,
    14
  );
  surface_mounds.name = "surface_mounds";
  for (let i = 0; i < 14; i++) {
    const angle = i * 2.3999632297 + 0.25;
    const radius = 0.12 + 0.82 * (((i * 7) % 15) / 15);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    dummy.position.set(x, fillingHeightAt(x, z) + 0.004, z);
    dummy.rotation.set(0, angle * 0.73, 0);
    dummy.scale.set(
      0.18 + 0.045 * (0.5 + 0.5 * Math.sin(i * 1.31)),
      0.018 + 0.008 * (0.5 + 0.5 * Math.cos(i * 1.77)),
      0.13 + 0.040 * (0.5 + 0.5 * Math.cos(i * 1.19))
    );
    dummy.updateMatrix();
    surface_mounds.setMatrixAt(i, dummy.matrix);
  }
  surface_mounds.instanceMatrix.needsUpdate = true;
  filling_group.add(surface_mounds);

  const pale_swirlPoints = [];
  for (let i = 0; i <= 22; i++) {
    const t = i / 22;
    const angle = 0.25 + t * Math.PI * 2.55;
    const radius = 0.10 + t * 0.78;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    pale_swirlPoints.push(
      new THREE.Vector3(x, fillingHeightAt(x, z) + 0.018, z)
    );
  }
  const pale_swirlGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(pale_swirlPoints, false, "centripetal"),
    72,
    0.032,
    8,
    false
  );
  const pale_swirl = new THREE.Mesh(pale_swirlGeom, paleSwirlMat);
  pale_swirl.name = "pale_swirl";
  filling_group.add(pale_swirl);

  const pink_swirlPoints = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const angle = 2.15 + t * Math.PI * 2.05;
    const radius = 0.24 + t * 0.68;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    pink_swirlPoints.push(
      new THREE.Vector3(x, fillingHeightAt(x, z) + 0.020, z)
    );
  }
  const pink_swirlGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(pink_swirlPoints, false, "centripetal"),
    68,
    0.029,
    8,
    false
  );
  const pink_swirl = new THREE.Mesh(pink_swirlGeom, pinkSwirlMat);
  pink_swirl.name = "pink_swirl";
  filling_group.add(pink_swirl);

  const cream_swirlPoints = [];
  for (let i = 0; i <= 18; i++) {
    const t = i / 18;
    const angle = 4.05 + t * Math.PI * 1.75;
    const radius = 0.48 + t * 0.52;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    cream_swirlPoints.push(
      new THREE.Vector3(x, fillingHeightAt(x, z) + 0.017, z)
    );
  }
  const cream_swirlGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(cream_swirlPoints, false, "centripetal"),
    60,
    0.026,
    8,
    false
  );
  const cream_swirl = new THREE.Mesh(cream_swirlGeom, creamSwirlMat);
  cream_swirl.name = "cream_swirl";
  filling_group.add(cream_swirl);

  const dark_swirlPoints = [];
  for (let i = 0; i <= 18; i++) {
    const t = i / 18;
    const angle = 0.85 + t * Math.PI * 2.25;
    const radius = 0.16 + t * 0.73;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    dark_swirlPoints.push(
      new THREE.Vector3(x, fillingHeightAt(x, z) + 0.010, z)
    );
  }
  const dark_swirlGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(dark_swirlPoints, false, "centripetal"),
    64,
    0.014,
    7,
    false
  );
  const dark_swirl = new THREE.Mesh(dark_swirlGeom, darkSwirlMat);
  dark_swirl.name = "dark_swirl";
  filling_group.add(dark_swirl);

  const berryGeom = new THREE.SphereGeometry(1, 14, 9);
  const blackberries = new THREE.InstancedMesh(
    berryGeom,
    blackberryMat,
    25
  );
  blackberries.name = "blackberries";

  for (let i = 0; i < 25; i++) {
    const angle = i * 2.3999632297 + 0.18;
    const radius = 0.10 + 0.88 * (((i * 11) % 26) / 26);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const size = 0.052 + 0.025 * (0.5 + 0.5 * Math.sin(i * 1.63));
    dummy.position.set(x, fillingHeightAt(x, z) + 0.012, z);
    dummy.rotation.set(i * 0.23, angle, i * 0.17);
    dummy.scale.set(size * 1.08, size * 0.72, size);
    dummy.updateMatrix();
    blackberries.setMatrixAt(i, dummy.matrix);
  }
  blackberries.instanceMatrix.needsUpdate = true;
  filling_group.add(blackberries);

  const raspberries = new THREE.InstancedMesh(
    berryGeom,
    raspberryMat,
    19
  );
  raspberries.name = "raspberries";

  for (let i = 0; i < 19; i++) {
    const angle = i * 2.3999632297 + 1.25;
    const radius = 0.14 + 0.84 * (((i * 8) % 20) / 20);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const size = 0.055 + 0.025 * (0.5 + 0.5 * Math.cos(i * 1.41));
    dummy.position.set(x, fillingHeightAt(x, z) + 0.010, z);
    dummy.rotation.set(i * 0.19, angle * 0.8, i * 0.27);
    dummy.scale.set(size, size * 0.70, size * 1.08);
    dummy.updateMatrix();
    raspberries.setMatrixAt(i, dummy.matrix);
  }
  raspberries.instanceMatrix.needsUpdate = true;
  filling_group.add(raspberries);

  const berry_highlightsGeom = new THREE.SphereGeometry(1, 8, 5);
  const berry_highlights = new THREE.InstancedMesh(
    berry_highlightsGeom,
    berryHighlightMat,
    28
  );
  berry_highlights.name = "berry_highlights";

  for (let i = 0; i < 28; i++) {
    const isBlack = i < 20;
    const localIndex = isBlack ? i : i - 20;
    const count = isBlack ? 25 : 19;
    const offset = isBlack ? 0.18 : 1.25;
    const angle = localIndex * 2.3999632297 + offset;
    const radius =
      (isBlack ? 0.10 : 0.14) +
      (isBlack ? 0.88 : 0.84) *
        (((localIndex * (isBlack ? 11 : 8)) % (count + 1)) /
          (count + 1));
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    dummy.position.set(
      x - 0.014,
      fillingHeightAt(x, z) + 0.074,
      z + 0.006
    );
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(0.014, 0.008, 0.010);
    dummy.updateMatrix();
    berry_highlights.setMatrixAt(i, dummy.matrix);
  }
  berry_highlights.instanceMatrix.needsUpdate = true;
  filling_group.add(berry_highlights);

  const berry_specklesGeom = new THREE.SphereGeometry(1, 7, 5);
  const berry_speckles = new THREE.InstancedMesh(
    berry_specklesGeom,
    raspberryMat,
    64
  );
  berry_speckles.name = "berry_speckles";

  for (let i = 0; i < 64; i++) {
    const angle = i * 2.3999632297 + 0.55;
    const radius = 0.08 + 0.98 * (((i * 29) % 67) / 67);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const size = 0.010 + 0.015 * (0.5 + 0.5 * Math.sin(i * 2.07));
    dummy.position.set(x, fillingHeightAt(x, z) + 0.006, z);
    dummy.rotation.set(i * 0.2, angle, i * 0.33);
    dummy.scale.set(size, 0.004, size * 0.8);
    dummy.updateMatrix();
    berry_speckles.setMatrixAt(i, dummy.matrix);
  }
  berry_speckles.instanceMatrix.needsUpdate = true;
  filling_group.add(berry_speckles);

  const dark_speckles = new THREE.InstancedMesh(
    berry_specklesGeom,
    blackberryMat,
    38
  );
  dark_speckles.name = "dark_speckles";

  for (let i = 0; i < 38; i++) {
    const angle = i * 2.3999632297 + 1.65;
    const radius = 0.10 + 0.94 * (((i * 17) % 41) / 41);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const size = 0.010 + 0.014 * (0.5 + 0.5 * Math.cos(i * 1.89));
    dummy.position.set(x, fillingHeightAt(x, z) + 0.007, z);
    dummy.rotation.set(i * 0.12, angle, i * 0.29);
    dummy.scale.set(size, 0.0045, size * 0.85);
    dummy.updateMatrix();
    dark_speckles.setMatrixAt(i, dummy.matrix);
  }
  dark_speckles.instanceMatrix.needsUpdate = true;
  filling_group.add(dark_speckles);

  fitToUnitCube(THREE, root);
  return root;
}

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