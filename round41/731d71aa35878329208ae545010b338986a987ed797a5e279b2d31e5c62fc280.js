export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hanging_bamboo_lantern";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const cage_group = new THREE.Group();
  cage_group.name = "cage_group";
  const light_group = new THREE.Group();
  light_group.name = "light_group";
  const suspension_group = new THREE.Group();
  suspension_group.name = "suspension_group";
  root.add(base_group, cage_group, light_group, suspension_group);

  const bambooMat = new THREE.MeshStandardMaterial({
    color: 0xc99552,
    metalness: 0.0,
    roughness: 0.6
  });
  const bambooLightMat = new THREE.MeshStandardMaterial({
    color: 0xddb472,
    metalness: 0.0,
    roughness: 0.6
  });
  const rattanMat = new THREE.MeshStandardMaterial({
    color: 0xb98649,
    metalness: 0.0,
    roughness: 0.9
  });
  const bindingMat = new THREE.MeshStandardMaterial({
    color: 0x5b3b21,
    metalness: 0.0,
    roughness: 0.9
  });
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0xb99a69,
    metalness: 0.0,
    roughness: 0.95
  });
  const frosted_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xf1eee6,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true
  });
  const socketMat = new THREE.MeshStandardMaterial({
    color: 0x8c7455,
    metalness: 0.0,
    roughness: 0.8
  });

  function makeTube(points, radius, material, tubularSegments, radialSegments) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      radius,
      radialSegments,
      false
    );
    return new THREE.Mesh(geometry, material);
  }

  function makeHorizontalTorus(geometry, material, y, name) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = y;
    return mesh;
  }

  const base_bottomGeom = new THREE.CylinderGeometry(0.54, 0.54, 0.026, 64);
  const base_bottom = new THREE.Mesh(base_bottomGeom, bindingMat);
  base_bottom.name = "base_bottom";
  base_bottom.position.y = -0.013;
  base_group.add(base_bottom);

  const base_plinthGeom = new THREE.CylinderGeometry(0.55, 0.57, 0.09, 64);
  const base_plinth = new THREE.Mesh(base_plinthGeom, bambooMat);
  base_plinth.name = "base_plinth";
  base_plinth.position.y = 0.045;
  base_group.add(base_plinth);

  const base_lower_ringGeom = new THREE.TorusGeometry(0.49, 0.055, 14, 64);
  const base_lower_ring = makeHorizontalTorus(
    base_lower_ringGeom,
    bambooLightMat,
    0.09,
    "base_lower_ring"
  );
  base_group.add(base_lower_ring);

  const base_upper_ringGeom = new THREE.TorusGeometry(0.43, 0.035, 12, 64);
  const base_upper_ring = makeHorizontalTorus(
    base_upper_ringGeom,
    bambooMat,
    0.15,
    "base_upper_ring"
  );
  base_group.add(base_upper_ring);

  const base_rope_trimGeom = new THREE.TorusGeometry(0.556, 0.006, 6, 64);
  const base_rope_trim = makeHorizontalTorus(
    base_rope_trimGeom,
    bindingMat,
    0.025,
    "base_rope_trim"
  );
  base_group.add(base_rope_trim);

  const base_bindingGeom = new THREE.TorusGeometry(0.057, 0.005, 6, 18);
  const base_bindings = new THREE.InstancedMesh(base_bindingGeom, bindingMat, 6);
  base_bindings.name = "base_bindings";
  const baseBindingDummy = new THREE.Object3D();
  const baseBindingAngles = [0.18, 0.92, 1.72, 2.55, 3.72, 5.15];
  for (let i = 0; i < baseBindingAngles.length; i++) {
    const angle = baseBindingAngles[i];
    const tangent = new THREE.Vector3(
      -Math.sin(angle),
      0,
      Math.cos(angle)
    ).normalize();
    baseBindingDummy.position.set(
      Math.cos(angle) * 0.49,
      0.09,
      Math.sin(angle) * 0.49
    );
    baseBindingDummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      tangent
    );
    baseBindingDummy.scale.set(1, 1, 1);
    baseBindingDummy.updateMatrix();
    base_bindings.setMatrixAt(i, baseBindingDummy.matrix);
  }
  base_bindings.instanceMatrix.needsUpdate = true;
  base_group.add(base_bindings);

  const ribPath = [
    new THREE.Vector3(0.36, 0.17, 0),
    new THREE.Vector3(0.43, 0.24, 0),
    new THREE.Vector3(0.52, 0.40, 0),
    new THREE.Vector3(0.59, 0.64, 0),
    new THREE.Vector3(0.60, 0.82, 0),
    new THREE.Vector3(0.56, 1.04, 0),
    new THREE.Vector3(0.48, 1.20, 0),
    new THREE.Vector3(0.36, 1.30, 0)
  ];
  const vertical_ribsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(ribPath, false, "centripetal"),
    36,
    0.035,
    10,
    false
  );
  const vertical_ribs = new THREE.InstancedMesh(
    vertical_ribsGeom,
    bambooLightMat,
    8
  );
  vertical_ribs.name = "vertical_ribs";
  const ribDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    ribDummy.position.set(0, 0, 0);
    ribDummy.rotation.set(0, i / 8 * Math.PI * 2, 0);
    ribDummy.scale.set(1, 1, 1);
    ribDummy.updateMatrix();
    vertical_ribs.setMatrixAt(i, ribDummy.matrix);
  }
  vertical_ribs.instanceMatrix.needsUpdate = true;
  cage_group.add(vertical_ribs);

  const rib_nodesGeom = new THREE.CylinderGeometry(0.041, 0.041, 0.05, 10);
  const rib_nodes = new THREE.InstancedMesh(rib_nodesGeom, bambooMat, 16);
  rib_nodes.name = "rib_nodes";
  const ribNodeDummy = new THREE.Object3D();
  const nodeHeights = [0.46, 0.96];
  const nodeRadii = [0.57, 0.55];
  let ribNodeIndex = 0;
  for (let level = 0; level < 2; level++) {
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      ribNodeDummy.position.set(
        Math.cos(angle) * nodeRadii[level],
        nodeHeights[level],
        Math.sin(angle) * nodeRadii[level]
      );
      ribNodeDummy.rotation.set(0, angle, 0);
      ribNodeDummy.scale.set(1, 1, 1);
      ribNodeDummy.updateMatrix();
      rib_nodes.setMatrixAt(ribNodeIndex++, ribNodeDummy.matrix);
    }
  }
  rib_nodes.instanceMatrix.needsUpdate = true;
  cage_group.add(rib_nodes);

  const rib_binding_collarsGeom = new THREE.TorusGeometry(0.042, 0.0045, 6, 16);
  const rib_binding_collars = new THREE.InstancedMesh(
    rib_binding_collarsGeom,
    bindingMat,
    16
  );
  rib_binding_collars.name = "rib_binding_collars";
  const collarDummy = new THREE.Object3D();
  let collarIndex = 0;
  for (let level = 0; level < 2; level++) {
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      collarDummy.position.set(
        Math.cos(angle) * nodeRadii[level],
        nodeHeights[level],
        Math.sin(angle) * nodeRadii[level]
      );
      collarDummy.rotation.set(Math.PI / 2, 0, 0);
      collarDummy.scale.set(1, 1, 1);
      collarDummy.updateMatrix();
      rib_binding_collars.setMatrixAt(collarIndex++, collarDummy.matrix);
    }
  }
  rib_binding_collars.instanceMatrix.needsUpdate = true;
  cage_group.add(rib_binding_collars);

  const hoopGeom = new THREE.TorusGeometry(1, 0.06, 10, 64);

  const lower_hoop = new THREE.Mesh(hoopGeom, bambooMat);
  lower_hoop.name = "lower_hoop";
  lower_hoop.rotation.x = Math.PI / 2;
  lower_hoop.position.y = 0.29;
  lower_hoop.scale.setScalar(0.45);
  cage_group.add(lower_hoop);

  const lower_middle_hoop = new THREE.Mesh(hoopGeom, bambooLightMat);
  lower_middle_hoop.name = "lower_middle_hoop";
  lower_middle_hoop.rotation.x = Math.PI / 2;
  lower_middle_hoop.position.y = 0.51;
  lower_middle_hoop.scale.setScalar(0.56);
  cage_group.add(lower_middle_hoop);

  const center_hoop = new THREE.Mesh(hoopGeom, bambooLightMat);
  center_hoop.name = "center_hoop";
  center_hoop.rotation.x = Math.PI / 2;
  center_hoop.position.y = 0.78;
  center_hoop.scale.setScalar(0.60);
  cage_group.add(center_hoop);

  const upper_middle_hoop = new THREE.Mesh(hoopGeom, bambooMat);
  upper_middle_hoop.name = "upper_middle_hoop";
  upper_middle_hoop.rotation.x = Math.PI / 2;
  upper_middle_hoop.position.y = 1.04;
  upper_middle_hoop.scale.setScalar(0.56);
  cage_group.add(upper_middle_hoop);

  const upper_hoop = new THREE.Mesh(hoopGeom, bambooLightMat);
  upper_hoop.name = "upper_hoop";
  upper_hoop.rotation.x = Math.PI / 2;
  upper_hoop.position.y = 1.20;
  upper_hoop.scale.setScalar(0.48);
  cage_group.add(upper_hoop);

  const hoopSpecs = [
    { y: 0.29, r: 0.45 },
    { y: 0.51, r: 0.56 },
    { y: 0.78, r: 0.60 },
    { y: 1.04, r: 0.56 },
    { y: 1.20, r: 0.48 }
  ];
  const hoop_bindingsGeom = new THREE.BoxGeometry(0.018, 0.058, 0.016);
  const hoop_bindings = new THREE.InstancedMesh(
    hoop_bindingsGeom,
    bindingMat,
    hoopSpecs.length * 4
  );
  hoop_bindings.name = "hoop_bindings";
  const hoopBindingDummy = new THREE.Object3D();
  let hoopBindingIndex = 0;
  for (let i = 0; i < hoopSpecs.length; i++) {
    for (let j = 0; j < 4; j++) {
      const angle = j / 4 * Math.PI * 2 + 0.12;
      hoopBindingDummy.position.set(
        Math.cos(angle) * hoopSpecs[i].r,
        hoopSpecs[i].y,
        Math.sin(angle) * hoopSpecs[i].r
      );
      hoopBindingDummy.rotation.set(0, Math.PI / 2 - angle, 0);
      hoopBindingDummy.scale.set(1, 1, 1);
      hoopBindingDummy.updateMatrix();
      hoop_bindings.setMatrixAt(hoopBindingIndex++, hoopBindingDummy.matrix);
    }
  }
  hoop_bindings.instanceMatrix.needsUpdate = true;
  cage_group.add(hoop_bindings);

  const top_rimGeom = new THREE.TorusGeometry(0.39, 0.055, 14, 64);
  const top_rim = makeHorizontalTorus(
    top_rimGeom,
    bambooLightMat,
    1.32,
    "top_rim"
  );
  cage_group.add(top_rim);

  const top_rim_innerGeom = new THREE.TorusGeometry(0.335, 0.018, 8, 64);
  const top_rim_inner = makeHorizontalTorus(
    top_rim_innerGeom,
    bambooMat,
    1.315,
    "top_rim_inner"
  );
  cage_group.add(top_rim_inner);

  const top_rim_bindingsGeom = new THREE.BoxGeometry(0.018, 0.105, 0.015);
  const top_rim_bindings = new THREE.InstancedMesh(
    top_rim_bindingsGeom,
    bindingMat,
    4
  );
  top_rim_bindings.name = "top_rim_bindings";
  const topBindingDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * Math.PI * 2 + 0.2;
    topBindingDummy.position.set(
      Math.cos(angle) * 0.39,
      1.32,
      Math.sin(angle) * 0.39
    );
    topBindingDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    topBindingDummy.scale.set(1, 1, 1);
    topBindingDummy.updateMatrix();
    top_rim_bindings.setMatrixAt(i, topBindingDummy.matrix);
  }
  top_rim_bindings.instanceMatrix.needsUpdate = true;
  cage_group.add(top_rim_bindings);

  const top_weaveGeom = new THREE.TorusGeometry(1, 0.028, 6, 64);
  const top_weave_rings = new THREE.InstancedMesh(top_weaveGeom, rattanMat, 5);
  top_weave_rings.name = "top_weave_rings";
  const topWeaveDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    const radius = 0.34 + i * 0.025;
    topWeaveDummy.position.set(0, 1.245 + i * 0.014, 0);
    topWeaveDummy.rotation.set(Math.PI / 2, 0, 0);
    topWeaveDummy.scale.setScalar(radius);
    topWeaveDummy.updateMatrix();
    top_weave_rings.setMatrixAt(i, topWeaveDummy.matrix);
  }
  top_weave_rings.instanceMatrix.needsUpdate = true;
  cage_group.add(top_weave_rings);

  const top_weave_spokesGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.27,
    6
  );
  const top_weave_spokes = new THREE.InstancedMesh(
    top_weave_spokesGeom,
    rattanMat,
    16
  );
  top_weave_spokes.name = "top_weave_spokes";
  const topSpokeDummy = new THREE.Object3D();
  const verticalAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const direction = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );
    topSpokeDummy.position.set(
      Math.cos(angle) * 0.235,
      1.283 + (i % 2) * 0.004,
      Math.sin(angle) * 0.235
    );
    topSpokeDummy.quaternion.setFromUnitVectors(verticalAxis, direction);
    topSpokeDummy.scale.set(1, 1, 1);
    topSpokeDummy.updateMatrix();
    top_weave_spokes.setMatrixAt(i, topSpokeDummy.matrix);
  }
  top_weave_spokes.instanceMatrix.needsUpdate = true;
  cage_group.add(top_weave_spokes);

  const bottom_weaveGeom = new THREE.TorusGeometry(1, 0.027, 6, 64);
  const bottom_weave_rings = new THREE.InstancedMesh(
    bottom_weaveGeom,
    rattanMat,
    5
  );
  bottom_weave_rings.name = "bottom_weave_rings";
  const bottomWeaveDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    const radius = 0.27 + i * 0.03;
    bottomWeaveDummy.position.set(0, 0.185 + i * 0.017, 0);
    bottomWeaveDummy.rotation.set(Math.PI / 2, 0, 0);
    bottomWeaveDummy.scale.setScalar(radius);
    bottomWeaveDummy.updateMatrix();
    bottom_weave_rings.setMatrixAt(i, bottomWeaveDummy.matrix);
  }
  bottom_weave_rings.instanceMatrix.needsUpdate = true;
  cage_group.add(bottom_weave_rings);

  const bottom_weave_spokesGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.34,
    6
  );
  const bottom_weave_spokes = new THREE.InstancedMesh(
    bottom_weave_spokesGeom,
    rattanMat,
    16
  );
  bottom_weave_spokes.name = "bottom_weave_spokes";
  const bottomSpokeDummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const direction = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );
    bottomSpokeDummy.position.set(
      Math.cos(angle) * 0.215,
      0.245 + (i % 2) * 0.004,
      Math.sin(angle) * 0.215
    );
    bottomSpokeDummy.quaternion.setFromUnitVectors(verticalAxis, direction);
    bottomSpokeDummy.scale.set(1, 1, 1);
    bottomSpokeDummy.updateMatrix();
    bottom_weave_spokes.setMatrixAt(i, bottomSpokeDummy.matrix);
  }
  bottom_weave_spokes.instanceMatrix.needsUpdate = true;
  cage_group.add(bottom_weave_spokes);

  const bulbProfile = [
    new THREE.Vector2(0.00, 0.35),
    new THREE.Vector2(0.10, 0.36),
    new THREE.Vector2(0.18, 0.40),
    new THREE.Vector2(0.23, 0.48),
    new THREE.Vector2(0.25, 0.60),
    new THREE.Vector2(0.25, 0.70),
    new THREE.Vector2(0.23, 0.82),
    new THREE.Vector2(0.18, 0.92),
    new THREE.Vector2(0.12, 0.97),
    new THREE.Vector2(0.11, 1.04),
    new THREE.Vector2(0.00, 1.04)
  ];
  const bulbGeom = new THREE.LatheGeometry(bulbProfile, 48);
  const bulb = new THREE.Mesh(bulbGeom, frosted_glassMat);
  bulb.name = "bulb";
  light_group.add(bulb);

  const bulb_socketGeom = new THREE.CylinderGeometry(0.075, 0.085, 0.15, 20);
  const bulb_socket = new THREE.Mesh(bulb_socketGeom, socketMat);
  bulb_socket.name = "bulb_socket";
  bulb_socket.position.y = 1.015;
  light_group.add(bulb_socket);

  const socket_collarGeom = new THREE.TorusGeometry(0.08, 0.009, 8, 24);
  const socket_collar = makeHorizontalTorus(
    socket_collarGeom,
    bindingMat,
    0.955,
    "socket_collar"
  );
  light_group.add(socket_collar);

  const socket_rodGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.27, 10);
  const socket_rod = new THREE.Mesh(socket_rodGeom, bindingMat);
  socket_rod.name = "socket_rod";
  socket_rod.position.y = 1.17;
  light_group.add(socket_rod);

  const socket_top_connectorGeom = new THREE.SphereGeometry(0.035, 16, 10);
  const socket_top_connector = new THREE.Mesh(
    socket_top_connectorGeom,
    bindingMat
  );
  socket_top_connector.name = "socket_top_connector";
  socket_top_connector.position.y = 1.30;
  light_group.add(socket_top_connector);

  const hanging_rope = makeTube(
    [
      new THREE.Vector3(0, 1.31, 0),
      new THREE.Vector3(0.004, 1.55, 0),
      new THREE.Vector3(-0.003, 1.82, 0.004),
      new THREE.Vector3(0, 2.08, 0)
    ],
    0.017,
    ropeMat,
    36,
    8
  );
  hanging_rope.name = "hanging_rope";
  suspension_group.add(hanging_rope);

  const left_suspension_rope = makeTube(
    [
      new THREE.Vector3(-0.43, 1.34, 0.02),
      new THREE.Vector3(-0.34, 1.55, 0.012),
      new THREE.Vector3(-0.18, 1.82, 0.004),
      new THREE.Vector3(0, 2.08, 0)
    ],
    0.017,
    ropeMat,
    32,
    8
  );
  left_suspension_rope.name = "left_suspension_rope";
  suspension_group.add(left_suspension_rope);

  const right_suspension_rope = makeTube(
    [
      new THREE.Vector3(0.43, 1.34, 0.02),
      new THREE.Vector3(0.34, 1.55, 0.012),
      new THREE.Vector3(0.18, 1.82, 0.004),
      new THREE.Vector3(0, 2.08, 0)
    ],
    0.017,
    ropeMat,
    32,
    8
  );
  right_suspension_rope.name = "right_suspension_rope";
  suspension_group.add(right_suspension_rope);

  const anchor_loopsGeom = new THREE.TorusGeometry(0.045, 0.012, 8, 28);
  const anchor_loops = new THREE.InstancedMesh(
    anchor_loopsGeom,
    ropeMat,
    2
  );
  anchor_loops.name = "anchor_loops";
  const anchorDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    anchorDummy.position.set(i === 0 ? -0.43 : 0.43, 1.34, 0.02);
    anchorDummy.rotation.set(0, 0, 0);
    anchorDummy.scale.set(0.78, 1.15, 1);
    anchorDummy.updateMatrix();
    anchor_loops.setMatrixAt(i, anchorDummy.matrix);
  }
  anchor_loops.instanceMatrix.needsUpdate = true;
  suspension_group.add(anchor_loops);

  const suspension_knotGeom = new THREE.SphereGeometry(0.055, 18, 12);
  const suspension_knot = new THREE.Mesh(suspension_knotGeom, ropeMat);
  suspension_knot.name = "suspension_knot";
  suspension_knot.position.y = 2.08;
  suspension_knot.scale.set(1.05, 1.2, 0.9);
  suspension_group.add(suspension_knot);

  const knot_wrapsGeom = new THREE.TorusGeometry(0.045, 0.009, 6, 20);
  const knot_wraps = new THREE.InstancedMesh(knot_wrapsGeom, ropeMat, 3);
  knot_wraps.name = "knot_wraps";
  const knotWrapDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    knotWrapDummy.position.set(0, 2.045 + i * 0.032, 0);
    knotWrapDummy.rotation.set(Math.PI / 2, 0, 0);
    knotWrapDummy.scale.set(1, 1, 1);
    knotWrapDummy.updateMatrix();
    knot_wraps.setMatrixAt(i, knotWrapDummy.matrix);
  }
  knot_wraps.instanceMatrix.needsUpdate = true;
  suspension_group.add(knot_wraps);

  const top_hanging_loop = makeTube(
    [
      new THREE.Vector3(0, 2.08, 0),
      new THREE.Vector3(0.02, 2.23, 0.005),
      new THREE.Vector3(0.15, 2.31, 0.008),
      new THREE.Vector3(0.27, 2.25, 0.005),
      new THREE.Vector3(0.29, 2.14, 0),
      new THREE.Vector3(0.20, 2.05, 0),
      new THREE.Vector3(0.08, 2.01, 0),
      new THREE.Vector3(0, 2.08, 0)
    ],
    0.016,
    ropeMat,
    40,
    8
  );
  top_hanging_loop.name = "top_hanging_loop";
  suspension_group.add(top_hanging_loop);

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