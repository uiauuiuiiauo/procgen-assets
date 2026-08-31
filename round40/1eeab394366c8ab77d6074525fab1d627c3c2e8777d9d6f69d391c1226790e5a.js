export default function generate(THREE) {
  const root = new THREE.Group();

  const spring_assembly = new THREE.Group();
  spring_assembly.rotation.y = 0.34;
  root.add(spring_assembly);

  const spring_length = 2.35;
  const spring_radius = 0.65;
  const wire_radius = 0.095;
  const turn_count = 8.5;
  const end_transition = 0.18;
  const point_count = 273;

  const spring_wireMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const spring_path_points = [];
  for (let i = 0; i < point_count; i++) {
    const t = i / (point_count - 1);
    const angle = t * turn_count * Math.PI * 2;
    const left_transition = Math.min(t / end_transition, 1);
    const right_transition = Math.min((1 - t) / end_transition, 1);
    const end_factor =
      left_transition *
      right_transition *
      (2 - left_transition - right_transition);
    const variable_radius = spring_radius * (0.93 + end_factor * 0.07);
    const x = -spring_length / 2 + spring_length * t;

    spring_path_points.push(
      new THREE.Vector3(
        x,
        Math.cos(angle) * variable_radius,
        Math.sin(angle) * variable_radius
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
    416,
    wire_radius,
    16,
    false
  );
  const spring_wire = new THREE.Mesh(spring_wireGeom, spring_wireMat);
  spring_assembly.add(spring_wire);

  const cut_faceMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const cut_faceGeom = new THREE.CircleGeometry(wire_radius * 0.98, 24);
  const wire_axis = new THREE.Vector3(0, 0, 1);

  const front_point = spring_path_points[0];
  const front_tangent = spring_path_points[1]
    .clone()
    .sub(front_point)
    .normalize();
  const front_cut_face = new THREE.Mesh(cut_faceGeom, cut_faceMat);
  front_cut_face.position.copy(front_point);
  front_cut_face.quaternion.setFromUnitVectors(wire_axis, front_tangent);
  spring_assembly.add(front_cut_face);

  const rear_point = spring_path_points[spring_path_points.length - 1];
  const rear_tangent = spring_path_points[spring_path_points.length - 2]
    .clone()
    .sub(rear_point)
    .normalize();
  const rear_cut_face = new THREE.Mesh(cut_faceGeom, cut_faceMat);
  rear_cut_face.position.copy(rear_point);
  rear_cut_face.quaternion.setFromUnitVectors(wire_axis, rear_tangent);
  spring_assembly.add(rear_cut_face);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}