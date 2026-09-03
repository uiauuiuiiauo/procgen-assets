export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "mixed_berry_tart";

  const crust_group = new THREE.Group();
  crust_group.name = "crust_group";
  root.add(crust_group);

  const filling_group = new THREE.Group();
  filling_group.name = "filling_group";
  root.add(filling_group);

  const berry_group = new THREE.Group();
  berry_group.name = "berry_group";
  root.add(berry_group);

  const crust_shellMat = new THREE.MeshStandardMaterial({
    color: 0xd9a052,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const crust_rimMat = new THREE.MeshStandardMaterial({
    color: 0xe5b263,
    metalness: 0.0,
    roughness: 0.9,
  });
  const toasted_crumbMat = new THREE.MeshStandardMaterial({
    color: 0xc77d32,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pale_crumbMat = new THREE.MeshStandardMaterial({
    color: 0xf0c77d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const custardMat = new THREE.MeshStandardMaterial({
    color: 0xf1d34f,
    metalness: 0.0,
    roughness: 0.4,
  });
  const berry_compoteMat = new THREE.MeshStandardMaterial({
    color: 0x760d31,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const dark_berryMat = new THREE.MeshStandardMaterial({
    color: 0x171326,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_berryMat = new THREE.MeshStandardMaterial({
    color: 0xa5163d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const berry_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xe8e5ec,
    metalness: 0.0,
    roughness: 0.3,
  });
  const berry_dimpleMat = new THREE.MeshStandardMaterial({
    color: 0x32101f,
    metalness: 0.0,
    roughness: 0.7,
  });

  function createFlutedShellGeometry() {
    const segments = 120;
    const flutes = 20;
    const levels = [
      { y: 0.00, radius: 0.580, amplitude: 0.012 },
      { y: 0.07, radius: 0.590, amplitude: 0.016 },
      { y: 0.31, radius: 0.675, amplitude: 0.027 },
      { y: 0.49, radius: 0.735, amplitude: 0.036 },
      { y: 0.55, radius: 0.765, amplitude: 0.042 },
    ];
    const positions = [];
    const indices = [];

    for (let j = 0; j < levels.length; j++) {
      const level = levels[j];
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const radius =
          level.radius + level.amplitude * Math.cos(flutes * angle);
        positions.push(
          Math.cos(angle) * radius,
          level.y,
          Math.sin(angle) * radius
        );
      }
    }

    const stride = segments + 1;
    for (let j = 0; j < levels.length - 1; j++) {
      for (let i = 0; i < segments; i++) {
        const a = j * stride + i;
        const b = a + 1;
        const c = (j + 1) * stride + i;
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

  const crust_shellGeom = createFlutedShellGeometry();
  const crust_shell = new THREE.Mesh(crust_shellGeom, crust_shellMat);
  crust_shell.name = "crust_shell";
  crust_group.add(crust_shell);

  const crust_baseGeom = new THREE.CylinderGeometry(
    0.59,
    0.585,
    0.065,
    80
  );
  const crust_base = new THREE.Mesh(crust_baseGeom, crust_shellMat);
  crust_base.name = "crust_base";
  crust_base.position.y = 0.0325;
  crust_group.add(crust_base);

  const crust_rim_points = [];
  for (let i = 0; i < 40; i++) {
    const angle = i / 40 * Math.PI * 2;
    const radius = 0.765 + 0.042 * Math.cos(20 * angle);
    const y = 0.552 + 0.006 * Math.sin(20 * angle);
    crust_rim_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      )
    );
  }
  const crust_rim_curve = new THREE.CatmullRomCurve3(
    crust_rim_points,
    true,
    "centripetal"
  );
  const crust_rimGeom = new THREE.TubeGeometry(
    crust_rim_curve,
    160,
    0.052,
    10,
    true
  );
  const crust_rim = new THREE.Mesh(crust_rimGeom, crust_rimMat);
  crust_rim.name = "crust_rim";
  crust_group.add(crust_rim);

  const crust_toasted_ridgesGeom = new THREE.SphereGeometry(1, 12, 8);
  const crust_toasted_ridges = new THREE.InstancedMesh(
    crust_toasted_ridgesGeom,
    toasted_crumbMat,
    20
  );
  crust_toasted_ridges.name = "crust_toasted_ridges";
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    const radius = 0.765 + 0.042 * Math.cos(20 * angle);
    ridge_dummy.position.set(
      Math.cos(angle) * radius,
      0.596 + 0.004 * Math.sin(20 * angle),
      Math.sin(angle) * radius
    );
    ridge_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    ridge_dummy.scale.set(0.044, 0.011, 0.016);
    ridge_dummy.updateMatrix();
    crust_toasted_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  crust_toasted_ridges.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_toasted_ridges);

  const crust_crumbsGeom = new THREE.SphereGeometry(1, 8, 6);
  const crust_crumbs = new THREE.InstancedMesh(
    crust_crumbsGeom,
    pale_crumbMat,
    52
  );
  crust_crumbs.name = "crust_crumbs";
  const crumb_dummy = new THREE.Object3D();
  for (let i = 0; i < 52; i++) {
    const angle = i * 2.399963229728653;
    const fraction = ((i * 17) % 53) / 52;
    const y = 0.045 + fraction * 0.45;
    const amplitude = 0.012 + fraction * 0.030;
    const radius =
      0.58 + fraction * 0.18 - amplitude + amplitude * Math.cos(20 * angle) + 0.005;
    const size = 0.006 + ((i * 7) % 9) * 0.0008;
    crumb_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    crumb_dummy.rotation.set(0, angle, 0);
    crumb_dummy.scale.set(size * 0.75, size, size * 0.55);
    crumb_dummy.updateMatrix();
    crust_crumbs.setMatrixAt(i, crumb_dummy.matrix);
  }
  crust_crumbs.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_crumbs);

  const custardGeom = new THREE.CylinderGeometry(0.685, 0.665, 0.05, 96);
  const custard = new THREE.Mesh(custardGeom, custardMat);
  custard.name = "custard";
  custard.position.y = 0.505;
  filling_group.add(custard);

  const berry_compoteShape = new THREE.Shape();
  const compote_points = 28;
  for (let i = 0; i < compote_points; i++) {
    const angle = i / compote_points * Math.PI * 2;
    const radius =
      0.535 +
      0.035 * Math.sin(5 * angle) +
      0.018 * Math.cos(9 * angle);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) berry_compoteShape.moveTo(x, y);
    else berry_compoteShape.lineTo(x, y);
  }
  berry_compoteShape.closePath();

  const berry_compoteGeom = new THREE.ShapeGeometry(berry_compoteShape, 1);
  const berry_compote = new THREE.Mesh(
    berry_compoteGeom,
    berry_compoteMat
  );
  berry_compote.name = "berry_compote";
  berry_compote.rotation.x = -Math.PI / 2;
  berry_compote.position.y = 0.535;
  filling_group.add(berry_compote);

  const berry_compote_lobesGeom = new THREE.SphereGeometry(1, 18, 10);
  const berry_compote_lobes = new THREE.InstancedMesh(
    berry_compote_lobesGeom,
    berry_compoteMat,
    11
  );
  berry_compote_lobes.name = "berry_compote_lobes";
  const compote_dummy = new THREE.Object3D();
  for (let i = 0; i < 11; i++) {
    const angle = i / 11 * Math.PI * 2 + 0.13 * Math.sin(i * 1.7);
    const radius = 0.29 + 0.13 * ((i * 5) % 11) / 10;
    compote_dummy.position.set(
      Math.cos(angle) * radius,
      0.538,
      Math.sin(angle) * radius
    );
    compote_dummy.rotation.set(0, angle + i * 0.31, 0);
    compote_dummy.scale.set(
      0.145 + 0.018 * (i % 3),
      0.012,
      0.105 + 0.014 * ((i + 1) % 3)
    );
    compote_dummy.updateMatrix();
    berry_compote_lobes.setMatrixAt(i, compote_dummy.matrix);
  }
  berry_compote_lobes.instanceMatrix.needsUpdate = true;
  filling_group.add(berry_compote_lobes);

  const dark_berryGeom = new THREE.SphereGeometry(1, 28, 18);
  const dark_berry_data = [
    [ 0.00, 0.690,  0.300, 0.132, 0.125, 0.128],
    [ 0.01, 0.720, -0.290, 0.138, 0.132, 0.132],
    [ 0.22, 0.710, -0.190, 0.128, 0.136, 0.126],
    [-0.22, 0.700, -0.180, 0.136, 0.130, 0.130],
    [ 0.31, 0.655,  0.015, 0.130, 0.122, 0.126],
    [-0.31, 0.645,  0.020, 0.132, 0.120, 0.128],
    [ 0.00, 0.640, -0.020, 0.142, 0.135, 0.138],
    [-0.18, 0.790, -0.020, 0.126, 0.138, 0.124],
    [ 0.00, 0.840,  0.020, 0.140, 0.150, 0.136],
    [ 0.18, 0.790, -0.010, 0.128, 0.140, 0.126],
  ];
  const dark_berries = new THREE.InstancedMesh(
    dark_berryGeom,
    dark_berryMat,
    dark_berry_data.length
  );
  dark_berries.name = "dark_berries";
  const dark_berry_dummy = new THREE.Object3D();
  for (let i = 0; i < dark_berry_data.length; i++) {
    const b = dark_berry_data[i];
    dark_berry_dummy.position.set(b[0], b[1], b[2]);
    dark_berry_dummy.rotation.set(
      0.03 * Math.sin(i * 1.3),
      i * 0.47,
      0.04 * Math.cos(i * 1.1)
    );
    dark_berry_dummy.scale.set(b[3], b[4], b[5]);
    dark_berry_dummy.updateMatrix();
    dark_berries.setMatrixAt(i, dark_berry_dummy.matrix);
  }
  dark_berries.instanceMatrix.needsUpdate = true;
  berry_group.add(dark_berries);

  const red_berryGeom = dark_berryGeom;
  const red_berry_data = [
    [-0.36, 0.625,  0.200, 0.140, 0.120, 0.132],
    [ 0.36, 0.625,  0.210, 0.142, 0.122, 0.135],
    [ 0.44, 0.615,  0.000, 0.135, 0.118, 0.130],
    [-0.44, 0.610, -0.010, 0.132, 0.116, 0.128],
    [ 0.34, 0.625, -0.200, 0.142, 0.124, 0.135],
    [-0.34, 0.620, -0.210, 0.138, 0.121, 0.132],
    [ 0.17, 0.615,  0.330, 0.135, 0.116, 0.130],
    [-0.16, 0.610,  0.340, 0.132, 0.114, 0.128],
  ];
  const red_berries = new THREE.InstancedMesh(
    red_berryGeom,
    red_berryMat,
    red_berry_data.length
  );
  red_berries.name = "red_berries";
  const red_berry_dummy = new THREE.Object3D();
  for (let i = 0; i < red_berry_data.length; i++) {
    const b = red_berry_data[i];
    red_berry_dummy.position.set(b[0], b[1], b[2]);
    red_berry_dummy.rotation.set(
      0.04 * Math.cos(i * 1.2),
      i * 0.53,
      0.035 * Math.sin(i * 1.4)
    );
    red_berry_dummy.scale.set(b[3], b[4], b[5]);
    red_berry_dummy.updateMatrix();
    red_berries.setMatrixAt(i, red_berry_dummy.matrix);
  }
  red_berries.instanceMatrix.needsUpdate = true;
  berry_group.add(red_berries);

  const all_berry_data = dark_berry_data.concat(red_berry_data);
  const berry_highlightsGeom = new THREE.SphereGeometry(1, 12, 8);
  const berry_highlights = new THREE.InstancedMesh(
    berry_highlightsGeom,
    berry_highlightMat,
    all_berry_data.length
  );
  berry_highlights.name = "berry_highlights";
  const highlight_dummy = new THREE.Object3D();
  for (let i = 0; i < all_berry_data.length; i++) {
    const b = all_berry_data[i];
    highlight_dummy.position.set(
      b[0] - b[3] * 0.34,
      b[1] + b[4] * 0.70,
      b[2] + b[5] * 0.64
    );
    highlight_dummy.rotation.set(0, i * 0.41, -0.25);
    highlight_dummy.scale.set(
      b[3] * 0.18,
      b[4] * 0.10,
      b[5] * 0.13
    );
    highlight_dummy.updateMatrix();
    berry_highlights.setMatrixAt(i, highlight_dummy.matrix);
  }
  berry_highlights.instanceMatrix.needsUpdate = true;
  berry_group.add(berry_highlights);

  const berry_dimplesGeom = new THREE.TorusGeometry(
    0.015,
    0.004,
    6,
    14
  );
  const berry_dimples = new THREE.InstancedMesh(
    berry_dimplesGeom,
    berry_dimpleMat,
    6
  );
  berry_dimples.name = "berry_dimples";
  const dimple_indices = [0, 1, 2, 3, 7, 8];
  const dimple_dummy = new THREE.Object3D();
  for (let i = 0; i < dimple_indices.length; i++) {
    const b = dark_berry_data[dimple_indices[i]];
    dimple_dummy.position.set(
      b[0] + b[3] * 0.10,
      b[1] + b[4] * 0.91,
      b[2] + b[5] * 0.20
    );
    dimple_dummy.rotation.set(-Math.PI / 2, 0, i * 0.5);
    dimple_dummy.scale.setScalar(0.85 + 0.08 * (i % 3));
    dimple_dummy.updateMatrix();
    berry_dimples.setMatrixAt(i, dimple_dummy.matrix);
  }
  berry_dimples.instanceMatrix.needsUpdate = true;
  berry_group.add(berry_dimples);

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