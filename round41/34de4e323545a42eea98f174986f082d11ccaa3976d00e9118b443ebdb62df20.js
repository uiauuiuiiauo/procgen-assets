export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "copper_two_handled_vessel";

  const vessel_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const inner_wallMat = new THREE.MeshStandardMaterial({
    color: 0x71301f,
    metalness: 0.5,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x4a2923,
    metalness: 0.3,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const collarMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x352521,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const vessel_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.78, 0.00),
    new THREE.Vector2(0.88, 0.015),
    new THREE.Vector2(0.94, 0.06),
    new THREE.Vector2(0.97, 0.16),
    new THREE.Vector2(0.98, 0.42),
    new THREE.Vector2(0.98, 2.45),
    new THREE.Vector2(0.99, 2.58),
    new THREE.Vector2(1.04, 2.68),
  ];
  const vessel_bodyGeom = new THREE.LatheGeometry(vessel_bodyProfile, 64);
  const vessel_body = new THREE.Mesh(vessel_bodyGeom, vessel_bodyMat);
  vessel_body.name = "vessel_body";
  root.add(vessel_body);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.94,
    0.91,
    0.42,
    64,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, inner_wallMat);
  inner_wall.name = "inner_wall";
  inner_wall.position.y = 2.47;
  root.add(inner_wall);

  const inner_bottomGeom = new THREE.CircleGeometry(0.91, 64);
  const inner_bottom = new THREE.Mesh(inner_bottomGeom, inner_wallMat);
  inner_bottom.name = "inner_bottom";
  inner_bottom.rotation.x = -Math.PI / 2;
  inner_bottom.position.y = 2.265;
  root.add(inner_bottom);

  const top_rimMat = vessel_bodyMat;
  const top_rimGeom = new THREE.TorusGeometry(1.015, 0.072, 16, 72);
  const top_rim = new THREE.Mesh(top_rimGeom, top_rimMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 2.70;
  root.add(top_rim);

  const rim_inner_edgeMat = inner_wallMat;
  const rim_inner_edgeGeom = new THREE.TorusGeometry(0.943, 0.018, 10, 64);
  const rim_inner_edge = new THREE.Mesh(rim_inner_edgeGeom, rim_inner_edgeMat);
  rim_inner_edge.name = "rim_inner_edge";
  rim_inner_edge.rotation.x = Math.PI / 2;
  rim_inner_edge.position.y = 2.685;
  root.add(rim_inner_edge);

  const base_edgeMat = vessel_bodyMat;
  const base_edgeGeom = new THREE.TorusGeometry(0.885, 0.025, 10, 64);
  const base_edge = new THREE.Mesh(base_edgeGeom, base_edgeMat);
  base_edge.name = "base_edge";
  base_edge.rotation.x = Math.PI / 2;
  base_edge.position.y = 0.035;
  root.add(base_edge);

  const right_handlePoints = [
    new THREE.Vector3(1.00, 2.34, 0.00),
    new THREE.Vector3(1.23, 2.39, 0.00),
    new THREE.Vector3(1.54, 2.36, 0.00),
    new THREE.Vector3(1.82, 2.18, 0.00),
    new THREE.Vector3(1.98, 1.82, 0.00),
    new THREE.Vector3(2.02, 1.35, 0.00),
    new THREE.Vector3(1.94, 0.88, 0.00),
    new THREE.Vector3(1.70, 0.54, 0.00),
    new THREE.Vector3(1.28, 0.34, 0.00),
    new THREE.Vector3(1.00, 0.43, 0.00),
  ];
  const right_handleCurve = new THREE.CatmullRomCurve3(
    right_handlePoints,
    false,
    "centripetal"
  );
  const right_handleMat = vessel_bodyMat;
  const right_handleGeom = new THREE.TubeGeometry(
    right_handleCurve,
    72,
    0.09,
    14,
    false
  );
  const right_handle = new THREE.Mesh(right_handleGeom, right_handleMat);
  right_handle.name = "right_handle";
  root.add(right_handle);

  const left_handleGeom = right_handleGeom;
  const left_handleMat = vessel_bodyMat;
  const left_handle = new THREE.Mesh(left_handleGeom, left_handleMat);
  left_handle.name = "left_handle";
  left_handle.rotation.y = Math.PI;
  root.add(left_handle);

  const handle_mountsGeom = new THREE.CylinderGeometry(
    0.115,
    0.115,
    0.28,
    24
  );
  const handle_mountsMat = vessel_bodyMat;
  const handle_mounts = new THREE.InstancedMesh(
    handle_mountsGeom,
    handle_mountsMat,
    4
  );
  handle_mounts.name = "handle_mounts";

  const mountQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    Math.PI / 2
  );
  const mountScale = new THREE.Vector3(1, 1, 1);
  const mountData = [
    [-1.03, 2.34, 0],
    [-1.03, 0.43, 0],
    [1.03, 2.34, 0],
    [1.03, 0.43, 0],
  ];
  for (let i = 0; i < mountData.length; i++) {
    const data = mountData[i];
    handle_mounts.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(data[0], data[1], data[2]),
        mountQuaternion,
        mountScale
      )
    );
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(handle_mounts);

  const handle_collarsGeom = new THREE.TorusGeometry(0.116, 0.014, 8, 24);
  const handle_collars = new THREE.InstancedMesh(
    handle_collarsGeom,
    collarMat,
    4
  );
  handle_collars.name = "handle_collars";
  const collarQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI / 2
  );
  const collarData = [
    [-1.145, 2.34, 0],
    [-1.145, 0.43, 0],
    [1.145, 2.34, 0],
    [1.145, 0.43, 0],
  ];
  for (let i = 0; i < collarData.length; i++) {
    const data = collarData[i];
    handle_collars.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(data[0], data[1], data[2]),
        collarQuaternion,
        mountScale
      )
    );
  }
  handle_collars.instanceMatrix.needsUpdate = true;
  root.add(handle_collars);

  function bodyRadiusAt(y) {
    if (y < 0.16) return 0.94 + y * 0.19;
    if (y > 2.45) return 0.98 + (y - 2.45) * 0.22;
    return 0.98;
  }

  function surfacePoint(u, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    const angle = Math.PI / 2 - u / radius;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function addSurfaceCurve(parent, uvPoints, radius, closed) {
    const points = [];
    for (let i = 0; i < uvPoints.length; i++) {
      points.push(surfacePoint(uvPoints[i][0], uvPoints[i][1], 0.014));
    }

    let curve;
    if (points.length === 2) {
      curve = new THREE.LineCurve3(points[0], points[1]);
    } else {
      curve = new THREE.CatmullRomCurve3(points, closed, "centripetal");
    }

    const curveGeom = new THREE.TubeGeometry(
      curve,
      Math.max(8, points.length * 4),
      radius,
      6,
      closed
    );
    const curveMesh = new THREE.Mesh(curveGeom, engravingMat);
    parent.add(curveMesh);
    return curveMesh;
  }

  function addSpiral(
    parent,
    centerU,
    centerY,
    radiusU,
    radiusY,
    turns,
    phase,
    direction
  ) {
    const points = [];
    const count = 22;
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const falloff = 1 - t * 0.88;
      const angle = phase + direction * turns * Math.PI * 2 * t;
      points.push([
        centerU + Math.cos(angle) * radiusU * falloff,
        centerY + Math.sin(angle) * radiusY * falloff,
      ]);
    }
    return addSurfaceCurve(parent, points, 0.008, false);
  }

  function makeWavyBand(parent, centerY, amplitude, lobes, phase) {
    const points = [];
    const count = 40;
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const u = -1.16 + t * 2.32;
      const wave = Math.sin(t * lobes * Math.PI * 2 + phase);
      const secondary = Math.sin(t * lobes * Math.PI + phase * 0.5);
      points.push([u, centerY + wave * amplitude + secondary * 0.025]);
    }
    return addSurfaceCurve(parent, points, 0.011, false);
  }

  const upper_ornament = new THREE.Group();
  upper_ornament.name = "upper_ornament";
  root.add(upper_ornament);

  const upper_vine = makeWavyBand(upper_ornament, 1.91, 0.09, 3, 0);
  upper_vine.name = "upper_vine";

  const upper_left_scroll = addSpiral(
    upper_ornament,
    -0.82,
    1.91,
    0.18,
    0.15,
    1.15,
    0.2,
    1
  );
  upper_left_scroll.name = "upper_left_scroll";

  const upper_center_scroll = addSpiral(
    upper_ornament,
    -0.28,
    1.88,
    0.22,
    0.17,
    1.2,
    0.5,
    -1
  );
  upper_center_scroll.name = "upper_center_scroll";

  const upper_right_scroll = addSpiral(
    upper_ornament,
    0.70,
    1.92,
    0.22,
    0.16,
    1.2,
    0.1,
    1
  );
  upper_right_scroll.name = "upper_right_scroll";

  const upper_edge_scroll = addSpiral(
    upper_ornament,
    1.08,
    1.91,
    0.13,
    0.13,
    1.0,
    0.4,
    -1
  );
  upper_edge_scroll.name = "upper_edge_scroll";

  const upper_center_flourish = addSurfaceCurve(
    upper_ornament,
    [
      [-0.10, 1.82],
      [-0.02, 1.96],
      [0.03, 2.12],
      [0.10, 2.22],
      [0.18, 2.18],
      [0.16, 2.08],
      [0.08, 2.02],
    ],
    0.009,
    false
  );
  upper_center_flourish.name = "upper_center_flourish";

  const central_ornament = new THREE.Group();
  central_ornament.name = "central_ornament";
  root.add(central_ornament);

  const central_medallion = addSurfaceCurve(
    central_ornament,
    [
      [-0.10, 1.78],
      [0.16, 1.70],
      [0.38, 1.48],
      [0.48, 1.18],
      [0.42, 0.88],
      [0.24, 0.66],
      [-0.02, 0.58],
      [-0.20, 0.72],
      [-0.25, 0.98],
      [-0.20, 1.28],
      [-0.12, 1.55],
    ],
    0.012,
    true
  );
  central_medallion.name = "central_medallion";

  const central_flower_stem = addSurfaceCurve(
    central_ornament,
    [
      [-0.03, 0.62],
      [-0.08, 0.82],
      [-0.02, 1.03],
      [0.08, 1.24],
      [0.10, 1.48],
      [0.02, 1.68],
    ],
    0.009,
    false
  );
  central_flower_stem.name = "central_flower_stem";

  const central_left_curl = addSpiral(
    central_ornament,
    -0.02,
    1.40,
    0.16,
    0.18,
    1.05,
    0.3,
    -1
  );
  central_left_curl.name = "central_left_curl";

  const central_right_curl = addSpiral(
    central_ornament,
    0.28,
    0.92,
    0.13,
    0.15,
    1.0,
    0.2,
    1
  );
  central_right_curl.name = "central_right_curl";

  const flowerCenterU = 0.10;
  const flowerCenterY = 1.17;
  const flower_petals = new THREE.Group();
  flower_petals.name = "flower_petals";
  central_ornament.add(flower_petals);

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const px = -dy;
    const py = dx;
    const petalPoints = [
      [flowerCenterU + dx * 0.045, flowerCenterY + dy * 0.045],
      [
        flowerCenterU + dx * 0.12 + px * 0.058,
        flowerCenterY + dy * 0.12 + py * 0.058,
      ],
      [flowerCenterU + dx * 0.235, flowerCenterY + dy * 0.235],
      [
        flowerCenterU + dx * 0.12 - px * 0.058,
        flowerCenterY + dy * 0.12 - py * 0.058,
      ],
    ];
    const flower_petal = addSurfaceCurve(
      flower_petals,
      petalPoints,
      0.008,
      true
    );
    flower_petal.name = "flower_petal_" + i;
  }

  const flower_centerGeom = new THREE.CircleGeometry(0.045, 18);
  const flower_center = new THREE.Mesh(flower_centerGeom, engravingMat);
  flower_center.name = "flower_center";
  const flowerCenterPos = surfacePoint(flowerCenterU, flowerCenterY, 0.022);
  const flowerNormal = new THREE.Vector3(
    flowerCenterPos.x,
    0,
    flowerCenterPos.z
  ).normalize();
  flower_center.position.copy(flowerCenterPos);
  flower_center.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    flowerNormal
  );
  central_ornament.add(flower_center);

  const central_leaf_left = addSurfaceCurve(
    central_ornament,
    [
      [-0.02, 0.78],
      [-0.16, 0.84],
      [-0.22, 0.96],
      [-0.08, 0.91],
    ],
    0.008,
    true
  );
  central_leaf_left.name = "central_leaf_left";

  const central_leaf_right = addSurfaceCurve(
    central_ornament,
    [
      [0.03, 1.42],
      [0.18, 1.47],
      [0.25, 1.59],
      [0.10, 1.54],
    ],
    0.008,
    true
  );
  central_leaf_right.name = "central_leaf_right";

  const lower_ornament = new THREE.Group();
  lower_ornament.name = "lower_ornament";
  root.add(lower_ornament);

  const lower_vine = makeWavyBand(lower_ornament, 0.56, 0.095, 3, Math.PI);
  lower_vine.name = "lower_vine";

  const lower_left_scroll = addSpiral(
    lower_ornament,
    -0.82,
    0.57,
    0.19,
    0.15,
    1.18,
    0.1,
    -1
  );
  lower_left_scroll.name = "lower_left_scroll";

  const lower_center_scroll = addSpiral(
    lower_ornament,
    -0.18,
    0.55,
    0.21,
    0.16,
    1.22,
    0.4,
    1
  );
  lower_center_scroll.name = "lower_center_scroll";

  const lower_right_scroll = addSpiral(
    lower_ornament,
    0.55,
    0.57,
    0.22,
    0.16,
    1.2,
    0.2,
    -1
  );
  lower_right_scroll.name = "lower_right_scroll";

  const lower_edge_scroll = addSpiral(
    lower_ornament,
    1.05,
    0.57,
    0.14,
    0.13,
    1.0,
    0.3,
    1
  );
  lower_edge_scroll.name = "lower_edge_scroll";

  const lower_center_sprig = addSurfaceCurve(
    lower_ornament,
    [
      [-0.02, 0.48],
      [0.02, 0.62],
      [0.03, 0.76],
      [0.10, 0.88],
    ],
    0.009,
    false
  );
  lower_center_sprig.name = "lower_center_sprig";

  const lower_leaf_left = addSurfaceCurve(
    lower_ornament,
    [
      [-0.02, 0.64],
      [-0.16, 0.70],
      [-0.20, 0.82],
      [-0.06, 0.76],
    ],
    0.008,
    true
  );
  lower_leaf_left.name = "lower_leaf_left";

  const lower_leaf_right = addSurfaceCurve(
    lower_ornament,
    [
      [0.04, 0.72],
      [0.18, 0.76],
      [0.23, 0.88],
      [0.09, 0.82],
    ],
    0.008,
    true
  );
  lower_leaf_right.name = "lower_leaf_right";

  const patina_marks = new THREE.Group();
  patina_marks.name = "patina_marks";
  root.add(patina_marks);

  const patina_patchGeom = new THREE.CircleGeometry(1, 14);
  const patinaData = [
    [-0.34, 2.27, 0.10, 0.025],
    [0.18, 2.30, 0.13, 0.020],
    [0.43, 2.18, 0.07, 0.018],
    [-0.12, 1.62, 0.06, 0.018],
    [0.52, 1.55, 0.08, 0.022],
    [-0.48, 1.22, 0.05, 0.016],
    [0.34, 0.98, 0.06, 0.018],
    [-0.22, 0.32, 0.05, 0.014],
    [0.62, 0.24, 0.04, 0.015],
  ];
  for (let i = 0; i < patinaData.length; i++) {
    const data = patinaData[i];
    const pos = surfacePoint(data[0], data[1], 0.018);
    const normal = new THREE.Vector3(pos.x, 0, pos.z).normalize();
    const patina_patch = new THREE.Mesh(patina_patchGeom, patinaMat);
    patina_patch.name = "patina_patch_" + i;
    patina_patch.position.copy(pos);
    patina_patch.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    patina_patch.scale.set(data[2], data[3], 1);
    patina_marks.add(patina_patch);
  }

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