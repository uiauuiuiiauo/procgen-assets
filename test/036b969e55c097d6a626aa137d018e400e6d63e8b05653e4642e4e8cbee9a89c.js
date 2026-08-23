export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_keyed_flute";

  const instrument = new THREE.Group();
  instrument.name = "instrument";
  instrument.rotation.z = -0.9;
  root.add(instrument);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8b3f18,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4c1d0c,
    metalness: 0.0,
    roughness: 0.6,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8,
  });

  const bell_end_bodyGeom = new THREE.CylinderGeometry(
    0.148,
    0.18,
    1.25,
    40
  );
  const bell_end_body = new THREE.Mesh(bell_end_bodyGeom, woodMat);
  bell_end_body.name = "bell_end_body";
  bell_end_body.position.y = -1.075;
  instrument.add(bell_end_body);

  const main_bodyGeom = new THREE.CylinderGeometry(
    0.126,
    0.15,
    2.15,
    40
  );
  const main_body = new THREE.Mesh(main_bodyGeom, woodMat);
  main_body.name = "main_body";
  main_body.position.y = 0.325;
  instrument.add(main_body);

  const upper_bodyGeom = new THREE.CylinderGeometry(
    0.12,
    0.126,
    0.97,
    40
  );
  const upper_body = new THREE.Mesh(upper_bodyGeom, woodMat);
  upper_body.name = "upper_body";
  upper_body.position.y = 1.815;
  instrument.add(upper_body);

  const mouthpiece_sectionGeom = new THREE.CylinderGeometry(
    0.13,
    0.12,
    0.43,
    40
  );
  const mouthpiece_section = new THREE.Mesh(mouthpiece_sectionGeom, woodMat);
  mouthpiece_section.name = "mouthpiece_section";
  mouthpiece_section.position.y = 2.515;
  instrument.add(mouthpiece_section);

  const mouthpiece_capGeom = new THREE.SphereGeometry(0.13, 32, 16);
  const mouthpiece_cap = new THREE.Mesh(mouthpiece_capGeom, woodMat);
  mouthpiece_cap.name = "mouthpiece_cap";
  mouthpiece_cap.position.y = 2.73;
  mouthpiece_cap.scale.set(1, 0.75, 1);
  instrument.add(mouthpiece_cap);

  const lower_ferruleGeom = new THREE.CylinderGeometry(
    0.134,
    0.134,
    0.19,
    40
  );
  const lower_ferrule = new THREE.Mesh(lower_ferruleGeom, silverMat);
  lower_ferrule.name = "lower_ferrule";
  lower_ferrule.position.y = 1.32;
  instrument.add(lower_ferrule);

  const upper_ferruleGeom = new THREE.CylinderGeometry(
    0.128,
    0.128,
    0.14,
    40
  );
  const upper_ferrule = new THREE.Mesh(upper_ferruleGeom, silverMat);
  upper_ferrule.name = "upper_ferrule";
  upper_ferrule.position.y = 2.3;
  instrument.add(upper_ferrule);

  const ferrule_edge_bandsGeom = new THREE.TorusGeometry(
    0.13,
    0.006,
    8,
    32
  );
  const ferrule_edge_bands = new THREE.InstancedMesh(
    ferrule_edge_bandsGeom,
    silverMat,
    4
  );
  ferrule_edge_bands.name = "ferrule_edge_bands";

  const dummy = new THREE.Object3D();
  const ferruleEdges = [1.225, 1.415, 2.23, 2.37];
  for (let i = 0; i < ferruleEdges.length; i++) {
    dummy.position.set(0, ferruleEdges[i], 0);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    ferrule_edge_bands.setMatrixAt(i, dummy.matrix);
  }
  ferrule_edge_bands.instanceMatrix.needsUpdate = true;
  instrument.add(ferrule_edge_bands);

  const bell_rimGeom = new THREE.TorusGeometry(0.16, 0.022, 12, 40);
  const bell_rim = new THREE.Mesh(bell_rimGeom, darkWoodMat);
  bell_rim.name = "bell_rim";
  bell_rim.rotation.x = Math.PI / 2;
  bell_rim.position.y = -1.7;
  instrument.add(bell_rim);

  const bell_openingGeom = new THREE.CylinderGeometry(
    0.139,
    0.139,
    0.012,
    40
  );
  const bell_opening = new THREE.Mesh(bell_openingGeom, holeMat);
  bell_opening.name = "bell_opening";
  bell_opening.position.y = -1.704;
  instrument.add(bell_opening);

  const wood_grain_lines = new THREE.Group();
  wood_grain_lines.name = "wood_grain_lines";
  instrument.add(wood_grain_lines);

  function bodyRadiusAt(y) {
    if (y < -1.7) return 0.18;
    if (y < -0.45) {
      const t = (y + 1.7) / 1.25;
      return 0.18 + (0.148 - 0.18) * t;
    }
    if (y < 1.4) {
      const t = (y + 0.45) / 1.85;
      return 0.15 + (0.126 - 0.15) * t;
    }
    if (y < 2.3) {
      const t = (y - 1.4) / 0.9;
      return 0.126 + (0.12 - 0.126) * t;
    }
    return 0.125;
  }

  for (let i = 0; i < 7; i++) {
    const points = [];
    const start = -1.6 + (i % 3) * 0.12;
    const end = 2.62 - ((i + 1) % 3) * 0.1;
    const baseAngle = -0.9 + i * 0.3;
    for (let j = 0; j <= 12; j++) {
      const t = j / 12;
      const y = start + (end - start) * t;
      const angle =
        baseAngle + 0.025 * Math.sin((j + 1) * (i + 2) * 0.63);
      const radius = bodyRadiusAt(y) + 0.0025;
      points.push(
        new THREE.Vector3(
          Math.sin(angle) * radius,
          y,
          Math.cos(angle) * radius
        )
      );
    }
    const grainCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const grainGeom = new THREE.TubeGeometry(
      grainCurve,
      36,
      0.0025,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grainGeom, darkWoodMat);
    grain_line.name = "wood_grain_line";
    wood_grain_lines.add(grain_line);
  }

  const keyData = [
    [-0.58, 0.158, 0.92],
    [-0.25, 0.154, 1.0],
    [0.07, 0.15, 0.94],
    [0.36, 0.147, 1.03],
    [0.65, 0.144, 0.96],
    [0.91, 0.141, 1.0],
    [1.14, 0.138, 0.92],
  ];

  const tone_hole_insetsGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.012,
    24
  );
  const tone_hole_insets = new THREE.InstancedMesh(
    tone_hole_insetsGeom,
    holeMat,
    keyData.length
  );
  tone_hole_insets.name = "tone_hole_insets";

  const key_cupsGeom = new THREE.TorusGeometry(0.064, 0.012, 10, 28);
  const key_cups = new THREE.InstancedMesh(
    key_cupsGeom,
    silverMat,
    keyData.length
  );
  key_cups.name = "key_cups";

  const key_pad_facesGeom = new THREE.CylinderGeometry(
    0.049,
    0.049,
    0.008,
    24
  );
  const key_pad_faces = new THREE.InstancedMesh(
    key_pad_facesGeom,
    silverMat,
    keyData.length
  );
  key_pad_faces.name = "key_pad_faces";

  const key_leversGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.24,
    10
  );
  const key_levers = new THREE.InstancedMesh(
    key_leversGeom,
    silverMat,
    keyData.length
  );
  key_levers.name = "key_levers";

  const key_touchpiecesGeom = new THREE.SphereGeometry(0.03, 16, 10);
  const key_touchpieces = new THREE.InstancedMesh(
    key_touchpiecesGeom,
    silverMat,
    keyData.length
  );
  key_touchpieces.name = "key_touchpieces";

  const key_postsGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    0.05,
    10
  );
  const key_posts = new THREE.InstancedMesh(
    key_postsGeom,
    silverMat,
    keyData.length
  );
  key_posts.name = "key_posts";

  const pivot_ball_jointsGeom = new THREE.SphereGeometry(0.021, 14, 8);
  const pivot_ball_joints = new THREE.InstancedMesh(
    pivot_ball_jointsGeom,
    silverMat,
    keyData.length
  );
  pivot_ball_joints.name = "pivot_ball_joints";

  for (let i = 0; i < keyData.length; i++) {
    const y = keyData[i][0];
    const radius = keyData[i][1];
    const scale = keyData[i][2];

    dummy.position.set(0, y, radius - 0.006);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    tone_hole_insets.setMatrixAt(i, dummy.matrix);

    dummy.position.set(0, y, radius + 0.008);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    key_cups.setMatrixAt(i, dummy.matrix);

    dummy.position.set(0, y, radius + 0.019);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    key_pad_faces.setMatrixAt(i, dummy.matrix);

    dummy.position.set(0.075, y + 0.025, radius + 0.036);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    key_levers.setMatrixAt(i, dummy.matrix);

    dummy.position.set(0.145, y + 0.04, radius + 0.038);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1.25, 0.65, 0.55);
    dummy.updateMatrix();
    key_touchpieces.setMatrixAt(i, dummy.matrix);

    dummy.position.set(-0.085, y + 0.02, radius + 0.02);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    key_posts.setMatrixAt(i, dummy.matrix);

    dummy.position.set(-0.085, y + 0.02, radius + 0.047);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    pivot_ball_joints.setMatrixAt(i, dummy.matrix);
  }

  tone_hole_insets.instanceMatrix.needsUpdate = true;
  key_cups.instanceMatrix.needsUpdate = true;
  key_pad_faces.instanceMatrix.needsUpdate = true;
  key_levers.instanceMatrix.needsUpdate = true;
  key_touchpieces.instanceMatrix.needsUpdate = true;
  key_posts.instanceMatrix.needsUpdate = true;
  pivot_ball_joints.instanceMatrix.needsUpdate = true;

  instrument.add(
    tone_hole_insets,
    key_cups,
    key_pad_faces,
    key_levers,
    key_touchpieces,
    key_posts,
    pivot_ball_joints
  );

  const main_key_rodGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    1.88,
    12
  );
  const main_key_rod = new THREE.Mesh(main_key_rodGeom, silverMat);
  main_key_rod.name = "main_key_rod";
  main_key_rod.position.set(-0.085, 0.3, 0.181);
  instrument.add(main_key_rod);

  const secondary_key_rodGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    1.42,
    10
  );
  const secondary_key_rod = new THREE.Mesh(
    secondary_key_rodGeom,
    silverMat
  );
  secondary_key_rod.name = "secondary_key_rod";
  secondary_key_rod.position.set(0.045, 0.54, 0.176);
  instrument.add(secondary_key_rod);

  const key_linkages = new THREE.Group();
  key_linkages.name = "key_linkages";
  instrument.add(key_linkages);

  for (let i = 0; i < keyData.length; i++) {
    const y = keyData[i][0];
    const radius = keyData[i][1];
    const points = [
      new THREE.Vector3(-0.085, y + 0.02, radius + 0.047),
      new THREE.Vector3(-0.035, y + 0.038, radius + 0.052),
      new THREE.Vector3(0.045, y + 0.04, radius + 0.038),
    ];
    const linkageCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const linkageGeom = new THREE.TubeGeometry(
      linkageCurve,
      10,
      0.008,
      7,
      false
    );
    const linkage = new THREE.Mesh(linkageGeom, silverMat);
    linkage.name = "key_linkage";
    key_linkages.add(linkage);
  }

  const rod_end_knobsGeom = new THREE.SphereGeometry(0.022, 14, 8);
  const rod_end_knobs = new THREE.InstancedMesh(
    rod_end_knobsGeom,
    silverMat,
    4
  );
  rod_end_knobs.name = "rod_end_knobs";

  const rodEndPositions = [
    [-0.085, -0.64, 0.181],
    [-0.085, 1.24, 0.181],
    [0.045, -0.17, 0.176],
    [0.045, 1.25, 0.176],
  ];
  for (let i = 0; i < rodEndPositions.length; i++) {
    const p = rodEndPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rod_end_knobs.setMatrixAt(i, dummy.matrix);
  }
  rod_end_knobs.instanceMatrix.needsUpdate = true;
  instrument.add(rod_end_knobs);

  const lower_solitary_keyGeom = new THREE.TorusGeometry(
    0.057,
    0.011,
    10,
    28
  );
  const lower_solitary_key = new THREE.Mesh(
    lower_solitary_keyGeom,
    silverMat
  );
  lower_solitary_key.name = "lower_solitary_key";
  lower_solitary_key.position.set(-0.018, -1.34, 0.178);
  instrument.add(lower_solitary_key);

  const lower_solitary_insetGeom = new THREE.CylinderGeometry(
    0.046,
    0.046,
    0.01,
    24
  );
  const lower_solitary_inset = new THREE.Mesh(
    lower_solitary_insetGeom,
    holeMat
  );
  lower_solitary_inset.name = "lower_solitary_inset";
  lower_solitary_inset.rotation.x = Math.PI / 2;
  lower_solitary_inset.position.set(-0.018, -1.34, 0.169);
  instrument.add(lower_solitary_inset);

  const lower_solitary_touchGeom = new THREE.SphereGeometry(0.025, 14, 8);
  const lower_solitary_touch = new THREE.Mesh(
    lower_solitary_touchGeom,
    silverMat
  );
  lower_solitary_touch.name = "lower_solitary_touch";
  lower_solitary_touch.position.set(0.055, -1.285, 0.187);
  lower_solitary_touch.scale.set(1.25, 0.65, 0.5);
  instrument.add(lower_solitary_touch);

  const lower_solitary_leverGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.018, -1.34, 0.184),
      new THREE.Vector3(0.055, -1.285, 0.187)
    ),
    4,
    0.008,
    7,
    false
  );
  const lower_solitary_lever = new THREE.Mesh(
    lower_solitary_leverGeom,
    silverMat
  );
  lower_solitary_lever.name = "lower_solitary_lever";
  instrument.add(lower_solitary_lever);

  const side_register_keyGeom = new THREE.CylinderGeometry(
    0.038,
    0.038,
    0.012,
    20
  );
  const side_register_key = new THREE.Mesh(
    side_register_keyGeom,
    silverMat
  );
  side_register_key.name = "side_register_key";
  side_register_key.rotation.x = Math.PI / 2;
  side_register_key.position.set(0.055, 1.12, 0.143);
  instrument.add(side_register_key);

  const side_register_touchGeom = new THREE.SphereGeometry(0.023, 14, 8);
  const side_register_touch = new THREE.Mesh(
    side_register_touchGeom,
    silverMat
  );
  side_register_touch.name = "side_register_touch";
  side_register_touch.position.set(0.09, 1.16, 0.153);
  side_register_touch.scale.set(0.75, 1.15, 0.45);
  instrument.add(side_register_touch);

  const side_register_leverGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.055, 1.12, 0.148),
      new THREE.Vector3(0.09, 1.16, 0.153)
    ),
    3,
    0.007,
    7,
    false
  );
  const side_register_lever = new THREE.Mesh(
    side_register_leverGeom,
    silverMat
  );
  side_register_lever.name = "side_register_lever";
  instrument.add(side_register_lever);

  const screw_headsGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.008,
    12
  );
  const screw_heads = new THREE.InstancedMesh(
    screw_headsGeom,
    holeMat,
    3
  );
  screw_heads.name = "screw_heads";

  const screwPositions = [
    [0.071, -0.38, 0.158],
    [-0.071, 0.82, 0.151],
    [0.063, 1.19, 0.143],
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    const p = screwPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    screw_heads.setMatrixAt(i, dummy.matrix);
  }
  screw_heads.instanceMatrix.needsUpdate = true;
  instrument.add(screw_heads);

  fitToUnitCube(THREE, root);
  return root;

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
}