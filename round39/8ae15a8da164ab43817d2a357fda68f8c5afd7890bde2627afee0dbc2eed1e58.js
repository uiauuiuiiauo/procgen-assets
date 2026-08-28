export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_keyboard";

  const caseMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x0b0b0b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const white_keysMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ef,
    metalness: 0.0,
    roughness: 0.3,
  });
  const black_keysMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });
  const key_recessMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.8,
  });
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const status_lightMat = new THREE.MeshStandardMaterial({
    color: 0x9aa4a8,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x9aa4a8,
    emissiveIntensity: 1.0,
  });

  function makeRoundedSlabGeometry(width, depth, height, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -depth / 2;
    const z1 = depth / 2;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);

    return new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
  }

  const caseW = 6.8;
  const caseD = 2.1;
  const caseH = 0.56;

  const case_bodyGeom = makeRoundedSlabGeometry(
    caseW,
    caseD,
    caseH,
    0.16,
    0.035
  );
  const case_body = new THREE.Mesh(case_bodyGeom, caseMat);
  case_body.name = "case_body";
  case_body.rotation.x = -Math.PI / 2;
  case_body.position.y = 0.05;
  root.add(case_body);

  const underside_feetGeom = new THREE.BoxGeometry(0.48, 0.07, 0.28);
  const underside_feet = new THREE.InstancedMesh(
    underside_feetGeom,
    edgeMat,
    4
  );
  underside_feet.name = "underside_feet";
  const foot_dummy = new THREE.Object3D();
  const foot_positions = [
    [-2.75, -0.025, -0.72],
    [2.75, -0.025, -0.72],
    [-2.75, -0.025, 0.72],
    [2.75, -0.025, 0.72],
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    const p = foot_positions[i];
    foot_dummy.position.set(p[0], p[1], p[2]);
    foot_dummy.updateMatrix();
    underside_feet.setMatrixAt(i, foot_dummy.matrix);
  }
  underside_feet.instanceMatrix.needsUpdate = true;
  root.add(underside_feet);

  const key_recessGeom = new THREE.BoxGeometry(5.78, 0.022, 1.39);
  const key_recess = new THREE.Mesh(key_recessGeom, key_recessMat);
  key_recess.name = "key_recess";
  key_recess.position.set(0, 0.645, 0.02);
  root.add(key_recess);

  const whiteCount = 15;
  const whitePitch = 0.37;
  const whiteStart = -((whiteCount - 1) * whitePitch) / 2;

  const white_keysGeom = new THREE.BoxGeometry(0.35, 0.09, 1.18);
  const white_keys = new THREE.InstancedMesh(
    white_keysGeom,
    white_keysMat,
    whiteCount
  );
  white_keys.name = "white_keys";
  const white_dummy = new THREE.Object3D();
  for (let i = 0; i < whiteCount; i++) {
    white_dummy.position.set(whiteStart + i * whitePitch, 0.695, 0.02);
    white_dummy.updateMatrix();
    white_keys.setMatrixAt(i, white_dummy.matrix);
  }
  white_keys.instanceMatrix.needsUpdate = true;
  root.add(white_keys);

  const blackBoundaryIndices = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
  const black_keysGeom = makeRoundedSlabGeometry(
    0.205,
    0.72,
    0.105,
    0.025,
    0.012
  );
  const black_keys = new THREE.InstancedMesh(
    black_keysGeom,
    black_keysMat,
    blackBoundaryIndices.length
  );
  black_keys.name = "black_keys";
  const black_dummy = new THREE.Object3D();
  for (let i = 0; i < blackBoundaryIndices.length; i++) {
    const boundary = blackBoundaryIndices[i];
    const x = whiteStart + (boundary + 0.5) * whitePitch;
    black_dummy.position.set(x, 0.735, -0.25);
    black_dummy.rotation.set(-Math.PI / 2, 0, 0);
    black_dummy.updateMatrix();
    black_keys.setMatrixAt(i, black_dummy.matrix);
  }
  black_keys.instanceMatrix.needsUpdate = true;
  root.add(black_keys);

  const front_lipGeom = new THREE.BoxGeometry(5.88, 0.105, 0.11);
  const front_lip = new THREE.Mesh(front_lipGeom, edgeMat);
  front_lip.name = "front_lip";
  front_lip.position.set(0, 0.695, 0.695);
  root.add(front_lip);

  const rear_lipGeom = new THREE.BoxGeometry(5.88, 0.105, 0.11);
  const rear_lip = new THREE.Mesh(rear_lipGeom, edgeMat);
  rear_lip.name = "rear_lip";
  rear_lip.position.set(0, 0.695, -0.655);
  root.add(rear_lip);

  const left_key_cheekGeom = new THREE.BoxGeometry(0.14, 0.105, 1.34);
  const left_key_cheek = new THREE.Mesh(left_key_cheekGeom, edgeMat);
  left_key_cheek.name = "left_key_cheek";
  left_key_cheek.position.set(-2.9, 0.695, 0.02);
  root.add(left_key_cheek);

  const right_key_cheekGeom = new THREE.BoxGeometry(0.14, 0.105, 1.34);
  const right_key_cheek = new THREE.Mesh(right_key_cheekGeom, edgeMat);
  right_key_cheek.name = "right_key_cheek";
  right_key_cheek.position.set(2.9, 0.695, 0.02);
  root.add(right_key_cheek);

  const front_case_seamGeom = new THREE.BoxGeometry(6.35, 0.018, 0.014);
  const front_case_seam = new THREE.Mesh(front_case_seamGeom, edgeMat);
  front_case_seam.name = "front_case_seam";
  front_case_seam.position.set(0, 0.29, 1.086);
  root.add(front_case_seam);

  const status_lightGeom = new THREE.CylinderGeometry(
    0.038,
    0.038,
    0.014,
    16
  );
  const status_light = new THREE.Mesh(status_lightGeom, status_lightMat);
  status_light.name = "status_light";
  status_light.position.set(2.58, 0.655, -0.82);
  root.add(status_light);

  const brand_logo = new THREE.Group();
  brand_logo.name = "brand_logo";
  brand_logo.position.set(-2.57, 0.653, -0.82);

  const logo_ringGeom = new THREE.TorusGeometry(0.045, 0.008, 6, 18);
  const logo_ring = new THREE.Mesh(logo_ringGeom, logoMat);
  logo_ring.name = "logo_ring";
  logo_ring.rotation.x = -Math.PI / 2;
  logo_ring.position.x = -0.18;
  brand_logo.add(logo_ring);

  const logo_barGeom = new THREE.BoxGeometry(0.07, 0.009, 0.014);
  const logo_bar_one = new THREE.Mesh(logo_barGeom, logoMat);
  logo_bar_one.name = "logo_bar_one";
  logo_bar_one.position.set(-0.135, 0, 0.034);
  logo_bar_one.rotation.y = -0.45;
  brand_logo.add(logo_bar_one);

  const logo_bar_two = new THREE.Mesh(logo_barGeom, logoMat);
  logo_bar_two.name = "logo_bar_two";
  logo_bar_two.position.set(-0.135, 0, -0.034);
  logo_bar_two.rotation.y = 0.45;
  brand_logo.add(logo_bar_two);

  const logo_lettersGeom = new THREE.BoxGeometry(0.055, 0.009, 0.025);
  const logo_letters = new THREE.InstancedMesh(
    logo_lettersGeom,
    logoMat,
    4
  );
  logo_letters.name = "logo_letters";
  const logo_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    logo_dummy.position.set(-0.04 + i * 0.07, 0, 0);
    logo_dummy.rotation.y = i % 2 === 0 ? 0.12 : -0.12;
    logo_dummy.updateMatrix();
    logo_letters.setMatrixAt(i, logo_dummy.matrix);
  }
  logo_letters.instanceMatrix.needsUpdate = true;
  brand_logo.add(logo_letters);
  root.add(brand_logo);

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