export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "tennis_racket";

  const racket_assembly = new THREE.Group();
  racket_assembly.name = "racket_assembly";
  racket_assembly.rotation.z = -0.52;
  root.add(racket_assembly);

  const head_group = new THREE.Group();
  head_group.name = "head_group";
  racket_assembly.add(head_group);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  racket_assembly.add(handle_group);

  const head_frameMat = new THREE.MeshStandardMaterial({
    color: 0x18d51b,
    metalness: 0.0,
    roughness: 0.3
  });

  const stringMat = new THREE.MeshStandardMaterial({
    color: 0x48d943,
    metalness: 0.0,
    roughness: 0.7
  });

  const grommetMat = new THREE.MeshStandardMaterial({
    color: 0x111511,
    metalness: 0.0,
    roughness: 0.8
  });

  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x101312,
    metalness: 0.0,
    roughness: 0.7
  });

  const grip_seamMat = new THREE.MeshStandardMaterial({
    color: 0x343936,
    metalness: 0.0,
    roughness: 0.8
  });

  const logoMat = new THREE.MeshStandardMaterial({
    color: 0xe8eee8,
    metalness: 0.0,
    roughness: 0.7
  });

  const head_framePoints = [
    new THREE.Vector3(0.00, 1.48, 0),
    new THREE.Vector3(0.42, 1.43, 0),
    new THREE.Vector3(0.68, 1.18, 0),
    new THREE.Vector3(0.79, 0.78, 0),
    new THREE.Vector3(0.78, 0.35, 0),
    new THREE.Vector3(0.66, -0.04, 0),
    new THREE.Vector3(0.43, -0.28, 0),
    new THREE.Vector3(0.00, -0.40, 0),
    new THREE.Vector3(-0.43, -0.28, 0),
    new THREE.Vector3(-0.66, -0.04, 0),
    new THREE.Vector3(-0.78, 0.35, 0),
    new THREE.Vector3(-0.79, 0.78, 0),
    new THREE.Vector3(-0.68, 1.18, 0),
    new THREE.Vector3(-0.42, 1.43, 0)
  ];

  const head_frameCurve = new THREE.CatmullRomCurve3(
    head_framePoints,
    true,
    "centripetal"
  );
  const head_frameGeom = new THREE.TubeGeometry(
    head_frameCurve,
    128,
    0.058,
    12,
    true
  );
  const head_frame = new THREE.Mesh(head_frameGeom, head_frameMat);
  head_frame.name = "head_frame";
  head_group.add(head_frame);

  const inner_grommet_trackPoints = head_framePoints.map(
    (point) => new THREE.Vector3(point.x * 0.94, point.y * 0.94, 0.052)
  );
  const inner_grommet_trackCurve = new THREE.CatmullRomCurve3(
    inner_grommet_trackPoints,
    true,
    "centripetal"
  );
  const inner_grommet_trackGeom = new THREE.TubeGeometry(
    inner_grommet_trackCurve,
    128,
    0.012,
    6,
    true
  );
  const inner_grommet_track = new THREE.Mesh(
    inner_grommet_trackGeom,
    grommetMat
  );
  inner_grommet_track.name = "inner_grommet_track";
  head_group.add(inner_grommet_track);

  const left_shaftPoints = [
    new THREE.Vector3(-0.035, -1.03, 0),
    new THREE.Vector3(-0.10, -0.78, 0),
    new THREE.Vector3(-0.22, -0.53, 0),
    new THREE.Vector3(-0.39, -0.31, 0)
  ];
  const left_shaftCurve = new THREE.CatmullRomCurve3(
    left_shaftPoints,
    false,
    "centripetal"
  );
  const left_shaftGeom = new THREE.TubeGeometry(
    left_shaftCurve,
    32,
    0.052,
    10,
    false
  );
  const left_shaft = new THREE.Mesh(left_shaftGeom, head_frameMat);
  left_shaft.name = "left_shaft";
  head_group.add(left_shaft);

  const right_shaftPoints = [
    new THREE.Vector3(0.035, -1.03, 0),
    new THREE.Vector3(0.10, -0.78, 0),
    new THREE.Vector3(0.22, -0.53, 0),
    new THREE.Vector3(0.39, -0.31, 0)
  ];
  const right_shaftCurve = new THREE.CatmullRomCurve3(
    right_shaftPoints,
    false,
    "centripetal"
  );
  const right_shaftGeom = new THREE.TubeGeometry(
    right_shaftCurve,
    32,
    0.052,
    10,
    false
  );
  const right_shaft = new THREE.Mesh(right_shaftGeom, head_frameMat);
  right_shaft.name = "right_shaft";
  head_group.add(right_shaft);

  const throat_bridgePoints = [
    new THREE.Vector3(-0.23, -0.54, 0),
    new THREE.Vector3(-0.11, -0.46, 0),
    new THREE.Vector3(0.00, -0.43, 0),
    new THREE.Vector3(0.11, -0.46, 0),
    new THREE.Vector3(0.23, -0.54, 0)
  ];
  const throat_bridgeCurve = new THREE.CatmullRomCurve3(
    throat_bridgePoints,
    false,
    "centripetal"
  );
  const throat_bridgeGeom = new THREE.TubeGeometry(
    throat_bridgeCurve,
    24,
    0.043,
    10,
    false
  );
  const throat_bridge = new THREE.Mesh(throat_bridgeGeom, head_frameMat);
  throat_bridge.name = "throat_bridge";
  head_group.add(throat_bridge);

  const vibration_dampenerGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.018,
    20
  );
  const vibration_dampener = new THREE.Mesh(
    vibration_dampenerGeom,
    grommetMat
  );
  vibration_dampener.name = "vibration_dampener";
  vibration_dampener.rotation.x = Math.PI / 2;
  vibration_dampener.position.set(0, -0.16, 0.032);
  head_group.add(vibration_dampener);

  const vibration_dampener_logoGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.021,
    16
  );
  const vibration_dampener_logo = new THREE.Mesh(
    vibration_dampener_logoGeom,
    logoMat
  );
  vibration_dampener_logo.name = "vibration_dampener_logo";
  vibration_dampener_logo.rotation.x = Math.PI / 2;
  vibration_dampener_logo.position.set(0, -0.16, 0.043);
  head_group.add(vibration_dampener_logo);

  const stringEllipseRadiusX = 0.69;
  const stringEllipseRadiusY = 0.84;
  const stringEllipseCenterY = 0.55;
  const verticalStringCount = 17;
  const horizontalStringCount = 19;
  const stringGeom = new THREE.CylinderGeometry(0.0055, 0.0055, 1, 6);

  const vertical_strings = new THREE.InstancedMesh(
    stringGeom,
    stringMat,
    verticalStringCount
  );
  vertical_strings.name = "vertical_strings";

  const horizontal_strings = new THREE.InstancedMesh(
    stringGeom,
    stringMat,
    horizontalStringCount
  );
  horizontal_strings.name = "horizontal_strings";

  const string_dummy = new THREE.Object3D();

  for (let i = 0; i < verticalStringCount; i++) {
    const x =
      -stringEllipseRadiusX * 0.93 +
      (stringEllipseRadiusX * 1.86 * i) / (verticalStringCount - 1);
    const ratio = x / stringEllipseRadiusX;
    const halfLength =
      stringEllipseRadiusY * Math.sqrt(Math.max(0, 1 - ratio * ratio));

    string_dummy.position.set(
      x,
      stringEllipseCenterY,
      -0.006 + (i % 2) * 0.004
    );
    string_dummy.rotation.set(0, 0, 0);
    string_dummy.scale.set(1, halfLength * 2, 1);
    string_dummy.updateMatrix();
    vertical_strings.setMatrixAt(i, string_dummy.matrix);
  }
  vertical_strings.instanceMatrix.needsUpdate = true;
  head_group.add(vertical_strings);

  for (let i = 0; i < horizontalStringCount; i++) {
    const yLocal =
      -stringEllipseRadiusY * 0.93 +
      (stringEllipseRadiusY * 1.86 * i) / (horizontalStringCount - 1);
    const ratio = yLocal / stringEllipseRadiusY;
    const halfLength =
      stringEllipseRadiusX * Math.sqrt(Math.max(0, 1 - ratio * ratio));

    string_dummy.position.set(
      0,
      stringEllipseCenterY + yLocal,
      -0.002 + (i % 2) * 0.004
    );
    string_dummy.rotation.set(0, 0, Math.PI / 2);
    string_dummy.scale.set(1, halfLength * 2, 1);
    string_dummy.updateMatrix();
    horizontal_strings.setMatrixAt(i, string_dummy.matrix);
  }
  horizontal_strings.instanceMatrix.needsUpdate = true;
  head_group.add(horizontal_strings);

  const grommetCount = 46;
  const grommetGeom = new THREE.SphereGeometry(0.016, 8, 6);
  const frame_grommets = new THREE.InstancedMesh(
    grommetGeom,
    grommetMat,
    grommetCount
  );
  frame_grommets.name = "frame_grommets";

  const grommet_dummy = new THREE.Object3D();
  for (let i = 0; i < grommetCount; i++) {
    const point = head_frameCurve.getPointAt(i / grommetCount);
    grommet_dummy.position.set(point.x * 0.94, point.y * 0.94, 0.064);
    grommet_dummy.rotation.set(0, 0, 0);
    grommet_dummy.scale.set(1, 1, 0.65);
    grommet_dummy.updateMatrix();
    frame_grommets.setMatrixAt(i, grommet_dummy.matrix);
  }
  frame_grommets.instanceMatrix.needsUpdate = true;
  head_group.add(frame_grommets);

  const gripGeom = new THREE.CylinderGeometry(0.078, 0.108, 1.05, 20);
  const grip = new THREE.Mesh(gripGeom, gripMat);
  grip.name = "grip";
  grip.position.set(0, -1.53, 0);
  handle_group.add(grip);

  const grip_collarGeom = new THREE.CylinderGeometry(
    0.082,
    0.091,
    0.12,
    20
  );
  const grip_collar = new THREE.Mesh(grip_collarGeom, gripMat);
  grip_collar.name = "grip_collar";
  grip_collar.position.set(0, -1.01, 0);
  handle_group.add(grip_collar);

  const grip_wrapPoints = [];
  const gripWrapSteps = 144;
  const gripWrapTurns = 8;
  for (let i = 0; i <= gripWrapSteps; i++) {
    const t = i / gripWrapSteps;
    const angle = t * Math.PI * 2 * gripWrapTurns;
    const radius = 0.083 + t * 0.027;
    grip_wrapPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        -1.02 - t * 1.01,
        Math.sin(angle) * radius
      )
    );
  }
  const grip_wrapCurve = new THREE.CatmullRomCurve3(
    grip_wrapPoints,
    false,
    "centripetal"
  );
  const grip_wrapGeom = new THREE.TubeGeometry(
    grip_wrapCurve,
    180,
    0.006,
    6,
    false
  );
  const grip_wrap = new THREE.Mesh(grip_wrapGeom, grip_seamMat);
  grip_wrap.name = "grip_wrap";
  handle_group.add(grip_wrap);

  const grip_bandGeom = new THREE.TorusGeometry(0.09, 0.007, 6, 24);
  const grip_band = new THREE.Mesh(grip_bandGeom, grip_seamMat);
  grip_band.name = "grip_band";
  grip_band.rotation.x = Math.PI / 2;
  grip_band.position.set(0, -1.065, 0);
  handle_group.add(grip_band);

  const butt_cap_flareGeom = new THREE.CylinderGeometry(
    0.108,
    0.145,
    0.14,
    20
  );
  const butt_cap_flare = new THREE.Mesh(butt_cap_flareGeom, gripMat);
  butt_cap_flare.name = "butt_cap_flare";
  butt_cap_flare.position.set(0, -2.12, 0);
  handle_group.add(butt_cap_flare);

  const butt_cap_ringGeom = new THREE.TorusGeometry(0.132, 0.012, 8, 28);
  const butt_cap_ring = new THREE.Mesh(butt_cap_ringGeom, grip_seamMat);
  butt_cap_ring.name = "butt_cap_ring";
  butt_cap_ring.rotation.x = Math.PI / 2;
  butt_cap_ring.position.set(0, -2.18, 0);
  handle_group.add(butt_cap_ring);

  const butt_end_plugGeom = new THREE.CylinderGeometry(
    0.116,
    0.116,
    0.018,
    20
  );
  const butt_end_plug = new THREE.Mesh(butt_end_plugGeom, grip_seamMat);
  butt_end_plug.name = "butt_end_plug";
  butt_end_plug.position.set(0, -2.195, 0);
  handle_group.add(butt_end_plug);

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