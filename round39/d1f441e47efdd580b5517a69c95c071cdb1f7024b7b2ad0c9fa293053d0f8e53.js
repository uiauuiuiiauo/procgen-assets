export default function generate(THREE) {
  const clock = new THREE.Group();

  const housingMat = new THREE.MeshStandardMaterial({
    color: 0xb7c982,
    metalness: 0.0,
    roughness: 0.3,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const clock_faceMat = new THREE.MeshStandardMaterial({
    color: 0xf1f3f2,
    metalness: 0.0,
    roughness: 0.4,
  });
  const markerMat = new THREE.MeshStandardMaterial({
    color: 0x171918,
    metalness: 0.0,
    roughness: 0.8,
  });
  const handMat = new THREE.MeshStandardMaterial({
    color: 0x252727,
    metalness: 0.0,
    roughness: 0.7,
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x303232,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glass_coverMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f0f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });

  const housingProfile = [
    new THREE.Vector2(0.00, -0.48),
    new THREE.Vector2(0.32, -0.48),
    new THREE.Vector2(0.62, -0.43),
    new THREE.Vector2(0.84, -0.32),
    new THREE.Vector2(1.00, -0.15),
    new THREE.Vector2(1.07, 0.03),
    new THREE.Vector2(1.04, 0.16),
    new THREE.Vector2(0.97, 0.25),
    new THREE.Vector2(0.88, 0.30),
    new THREE.Vector2(0.00, 0.30),
  ];
  const housingGeom = new THREE.LatheGeometry(housingProfile, 64);
  const housing = new THREE.Mesh(housingGeom, housingMat);
  housing.rotation.x = Math.PI / 2;
  housing.position.z = -0.30;
  clock.add(housing);

  const bezel_backingGeom = new THREE.CylinderGeometry(0.965, 0.965, 0.12, 64);
  const bezel_backing = new THREE.Mesh(bezel_backingGeom, polished_metalMat);
  bezel_backing.rotation.x = Math.PI / 2;
  bezel_backing.position.z = 0.025;
  clock.add(bezel_backing);

  const clock_faceGeom = new THREE.CylinderGeometry(0.79, 0.79, 0.035, 64);
  const clock_face = new THREE.Mesh(clock_faceGeom, clock_faceMat);
  clock_face.rotation.x = Math.PI / 2;
  clock_face.position.z = 0.092;
  clock.add(clock_face);

  const bezel_ringGeom = new THREE.TorusGeometry(0.875, 0.105, 20, 72);
  const bezel_ring = new THREE.Mesh(bezel_ringGeom, polished_metalMat);
  bezel_ring.position.z = 0.11;
  clock.add(bezel_ring);

  const bezel_highlightGeom = new THREE.TorusGeometry(0.904, 0.021, 12, 72);
  const bezel_highlight = new THREE.Mesh(bezel_highlightGeom, polished_metalMat);
  bezel_highlight.position.z = 0.196;
  clock.add(bezel_highlight);

  const inner_bezel_trimGeom = new THREE.TorusGeometry(0.785, 0.018, 12, 72);
  const inner_bezel_trim = new THREE.Mesh(inner_bezel_trimGeom, brushed_metalMat);
  inner_bezel_trim.position.z = 0.164;
  clock.add(inner_bezel_trim);

  const hour_markerGeom = new THREE.BoxGeometry(0.062, 0.15, 0.014);
  const hour_markers = new THREE.InstancedMesh(hour_markerGeom, markerMat, 12);
  const marker_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    const cardinal = i % 3 === 0;
    marker_dummy.position.set(
      Math.sin(angle) * 0.64,
      Math.cos(angle) * 0.64,
      0.119
    );
    marker_dummy.rotation.set(0, 0, -angle);
    marker_dummy.scale.set(cardinal ? 1.08 : 0.82, cardinal ? 1.10 : 0.88, 1);
    marker_dummy.updateMatrix();
    hour_markers.setMatrixAt(i, marker_dummy.matrix);
  }
  hour_markers.instanceMatrix.needsUpdate = true;
  clock.add(hour_markers);

  const hour_handShape = new THREE.Shape();
  hour_handShape.moveTo(-0.036, -0.065);
  hour_handShape.lineTo(0.036, -0.065);
  hour_handShape.lineTo(0.044, 0.43);
  hour_handShape.lineTo(0.028, 0.535);
  hour_handShape.lineTo(-0.028, 0.535);
  hour_handShape.lineTo(-0.044, 0.43);
  hour_handShape.closePath();

  const hour_handGeom = new THREE.ExtrudeGeometry(hour_handShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const hour_hand = new THREE.Mesh(hour_handGeom, handMat);
  hour_hand.rotation.z = -0.54;
  hour_hand.position.z = 0.130;
  clock.add(hour_hand);

  const minute_handShape = new THREE.Shape();
  minute_handShape.moveTo(-0.032, -0.060);
  minute_handShape.lineTo(0.032, -0.060);
  minute_handShape.lineTo(0.041, 0.57);
  minute_handShape.lineTo(0.026, 0.685);
  minute_handShape.lineTo(-0.026, 0.685);
  minute_handShape.lineTo(-0.041, 0.57);
  minute_handShape.closePath();

  const minute_handGeom = new THREE.ExtrudeGeometry(minute_handShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const minute_hand = new THREE.Mesh(minute_handGeom, handMat);
  minute_hand.rotation.z = -2.30;
  minute_hand.position.z = 0.133;
  clock.add(minute_hand);

  const second_handShape = new THREE.Shape();
  second_handShape.moveTo(-0.010, -0.095);
  second_handShape.lineTo(0.010, -0.095);
  second_handShape.lineTo(0.010, 0.695);
  second_handShape.lineTo(-0.010, 0.695);
  second_handShape.closePath();

  const second_handGeom = new THREE.ExtrudeGeometry(second_handShape, {
    depth: 0.009,
    steps: 1,
    bevelEnabled: false,
  });
  const second_hand = new THREE.Mesh(second_handGeom, handMat);
  second_hand.rotation.z = -Math.PI / 2;
  second_hand.position.z = 0.143;
  clock.add(second_hand);

  const center_hubGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.036, 40);
  const center_hub = new THREE.Mesh(center_hubGeom, hubMat);
  center_hub.rotation.x = Math.PI / 2;
  center_hub.position.z = 0.157;
  clock.add(center_hub);

  const center_hub_capGeom = new THREE.SphereGeometry(0.119, 32, 16);
  const center_hub_cap = new THREE.Mesh(center_hub_capGeom, hubMat);
  center_hub_cap.scale.set(1, 1, 0.22);
  center_hub_cap.position.z = 0.178;
  clock.add(center_hub_cap);

  const glass_coverGeom = new THREE.CircleGeometry(0.765, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glass_coverMat);
  glass_cover.position.z = 0.184;
  clock.add(glass_cover);

  fitToUnitCube(THREE, clock);
  return clock;
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