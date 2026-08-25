export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bamboo_container";

  const bodyR = 0.34;
  const bodyH = 0.62;

  const bambooMat = new THREE.MeshStandardMaterial({
    color: 0xd7ad5c,
    metalness: 0.0,
    roughness: 0.6,
  });
  const lightBambooMat = new THREE.MeshStandardMaterial({
    color: 0xe6c98b,
    metalness: 0.0,
    roughness: 0.6,
  });
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0x95643a,
    metalness: 0.0,
    roughness: 0.9,
  });
  const darkBandMat = new THREE.MeshStandardMaterial({
    color: 0x50301d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0xa9783e,
    metalness: 0.0,
    roughness: 0.9,
  });
  const speckMat = new THREE.MeshStandardMaterial({
    color: 0x70421f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const cutEndMat = new THREE.MeshStandardMaterial({
    color: 0x9a744c,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const cutCoreMat = new THREE.MeshStandardMaterial({
    color: 0xc9a66f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function placeCylinderBetween(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );
  }

  function orientFlatPart(mesh, position, normal) {
    mesh.position.copy(position);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal.clone().normalize()
    );
  }

  const vessel_bodyGeom = new THREE.CylinderGeometry(
    bodyR,
    bodyR,
    bodyH,
    64,
    1,
    false
  );
  const vessel_body = new THREE.Mesh(vessel_bodyGeom, bambooMat);
  vessel_body.name = "vessel_body";
  vessel_body.position.y = bodyH * 0.5;
  root.add(vessel_body);

  const bottom_bandGeom = new THREE.CylinderGeometry(0.345, 0.345, 0.026, 64);
  const bottom_band = new THREE.Mesh(bottom_bandGeom, darkBandMat);
  bottom_band.name = "bottom_band";
  bottom_band.position.y = 0.013;
  root.add(bottom_band);

  const lower_wrap_bandGeom = new THREE.CylinderGeometry(
    0.344,
    0.344,
    0.012,
    64
  );
  const lower_wrap_band = new THREE.Mesh(lower_wrap_bandGeom, bandMat);
  lower_wrap_band.name = "lower_wrap_band";
  lower_wrap_band.position.y = 0.145;
  root.add(lower_wrap_band);

  const upper_body_bandGeom = new THREE.CylinderGeometry(
    0.347,
    0.347,
    0.028,
    64
  );
  const upper_body_band = new THREE.Mesh(upper_body_bandGeom, bandMat);
  upper_body_band.name = "upper_body_band";
  upper_body_band.position.y = 0.612;
  root.add(upper_body_band);

  const lid_shadow_gapGeom = new THREE.CylinderGeometry(
    0.348,
    0.348,
    0.014,
    64
  );
  const lid_shadow_gap = new THREE.Mesh(lid_shadow_gapGeom, darkBandMat);
  lid_shadow_gap.name = "lid_shadow_gap";
  lid_shadow_gap.position.y = 0.635;
  root.add(lid_shadow_gap);

  const lidProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.325, 0.0),
    new THREE.Vector2(0.352, 0.008),
    new THREE.Vector2(0.366, 0.023),
    new THREE.Vector2(0.368, 0.043),
    new THREE.Vector2(0.357, 0.061),
    new THREE.Vector2(0.325, 0.074),
    new THREE.Vector2(0.0, 0.074),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, lightBambooMat);
  lid.name = "lid";
  lid.position.y = 0.644;
  root.add(lid);

  const lid_edge_bandGeom = new THREE.TorusGeometry(0.359, 0.005, 8, 64);
  const lid_edge_band = new THREE.Mesh(lid_edge_bandGeom, bandMat);
  lid_edge_band.name = "lid_edge_band";
  lid_edge_band.rotation.x = Math.PI / 2;
  lid_edge_band.position.y = 0.684;
  root.add(lid_edge_band);

  const lid_grain_ringsGeom = new THREE.TorusGeometry(0.25, 0.0014, 6, 64);
  const lid_grain_rings = new THREE.InstancedMesh(
    lid_grain_ringsGeom,
    grainMat,
    3
  );
  lid_grain_rings.name = "lid_grain_rings";
  const ringQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const ringMatrix = new THREE.Matrix4();
  const lidRingRadii = [0.115, 0.215, 0.295];
  for (let i = 0; i < lidRingRadii.length; i++) {
    const scale = lidRingRadii[i] / 0.25;
    ringMatrix.compose(
      new THREE.Vector3(0, 0.719, 0),
      ringQuaternion,
      new THREE.Vector3(scale, scale, scale)
    );
    lid_grain_rings.setMatrixAt(i, ringMatrix);
  }
  lid_grain_rings.instanceMatrix.needsUpdate = true;
  root.add(lid_grain_rings);

  const body_grain_linesGeom = new THREE.BoxGeometry(0.0025, 0.43, 0.0015);
  const body_grain_lines = new THREE.InstancedMesh(
    body_grain_linesGeom,
    grainMat,
    18
  );
  body_grain_lines.name = "body_grain_lines";
  const grainMatrix = new THREE.Matrix4();
  const grainNormal = new THREE.Vector3();
  const grainQuaternion = new THREE.Quaternion();
  const localNormal = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    grainNormal.set(Math.cos(angle), 0, Math.sin(angle));
    grainQuaternion.setFromUnitVectors(localNormal, grainNormal);
    grainMatrix.compose(
      new THREE.Vector3(
        grainNormal.x * (bodyR + 0.001),
        0.37,
        grainNormal.z * (bodyR + 0.001)
      ),
      grainQuaternion,
      new THREE.Vector3(1, 0.86 + (i % 4) * 0.045, 1)
    );
    body_grain_lines.setMatrixAt(i, grainMatrix);
  }
  body_grain_lines.instanceMatrix.needsUpdate = true;
  root.add(body_grain_lines);

  const body_specklesGeom = new THREE.CircleGeometry(0.008, 10);
  const body_speckles = new THREE.InstancedMesh(
    body_specklesGeom,
    speckMat,
    12
  );
  body_speckles.name = "body_speckles";
  const speckMatrix = new THREE.Matrix4();
  for (let i = 0; i < 12; i++) {
    const angle = 0.35 + (((i * 7) % 17) / 16) * 2.42;
    const y = 0.11 + (((i * 5) % 12) / 11) * 0.45;
    grainNormal.set(Math.cos(angle), 0, Math.sin(angle));
    grainQuaternion.setFromUnitVectors(localNormal, grainNormal);
    speckMatrix.compose(
      new THREE.Vector3(
        grainNormal.x * (bodyR + 0.003),
        y,
        grainNormal.z * (bodyR + 0.003)
      ),
      grainQuaternion,
      new THREE.Vector3(
        0.45 + (i % 3) * 0.18,
        0.28 + ((i + 1) % 4) * 0.12,
        1
      )
    );
    body_speckles.setMatrixAt(i, speckMatrix);
  }
  body_speckles.instanceMatrix.needsUpdate = true;
  root.add(body_speckles);

  const handlePoints = [
    new THREE.Vector3(-0.325, 0.555, 0.018),
    new THREE.Vector3(-0.355, 0.76, 0.018),
    new THREE.Vector3(-0.405, 0.96, 0.018),
    new THREE.Vector3(-0.315, 1.105, 0.018),
    new THREE.Vector3(-0.12, 1.205, 0.018),
    new THREE.Vector3(0.12, 1.225, 0.018),
    new THREE.Vector3(0.32, 1.17, 0.018),
    new THREE.Vector3(0.52, 1.02, 0.018),
    new THREE.Vector3(0.68, 0.82, 0.018),
    new THREE.Vector3(0.77, 0.68, 0.018),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    96,
    0.045,
    14,
    false
  );
  const handle = new THREE.Mesh(handleGeom, bambooMat);
  handle.name = "handle";
  root.add(handle);

  const handle_node_ringsGeom = new THREE.TorusGeometry(
    0.046,
    0.0045,
    7,
    24
  );
  const handle_node_rings = new THREE.InstancedMesh(
    handle_node_ringsGeom,
    darkBandMat,
    4
  );
  handle_node_rings.name = "handle_node_rings";
  const handleNodeTs = [0.17, 0.19, 0.515, 0.535];
  const handleNodeMatrix = new THREE.Matrix4();
  const axisZ = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < handleNodeTs.length; i++) {
    const t = handleNodeTs[i];
    const point = handleCurve.getPointAt(t);
    const tangent = handleCurve.getTangentAt(t).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      axisZ,
      tangent
    );
    handleNodeMatrix.compose(
      point,
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    handle_node_rings.setMatrixAt(i, handleNodeMatrix);
  }
  handle_node_rings.instanceMatrix.needsUpdate = true;
  root.add(handle_node_rings);

  const handleStart = handleCurve.getPointAt(0);
  const handleStartTangent = handleCurve.getTangentAt(0).normalize();

  const handle_lower_cutGeom = new THREE.CircleGeometry(0.0425, 24);
  const handle_lower_cut = new THREE.Mesh(handle_lower_cutGeom, cutEndMat);
  handle_lower_cut.name = "handle_lower_cut";
  orientFlatPart(
    handle_lower_cut,
    handleStart
      .clone()
      .addScaledVector(handleStartTangent, -0.002),
    handleStartTangent.clone().multiplyScalar(-1)
  );
  root.add(handle_lower_cut);

  const handle_lower_coreGeom = new THREE.CircleGeometry(0.027, 20);
  const handle_lower_core = new THREE.Mesh(
    handle_lower_coreGeom,
    cutCoreMat
  );
  handle_lower_core.name = "handle_lower_core";
  orientFlatPart(
    handle_lower_core,
    handleStart
      .clone()
      .addScaledVector(handleStartTangent, -0.003),
    handleStartTangent.clone().multiplyScalar(-1)
  );
  root.add(handle_lower_core);

  const handleEnd = handleCurve.getPointAt(1);
  const handleEndTangent = handleCurve.getTangentAt(1).normalize();

  const handle_end_cutGeom = new THREE.CircleGeometry(0.0425, 24);
  const handle_end_cut = new THREE.Mesh(handle_end_cutGeom, cutEndMat);
  handle_end_cut.name = "handle_end_cut";
  orientFlatPart(
    handle_end_cut,
    handleEnd.clone().addScaledVector(handleEndTangent, 0.002),
    handleEndTangent
  );
  root.add(handle_end_cut);

  const handle_end_coreGeom = new THREE.CircleGeometry(0.027, 20);
  const handle_end_core = new THREE.Mesh(handle_end_coreGeom, cutCoreMat);
  handle_end_core.name = "handle_end_core";
  orientFlatPart(
    handle_end_core,
    handleEnd.clone().addScaledVector(handleEndTangent, 0.003),
    handleEndTangent
  );
  root.add(handle_end_core);

  const spoutStart = new THREE.Vector3(-0.29, 0.43, 0.015);
  const spoutEnd = new THREE.Vector3(-0.55, 0.65, 0.015);
  const spoutDirection = new THREE.Vector3().subVectors(spoutEnd, spoutStart);
  const spoutLength = spoutDirection.length();

  const spoutGeom = new THREE.CylinderGeometry(
    0.058,
    0.069,
    spoutLength,
    28,
    1,
    false
  );
  const spout = new THREE.Mesh(spoutGeom, bambooMat);
  spout.name = "spout";
  placeCylinderBetween(spout, spoutStart, spoutEnd);
  root.add(spout);

  const spout_collar_start = spoutStart
    .clone()
    .addScaledVector(spoutDirection.clone().normalize(), 0.012);
  const spout_collar_end = spoutStart
    .clone()
    .addScaledVector(spoutDirection.clone().normalize(), 0.047);
  const spout_base_collarGeom = new THREE.CylinderGeometry(
    0.073,
    0.073,
    0.035,
    28
  );
  const spout_base_collar = new THREE.Mesh(
    spout_base_collarGeom,
    darkBandMat
  );
  spout_base_collar.name = "spout_base_collar";
  placeCylinderBetween(
    spout_base_collar,
    spout_collar_start,
    spout_collar_end
  );
  root.add(spout_base_collar);

  const spoutEndDirection = spoutDirection.clone().normalize();
  const spout_mouth_rimGeom = new THREE.RingGeometry(0.039, 0.058, 28);
  const spout_mouth_rim = new THREE.Mesh(spout_mouth_rimGeom, darkBandMat);
  spout_mouth_rim.name = "spout_mouth_rim";
  orientFlatPart(
    spout_mouth_rim,
    spoutEnd.clone().addScaledVector(spoutEndDirection, 0.002),
    spoutEndDirection
  );
  root.add(spout_mouth_rim);

  const spout_mouthGeom = new THREE.CircleGeometry(0.039, 28);
  const spout_mouth = new THREE.Mesh(spout_mouthGeom, cutEndMat);
  spout_mouth.name = "spout_mouth";
  orientFlatPart(
    spout_mouth,
    spoutEnd.clone().addScaledVector(spoutEndDirection, 0.003),
    spoutEndDirection
  );
  root.add(spout_mouth);

  const mountingBracketPoints = [
    new THREE.Vector3(-0.326, 0.475, 0.025),
    new THREE.Vector3(-0.365, 0.49, 0.025),
    new THREE.Vector3(-0.39, 0.535, 0.025),
    new THREE.Vector3(-0.365, 0.575, 0.025),
    new THREE.Vector3(-0.325, 0.565, 0.025),
  ];
  const mountingBracketCurve = new THREE.CatmullRomCurve3(
    mountingBracketPoints,
    false,
    "centripetal"
  );
  const mounting_bracketGeom = new THREE.TubeGeometry(
    mountingBracketCurve,
    24,
    0.006,
    8,
    false
  );
  const mounting_bracket = new THREE.Mesh(
    mounting_bracketGeom,
    metalMat
  );
  mounting_bracket.name = "mounting_bracket";
  root.add(mounting_bracket);

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