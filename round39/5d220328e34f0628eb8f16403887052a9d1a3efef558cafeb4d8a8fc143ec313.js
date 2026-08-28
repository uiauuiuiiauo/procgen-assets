export default function generate(THREE) {
  const root = new THREE.Group();
  const pen = new THREE.Group();
  root.add(pen);

  const barrelMat = new THREE.MeshStandardMaterial({
    color: 0x080a0c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x020304,
    metalness: 0.0,
    roughness: 0.8,
  });
  const bright_blueMat = new THREE.MeshStandardMaterial({
    color: 0x00a9ed,
    metalness: 0.0,
    roughness: 0.3,
  });
  const dark_blueMat = new THREE.MeshStandardMaterial({
    color: 0x0066bd,
    metalness: 0.0,
    roughness: 0.3,
  });
  const pocket_clipMat = new THREE.MeshStandardMaterial({
    color: 0x00a9ed,
    metalness: 0.5,
    roughness: 0.25,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const barrelGeom = new THREE.CylinderGeometry(0.235, 0.235, 2.62, 48);
  const barrel = new THREE.Mesh(barrelGeom, barrelMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.z = -0.56;
  pen.add(barrel);

  const barrel_front_seamGeom = new THREE.TorusGeometry(0.235, 0.007, 8, 48);
  const barrel_front_seam = new THREE.Mesh(barrel_front_seamGeom, seamMat);
  barrel_front_seam.position.z = 0.75;
  pen.add(barrel_front_seam);

  const rear_end_capProfile = [
    new THREE.Vector2(0.00, -0.24),
    new THREE.Vector2(0.12, -0.235),
    new THREE.Vector2(0.21, -0.20),
    new THREE.Vector2(0.255, -0.13),
    new THREE.Vector2(0.270, -0.04),
    new THREE.Vector2(0.270, 0.08),
    new THREE.Vector2(0.250, 0.16),
    new THREE.Vector2(0.235, 0.22),
    new THREE.Vector2(0.00, 0.22),
  ];
  const rear_end_capGeom = new THREE.LatheGeometry(rear_end_capProfile, 48);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, bright_blueMat);
  rear_end_cap.rotation.x = Math.PI / 2;
  rear_end_cap.position.z = -1.99;
  pen.add(rear_end_cap);

  const rear_cap_collarGeom = new THREE.TorusGeometry(0.238, 0.018, 10, 48);
  const rear_cap_collar = new THREE.Mesh(rear_cap_collarGeom, bright_blueMat);
  rear_cap_collar.position.z = -1.78;
  pen.add(rear_cap_collar);

  const front_collarGeom = new THREE.CylinderGeometry(0.18, 0.235, 0.36, 48);
  const front_collar = new THREE.Mesh(front_collarGeom, dark_blueMat);
  front_collar.rotation.x = Math.PI / 2;
  front_collar.position.z = 0.94;
  pen.add(front_collar);

  const nose_coneGeom = new THREE.CylinderGeometry(0.068, 0.18, 0.42, 48);
  const nose_cone = new THREE.Mesh(nose_coneGeom, bright_blueMat);
  nose_cone.rotation.x = Math.PI / 2;
  nose_cone.position.z = 1.31;
  pen.add(nose_cone);

  const tip_socketGeom = new THREE.CylinderGeometry(0.052, 0.072, 0.14, 32);
  const tip_socket = new THREE.Mesh(tip_socketGeom, bright_blueMat);
  tip_socket.rotation.x = Math.PI / 2;
  tip_socket.position.z = 1.52;
  pen.add(tip_socket);

  const metal_tipGeom = new THREE.CylinderGeometry(0.018, 0.052, 0.23, 32);
  const metal_tip = new THREE.Mesh(metal_tipGeom, silverMat);
  metal_tip.rotation.x = Math.PI / 2;
  metal_tip.position.z = 1.69;
  pen.add(metal_tip);

  const ballpointGeom = new THREE.SphereGeometry(0.021, 20, 10);
  const ballpoint = new THREE.Mesh(ballpointGeom, silverMat);
  ballpoint.position.z = 1.815;
  pen.add(ballpoint);

  const pocket_clipShape = new THREE.Shape();
  pocket_clipShape.moveTo(-0.075, -1.03);
  pocket_clipShape.quadraticCurveTo(-0.075, -1.12, 0.000, -1.13);
  pocket_clipShape.quadraticCurveTo(0.075, -1.12, 0.075, -1.03);
  pocket_clipShape.lineTo(0.075, 0.86);
  pocket_clipShape.quadraticCurveTo(0.075, 0.94, 0.000, 0.95);
  pocket_clipShape.quadraticCurveTo(-0.075, 0.94, -0.075, 0.86);
  pocket_clipShape.closePath();

  const pocket_clipGeom = new THREE.ExtrudeGeometry(pocket_clipShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.010,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const pocket_clip = new THREE.Mesh(pocket_clipGeom, pocket_clipMat);
  pocket_clip.rotation.x = Math.PI / 2;
  pocket_clip.position.set(0, 0.315, -0.82);
  pen.add(pocket_clip);

  const clip_anchorGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.14, 32);
  const clip_anchor = new THREE.Mesh(clip_anchorGeom, pocket_clipMat);
  clip_anchor.position.set(0, 0.255, -1.72);
  pen.add(clip_anchor);

  const clip_tipGeom = new THREE.SphereGeometry(1, 24, 12);
  const clip_tip = new THREE.Mesh(clip_tipGeom, pocket_clipMat);
  clip_tip.scale.set(0.085, 0.035, 0.105);
  clip_tip.position.set(0, 0.292, 0.13);
  pen.add(clip_tip);

  pen.rotation.y = Math.PI / 4;

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