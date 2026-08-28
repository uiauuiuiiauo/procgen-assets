export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "thatched_parasol";

  const canopy = new THREE.Group();
  canopy.name = "canopy";
  root.add(canopy);

  const handle = new THREE.Group();
  handle.name = "handle";
  root.add(handle);

  const canopy_slatsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.9,
  });
  const support_ribsMat = new THREE.MeshStandardMaterial({
    color: 0x93622f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0x8d897c,
    metalness: 0.0,
    roughness: 0.95,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9b6a38,
    metalness: 0.0,
    roughness: 0.6,
  });
  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x76502d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: 0xb98448,
    metalness: 0.0,
    roughness: 0.9,
  });

  const canopyY0 = 0.43;
  const canopyY1 = 1.39;
  const canopyR0 = 0.075;
  const canopyR1 = 1.22;
  const slatCount = 112;
  const slatThickness = 0.014;
  const slatDepth = 0.028;
  const slatColors = [
    new THREE.Color(0xd9ad68),
    new THREE.Color(0xe7c17d),
    new THREE.Color(0xc99552),
    new THREE.Color(0xedcf91),
    new THREE.Color(0xb98445),
  ];
  const up = new THREE.Vector3(0, 1, 0);
  const dummy = new THREE.Object3D();

  function canopyHeight(radius) {
    const t = Math.max(0, Math.min(1, (radius - canopyR0) / (canopyR1 - canopyR0)));
    return canopyY1 - (canopyY1 - canopyY0) * Math.pow(t, 1.08);
  }

  function setCylinderBetween(instanced, index, start, end, widthScale) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    dummy.position.copy(start).add(end).multiplyScalar(0.5);
    dummy.quaternion.setFromUnitVectors(up, direction.normalize());
    dummy.scale.set(widthScale, length, widthScale);
    dummy.updateMatrix();
    instanced.setMatrixAt(index, dummy.matrix);
  }

  const support_ribsGeom = new THREE.CylinderGeometry(
    slatThickness * 0.72,
    slatThickness * 0.72,
    1,
    7
  );
  const support_ribs = new THREE.InstancedMesh(
    support_ribsGeom,
    support_ribsMat,
    slatCount
  );
  support_ribs.name = "support_ribs";
  support_ribs.frustumCulled = false;

  for (let i = 0; i < slatCount; i++) {
    const angle = i / slatCount * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const innerR = 0.065;
    const outerR = 1.225;
    const start = new THREE.Vector3(
      cos * innerR,
      canopyHeight(innerR) - 0.025,
      sin * innerR
    );
    const end = new THREE.Vector3(
      cos * outerR,
      canopyHeight(outerR) - 0.025,
      sin * outerR
    );
    setCylinderBetween(support_ribs, i, start, end, 1);
  }
  support_ribs.instanceMatrix.needsUpdate = true;
  canopy.add(support_ribs);

  const canopy_slatsGeom = new THREE.CylinderGeometry(
    slatThickness,
    slatThickness * 0.94,
    1,
    7
  );
  const canopy_slats = new THREE.InstancedMesh(
    canopy_slatsGeom,
    canopy_slatsMat,
    slatCount
  );
  canopy_slats.name = "canopy_slats";
  canopy_slats.frustumCulled = false;

  for (let i = 0; i < slatCount; i++) {
    const angle = i / slatCount * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const innerR = 0.068;
    const outerR = 1.222 + 0.014 * Math.sin(i * 2.17);
    const thicknessScale = 0.88 + 0.18 * (0.5 + 0.5 * Math.sin(i * 1.73));
    const start = new THREE.Vector3(
      cos * innerR,
      canopyHeight(innerR),
      sin * innerR
    );
    const end = new THREE.Vector3(
      cos * outerR,
      canopyHeight(outerR) + 0.006 * Math.sin(i * 1.31),
      sin * outerR
    );
    setCylinderBetween(canopy_slats, i, start, end, thicknessScale);
    canopy_slats.setColorAt(i, slatColors[(i * 3 + 1) % slatColors.length]);
  }
  canopy_slats.instanceMatrix.needsUpdate = true;
  if (canopy_slats.instanceColor) canopy_slats.instanceColor.needsUpdate = true;
  canopy.add(canopy_slats);

  const frayed_edge_strawsGeom = new THREE.CylinderGeometry(
    slatThickness * 0.55,
    slatThickness * 0.48,
    1,
    6
  );
  const frayed_edge_straws = new THREE.InstancedMesh(
    frayed_edge_strawsGeom,
    canopy_slatsMat,
    slatCount
  );
  frayed_edge_straws.name = "frayed_edge_straws";
  frayed_edge_straws.frustumCulled = false;

  for (let i = 0; i < slatCount; i++) {
    const angle = i / slatCount * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tangent = new THREE.Vector3(-sin, 0, cos);
    const innerR = 1.08 + 0.018 * Math.sin(i * 1.19);
    const outerR = 1.255 + 0.055 * (0.5 + 0.5 * Math.sin(i * 2.41));
    const start = new THREE.Vector3(
      cos * innerR,
      canopyHeight(innerR) + 0.012,
      sin * innerR
    );
    const end = new THREE.Vector3(
      cos * outerR + tangent.x * 0.018 * Math.sin(i * 1.67),
      canopyHeight(outerR) - 0.018 + 0.045 * Math.sin(i * 2.07),
      cos * outerR + tangent.z * 0.018 * Math.sin(i * 1.67)
    );
    const widthScale = 0.72 + 0.25 * (0.5 + 0.5 * Math.sin(i * 1.43));
    setCylinderBetween(frayed_edge_straws, i, start, end, widthScale);
    frayed_edge_straws.setColorAt(
      i,
      slatColors[(i * 2 + 3) % slatColors.length]
    );
  }
  frayed_edge_straws.instanceMatrix.needsUpdate = true;
  if (frayed_edge_straws.instanceColor) {
    frayed_edge_straws.instanceColor.needsUpdate = true;
  }
  canopy.add(frayed_edge_straws);

  const under_edge_strawsGeom = new THREE.CylinderGeometry(
    slatThickness * 0.48,
    slatThickness * 0.4,
    1,
    6
  );
  const under_edge_straws = new THREE.InstancedMesh(
    under_edge_strawsGeom,
    canopy_slatsMat,
    72
  );
  under_edge_straws.name = "under_edge_straws";
  under_edge_straws.frustumCulled = false;

  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tangent = new THREE.Vector3(-sin, 0, cos);
    const innerR = 1.10;
    const outerR = 1.25 + 0.045 * (0.5 + 0.5 * Math.sin(i * 2.29));
    const start = new THREE.Vector3(
      cos * innerR,
      canopyHeight(innerR) - 0.018,
      sin * innerR
    );
    const end = new THREE.Vector3(
      cos * outerR + tangent.x * 0.015 * Math.sin(i * 1.53),
      canopyHeight(outerR) - 0.045 - 0.055 * (0.5 + 0.5 * Math.sin(i * 1.87)),
      sin * outerR + tangent.z * 0.015 * Math.sin(i * 1.53)
    );
    setCylinderBetween(under_edge_straws, i, start, end, 0.8);
    under_edge_straws.setColorAt(
      i,
      slatColors[(i * 3 + 2) % slatColors.length]
    );
  }
  under_edge_straws.instanceMatrix.needsUpdate = true;
  if (under_edge_straws.instanceColor) {
    under_edge_straws.instanceColor.needsUpdate = true;
  }
  canopy.add(under_edge_straws);

  const edge_bindingGeom = new THREE.TorusGeometry(1.215, 0.014, 8, 128);
  const edge_binding = new THREE.Mesh(edge_bindingGeom, ropeMat);
  edge_binding.name = "edge_binding";
  edge_binding.rotation.x = Math.PI / 2;
  edge_binding.position.y = canopyHeight(1.215) + 0.002;
  canopy.add(edge_binding);

  const inner_bindingGeom = new THREE.TorusGeometry(1.175, 0.007, 7, 128);
  const inner_binding = new THREE.Mesh(inner_bindingGeom, ropeMat);
  inner_binding.name = "inner_binding";
  inner_binding.rotation.x = Math.PI / 2;
  inner_binding.position.y = canopyHeight(1.175) + 0.014;
  canopy.add(inner_binding);

  const middle_bindingGeom = new THREE.TorusGeometry(0.69, 0.009, 7, 96);
  const middle_binding = new THREE.Mesh(middle_bindingGeom, ropeMat);
  middle_binding.name = "middle_binding";
  middle_binding.rotation.x = Math.PI / 2;
  middle_binding.position.y = canopyHeight(0.69) + 0.014;
  canopy.add(middle_binding);

  const upper_bindingGeom = new THREE.TorusGeometry(0.39, 0.008, 7, 72);
  const upper_binding = new THREE.Mesh(upper_bindingGeom, ropeMat);
  upper_binding.name = "upper_binding";
  upper_binding.rotation.x = Math.PI / 2;
  upper_binding.position.y = canopyHeight(0.39) + 0.013;
  canopy.add(upper_binding);

  const crown_bindingGeom = new THREE.TorusGeometry(0.215, 0.009, 7, 64);
  const crown_binding = new THREE.Mesh(crown_bindingGeom, ropeMat);
  crown_binding.name = "crown_binding";
  crown_binding.rotation.x = Math.PI / 2;
  crown_binding.position.y = canopyHeight(0.215) + 0.012;
  canopy.add(crown_binding);

  const edge_knotsGeom = new THREE.TorusGeometry(0.017, 0.0045, 6, 12);
  const edge_knots = new THREE.InstancedMesh(
    edge_knotsGeom,
    ropeMat,
    56
  );
  edge_knots.name = "edge_knots";
  edge_knots.frustumCulled = false;

  for (let i = 0; i < 56; i++) {
    const angle = i / 56 * Math.PI * 2;
    const radius = 1.215 + 0.006 * Math.sin(i * 1.91);
    dummy.position.set(
      Math.cos(angle) * radius,
      canopyHeight(radius) + 0.012 + 0.005 * Math.sin(i * 2.23),
      Math.sin(angle) * radius
    );
    dummy.rotation.set(0, -angle, 0);
    dummy.scale.set(1, 0.72 + 0.16 * (0.5 + 0.5 * Math.sin(i * 1.37)), 1);
    dummy.updateMatrix();
    edge_knots.setMatrixAt(i, dummy.matrix);
  }
  edge_knots.instanceMatrix.needsUpdate = true;
  canopy.add(edge_knots);

  const center_poleGeom = new THREE.CylinderGeometry(0.031, 0.033, 1.49, 18);
  const center_pole = new THREE.Mesh(center_poleGeom, woodMat);
  center_pole.name = "center_pole";
  center_pole.position.y = 0.235;
  handle.add(center_pole);

  const lower_gripGeom = new THREE.CylinderGeometry(0.044, 0.046, 0.44, 18);
  const lower_grip = new THREE.Mesh(lower_gripGeom, woodMat);
  lower_grip.name = "lower_grip";
  lower_grip.position.y = -0.44;
  handle.add(lower_grip);

  const grip_bottomGeom = new THREE.SphereGeometry(0.046, 18, 10);
  const grip_bottom = new THREE.Mesh(grip_bottomGeom, woodMat);
  grip_bottom.name = "grip_bottom";
  grip_bottom.position.y = -0.66;
  grip_bottom.scale.set(1, 0.55, 1);
  handle.add(grip_bottom);

  const grip_wrap_ringsGeom = new THREE.TorusGeometry(0.0455, 0.0045, 7, 32);
  const grip_wrap_rings = new THREE.InstancedMesh(
    grip_wrap_ringsGeom,
    ropeMat,
    4
  );
  grip_wrap_rings.name = "grip_wrap_rings";
  grip_wrap_rings.frustumCulled = false;

  for (let i = 0; i < 4; i++) {
    dummy.position.set(0, -0.247 + i * 0.012, 0);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    grip_wrap_rings.setMatrixAt(i, dummy.matrix);
  }
  grip_wrap_rings.instanceMatrix.needsUpdate = true;
  handle.add(grip_wrap_rings);

  const pole_grainGeom = new THREE.CylinderGeometry(0.0015, 0.0015, 1, 5);
  const pole_grain = new THREE.InstancedMesh(
    pole_grainGeom,
    dark_woodMat,
    10
  );
  pole_grain.name = "pole_grain";
  pole_grain.frustumCulled = false;

  for (let i = 0; i < 10; i++) {
    const angle = i / 10 * Math.PI * 2;
    const radius = 0.0335;
    const start = new THREE.Vector3(
      Math.cos(angle) * radius,
      -0.19 + 0.012 * Math.sin(i * 1.41),
      Math.sin(angle) * radius
    );
    const end = new THREE.Vector3(
      Math.cos(angle) * radius,
      0.66 - 0.025 * Math.sin(i * 1.17),
      Math.sin(angle) * radius
    );
    setCylinderBetween(pole_grain, i, start, end, 1);
  }
  pole_grain.instanceMatrix.needsUpdate = true;
  handle.add(pole_grain);

  const grip_grainGeom = new THREE.CylinderGeometry(0.0016, 0.0016, 1, 5);
  const grip_grain = new THREE.InstancedMesh(
    grip_grainGeom,
    dark_woodMat,
    9
  );
  grip_grain.name = "grip_grain";
  grip_grain.frustumCulled = false;

  for (let i = 0; i < 9; i++) {
    const angle = i / 9 * Math.PI * 2;
    const radius = 0.0455;
    const start = new THREE.Vector3(
      Math.cos(angle) * radius,
      -0.635 + 0.01 * Math.sin(i * 1.31),
      Math.sin(angle) * radius
    );
    const end = new THREE.Vector3(
      Math.cos(angle) * radius,
      -0.27 - 0.008 * Math.sin(i * 1.73),
      Math.sin(angle) * radius
    );
    setCylinderBetween(grip_grain, i, start, end, 1);
  }
  grip_grain.instanceMatrix.needsUpdate = true;
  handle.add(grip_grain);

  const canopy_capGeom = new THREE.CylinderGeometry(0.073, 0.092, 0.14, 20);
  const canopy_cap = new THREE.Mesh(canopy_capGeom, capMat);
  canopy_cap.name = "canopy_cap";
  canopy_cap.position.y = 1.46;
  canopy.add(canopy_cap);

  const cap_topGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.012, 20);
  const cap_top = new THREE.Mesh(cap_topGeom, capMat);
  cap_top.name = "cap_top";
  cap_top.position.y = 1.536;
  canopy.add(cap_top);

  const cap_groovesGeom = new THREE.CylinderGeometry(0.0018, 0.0018, 1, 5);
  const cap_grooves = new THREE.InstancedMesh(
    cap_groovesGeom,
    dark_woodMat,
    16
  );
  cap_grooves.name = "cap_grooves";
  cap_grooves.frustumCulled = false;

  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const radius = 0.088;
    const start = new THREE.Vector3(
      Math.cos(angle) * radius,
      1.401,
      Math.sin(angle) * radius
    );
    const end = new THREE.Vector3(
      Math.cos(angle) * radius,
      1.522 + 0.005 * Math.sin(i * 1.57),
      Math.sin(angle) * radius
    );
    setCylinderBetween(cap_grooves, i, start, end, 1);
  }
  cap_grooves.instanceMatrix.needsUpdate = true;
  canopy.add(cap_grooves);

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