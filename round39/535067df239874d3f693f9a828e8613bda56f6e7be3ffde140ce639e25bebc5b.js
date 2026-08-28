export default function generate(THREE) {
  const root = new THREE.Group();
  const body_group = new THREE.Group();
  const grate_group = new THREE.Group();
  const handle_group = new THREE.Group();
  const hardware_group = new THREE.Group();
  root.add(body_group, grate_group, handle_group, hardware_group);

  const panW = 4.5;
  const panD = 3.55;
  const bodyBottom = 0.34;
  const bodyTop = 1.62;
  const bodyH = bodyTop - bodyBottom;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.35,
    roughness: 0.5,
    side: THREE.DoubleSide
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.25,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.25,
    roughness: 0.65
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x030303,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  function roundedRectPoints(w, d, radius, cornerSegments) {
    const points = [];
    const hw = w * 0.5;
    const hd = d * 0.5;
    const centers = [
      [hw - radius, hd - radius, 0],
      [-hw + radius, hd - radius, Math.PI * 0.5],
      [-hw + radius, -hd + radius, Math.PI],
      [hw - radius, -hd + radius, Math.PI * 1.5]
    ];
    for (let c = 0; c < centers.length; c++) {
      const center = centers[c];
      for (let i = 0; i <= cornerSegments; i++) {
        const angle = center[2] + i / cornerSegments * Math.PI * 0.5;
        points.push(new THREE.Vector2(
          center[0] + Math.cos(angle) * radius,
          center[1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  function createWallGeometry() {
    const outerBottom = roundedRectPoints(4.18, 3.18, 0.38, 8);
    const outerTop = roundedRectPoints(panW, panD, 0.52, 8);
    const innerBottom = roundedRectPoints(3.94, 2.92, 0.31, 8);
    const innerTop = roundedRectPoints(4.22, 3.23, 0.43, 8);
    const count = outerBottom.length;
    const positions = [];
    const indices = [];

    function pushQuad(a, b, c, d) {
      const base = positions.length / 3;
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z,
        d.x, d.y, d.z
      );
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }

    for (let i = 0; i < count; i++) {
      const j = (i + 1) % count;
      const ob0 = new THREE.Vector3(outerBottom[i].x, bodyBottom, outerBottom[i].y);
      const ob1 = new THREE.Vector3(outerBottom[j].x, bodyBottom, outerBottom[j].y);
      const ot0 = new THREE.Vector3(outerTop[i].x, bodyTop, outerTop[i].y);
      const ot1 = new THREE.Vector3(outerTop[j].x, bodyTop, outerTop[j].y);
      const ib0 = new THREE.Vector3(innerBottom[i].x, bodyBottom, innerBottom[i].y);
      const ib1 = new THREE.Vector3(innerBottom[j].x, bodyBottom, innerBottom[j].y);
      const it0 = new THREE.Vector3(innerTop[i].x, bodyTop, innerTop[i].y);
      const it1 = new THREE.Vector3(innerTop[j].x, bodyTop, innerTop[j].y);

      pushQuad(ob0, ot0, ot1, ob1);
      pushQuad(ib0, ib1, it1, it0);
      pushQuad(ot0, it0, it1, ot1);
      pushQuad(ob0, ob1, ib1, ib0);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function traceRoundedRect(path, w, h, radius, clockwise) {
    const hw = w * 0.5;
    const hh = h * 0.5;
    const r = Math.min(radius, hw, hh);

    if (!clockwise) {
      path.moveTo(-hw + r, -hh);
      path.lineTo(hw - r, -hh);
      path.quadraticCurveTo(hw, -hh, hw, -hh + r);
      path.lineTo(hw, hh - r);
      path.quadraticCurveTo(hw, hh, hw - r, hh);
      path.lineTo(-hw + r, hh);
      path.quadraticCurveTo(-hw, hh, -hw, hh - r);
      path.lineTo(-hw, -hh + r);
      path.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    } else {
      path.moveTo(-hw + r, -hh);
      path.lineTo(-hw, -hh + r);
      path.lineTo(-hw, hh - r);
      path.quadraticCurveTo(-hw, hh, -hw + r, hh);
      path.lineTo(hw - r, hh);
      path.quadraticCurveTo(hw, hh, hw, hh - r);
      path.lineTo(hw, -hh + r);
      path.quadraticCurveTo(hw, -hh, hw - r, -hh);
      path.lineTo(-hw + r, -hh);
    }
    path.closePath();
  }

  function makeRoundedRectShape(w, h, radius) {
    const shape = new THREE.Shape();
    traceRoundedRect(shape, w, h, radius, false);
    return shape;
  }

  function makeRoundedRingShape(outerW, outerH, outerR, innerW, innerH, innerR) {
    const shape = makeRoundedRectShape(outerW, outerH, outerR);
    const hole = new THREE.Path();
    traceRoundedRect(hole, innerW, innerH, innerR, true);
    shape.holes.push(hole);
    return shape;
  }

  function roundedRectLoopPoints(w, d, radius, y, cornerSegments) {
    const loop = roundedRectPoints(w, d, radius, cornerSegments);
    const points = [];
    for (const point of loop) points.push(new THREE.Vector3(point.x, y, point.y));
    return points;
  }

  function makeCapsulePoints(hw, hd, radius, y) {
    const points = [];
    const straightSegments = 8;
    const arcSegments = 10;

    for (let i = 0; i <= straightSegments; i++) {
      const x = -hw + radius + (2 * (hw - radius) * i) / straightSegments;
      points.push(new THREE.Vector3(x, y, -hd));
    }
    for (let i = 1; i <= arcSegments; i++) {
      const angle = Math.PI * 0.5 - (Math.PI * i) / arcSegments;
      points.push(new THREE.Vector3(
        hw - radius + Math.cos(angle) * radius,
        y,
        -hd + radius + Math.sin(angle) * radius
      ));
    }
    for (let i = 1; i <= straightSegments; i++) {
      const z = -hd + radius + (2 * (hd - radius) * i) / straightSegments;
      points.push(new THREE.Vector3(hw, y, z));
    }
    for (let i = 1; i <= arcSegments; i++) {
      const angle = -(Math.PI * i) / arcSegments;
      points.push(new THREE.Vector3(
        hw - radius + Math.cos(angle) * radius,
        y,
        hd - radius + Math.sin(angle) * radius
      ));
    }
    for (let i = 1; i <= straightSegments; i++) {
      const x = hw - radius - (2 * (hw - radius) * i) / straightSegments;
      points.push(new THREE.Vector3(x, y, hd));
    }
    for (let i = 1; i <= arcSegments; i++) {
      const angle = -Math.PI * 0.5 - (Math.PI * i) / arcSegments;
      points.push(new THREE.Vector3(
        -hw + radius + Math.cos(angle) * radius,
        y,
        hd - radius + Math.sin(angle) * radius
      ));
    }
    for (let i = 1; i <= straightSegments; i++) {
      const z = hd - radius - (2 * (hd - radius) * i) / straightSegments;
      points.push(new THREE.Vector3(-hw, y, z));
    }
    for (let i = 1; i < arcSegments; i++) {
      const angle = -Math.PI - (Math.PI * i) / arcSegments;
      points.push(new THREE.Vector3(
        -hw + radius + Math.cos(angle) * radius,
        y,
        -hd + radius + Math.sin(angle) * radius
      ));
    }
    return points;
  }

  const pan_bodyGeom = createWallGeometry();
  const pan_body = new THREE.Mesh(pan_bodyGeom, bodyMat);
  body_group.add(pan_body);

  const pan_floorShape = makeRoundedRectShape(3.96, 2.94, 0.32);
  const pan_floorGeom = new THREE.ExtrudeGeometry(pan_floorShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 2,
    curveSegments: 8
  });
  const pan_floor = new THREE.Mesh(pan_floorGeom, interiorMat);
  pan_floor.rotation.x = Math.PI * 0.5;
  pan_floor.position.y = 0.52;
  body_group.add(pan_floor);

  const upper_rimPoints = roundedRectLoopPoints(4.43, 3.46, 0.49, 1.65, 8);
  const upper_rimCurve = new THREE.CatmullRomCurve3(upper_rimPoints, true, "centripetal");
  const upper_rimGeom = new THREE.TubeGeometry(upper_rimCurve, 112, 0.075, 10, true);
  const upper_rim = new THREE.Mesh(upper_rimGeom, bodyMat);
  body_group.add(upper_rim);

  const body_groovesGeom = new THREE.BoxGeometry(1, 0.011, 0.014);
  const body_grooves = new THREE.InstancedMesh(body_groovesGeom, grooveMat, 16);
  const groove_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const t = i / 15;
    const y = 0.45 + t * 0.98;
    const radiusT = (y - bodyBottom) / bodyH;
    const frontZ = 1.59 + radiusT * 0.31;
    const width = 4.18 + radiusT * 0.32;
    groove_dummy.position.set(0, y, frontZ + 0.009);
    groove_dummy.rotation.set(0, 0, 0);
    groove_dummy.scale.set(width - 0.28, 1, 1);
    groove_dummy.updateMatrix();
    body_grooves.setMatrixAt(i, groove_dummy.matrix);
  }
  body_group.add(body_grooves);

  const rear_carry_handle_frameShape = makeRoundedRingShape(
    1.72, 0.56, 0.28,
    1.30, 0.28, 0.14
  );
  const rear_carry_handle_frameGeom = new THREE.ExtrudeGeometry(
    rear_carry_handle_frameShape,
    {
      depth: 0.07,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 2,
      curveSegments: 10
    }
  );
  const rear_carry_handle_frame = new THREE.Mesh(
    rear_carry_handle_frameGeom,
    bodyMat
  );
  rear_carry_handle_frame.position.set(0, 1.43, -1.73);
  body_group.add(rear_carry_handle_frame);

  const grill_supportsGeom = new THREE.BoxGeometry(0.11, 0.42, 0.16);
  const grill_supports = new THREE.InstancedMesh(grill_supportsGeom, bodyMat, 4);
  const support_dummy = new THREE.Object3D();
  const supportPositions = [
    [-1.72, 0.71, -1.12],
    [1.72, 0.71, -1.12],
    [-1.72, 0.71, 1.12],
    [1.72, 0.71, 1.12]
  ];
  for (let i = 0; i < supportPositions.length; i++) {
    const p = supportPositions[i];
    support_dummy.position.set(p[0], p[1], p[2]);
    support_dummy.rotation.set(0, 0, 0);
    support_dummy.scale.set(1, 1, 1);
    support_dummy.updateMatrix();
    grill_supports.setMatrixAt(i, support_dummy.matrix);
  }
  body_group.add(grill_supports);

  const grate_framePoints = makeCapsulePoints(1.82, 1.28, 0.19, 1.34);
  const grate_frameCurve = new THREE.CatmullRomCurve3(
    grate_framePoints,
    true,
    "centripetal"
  );
  const grate_frameGeom = new THREE.TubeGeometry(
    grate_frameCurve,
    112,
    0.035,
    10,
    true
  );
  const grate_frame = new THREE.Mesh(grate_frameGeom, chromeMat);
  grate_group.add(grate_frame);

  const grate_inner_framePoints = makeCapsulePoints(1.72, 1.19, 0.16, 1.315);
  const grate_inner_frameCurve = new THREE.CatmullRomCurve3(
    grate_inner_framePoints,
    true,
    "centripetal"
  );
  const grate_inner_frameGeom = new THREE.TubeGeometry(
    grate_inner_frameCurve,
    104,
    0.018,
    8,
    true
  );
  const grate_inner_frame = new THREE.Mesh(grate_inner_frameGeom, chromeMat);
  grate_group.add(grate_inner_frame);

  const grate_barsGeom = new THREE.CylinderGeometry(0.018, 0.018, 2.36, 10);
  const grate_bars = new THREE.InstancedMesh(grate_barsGeom, chromeMat, 21);
  const bar_dummy = new THREE.Object3D();
  for (let i = 0; i < 21; i++) {
    const x = -1.60 + (3.20 * i) / 20;
    bar_dummy.position.set(x, 1.36, 0);
    bar_dummy.rotation.set(Math.PI * 0.5, 0, 0);
    bar_dummy.scale.set(1, 1, 1);
    bar_dummy.updateMatrix();
    grate_bars.setMatrixAt(i, bar_dummy.matrix);
  }
  grate_group.add(grate_bars);

  const grate_crossbarsGeom = new THREE.CylinderGeometry(0.021, 0.021, 3.42, 10);
  const grate_crossbars = new THREE.InstancedMesh(grate_crossbarsGeom, chromeMat, 3);
  const crossbar_dummy = new THREE.Object3D();
  const crossbarZ = [-0.92, 0, 0.92];
  for (let i = 0; i < crossbarZ.length; i++) {
    crossbar_dummy.position.set(0, 1.335, crossbarZ[i]);
    crossbar_dummy.rotation.set(0, 0, Math.PI * 0.5);
    crossbar_dummy.scale.set(1, 1, 1);
    crossbar_dummy.updateMatrix();
    grate_crossbars.setMatrixAt(i, crossbar_dummy.matrix);
  }
  grate_group.add(grate_crossbars);

  const front_base_trimShape = new THREE.Shape();
  front_base_trimShape.moveTo(-2.08, 0.43);
  front_base_trimShape.lineTo(2.08, 0.43);
  front_base_trimShape.lineTo(1.98, 0.18);
  front_base_trimShape.lineTo(1.72, 0.02);
  front_base_trimShape.lineTo(1.30, 0.02);
  front_base_trimShape.quadraticCurveTo(1.16, 0.04, 1.08, 0.18);
  front_base_trimShape.lineTo(-1.08, 0.18);
  front_base_trimShape.quadraticCurveTo(-1.16, 0.04, -1.30, 0.02);
  front_base_trimShape.lineTo(-1.72, 0.02);
  front_base_trimShape.lineTo(-1.98, 0.18);
  front_base_trimShape.closePath();

  const front_base_trimGeom = new THREE.ExtrudeGeometry(front_base_trimShape, {
    depth: 0.28,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 8
  });
  const front_base_trim = new THREE.Mesh(front_base_trimGeom, silverMat);
  front_base_trim.position.z = 1.56;
  hardware_group.add(front_base_trim);

  const rear_feetGeom = new THREE.BoxGeometry(0.42, 0.42, 0.38);
  const rear_feet = new THREE.InstancedMesh(rear_feetGeom, silverMat, 2);
  const feet_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    feet_dummy.position.set(i === 0 ? -1.78 : 1.78, 0.20, -1.42);
    feet_dummy.rotation.set(0, 0, 0);
    feet_dummy.scale.set(1, 1, 1);
    feet_dummy.updateMatrix();
    rear_feet.setMatrixAt(i, feet_dummy.matrix);
  }
  hardware_group.add(rear_feet);

  const handle_mountShape = new THREE.Shape();
  handle_mountShape.moveTo(-0.50, -0.34);
  handle_mountShape.lineTo(0.34, -0.34);
  handle_mountShape.quadraticCurveTo(0.48, -0.34, 0.48, -0.20);
  handle_mountShape.lineTo(0.48, 0.20);
  handle_mountShape.quadraticCurveTo(0.48, 0.34, 0.34, 0.34);
  handle_mountShape.lineTo(-0.50, 0.34);
  handle_mountShape.quadraticCurveTo(-0.62, 0.34, -0.62, 0.20);
  handle_mountShape.lineTo(-0.62, -0.20);
  handle_mountShape.quadraticCurveTo(-0.62, -0.34, -0.50, -0.34);
  handle_mountShape.closePath();

  const handle_mountHole = new THREE.Path();
  handle_mountHole.absellipse(
    0.13, 0, 0.24, 0.17,
    0, Math.PI * 2, true, 0
  );
  handle_mountShape.holes.push(handle_mountHole);

  const handle_mountGeom = new THREE.ExtrudeGeometry(handle_mountShape, {
    depth: 0.13,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 12
  });
  const handle_mount = new THREE.Mesh(handle_mountGeom, chromeMat);
  handle_mount.rotation.y = -Math.PI * 0.5;
  handle_mount.position.set(-2.12, 0.78, 0);
  hardware_group.add(handle_mount);

  const mount_fastenersGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 14);
  const mount_fasteners = new THREE.InstancedMesh(
    mount_fastenersGeom,
    chromeMat,
    2
  );
  const fastener_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    fastener_dummy.position.set(-2.285, 0.78, i === 0 ? -0.255 : 0.255);
    fastener_dummy.rotation.set(0, 0, Math.PI * 0.5);
    fastener_dummy.scale.set(1, 1, 1);
    fastener_dummy.updateMatrix();
    mount_fasteners.setMatrixAt(i, fastener_dummy.matrix);
  }
  hardware_group.add(mount_fasteners);

  const handle_neckGeom = new THREE.CylinderGeometry(0.21, 0.25, 0.58, 18);
  const handle_neck = new THREE.Mesh(handle_neckGeom, gripMat);
  handle_neck.rotation.z = Math.PI * 0.5;
  handle_neck.scale.set(1, 1, 0.76);
  handle_neck.position.set(-2.42, 0.76, 0);
  handle_group.add(handle_neck);

  const handle_gripShape = new THREE.Shape();
  handle_gripShape.moveTo(-2.28, -0.25);
  handle_gripShape.lineTo(-3.72, -0.39);
  handle_gripShape.quadraticCurveTo(-4.02, -0.40, -4.10, -0.23);
  handle_gripShape.quadraticCurveTo(-4.13, 0, -4.10, 0.23);
  handle_gripShape.quadraticCurveTo(-4.02, 0.40, -3.72, 0.39);
  handle_gripShape.lineTo(-2.28, 0.25);
  handle_gripShape.closePath();

  const handle_gripGeom = new THREE.ExtrudeGeometry(handle_gripShape, {
    depth: 0.22,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.055,
    bevelSegments: 3,
    curveSegments: 12
  });
  const handle_grip = new THREE.Mesh(handle_gripGeom, gripMat);
  handle_grip.rotation.x = Math.PI * 0.5;
  handle_grip.position.y = 0.95;
  handle_group.add(handle_grip);

  const handle_end_capShape = new THREE.Shape();
  handle_end_capShape.moveTo(-3.70, -0.39);
  handle_end_capShape.lineTo(-4.04, -0.40);
  handle_end_capShape.quadraticCurveTo(-4.15, -0.37, -4.16, -0.22);
  handle_end_capShape.lineTo(-4.16, 0.22);
  handle_end_capShape.quadraticCurveTo(-4.15, 0.37, -4.04, 0.40);
  handle_end_capShape.lineTo(-3.70, 0.39);
  handle_end_capShape.quadraticCurveTo(-3.64, 0, -3.70, -0.39);
  handle_end_capShape.closePath();

  const handle_end_capGeom = new THREE.ExtrudeGeometry(handle_end_capShape, {
    depth: 0.25,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 3,
    curveSegments: 12
  });
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, chromeMat);
  handle_end_cap.rotation.x = Math.PI * 0.5;
  handle_end_cap.position.y = 0.97;
  handle_group.add(handle_end_cap);

  const handle_hole_rimGeom = new THREE.RingGeometry(0.72, 1, 32);
  const handle_hole_rim = new THREE.Mesh(handle_hole_rimGeom, bodyMat);
  handle_hole_rim.rotation.x = -Math.PI * 0.5;
  handle_hole_rim.scale.set(0.30, 0.14, 1);
  handle_hole_rim.position.set(-3.48, 0.997, 0);
  handle_group.add(handle_hole_rim);

  const handle_hole_recessGeom = new THREE.CircleGeometry(1, 32);
  const handle_hole_recess = new THREE.Mesh(handle_hole_recessGeom, recessMat);
  handle_hole_recess.rotation.x = -Math.PI * 0.5;
  handle_hole_recess.scale.set(0.215, 0.095, 1);
  handle_hole_recess.position.set(-3.48, 0.999, 0);
  handle_group.add(handle_hole_recess);

  const brand_markGeom = new THREE.BoxGeometry(0.12, 0.032, 0.014);
  const brand_mark = new THREE.InstancedMesh(brand_markGeom, recessMat, 12);
  const brand_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    brand_dummy.position.set(
      -0.72 + i * 0.13,
      0.245 + ((i % 3) - 1) * 0.012,
      1.879
    );
    brand_dummy.rotation.set(0, 0, i % 4 === 0 ? -0.16 : 0);
    brand_dummy.scale.set(
      i % 3 === 0 ? 0.62 : 0.86,
      i % 2 === 0 ? 1.15 : 0.85,
      1
    );
    brand_dummy.updateMatrix();
    brand_mark.setMatrixAt(i, brand_dummy.matrix);
  }
  hardware_group.add(brand_mark);

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