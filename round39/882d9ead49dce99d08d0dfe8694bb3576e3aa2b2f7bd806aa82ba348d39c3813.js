export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "olive_plastic_canister";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x53613a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const raisedMat = new THREE.MeshStandardMaterial({
    color: 0x5b6941,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x485633,
    metalness: 0.0,
    roughness: 0.8,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x171b12,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.00, -1.10),
    new THREE.Vector2(0.39, -1.10),
    new THREE.Vector2(0.43, -1.03),
    new THREE.Vector2(0.45, -0.88),
    new THREE.Vector2(0.45, 0.98),
    new THREE.Vector2(0.44, 1.10),
    new THREE.Vector2(0.40, 1.18),
    new THREE.Vector2(0.35, 1.22),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 48);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  main_body.rotation.x = Math.PI / 2;
  root.add(main_body);

  const front_assembly = new THREE.Group();
  front_assembly.name = "front_assembly";
  root.add(front_assembly);

  const front_lipGeom = new THREE.TorusGeometry(0.34, 0.08, 16, 48);
  const front_lip = new THREE.Mesh(front_lipGeom, bodyMat);
  front_lip.name = "front_lip";
  front_lip.position.z = 1.22;
  front_assembly.add(front_lip);

  const front_inner_wallGeom = new THREE.CylinderGeometry(
    0.265,
    0.265,
    0.20,
    40,
    1,
    true
  );
  const front_inner_wall = new THREE.Mesh(front_inner_wallGeom, interiorMat);
  front_inner_wall.name = "front_inner_wall";
  front_inner_wall.rotation.x = Math.PI / 2;
  front_inner_wall.position.z = 1.16;
  front_assembly.add(front_inner_wall);

  const front_cavityGeom = new THREE.CircleGeometry(0.264, 40);
  const front_cavity = new THREE.Mesh(front_cavityGeom, interiorMat);
  front_cavity.name = "front_cavity";
  front_cavity.position.z = 1.055;
  front_assembly.add(front_cavity);

  const front_inner_ridgeGeom = new THREE.TorusGeometry(0.225, 0.014, 10, 40);
  const front_inner_ridge = new THREE.Mesh(front_inner_ridgeGeom, bodyMat);
  front_inner_ridge.name = "front_inner_ridge";
  front_inner_ridge.position.z = 1.225;
  front_assembly.add(front_inner_ridge);

  const rear_assembly = new THREE.Group();
  rear_assembly.name = "rear_assembly";
  root.add(rear_assembly);

  const rear_capProfile = [
    new THREE.Vector2(0.00, -0.42),
    new THREE.Vector2(0.34, -0.42),
    new THREE.Vector2(0.40, -0.39),
    new THREE.Vector2(0.44, -0.31),
    new THREE.Vector2(0.45, -0.20),
    new THREE.Vector2(0.45, 0.22),
    new THREE.Vector2(0.43, 0.31),
    new THREE.Vector2(0.38, 0.38),
    new THREE.Vector2(0.00, 0.39),
  ];
  const rear_capGeom = new THREE.LatheGeometry(rear_capProfile, 48);
  const rear_cap = new THREE.Mesh(rear_capGeom, bodyMat);
  rear_cap.name = "rear_cap";
  rear_cap.rotation.x = Math.PI / 2;
  rear_cap.position.z = -1.38;
  rear_assembly.add(rear_cap);

  const rear_collarGeom = new THREE.TorusGeometry(0.43, 0.055, 14, 48);
  const rear_collar = new THREE.Mesh(rear_collarGeom, bodyMat);
  rear_collar.name = "rear_collar";
  rear_collar.position.z = -1.06;
  rear_assembly.add(rear_collar);

  const rear_collar_highlightGeom = new THREE.TorusGeometry(
    0.435,
    0.018,
    10,
    48
  );
  const rear_collar_highlight = new THREE.Mesh(
    rear_collar_highlightGeom,
    raisedMat
  );
  rear_collar_highlight.name = "rear_collar_highlight";
  rear_collar_highlight.position.z = -0.985;
  rear_assembly.add(rear_collar_highlight);

  const longitudinal_ribsGeom = new THREE.CapsuleGeometry(
    0.022,
    1.72,
    4,
    8
  );
  const longitudinal_ribs = new THREE.InstancedMesh(
    longitudinal_ribsGeom,
    raisedMat,
    4
  );
  longitudinal_ribs.name = "longitudinal_ribs";

  const ribDummy = new THREE.Object3D();
  const ribAngles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
  for (let i = 0; i < ribAngles.length; i++) {
    const angle = ribAngles[i];
    ribDummy.position.set(
      Math.cos(angle) * 0.448,
      Math.sin(angle) * 0.448,
      0.05
    );
    ribDummy.rotation.set(Math.PI / 2, 0, 0);
    ribDummy.scale.set(1, 1, 1);
    ribDummy.updateMatrix();
    longitudinal_ribs.setMatrixAt(i, ribDummy.matrix);
  }
  longitudinal_ribs.instanceMatrix.needsUpdate = true;
  root.add(longitudinal_ribs);

  const label_panelShape = new THREE.Shape();
  label_panelShape.moveTo(-0.18, -0.28);
  label_panelShape.lineTo(0.18, -0.28);
  label_panelShape.lineTo(0.22, -0.24);
  label_panelShape.lineTo(0.22, 0.24);
  label_panelShape.lineTo(0.18, 0.28);
  label_panelShape.lineTo(-0.18, 0.28);
  label_panelShape.lineTo(-0.22, 0.24);
  label_panelShape.lineTo(-0.22, -0.24);
  label_panelShape.closePath();

  const label_panelGeom = new THREE.ExtrudeGeometry(label_panelShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  const label_panel = new THREE.Mesh(label_panelGeom, panelMat);
  label_panel.name = "label_panel";
  label_panel.rotation.x = -Math.PI / 2;
  label_panel.position.set(0, 0.438, -0.55);
  root.add(label_panel);

  const label_border = new THREE.Group();
  label_border.name = "label_border";

  const label_border_barGeom = new THREE.BoxGeometry(1, 1, 1);

  function addBorderBar(name, x, y, z, sx, sy, sz) {
    const bar = new THREE.Mesh(label_border_barGeom, raisedMat);
    bar.name = name;
    bar.position.set(x, y, z);
    bar.scale.set(sx, sy, sz);
    label_border.add(bar);
    return bar;
  }

  addBorderBar(
    "label_border_front",
    0,
    0.472,
    -0.265,
    0.42,
    0.018,
    0.022
  );
  addBorderBar(
    "label_border_rear",
    0,
    0.472,
    -0.835,
    0.42,
    0.018,
    0.022
  );
  addBorderBar(
    "label_border_left",
    -0.21,
    0.472,
    -0.55,
    0.022,
    0.018,
    0.54
  );
  addBorderBar(
    "label_border_right",
    0.21,
    0.472,
    -0.55,
    0.022,
    0.018,
    0.54
  );
  root.add(label_border);

  const label_emblemGeom = new THREE.TorusGeometry(0.055, 0.011, 8, 24);
  const label_emblem = new THREE.Mesh(label_emblemGeom, raisedMat);
  label_emblem.name = "label_emblem";
  label_emblem.rotation.x = Math.PI / 2;
  label_emblem.position.set(-0.085, 0.49, -0.405);
  root.add(label_emblem);

  const label_emblem_centerGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.016,
    16
  );
  const label_emblem_center = new THREE.Mesh(
    label_emblem_centerGeom,
    raisedMat
  );
  label_emblem_center.name = "label_emblem_center";
  label_emblem_center.position.set(-0.085, 0.49, -0.405);
  root.add(label_emblem_center);

  const label_text_line_1Geom = new THREE.BoxGeometry(0.19, 0.014, 0.018);
  const label_text_line_1 = new THREE.Mesh(
    label_text_line_1Geom,
    raisedMat
  );
  label_text_line_1.name = "label_text_line_1";
  label_text_line_1.position.set(0.055, 0.49, -0.50);
  root.add(label_text_line_1);

  const label_text_line_2Geom = new THREE.BoxGeometry(0.15, 0.014, 0.018);
  const label_text_line_2 = new THREE.Mesh(
    label_text_line_2Geom,
    raisedMat
  );
  label_text_line_2.name = "label_text_line_2";
  label_text_line_2.position.set(0.035, 0.49, -0.55);
  root.add(label_text_line_2);

  const label_text_line_3Geom = new THREE.BoxGeometry(0.11, 0.014, 0.018);
  const label_text_line_3 = new THREE.Mesh(
    label_text_line_3Geom,
    raisedMat
  );
  label_text_line_3.name = "label_text_line_3";
  label_text_line_3.position.set(0.015, 0.49, -0.60);
  root.add(label_text_line_3);

  const label_code_blocksGeom = new THREE.BoxGeometry(0.028, 0.014, 0.038);
  const label_code_blocks = new THREE.InstancedMesh(
    label_code_blocksGeom,
    raisedMat,
    4
  );
  label_code_blocks.name = "label_code_blocks";

  const codeDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    codeDummy.position.set(-0.11 + i * 0.052, 0.49, -0.70);
    codeDummy.rotation.set(0, 0, 0);
    codeDummy.scale.set(1, 1, 1);
    codeDummy.updateMatrix();
    label_code_blocks.setMatrixAt(i, codeDummy.matrix);
  }
  label_code_blocks.instanceMatrix.needsUpdate = true;
  root.add(label_code_blocks);

  const label_roundelGeom = new THREE.TorusGeometry(0.055, 0.012, 8, 24);
  const label_roundel = new THREE.Mesh(label_roundelGeom, raisedMat);
  label_roundel.name = "label_roundel";
  label_roundel.rotation.x = Math.PI / 2;
  label_roundel.position.set(0.085, 0.49, -0.70);
  root.add(label_roundel);

  const orientation_mark = new THREE.Group();
  orientation_mark.name = "orientation_mark";

  const orientation_ringGeom = new THREE.TorusGeometry(
    0.135,
    0.018,
    10,
    32
  );
  const orientation_ring = new THREE.Mesh(
    orientation_ringGeom,
    raisedMat
  );
  orientation_ring.name = "orientation_ring";
  orientation_ring.rotation.x = Math.PI / 2;
  orientation_ring.position.set(0, 0.472, 0.20);
  orientation_mark.add(orientation_ring);

  const orientation_stemGeom = new THREE.CapsuleGeometry(
    0.022,
    0.13,
    4,
    8
  );
  const orientation_stem = new THREE.Mesh(
    orientation_stemGeom,
    raisedMat
  );
  orientation_stem.name = "orientation_stem";

  const stemStart = new THREE.Vector3(-0.10, 0.472, 0.31);
  const stemEnd = new THREE.Vector3(-0.24, 0.472, 0.44);
  const stemDirection = new THREE.Vector3()
    .subVectors(stemEnd, stemStart)
    .normalize();

  orientation_stem.position.copy(stemStart).add(stemEnd).multiplyScalar(0.5);
  orientation_stem.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    stemDirection
  );
  orientation_mark.add(orientation_stem);

  const orientation_crossbarGeom = new THREE.CapsuleGeometry(
    0.017,
    0.09,
    4,
    8
  );
  const orientation_crossbar = new THREE.Mesh(
    orientation_crossbarGeom,
    raisedMat
  );
  orientation_crossbar.name = "orientation_crossbar";
  orientation_crossbar.position.set(-0.205, 0.474, 0.405);
  orientation_crossbar.rotation.set(Math.PI / 2, 0, -0.35);
  orientation_mark.add(orientation_crossbar);

  root.add(orientation_mark);

  function fitToUnitCube(THREE, object) {
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

  fitToUnitCube(THREE, root);
  return root;
}