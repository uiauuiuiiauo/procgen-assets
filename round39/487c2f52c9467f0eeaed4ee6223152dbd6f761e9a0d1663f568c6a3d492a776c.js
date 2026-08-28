export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "portable_bowl_warmer";

  const bowl_assembly = new THREE.Group();
  bowl_assembly.name = "bowl_assembly";
  root.add(bowl_assembly);

  const stand_assembly = new THREE.Group();
  stand_assembly.name = "stand_assembly";
  root.add(stand_assembly);

  const bowlMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x292a2d,
    metalness: 0.0,
    roughness: 0.8
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    metalness: 0.0,
    roughness: 0.8
  });

  const bowlProfile = [
    new THREE.Vector2(0.00, -0.48),
    new THREE.Vector2(0.18, -0.48),
    new THREE.Vector2(0.34, -0.43),
    new THREE.Vector2(0.52, -0.31),
    new THREE.Vector2(0.66, -0.13),
    new THREE.Vector2(0.75, 0.10),
    new THREE.Vector2(0.78, 0.27),
    new THREE.Vector2(0.81, 0.36),
    new THREE.Vector2(0.83, 0.40),
    new THREE.Vector2(0.82, 0.44),
    new THREE.Vector2(0.77, 0.46),
    new THREE.Vector2(0.73, 0.40),
    new THREE.Vector2(0.71, 0.28),
    new THREE.Vector2(0.67, 0.10),
    new THREE.Vector2(0.57, -0.12),
    new THREE.Vector2(0.42, -0.28),
    new THREE.Vector2(0.22, -0.37),
    new THREE.Vector2(0.00, -0.37)
  ];
  const bowlGeom = new THREE.LatheGeometry(bowlProfile, 64);
  const bowl = new THREE.Mesh(bowlGeom, bowlMat);
  bowl.name = "bowl";
  bowl_assembly.add(bowl);

  const rimGeom = new THREE.TorusGeometry(0.795, 0.035, 12, 64);
  const rim = new THREE.Mesh(rimGeom, bowlMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.415;
  bowl_assembly.add(rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.735, 0.012, 8, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, bowlMat);
  inner_rim.name = "inner_rim";
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 0.385;
  bowl_assembly.add(inner_rim);

  const outer_bandGeom = new THREE.TorusGeometry(0.765, 0.012, 8, 64);
  const outer_band = new THREE.Mesh(outer_bandGeom, bowlMat);
  outer_band.name = "outer_band";
  outer_band.rotation.x = Math.PI / 2;
  outer_band.position.y = 0.105;
  bowl_assembly.add(outer_band);

  const handle_gripShape = new THREE.Shape();
  handle_gripShape.moveTo(0.68, -0.10);
  handle_gripShape.bezierCurveTo(0.80, -0.15, 1.03, -0.17, 1.10, -0.08);
  handle_gripShape.bezierCurveTo(1.16, -0.01, 1.15, 0.08, 1.08, 0.145);
  handle_gripShape.bezierCurveTo(0.99, 0.215, 0.80, 0.18, 0.69, 0.10);
  handle_gripShape.closePath();

  const handle_gripGeom = new THREE.ExtrudeGeometry(handle_gripShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3
  });

  const right_handle_grip = new THREE.Mesh(handle_gripGeom, gripMat);
  right_handle_grip.name = "right_handle_grip";
  right_handle_grip.rotation.x = Math.PI / 2;
  right_handle_grip.position.y = 0.345;
  bowl_assembly.add(right_handle_grip);

  const left_handle_grip = new THREE.Mesh(handle_gripGeom, gripMat);
  left_handle_grip.name = "left_handle_grip";
  left_handle_grip.rotation.x = Math.PI / 2;
  left_handle_grip.position.y = 0.345;
  left_handle_grip.scale.x = -1;
  bowl_assembly.add(left_handle_grip);

  const right_handle_framePoints = [
    new THREE.Vector3(0.70, 0.325, -0.11),
    new THREE.Vector3(0.82, 0.325, -0.16),
    new THREE.Vector3(1.04, 0.325, -0.16),
    new THREE.Vector3(1.12, 0.325, -0.07),
    new THREE.Vector3(1.14, 0.325, 0.05),
    new THREE.Vector3(1.07, 0.325, 0.15),
    new THREE.Vector3(0.83, 0.325, 0.17),
    new THREE.Vector3(0.70, 0.325, 0.10)
  ];
  const right_handle_frameCurve = new THREE.CatmullRomCurve3(
    right_handle_framePoints,
    true,
    "centripetal"
  );
  const right_handle_frameGeom = new THREE.TubeGeometry(
    right_handle_frameCurve,
    48,
    0.014,
    8,
    true
  );
  const right_handle_frame = new THREE.Mesh(right_handle_frameGeom, chromeMat);
  right_handle_frame.name = "right_handle_frame";
  bowl_assembly.add(right_handle_frame);

  const left_handle_frame = new THREE.Mesh(right_handle_frameGeom, chromeMat);
  left_handle_frame.name = "left_handle_frame";
  left_handle_frame.scale.x = -1;
  bowl_assembly.add(left_handle_frame);

  const right_handle_bracketPoints = [
    new THREE.Vector3(0.735, 0.285, -0.10),
    new THREE.Vector3(0.795, 0.255, -0.09),
    new THREE.Vector3(0.835, 0.275, -0.06)
  ];
  const right_handle_bracketCurve = new THREE.CatmullRomCurve3(
    right_handle_bracketPoints,
    false,
    "centripetal"
  );
  const right_handle_bracketGeom = new THREE.TubeGeometry(
    right_handle_bracketCurve,
    12,
    0.012,
    8,
    false
  );
  const right_handle_bracket = new THREE.Mesh(right_handle_bracketGeom, chromeMat);
  right_handle_bracket.name = "right_handle_bracket";
  bowl_assembly.add(right_handle_bracket);

  const left_handle_bracket = new THREE.Mesh(right_handle_bracketGeom, chromeMat);
  left_handle_bracket.name = "left_handle_bracket";
  left_handle_bracket.scale.x = -1;
  bowl_assembly.add(left_handle_bracket);

  const handle_rivetsGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.026, 16);
  const handle_rivets = new THREE.InstancedMesh(handle_rivetsGeom, chromeMat, 4);
  handle_rivets.name = "handle_rivets";
  const rivet_dummy = new THREE.Object3D();
  const rivet_positions = [
    new THREE.Vector3(0.775, 0.185, -0.09),
    new THREE.Vector3(0.775, 0.185, 0.09),
    new THREE.Vector3(-0.775, 0.185, -0.09),
    new THREE.Vector3(-0.775, 0.185, 0.09)
  ];
  for (let i = 0; i < rivet_positions.length; i++) {
    rivet_dummy.position.copy(rivet_positions[i]);
    rivet_dummy.rotation.set(0, 0, Math.PI / 2);
    rivet_dummy.updateMatrix();
    handle_rivets.setMatrixAt(i, rivet_dummy.matrix);
  }
  handle_rivets.instanceMatrix.needsUpdate = true;
  bowl_assembly.add(handle_rivets);

  const underside_plateGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.035, 32);
  const underside_plate = new THREE.Mesh(underside_plateGeom, brushedMat);
  underside_plate.name = "underside_plate";
  underside_plate.position.y = -0.495;
  stand_assembly.add(underside_plate);

  const underside_ringGeom = new THREE.TorusGeometry(0.155, 0.014, 8, 40);
  const underside_ring = new THREE.Mesh(underside_ringGeom, chromeMat);
  underside_ring.name = "underside_ring";
  underside_ring.rotation.x = Math.PI / 2;
  underside_ring.position.y = -0.514;
  stand_assembly.add(underside_ring);

  const underside_ribsGeom = new THREE.BoxGeometry(0.012, 0.026, 0.052);
  const underside_ribs = new THREE.InstancedMesh(underside_ribsGeom, brushedMat, 18);
  underside_ribs.name = "underside_ribs";
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2;
    rib_dummy.position.set(
      Math.cos(angle) * 0.168,
      -0.518,
      Math.sin(angle) * 0.168
    );
    rib_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    rib_dummy.updateMatrix();
    underside_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  underside_ribs.instanceMatrix.needsUpdate = true;
  stand_assembly.add(underside_ribs);

  const leg_mountsGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.04, 20);
  const leg_mounts = new THREE.InstancedMesh(leg_mountsGeom, rubberMat, 3);
  leg_mounts.name = "leg_mounts";
  const mount_dummy = new THREE.Object3D();
  const mount_positions = [
    new THREE.Vector3(-0.48, -0.35, 0.24),
    new THREE.Vector3(0.48, -0.35, 0.24),
    new THREE.Vector3(0.00, -0.35, -0.46)
  ];
  for (let i = 0; i < mount_positions.length; i++) {
    mount_dummy.position.copy(mount_positions[i]);
    mount_dummy.rotation.set(0, 0, 0);
    mount_dummy.updateMatrix();
    leg_mounts.setMatrixAt(i, mount_dummy.matrix);
  }
  leg_mounts.instanceMatrix.needsUpdate = true;
  stand_assembly.add(leg_mounts);

  function cylinderMatrix(start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );
    return new THREE.Matrix4().compose(
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
  }

  const support_legsGeom = new THREE.CylinderGeometry(0.045, 0.065, 1, 8);
  const support_legs = new THREE.InstancedMesh(support_legsGeom, brushedMat, 3);
  support_legs.name = "support_legs";
  const leg_segments = [
    [
      new THREE.Vector3(-0.48, -0.35, 0.24),
      new THREE.Vector3(-0.66, -0.95, 0.35)
    ],
    [
      new THREE.Vector3(0.48, -0.35, 0.24),
      new THREE.Vector3(0.66, -0.95, 0.35)
    ],
    [
      new THREE.Vector3(0.00, -0.35, -0.46),
      new THREE.Vector3(0.00, -0.88, -0.60)
    ]
  ];
  for (let i = 0; i < leg_segments.length; i++) {
    support_legs.setMatrixAt(
      i,
      cylinderMatrix(leg_segments[i][0], leg_segments[i][1])
    );
  }
  support_legs.instanceMatrix.needsUpdate = true;
  stand_assembly.add(support_legs);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.062, 0.075, 1, 12);
  const rubber_feet = new THREE.InstancedMesh(rubber_feetGeom, rubberMat, 3);
  rubber_feet.name = "rubber_feet";
  const foot_segments = [
    [
      new THREE.Vector3(-0.66, -0.95, 0.35),
      new THREE.Vector3(-0.69, -1.045, 0.37)
    ],
    [
      new THREE.Vector3(0.66, -0.95, 0.35),
      new THREE.Vector3(0.69, -1.045, 0.37)
    ],
    [
      new THREE.Vector3(0.00, -0.88, -0.60),
      new THREE.Vector3(0.00, -0.975, -0.63)
    ]
  ];
  for (let i = 0; i < foot_segments.length; i++) {
    rubber_feet.setMatrixAt(
      i,
      cylinderMatrix(foot_segments[i][0], foot_segments[i][1])
    );
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  stand_assembly.add(rubber_feet);

  const leg_bracesGeom = new THREE.CylinderGeometry(0.012, 0.012, 1, 8);
  const leg_braces = new THREE.InstancedMesh(leg_bracesGeom, chromeMat, 3);
  leg_braces.name = "leg_braces";
  const brace_segments = [
    [
      new THREE.Vector3(-0.27, -0.405, 0.10),
      new THREE.Vector3(-0.56, -0.72, 0.29)
    ],
    [
      new THREE.Vector3(0.27, -0.405, 0.10),
      new THREE.Vector3(0.56, -0.72, 0.29)
    ],
    [
      new THREE.Vector3(0.00, -0.405, 0.23),
      new THREE.Vector3(0.00, -0.70, -0.49)
    ]
  ];
  for (let i = 0; i < brace_segments.length; i++) {
    leg_braces.setMatrixAt(
      i,
      cylinderMatrix(brace_segments[i][0], brace_segments[i][1])
    );
  }
  leg_braces.instanceMatrix.needsUpdate = true;
  stand_assembly.add(leg_braces);

  const lower_support_wirePoints = [
    new THREE.Vector3(-0.30, -0.43, 0.04),
    new THREE.Vector3(-0.27, -0.58, 0.10),
    new THREE.Vector3(-0.12, -0.68, 0.18),
    new THREE.Vector3(0.00, -0.70, 0.20),
    new THREE.Vector3(0.12, -0.68, 0.18),
    new THREE.Vector3(0.27, -0.58, 0.10),
    new THREE.Vector3(0.30, -0.43, 0.04)
  ];
  const lower_support_wireCurve = new THREE.CatmullRomCurve3(
    lower_support_wirePoints,
    false,
    "centripetal"
  );
  const lower_support_wireGeom = new THREE.TubeGeometry(
    lower_support_wireCurve,
    32,
    0.012,
    8,
    false
  );
  const lower_support_wire = new THREE.Mesh(lower_support_wireGeom, chromeMat);
  lower_support_wire.name = "lower_support_wire";
  stand_assembly.add(lower_support_wire);

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