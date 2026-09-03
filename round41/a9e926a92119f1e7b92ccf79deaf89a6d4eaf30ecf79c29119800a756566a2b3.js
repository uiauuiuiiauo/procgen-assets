export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = 'spring_scissors';

  const metal_head = new THREE.Group();
  metal_head.name = 'metal_head';
  root.add(metal_head);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = 'handle_assembly';
  root.add(handle_assembly);

  const spring_ringMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xe20b1b,
    metalness: 0.0,
    roughness: 0.3,
  });

  const handle_insetMat = new THREE.MeshStandardMaterial({
    color: 0x9f0712,
    metalness: 0.0,
    roughness: 0.3,
  });

  const ring_count = 23;
  const ring_start_angle = 0.4;
  const ring_end_angle = Math.PI * 2 - 0.4;
  const ring_span = ring_end_angle - ring_start_angle;
  const ring_radius_x = 1.0;
  const ring_radius_y = 0.78;
  const ring_tilt = 0.16;
  const ring_wobble = 0.012;
  const ring_wire_radius = 0.045;

  function ringCenter(index) {
    const t = index / (ring_count - 1);
    const angle = ring_start_angle + ring_span * t;
    const radial_offset = ring_wobble * Math.sin(index * 1.73);
    const radius_x = ring_radius_x + radial_offset;
    const radius_y = ring_radius_y + radial_offset * 0.65;
    return new THREE.Vector3(
      Math.cos(angle) * radius_x,
      Math.sin(angle) * radius_y +
        ring_wobble * 0.5 * Math.sin(index * 1.21),
      ring_tilt * Math.cos(angle) +
        ring_wobble * 0.4 * Math.sin(index * 0.91)
    );
  }

  function ringTangent(index) {
    const t = index / (ring_count - 1);
    const angle = ring_start_angle + ring_span * t;
    const radial_offset = ring_wobble * Math.sin(index * 1.73);
    const radius_x = ring_radius_x + radial_offset;
    const radius_y = ring_radius_y + radial_offset * 0.65;
    return new THREE.Vector3(
      -Math.sin(angle) * radius_x,
      Math.cos(angle) * radius_y +
        ring_wobble * 0.5 * 1.21 * Math.cos(index * 1.21),
      -ring_tilt * Math.sin(angle) +
        ring_wobble * 0.4 * 0.91 * Math.cos(index * 0.91)
    ).normalize();
  }

  const spring_ringGeom = new THREE.TorusGeometry(
    0.17,
    ring_wire_radius,
    12,
    36
  );
  const spring_rings = new THREE.InstancedMesh(
    spring_ringGeom,
    spring_ringMat,
    ring_count
  );
  spring_rings.name = 'spring_rings';

  const ring_dummy = new THREE.Object3D();
  const ring_local_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < ring_count; i++) {
    const center = ringCenter(i);
    const tangent = ringTangent(i);
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      ring_local_axis,
      tangent
    );
    const oval_scale = 0.96 + 0.06 * Math.sin((i + 1) * 1.37);

    ring_dummy.position.copy(center);
    ring_dummy.quaternion.copy(orientation);
    ring_dummy.scale.set(1, oval_scale, 1);
    ring_dummy.updateMatrix();
    spring_rings.setMatrixAt(i, ring_dummy.matrix);
  }
  spring_rings.instanceMatrix.needsUpdate = true;
  metal_head.add(spring_rings);

  const spring_bridge_points = [];
  for (let i = 0; i < ring_count; i++) {
    spring_bridge_points.push(ringCenter(i));
  }
  const spring_bridgeCurve = new THREE.CatmullRomCurve3(
    spring_bridge_points,
    false,
    'centripetal'
  );
  const spring_bridgeGeom = new THREE.TubeGeometry(
    spring_bridgeCurve,
    112,
    0.027,
    8,
    false
  );
  const spring_bridge = new THREE.Mesh(spring_bridgeGeom, spring_ringMat);
  spring_bridge.name = 'spring_bridge';
  metal_head.add(spring_bridge);

  const handle_shape = new THREE.Shape();
  handle_shape.moveTo(-0.08, -0.11);
  handle_shape.bezierCurveTo(0.12, -0.16, 0.42, -0.17, 0.67, -0.14);
  handle_shape.bezierCurveTo(0.83, -0.12, 0.92, -0.05, 0.92, 0.04);
  handle_shape.bezierCurveTo(0.92, 0.15, 0.81, 0.21, 0.66, 0.20);
  handle_shape.bezierCurveTo(0.39, 0.18, 0.12, 0.15, -0.08, 0.11);
  handle_shape.bezierCurveTo(-0.16, 0.07, -0.16, -0.06, -0.08, -0.11);
  handle_shape.closePath();

  const handle_hole = new THREE.Path();
  handle_hole.moveTo(0.23, 0.02);
  handle_hole.bezierCurveTo(0.25, -0.055, 0.33, -0.085, 0.43, -0.085);
  handle_hole.lineTo(0.67, -0.065);
  handle_hole.bezierCurveTo(0.77, -0.055, 0.82, -0.015, 0.80, 0.04);
  handle_hole.bezierCurveTo(0.78, 0.095, 0.71, 0.115, 0.62, 0.105);
  handle_hole.lineTo(0.39, 0.085);
  handle_hole.bezierCurveTo(0.30, 0.08, 0.24, 0.06, 0.23, 0.02);
  handle_hole.closePath();
  handle_shape.holes.push(handle_hole);

  const handleGeom = new THREE.ExtrudeGeometry(handle_shape, {
    depth: 0.12,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 4,
  });
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = 'handle';
  handle.position.set(0.72, -0.24, -0.18);
  handle.rotation.z = -0.14;
  handle_assembly.add(handle);

  const handle_insetGeom = new THREE.CapsuleGeometry(0.035, 0.34, 6, 12);
  const handle_inset = new THREE.Mesh(handle_insetGeom, handle_insetMat);
  handle_inset.name = 'handle_inset';
  handle_inset.rotation.z = Math.PI / 2;
  handle_inset.scale.z = 0.35;
  handle_inset.position.set(0.16, -0.005, 0.155);
  handle.add(handle_inset);

  const handle_mountGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.24,
    18
  );
  const handle_mount = new THREE.Mesh(handle_mountGeom, handleMat);
  handle_mount.name = 'handle_mount';
  handle_mount.rotation.x = Math.PI / 2;
  handle_mount.position.set(0.79, -0.245, -0.075);
  handle_assembly.add(handle_mount);

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