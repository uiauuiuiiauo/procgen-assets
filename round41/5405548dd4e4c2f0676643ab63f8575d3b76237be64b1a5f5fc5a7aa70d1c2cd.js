export default function generate(THREE) {
  const tart = new THREE.Group();
  tart.name = "chocolate_tart";

  const crust_group = new THREE.Group();
  crust_group.name = "crust_group";
  tart.add(crust_group);

  const cake_group = new THREE.Group();
  cake_group.name = "cake_group";
  tart.add(cake_group);

  const topping_group = new THREE.Group();
  topping_group.name = "topping_group";
  tart.add(topping_group);

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xd6a15c,
    metalness: 0.0,
    roughness: 0.9
  });
  const crust_rimMat = new THREE.MeshStandardMaterial({
    color: 0xe3b66f,
    metalness: 0.0,
    roughness: 0.9
  });
  const crust_shadowMat = new THREE.MeshStandardMaterial({
    color: 0xb77b42,
    metalness: 0.0,
    roughness: 0.9
  });
  const cakeMat = new THREE.MeshStandardMaterial({
    color: 0x3b211f,
    metalness: 0.0,
    roughness: 0.9
  });
  const cake_poresMat = new THREE.MeshStandardMaterial({
    color: 0x160a09,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const ganacheMat = new THREE.MeshStandardMaterial({
    color: 0x633328,
    metalness: 0.0,
    roughness: 0.3
  });
  const cocoaMat = new THREE.MeshStandardMaterial({
    color: 0x4b2a20,
    metalness: 0.0,
    roughness: 0.95,
    flatShading: true
  });
  const cocoa_lightMat = new THREE.MeshStandardMaterial({
    color: 0x6a4030,
    metalness: 0.0,
    roughness: 0.95,
    flatShading: true
  });

  function createFlutedShellGeometry() {
    const segments = 120;
    const flutes = 20;
    const profile = [
      { r: 0.61, y: 0.00, amp: 0.012 },
      { r: 0.66, y: 0.035, amp: 0.017 },
      { r: 0.70, y: 0.13, amp: 0.025 },
      { r: 0.76, y: 0.34, amp: 0.034 },
      { r: 0.82, y: 0.49, amp: 0.040 },
      { r: 0.83, y: 0.515, amp: 0.040 },
      { r: 0.70, y: 0.515, amp: 0.014 },
      { r: 0.65, y: 0.455, amp: 0.012 },
      { r: 0.63, y: 0.10, amp: 0.010 },
      { r: 0.61, y: 0.00, amp: 0.012 }
    ];
    const positions = [];
    const indices = [];

    for (let j = 0; j < profile.length; j++) {
      const p = profile[j];
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const radius = p.r + p.amp * Math.cos(flutes * angle);
        positions.push(
          Math.cos(angle) * radius,
          p.y,
          Math.sin(angle) * radius
        );
      }
    }

    const row = segments + 1;
    for (let j = 0; j < profile.length - 1; j++) {
      for (let i = 0; i < segments; i++) {
        const a = j * row + i;
        const b = a + 1;
        const c = a + row;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
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

  function createOrganicCakeGeometry() {
    const segments = 96;
    const levels = 12;
    const positions = [];
    const indices = [];

    for (let j = 0; j <= levels; j++) {
      const v = j / levels;
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const roughness =
          0.018 * Math.sin(7 * angle + 1.7 * v) +
          0.012 * Math.sin(17 * angle - 4.1 * v) +
          0.008 * Math.cos(29 * angle + 7.3 * v);
        const radius = 0.64 + 0.045 * v + roughness;
        const y =
          0.30 +
          0.49 * v +
          0.006 * Math.sin(11 * angle + 5.0 * v) +
          0.004 * Math.cos(23 * angle - 2.0 * v);

        positions.push(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
      }
    }

    const row = segments + 1;
    for (let j = 0; j < levels; j++) {
      for (let i = 0; i < segments; i++) {
        const a = j * row + i;
        const b = a + 1;
        const c = a + row;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    const bottomCenter = positions.length / 3;
    positions.push(0, 0.30, 0);
    const topCenter = positions.length / 3;
    positions.push(0, 0.79, 0);
    const topStart = levels * row;

    for (let i = 0; i < segments; i++) {
      indices.push(bottomCenter, i, i + 1);
      indices.push(topCenter, topStart + i + 1, topStart + i);
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

  function createGanacheGeometry() {
    const segments = 96;
    const rings = 10;
    const positions = [];
    const indices = [];

    positions.push(0, 1.005, 0);

    for (let ring = 1; ring <= rings; ring++) {
      const s = ring / rings;
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const edge =
          1 +
          0.025 * Math.sin(5 * angle + 0.4) +
          0.018 * Math.sin(9 * angle - 0.8);
        const radius = 0.755 * s * edge;
        const y =
          0.90 +
          0.105 * (1 - s * s) +
          0.007 * Math.sin(3 * angle + 0.5) * s * (1 - s);

        positions.push(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
      }
    }

    const row = segments + 1;
    for (let i = 0; i < segments; i++) {
      const current = 1 + i;
      const next = current + 1;
      indices.push(0, next, current);
    }

    for (let ring = 1; ring < rings; ring++) {
      const innerStart = 1 + (ring - 1) * row;
      const outerStart = innerStart + row;
      for (let i = 0; i < segments; i++) {
        const a = innerStart + i;
        const b = a + 1;
        const c = outerStart + i;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }

    const outerStart = 1 + (rings - 1) * row;
    const lowerStart = positions.length / 3;
    for (let i = 0; i <= segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const edge =
        1 +
        0.025 * Math.sin(5 * angle + 0.4) +
        0.018 * Math.sin(9 * angle - 0.8);
      const radius = 0.755 * edge;
      const front = Math.max(0, Math.sin(angle));
      const drip =
        0.025 * front * front * front * front +
        0.014 * front * front * front * front * front * front *
          (0.5 + 0.5 * Math.sin(13 * angle + 0.7)) +
        0.006 * (0.5 + 0.5 * Math.sin(7 * angle - 0.3));
      const y = 0.845 - drip;

      positions.push(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
    }

    for (let i = 0; i < segments; i++) {
      const topA = outerStart + i;
      const topB = topA + 1;
      const lowerA = lowerStart + i;
      const lowerB = lowerA + 1;
      indices.push(topA, topB, lowerA, topB, lowerB, lowerA);
    }

    const undersideCenter = positions.length / 3;
    positions.push(0, 0.84, 0);
    for (let i = 0; i < segments; i++) {
      indices.push(
        undersideCenter,
        lowerStart + i,
        lowerStart + i + 1
      );
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

  const crust_shellGeom = createFlutedShellGeometry();
  const crust_shell = new THREE.Mesh(crust_shellGeom, crustMat);
  crust_shell.name = "crust_shell";
  crust_group.add(crust_shell);

  const crust_baseGeom = new THREE.CylinderGeometry(0.63, 0.61, 0.045, 64);
  const crust_base = new THREE.Mesh(crust_baseGeom, crust_shadowMat);
  crust_base.name = "crust_base";
  crust_base.position.y = 0.022;
  crust_group.add(crust_base);

  const crust_rimGeom = new THREE.TorusGeometry(0.755, 0.055, 12, 96);
  const crust_rim = new THREE.Mesh(crust_rimGeom, crust_rimMat);
  crust_rim.name = "crust_rim";
  crust_rim.rotation.x = Math.PI / 2;
  crust_rim.position.y = 0.505;
  crust_group.add(crust_rim);

  const crust_rim_lobesGeom = new THREE.SphereGeometry(1, 10, 6);
  const crust_rim_lobes = new THREE.InstancedMesh(
    crust_rim_lobesGeom,
    crust_rimMat,
    20
  );
  crust_rim_lobes.name = "crust_rim_lobes";
  const instance_dummy = new THREE.Object3D();

  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    const radius = 0.755 + 0.006 * Math.sin(i * 1.7);
    instance_dummy.position.set(
      Math.cos(angle) * radius,
      0.512 + 0.004 * Math.sin(i * 2.3),
      Math.sin(angle) * radius
    );
    instance_dummy.rotation.set(0, -angle, 0);
    instance_dummy.scale.set(
      0.052 + 0.006 * ((i * 3) % 5),
      0.026 + 0.003 * ((i * 7) % 4),
      0.072 + 0.005 * ((i * 5) % 4)
    );
    instance_dummy.updateMatrix();
    crust_rim_lobes.setMatrixAt(i, instance_dummy.matrix);
  }
  crust_rim_lobes.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_rim_lobes);

  const crust_crumbsGeom = new THREE.IcosahedronGeometry(1, 0);
  const crust_crumbs = new THREE.InstancedMesh(
    crust_crumbsGeom,
    crust_rimMat,
    30
  );
  crust_crumbs.name = "crust_crumbs";

  for (let i = 0; i < 30; i++) {
    const angle = i / 30 * Math.PI * 2 + 0.08 * Math.sin(i * 2.1);
    const radius = 0.755 + 0.025 * Math.sin(i * 1.31);
    const size = 0.006 + 0.0015 * ((i * 7) % 5);
    instance_dummy.position.set(
      Math.cos(angle) * radius,
      0.548 + 0.006 * Math.cos(i * 1.9),
      Math.sin(angle) * radius
    );
    instance_dummy.rotation.set(i * 0.4, i * 0.7, i * 0.2);
    instance_dummy.scale.set(size * 1.3, size * 0.8, size);
    instance_dummy.updateMatrix();
    crust_crumbs.setMatrixAt(i, instance_dummy.matrix);
  }
  crust_crumbs.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_crumbs);

  const cake_bodyGeom = createOrganicCakeGeometry();
  const cake_body = new THREE.Mesh(cake_bodyGeom, cakeMat);
  cake_body.name = "cake_body";
  cake_group.add(cake_body);

  const cake_poresGeom = new THREE.CircleGeometry(1, 10);
  const cake_pores = new THREE.InstancedMesh(
    cake_poresGeom,
    cake_poresMat,
    38
  );
  cake_pores.name = "cake_pores";
  const forward_normal = new THREE.Vector3(0, 0, 1);
  const radial_normal = new THREE.Vector3();

  for (let i = 0; i < 38; i++) {
    const angle =
      i / 38 * Math.PI * 2 +
      0.18 * Math.sin(i * 2.17) +
      0.07 * Math.cos(i * 0.83);
    const y = 0.37 + (((i * 11) % 37) / 36) * 0.36;
    const v = (y - 0.30) / 0.49;
    const radius =
      0.64 +
      0.045 * v +
      0.018 * Math.sin(7 * angle + 1.7 * v) +
      0.012 * Math.sin(17 * angle - 4.1 * v) +
      0.009;

    radial_normal.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    instance_dummy.position.set(
      radial_normal.x * radius,
      y,
      radial_normal.z * radius
    );
    instance_dummy.quaternion.setFromUnitVectors(
      forward_normal,
      radial_normal
    );
    instance_dummy.rotateZ(i * 0.71);
    instance_dummy.scale.set(
      0.018 + 0.006 * ((i * 5) % 6),
      0.012 + 0.005 * ((i * 7) % 5),
      1
    );
    instance_dummy.updateMatrix();
    cake_pores.setMatrixAt(i, instance_dummy.matrix);
  }
  cake_pores.instanceMatrix.needsUpdate = true;
  cake_group.add(cake_pores);

  const cake_crumbsGeom = new THREE.IcosahedronGeometry(1, 0);
  const cake_crumbs = new THREE.InstancedMesh(
    cake_crumbsGeom,
    cakeMat,
    48
  );
  cake_crumbs.name = "cake_crumbs";

  for (let i = 0; i < 48; i++) {
    const angle =
      i / 48 * Math.PI * 2 +
      0.12 * Math.sin(i * 1.81);
    const y = 0.35 + (((i * 13) % 47) / 46) * 0.40;
    const v = (y - 0.30) / 0.49;
    const radius =
      0.646 +
      0.045 * v +
      0.014 * Math.sin(9 * angle + 2.2 * v);
    const size = 0.008 + 0.003 * ((i * 5) % 6);

    instance_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    instance_dummy.rotation.set(i * 0.31, i * 0.57, i * 0.19);
    instance_dummy.scale.set(
      size * (1.0 + 0.2 * ((i * 3) % 3)),
      size * (0.8 + 0.15 * ((i * 7) % 4)),
      size
    );
    instance_dummy.updateMatrix();
    cake_crumbs.setMatrixAt(i, instance_dummy.matrix);
  }
  cake_crumbs.instanceMatrix.needsUpdate = true;
  cake_group.add(cake_crumbs);

  const ganache_topGeom = createGanacheGeometry();
  const ganache_top = new THREE.Mesh(ganache_topGeom, ganacheMat);
  ganache_top.name = "ganache_top";
  topping_group.add(ganache_top);

  const cocoa_moundGeom = new THREE.ConeGeometry(0.22, 0.18, 24, 4);
  const cocoa_mound = new THREE.Mesh(cocoa_moundGeom, cocoaMat);
  cocoa_mound.name = "cocoa_mound";
  cocoa_mound.position.set(0.015, 1.085, 0.005);
  cocoa_mound.scale.set(1.0, 1.0, 0.82);
  topping_group.add(cocoa_mound);

  const cocoa_granulesGeom = new THREE.IcosahedronGeometry(1, 0);
  const cocoa_granules = new THREE.InstancedMesh(
    cocoa_granulesGeom,
    cocoaMat,
    90
  );
  cocoa_granules.name = "cocoa_granules";

  for (let i = 0; i < 90; i++) {
    let angle;
    let radius;
    let y;

    if (i < 72) {
      angle = i * 2.3999632297;
      radius = 0.225 * Math.sqrt((i + 0.5) / 72);
      y =
        1.005 +
        0.18 * Math.max(0, 1 - radius / 0.22) +
        0.008 * Math.sin(i * 2.4);
    } else {
      angle = i * 2.173;
      radius = 0.27 + 0.025 * ((i * 7) % 8);
      y = 0.998 + 0.004 * Math.cos(i * 1.6);
    }

    const size = 0.007 + 0.0022 * ((i * 11) % 7);
    instance_dummy.position.set(
      0.015 + Math.cos(angle) * radius,
      y,
      0.005 + Math.sin(angle) * radius * 0.82
    );
    instance_dummy.rotation.set(i * 0.43, i * 0.71, i * 0.29);
    instance_dummy.scale.set(
      size * (0.8 + 0.12 * ((i * 3) % 5)),
      size * (0.75 + 0.13 * ((i * 5) % 4)),
      size
    );
    instance_dummy.updateMatrix();
    cocoa_granules.setMatrixAt(i, instance_dummy.matrix);
  }
  cocoa_granules.instanceMatrix.needsUpdate = true;
  topping_group.add(cocoa_granules);

  const cocoa_clumpsGeom = new THREE.IcosahedronGeometry(1, 1);
  const cocoa_clumps = new THREE.InstancedMesh(
    cocoa_clumpsGeom,
    cocoa_lightMat,
    26
  );
  cocoa_clumps.name = "cocoa_clumps";

  for (let i = 0; i < 26; i++) {
    const angle = i * 2.3999632297 + 0.4;
    const radius = 0.18 * Math.sqrt((i + 0.8) / 26);
    const size = 0.014 + 0.004 * ((i * 5) % 6);

    instance_dummy.position.set(
      0.015 + Math.cos(angle) * radius,
      1.008 +
        0.145 * Math.max(0, 1 - radius / 0.19) +
        0.009 * Math.sin(i * 1.9),
      0.005 + Math.sin(angle) * radius * 0.82
    );
    instance_dummy.rotation.set(i * 0.51, i * 0.37, i * 0.83);
    instance_dummy.scale.set(
      size * 1.2,
      size * (0.8 + 0.1 * ((i * 3) % 4)),
      size
    );
    instance_dummy.updateMatrix();
    cocoa_clumps.setMatrixAt(i, instance_dummy.matrix);
  }
  cocoa_clumps.instanceMatrix.needsUpdate = true;
  topping_group.add(cocoa_clumps);

  const cocoa_specksGeom = new THREE.IcosahedronGeometry(1, 0);
  const cocoa_specks = new THREE.InstancedMesh(
    cocoa_specksGeom,
    cocoa_lightMat,
    42
  );
  cocoa_specks.name = "cocoa_specks";

  for (let i = 0; i < 42; i++) {
    const angle = i * 2.3999632297 + 0.25 * Math.sin(i * 1.7);
    const radius = 0.25 + 0.40 * (((i * 17) % 41) / 40);
    const s = radius / 0.755;
    const y =
      0.90 +
      0.105 * Math.max(0, 1 - s * s) +
      0.006 * Math.sin(i * 2.2);
    const size = 0.004 + 0.0015 * ((i * 9) % 6);

    instance_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius * 0.95
    );
    instance_dummy.rotation.set(i * 0.61, i * 0.33, i * 0.77);
    instance_dummy.scale.set(size * 1.3, size * 0.75, size);
    instance_dummy.updateMatrix();
    cocoa_specks.setMatrixAt(i, instance_dummy.matrix);
  }
  cocoa_specks.instanceMatrix.needsUpdate = true;
  topping_group.add(cocoa_specks);

  function fitToUnitCube(root) {
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

  fitToUnitCube(tart);
  return tart;
}