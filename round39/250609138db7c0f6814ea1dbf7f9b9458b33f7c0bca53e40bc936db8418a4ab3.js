export default function generate(THREE) {
  const root = new THREE.Group();
  const glass_jar = new THREE.Group();
  root.add(glass_jar);

  const jar_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xe2e9e5,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const edge_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xaeb9b1,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const mouth_interiorMat = new THREE.MeshPhysicalMaterial({
    color: 0xc5ceca,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const embossed_detailMat = new THREE.MeshPhysicalMaterial({
    color: 0x929e96,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const jar_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.340, 0.000),
    new THREE.Vector2(0.425, 0.015),
    new THREE.Vector2(0.475, 0.055),
    new THREE.Vector2(0.495, 0.125),
    new THREE.Vector2(0.500, 0.220),
    new THREE.Vector2(0.500, 1.245),
    new THREE.Vector2(0.495, 1.335),
    new THREE.Vector2(0.480, 1.410),
    new THREE.Vector2(0.455, 1.485),
    new THREE.Vector2(0.455, 1.710),
    new THREE.Vector2(0.465, 1.740),
    new THREE.Vector2(0.465, 1.780),
    new THREE.Vector2(0.405, 1.780),
    new THREE.Vector2(0.405, 1.740),
    new THREE.Vector2(0.400, 1.705),
    new THREE.Vector2(0.400, 1.505),
    new THREE.Vector2(0.418, 1.445),
    new THREE.Vector2(0.445, 1.370),
    new THREE.Vector2(0.458, 1.300),
    new THREE.Vector2(0.460, 0.225),
    new THREE.Vector2(0.450, 0.155),
    new THREE.Vector2(0.420, 0.105),
    new THREE.Vector2(0.350, 0.075),
    new THREE.Vector2(0.000, 0.075)
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(jar_bodyProfile, 64);
  const jar_body = new THREE.Mesh(jar_bodyGeom, jar_bodyMat);
  glass_jar.add(jar_body);

  const mouth_interiorGeom = new THREE.CircleGeometry(0.398, 64);
  const mouth_interior = new THREE.Mesh(mouth_interiorGeom, mouth_interiorMat);
  mouth_interior.rotation.x = -Math.PI / 2;
  mouth_interior.position.y = 1.708;
  glass_jar.add(mouth_interior);

  const lower_thread_beadGeom = new THREE.TorusGeometry(0.482, 0.027, 12, 64);
  const lower_thread_bead = new THREE.Mesh(lower_thread_beadGeom, edge_glassMat);
  lower_thread_bead.rotation.x = Math.PI / 2;
  lower_thread_bead.position.y = 1.455;
  glass_jar.add(lower_thread_bead);

  const middle_thread_beadGeom = new THREE.TorusGeometry(0.469, 0.019, 10, 64);
  const middle_thread_bead = new THREE.Mesh(middle_thread_beadGeom, edge_glassMat);
  middle_thread_bead.rotation.x = Math.PI / 2;
  middle_thread_bead.position.y = 1.615;
  glass_jar.add(middle_thread_bead);

  const upper_thread_beadGeom = new THREE.TorusGeometry(0.468, 0.014, 10, 64);
  const upper_thread_bead = new THREE.Mesh(upper_thread_beadGeom, edge_glassMat);
  upper_thread_bead.rotation.x = Math.PI / 2;
  upper_thread_bead.position.y = 1.675;
  glass_jar.add(upper_thread_bead);

  const top_lipGeom = new THREE.TorusGeometry(0.445, 0.027, 14, 72);
  const top_lip = new THREE.Mesh(top_lipGeom, edge_glassMat);
  top_lip.rotation.x = Math.PI / 2;
  top_lip.position.y = 1.765;
  glass_jar.add(top_lip);

  const inner_mouth_ringGeom = new THREE.TorusGeometry(0.405, 0.009, 10, 64);
  const inner_mouth_ring = new THREE.Mesh(inner_mouth_ringGeom, edge_glassMat);
  inner_mouth_ring.rotation.x = Math.PI / 2;
  inner_mouth_ring.position.y = 1.775;
  glass_jar.add(inner_mouth_ring);

  const screw_threadPoints = [];
  const screw_threadSegments = 72;
  for (let i = 0; i <= screw_threadSegments; i++) {
    const t = i / screw_threadSegments;
    const angle = t * Math.PI * 2;
    const radius = 0.469;
    screw_threadPoints.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      1.555 + t * 0.155,
      Math.sin(angle) * radius
    ));
  }
  const screw_threadCurve = new THREE.CatmullRomCurve3(
    screw_threadPoints,
    false,
    "centripetal"
  );
  const screw_threadGeom = new THREE.TubeGeometry(
    screw_threadCurve,
    96,
    0.008,
    6,
    false
  );
  const screw_thread = new THREE.Mesh(screw_threadGeom, edge_glassMat);
  glass_jar.add(screw_thread);

  const side_ribPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.448, 0.100, 0),
    new THREE.Vector3(0.486, 0.175, 0),
    new THREE.Vector3(0.502, 0.300, 0),
    new THREE.Vector3(0.503, 1.175, 0),
    new THREE.Vector3(0.493, 1.315, 0),
    new THREE.Vector3(0.469, 1.410, 0),
    new THREE.Vector3(0.457, 1.455, 0)
  ], false, "centripetal");
  const side_ribsGeom = new THREE.TubeGeometry(
    side_ribPath,
    40,
    0.0065,
    6,
    false
  );
  const side_ribs = new THREE.InstancedMesh(
    side_ribsGeom,
    embossed_detailMat,
    12
  );
  const side_rib_transform = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    side_rib_transform.position.set(0, 0, 0);
    side_rib_transform.rotation.set(0, i / 12 * Math.PI * 2, 0);
    side_rib_transform.scale.set(1, 1, 1);
    side_rib_transform.updateMatrix();
    side_ribs.setMatrixAt(i, side_rib_transform.matrix);
  }
  side_ribs.instanceMatrix.needsUpdate = true;
  glass_jar.add(side_ribs);

  const base_edgeGeom = new THREE.TorusGeometry(0.424, 0.017, 10, 64);
  const base_edge = new THREE.Mesh(base_edgeGeom, edge_glassMat);
  base_edge.rotation.x = Math.PI / 2;
  base_edge.position.y = 0.037;
  glass_jar.add(base_edge);

  const bottom_inner_ringGeom = new THREE.TorusGeometry(0.315, 0.007, 8, 56);
  const bottom_inner_ring = new THREE.Mesh(
    bottom_inner_ringGeom,
    embossed_detailMat
  );
  bottom_inner_ring.rotation.x = Math.PI / 2;
  bottom_inner_ring.position.y = 0.079;
  glass_jar.add(bottom_inner_ring);

  const bottom_punt_ringGeom = new THREE.TorusGeometry(0.075, 0.006, 8, 40);
  const bottom_punt_ring = new THREE.Mesh(
    bottom_punt_ringGeom,
    embossed_detailMat
  );
  bottom_punt_ring.rotation.x = Math.PI / 2;
  bottom_punt_ring.position.y = 0.081;
  glass_jar.add(bottom_punt_ring);

  const base_knurlingGeom = new THREE.SphereGeometry(0.010, 8, 6);
  const base_knurling = new THREE.InstancedMesh(
    base_knurlingGeom,
    edge_glassMat,
    48
  );
  const base_knurl_transform = new THREE.Object3D();
  for (let i = 0; i < 48; i++) {
    const angle = i / 48 * Math.PI * 2;
    base_knurl_transform.position.set(
      Math.cos(angle) * 0.427,
      0.018,
      Math.sin(angle) * 0.427
    );
    base_knurl_transform.rotation.set(0, -angle, 0);
    base_knurl_transform.scale.set(1.0, 0.55, 1.25);
    base_knurl_transform.updateMatrix();
    base_knurling.setMatrixAt(i, base_knurl_transform.matrix);
  }
  base_knurling.instanceMatrix.needsUpdate = true;
  glass_jar.add(base_knurling);

  const markAngle = 0.62;
  const markRadius = 0.507;
  const markNormal = new THREE.Vector3(
    Math.cos(markAngle),
    0,
    Math.sin(markAngle)
  ).normalize();
  const mark_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    markNormal
  );

  const measurement_marksGeom = new THREE.PlaneGeometry(0.055, 0.009);
  const measurement_marks = new THREE.InstancedMesh(
    measurement_marksGeom,
    embossed_detailMat,
    6
  );
  const measurement_mark_transform = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    measurement_mark_transform.position.set(
      markNormal.x * markRadius,
      0.455 + i * 0.145,
      markNormal.z * markRadius
    );
    measurement_mark_transform.quaternion.copy(mark_quaternion);
    measurement_mark_transform.scale.set(i % 2 === 0 ? 1.0 : 0.68, 1, 1);
    measurement_mark_transform.updateMatrix();
    measurement_marks.setMatrixAt(i, measurement_mark_transform.matrix);
  }
  measurement_marks.instanceMatrix.needsUpdate = true;
  glass_jar.add(measurement_marks);

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