export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "berry_cream_tart";

  const crust_group = new THREE.Group();
  crust_group.name = "crust_group";
  root.add(crust_group);

  const filling_group = new THREE.Group();
  filling_group.name = "filling_group";
  root.add(filling_group);

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xd9a04d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const crustLightMat = new THREE.MeshStandardMaterial({
    color: 0xefbb68,
    metalness: 0.0,
    roughness: 0.9,
  });
  const crustDarkMat = new THREE.MeshStandardMaterial({
    color: 0xb8732e,
    metalness: 0.0,
    roughness: 0.9,
  });
  const poreMat = new THREE.MeshStandardMaterial({
    color: 0x9c642b,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const fillingMat = new THREE.MeshStandardMaterial({
    color: 0xf27da7,
    metalness: 0.0,
    roughness: 0.4,
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xffe3ec,
    metalness: 0.0,
    roughness: 0.4,
  });
  const blackberryMat = new THREE.MeshStandardMaterial({
    color: 0x17111d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const raspberryMat = new THREE.MeshStandardMaterial({
    color: 0xb20b3d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const speckleMat = new THREE.MeshStandardMaterial({
    color: 0xc41450,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  function createFlutedTartGeometry() {
    const segments = 96;
    const flutes = 16;
    const ringY = [0.02, 0.065, 0.34, 0.49];
    const ringR = [0.455, 0.475, 0.545, 0.565];
    const ringA = [0.0, 0.012, 0.035, 0.025];
    const positions = [];
    const indices = [];

    for (let j = 0; j < ringY.length; j++) {
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const flute = 1 + ringA[j] * Math.cos(flutes * angle);
        const radius = ringR[j] * flute;
        positions.push(
          Math.cos(angle) * radius,
          ringY[j],
          Math.sin(angle) * radius
        );
      }
    }

    for (let j = 0; j < ringY.length - 1; j++) {
      for (let i = 0; i < segments; i++) {
        const a = j * (segments + 1) + i;
        const b = a + 1;
        const d = (j + 1) * (segments + 1) + i;
        const c = d + 1;
        indices.push(a, d, b, b, d, c);
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

  function creamSurfaceHeight(x, z) {
    const radius = Math.sqrt(x * x + z * z);
    const angle = Math.atan2(z, x);
    const u = Math.min(radius / 0.54, 1);
    const edge = Math.max(0, (u - 0.78) / 0.22);
    const base =
      0.558 +
      0.105 * (1 - u * u) +
      0.012 * Math.sin(3 * angle + 0.5) * u;

    let height = base - 0.026 * edge * edge;

    for (let k = 0; k < 12; k++) {
      const cx = 0.105 * Math.sin(k * 2.11 + 0.4);
      const cz = 0.105 * Math.cos(k * 1.47 + 0.2);
      const rx = 0.09 + 0.012 * (k % 3);
      const rz = 0.065 + 0.012 * ((k + 1) % 3);
      const dx = (x - cx) / rx;
      const dz = (z - cz) / rz;
      const amp = 0.026 + 0.006 * (k % 4);
      height += amp * Math.exp(-(dx * dx + dz * dz) * 1.8);
    }

    for (let k = 0; k < 8; k++) {
      const cx = 0.14 * Math.sin(k * 1.73 + 1.1);
      const cz = 0.14 * Math.cos(k * 2.03 + 0.7);
      const dx = (x - cx) / 0.075;
      const dz = (z - cz) / 0.06;
      const amp = 0.018 + 0.005 * (k % 3);
      height -= amp * Math.exp(-(dx * dx + dz * dz) * 2.2);
    }

    return height;
  }

  function createCreamSurfaceGeometry() {
    const radialRings = 12;
    const angularSegments = 64;
    const radius = 0.54;
    const positions = [];
    const indices = [];

    positions.push(0, creamSurfaceHeight(0, 0), 0);

    for (let ring = 1; ring <= radialRings; ring++) {
      const r = radius * ring / radialRings;
      for (let i = 0; i < angularSegments; i++) {
        const angle = i / angularSegments * Math.PI * 2;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        positions.push(x, creamSurfaceHeight(x, z), z);
      }
    }

    for (let i = 0; i < angularSegments; i++) {
      const current = 1 + i;
      const next = 1 + (i + 1) % angularSegments;
      indices.push(0, next, current);
    }

    for (let ring = 1; ring < radialRings; ring++) {
      const innerStart = 1 + (ring - 1) * angularSegments;
      const outerStart = 1 + ring * angularSegments;
      for (let i = 0; i < angularSegments; i++) {
        const next = (i + 1) % angularSegments;
        const a = innerStart + i;
        const b = innerStart + next;
        const c = outerStart + i;
        const d = outerStart + next;
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

  function createCreamEdgeGeometry() {
    const segments = 64;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const outerRadius =
        0.54 * (1 + 0.018 * Math.sin(5 * angle + 0.3));
      const innerRadius =
        0.485 * (1 + 0.012 * Math.cos(7 * angle + 0.5));
      const outerY =
        creamSurfaceHeight(
          Math.cos(angle) * outerRadius,
          Math.sin(angle) * outerRadius
        ) + 0.003;
      const innerY =
        creamSurfaceHeight(
          Math.cos(angle) * innerRadius,
          Math.sin(angle) * innerRadius
        ) + 0.002;

      positions.push(
        Math.cos(angle) * outerRadius,
        outerY,
        Math.sin(angle) * outerRadius,
        Math.cos(angle) * innerRadius,
        innerY,
        Math.sin(angle) * innerRadius
      );
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
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

  function createRimPath(radius, height, phase) {
    const points = [];
    const count = 64;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const r =
        radius +
        0.008 * Math.sin(5 * angle + phase) +
        0.004 * Math.sin(11 * angle - phase);
      const y =
        height +
        0.005 * Math.sin(7 * angle + phase) +
        0.003 * Math.cos(13 * angle);
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * r,
          y,
          Math.sin(angle) * r
        )
      );
    }
    return new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
  }

  const crust_shellGeom = createFlutedTartGeometry();
  const crust_shell = new THREE.Mesh(crust_shellGeom, crustMat);
  crust_shell.name = "crust_shell";
  crust_group.add(crust_shell);

  const crust_baseGeom = new THREE.CylinderGeometry(
    0.47,
    0.455,
    0.065,
    64
  );
  const crust_base = new THREE.Mesh(crust_baseGeom, crustDarkMat);
  crust_base.name = "crust_base";
  crust_base.position.y = 0.035;
  crust_group.add(crust_base);

  const bottom_crust_edgeGeom = new THREE.TubeGeometry(
    createRimPath(0.458, 0.034, 0.8),
    128,
    0.014,
    8,
    true
  );
  const bottom_crust_edge = new THREE.Mesh(
    bottom_crust_edgeGeom,
    crustDarkMat
  );
  bottom_crust_edge.name = "bottom_crust_edge";
  crust_group.add(bottom_crust_edge);

  const crust_rimGeom = new THREE.TubeGeometry(
    createRimPath(0.553, 0.505, 0.2),
    128,
    0.046,
    10,
    true
  );
  const crust_rim = new THREE.Mesh(crust_rimGeom, crustLightMat);
  crust_rim.name = "crust_rim";
  crust_group.add(crust_rim);

  const crust_inner_edgeGeom = new THREE.TubeGeometry(
    createRimPath(0.505, 0.526, 1.4),
    128,
    0.016,
    8,
    true
  );
  const crust_inner_edge = new THREE.Mesh(
    crust_inner_edgeGeom,
    crustDarkMat
  );
  crust_inner_edge.name = "crust_inner_edge";
  crust_group.add(crust_inner_edge);

  const poreGeom = new THREE.CircleGeometry(1, 10);
  const crust_pores = new THREE.InstancedMesh(
    poreGeom,
    poreMat,
    40
  );
  crust_pores.name = "crust_pores";

  const dummy = new THREE.Object3D();
  const localForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 40; i++) {
    const angle =
      i / 40 * Math.PI * 2 + 0.045 * Math.sin(i * 2.3);
    const y = 0.075 + ((i * 7) % 23) / 22 * 0.35;
    const t = y / 0.5;
    const radius =
      (0.47 + 0.09 * t) *
      (1 + (0.01 + 0.025 * t) * Math.cos(16 * angle));
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );
    const size = 0.006 + 0.004 * (0.5 + 0.5 * Math.sin(i * 4.1));

    dummy.position.set(
      normal.x * (radius + 0.003),
      y,
      normal.z * (radius + 0.003)
    );
    dummy.quaternion.setFromUnitVectors(localForward, normal);
    dummy.scale.set(size, size * (0.65 + 0.25 * (i % 3)), 1);
    dummy.updateMatrix();
    crust_pores.setMatrixAt(i, dummy.matrix);
  }
  crust_pores.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_pores);

  const rim_crumbGeom = new THREE.DodecahedronGeometry(1, 0);
  const rim_crumbs = new THREE.InstancedMesh(
    rim_crumbGeom,
    crustLightMat,
    32
  );
  rim_crumbs.name = "rim_crumbs";

  for (let i = 0; i < 32; i++) {
    const angle =
      i / 32 * Math.PI * 2 + 0.025 * Math.sin(i * 1.9);
    const radius = 0.552 + 0.012 * Math.sin(i * 2.7);
    const size = 0.011 + 0.006 * (0.5 + 0.5 * Math.cos(i * 3.4));

    dummy.position.set(
      Math.cos(angle) * radius,
      0.527 + 0.009 * Math.sin(i * 2.2),
      Math.sin(angle) * radius
    );
    dummy.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    dummy.scale.set(size * 1.2, size * 0.75, size);
    dummy.updateMatrix();
    rim_crumbs.setMatrixAt(i, dummy.matrix);
  }
  rim_crumbs.instanceMatrix.needsUpdate = true;
  crust_group.add(rim_crumbs);

  const toasted_spotGeom = new THREE.SphereGeometry(1, 10, 6);
  const toasted_spots = new THREE.InstancedMesh(
    toasted_spotGeom,
    crustDarkMat,
    24
  );
  toasted_spots.name = "toasted_spots";

  for (let i = 0; i < 24; i++) {
    const angle =
      i / 24 * Math.PI * 2 + 0.04 * Math.cos(i * 2.5);
    const radius = 0.552 + 0.013 * Math.sin(i * 1.8);

    dummy.position.set(
      Math.cos(angle) * radius,
      0.548 + 0.004 * Math.cos(i * 3.1),
      Math.sin(angle) * radius
    );
    dummy.rotation.set(0, -angle, 0);
    dummy.scale.set(
      0.012 + 0.004 * (i % 3),
      0.004,
      0.007 + 0.002 * ((i + 1) % 3)
    );
    dummy.updateMatrix();
    toasted_spots.setMatrixAt(i, dummy.matrix);
  }
  toasted_spots.instanceMatrix.needsUpdate = true;
  crust_group.add(toasted_spots);

  const berry_filling_baseGeom = new THREE.CylinderGeometry(
    0.505,
    0.49,
    0.105,
    64
  );
  const berry_filling_base = new THREE.Mesh(
    berry_filling_baseGeom,
    fillingMat
  );
  berry_filling_base.name = "berry_filling_base";
  berry_filling_base.position.y = 0.455;
  filling_group.add(berry_filling_base);

  const cream_fillingGeom = createCreamSurfaceGeometry();
  const cream_filling = new THREE.Mesh(
    cream_fillingGeom,
    fillingMat
  );
  cream_filling.name = "cream_filling";
  filling_group.add(cream_filling);

  const cream_edgeGeom = createCreamEdgeGeometry();
  const cream_edge = new THREE.Mesh(cream_edgeGeom, fillingMat);
  cream_edge.name = "cream_edge";
  filling_group.add(cream_edge);

  const cream_swells = new THREE.Group();
  cream_swells.name = "cream_swells";
  filling_group.add(cream_swells);

  const cream_dollops = new THREE.Group();
  cream_dollops.name = "cream_dollops";
  filling_group.add(cream_dollops);

  const berryData = [];
  const blackberryData = [];
  const raspberryData = [];

  for (let i = 0; i < 44; i++) {
    const angle = i * 2.399963 + 0.28;
    const radius =
      0.46 * Math.sqrt((i + 0.45) / 44);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const sx =
      0.023 + 0.011 * (0.5 + 0.5 * Math.sin(i * 1.73));
    const sy =
      0.017 + 0.009 * (0.5 + 0.5 * Math.cos(i * 2.17));
    const sz =
      0.022 + 0.01 * (0.5 + 0.5 * Math.sin(i * 2.91));
    const y = creamSurfaceHeight(x, z) + sy * 0.3;
    const item = { x, y, z, sx, sy, sz, i };

    berryData.push(item);
    if (i % 3 === 0 || i % 7 === 0) {
      raspberryData.push(item);
    } else {
      blackberryData.push(item);
    }
  }

  const berryGeom = new THREE.SphereGeometry(1, 16, 10);

  function setBerryInstances(mesh, data) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      dummy.position.set(item.x, item.y, item.z);
      dummy.rotation.set(
        0.12 * Math.sin(item.i),
        item.i * 0.73,
        0.1 * Math.cos(item.i * 1.4)
      );
      dummy.scale.set(item.sx, item.sy, item.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const blackberry_pieces = new THREE.InstancedMesh(
    berryGeom,
    blackberryMat,
    blackberryData.length
  );
  blackberry_pieces.name = "blackberry_pieces";
  setBerryInstances(blackberry_pieces, blackberryData);
  filling_group.add(blackberry_pieces);

  const raspberry_pieces = new THREE.InstancedMesh(
    berryGeom,
    raspberryMat,
    raspberryData.length
  );
  raspberry_pieces.name = "raspberry_pieces";
  setBerryInstances(raspberry_pieces, raspberryData);
  filling_group.add(raspberry_pieces);

  const berry_dimpleGeom = new THREE.TorusGeometry(
    0.007,
    0.0025,
    6,
    12
  );
  const berry_dimples = new THREE.InstancedMesh(
    berry_dimpleGeom,
    blackberryMat,
    berryData.length
  );
  berry_dimples.name = "berry_dimples";

  for (let i = 0; i < berryData.length; i++) {
    const item = berryData[i];
    dummy.position.set(
      item.x,
      item.y + item.sy * 0.88,
      item.z
    );
    dummy.rotation.set(Math.PI / 2, item.i * 0.57, 0);
    dummy.scale.setScalar(0.8 + 0.25 * (i % 3));
    dummy.updateMatrix();
    berry_dimples.setMatrixAt(i, dummy.matrix);
  }
  berry_dimples.instanceMatrix.needsUpdate = true;
  filling_group.add(berry_dimples);

  const speckleGeom = new THREE.CircleGeometry(1, 8);
  const pink_speckles = new THREE.InstancedMesh(
    speckleGeom,
    speckleMat,
    70
  );
  pink_speckles.name = "pink_speckles";

  for (let i = 0; i < 70; i++) {
    const angle = i * 2.399963 + 1.15;
    const radius =
      0.475 * Math.sqrt((i + 0.7) / 70);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const size =
      0.004 + 0.006 * (0.5 + 0.5 * Math.sin(i * 3.37));

    dummy.position.set(
      x,
      creamSurfaceHeight(x, z) + 0.003,
      z
    );
    dummy.rotation.set(-Math.PI / 2, 0, i * 0.61);
    dummy.scale.set(
      size,
      size * (0.65 + 0.25 * (i % 3)),
      1
    );
    dummy.updateMatrix();
    pink_speckles.setMatrixAt(i, dummy.matrix);
  }
  pink_speckles.instanceMatrix.needsUpdate = true;
  filling_group.add(pink_speckles);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    object.updateMatrixWorld(true);
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
}