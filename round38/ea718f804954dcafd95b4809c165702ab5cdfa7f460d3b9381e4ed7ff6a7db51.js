export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_cross_assembly";

  const stand_woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a5b37,
    metalness: 0.0,
    roughness: 0.6,
  });
  const shaft_woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6840,
    metalness: 0.0,
    roughness: 0.6,
  });
  const horn_woodMat = new THREE.MeshStandardMaterial({
    color: 0x66371f,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x422719,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x21110b,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  function roundedRectGeometry(width, height, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 3,
      curveSegments: 8,
    });
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  const stand_group = new THREE.Group();
  stand_group.name = "stand_group";
  root.add(stand_group);

  const vertical_postGeom = roundedRectGeometry(0.135, 2.5, 0.105, 0.035);
  const vertical_post = new THREE.Mesh(vertical_postGeom, stand_woodMat);
  vertical_post.name = "vertical_post";
  vertical_post.position.set(0.1, 0, -0.055);
  stand_group.add(vertical_post);

  const crossbarGeom = roundedRectGeometry(0.55, 0.11, 0.1, 0.03);
  const crossbar = new THREE.Mesh(crossbarGeom, stand_woodMat);
  crossbar.name = "crossbar";
  crossbar.position.set(-0.17, 0.68, -0.04);
  stand_group.add(crossbar);

  const vertical_post_grainGeom = new THREE.BoxGeometry(0.004, 0.18, 0.003);
  const vertical_post_grain = new THREE.InstancedMesh(
    vertical_post_grainGeom,
    grainMat,
    18
  );
  vertical_post_grain.name = "vertical_post_grain";
  const post_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const px = 0.1 + (((i * 5) % 9) - 4) * 0.011;
    const py = -1.12 + i * (2.24 / 17);
    post_grain_dummy.position.set(px, py, 0.01);
    post_grain_dummy.rotation.set(0, 0, ((i % 5) - 2) * 0.012);
    post_grain_dummy.scale.set(1, 0.45 + (i % 4) * 0.22, 1);
    post_grain_dummy.updateMatrix();
    vertical_post_grain.setMatrixAt(i, post_grain_dummy.matrix);
  }
  vertical_post_grain.instanceMatrix.needsUpdate = true;
  stand_group.add(vertical_post_grain);

  const crossbar_grainGeom = new THREE.BoxGeometry(0.14, 0.0035, 0.003);
  const crossbar_grain = new THREE.InstancedMesh(crossbar_grainGeom, grainMat, 5);
  crossbar_grain.name = "crossbar_grain";
  const crossbar_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    crossbar_grain_dummy.position.set(
      -0.34 + (i % 2) * 0.1,
      0.68 + (i - 2) * 0.015,
      0.018
    );
    crossbar_grain_dummy.rotation.set(0, 0, ((i % 3) - 1) * 0.018);
    crossbar_grain_dummy.scale.set(0.7 + (i % 3) * 0.2, 1, 1);
    crossbar_grain_dummy.updateMatrix();
    crossbar_grain.setMatrixAt(i, crossbar_grain_dummy.matrix);
  }
  crossbar_grain.instanceMatrix.needsUpdate = true;
  stand_group.add(crossbar_grain);

  const horn_group = new THREE.Group();
  horn_group.name = "horn_group";
  horn_group.position.set(-0.55, -1.05, 0.1);
  const horn_direction = new THREE.Vector3(0.74, 0.67, 0.04).normalize();
  horn_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    horn_direction
  );
  root.add(horn_group);

  const long_wooden_shaftGeom = new THREE.CylinderGeometry(
    0.057,
    0.047,
    1.95,
    24,
    4
  );
  const long_wooden_shaft = new THREE.Mesh(
    long_wooden_shaftGeom,
    shaft_woodMat
  );
  long_wooden_shaft.name = "long_wooden_shaft";
  long_wooden_shaft.position.y = 0.975;
  horn_group.add(long_wooden_shaft);

  const shaft_bottom_capGeom = new THREE.SphereGeometry(0.047, 20, 12);
  const shaft_bottom_cap = new THREE.Mesh(shaft_bottom_capGeom, shaft_woodMat);
  shaft_bottom_cap.name = "shaft_bottom_cap";
  shaft_bottom_cap.position.y = 0;
  shaft_bottom_cap.scale.set(1, 0.7, 1);
  horn_group.add(shaft_bottom_cap);

  const shaft_grainGeom = new THREE.BoxGeometry(0.003, 0.2, 0.003);
  const shaft_grain = new THREE.InstancedMesh(shaft_grainGeom, grainMat, 10);
  shaft_grain.name = "shaft_grain";
  const shaft_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    const angle = -1.05 + (i % 5) * 0.525;
    const radius = 0.052;
    shaft_grain_dummy.position.set(
      Math.sin(angle) * radius,
      0.22 + i * 0.17,
      Math.cos(angle) * radius
    );
    shaft_grain_dummy.rotation.set(0, angle, ((i % 4) - 1.5) * 0.018);
    shaft_grain_dummy.scale.set(1, 0.55 + (i % 4) * 0.22, 1);
    shaft_grain_dummy.updateMatrix();
    shaft_grain.setMatrixAt(i, shaft_grain_dummy.matrix);
  }
  shaft_grain.instanceMatrix.needsUpdate = true;
  horn_group.add(shaft_grain);

  const shaft_collarProfile = [
    new THREE.Vector2(0.058, 1.88),
    new THREE.Vector2(0.065, 1.91),
    new THREE.Vector2(0.078, 1.94),
    new THREE.Vector2(0.085, 1.98),
    new THREE.Vector2(0.081, 2.02),
    new THREE.Vector2(0.069, 2.055),
    new THREE.Vector2(0.064, 2.08),
  ];
  const shaft_collarGeom = new THREE.LatheGeometry(shaft_collarProfile, 32);
  const shaft_collar = new THREE.Mesh(shaft_collarGeom, horn_woodMat);
  shaft_collar.name = "shaft_collar";
  horn_group.add(shaft_collar);

  const collar_ringGeom = new THREE.TorusGeometry(0.073, 0.009, 8, 32);
  const collar_ring = new THREE.Mesh(collar_ringGeom, horn_woodMat);
  collar_ring.name = "collar_ring";
  collar_ring.rotation.x = Math.PI / 2;
  collar_ring.position.y = 1.965;
  horn_group.add(collar_ring);

  const horn_bellProfile = [
    new THREE.Vector2(0.064, 2.04),
    new THREE.Vector2(0.071, 2.09),
    new THREE.Vector2(0.078, 2.15),
    new THREE.Vector2(0.102, 2.21),
    new THREE.Vector2(0.155, 2.27),
    new THREE.Vector2(0.215, 2.32),
    new THREE.Vector2(0.242, 2.37),
    new THREE.Vector2(0.239, 2.405),
    new THREE.Vector2(0.216, 2.405),
    new THREE.Vector2(0.205, 2.37),
    new THREE.Vector2(0.17, 2.33),
    new THREE.Vector2(0.116, 2.28),
    new THREE.Vector2(0.073, 2.22),
    new THREE.Vector2(0.052, 2.16),
    new THREE.Vector2(0.047, 2.1),
    new THREE.Vector2(0.05, 2.05),
  ];
  const horn_bellGeom = new THREE.LatheGeometry(horn_bellProfile, 48);
  const horn_bell = new THREE.Mesh(horn_bellGeom, horn_woodMat);
  horn_bell.name = "horn_bell";
  horn_group.add(horn_bell);

  const bell_lipGeom = new THREE.TorusGeometry(0.228, 0.014, 10, 48);
  const bell_lip = new THREE.Mesh(bell_lipGeom, horn_woodMat);
  bell_lip.name = "bell_lip";
  bell_lip.rotation.x = Math.PI / 2;
  bell_lip.position.y = 2.403;
  horn_group.add(bell_lip);

  const bell_interiorGeom = new THREE.CircleGeometry(0.105, 32);
  const bell_interior = new THREE.Mesh(bell_interiorGeom, interiorMat);
  bell_interior.name = "bell_interior";
  bell_interior.rotation.x = -Math.PI / 2;
  bell_interior.position.y = 2.285;
  horn_group.add(bell_interior);

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