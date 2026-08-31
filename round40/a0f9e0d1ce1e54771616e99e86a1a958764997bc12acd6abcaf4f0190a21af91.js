export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rattan_candle_lantern";

  const sphereR = 1.0;
  const cageCenterY = 0.08;
  const ribCount = 14;

  const outer_frameMat = new THREE.MeshStandardMaterial({
    color: 0xc7a16d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const cage_ribsMat = new THREE.MeshStandardMaterial({
    color: 0xd39a55,
    metalness: 0.0,
    roughness: 0.9,
  });
  const equatorMat = new THREE.MeshStandardMaterial({
    color: 0xd28b43,
    metalness: 0.0,
    roughness: 0.9,
  });
  const bindingMat = new THREE.MeshStandardMaterial({
    color: 0x3b2b20,
    metalness: 0.0,
    roughness: 0.95,
  });
  const holderMat = new THREE.MeshStandardMaterial({
    color: 0x8a5633,
    metalness: 0.0,
    roughness: 0.6,
  });
  const waxMat = new THREE.MeshStandardMaterial({
    color: 0xffe8a3,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x24170f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const outer_flameMat = new THREE.MeshStandardMaterial({
    color: 0xffa632,
    emissive: 0xffa632,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
  });
  const inner_flameMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c2,
    emissive: 0xfff4c2,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  });
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffb34d,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  function makeClosedRingGeometry(radius, tube, tubularSegments, radialSegments) {
    const points = [];
    const pointCount = 48;
    for (let i = 0; i < pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal",
      0.5
    );
    return new THREE.TubeGeometry(
      curve,
      tubularSegments,
      tube,
      radialSegments,
      true
    );
  }

  const cage = new THREE.Group();
  cage.name = "woven_cage";
  cage.position.y = cageCenterY;
  root.add(cage);

  const cage_ribsGeom = makeClosedRingGeometry(sphereR, 0.034, 96, 8);
  const cage_ribs = new THREE.InstancedMesh(
    cage_ribsGeom,
    cage_ribsMat,
    ribCount
  );
  cage_ribs.name = "cage_ribs";

  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < ribCount; i++) {
    const angle = i / ribCount * Math.PI;
    rib_dummy.position.set(0, 0, 0);
    rib_dummy.rotation.set(0, angle, 0);
    rib_dummy.scale.set(1, 1, 1);
    rib_dummy.updateMatrix();
    cage_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  cage_ribs.instanceMatrix.needsUpdate = true;
  cage.add(cage_ribs);

  const equatorGeom = makeClosedRingGeometry(sphereR + 0.008, 0.026, 96, 8);
  const equator = new THREE.Mesh(equatorGeom, equatorMat);
  equator.name = "horizontal_equator";
  equator.rotation.x = Math.PI / 2;
  cage.add(equator);

  const outer_frameGeom = makeClosedRingGeometry(
    sphereR + 0.045,
    0.062,
    112,
    10
  );
  const outer_frame = new THREE.Mesh(outer_frameGeom, outer_frameMat);
  outer_frame.name = "front_outer_frame";
  outer_frame.position.z = 0.025;
  cage.add(outer_frame);

  const frame_bindingsGeom = new THREE.TorusGeometry(
    0.069,
    0.010,
    6,
    18
  );
  const frameBindingAngles = [
    0.08,
    0.78,
    1.55,
    2.35,
    3.12,
    3.92,
    4.72,
    5.52,
  ];
  const frame_bindings = new THREE.InstancedMesh(
    frame_bindingsGeom,
    bindingMat,
    frameBindingAngles.length
  );
  frame_bindings.name = "frame_bindings";

  const frame_binding_dummy = new THREE.Object3D();
  const frame_binding_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < frameBindingAngles.length; i++) {
    const angle = frameBindingAngles[i];
    const tangent = new THREE.Vector3(
      -Math.sin(angle),
      Math.cos(angle),
      0
    ).normalize();

    frame_binding_dummy.position.set(
      Math.cos(angle) * (sphereR + 0.045),
      Math.sin(angle) * (sphereR + 0.045),
      0.025
    );
    frame_binding_dummy.quaternion.setFromUnitVectors(
      frame_binding_axis,
      tangent
    );
    frame_binding_dummy.scale.set(1, 1, 1);
    frame_binding_dummy.updateMatrix();
    frame_bindings.setMatrixAt(i, frame_binding_dummy.matrix);
  }
  frame_bindings.instanceMatrix.needsUpdate = true;
  cage.add(frame_bindings);

  const rib_nodesGeom = new THREE.TorusGeometry(0.039, 0.006, 6, 14);
  const nodeRibIndices = [0, 2, 3, 5, 7, 9, 11, 13];
  const nodeAngles = [0.42, 0.96, 1.72, 2.48, 3.36, 4.18, 5.02, 5.78];
  const rib_nodes = new THREE.InstancedMesh(
    rib_nodesGeom,
    bindingMat,
    nodeRibIndices.length
  );
  rib_nodes.name = "rib_nodes";

  const rib_node_dummy = new THREE.Object3D();
  for (let i = 0; i < nodeRibIndices.length; i++) {
    const ribIndex = nodeRibIndices[i];
    const ribAngle = ribIndex / ribCount * Math.PI;
    const nodeAngle = nodeAngles[i];
    const planeNormal = new THREE.Vector3(
      Math.sin(ribAngle),
      0,
      Math.cos(ribAngle)
    ).normalize();
    const nodeTangent = new THREE.Vector3(
      -Math.sin(nodeAngle) * Math.cos(ribAngle),
      Math.cos(nodeAngle),
      -Math.sin(nodeAngle) * Math.sin(ribAngle)
    ).normalize();

    rib_node_dummy.position.set(
      Math.cos(nodeAngle) * Math.cos(ribAngle) * sphereR,
      Math.sin(nodeAngle) * sphereR,
      Math.cos(nodeAngle) * Math.sin(ribAngle) * sphereR
    );
    rib_node_dummy.quaternion.setFromUnitVectors(
      frame_binding_axis,
      nodeTangent
    );
    rib_node_dummy.scale.set(1, 1, 1);
    rib_node_dummy.updateMatrix();
    rib_nodes.setMatrixAt(i, rib_node_dummy.matrix);
  }
  rib_nodes.instanceMatrix.needsUpdate = true;
  cage.add(rib_nodes);

  const side_bindingsGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.24,
    8
  );
  const side_bindings = new THREE.InstancedMesh(
    side_bindingsGeom,
    bindingMat,
    2
  );
  side_bindings.name = "side_bindings";

  const side_binding_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    side_binding_dummy.position.set(
      side * (sphereR + 0.045),
      0,
      0.045
    );
    side_binding_dummy.rotation.set(0, 0, Math.PI / 2);
    side_binding_dummy.scale.set(1, 1, 1);
    side_binding_dummy.updateMatrix();
    side_bindings.setMatrixAt(i, side_binding_dummy.matrix);
  }
  side_bindings.instanceMatrix.needsUpdate = true;
  cage.add(side_bindings);

  const base_ringGeom = new THREE.TorusGeometry(0.50, 0.075, 12, 72);
  const base_ring = new THREE.Mesh(base_ringGeom, outer_frameMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = cageCenterY - sphereR - 0.065;
  root.add(base_ring);

  const base_bindingsGeom = new THREE.TorusGeometry(
    0.081,
    0.009,
    6,
    16
  );
  const baseBindingAngles = [0.22, 1.78, 3.38, 4.96];
  const base_bindings = new THREE.InstancedMesh(
    base_bindingsGeom,
    bindingMat,
    baseBindingAngles.length
  );
  base_bindings.name = "base_bindings";

  const base_binding_dummy = new THREE.Object3D();
  for (let i = 0; i < baseBindingAngles.length; i++) {
    const angle = baseBindingAngles[i];
    const tangent = new THREE.Vector3(
      -Math.sin(angle),
      0,
      Math.cos(angle)
    ).normalize();

    base_binding_dummy.position.set(
      Math.cos(angle) * 0.50,
      base_ring.position.y,
      Math.sin(angle) * 0.50
    );
    base_binding_dummy.quaternion.setFromUnitVectors(
      frame_binding_axis,
      tangent
    );
    base_binding_dummy.scale.set(1, 1, 1);
    base_binding_dummy.updateMatrix();
    base_bindings.setMatrixAt(i, base_binding_dummy.matrix);
  }
  base_bindings.instanceMatrix.needsUpdate = true;
  root.add(base_bindings);

  const candle_holder = new THREE.Group();
  candle_holder.name = "candle_holder";
  candle_holder.position.set(0, cageCenterY - sphereR + 0.10, 0.09);
  candle_holder.rotation.x = -0.18;
  root.add(candle_holder);

  const holder_bodyGeom = new THREE.CylinderGeometry(
    0.155,
    0.18,
    0.36,
    24
  );
  const holder_body = new THREE.Mesh(holder_bodyGeom, holderMat);
  holder_body.name = "holder_body";
  holder_body.position.y = 0.18;
  candle_holder.add(holder_body);

  const holder_rimGeom = new THREE.TorusGeometry(0.155, 0.018, 8, 32);
  const holder_rim = new THREE.Mesh(holder_rimGeom, holderMat);
  holder_rim.name = "holder_rim";
  holder_rim.rotation.x = Math.PI / 2;
  holder_rim.position.y = 0.36;
  candle_holder.add(holder_rim);

  const candle_glowGeom = new THREE.SphereGeometry(0.30, 24, 16);
  const candle_glow = new THREE.Mesh(candle_glowGeom, glowMat);
  candle_glow.name = "candle_glow";
  candle_glow.position.set(0, 0.56, 0);
  candle_glow.scale.set(1.0, 1.22, 0.82);
  candle_holder.add(candle_glow);

  const candle_waxGeom = new THREE.SphereGeometry(0.20, 28, 18);
  const candle_wax = new THREE.Mesh(candle_waxGeom, waxMat);
  candle_wax.name = "candle_wax";
  candle_wax.position.set(0, 0.50, 0);
  candle_wax.scale.set(1.0, 0.80, 0.86);
  candle_holder.add(candle_wax);

  const wax_dripGeom = new THREE.SphereGeometry(0.07, 18, 12);
  const wax_drip = new THREE.Mesh(wax_dripGeom, waxMat);
  wax_drip.name = "wax_drip";
  wax_drip.position.set(-0.075, 0.53, 0.16);
  wax_drip.scale.set(0.62, 1.35, 0.55);
  candle_holder.add(wax_drip);

  const wickGeom = new THREE.CylinderGeometry(0.010, 0.012, 0.10, 8);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  wick.name = "wick";
  wick.position.set(0, 0.665, 0);
  wick.rotation.z = -0.08;
  candle_holder.add(wick);

  const flameShape = new THREE.Shape();
  flameShape.moveTo(0, 0);
  flameShape.bezierCurveTo(-0.10, 0.07, -0.11, 0.20, -0.045, 0.31);
  flameShape.bezierCurveTo(-0.005, 0.39, 0.018, 0.48, 0.012, 0.56);
  flameShape.bezierCurveTo(0.095, 0.43, 0.13, 0.27, 0.09, 0.15);
  flameShape.bezierCurveTo(0.065, 0.07, 0.03, 0.02, 0, 0);

  const outer_flameGeom = new THREE.ExtrudeGeometry(flameShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const outer_flame = new THREE.Mesh(outer_flameGeom, outer_flameMat);
  outer_flame.name = "outer_flame";
  outer_flame.position.set(0, 0.67, -0.018);
  outer_flame.rotation.z = -0.06;
  candle_holder.add(outer_flame);

  const inner_flame = new THREE.Mesh(outer_flameGeom, inner_flameMat);
  inner_flame.name = "inner_flame";
  inner_flame.position.set(0.012, 0.68, 0.025);
  inner_flame.rotation.z = -0.06;
  inner_flame.scale.set(0.52, 0.62, 0.55);
  candle_holder.add(inner_flame);

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