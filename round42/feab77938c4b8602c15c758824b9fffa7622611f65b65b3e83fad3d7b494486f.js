export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "root";

  const tool = new THREE.Group();
  tool.name = "tool";
  tool.rotation.y = 0.28;
  tool.rotation.z = 0.14;
  root.add(tool);

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  tool.add(body_group);

  const nozzle_group = new THREE.Group();
  nozzle_group.name = "nozzle_group";
  tool.add(nozzle_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.0,
    roughness: 0.8
  });

  const red_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xff2b20,
    metalness: 0.0,
    roughness: 0.3
  });

  const rear_barrelProfile = [
    new THREE.Vector2(0.00, -2.25),
    new THREE.Vector2(0.30, -2.25),
    new THREE.Vector2(0.38, -2.22),
    new THREE.Vector2(0.43, -2.15),
    new THREE.Vector2(0.45, -2.05),
    new THREE.Vector2(0.45, -0.32),
    new THREE.Vector2(0.445, -0.25),
    new THREE.Vector2(0.00, -0.25)
  ];
  const rear_barrelGeom = new THREE.LatheGeometry(rear_barrelProfile, 48);
  const rear_barrel = new THREE.Mesh(rear_barrelGeom, bodyMat);
  rear_barrel.name = "rear_barrel";
  rear_barrel.rotation.z = -Math.PI / 2;
  body_group.add(rear_barrel);

  const front_barrelProfile = [
    new THREE.Vector2(0.00, -0.24),
    new THREE.Vector2(0.44, -0.24),
    new THREE.Vector2(0.455, -0.18),
    new THREE.Vector2(0.455, 1.50),
    new THREE.Vector2(0.45, 1.60),
    new THREE.Vector2(0.42, 1.68),
    new THREE.Vector2(0.37, 1.73),
    new THREE.Vector2(0.00, 1.73)
  ];
  const front_barrelGeom = new THREE.LatheGeometry(front_barrelProfile, 48);
  const front_barrel = new THREE.Mesh(front_barrelGeom, bodyMat);
  front_barrel.name = "front_barrel";
  front_barrel.rotation.z = -Math.PI / 2;
  body_group.add(front_barrel);

  const center_seamGeom = new THREE.TorusGeometry(0.447, 0.014, 10, 48);
  const center_seam = new THREE.Mesh(center_seamGeom, seamMat);
  center_seam.name = "center_seam";
  center_seam.rotation.y = Math.PI / 2;
  center_seam.position.x = -0.245;
  body_group.add(center_seam);

  const front_faceGeom = new THREE.CylinderGeometry(0.355, 0.355, 0.035, 40);
  const front_face = new THREE.Mesh(front_faceGeom, seamMat);
  front_face.name = "front_face";
  front_face.rotation.z = -Math.PI / 2;
  front_face.position.x = 1.735;
  body_group.add(front_face);

  const front_rimGeom = new THREE.TorusGeometry(0.392, 0.052, 12, 48);
  const front_rim = new THREE.Mesh(front_rimGeom, bodyMat);
  front_rim.name = "front_rim";
  front_rim.rotation.y = Math.PI / 2;
  front_rim.position.x = 1.72;
  body_group.add(front_rim);

  const red_insertGeom = new THREE.CylinderGeometry(0.30, 0.30, 0.10, 40);
  const red_insert = new THREE.Mesh(red_insertGeom, red_plasticMat);
  red_insert.name = "red_insert";
  red_insert.rotation.z = -Math.PI / 2;
  red_insert.position.x = 1.79;
  nozzle_group.add(red_insert);

  const red_insert_rimGeom = new THREE.TorusGeometry(0.267, 0.034, 12, 40);
  const red_insert_rim = new THREE.Mesh(red_insert_rimGeom, red_plasticMat);
  red_insert_rim.name = "red_insert_rim";
  red_insert_rim.rotation.y = Math.PI / 2;
  red_insert_rim.position.x = 1.84;
  nozzle_group.add(red_insert_rim);

  const nozzle_baseGeom = new THREE.CylinderGeometry(0.145, 0.245, 0.30, 40);
  const nozzle_base = new THREE.Mesh(nozzle_baseGeom, red_plasticMat);
  nozzle_base.name = "nozzle_base";
  nozzle_base.rotation.z = -Math.PI / 2;
  nozzle_base.position.x = 1.96;
  nozzle_group.add(nozzle_base);

  const nozzle_tipGeom = new THREE.CylinderGeometry(0.052, 0.145, 0.68, 40);
  const nozzle_tip = new THREE.Mesh(nozzle_tipGeom, red_plasticMat);
  nozzle_tip.name = "nozzle_tip";
  nozzle_tip.rotation.z = -Math.PI / 2;
  nozzle_tip.position.x = 2.43;
  nozzle_group.add(nozzle_tip);

  const nozzle_endGeom = new THREE.SphereGeometry(0.055, 24, 12);
  const nozzle_end = new THREE.Mesh(nozzle_endGeom, red_plasticMat);
  nozzle_end.name = "nozzle_end";
  nozzle_end.position.x = 2.77;
  nozzle_end.scale.set(1.15, 0.9, 0.9);
  nozzle_group.add(nozzle_end);

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