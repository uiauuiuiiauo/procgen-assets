export default function generate(THREE) {
  const root = new THREE.Group();
  const pen_group = new THREE.Group();
  root.add(pen_group);

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const rear_barrelProfile = [
    new THREE.Vector2(0.00, -3.08),
    new THREE.Vector2(0.29, -3.08),
    new THREE.Vector2(0.35, -3.03),
    new THREE.Vector2(0.38, -2.93),
    new THREE.Vector2(0.39, -2.72),
    new THREE.Vector2(0.40, -1.60),
    new THREE.Vector2(0.41, -0.48),
    new THREE.Vector2(0.41, -0.28),
    new THREE.Vector2(0.00, -0.28),
  ];
  const rear_barrelGeom = new THREE.LatheGeometry(rear_barrelProfile, 48);
  const rear_barrel = new THREE.Mesh(rear_barrelGeom, polished_metalMat);
  rear_barrel.rotation.x = Math.PI / 2;
  pen_group.add(rear_barrel);

  const rear_end_capGeom = new THREE.CylinderGeometry(0.35, 0.31, 0.18, 48);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, polished_metalMat);
  rear_end_cap.rotation.x = Math.PI / 2;
  rear_end_cap.position.z = -3.16;
  pen_group.add(rear_end_cap);

  const rear_end_discGeom = new THREE.CircleGeometry(0.305, 48);
  const rear_end_disc = new THREE.Mesh(rear_end_discGeom, silver_metalMat);
  rear_end_disc.rotation.y = Math.PI;
  rear_end_disc.position.z = -3.252;
  pen_group.add(rear_end_disc);

  const rear_seam_ringGeom = new THREE.TorusGeometry(0.35, 0.009, 8, 48);
  const rear_seam_ring = new THREE.Mesh(rear_seam_ringGeom, dark_rubberMat);
  rear_seam_ring.position.z = -3.055;
  pen_group.add(rear_seam_ring);

  const center_bandGeom = new THREE.CylinderGeometry(0.425, 0.425, 0.34, 48);
  const center_band = new THREE.Mesh(center_bandGeom, polished_metalMat);
  center_band.rotation.x = Math.PI / 2;
  center_band.position.z = -0.10;
  pen_group.add(center_band);

  const center_band_rear_grooveGeom = new THREE.TorusGeometry(0.416, 0.012, 8, 48);
  const center_band_rear_groove = new THREE.Mesh(center_band_rear_grooveGeom, dark_rubberMat);
  center_band_rear_groove.position.z = -0.275;
  pen_group.add(center_band_rear_groove);

  const center_band_front_grooveGeom = new THREE.TorusGeometry(0.416, 0.012, 8, 48);
  const center_band_front_groove = new THREE.Mesh(center_band_front_grooveGeom, dark_rubberMat);
  center_band_front_groove.position.z = 0.075;
  pen_group.add(center_band_front_groove);

  const center_band_center_grooveGeom = new THREE.TorusGeometry(0.424, 0.006, 6, 48);
  const center_band_center_groove = new THREE.Mesh(center_band_center_grooveGeom, brushed_metalMat);
  center_band_center_groove.position.z = -0.10;
  pen_group.add(center_band_center_groove);

  const front_barrelProfile = [
    new THREE.Vector2(0.00, -0.02),
    new THREE.Vector2(0.39, -0.02),
    new THREE.Vector2(0.39, 0.55),
    new THREE.Vector2(0.37, 1.25),
    new THREE.Vector2(0.34, 2.05),
    new THREE.Vector2(0.31, 2.62),
    new THREE.Vector2(0.285, 2.91),
    new THREE.Vector2(0.255, 3.055),
    new THREE.Vector2(0.00, 3.055),
  ];
  const front_barrelGeom = new THREE.LatheGeometry(front_barrelProfile, 48);
  const front_barrel = new THREE.Mesh(front_barrelGeom, polished_metalMat);
  front_barrel.rotation.x = Math.PI / 2;
  pen_group.add(front_barrel);

  const front_trim_ringGeom = new THREE.TorusGeometry(0.252, 0.018, 10, 48);
  const front_trim_ring = new THREE.Mesh(front_trim_ringGeom, silver_metalMat);
  front_trim_ring.position.z = 3.035;
  pen_group.add(front_trim_ring);

  const nib_socketGeom = new THREE.CylinderGeometry(0.215, 0.235, 0.12, 32);
  const nib_socket = new THREE.Mesh(nib_socketGeom, dark_rubberMat);
  nib_socket.rotation.x = Math.PI / 2;
  nib_socket.position.z = 3.09;
  pen_group.add(nib_socket);

  const nib_feedGeom = new THREE.ConeGeometry(0.165, 0.78, 24);
  const nib_feed = new THREE.Mesh(nib_feedGeom, dark_rubberMat);
  nib_feed.rotation.x = Math.PI / 2;
  nib_feed.scale.set(1, 1, 0.42);
  nib_feed.position.set(0, -0.055, 3.39);
  pen_group.add(nib_feed);

  const nibShape = new THREE.Shape();
  nibShape.moveTo(-0.23, 0);
  nibShape.lineTo(-0.30, 0.16);
  nibShape.bezierCurveTo(-0.30, 0.34, -0.20, 0.58, -0.08, 0.72);
  nibShape.bezierCurveTo(-0.045, 0.77, -0.02, 0.81, 0, 0.83);
  nibShape.bezierCurveTo(0.02, 0.81, 0.045, 0.77, 0.08, 0.72);
  nibShape.bezierCurveTo(0.20, 0.58, 0.30, 0.34, 0.30, 0.16);
  nibShape.lineTo(0.23, 0);
  nibShape.closePath();

  const nibGeom = new THREE.ExtrudeGeometry(nibShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.014,
    bevelSegments: 3,
  });
  const nib = new THREE.Mesh(nibGeom, silver_metalMat);
  nib.rotation.x = Math.PI / 2;
  nib.position.set(0, 0.075, 3.07);
  pen_group.add(nib);

  const breather_holeGeom = new THREE.CylinderGeometry(0.047, 0.047, 0.009, 24);
  const breather_hole = new THREE.Mesh(breather_holeGeom, engravingMat);
  breather_hole.position.set(0, 0.081, 3.52);
  pen_group.add(breather_hole);

  const nib_slitGeom = new THREE.BoxGeometry(0.012, 0.008, 0.35);
  const nib_slit = new THREE.Mesh(nib_slitGeom, engravingMat);
  nib_slit.position.set(0, 0.081, 3.755);
  pen_group.add(nib_slit);

  const left_nib_engravingPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.205, 0.081, 3.20),
    new THREE.Vector3(-0.175, 0.081, 3.31),
    new THREE.Vector3(-0.125, 0.081, 3.40),
    new THREE.Vector3(-0.062, 0.081, 3.47),
  ]);
  const left_nib_engravingGeom = new THREE.TubeGeometry(
    left_nib_engravingPath,
    16,
    0.006,
    6,
    false
  );
  const left_nib_engraving = new THREE.Mesh(left_nib_engravingGeom, engravingMat);
  pen_group.add(left_nib_engraving);

  const right_nib_engravingPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.205, 0.081, 3.20),
    new THREE.Vector3(0.175, 0.081, 3.31),
    new THREE.Vector3(0.125, 0.081, 3.40),
    new THREE.Vector3(0.062, 0.081, 3.47),
  ]);
  const right_nib_engravingGeom = new THREE.TubeGeometry(
    right_nib_engravingPath,
    16,
    0.006,
    6,
    false
  );
  const right_nib_engraving = new THREE.Mesh(right_nib_engravingGeom, engravingMat);
  pen_group.add(right_nib_engraving);

  const clip_mountGeom = new THREE.SphereGeometry(1, 24, 12);
  const clip_mount = new THREE.Mesh(clip_mountGeom, polished_metalMat);
  clip_mount.scale.set(0.14, 0.075, 0.16);
  clip_mount.position.set(0, 0.43, -2.72);
  pen_group.add(clip_mount);

  const clipShape = new THREE.Shape();
  clipShape.moveTo(-0.09, -1.18);
  clipShape.bezierCurveTo(-0.14, -1.16, -0.15, -1.05, -0.10, -0.98);
  clipShape.lineTo(-0.055, 1.04);
  clipShape.bezierCurveTo(-0.05, 1.13, 0.05, 1.13, 0.055, 1.04);
  clipShape.lineTo(0.10, -0.98);
  clipShape.bezierCurveTo(0.15, -1.05, 0.14, -1.16, 0.09, -1.18);
  clipShape.bezierCurveTo(0.04, -1.22, -0.04, -1.22, -0.09, -1.18);
  clipShape.closePath();

  const clipGeom = new THREE.ExtrudeGeometry(clipShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const clip = new THREE.Mesh(clipGeom, polished_metalMat);
  clip.rotation.x = Math.PI / 2;
  clip.position.set(0, 0.505, -1.45);
  pen_group.add(clip);

  const clip_tip_padGeom = new THREE.SphereGeometry(1, 20, 10);
  const clip_tip_pad = new THREE.Mesh(clip_tip_padGeom, polished_metalMat);
  clip_tip_pad.scale.set(0.11, 0.035, 0.15);
  clip_tip_pad.position.set(0, 0.475, -0.25);
  pen_group.add(clip_tip_pad);

  pen_group.rotation.set(Math.PI / 2, -Math.PI / 4, 0);

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