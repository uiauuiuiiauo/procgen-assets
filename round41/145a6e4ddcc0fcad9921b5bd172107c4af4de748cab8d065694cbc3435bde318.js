export default function generate(THREE) {
  const airship = new THREE.Group();
  airship.name = "airship";

  const envelopeLength = 5.2;
  const envelopeRadius = 0.98;
  const envelopeCenterY = 0.48;
  const envelopeCenterZ = 0.15;

  const envelopeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const gondolaMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const panel_seamMat = new THREE.MeshStandardMaterial({
    color: 0x686d72,
    metalness: 0.0,
    roughness: 0.7,
  });
  const intakeMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8,
  });
  const intake_grilleMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  const envelope_group = new THREE.Group();
  envelope_group.name = "envelope_group";
  envelope_group.position.set(0, envelopeCenterY, envelopeCenterZ);
  airship.add(envelope_group);

  const envelopeProfileControls = [
    new THREE.Vector3(0.00, -envelopeLength / 2, 0),
    new THREE.Vector3(0.28, -2.48, 0),
    new THREE.Vector3(0.62, -2.24, 0),
    new THREE.Vector3(0.86, -1.78, 0),
    new THREE.Vector3(0.97, -1.08, 0),
    new THREE.Vector3(0.98, -0.18, 0),
    new THREE.Vector3(0.95, 0.72, 0),
    new THREE.Vector3(0.84, 1.42, 0),
    new THREE.Vector3(0.61, 1.98, 0),
    new THREE.Vector3(0.29, 2.38, 0),
    new THREE.Vector3(0.00, envelopeLength / 2, 0),
  ];
  const envelopeProfileCurve = new THREE.CatmullRomCurve3(
    envelopeProfileControls,
    false,
    "centripetal"
  );
  const envelopeProfile = envelopeProfileCurve
    .getSpacedPoints(64)
    .map((point) => new THREE.Vector2(Math.max(0, point.x), point.y));

  const envelopeGeom = new THREE.LatheGeometry(envelopeProfile, 64);
  const envelope = new THREE.Mesh(envelopeGeom, envelopeMat);
  envelope.name = "envelope";
  envelope.rotation.x = Math.PI / 2;
  envelope_group.add(envelope);

  function envelopeRadiusAt(z) {
    const localZ = z - envelopeCenterZ;
    if (localZ <= envelopeProfileControls[0].y) return 0;
    for (let i = 0; i < envelopeProfileControls.length - 1; i++) {
      const a = envelopeProfileControls[i];
      const b = envelopeProfileControls[i + 1];
      if (localZ <= b.y) {
        const t = (localZ - a.y) / (b.y - a.y);
        return a.x + (b.x - a.x) * t;
      }
    }
    return 0;
  }

  const envelope_ring_seamsGeom = new THREE.TorusGeometry(1, 0.006, 6, 64);
  const envelope_ring_seams = new THREE.InstancedMesh(
    envelope_ring_seamsGeom,
    panel_seamMat,
    8
  );
  envelope_ring_seams.name = "envelope_ring_seams";
  const ringPositions = [-2.25, -1.78, -1.18, -0.48, 0.28, 1.02, 1.68, 2.18];
  const ringMatrix = new THREE.Matrix4();
  const ringQuaternion = new THREE.Quaternion();
  for (let i = 0; i < ringPositions.length; i++) {
    const z = ringPositions[i];
    const radius = envelopeRadiusAt(z) + 0.004;
    ringMatrix.compose(
      new THREE.Vector3(0, envelopeCenterY, z),
      ringQuaternion,
      new THREE.Vector3(radius, radius, 1)
    );
    envelope_ring_seams.setMatrixAt(i, ringMatrix);
  }
  envelope_ring_seams.instanceMatrix.needsUpdate = true;
  airship.add(envelope_ring_seams);

  const envelope_longitudinal_seams = new THREE.Group();
  envelope_longitudinal_seams.name = "envelope_longitudinal_seams";
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const points = [];
    for (let j = 0; j <= 24; j++) {
      const t = j / 24;
      const z = -2.43 + t * 4.86;
      const radius = envelopeRadiusAt(z) + 0.006;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          envelopeCenterY + Math.sin(angle) * radius,
          z
        )
      );
    }
    const seamCurve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const seamGeom = new THREE.TubeGeometry(seamCurve, 48, 0.0045, 6, false);
    const seam = new THREE.Mesh(seamGeom, panel_seamMat);
    envelope_longitudinal_seams.add(seam);
  }
  airship.add(envelope_longitudinal_seams);

  const dorsal_fairingGeom = new THREE.SphereGeometry(1, 24, 12);
  const dorsal_fairing = new THREE.Mesh(dorsal_fairingGeom, envelopeMat);
  dorsal_fairing.name = "dorsal_fairing";
  dorsal_fairing.scale.set(0.23, 0.075, 0.34);
  dorsal_fairing.position.set(0, 1.445, -1.22);
  airship.add(dorsal_fairing);

  const tail_finShape = new THREE.Shape();
  tail_finShape.moveTo(0.00, 0.00);
  tail_finShape.lineTo(0.58, 0.00);
  tail_finShape.lineTo(0.34, 0.52);
  tail_finShape.lineTo(0.08, 0.46);
  tail_finShape.closePath();

  const tail_finGeom = new THREE.ExtrudeGeometry(tail_finShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });

  const top_tail_fin = new THREE.Mesh(tail_finGeom, envelopeMat);
  top_tail_fin.name = "top_tail_fin";
  top_tail_fin.rotation.y = Math.PI / 2;
  top_tail_fin.position.set(-0.035, 0.49, -2.18);
  airship.add(top_tail_fin);

  const bottom_tail_fin = new THREE.Mesh(tail_finGeom, envelopeMat);
  bottom_tail_fin.name = "bottom_tail_fin";
  bottom_tail_fin.rotation.y = Math.PI / 2;
  bottom_tail_fin.position.set(-0.035, 0.47, -2.18);
  airship.add(bottom_tail_fin);

  const tail_rudderShape = new THREE.Shape();
  tail_rudderShape.moveTo(0.00, -0.32);
  tail_rudderShape.lineTo(0.55, -0.40);
  tail_rudderShape.lineTo(0.42, 0.00);
  tail_rudderShape.lineTo(0.05, 0.31);
  tail_rudderShape.lineTo(0.00, -0.32);

  const tail_rudderGeom = new THREE.ExtrudeGeometry(tail_rudderShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });

  const left_tail_rudder = new THREE.Mesh(tail_rudderGeom, envelopeMat);
  left_tail_rudder.name = "left_tail_rudder";
  left_tail_rudder.rotation.y = Math.PI / 2;
  left_tail_rudder.position.set(-0.035, envelopeCenterY, -2.18);
  airship.add(left_tail_rudder);

  const right_tail_rudder = new THREE.Mesh(tail_rudderGeom, envelopeMat);
  right_tail_rudder.name = "right_tail_rudder";
  right_tail_rudder.rotation.y = Math.PI / 2;
  right_tail_rudder.position.set(0.035, envelopeCenterY, -2.18);
  airship.add(right_tail_rudder);

  const tail_probeGeom = new THREE.ConeGeometry(0.055, 0.22, 20);
  const tail_probe = new THREE.Mesh(tail_probeGeom, gondolaMat);
  tail_probe.name = "tail_probe";
  tail_probe.rotation.x = -Math.PI / 2;
  tail_probe.position.set(0, envelopeCenterY, -2.61);
  airship.add(tail_probe);

  const gondola_group = new THREE.Group();
  gondola_group.name = "gondola_group";
  airship.add(gondola_group);

  const gondolaProfileControls = [
    new THREE.Vector3(0.00, -1.72, 0),
    new THREE.Vector3(0.16, -1.67, 0),
    new THREE.Vector3(0.28, -1.54, 0),
    new THREE.Vector3(0.34, -1.31, 0),
    new THREE.Vector3(0.36, -0.78, 0),
    new THREE.Vector3(0.35, -0.18, 0),
    new THREE.Vector3(0.32, 0.43, 0),
    new THREE.Vector3(0.24, 0.88, 0),
    new THREE.Vector3(0.12, 1.14, 0),
    new THREE.Vector3(0.00, 1.25, 0),
  ];
  const gondolaProfileCurve = new THREE.CatmullRomCurve3(
    gondolaProfileControls,
    false,
    "centripetal"
  );
  const gondolaProfile = gondolaProfileCurve
    .getSpacedPoints(48)
    .map((point) => new THREE.Vector2(Math.max(0, point.x), point.y));

  const gondolaGeom = new THREE.LatheGeometry(gondolaProfile, 48);
  const gondola = new THREE.Mesh(gondolaGeom, gondolaMat);
  gondola.name = "gondola";
  gondola.rotation.x = Math.PI / 2;
  gondola.position.set(0, -0.62, -0.45);
  gondola_group.add(gondola);

  const gondola_panel_seamsGeom = new THREE.TorusGeometry(1, 0.009, 6, 48);
  const gondola_panel_seams = new THREE.InstancedMesh(
    gondola_panel_seamsGeom,
    panel_seamMat,
    5
  );
  gondola_panel_seams.name = "gondola_panel_seams";
  const gondolaSeamData = [
    [-1.45, 0.30],
    [-1.08, 0.35],
    [-0.58, 0.35],
    [-0.08, 0.33],
    [0.43, 0.30],
  ];
  for (let i = 0; i < gondolaSeamData.length; i++) {
    const radius = gondolaSeamData[i][1];
    ringMatrix.compose(
      new THREE.Vector3(0, -0.62, gondolaSeamData[i][0]),
      ringQuaternion,
      new THREE.Vector3(radius, radius, 1)
    );
    gondola_panel_seams.setMatrixAt(i, ringMatrix);
  }
  gondola_panel_seams.instanceMatrix.needsUpdate = true;
  gondola_group.add(gondola_panel_seams);

  const gondola_longitudinal_seams = new THREE.Group();
  gondola_longitudinal_seams.name = "gondola_longitudinal_seams";
  for (const side of [-1, 1]) {
    const points = [
      new THREE.Vector3(side * 0.20, -0.62, -2.08),
      new THREE.Vector3(side * 0.33, -0.62, -1.55),
      new THREE.Vector3(side * 0.35, -0.62, -0.82),
      new THREE.Vector3(side * 0.32, -0.62, 0.02),
      new THREE.Vector3(side * 0.23, -0.62, 0.62),
    ];
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 32, 0.0045, 6, false);
    gondola_longitudinal_seams.add(new THREE.Mesh(geom, panel_seamMat));
  }
  gondola_group.add(gondola_longitudinal_seams);

  const suspension_strutsGeom = new THREE.CylinderGeometry(0.055, 0.12, 0.32, 20);
  const suspension_struts = new THREE.InstancedMesh(
    suspension_strutsGeom,
    gondolaMat,
    2
  );
  suspension_struts.name = "suspension_struts";
  const strutMatrix = new THREE.Matrix4();
  for (let i = 0; i < 2; i++) {
    const z = i === 0 ? -1.18 : 0.42;
    strutMatrix.compose(
      new THREE.Vector3(0, -0.13, z),
      new THREE.Quaternion(),
      new THREE.Vector3(1, 1, 1)
    );
    suspension_struts.setMatrixAt(i, strutMatrix);
  }
  suspension_struts.instanceMatrix.needsUpdate = true;
  gondola_group.add(suspension_struts);

  const gondola_tail_finShape = new THREE.Shape();
  gondola_tail_finShape.moveTo(0.00, 0.00);
  gondola_tail_finShape.lineTo(0.82, 0.00);
  gondola_tail_finShape.lineTo(0.55, 0.70);
  gondola_tail_finShape.lineTo(0.13, 0.58);
  gondola_tail_finShape.closePath();

  const gondola_tail_finGeom = new THREE.ExtrudeGeometry(gondola_tail_finShape, {
    depth: 0.08,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2,
  });

  const gondola_top_tail_fin = new THREE.Mesh(gondola_tail_finGeom, gondolaMat);
  gondola_top_tail_fin.name = "gondola_top_tail_fin";
  gondola_top_tail_fin.rotation.y = Math.PI / 2;
  gondola_top_tail_fin.position.set(-0.04, -0.58, -1.55);
  gondola_group.add(gondola_top_tail_fin);

  const gondola_bottom_tail_fin = new THREE.Mesh(gondola_tail_finGeom, gondolaMat);
  gondola_bottom_tail_fin.name = "gondola_bottom_tail_fin";
  gondola_bottom_tail_fin.rotation.y = Math.PI / 2;
  gondola_bottom_tail_fin.position.set(-0.04, -0.66, -1.55);
  gondola_group.add(gondola_bottom_tail_fin);

  const gondola_tailplaneShape = new THREE.Shape();
  gondola_tailplaneShape.moveTo(0.00, 0.00);
  gondola_tailplaneShape.lineTo(0.76, 0.27);
  gondola_tailplaneShape.lineTo(0.62, 0.62);
  gondola_tailplaneShape.lineTo(0.00, 0.48);
  gondola_tailplaneShape.closePath();

  const gondola_tailplaneGeom = new THREE.ExtrudeGeometry(gondola_tailplaneShape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });

  const left_gondola_tailplane = new THREE.Mesh(gondola_tailplaneGeom, gondolaMat);
  left_gondola_tailplane.name = "left_gondola_tailplane";
  left_gondola_tailplane.rotation.x = Math.PI / 2;
  left_gondola_tailplane.position.set(0, -0.60, -1.55);
  gondola_group.add(left_gondola_tailplane);

  const right_gondola_tailplane = new THREE.Mesh(gondola_tailplaneGeom, gondolaMat);
  right_gondola_tailplane.name = "right_gondola_tailplane";
  right_gondola_tailplane.rotation.x = Math.PI / 2;
  right_gondola_tailplane.position.set(0, -0.60, -1.55);
  right_gondola_tailplane.scale.x = -1;
  gondola_group.add(right_gondola_tailplane);

  const lateral_fairingGeom = new THREE.SphereGeometry(1, 28, 14);
  const lateral_fairings = new THREE.InstancedMesh(
    lateral_fairingGeom,
    gondolaMat,
    2
  );
  lateral_fairings.name = "lateral_fairings";
  const fairingQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    -0.12
  );
  const fairingMatrix = new THREE.Matrix4();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    fairingMatrix.compose(
      new THREE.Vector3(side * 0.43, -0.54, -0.62),
      fairingQuaternion,
      new THREE.Vector3(0.24, 0.13, 1.10)
    );
    lateral_fairings.setMatrixAt(i, fairingMatrix);
  }
  lateral_fairings.instanceMatrix.needsUpdate = true;
  gondola_group.add(lateral_fairings);

  const ventZ = 0.43;
  const ventRadius = envelopeRadiusAt(ventZ);
  const envelope_ventGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 24);
  const envelope_vent = new THREE.Mesh(envelope_ventGeom, gondolaMat);
  envelope_vent.name = "envelope_vent";
  envelope_vent.rotation.z = Math.PI / 2;
  envelope_vent.position.set(
    ventRadius + 0.012,
    envelopeCenterY - 0.08,
    ventZ
  );
  airship.add(envelope_vent);

  const envelope_vent_hubGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.045, 16);
  const envelope_vent_hub = new THREE.Mesh(envelope_vent_hubGeom, panel_seamMat);
  envelope_vent_hub.name = "envelope_vent_hub";
  envelope_vent_hub.rotation.z = Math.PI / 2;
  envelope_vent_hub.position.copy(envelope_vent.position);
  envelope_vent_hub.position.x += 0.008;
  airship.add(envelope_vent_hub);

  const access_panelGeom = new THREE.BoxGeometry(0.012, 0.16, 0.28);
  const access_panel = new THREE.Mesh(access_panelGeom, gondolaMat);
  access_panel.name = "access_panel";
  access_panel.position.set(0.356, -0.62, -0.08);
  gondola_group.add(access_panel);

  const access_panel_horizontal_borderGeom = new THREE.BoxGeometry(0.016, 0.012, 0.29);
  const access_panel_horizontal_borders = new THREE.InstancedMesh(
    access_panel_horizontal_borderGeom,
    panel_seamMat,
    2
  );
  access_panel_horizontal_borders.name = "access_panel_horizontal_borders";
  for (let i = 0; i < 2; i++) {
    const yOffset = i === 0 ? -0.082 : 0.082;
    ringMatrix.compose(
      new THREE.Vector3(0.364, -0.62 + yOffset, -0.08),
      ringQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    access_panel_horizontal_borders.setMatrixAt(i, ringMatrix);
  }
  access_panel_horizontal_borders.instanceMatrix.needsUpdate = true;
  gondola_group.add(access_panel_horizontal_borders);

  const access_panel_vertical_borderGeom = new THREE.BoxGeometry(0.016, 0.17, 0.012);
  const access_panel_vertical_borders = new THREE.InstancedMesh(
    access_panel_vertical_borderGeom,
    panel_seamMat,
    2
  );
  access_panel_vertical_borders.name = "access_panel_vertical_borders";
  for (let i = 0; i < 2; i++) {
    const zOffset = i === 0 ? -0.145 : 0.145;
    ringMatrix.compose(
      new THREE.Vector3(0.364, -0.62, -0.08 + zOffset),
      ringQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    access_panel_vertical_borders.setMatrixAt(i, ringMatrix);
  }
  access_panel_vertical_borders.instanceMatrix.needsUpdate = true;
  gondola_group.add(access_panel_vertical_borders);

  const front_intakeGeom = new THREE.CylinderGeometry(0.165, 0.165, 0.035, 32);
  const front_intake = new THREE.Mesh(front_intakeGeom, intakeMat);
  front_intake.name = "front_intake";
  front_intake.rotation.x = Math.PI / 2;
  front_intake.position.set(0, -0.62, 0.805);
  gondola_group.add(front_intake);

  const front_intake_rimGeom = new THREE.TorusGeometry(0.165, 0.025, 10, 40);
  const front_intake_rim = new THREE.Mesh(front_intake_rimGeom, gondolaMat);
  front_intake_rim.name = "front_intake_rim";
  front_intake_rim.position.set(0, -0.62, 0.825);
  gondola_group.add(front_intake_rim);

  const intake_grilleGeom = new THREE.BoxGeometry(0.025, 0.255, 0.018);
  const intake_grille = new THREE.InstancedMesh(
    intake_grilleGeom,
    intake_grilleMat,
    3
  );
  intake_grille.name = "intake_grille";
  for (let i = 0; i < 3; i++) {
    ringMatrix.compose(
      new THREE.Vector3((i - 1) * 0.075, -0.62, 0.835),
      ringQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    intake_grille.setMatrixAt(i, ringMatrix);
  }
  intake_grille.instanceMatrix.needsUpdate = true;
  gondola_group.add(intake_grille);

  const landing_skids = new THREE.Group();
  landing_skids.name = "landing_skids";
  for (const side of [-1, 1]) {
    const skidPoints = [
      new THREE.Vector3(side * 0.20, -0.99, -1.25),
      new THREE.Vector3(side * 0.21, -1.01, -0.72),
      new THREE.Vector3(side * 0.20, -1.01, -0.08),
      new THREE.Vector3(side * 0.17, -0.98, 0.38),
    ];
    const skidCurve = new THREE.CatmullRomCurve3(skidPoints, false, "centripetal");
    const skidGeom = new THREE.TubeGeometry(skidCurve, 24, 0.018, 8, false);
    landing_skids.add(new THREE.Mesh(skidGeom, gondolaMat));
  }
  gondola_group.add(landing_skids);

  const landing_strutsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.12, 10);
  const landing_struts = new THREE.InstancedMesh(
    landing_strutsGeom,
    gondolaMat,
    4
  );
  landing_struts.name = "landing_struts";
  const landingStrutPositions = [
    [-0.20, -0.94, -0.92],
    [0.20, -0.94, -0.92],
    [-0.18, -0.93, 0.18],
    [0.18, -0.93, 0.18],
  ];
  for (let i = 0; i < landingStrutPositions.length; i++) {
    const p = landingStrutPositions[i];
    ringMatrix.compose(
      new THREE.Vector3(p[0], p[1], p[2]),
      ringQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    landing_struts.setMatrixAt(i, ringMatrix);
  }
  landing_struts.instanceMatrix.needsUpdate = true;
  gondola_group.add(landing_struts);

  function fitToUnitCube(root) {
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

  fitToUnitCube(airship);
  return airship;
}