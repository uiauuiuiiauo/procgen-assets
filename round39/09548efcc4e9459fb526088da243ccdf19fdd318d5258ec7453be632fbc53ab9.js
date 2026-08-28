export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_airship";

  const envelopeMat = new THREE.MeshStandardMaterial({
    color: 0xb5b8b2,
    metalness: 0.0,
    roughness: 0.95,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x666a65,
    metalness: 0.0,
    roughness: 0.8,
  });
  const tail_finMat = new THREE.MeshStandardMaterial({
    color: 0xaeb1ad,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x715137,
    metalness: 0.0,
    roughness: 0.6,
  });
  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x493323,
    metalness: 0.0,
    roughness: 0.6,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0x554b39,
    metalness: 0.0,
    roughness: 0.9,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x202321,
    metalness: 0.0,
    roughness: 0.8,
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x303b38,
    metalness: 0.0,
    roughness: 0.7,
  });

  const envelopeLength = 4.6;
  const envelopeHalfLength = envelopeLength * 0.5;
  const envelopeRadius = 0.72;
  const envelopeCenterY = 0.4;

  function radiusAt(z) {
    const t = Math.max(0, Math.min(1, (z + envelopeHalfLength) / envelopeLength));
    return envelopeRadius * Math.pow(Math.sin(Math.PI * t), 0.62);
  }

  const envelopeProfile = [];
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    const z = -envelopeHalfLength + envelopeLength * t;
    const r = envelopeRadius * Math.pow(Math.sin(Math.PI * t), 0.62);
    envelopeProfile.push(new THREE.Vector2(r, z));
  }

  const envelopeGeom = new THREE.LatheGeometry(envelopeProfile, 64);
  const envelope = new THREE.Mesh(envelopeGeom, envelopeMat);
  envelope.name = "envelope";
  envelope.rotation.x = Math.PI / 2;
  envelope.position.y = envelopeCenterY;
  root.add(envelope);

  const hoopPositions = [
    -2.0, -1.72, -1.4, -1.05, -0.68, -0.3,
    0.1, 0.5, 0.88, 1.22, 1.52, 1.78, 2.0,
  ];
  const envelope_hoop_seamsGeom = new THREE.TorusGeometry(1, 0.011, 6, 72);
  const envelope_hoop_seams = new THREE.InstancedMesh(
    envelope_hoop_seamsGeom,
    seamMat,
    hoopPositions.length
  );
  envelope_hoop_seams.name = "envelope_hoop_seams";
  const hoopDummy = new THREE.Object3D();
  for (let i = 0; i < hoopPositions.length; i++) {
    const z = hoopPositions[i];
    const r = radiusAt(z) + 0.006;
    hoopDummy.position.set(0, envelopeCenterY, z);
    hoopDummy.rotation.set(0, 0, 0);
    hoopDummy.scale.set(r, r, 1);
    hoopDummy.updateMatrix();
    envelope_hoop_seams.setMatrixAt(i, hoopDummy.matrix);
  }
  envelope_hoop_seams.instanceMatrix.needsUpdate = true;
  root.add(envelope_hoop_seams);

  const envelope_longitudinal_seams = new THREE.Group();
  envelope_longitudinal_seams.name = "envelope_longitudinal_seams";
  for (let i = 0; i < 10; i++) {
    const angle = i / 10 * Math.PI * 2;
    const points = [];
    for (let j = 0; j <= 32; j++) {
      const t = 0.012 + 0.976 * j / 32;
      const z = -envelopeHalfLength + envelopeLength * t;
      const r = radiusAt(z) + 0.007;
      points.push(new THREE.Vector3(
        Math.cos(angle) * r,
        envelopeCenterY + Math.sin(angle) * r,
        z
      ));
    }
    const seamCurve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const seamGeom = new THREE.TubeGeometry(seamCurve, 56, 0.0055, 5, false);
    const seam = new THREE.Mesh(seamGeom, seamMat);
    seam.name = "envelope_longitudinal_seam_" + i;
    envelope_longitudinal_seams.add(seam);
  }
  root.add(envelope_longitudinal_seams);

  const tail_upper_finShape = new THREE.Shape();
  tail_upper_finShape.moveTo(-0.55, 0);
  tail_upper_finShape.lineTo(0.48, 0);
  tail_upper_finShape.lineTo(0.20, 0.48);
  tail_upper_finShape.lineTo(-0.34, 0.55);
  tail_upper_finShape.lineTo(-0.55, 0);

  const tail_upper_finGeom = new THREE.ExtrudeGeometry(tail_upper_finShape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  const tail_upper_fin = new THREE.Mesh(tail_upper_finGeom, tail_finMat);
  tail_upper_fin.name = "tail_upper_fin";
  tail_upper_fin.rotation.y = Math.PI / 2;
  tail_upper_fin.position.set(-0.03, 0.68, -1.75);
  root.add(tail_upper_fin);

  const tail_lower_finShape = new THREE.Shape();
  tail_lower_finShape.moveTo(-0.55, 0);
  tail_lower_finShape.lineTo(0.48, 0);
  tail_lower_finShape.lineTo(-0.34, -0.46);
  tail_lower_finShape.lineTo(-0.55, 0);

  const tail_lower_finGeom = new THREE.ExtrudeGeometry(tail_lower_finShape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  const tail_lower_fin = new THREE.Mesh(tail_lower_finGeom, tail_finMat);
  tail_lower_fin.name = "tail_lower_fin";
  tail_lower_fin.rotation.y = Math.PI / 2;
  tail_lower_fin.position.set(-0.03, -0.02, -1.75);
  root.add(tail_lower_fin);

  const tail_left_finShape = new THREE.Shape();
  tail_left_finShape.moveTo(-0.46, 0);
  tail_left_finShape.lineTo(0.45, 0);
  tail_left_finShape.lineTo(0.18, 0.38);
  tail_left_finShape.lineTo(-0.35, 0.43);
  tail_left_finShape.lineTo(-0.46, 0);

  const tail_left_finGeom = new THREE.ExtrudeGeometry(tail_left_finShape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
  });
  const tail_left_fin = new THREE.Mesh(tail_left_finGeom, tail_finMat);
  tail_left_fin.name = "tail_left_fin";
  tail_left_fin.rotation.z = Math.PI / 2;
  tail_left_fin.position.set(-0.34, 0.4, -1.76);
  root.add(tail_left_fin);

  const tail_right_finShape = new THREE.Shape();
  tail_right_finShape.moveTo(-0.46, 0);
  tail_right_finShape.lineTo(0.45, 0);
  tail_right_finShape.lineTo(0.18, -0.38);
  tail_right_finShape.lineTo(-0.35, -0.43);
  tail_right_finShape.lineTo(-0.46, 0);

  const tail_right_finGeom = new THREE.ExtrudeGeometry(tail_right_finShape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
  });
  const tail_right_fin = new THREE.Mesh(tail_right_finGeom, tail_finMat);
  tail_right_fin.name = "tail_right_fin";
  tail_right_fin.rotation.z = Math.PI / 2;
  tail_right_fin.position.set(-0.34, 0.4, -1.76);
  root.add(tail_right_fin);

  const nose_spikeGeom = new THREE.ConeGeometry(0.035, 0.24, 16);
  const nose_spike = new THREE.Mesh(nose_spikeGeom, metalMat);
  nose_spike.name = "nose_spike";
  nose_spike.rotation.x = Math.PI / 2;
  nose_spike.position.set(0, envelopeCenterY, 2.4);
  root.add(nose_spike);

  const tail_spikeGeom = new THREE.ConeGeometry(0.028, 0.2, 16);
  const tail_spike = new THREE.Mesh(tail_spikeGeom, metalMat);
  tail_spike.name = "tail_spike";
  tail_spike.rotation.x = -Math.PI / 2;
  tail_spike.position.set(0, envelopeCenterY, -2.4);
  root.add(tail_spike);

  const gondola_hullShape = new THREE.Shape();
  gondola_hullShape.moveTo(-0.72, 0.18);
  gondola_hullShape.lineTo(0.72, 0.18);
  gondola_hullShape.lineTo(0.77, -0.08);
  gondola_hullShape.lineTo(0.56, -0.25);
  gondola_hullShape.lineTo(0, -0.34);
  gondola_hullShape.lineTo(-0.56, -0.25);
  gondola_hullShape.lineTo(-0.77, -0.08);
  gondola_hullShape.lineTo(-0.72, 0.18);

  const gondola_hullGeom = new THREE.ExtrudeGeometry(gondola_hullShape, {
    depth: 0.58,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const gondola_hull = new THREE.Mesh(gondola_hullGeom, woodMat);
  gondola_hull.name = "gondola_hull";
  gondola_hull.rotation.y = Math.PI / 2;
  gondola_hull.position.set(-0.29, -0.96, -0.25);
  root.add(gondola_hull);

  const gondola_deckGeom = new THREE.BoxGeometry(0.57, 0.045, 1.38);
  const gondola_deck = new THREE.Mesh(gondola_deckGeom, dark_woodMat);
  gondola_deck.name = "gondola_deck";
  gondola_deck.position.set(0, -0.775, -0.25);
  root.add(gondola_deck);

  const gondola_interiorGeom = new THREE.BoxGeometry(0.48, 0.025, 1.15);
  const gondola_interior = new THREE.Mesh(gondola_interiorGeom, interiorMat);
  gondola_interior.name = "gondola_interior";
  gondola_interior.position.set(0, -0.742, -0.25);
  root.add(gondola_interior);

  const gondola_keelGeom = new THREE.BoxGeometry(0.36, 0.055, 1.08);
  const gondola_keel = new THREE.Mesh(gondola_keelGeom, dark_woodMat);
  gondola_keel.name = "gondola_keel";
  gondola_keel.position.set(0, -1.275, -0.25);
  root.add(gondola_keel);

  const hull_plank_bandsGeom = new THREE.BoxGeometry(0.016, 0.014, 1.3);
  const hull_plank_bands = new THREE.InstancedMesh(
    hull_plank_bandsGeom,
    dark_woodMat,
    8
  );
  hull_plank_bands.name = "hull_plank_bands";
  const plankDummy = new THREE.Object3D();
  let plankIndex = 0;
  for (const side of [-1, 1]) {
    for (const y of [-0.84, -0.95, -1.06, -1.17]) {
      plankDummy.position.set(side * 0.307, y, -0.25);
      plankDummy.rotation.set(0, 0, 0);
      plankDummy.scale.set(1, 1, 1);
      plankDummy.updateMatrix();
      hull_plank_bands.setMatrixAt(plankIndex++, plankDummy.matrix);
    }
  }
  hull_plank_bands.instanceMatrix.needsUpdate = true;
  root.add(hull_plank_bands);

  const hull_vertical_ribsGeom = new THREE.BoxGeometry(0.018, 0.34, 0.025);
  const hull_vertical_ribs = new THREE.InstancedMesh(
    hull_vertical_ribsGeom,
    dark_woodMat,
    12
  );
  hull_vertical_ribs.name = "hull_vertical_ribs";
  const ribDummy = new THREE.Object3D();
  const ribZPositions = [-0.82, -0.48, -0.14, 0.22];
  let ribIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of ribZPositions) {
      ribDummy.position.set(side * 0.314, -1.02, z);
      ribDummy.rotation.set(0, 0, 0);
      ribDummy.scale.set(1, 1, 1);
      ribDummy.updateMatrix();
      hull_vertical_ribs.setMatrixAt(ribIndex++, ribDummy.matrix);
    }
  }
  hull_vertical_ribs.instanceMatrix.needsUpdate = true;
  root.add(hull_vertical_ribs);

  const gondola_end_ribsGeom = new THREE.BoxGeometry(0.018, 0.3, 0.026);
  const gondola_end_ribs = new THREE.InstancedMesh(
    gondola_end_ribsGeom,
    dark_woodMat,
    4
  );
  gondola_end_ribs.name = "gondola_end_ribs";
  const endRibDummy = new THREE.Object3D();
  let endRibIndex = 0;
  for (const side of [-1, 1]) {
    for (const zOffset of [-0.63, 0.63]) {
      endRibDummy.position.set(side * 0.314, -1.02, -0.25 + zOffset);
      endRibDummy.rotation.set(0, 0, 0);
      endRibDummy.scale.set(1, 1, 1);
      endRibDummy.updateMatrix();
      gondola_end_ribs.setMatrixAt(endRibIndex++, endRibDummy.matrix);
    }
  }
  gondola_end_ribs.instanceMatrix.needsUpdate = true;
  root.add(gondola_end_ribs);

  const gondola_top_railsGeom = new THREE.BoxGeometry(0.026, 0.026, 1.42);
  const gondola_top_rails = new THREE.InstancedMesh(
    gondola_top_railsGeom,
    dark_woodMat,
    2
  );
  gondola_top_rails.name = "gondola_top_rails";
  const topRailDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    topRailDummy.position.set(i === 0 ? -0.31 : 0.31, -0.735, -0.25);
    topRailDummy.rotation.set(0, 0, 0);
    topRailDummy.scale.set(1, 1, 1);
    topRailDummy.updateMatrix();
    gondola_top_rails.setMatrixAt(i, topRailDummy.matrix);
  }
  gondola_top_rails.instanceMatrix.needsUpdate = true;
  root.add(gondola_top_rails);

  const gondola_end_railsGeom = new THREE.BoxGeometry(0.62, 0.026, 0.026);
  const gondola_end_rails = new THREE.InstancedMesh(
    gondola_end_railsGeom,
    dark_woodMat,
    2
  );
  gondola_end_rails.name = "gondola_end_rails";
  const endRailDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    endRailDummy.position.set(0, -0.735, i === 0 ? -0.96 : 0.46);
    endRailDummy.rotation.set(0, 0, 0);
    endRailDummy.scale.set(1, 1, 1);
    endRailDummy.updateMatrix();
    gondola_end_rails.setMatrixAt(i, endRailDummy.matrix);
  }
  gondola_end_rails.instanceMatrix.needsUpdate = true;
  root.add(gondola_end_rails);

  const gondola_railing_postsGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.22,
    8
  );
  const gondola_railing_posts = new THREE.InstancedMesh(
    gondola_railing_postsGeom,
    metalMat,
    12
  );
  gondola_railing_posts.name = "gondola_railing_posts";
  const postDummy = new THREE.Object3D();
  const postZPositions = [-0.88, -0.58, -0.28, 0.02, 0.32, 0.42];
  let postIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of postZPositions) {
      postDummy.position.set(side * 0.31, -0.625, z);
      postDummy.rotation.set(0, 0, 0);
      postDummy.scale.set(1, 1, 1);
      postDummy.updateMatrix();
      gondola_railing_posts.setMatrixAt(postIndex++, postDummy.matrix);
    }
  }
  gondola_railing_posts.instanceMatrix.needsUpdate = true;
  root.add(gondola_railing_posts);

  const pilot_seatGeom = new THREE.BoxGeometry(0.2, 0.2, 0.13);
  const pilot_seat = new THREE.Mesh(pilot_seatGeom, leatherMat);
  pilot_seat.name = "pilot_seat";
  pilot_seat.position.set(-0.09, -0.64, -0.43);
  pilot_seat.rotation.x = -0.08;
  root.add(pilot_seat);

  const pilot_seat_backGeom = new THREE.BoxGeometry(0.2, 0.24, 0.055);
  const pilot_seat_back = new THREE.Mesh(pilot_seat_backGeom, leatherMat);
  pilot_seat_back.name = "pilot_seat_back";
  pilot_seat_back.position.set(-0.09, -0.53, -0.5);
  pilot_seat_back.rotation.x = -0.12;
  root.add(pilot_seat_back);

  const instrument_panelGeom = new THREE.BoxGeometry(0.28, 0.14, 0.045);
  const instrument_panel = new THREE.Mesh(instrument_panelGeom, dark_woodMat);
  instrument_panel.name = "instrument_panel";
  instrument_panel.position.set(0, -0.66, 0.22);
  instrument_panel.rotation.x = -0.16;
  root.add(instrument_panel);

  const instrument_dialsGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.012,
    12
  );
  const instrument_dials = new THREE.InstancedMesh(
    instrument_dialsGeom,
    metalMat,
    3
  );
  instrument_dials.name = "instrument_dials";
  const dialDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    dialDummy.position.set(-0.085 + i * 0.085, -0.64, 0.19);
    dialDummy.rotation.set(Math.PI / 2, 0, 0);
    dialDummy.scale.set(1, 1, 1);
    dialDummy.updateMatrix();
    instrument_dials.setMatrixAt(i, dialDummy.matrix);
  }
  instrument_dials.instanceMatrix.needsUpdate = true;
  root.add(instrument_dials);

  function addRod(parent, p1, p2, radius, material, name, segments) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const rodGeom = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments || 8
    );
    const rod = new THREE.Mesh(rodGeom, material);
    rod.name = name;
    rod.position.copy(p1).add(p2).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    parent.add(rod);
    return rod;
  }

  const gondola_support_struts = new THREE.Group();
  gondola_support_struts.name = "gondola_support_struts";
  for (const side of [-1, 1]) {
    addRod(
      gondola_support_struts,
      new THREE.Vector3(side * 0.22, -0.75, -0.72),
      new THREE.Vector3(side * 0.27, -0.35, -0.36),
      0.014,
      dark_woodMat,
      "rear_support_strut",
      8
    );
    addRod(
      gondola_support_struts,
      new THREE.Vector3(side * 0.22, -0.75, 0.22),
      new THREE.Vector3(side * 0.27, -0.35, 0.34),
      0.014,
      dark_woodMat,
      "front_support_strut",
      8
    );
  }
  addRod(
    gondola_support_struts,
    new THREE.Vector3(-0.27, -0.35, 0.02),
    new THREE.Vector3(0.27, -0.35, 0.02),
    0.015,
    dark_woodMat,
    "support_crossbar",
    8
  );
  root.add(gondola_support_struts);

  function addCable(parent, p1, p2, radius, name) {
    const cableGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(p1, p2),
      4,
      radius,
      6,
      false
    );
    const cable = new THREE.Mesh(cableGeom, ropeMat);
    cable.name = name;
    parent.add(cable);
    return cable;
  }

  const suspension_cables = new THREE.Group();
  suspension_cables.name = "suspension_cables";
  const cableZPositions = [-0.84, -0.54, -0.24, 0.08, 0.38];
  for (const side of [-1, 1]) {
    for (let i = 0; i < cableZPositions.length; i++) {
      const z = cableZPositions[i];
      const r = radiusAt(z);
      addCable(
        suspension_cables,
        new THREE.Vector3(
          side * r * 0.62,
          envelopeCenterY - r * 0.78,
          z
        ),
        new THREE.Vector3(side * 0.31, -0.72, z),
        0.007,
        "suspension_cable_" + i + "_" + (side < 0 ? "left" : "right")
      );
    }
  }
  root.add(suspension_cables);

  const left_towing_cablePoints = [
    new THREE.Vector3(-0.31, -0.87, -0.9),
    new THREE.Vector3(-0.55, -0.93, -1.3),
    new THREE.Vector3(-0.9, -0.98, -1.75),
    new THREE.Vector3(-1.35, -1.0, -2.25),
  ];
  const left_towing_cableGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      left_towing_cablePoints,
      false,
      "centripetal"
    ),
    32,
    0.009,
    6,
    false
  );
  const left_towing_cable = new THREE.Mesh(
    left_towing_cableGeom,
    ropeMat
  );
  left_towing_cable.name = "left_towing_cable";
  root.add(left_towing_cable);

  const right_towing_cablePoints = [
    new THREE.Vector3(0.31, -0.87, -0.9),
    new THREE.Vector3(0.55, -0.93, -1.3),
    new THREE.Vector3(0.9, -0.98, -1.75),
    new THREE.Vector3(1.35, -1.0, -2.25),
  ];
  const right_towing_cableGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      right_towing_cablePoints,
      false,
      "centripetal"
    ),
    32,
    0.009,
    6,
    false
  );
  const right_towing_cable = new THREE.Mesh(
    right_towing_cableGeom,
    ropeMat
  );
  right_towing_cable.name = "right_towing_cable";
  root.add(right_towing_cable);

  const nose_mooring_blockGeom = new THREE.BoxGeometry(0.075, 0.065, 0.09);
  const nose_mooring_block = new THREE.Mesh(
    nose_mooring_blockGeom,
    dark_metalMat
  );
  nose_mooring_block.name = "nose_mooring_block";
  nose_mooring_block.position.set(0.2, -0.08, 1.72);
  root.add(nose_mooring_block);

  const nose_mooring_pulleyGeom = new THREE.TorusGeometry(
    0.032,
    0.009,
    8,
    20
  );
  const nose_mooring_pulley = new THREE.Mesh(
    nose_mooring_pulleyGeom,
    metalMat
  );
  nose_mooring_pulley.name = "nose_mooring_pulley";
  nose_mooring_pulley.rotation.y = Math.PI / 2;
  nose_mooring_pulley.position.set(0.245, -0.1, 1.75);
  root.add(nose_mooring_pulley);

  const dangling_mooring_ropePoints = [
    new THREE.Vector3(0.25, -0.1, 1.75),
    new THREE.Vector3(0.25, -0.42, 1.75),
    new THREE.Vector3(0.25, -0.78, 1.74),
    new THREE.Vector3(0.25, -1.13, 1.76),
    new THREE.Vector3(0.25, -1.22, 1.77),
  ];
  const dangling_mooring_ropeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      dangling_mooring_ropePoints,
      false,
      "centripetal"
    ),
    32,
    0.009,
    6,
    false
  );
  const dangling_mooring_rope = new THREE.Mesh(
    dangling_mooring_ropeGeom,
    ropeMat
  );
  dangling_mooring_rope.name = "dangling_mooring_rope";
  root.add(dangling_mooring_rope);

  const mooring_rope_knotGeom = new THREE.DodecahedronGeometry(0.038, 0);
  const mooring_rope_knot = new THREE.Mesh(
    mooring_rope_knotGeom,
    dark_woodMat
  );
  mooring_rope_knot.name = "mooring_rope_knot";
  mooring_rope_knot.position.set(0.25, -1.24, 1.77);
  root.add(mooring_rope_knot);

  const forward_control_cablePoints = [
    new THREE.Vector3(0.24, -0.1, 1.76),
    new THREE.Vector3(0.42, -0.34, 1.9),
    new THREE.Vector3(0.72, -0.62, 1.98),
    new THREE.Vector3(1.15, -0.9, 1.92),
    new THREE.Vector3(1.55, -1.0, 1.72),
    new THREE.Vector3(1.85, -1.01, 1.45),
  ];
  const forward_control_cableGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      forward_control_cablePoints,
      false,
      "centripetal"
    ),
    48,
    0.009,
    6,
    false
  );
  const forward_control_cable = new THREE.Mesh(
    forward_control_cableGeom,
    ropeMat
  );
  forward_control_cable.name = "forward_control_cable";
  root.add(forward_control_cable);

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