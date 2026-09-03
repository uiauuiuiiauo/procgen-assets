export default function generate(THREE) {
  const root = new THREE.Group();

  const brownMat = new THREE.MeshStandardMaterial({
    color: 0x70462d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const brownHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x80563a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const darkBrownMat = new THREE.MeshStandardMaterial({
    color: 0x3f281b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8,
  });
  const gunmetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  function roundedFootprintGeometry(width, depth, height, radius, bevel) {
    const shape = roundedRectShape(width, depth, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function beamGeometry(length, width, depth) {
    const shape = new THREE.Shape();
    const halfWidth = width / 2;
    const endRadius = width * 0.46;
    shape.moveTo(-length / 2 + endRadius, -halfWidth);
    shape.lineTo(length / 2 - endRadius, -halfWidth);
    shape.quadraticCurveTo(
      length / 2,
      -halfWidth,
      length / 2,
      -halfWidth + endRadius
    );
    shape.lineTo(length / 2, halfWidth - endRadius);
    shape.quadraticCurveTo(
      length / 2,
      halfWidth,
      length / 2 - endRadius,
      halfWidth
    );
    shape.lineTo(-length / 2 + endRadius, halfWidth);
    shape.quadraticCurveTo(
      -length / 2,
      halfWidth,
      -length / 2,
      halfWidth - endRadius
    );
    shape.lineTo(-length / 2, -halfWidth + endRadius);
    shape.quadraticCurveTo(
      -length / 2,
      -halfWidth,
      -length / 2 + endRadius,
      -halfWidth
    );
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function placeBeam(geometry, start, end, material) {
    const mesh = new THREE.Mesh(geometry, material);
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    mesh.position.set(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2,
      (start.z + end.z) / 2
    );
    mesh.rotation.z = Math.atan2(dy, dx);
    return mesh;
  }

  const base_assembly = new THREE.Group();
  root.add(base_assembly);

  const base_plateGeom = roundedFootprintGeometry(1.48, 1.0, 0.16, 0.13, 0.025);
  const base_plate = new THREE.Mesh(base_plateGeom, brownMat);
  base_plate.position.y = 0.025;
  base_assembly.add(base_plate);

  const base_riserGeom = roundedFootprintGeometry(1.22, 0.76, 0.1, 0.1, 0.018);
  const base_riser = new THREE.Mesh(base_riserGeom, brownHighlightMat);
  base_riser.position.y = 0.18;
  base_assembly.add(base_riser);

  const turntable_lower_ringGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.055, 48);
  const turntable_lower_ring = new THREE.Mesh(turntable_lower_ringGeom, darkBrownMat);
  turntable_lower_ring.position.y = 0.29;
  base_assembly.add(turntable_lower_ring);

  const turntable_bodyGeom = new THREE.CylinderGeometry(0.52, 0.54, 0.2, 48);
  const turntable_body = new THREE.Mesh(turntable_bodyGeom, brownMat);
  turntable_body.position.y = 0.39;
  base_assembly.add(turntable_body);

  const turntable_seamGeom = new THREE.TorusGeometry(0.515, 0.012, 8, 48);
  const turntable_seam = new THREE.Mesh(turntable_seamGeom, blackMat);
  turntable_seam.rotation.x = Math.PI / 2;
  turntable_seam.position.y = 0.405;
  base_assembly.add(turntable_seam);

  const turntable_topGeom = new THREE.CylinderGeometry(0.5, 0.52, 0.07, 48);
  const turntable_top = new THREE.Mesh(turntable_topGeom, brownHighlightMat);
  turntable_top.position.y = 0.5;
  base_assembly.add(turntable_top);

  const base_boltsGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.035, 18);
  const base_bolts = new THREE.InstancedMesh(base_boltsGeom, blackMat, 4);
  const baseBoltPositions = [
    [-0.61, 0.225, -0.36],
    [0.61, 0.225, -0.36],
    [-0.61, 0.225, 0.36],
    [0.61, 0.225, 0.36],
  ];
  const baseBoltDummy = new THREE.Object3D();
  for (let i = 0; i < baseBoltPositions.length; i++) {
    const p = baseBoltPositions[i];
    baseBoltDummy.position.set(p[0], p[1], p[2]);
    baseBoltDummy.rotation.set(0, 0, 0);
    baseBoltDummy.updateMatrix();
    base_bolts.setMatrixAt(i, baseBoltDummy.matrix);
  }
  base_bolts.instanceMatrix.needsUpdate = true;
  base_assembly.add(base_bolts);

  const pedestalShape = new THREE.Shape();
  pedestalShape.moveTo(-0.4, 0);
  pedestalShape.lineTo(0.4, 0);
  pedestalShape.lineTo(0.36, 0.1);
  pedestalShape.lineTo(0.2, 0.46);
  pedestalShape.lineTo(-0.08, 0.5);
  pedestalShape.lineTo(-0.22, 0.42);
  pedestalShape.lineTo(-0.4, 0.1);
  pedestalShape.closePath();

  const pedestalGeom = new THREE.ExtrudeGeometry(pedestalShape, {
    depth: 0.56,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  pedestalGeom.translate(0, 0, -0.28);
  const pedestal = new THREE.Mesh(pedestalGeom, brownMat);
  pedestal.position.y = 0.5;
  base_assembly.add(pedestal);

  const pedestalSideShape = new THREE.Shape();
  pedestalSideShape.moveTo(-0.34, 0.04);
  pedestalSideShape.lineTo(0.33, 0.04);
  pedestalSideShape.lineTo(0.29, 0.12);
  pedestalSideShape.lineTo(0.15, 0.42);
  pedestalSideShape.lineTo(-0.07, 0.46);
  pedestalSideShape.lineTo(-0.19, 0.39);
  pedestalSideShape.lineTo(-0.34, 0.12);
  pedestalSideShape.closePath();

  const pedestal_side_panelsGeom = new THREE.ShapeGeometry(pedestalSideShape, 12);
  const pedestal_side_panels = new THREE.InstancedMesh(
    pedestal_side_panelsGeom,
    brownHighlightMat,
    2
  );
  const pedestalPanelDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    pedestalPanelDummy.position.set(0, 0.5, i === 0 ? -0.307 : 0.307);
    pedestalPanelDummy.rotation.set(0, 0, 0);
    pedestalPanelDummy.updateMatrix();
    pedestal_side_panels.setMatrixAt(i, pedestalPanelDummy.matrix);
  }
  pedestal_side_panels.instanceMatrix.needsUpdate = true;
  base_assembly.add(pedestal_side_panels);

  const pedestal_boltGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.025, 16);
  const pedestal_bolt = new THREE.Mesh(pedestal_boltGeom, gunmetalMat);
  pedestal_bolt.rotation.x = Math.PI / 2;
  pedestal_bolt.position.set(0.17, 0.75, 0.322);
  base_assembly.add(pedestal_bolt);

  const shoulder_assembly = new THREE.Group();
  shoulder_assembly.position.set(0.25, 0.84, 0);
  root.add(shoulder_assembly);

  const shoulder_housingGeom = new THREE.CylinderGeometry(0.185, 0.185, 0.5, 32);
  const shoulder_housing = new THREE.Mesh(shoulder_housingGeom, brownMat);
  shoulder_housing.rotation.x = Math.PI / 2;
  shoulder_assembly.add(shoulder_housing);

  const shoulder_capGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.055, 32);
  const shoulder_front_cap = new THREE.Mesh(shoulder_capGeom, blackMat);
  shoulder_front_cap.rotation.x = Math.PI / 2;
  shoulder_front_cap.position.z = 0.275;
  shoulder_assembly.add(shoulder_front_cap);

  const shoulder_rear_cap = new THREE.Mesh(shoulder_capGeom, darkBrownMat);
  shoulder_rear_cap.rotation.x = Math.PI / 2;
  shoulder_rear_cap.position.z = -0.275;
  shoulder_assembly.add(shoulder_rear_cap);

  const shoulder_bearing_ringGeom = new THREE.TorusGeometry(0.112, 0.018, 10, 32);
  const shoulder_bearing_ring = new THREE.Mesh(shoulder_bearing_ringGeom, gunmetalMat);
  shoulder_bearing_ring.position.z = 0.307;
  shoulder_assembly.add(shoulder_bearing_ring);

  const shoulder_center_capGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 24);
  const shoulder_center_cap = new THREE.Mesh(shoulder_center_capGeom, gunmetalMat);
  shoulder_center_cap.rotation.x = Math.PI / 2;
  shoulder_center_cap.position.z = 0.318;
  shoulder_assembly.add(shoulder_center_cap);

  const arm_assembly = new THREE.Group();
  root.add(arm_assembly);

  const lowerArmStart = new THREE.Vector3(0.25, 0.84, 0);
  const lowerArmEnd = new THREE.Vector3(-0.18, 1.82, 0);
  const lowerArmLength = lowerArmStart.distanceTo(lowerArmEnd);
  const lower_armGeom = beamGeometry(lowerArmLength, 0.29, 0.3);
  const lower_arm = placeBeam(
    lower_armGeom,
    lowerArmStart,
    lowerArmEnd,
    brownMat
  );
  arm_assembly.add(lower_arm);

  const lowerArmFaceStart = new THREE.Vector3(
    lowerArmStart.x,
    lowerArmStart.y,
    0.164
  );
  const lowerArmFaceEnd = new THREE.Vector3(
    lowerArmEnd.x,
    lowerArmEnd.y,
    0.164
  );
  const lower_arm_faceGeom = beamGeometry(lowerArmLength, 0.235, 0.012);
  const lower_arm_face = placeBeam(
    lower_arm_faceGeom,
    lowerArmFaceStart,
    lowerArmFaceEnd,
    brownHighlightMat
  );
  arm_assembly.add(lower_arm_face);

  const upperArmStart = new THREE.Vector3(-0.18, 1.82, 0);
  const upperArmEnd = new THREE.Vector3(-1.0, 1.95, 0);
  const upperArmLength = upperArmStart.distanceTo(upperArmEnd);
  const upper_armGeom = beamGeometry(upperArmLength, 0.27, 0.3);
  const upper_arm = placeBeam(
    upper_armGeom,
    upperArmStart,
    upperArmEnd,
    brownMat
  );
  arm_assembly.add(upper_arm);

  const upper_arm_faceGeom = beamGeometry(upperArmLength, 0.215, 0.012);
  const upper_arm_face = placeBeam(
    upper_arm_faceGeom,
    new THREE.Vector3(upperArmStart.x, upperArmStart.y, 0.164),
    new THREE.Vector3(upperArmEnd.x, upperArmEnd.y, 0.164),
    brownHighlightMat
  );
  arm_assembly.add(upper_arm_face);

  const wrist_bracketGeom = beamGeometry(0.25, 0.22, 0.28);
  const wrist_bracket = placeBeam(
    wrist_bracketGeom,
    new THREE.Vector3(-0.96, 1.94, 0),
    new THREE.Vector3(-1.07, 1.72, 0),
    brownMat
  );
  arm_assembly.add(wrist_bracket);

  const wrist_bracket_faceGeom = beamGeometry(0.25, 0.17, 0.012);
  const wrist_bracket_face = placeBeam(
    wrist_bracket_faceGeom,
    new THREE.Vector3(-0.96, 1.94, 0.154),
    new THREE.Vector3(-1.07, 1.72, 0.154),
    brownHighlightMat
  );
  arm_assembly.add(wrist_bracket_face);

  const joint_capGeom = new THREE.CylinderGeometry(0.132, 0.132, 0.055, 32);
  const joint_ringGeom = new THREE.TorusGeometry(0.098, 0.016, 10, 32);
  const joint_centerGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.032, 24);
  const joint_screwGeom = new THREE.CylinderGeometry(0.021, 0.021, 0.014, 12);

  const elbow_joint = new THREE.Group();
  elbow_joint.position.set(-0.18, 1.82, 0);
  arm_assembly.add(elbow_joint);

  const elbow_front_cap = new THREE.Mesh(joint_capGeom, blackMat);
  elbow_front_cap.rotation.x = Math.PI / 2;
  elbow_front_cap.position.z = 0.18;
  elbow_joint.add(elbow_front_cap);

  const elbow_rear_cap = new THREE.Mesh(joint_capGeom, darkBrownMat);
  elbow_rear_cap.rotation.x = Math.PI / 2;
  elbow_rear_cap.position.z = -0.18;
  elbow_joint.add(elbow_rear_cap);

  const elbow_bearing_ring = new THREE.Mesh(joint_ringGeom, gunmetalMat);
  elbow_bearing_ring.position.z = 0.212;
  elbow_joint.add(elbow_bearing_ring);

  const elbow_center_cap = new THREE.Mesh(joint_centerGeom, gunmetalMat);
  elbow_center_cap.rotation.x = Math.PI / 2;
  elbow_center_cap.position.z = 0.222;
  elbow_joint.add(elbow_center_cap);

  const elbow_screw = new THREE.Mesh(joint_screwGeom, blackMat);
  elbow_screw.rotation.x = Math.PI / 2;
  elbow_screw.position.z = 0.242;
  elbow_joint.add(elbow_screw);

  const wrist_joint = new THREE.Group();
  wrist_joint.position.set(-1.0, 1.95, 0);
  arm_assembly.add(wrist_joint);

  const wrist_front_cap = new THREE.Mesh(joint_capGeom, blackMat);
  wrist_front_cap.rotation.x = Math.PI / 2;
  wrist_front_cap.position.z = 0.18;
  wrist_joint.add(wrist_front_cap);

  const wrist_rear_cap = new THREE.Mesh(joint_capGeom, darkBrownMat);
  wrist_rear_cap.rotation.x = Math.PI / 2;
  wrist_rear_cap.position.z = -0.18;
  wrist_joint.add(wrist_rear_cap);

  const wrist_bearing_ring = new THREE.Mesh(joint_ringGeom, gunmetalMat);
  wrist_bearing_ring.position.z = 0.212;
  wrist_joint.add(wrist_bearing_ring);

  const wrist_center_cap = new THREE.Mesh(joint_centerGeom, gunmetalMat);
  wrist_center_cap.rotation.x = Math.PI / 2;
  wrist_center_cap.position.z = 0.222;
  wrist_joint.add(wrist_center_cap);

  const wrist_screw = new THREE.Mesh(joint_screwGeom, blackMat);
  wrist_screw.rotation.x = Math.PI / 2;
  wrist_screw.position.z = 0.242;
  wrist_joint.add(wrist_screw);

  const wrist_pivot_joint = new THREE.Group();
  wrist_pivot_joint.position.set(-1.07, 1.72, 0);
  arm_assembly.add(wrist_pivot_joint);

  const wrist_pivot_capGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.04, 24);
  const wrist_pivot_cap = new THREE.Mesh(wrist_pivot_capGeom, gunmetalMat);
  wrist_pivot_cap.rotation.x = Math.PI / 2;
  wrist_pivot_cap.position.z = 0.17;
  wrist_pivot_joint.add(wrist_pivot_cap);

  const wrist_pivot_centerGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.045, 18);
  const wrist_pivot_center = new THREE.Mesh(wrist_pivot_centerGeom, blackMat);
  wrist_pivot_center.rotation.x = Math.PI / 2;
  wrist_pivot_center.position.z = 0.194;
  wrist_pivot_joint.add(wrist_pivot_center);

  const toolOut = new THREE.Vector3(-1.23, 1.31, 0);
  const toolIn = new THREE.Vector3(-1.07, 1.72, 0);
  const toolMountLength = toolOut.distanceTo(toolIn);
  const tool_mountGeom = beamGeometry(toolMountLength, 0.23, 0.25);
  const tool_mount = placeBeam(
    tool_mountGeom,
    toolOut,
    toolIn,
    brownMat
  );
  arm_assembly.add(tool_mount);

  const tool_mount_faceGeom = beamGeometry(toolMountLength, 0.18, 0.012);
  const tool_mount_face = placeBeam(
    tool_mount_faceGeom,
    new THREE.Vector3(toolOut.x, toolOut.y, 0.134),
    new THREE.Vector3(toolIn.x, toolIn.y, 0.134),
    brownHighlightMat
  );
  arm_assembly.add(tool_mount_face);

  const toolAxis = new THREE.Vector3().subVectors(toolIn, toolOut).normalize();
  const toolQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    toolAxis
  );

  const tool_flangeGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.075, 28);
  const tool_flange = new THREE.Mesh(tool_flangeGeom, brownMat);
  tool_flange.quaternion.copy(toolQuaternion);
  tool_flange.position.copy(toolOut).addScaledVector(toolAxis, 0.025);
  arm_assembly.add(tool_flange);

  const tool_collarGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.09, 28);
  const tool_collar = new THREE.Mesh(tool_collarGeom, darkBrownMat);
  tool_collar.quaternion.copy(toolQuaternion);
  tool_collar.position.copy(toolOut).addScaledVector(toolAxis, 0.095);
  arm_assembly.add(tool_collar);

  const tool_connectorGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.12, 20);
  const tool_connector = new THREE.Mesh(tool_connectorGeom, blackMat);
  tool_connector.quaternion.copy(toolQuaternion);
  tool_connector.position.copy(toolOut).addScaledVector(toolAxis, 0.19);
  arm_assembly.add(tool_connector);

  const cable_assembly = new THREE.Group();
  root.add(cable_assembly);

  const shoulder_cable_collarGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.1, 18);
  const shoulder_cable_collar = new THREE.Mesh(shoulder_cable_collarGeom, blackMat);
  shoulder_cable_collar.rotation.z = Math.PI / 2;
  shoulder_cable_collar.position.set(0.46, 0.87, -0.08);
  cable_assembly.add(shoulder_cable_collar);

  const arm_cable_path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.48, 0.88, -0.08),
      new THREE.Vector3(0.56, 1.06, -0.08),
      new THREE.Vector3(0.49, 1.3, -0.08),
      new THREE.Vector3(0.34, 1.55, -0.08),
      new THREE.Vector3(0.1, 1.78, -0.08),
      new THREE.Vector3(-0.15, 1.86, -0.08),
      new THREE.Vector3(-0.38, 1.9, -0.08),
    ],
    false,
    "centripetal"
  );
  const arm_cableGeom = new THREE.TubeGeometry(
    arm_cable_path,
    48,
    0.025,
    8,
    false
  );
  const arm_cable = new THREE.Mesh(arm_cableGeom, blackMat);
  cable_assembly.add(arm_cable);

  const cable_anchorGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.045, 18);
  const cable_anchor = new THREE.Mesh(cable_anchorGeom, blackMat);
  cable_anchor.rotation.x = Math.PI / 2;
  cable_anchor.position.set(-0.38, 1.9, -0.08);
  cable_assembly.add(cable_anchor);

  const cable_coil_points = [];
  const coilTurns = 5;
  const coilSegments = 60;
  for (let i = 0; i <= coilSegments; i++) {
    const t = i / coilSegments;
    const angle = t * coilTurns * Math.PI * 2;
    cable_coil_points.push(
      new THREE.Vector3(
        -0.88 + t * 0.28,
        2.005 + Math.cos(angle) * 0.025,
        -0.02 + Math.sin(angle) * 0.025
      )
    );
  }
  const cable_coil_path = new THREE.CatmullRomCurve3(
    cable_coil_points,
    false,
    "centripetal"
  );
  const cable_coilGeom = new THREE.TubeGeometry(
    cable_coil_path,
    80,
    0.012,
    7,
    false
  );
  const cable_coil = new THREE.Mesh(cable_coilGeom, blackMat);
  cable_assembly.add(cable_coil);

  const elbow_cable_anchorGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16);
  const elbow_cable_anchor = new THREE.Mesh(elbow_cable_anchorGeom, blackMat);
  elbow_cable_anchor.rotation.x = Math.PI / 2;
  elbow_cable_anchor.position.set(-0.18, 1.82, -0.205);
  cable_assembly.add(elbow_cable_anchor);

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