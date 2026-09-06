export default function generate(THREE) {
  const root = new THREE.Group();

  const spring_assembly = new THREE.Group();
  spring_assembly.rotation.y = 0.28;
  spring_assembly.rotation.z = -0.035;
  root.add(spring_assembly);

  const springLength = 1.2;
  const outerRadius = 0.355;
  const wireRadius = 0.052;
  const turnCount = 8;
  const endTransition = 0.12;
  const pointCount = 257;

  const spring_wireMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  function smoothStep(value) {
    return value * value * (3 - 2 * value);
  }

  function coilRadius(t) {
    const edgeDistance = Math.min(t / endTransition, (1 - t) / endTransition, 1);
    const edgeFactor = smoothStep(edgeDistance);
    return wireRadius + (outerRadius - wireRadius) * edgeFactor;
  }

  const spring_path_points = [];
  const thetaSpan = turnCount * Math.PI * 2;
  const endAngle = Math.PI * 1.5;

  for (let i = 0; i < pointCount; i++) {
    const t = i / (pointCount - 1);
    const theta = endAngle + thetaSpan * t;
    const radius = coilRadius(t);
    spring_path_points.push(
      new THREE.Vector3(
        -springLength * 0.5 + springLength * t,
        Math.cos(theta) * radius,
        Math.sin(theta) * radius
      )
    );
  }

  const spring_path = new THREE.CatmullRomCurve3(
    spring_path_points,
    false,
    "centripetal",
    0.5
  );

  const spring_wireGeom = new THREE.TubeGeometry(
    spring_path,
    384,
    wireRadius,
    16,
    false
  );
  const spring_wire = new THREE.Mesh(spring_wireGeom, spring_wireMat);
  spring_assembly.add(spring_wire);

  const cut_faceMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  const cut_faceGeom = new THREE.CircleGeometry(wireRadius * 0.98, 24);

  const outward_normal = spring_path_points[0].clone();
  outward_normal.x = 0;
  outward_normal.normalize();

  const front_cut_face = new THREE.Mesh(cut_faceGeom, cut_faceMat);
  front_cut_face.position.copy(spring_path_points[0]);
  front_cut_face.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    outward_normal
  );
  spring_assembly.add(front_cut_face);

  const last_point = spring_path_points[spring_path_points.length - 1];
  const inward_normal = last_point.clone();
  inward_normal.x = 0;
  inward_normal.normalize();

  const rear_cut_face = new THREE.Mesh(cut_faceGeom, cut_faceMat);
  rear_cut_face.position.copy(last_point);
  rear_cut_face.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    inward_normal
  );
  spring_assembly.add(rear_cut_face);

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

  fitToUnitCube(THREE, root);
  return root;
}