export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_piano_keyboard";

  const chassis = new THREE.Group();
  chassis.name = "chassis";
  root.add(chassis);

  const keybed = new THREE.Group();
  keybed.name = "keybed";
  root.add(keybed);

  const markings = new THREE.Group();
  markings.name = "markings";
  root.add(markings);

  const caseMat = new THREE.MeshStandardMaterial({
    color: 0x242526,
    metalness: 0.0,
    roughness: 0.8,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x111213,
    metalness: 0.0,
    roughness: 0.8,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8,
  });
  const white_keysMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1eb,
    metalness: 0.0,
    roughness: 0.3,
  });
  const black_keysMat = new THREE.MeshStandardMaterial({
    color: 0x151617,
    metalness: 0.0,
    roughness: 0.3,
  });
  const felt_stripMat = new THREE.MeshStandardMaterial({
    color: 0x5b181b,
    metalness: 0.0,
    roughness: 0.95,
  });
  const brand_markMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const status_ledMat = new THREE.MeshStandardMaterial({
    color: 0x777879,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x777879,
    emissiveIntensity: 1.0,
  });

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const lower_baseGeom = new THREE.BoxGeometry(2.72, 0.18, 1.04);
  const lower_base = new THREE.Mesh(lower_baseGeom, caseMat);
  lower_base.name = "lower_base";
  lower_base.position.set(0, 0.09, 0);
  chassis.add(lower_base);

  const keybed_supportGeom = new THREE.BoxGeometry(2.38, 0.11, 0.78);
  const keybed_support = new THREE.Mesh(keybed_supportGeom, edgeMat);
  keybed_support.name = "keybed_support";
  keybed_support.position.set(0, 0.205, 0.09);
  chassis.add(keybed_support);

  const rear_housingGeom = new THREE.BoxGeometry(2.46, 0.27, 0.34);
  const rear_housing = new THREE.Mesh(rear_housingGeom, caseMat);
  rear_housing.name = "rear_housing";
  rear_housing.position.set(0, 0.315, -0.37);
  chassis.add(rear_housing);

  const end_capsGeom = new THREE.BoxGeometry(0.16, 0.34, 1.08);
  const end_caps = new THREE.InstancedMesh(end_capsGeom, caseMat, 2);
  end_caps.name = "end_caps";
  setInstance(end_caps, 0, -1.28, 0.19, 0, 0, 0, 0);
  setInstance(end_caps, 1, 1.28, 0.19, 0, 0, 0, 0);
  end_caps.instanceMatrix.needsUpdate = true;
  chassis.add(end_caps);

  const front_lipGeom = new THREE.BoxGeometry(2.38, 0.09, 0.08);
  const front_lip = new THREE.Mesh(front_lipGeom, edgeMat);
  front_lip.name = "front_lip";
  front_lip.position.set(0, 0.185, 0.505);
  chassis.add(front_lip);

  const control_panelGeom = new THREE.BoxGeometry(2.34, 0.018, 0.25);
  const control_panel = new THREE.Mesh(control_panelGeom, edgeMat);
  control_panel.name = "control_panel";
  control_panel.position.set(0, 0.458, -0.37);
  chassis.add(control_panel);

  const whiteKeyCount = 15;
  const whiteKeyPitch = 0.15;
  const white_keysGeom = new THREE.BoxGeometry(0.143, 0.075, 0.68);
  const white_keys = new THREE.InstancedMesh(
    white_keysGeom,
    white_keysMat,
    whiteKeyCount
  );
  white_keys.name = "white_keys";
  for (let i = 0; i < whiteKeyCount; i++) {
    const x = (i - (whiteKeyCount - 1) / 2) * whiteKeyPitch;
    setInstance(white_keys, i, x, 0.2825, 0.1, 0, 0, 0);
  }
  white_keys.instanceMatrix.needsUpdate = true;
  keybed.add(white_keys);

  const blackKeyBoundaries = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
  const black_keysGeom = new THREE.BoxGeometry(0.082, 0.105, 0.39);
  const black_keys = new THREE.InstancedMesh(
    black_keysGeom,
    black_keysMat,
    blackKeyBoundaries.length
  );
  black_keys.name = "black_keys";
  for (let i = 0; i < blackKeyBoundaries.length; i++) {
    const boundary = blackKeyBoundaries[i];
    const x = (boundary - 6.5) * whiteKeyPitch;
    setInstance(black_keys, i, x, 0.3525, -0.015, 0, 0, 0);
  }
  black_keys.instanceMatrix.needsUpdate = true;
  keybed.add(black_keys);

  const black_key_frontsGeom = new THREE.BoxGeometry(0.082, 0.06, 0.038);
  const black_key_fronts = new THREE.InstancedMesh(
    black_key_frontsGeom,
    black_keysMat,
    blackKeyBoundaries.length
  );
  black_key_fronts.name = "black_key_fronts";
  for (let i = 0; i < blackKeyBoundaries.length; i++) {
    const boundary = blackKeyBoundaries[i];
    const x = (boundary - 6.5) * whiteKeyPitch;
    setInstance(black_key_fronts, i, x, 0.33, 0.178, 0, 0, 0);
  }
  black_key_fronts.instanceMatrix.needsUpdate = true;
  keybed.add(black_key_fronts);

  const felt_stripGeom = new THREE.BoxGeometry(2.29, 0.018, 0.035);
  const felt_strip = new THREE.Mesh(felt_stripGeom, felt_stripMat);
  felt_strip.name = "felt_strip";
  felt_strip.position.set(0, 0.323, -0.238);
  keybed.add(felt_strip);

  const rear_key_shadowGeom = new THREE.BoxGeometry(2.3, 0.025, 0.026);
  const rear_key_shadow = new THREE.Mesh(rear_key_shadowGeom, recessMat);
  rear_key_shadow.name = "rear_key_shadow";
  rear_key_shadow.position.set(0, 0.326, -0.258);
  keybed.add(rear_key_shadow);

  const side_key_recessesGeom = new THREE.BoxGeometry(0.02, 0.035, 0.66);
  const side_key_recesses = new THREE.InstancedMesh(
    side_key_recessesGeom,
    recessMat,
    2
  );
  side_key_recesses.name = "side_key_recesses";
  setInstance(side_key_recesses, 0, -1.183, 0.29, 0.1, 0, 0, 0);
  setInstance(side_key_recesses, 1, 1.183, 0.29, 0.1, 0, 0, 0);
  side_key_recesses.instanceMatrix.needsUpdate = true;
  keybed.add(side_key_recesses);

  const brand_mark = new THREE.Group();
  brand_mark.name = "brand_mark";
  brand_mark.position.set(-0.91, 0.474, -0.36);
  markings.add(brand_mark);

  function addMarkBar(width, depth, x, z) {
    const mark_bar = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.008, depth),
      brand_markMat
    );
    mark_bar.position.set(x, 0, z);
    brand_mark.add(mark_bar);
  }

  addMarkBar(0.045, 0.008, 0, -0.045);
  addMarkBar(0.045, 0.008, 0, 0.045);
  addMarkBar(0.008, 0.09, -0.019, 0);
  addMarkBar(0.008, 0.09, 0.019, 0);
  addMarkBar(0.034, 0.008, 0.065, 0);
  addMarkBar(0.008, 0.058, 0.045, 0.02);
  addMarkBar(0.034, 0.008, 0.12, 0);
  addMarkBar(0.008, 0.058, 0.1, 0.02);
  addMarkBar(0.008, 0.058, 0.14, 0.02);

  const status_ledGeom = new THREE.CylinderGeometry(0.013, 0.013, 0.009, 16);
  const status_led = new THREE.Mesh(status_ledGeom, status_ledMat);
  status_led.name = "status_led";
  status_led.position.set(0.93, 0.474, -0.36);
  markings.add(status_led);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}