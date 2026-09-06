export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "mini_keyboard";

  const chassis = new THREE.Group();
  chassis.name = "chassis";
  root.add(chassis);

  const keyboard = new THREE.Group();
  keyboard.name = "keyboard";
  root.add(keyboard);

  const caseMat = new THREE.MeshStandardMaterial({
    color: 0x151719,
    metalness: 0.0,
    roughness: 0.6,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x101112,
    metalness: 0.0,
    roughness: 0.6,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.0,
    roughness: 0.8,
  });
  const white_keysMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1eb,
    metalness: 0.0,
    roughness: 0.3,
  });
  const black_keysMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_felt_stripMat = new THREE.MeshStandardMaterial({
    color: 0x9e1015,
    metalness: 0.0,
    roughness: 0.95,
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function roundedPlateGeometry(width, depth, thickness, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -depth / 2;
    const y1 = depth / 2;
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 5,
    });
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }

  const lower_caseGeom = roundedPlateGeometry(5.4, 1.62, 0.25, 0.13, 0.025);
  const lower_case = new THREE.Mesh(lower_caseGeom, caseMat);
  lower_case.name = "lower_case";
  lower_case.position.y = 0.125;
  chassis.add(lower_case);

  const key_recessGeom = roundedPlateGeometry(4.68, 1.14, 0.018, 0.07, 0.006);
  const key_recess = new THREE.Mesh(key_recessGeom, recessMat);
  key_recess.name = "key_recess";
  key_recess.position.set(0, 0.16, 0);
  chassis.add(key_recess);

  const top_frameGeom = roundedPlateGeometry(5.3, 1.5, 0.105, 0.11, 0.014);
  const top_frame = new THREE.Mesh(top_frameGeom, frameMat);
  top_frame.name = "top_frame";
  top_frame.position.y = 0.255;
  chassis.add(top_frame);

  const front_lipGeom = new THREE.BoxGeometry(4.72, 0.065, 0.075);
  const front_lip = new THREE.Mesh(front_lipGeom, frameMat);
  front_lip.name = "front_lip";
  front_lip.position.set(0, 0.232, 0.615);
  chassis.add(front_lip);

  const rear_lipGeom = new THREE.BoxGeometry(4.72, 0.065, 0.075);
  const rear_lip = new THREE.Mesh(rear_lipGeom, frameMat);
  rear_lip.name = "rear_lip";
  rear_lip.position.set(0, 0.232, -0.615);
  chassis.add(rear_lip);

  const keybedGeom = new THREE.BoxGeometry(4.56, 0.035, 1.04);
  const keybed = new THREE.Mesh(keybedGeom, recessMat);
  keybed.name = "keybed";
  keybed.position.set(0, 0.17, 0);
  keyboard.add(keybed);

  const red_felt_stripGeom = new THREE.BoxGeometry(4.42, 0.018, 0.055);
  const red_felt_strip = new THREE.Mesh(red_felt_stripGeom, red_felt_stripMat);
  red_felt_strip.name = "red_felt_strip";
  red_felt_strip.position.set(0, 0.28, -0.455);
  keyboard.add(red_felt_strip);

  const whiteCount = 15;
  const keyPitch = 0.295;
  const white_keysGeom = roundedPlateGeometry(0.278, 0.94, 0.09, 0.018, 0.006);
  const white_keys = new THREE.InstancedMesh(white_keysGeom, white_keysMat, whiteCount);
  white_keys.name = "white_keys";
  white_keys.frustumCulled = false;

  const white_key_transform = new THREE.Object3D();
  for (let i = 0; i < whiteCount; i++) {
    const x = (i - (whiteCount - 1) / 2) * keyPitch;
    white_key_transform.position.set(x, 0.27, 0.035);
    white_key_transform.rotation.set(0, 0, 0);
    white_key_transform.scale.set(1, 1, 1);
    white_key_transform.updateMatrix();
    white_keys.setMatrixAt(i, white_key_transform.matrix);
  }
  white_keys.instanceMatrix.needsUpdate = true;
  keyboard.add(white_keys);

  const blackKeyIndices = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
  const black_keysGeom = roundedPlateGeometry(0.145, 0.57, 0.11, 0.018, 0.008);
  const black_keys = new THREE.InstancedMesh(
    black_keysGeom,
    black_keysMat,
    blackKeyIndices.length
  );
  black_keys.name = "black_keys";
  black_keys.frustumCulled = false;

  const black_key_transform = new THREE.Object3D();
  for (let i = 0; i < blackKeyIndices.length; i++) {
    const whiteIndex = blackKeyIndices[i];
    const x = (whiteIndex - (whiteCount - 2) / 2) * keyPitch;
    black_key_transform.position.set(x, 0.385, -0.18);
    black_key_transform.rotation.set(0, 0, 0);
    black_key_transform.scale.set(1, 1, 1);
    black_key_transform.updateMatrix();
    black_keys.setMatrixAt(i, black_key_transform.matrix);
  }
  black_keys.instanceMatrix.needsUpdate = true;
  keyboard.add(black_keys);

  const screwGeom = new THREE.CylinderGeometry(0.024, 0.024, 0.012, 16);
  const frame_screws = new THREE.InstancedMesh(screwGeom, screwMat, 2);
  frame_screws.name = "frame_screws";
  frame_screws.frustumCulled = false;

  const screw_transform = new THREE.Object3D();
  const screwPositions = [
    [-2.31, 0.274, -0.56],
    [2.31, 0.274, -0.56],
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    const position = screwPositions[i];
    screw_transform.position.set(position[0], position[1], position[2]);
    screw_transform.rotation.set(0, 0, 0);
    screw_transform.scale.set(1, 1, 1);
    screw_transform.updateMatrix();
    frame_screws.setMatrixAt(i, screw_transform.matrix);
  }
  frame_screws.instanceMatrix.needsUpdate = true;
  chassis.add(frame_screws);

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