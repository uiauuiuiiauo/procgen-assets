export default function generate(THREE) {
  const root = new THREE.Group();
  const pen_group = new THREE.Group();
  root.add(pen_group);

  const barrelMat = new THREE.MeshStandardMaterial({
    color: 0x08090c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_dotsMat = new THREE.MeshStandardMaterial({
    color: 0xf21f3b,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const clipMat = new THREE.MeshStandardMaterial({
    color: 0x111319,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blue_nibMat = new THREE.MeshPhysicalMaterial({
    color: 0x1769ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const blue_feedMat = new THREE.MeshStandardMaterial({
    color: 0x0754d8,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.82,
  });
  const nib_detailMat = new THREE.MeshStandardMaterial({
    color: 0x12377f,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const metal_tipMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const barrelGeom = new THREE.CylinderGeometry(0.285, 0.31, 3.72, 48);
  const barrel = new THREE.Mesh(barrelGeom, barrelMat);
  barrel.rotation.x = Math.PI / 2;
  pen_group.add(barrel);

  const front_collarGeom = new THREE.CylinderGeometry(0.255, 0.292, 0.32, 40);
  const front_collar = new THREE.Mesh(front_collarGeom, barrelMat);
  front_collar.rotation.x = Math.PI / 2;
  front_collar.position.z = 1.96;
  pen_group.add(front_collar);

  const front_trim_ringGeom = new THREE.TorusGeometry(0.252, 0.018, 10, 40);
  const front_trim_ring = new THREE.Mesh(front_trim_ringGeom, barrelMat);
  front_trim_ring.position.z = 2.105;
  pen_group.add(front_trim_ring);

  const rear_bandGeom = new THREE.CylinderGeometry(0.31, 0.255, 0.22, 40);
  const rear_band = new THREE.Mesh(rear_bandGeom, barrelMat);
  rear_band.rotation.x = Math.PI / 2;
  rear_band.position.z = -1.91;
  pen_group.add(rear_band);

  const rear_seam_ringGeom = new THREE.TorusGeometry(0.302, 0.018, 10, 40);
  const rear_seam_ring = new THREE.Mesh(rear_seam_ringGeom, barrelMat);
  rear_seam_ring.position.z = -1.81;
  pen_group.add(rear_seam_ring);

  const rear_finialGeom = new THREE.CylinderGeometry(0.255, 0.23, 0.36, 40);
  const rear_finial = new THREE.Mesh(rear_finialGeom, barrelMat);
  rear_finial.rotation.x = Math.PI / 2;
  rear_finial.position.z = -2.18;
  pen_group.add(rear_finial);

  const rear_end_capGeom = new THREE.SphereGeometry(0.232, 32, 16);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, barrelMat);
  rear_end_cap.scale.set(1, 1, 0.48);
  rear_end_cap.position.z = -2.36;
  pen_group.add(rear_end_cap);

  const red_dotsGeom = new THREE.CircleGeometry(0.031, 14);
  const dot_count = 144;
  const red_dots = new THREE.InstancedMesh(red_dotsGeom, red_dotsMat, dot_count);
  const dot_dummy = new THREE.Object3D();
  const dot_normal = new THREE.Vector3();
  const dot_position = new THREE.Vector3();
  const dot_quaternion = new THREE.Quaternion();
  const decal_normal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < dot_count; i++) {
    const sequence = (i * 37) % dot_count;
    const t = (sequence + 0.5) / dot_count;
    const z = -1.72 + t * 3.44;
    const angle = i * 2.3999632297 + (i % 5) * 0.11;
    const radius = 0.31 + (0.285 - 0.31) * t;
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    const size = 0.72 + ((i * 11) % 9) * 0.045;

    dot_normal.set(nx, ny, 0);
    dot_position.set(
      nx * (radius + 0.006),
      ny * (radius + 0.006),
      z
    );
    dot_quaternion.setFromUnitVectors(decal_normal, dot_normal);
    dot_dummy.position.copy(dot_position);
    dot_dummy.quaternion.copy(dot_quaternion);
    dot_dummy.scale.set(size, size, 1);
    dot_dummy.updateMatrix();
    red_dots.setMatrixAt(i, dot_dummy.matrix);
  }
  red_dots.instanceMatrix.needsUpdate = true;
  pen_group.add(red_dots);

  const clipShape = new THREE.Shape();
  clipShape.moveTo(0.0, -0.82);
  clipShape.bezierCurveTo(0.07, -0.87, 0.17, -0.84, 0.2, -0.73);
  clipShape.lineTo(0.29, 0.55);
  clipShape.bezierCurveTo(0.3, 0.7, 0.18, 0.82, 0.02, 0.82);
  clipShape.lineTo(-0.05, 0.7);
  clipShape.lineTo(0.06, -0.68);
  clipShape.bezierCurveTo(0.06, -0.74, 0.03, -0.79, 0.0, -0.82);

  const clipGeom = new THREE.ExtrudeGeometry(clipShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const clip = new THREE.Mesh(clipGeom, clipMat);
  clip.rotation.x = Math.PI / 2;
  clip.position.set(-0.04, 0.37, -1.04);
  pen_group.add(clip);

  const clip_anchorGeom = new THREE.SphereGeometry(0.12, 24, 12);
  const clip_anchor = new THREE.Mesh(clip_anchorGeom, clipMat);
  clip_anchor.scale.set(0.75, 0.55, 1.15);
  clip_anchor.position.set(-0.04, 0.31, -1.76);
  pen_group.add(clip_anchor);

  const blue_nibProfile = [
    new THREE.Vector2(0.245, 0.0),
    new THREE.Vector2(0.265, 0.08),
    new THREE.Vector2(0.25, 0.2),
    new THREE.Vector2(0.215, 0.38),
    new THREE.Vector2(0.165, 0.58),
    new THREE.Vector2(0.105, 0.76),
    new THREE.Vector2(0.065, 0.86),
  ];
  const blue_nibGeom = new THREE.LatheGeometry(blue_nibProfile, 40);
  const blue_nib = new THREE.Mesh(blue_nibGeom, blue_nibMat);
  blue_nib.rotation.x = Math.PI / 2;
  blue_nib.position.z = 2.06;
  pen_group.add(blue_nib);

  const blue_feedGeom = new THREE.CylinderGeometry(0.045, 0.13, 0.7, 24);
  const blue_feed = new THREE.Mesh(blue_feedGeom, blue_feedMat);
  blue_feed.rotation.x = Math.PI / 2;
  blue_feed.position.set(0, -0.015, 2.5);
  pen_group.add(blue_feed);

  const nib_grip_ringsGeom = new THREE.TorusGeometry(0.22, 0.011, 8, 32);
  const nib_grip_rings = new THREE.InstancedMesh(
    nib_grip_ringsGeom,
    blue_feedMat,
    4
  );
  const ring_dummy = new THREE.Object3D();
  const ring_data = [
    [2.17, 1.13],
    [2.23, 1.08],
    [2.29, 1.02],
    [2.35, 0.96],
  ];
  for (let i = 0; i < ring_data.length; i++) {
    ring_dummy.position.set(0, 0, ring_data[i][0]);
    ring_dummy.quaternion.identity();
    ring_dummy.scale.set(ring_data[i][1], ring_data[i][1], 1);
    ring_dummy.updateMatrix();
    nib_grip_rings.setMatrixAt(i, ring_dummy.matrix);
  }
  nib_grip_rings.instanceMatrix.needsUpdate = true;
  pen_group.add(nib_grip_rings);

  const nib_ventGeom = new THREE.CircleGeometry(0.045, 20);
  const nib_vent = new THREE.Mesh(nib_ventGeom, nib_detailMat);
  nib_vent.rotation.x = -Math.PI / 2;
  nib_vent.scale.set(0.65, 1.15, 1);
  nib_vent.position.set(0, 0.178, 2.64);
  pen_group.add(nib_vent);

  const nib_slitGeom = new THREE.BoxGeometry(0.012, 0.007, 0.25);
  const nib_slit = new THREE.Mesh(nib_slitGeom, nib_detailMat);
  nib_slit.position.set(0, 0.096, 2.81);
  pen_group.add(nib_slit);

  const metal_tipGeom = new THREE.CylinderGeometry(0.012, 0.072, 0.25, 28);
  const metal_tip = new THREE.Mesh(metal_tipGeom, metal_tipMat);
  metal_tip.rotation.x = Math.PI / 2;
  metal_tip.position.z = 2.995;
  pen_group.add(metal_tip);

  const metal_tip_capGeom = new THREE.SphereGeometry(0.014, 16, 8);
  const metal_tip_cap = new THREE.Mesh(metal_tip_capGeom, metal_tipMat);
  metal_tip_cap.position.z = 3.122;
  pen_group.add(metal_tip_cap);

  pen_group.rotation.set(0, Math.PI / 2, -0.12);

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