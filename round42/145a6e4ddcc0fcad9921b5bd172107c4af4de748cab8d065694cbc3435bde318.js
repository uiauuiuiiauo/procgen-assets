export default function generate(THREE) {
  const airship = new THREE.Group();
  airship.name = "airship";

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
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x747b82,
    metalness: 0.5,
    roughness: 0.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x15191c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const intakeMat = new THREE.MeshStandardMaterial({
    color: 0x090b0c,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x43515c,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const finMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const envelopeProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.00, -2.45),
    new THREE.Vector2(0.22, -2.38),
    new THREE.Vector2(0.62, -2.18),
    new THREE.Vector2(0.94, -1.85),
    new THREE.Vector2(1.14, -1.35),
    new THREE.Vector2(1.25, -0.72),
    new THREE.Vector2(1.28, 0.00),
    new THREE.Vector2(1.25, 0.75),
    new THREE.Vector2(1.12, 1.38),
    new THREE.Vector2(0.82, 1.90),
    new THREE.Vector2(0.40, 2.30),
    new THREE.Vector2(0.00, 2.48),
  ]).getSpacedPoints(64);

  const envelopeGeom = new THREE.LatheGeometry(envelopeProfile, 64);
  const envelope = new THREE.Mesh(envelopeGeom, envelopeMat);
  envelope.name = "envelope";
  envelope.rotation.x = Math.PI / 2;
  envelope.position.y = 0.55;
  airship.add(envelope);

  const envelopeRadiusSamples = [
    [-2.45, 0.00],
    [-2.38, 0.22],
    [-2.18, 0.62],
    [-1.85, 0.94],
    [-1.35, 1.14],
    [-0.72, 1.25],
    [0.00, 1.28],
    [0.75, 1.25],
    [1.38, 1.12],
    [1.90, 0.82],
    [2.30, 0.40],
    [2.48, 0.00],
  ];

  function envelopeRadiusAt(z) {
    if (z <= envelopeRadiusSamples[0][0]) return envelopeRadiusSamples[0][1];
    for (let i = 1; i < envelopeRadiusSamples.length; i++) {
      const a = envelopeRadiusSamples[i - 1];
      const b = envelopeRadiusSamples[i];
      if (z <= b[0]) {
        const t = (z - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return envelopeRadiusSamples[envelopeRadiusSamples.length - 1][1];
  }

  const envelopeRingPositions = [-2.08, -1.62, -1.08, -0.50, 0.12, 0.78, 1.40, 1.94];
  const envelope_panel_ringsGeom = new THREE.TorusGeometry(1, 0.0045, 6, 64);
  const envelope_panel_rings = new THREE.InstancedMesh(
    envelope_panel_ringsGeom,
    seamMat,
    envelopeRingPositions.length
  );
  envelope_panel_rings.name = "envelope_panel_rings";
  const envelope_ring_dummy = new THREE.Object3D();
  for (let i = 0; i < envelopeRingPositions.length; i++) {
    const z = envelopeRingPositions[i];
    const r = envelopeRadiusAt(z) + 0.008;
    envelope_ring_dummy.position.set(0, 0.55, z);
    envelope_ring_dummy.scale.set(r, r, 1);
    envelope_ring_dummy.updateMatrix();
    envelope_panel_rings.setMatrixAt(i, envelope_ring_dummy.matrix);
  }
  envelope_panel_rings.instanceMatrix.needsUpdate = true;
  airship.add(envelope_panel_rings);

  const envelope_longitudinal_seams = new THREE.Group();
  envelope_longitudinal_seams.name = "envelope_longitudinal_seams";
  const longitudinalSeamCount = 8;
  for (let i = 0; i < longitudinalSeamCount; i++) {
    const angle = i / longitudinalSeamCount * Math.PI * 2;
    const points = [];
    for (let j = 0; j <= 28; j++) {
      const z = -2.34 + j / 28 * 4.68;
      const r = envelopeRadiusAt(z) + 0.009;
      points.push(new THREE.Vector3(
        Math.cos(angle) * r,
        0.55 + Math.sin(angle) * r,
        z
      ));
    }
    const seamCurve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const seamGeom = new THREE.TubeGeometry(seamCurve, 56, 0.0045, 5, false);
    const seam = new THREE.Mesh(seamGeom, seamMat);
    seam.name = "envelope_longitudinal_seam_" + i;
    envelope_longitudinal_seams.add(seam);
  }
  airship.add(envelope_longitudinal_seams);

  const side_finShape = new THREE.Shape();
  side_finShape.moveTo(0.00, 0.00);
  side_finShape.lineTo(0.50, 0.00);
  side_finShape.lineTo(0.43, 0.34);
  side_finShape.lineTo(0.12, 0.30);
  side_finShape.closePath();

  const side_finGeom = new THREE.ExtrudeGeometry(side_finShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });

  const right_side_fin = new THREE.Mesh(side_finGeom, envelopeMat);
  right_side_fin.name = "right_side_fin";
  right_side_fin.rotation.y = Math.PI / 2;
  right_side_fin.position.set(0.17, 0.55, -1.70);
  airship.add(right_side_fin);

  const left_side_fin = new THREE.Mesh(side_finGeom, envelopeMat);
  left_side_fin.name = "left_side_fin";
  left_side_fin.rotation.y = Math.PI / 2;
  left_side_fin.position.set(-0.225, 0.55, -1.70);
  airship.add(left_side_fin);

  const tail_finShape = new THREE.Shape();
  tail_finShape.moveTo(0.00, 0.00);
  tail_finShape.lineTo(0.72, 0.00);
  tail_finShape.lineTo(0.62, 0.32);
  tail_finShape.lineTo(0.10, 0.27);
  tail_finShape.closePath();

  const tail_finGeom = new THREE.ExtrudeGeometry(tail_finShape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });

  const top_tail_fin = new THREE.Mesh(tail_finGeom, envelopeMat);
  top_tail_fin.name = "top_tail_fin";
  top_tail_fin.rotation.x = Math.PI / 2;
  top_tail_fin.position.set(0, 1.80, -1.68);
  airship.add(top_tail_fin);

  const bottom_tail_fin = new THREE.Mesh(tail_finGeom, envelopeMat);
  bottom_tail_fin.name = "bottom_tail_fin";
  bottom_tail_fin.rotation.x = Math.PI / 2;
  bottom_tail_fin.position.set(0, -0.70, -1.68);
  airship.add(bottom_tail_fin);

  const tail_spikeGeom = new THREE.ConeGeometry(0.075, 0.34, 20);
  const tail_spike = new THREE.Mesh(tail_spikeGeom, gondolaMat);
  tail_spike.name = "tail_spike";
  tail_spike.rotation.x = -Math.PI / 2;
  tail_spike.position.set(0, 0.55, -2.55);
  airship.add(tail_spike);

  const gondolaProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.00, -1.72),
    new THREE.Vector2(0.12, -1.69),
    new THREE.Vector2(0.29, -1.55),
    new THREE.Vector2(0.40, -1.25),
    new THREE.Vector2(0.44, -0.72),
    new THREE.Vector2(0.44, 0.55),
    new THREE.Vector2(0.41, 1.05),
    new THREE.Vector2(0.32, 1.42),
    new THREE.Vector2(0.15, 1.62),
    new THREE.Vector2(0.00, 1.68),
  ]).getSpacedPoints(48);

  const gondolaGeom = new THREE.LatheGeometry(gondolaProfile, 48);
  const gondola = new THREE.Mesh(gondolaGeom, gondolaMat);
  gondola.name = "gondola";
  gondola.rotation.x = Math.PI / 2;
  gondola.position.set(0, -0.80, 0.15);
  airship.add(gondola);

  const gondolaRingPositions = [-1.25, -0.72, -0.10, 0.55, 1.12];
  const gondola_panel_ringsGeom = new THREE.TorusGeometry(1, 0.006, 6, 48);
  const gondola_panel_rings = new THREE.InstancedMesh(
    gondola_panel_ringsGeom,
    seamMat,
    gondolaRingPositions.length
  );
  gondola_panel_rings.name = "gondola_panel_rings";
  const gondola_ring_dummy = new THREE.Object3D();
  const gondolaRingRadii = [0.39, 0.44, 0.445, 0.43, 0.39];
  for (let i = 0; i < gondolaRingPositions.length; i++) {
    const r = gondolaRingRadii[i] + 0.006;
    gondola_ring_dummy.position.set(0, -0.80, gondolaRingPositions[i]);
    gondola_ring_dummy.scale.set(r, r, 1);
    gondola_ring_dummy.updateMatrix();
    gondola_panel_rings.setMatrixAt(i, gondola_ring_dummy.matrix);
  }
  gondola_panel_rings.instanceMatrix.needsUpdate = true;
  airship.add(gondola_panel_rings);

  const gondola_longitudinal_seams = new THREE.Group();
  gondola_longitudinal_seams.name = "gondola_longitudinal_seams";
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * Math.PI * 2;
    const points = [];
    for (let j = 0; j <= 20; j++) {
      const z = -1.48 + j / 20 * 2.95;
      const r = 0.438 - Math.abs(z - 0.05) * 0.025;
      points.push(new THREE.Vector3(
        Math.cos(angle) * r,
        -0.80 + Math.sin(angle) * r,
        z
      ));
    }
    const seamCurve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const seamGeom = new THREE.TubeGeometry(seamCurve, 40, 0.004, 5, false);
    const seam = new THREE.Mesh(seamGeom, seamMat);
    seam.name = "gondola_longitudinal_seam_" + i;
    gondola_longitudinal_seams.add(seam);
  }
  airship.add(gondola_longitudinal_seams);

  const support_struts = new THREE.Group();
  support_struts.name = "support_struts";

  const upper_strutGeom = new THREE.CylinderGeometry(0.10, 0.16, 0.32, 20);
  const upper_strut = new THREE.Mesh(upper_strutGeom, gondolaMat);
  upper_strut.name = "upper_strut";
  upper_strut.position.set(0, -0.47, -0.62);
  support_struts.add(upper_strut);

  const lower_strutGeom = new THREE.CylinderGeometry(0.16, 0.10, 0.32, 20);
  const lower_strut = new THREE.Mesh(lower_strutGeom, gondolaMat);
  lower_strut.name = "lower_strut";
  lower_strut.position.set(0, -0.80, -0.62);
  support_struts.add(lower_strut);

  const support_fairingGeom = new THREE.SphereGeometry(1, 24, 12);
  const support_fairing = new THREE.Mesh(support_fairingGeom, gondolaMat);
  support_fairing.name = "support_fairing";
  support_fairing.scale.set(0.23, 0.13, 0.27);
  support_fairing.position.set(0, -0.635, -0.62);
  support_struts.add(support_fairing);

  airship.add(support_struts);

  const cockpit_canopyGeom = new THREE.SphereGeometry(1, 40, 20);
  const cockpit_canopy = new THREE.Mesh(cockpit_canopyGeom, gondolaMat);
  cockpit_canopy.name = "cockpit_canopy";
  cockpit_canopy.scale.set(0.50, 0.20, 0.78);
  cockpit_canopy.position.set(0, -0.58, 0.25);
  airship.add(cockpit_canopy);

  const cockpit_windowGeom = new THREE.SphereGeometry(1, 32, 16);
  const cockpit_window = new THREE.Mesh(cockpit_windowGeom, glassMat);
  cockpit_window.name = "cockpit_window";
  cockpit_window.scale.set(0.42, 0.145, 0.58);
  cockpit_window.position.set(0, -0.505, 0.34);
  airship.add(cockpit_window);

  const cockpit_window_frameGeom = new THREE.TorusGeometry(1, 0.018, 6, 48);
  const cockpit_window_frame = new THREE.Mesh(cockpit_window_frameGeom, seamMat);
  cockpit_window_frame.name = "cockpit_window_frame";
  cockpit_window_frame.rotation.x = Math.PI / 2;
  cockpit_window_frame.scale.set(0.42, 0.60, 0.15);
  cockpit_window_frame.position.set(0, -0.505, 0.34);
  airship.add(cockpit_window_frame);

  const dorsal_finShape = new THREE.Shape();
  dorsal_finShape.moveTo(-0.55, 0.00);
  dorsal_finShape.lineTo(0.55, 0.00);
  dorsal_finShape.lineTo(0.38, 0.16);
  dorsal_finShape.lineTo(-0.28, 0.20);
  dorsal_finShape.closePath();

  const dorsal_finGeom = new THREE.ExtrudeGeometry(dorsal_finShape, {
    depth: 0.08,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  const dorsal_fin = new THREE.Mesh(dorsal_finGeom, finMat);
  dorsal_fin.name = "dorsal_fin";
  dorsal_fin.rotation.y = Math.PI / 2;
  dorsal_fin.position.set(-0.04, -0.40, -0.55);
  airship.add(dorsal_fin);

  const horizontal_tail_finShape = new THREE.Shape();
  horizontal_tail_finShape.moveTo(0.00, -0.22);
  horizontal_tail_finShape.lineTo(0.78, -0.10);
  horizontal_tail_finShape.lineTo(0.68, 0.12);
  horizontal_tail_finShape.lineTo(0.00, 0.22);
  horizontal_tail_finShape.lineTo(-0.68, 0.12);
  horizontal_tail_finShape.lineTo(-0.78, -0.10);
  horizontal_tail_finShape.closePath();

  const horizontal_tail_finGeom = new THREE.ExtrudeGeometry(horizontal_tail_finShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
  const horizontal_tail_fin = new THREE.Mesh(horizontal_tail_finGeom, finMat);
  horizontal_tail_fin.name = "horizontal_tail_fin";
  horizontal_tail_fin.rotation.x = Math.PI / 2;
  horizontal_tail_fin.position.set(0, -0.78, -1.25);
  airship.add(horizontal_tail_fin);

  const ventular_nozzleGeom = new THREE.CylinderGeometry(0.28, 0.31, 0.30, 32);
  const ventular_nozzle = new THREE.Mesh(ventular_nozzleGeom, gondolaMat);
  ventular_nozzle.name = "ventular_nozzle";
  ventular_nozzle.rotation.x = Math.PI / 2;
  ventular_nozzle.position.set(0, -0.80, 1.73);
  airship.add(ventular_nozzle);

  const nozzle_intakeGeom = new THREE.CircleGeometry(0.235, 32);
  const nozzle_intake = new THREE.Mesh(nozzle_intakeGeom, intakeMat);
  nozzle_intake.name = "nozzle_intake";
  nozzle_intake.position.set(0, -0.80, 1.887);
  airship.add(nozzle_intake);

  const nozzle_rimGeom = new THREE.TorusGeometry(0.255, 0.045, 10, 40);
  const nozzle_rim = new THREE.Mesh(nozzle_rimGeom, gondolaMat);
  nozzle_rim.name = "nozzle_rim";
  nozzle_rim.position.set(0, -0.80, 1.895);
  airship.add(nozzle_rim);

  const nozzle_dividerGeom = new THREE.BoxGeometry(0.045, 0.40, 0.025);
  const nozzle_divider = new THREE.Mesh(nozzle_dividerGeom, gondolaMat);
  nozzle_divider.name = "nozzle_divider";
  nozzle_divider.position.set(0, -0.80, 1.905);
  airship.add(nozzle_divider);

  const access_panelGeom = new THREE.PlaneGeometry(0.28, 0.14);
  const access_panel = new THREE.Mesh(access_panelGeom, seamMat);
  access_panel.name = "access_panel";
  access_panel.rotation.y = Math.PI / 2;
  access_panel.position.set(0.447, -0.80, 0.70);
  airship.add(access_panel);

  const access_panel_insetGeom = new THREE.PlaneGeometry(0.24, 0.10);
  const access_panel_inset = new THREE.Mesh(access_panel_insetGeom, gondolaMat);
  access_panel_inset.name = "access_panel_inset";
  access_panel_inset.rotation.y = Math.PI / 2;
  access_panel_inset.position.set(0.450, -0.80, 0.70);
  airship.add(access_panel_inset);

  const landing_skids = new THREE.Group();
  landing_skids.name = "landing_skids";
  for (const side of [-1, 1]) {
    const skidPoints = [
      new THREE.Vector3(side * 0.28, -1.245, -0.78),
      new THREE.Vector3(side * 0.28, -1.275, -0.38),
      new THREE.Vector3(side * 0.28, -1.275, 0.25),
      new THREE.Vector3(side * 0.28, -1.225, 0.62),
    ];
    const skidCurve = new THREE.CatmullRomCurve3(skidPoints, false, "centripetal");
    const skidGeom = new THREE.TubeGeometry(skidCurve, 28, 0.022, 8, false);
    const skid = new THREE.Mesh(skidGeom, gondolaMat);
    skid.name = side < 0 ? "left_landing_skid" : "right_landing_skid";
    landing_skids.add(skid);
  }

  const landing_strutGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.13, 8);
  const landing_struts = new THREE.InstancedMesh(landing_strutGeom, gondolaMat, 4);
  landing_struts.name = "landing_struts";
  const landing_strut_dummy = new THREE.Object3D();
  let landingStrutIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.48, 0.38]) {
      landing_strut_dummy.position.set(side * 0.28, -1.20, z);
      landing_strut_dummy.updateMatrix();
      landing_struts.setMatrixAt(landingStrutIndex++, landing_strut_dummy.matrix);
    }
  }
  landing_struts.instanceMatrix.needsUpdate = true;
  landing_skids.add(landing_struts);
  airship.add(landing_skids);

  fitToUnitCube(THREE, airship);
  return airship;

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
}