export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "umbrella";

  const canopyRadius = 1.65;
  const canopyApexY = 2.30;
  const canopyRise = 0.78;
  const canopyExponent = 1.45;
  const panelCount = 8;
  const panelStep = Math.PI * 2 / panelCount;
  const panelHalfAngle = panelStep / 2;

  const canopy_panel_evenMat = new THREE.MeshStandardMaterial({
    color: 0x1b3538,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const canopy_panel_oddMat = new THREE.MeshStandardMaterial({
    color: 0x213b3e,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const canopy_seamMat = new THREE.MeshStandardMaterial({
    color: 0x162b2e,
    metalness: 0.0,
    roughness: 0.95
  });
  const painted_metalMat = new THREE.MeshStandardMaterial({
    color: 0x303638,
    metalness: 0.6,
    roughness: 0.5
  });
  const black_metalMat = new THREE.MeshStandardMaterial({
    color: 0x171b1c,
    metalness: 0.6,
    roughness: 0.5
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x202425,
    metalness: 0.0,
    roughness: 0.8
  });

  function canopyY(t) {
    return canopyApexY - canopyRise * Math.pow(t, canopyExponent);
  }

  function canopySurfaceY(t, angularFraction) {
    const panelSag =
      0.022 *
      Math.sin(Math.PI * angularFraction) *
      Math.pow(t, 1.8);
    return canopyY(t) - panelSag;
  }

  function createCanopyPanelGeometry() {
    const radialSegments = 10;
    const angularSegments = 6;
    const positions = [];
    const indices = [];

    for (let j = 0; j <= radialSegments; j++) {
      const t = j / radialSegments;
      for (let k = 0; k <= angularSegments; k++) {
        const u = k / angularSegments;
        const angle = -panelHalfAngle + panelStep * u;
        const scallop =
          1 -
          0.045 *
            Math.sin(Math.PI * u) *
            Math.pow(t, 5);
        const radius = canopyRadius * t * scallop;
        positions.push(
          Math.sin(angle) * radius,
          canopySurfaceY(t, u),
          Math.cos(angle) * radius
        );
      }
    }

    const row = angularSegments + 1;
    for (let j = 0; j < radialSegments; j++) {
      for (let k = 0; k < angularSegments; k++) {
        const a = j * row + k;
        const b = (j + 1) * row + k;
        const c = (j + 1) * row + k + 1;
        const d = j * row + k + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function setRadialInstances(mesh, angles) {
    const transform = new THREE.Object3D();
    for (let i = 0; i < angles.length; i++) {
      transform.position.set(0, 0, 0);
      transform.rotation.set(0, angles[i], 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      mesh.setMatrixAt(i, transform.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingBox();
    mesh.computeBoundingSphere();
  }

  const canopy = new THREE.Group();
  canopy.name = "canopy";
  root.add(canopy);

  const canopy_panelGeom = createCanopyPanelGeometry();
  const evenAngles = [0, panelStep * 2, panelStep * 4, panelStep * 6];
  const oddAngles = [panelStep, panelStep * 3, panelStep * 5, panelStep * 7];

  const canopy_panels_even = new THREE.InstancedMesh(
    canopy_panelGeom,
    canopy_panel_evenMat,
    evenAngles.length
  );
  canopy_panels_even.name = "canopy_panels_even";
  setRadialInstances(canopy_panels_even, evenAngles);
  canopy.add(canopy_panels_even);

  const canopy_panels_odd = new THREE.InstancedMesh(
    canopy_panelGeom,
    canopy_panel_oddMat,
    oddAngles.length
  );
  canopy_panels_odd.name = "canopy_panels_odd";
  setRadialInstances(canopy_panels_odd, oddAngles);
  canopy.add(canopy_panels_odd);

  const seamPathPoints = [];
  const ribPathPoints = [];
  for (let i = 0; i <= 10; i++) {
    const t = 0.025 + 0.975 * i / 10;
    const radius = canopyRadius * t;
    const y = canopyY(t);
    seamPathPoints.push(
      new THREE.Vector3(0, y + 0.008, radius)
    );
    ribPathPoints.push(
      new THREE.Vector3(0, y - 0.025, radius)
    );
  }

  const canopy_seamGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(seamPathPoints, false, "centripetal"),
    28,
    0.006,
    6,
    false
  );
  const canopy_seams = new THREE.InstancedMesh(
    canopy_seamGeom,
    canopy_seamMat,
    panelCount
  );
  canopy_seams.name = "canopy_seams";
  const seamAngles = [];
  for (let i = 0; i < panelCount; i++) {
    seamAngles.push(i * panelStep - panelHalfAngle);
  }
  setRadialInstances(canopy_seams, seamAngles);
  canopy.add(canopy_seams);

  const edgePoints = [];
  const edgeSubdivisions = 6;
  for (let i = 0; i < panelCount; i++) {
    for (let j = 0; j < edgeSubdivisions; j++) {
      const u = j / edgeSubdivisions;
      const angle = (i + u) * panelStep - panelHalfAngle;
      const radius =
        canopyRadius * (1 - 0.045 * Math.sin(Math.PI * u));
      edgePoints.push(
        new THREE.Vector3(
          Math.sin(angle) * radius,
          canopyY(1) - 0.004 * Math.sin(Math.PI * u),
          Math.cos(angle) * radius
        )
      );
    }
  }
  const canopy_edge_hemGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(edgePoints, true, "centripetal"),
    96,
    0.012,
    7,
    true
  );
  const canopy_edge_hem = new THREE.Mesh(
    canopy_edge_hemGeom,
    canopy_seamMat
  );
  canopy_edge_hem.name = "canopy_edge_hem";
  canopy.add(canopy_edge_hem);

  const canopy_ribGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(ribPathPoints, false, "centripetal"),
    28,
    0.011,
    7,
    false
  );
  const canopy_ribs = new THREE.InstancedMesh(
    canopy_ribGeom,
    black_metalMat,
    panelCount
  );
  canopy_ribs.name = "canopy_ribs";
  setRadialInstances(canopy_ribs, seamAngles);
  canopy.add(canopy_ribs);

  const supportEndT = 0.72;
  const supportStart = new THREE.Vector3(0, 1.73, 0.045);
  const supportEnd = new THREE.Vector3(
    0,
    canopyY(supportEndT) - 0.055,
    canopyRadius * supportEndT
  );
  const support_strutGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(supportStart, supportEnd),
    1,
    0.012,
    7,
    false
  );
  const support_struts = new THREE.InstancedMesh(
    support_strutGeom,
    black_metalMat,
    panelCount
  );
  support_struts.name = "support_struts";
  setRadialInstances(support_struts, seamAngles);
  canopy.add(support_struts);

  const rib_jointGeom = new THREE.SphereGeometry(0.021, 10, 6);
  const rib_joints = new THREE.InstancedMesh(
    rib_jointGeom,
    black_metalMat,
    panelCount
  );
  rib_joints.name = "rib_joints";
  const jointTransform = new THREE.Object3D();
  for (let i = 0; i < seamAngles.length; i++) {
    const angle = seamAngles[i];
    const radius = canopyRadius * supportEndT;
    jointTransform.position.set(
      Math.sin(angle) * radius,
      canopyY(supportEndT) - 0.035,
      Math.cos(angle) * radius
    );
    jointTransform.rotation.set(0, 0, 0);
    jointTransform.scale.set(1, 1, 1);
    jointTransform.updateMatrix();
    rib_joints.setMatrixAt(i, jointTransform.matrix);
  }
  rib_joints.instanceMatrix.needsUpdate = true;
  rib_joints.computeBoundingBox();
  rib_joints.computeBoundingSphere();
  canopy.add(rib_joints);

  const rib_tipGeom = new THREE.SphereGeometry(0.026, 12, 8);
  const rib_tips = new THREE.InstancedMesh(
    rib_tipGeom,
    black_metalMat,
    panelCount
  );
  rib_tips.name = "rib_tips";
  const tipTransform = new THREE.Object3D();
  for (let i = 0; i < seamAngles.length; i++) {
    const angle = seamAngles[i];
    const radius = canopyRadius + 0.012;
    tipTransform.position.set(
      Math.sin(angle) * radius,
      canopyY(1) - 0.006,
      Math.cos(angle) * radius
    );
    tipTransform.rotation.set(0, 0, 0);
    tipTransform.scale.set(1, 1, 1);
    tipTransform.updateMatrix();
    rib_tips.setMatrixAt(i, tipTransform.matrix);
  }
  rib_tips.instanceMatrix.needsUpdate = true;
  rib_tips.computeBoundingBox();
  rib_tips.computeBoundingSphere();
  canopy.add(rib_tips);

  const canopy_hubGeom = new THREE.CylinderGeometry(
    0.052,
    0.070,
    0.12,
    16
  );
  const canopy_hub = new THREE.Mesh(canopy_hubGeom, black_metalMat);
  canopy_hub.name = "canopy_hub";
  canopy_hub.position.y = 2.14;
  canopy.add(canopy_hub);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const top_capGeom = new THREE.CylinderGeometry(
    0.055,
    0.135,
    0.09,
    24
  );
  const top_cap = new THREE.Mesh(top_capGeom, painted_metalMat);
  top_cap.name = "top_cap";
  top_cap.position.y = 2.325;
  top_assembly.add(top_cap);

  const top_ferruleGeom = new THREE.CylinderGeometry(
    0.022,
    0.032,
    0.30,
    16
  );
  const top_ferrule = new THREE.Mesh(
    top_ferruleGeom,
    painted_metalMat
  );
  top_ferrule.name = "top_ferrule";
  top_ferrule.position.y = 2.515;
  top_assembly.add(top_ferrule);

  const top_ferrule_tipGeom = new THREE.SphereGeometry(
    0.022,
    12,
    8
  );
  const top_ferrule_tip = new THREE.Mesh(
    top_ferrule_tipGeom,
    painted_metalMat
  );
  top_ferrule_tip.name = "top_ferrule_tip";
  top_ferrule_tip.position.y = 2.672;
  top_assembly.add(top_ferrule_tip);

  const shaft_assembly = new THREE.Group();
  shaft_assembly.name = "shaft_assembly";
  root.add(shaft_assembly);

  const central_shaftGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    2.02,
    14
  );
  const central_shaft = new THREE.Mesh(
    central_shaftGeom,
    black_metalMat
  );
  central_shaft.name = "central_shaft";
  central_shaft.position.y = 1.21;
  shaft_assembly.add(central_shaft);

  const runner_sleeveGeom = new THREE.CylinderGeometry(
    0.036,
    0.040,
    0.16,
    14
  );
  const runner_sleeve = new THREE.Mesh(
    runner_sleeveGeom,
    black_metalMat
  );
  runner_sleeve.name = "runner_sleeve";
  runner_sleeve.position.y = 1.72;
  shaft_assembly.add(runner_sleeve);

  const release_claspGeom = new THREE.BoxGeometry(
    0.075,
    0.22,
    0.065
  );
  const release_clasp = new THREE.Mesh(
    release_claspGeom,
    rubberMat
  );
  release_clasp.name = "release_clasp";
  release_clasp.position.set(0, 0.58, 0);
  shaft_assembly.add(release_clasp);

  const release_buttonGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.055,
    10
  );
  const release_button = new THREE.Mesh(
    release_buttonGeom,
    rubberMat
  );
  release_button.name = "release_button";
  release_button.rotation.z = Math.PI / 2;
  release_button.position.set(-0.052, 0.635, 0);
  shaft_assembly.add(release_button);

  const release_tabGeom = new THREE.BoxGeometry(
    0.025,
    0.065,
    0.035
  );
  const release_tab = new THREE.Mesh(release_tabGeom, rubberMat);
  release_tab.name = "release_tab";
  release_tab.position.set(-0.078, 0.66, 0);
  shaft_assembly.add(release_tab);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  root.add(handle_assembly);

  const handle_collarGeom = new THREE.CylinderGeometry(
    0.052,
    0.057,
    0.10,
    16
  );
  const handle_collar = new THREE.Mesh(
    handle_collarGeom,
    rubberMat
  );
  handle_collar.name = "handle_collar";
  handle_collar.position.y = 0.19;
  handle_assembly.add(handle_collar);

  const handlePath = [
    new THREE.Vector3(0.000, 0.20, 0),
    new THREE.Vector3(-0.005, 0.04, 0),
    new THREE.Vector3(0.000, -0.13, 0),
    new THREE.Vector3(0.055, -0.235, 0),
    new THREE.Vector3(0.150, -0.270, 0),
    new THREE.Vector3(0.245, -0.225, 0),
    new THREE.Vector3(0.295, -0.130, 0),
    new THREE.Vector3(0.290, -0.020, 0),
    new THREE.Vector3(0.250, 0.075, 0)
  ];
  const handle_gripGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      handlePath,
      false,
      "centripetal"
    ),
    40,
    0.055,
    12,
    false
  );
  const handle_grip = new THREE.Mesh(handle_gripGeom, rubberMat);
  handle_grip.name = "handle_grip";
  handle_assembly.add(handle_grip);

  const handle_end_capGeom = new THREE.SphereGeometry(
    0.057,
    14,
    10
  );
  const handle_end_cap = new THREE.Mesh(
    handle_end_capGeom,
    rubberMat
  );
  handle_end_cap.name = "handle_end_cap";
  handle_end_cap.position.copy(handlePath[handlePath.length - 1]);
  handle_assembly.add(handle_end_cap);

  const wristLoopPoints = [
    new THREE.Vector3(0.145, -0.255, 0.018),
    new THREE.Vector3(0.195, -0.245, 0.018),
    new THREE.Vector3(0.245, -0.215, 0.018),
    new THREE.Vector3(0.270, -0.180, 0.018)
  ];
  const wrist_loopGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      wristLoopPoints,
      false,
      "centripetal"
    ),
    16,
    0.008,
    6,
    false
  );
  const wrist_loop = new THREE.Mesh(wrist_loopGeom, rubberMat);
  wrist_loop.name = "wrist_loop";
  handle_assembly.add(wrist_loop);

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