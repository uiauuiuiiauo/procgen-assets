export default function generate(THREE) {
  const root = new THREE.Group();
  const pen = new THREE.Group();
  root.add(pen);

  const barrelMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.0,
    roughness: 0.7,
  });

  const barrelProfile = [
    new THREE.Vector2(0.000, -1.50),
    new THREE.Vector2(0.170, -1.50),
    new THREE.Vector2(0.190, -1.43),
    new THREE.Vector2(0.205, -1.20),
    new THREE.Vector2(0.222, -0.65),
    new THREE.Vector2(0.235, 0.02),
    new THREE.Vector2(0.235, 0.10),
    new THREE.Vector2(0.000, 0.10),
  ];
  const barrelGeom = new THREE.LatheGeometry(barrelProfile, 48);
  const barrel = new THREE.Mesh(barrelGeom, barrelMat);
  barrel.rotation.x = Math.PI / 2;
  pen.add(barrel);

  const rear_capGeom = new THREE.CylinderGeometry(0.172, 0.172, 0.15, 48);
  const rear_cap = new THREE.Mesh(rear_capGeom, barrelMat);
  rear_cap.rotation.x = Math.PI / 2;
  rear_cap.position.z = -1.565;
  pen.add(rear_cap);

  const rear_end_discGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.012, 40);
  const rear_end_disc = new THREE.Mesh(rear_end_discGeom, silverMat);
  rear_end_disc.rotation.x = Math.PI / 2;
  rear_end_disc.position.z = -1.646;
  pen.add(rear_end_disc);

  const rear_seamGeom = new THREE.TorusGeometry(0.172, 0.007, 8, 48);
  const rear_seam = new THREE.Mesh(rear_seamGeom, engravingMat);
  rear_seam.position.z = -1.488;
  pen.add(rear_seam);

  const center_bandGeom = new THREE.CylinderGeometry(0.246, 0.246, 0.19, 48);
  const center_band = new THREE.Mesh(center_bandGeom, barrelMat);
  center_band.rotation.x = Math.PI / 2;
  center_band.position.z = 0.17;
  pen.add(center_band);

  const band_center_inlayGeom = new THREE.CylinderGeometry(0.248, 0.248, 0.034, 48);
  const band_center_inlay = new THREE.Mesh(band_center_inlayGeom, darkMat);
  band_center_inlay.rotation.x = Math.PI / 2;
  band_center_inlay.position.z = 0.17;
  pen.add(band_center_inlay);

  const band_rear_rimGeom = new THREE.TorusGeometry(0.240, 0.009, 8, 48);
  const band_rear_rim = new THREE.Mesh(band_rear_rimGeom, silverMat);
  band_rear_rim.position.z = 0.073;
  pen.add(band_rear_rim);

  const band_front_rimGeom = new THREE.TorusGeometry(0.240, 0.009, 8, 48);
  const band_front_rim = new THREE.Mesh(band_front_rimGeom, silverMat);
  band_front_rim.position.z = 0.267;
  pen.add(band_front_rim);

  const band_rear_grooveGeom = new THREE.TorusGeometry(0.245, 0.005, 6, 48);
  const band_rear_groove = new THREE.Mesh(band_rear_grooveGeom, engravingMat);
  band_rear_groove.position.z = 0.096;
  pen.add(band_rear_groove);

  const band_front_grooveGeom = new THREE.TorusGeometry(0.245, 0.005, 6, 48);
  const band_front_groove = new THREE.Mesh(band_front_grooveGeom, engravingMat);
  band_front_groove.position.z = 0.244;
  pen.add(band_front_groove);

  const gripProfile = [
    new THREE.Vector2(0.000, 0.255),
    new THREE.Vector2(0.225, 0.255),
    new THREE.Vector2(0.225, 0.35),
    new THREE.Vector2(0.216, 0.52),
    new THREE.Vector2(0.198, 0.85),
    new THREE.Vector2(0.177, 1.18),
    new THREE.Vector2(0.158, 1.42),
    new THREE.Vector2(0.150, 1.50),
    new THREE.Vector2(0.000, 1.50),
  ];
  const grip_sectionGeom = new THREE.LatheGeometry(gripProfile, 48);
  const grip_section = new THREE.Mesh(grip_sectionGeom, barrelMat);
  grip_section.rotation.x = Math.PI / 2;
  pen.add(grip_section);

  const grip_rear_seamGeom = new THREE.TorusGeometry(0.223, 0.006, 8, 48);
  const grip_rear_seam = new THREE.Mesh(grip_rear_seamGeom, engravingMat);
  grip_rear_seam.position.z = 0.285;
  pen.add(grip_rear_seam);

  const nib_collarGeom = new THREE.CylinderGeometry(0.150, 0.150, 0.085, 48);
  const nib_collar = new THREE.Mesh(nib_collarGeom, darkMat);
  nib_collar.rotation.x = Math.PI / 2;
  nib_collar.position.z = 1.535;
  pen.add(nib_collar);

  const nib_collar_rimGeom = new THREE.TorusGeometry(0.145, 0.008, 8, 48);
  const nib_collar_rim = new THREE.Mesh(nib_collar_rimGeom, silverMat);
  nib_collar_rim.position.z = 1.574;
  pen.add(nib_collar_rim);

  const nib_feedGeom = new THREE.ConeGeometry(0.082, 0.48, 20);
  const nib_feed = new THREE.Mesh(nib_feedGeom, darkMat);
  nib_feed.rotation.x = Math.PI / 2;
  nib_feed.scale.set(1, 1, 0.38);
  nib_feed.position.set(0, -0.018, 1.79);
  pen.add(nib_feed);

  const nibShape = new THREE.Shape();
  nibShape.moveTo(-0.105, 0.000);
  nibShape.lineTo(-0.155, 0.155);
  nibShape.lineTo(-0.125, 0.310);
  nibShape.lineTo(0.000, 0.565);
  nibShape.lineTo(0.125, 0.310);
  nibShape.lineTo(0.155, 0.155);
  nibShape.lineTo(0.105, 0.000);
  nibShape.closePath();

  const nibGeom = new THREE.ExtrudeGeometry(nibShape, {
    depth: 0.028,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const nib = new THREE.Mesh(nibGeom, silverMat);
  nib.rotation.x = Math.PI / 2;
  nib.position.set(0, 0.014, 1.540);
  pen.add(nib);

  const breather_holeGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.006, 20);
  const breather_hole = new THREE.Mesh(breather_holeGeom, darkMat);
  breather_hole.position.set(0, 0.021, 1.825);
  pen.add(breather_hole);

  const nib_slitGeom = new THREE.BoxGeometry(0.006, 0.005, 0.255);
  const nib_slit = new THREE.Mesh(nib_slitGeom, darkMat);
  nib_slit.position.set(0, 0.022, 2.005);
  pen.add(nib_slit);

  const left_engravingPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.082, 0.021, 1.625),
    new THREE.Vector3(-0.092, 0.021, 1.715),
    new THREE.Vector3(-0.062, 0.021, 1.805),
    new THREE.Vector3(-0.035, 0.021, 1.875),
  ]);
  const left_engravingGeom = new THREE.TubeGeometry(
    left_engravingPath,
    16,
    0.003,
    5,
    false
  );
  const left_engraving = new THREE.Mesh(left_engravingGeom, engravingMat);
  pen.add(left_engraving);

  const right_engravingPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.082, 0.021, 1.625),
    new THREE.Vector3(0.092, 0.021, 1.715),
    new THREE.Vector3(0.062, 0.021, 1.805),
    new THREE.Vector3(0.035, 0.021, 1.875),
  ]);
  const right_engravingGeom = new THREE.TubeGeometry(
    right_engravingPath,
    16,
    0.003,
    5,
    false
  );
  const right_engraving = new THREE.Mesh(right_engravingGeom, engravingMat);
  pen.add(right_engraving);

  const clip_mountGeom = new THREE.SphereGeometry(0.070, 20, 12);
  const clip_mount = new THREE.Mesh(clip_mountGeom, barrelMat);
  clip_mount.scale.set(0.78, 0.42, 1.15);
  clip_mount.position.set(0, 0.245, -1.435);
  pen.add(clip_mount);

  const clipShape = new THREE.Shape();
  clipShape.moveTo(-0.055, -0.820);
  clipShape.bezierCurveTo(-0.088, -0.730, -0.080, -0.560, -0.060, -0.390);
  clipShape.lineTo(-0.034, 0.650);
  clipShape.bezierCurveTo(-0.031, 0.785, -0.018, 0.850, 0.000, 0.875);
  clipShape.bezierCurveTo(0.018, 0.850, 0.031, 0.785, 0.034, 0.650);
  clipShape.lineTo(0.060, -0.390);
  clipShape.bezierCurveTo(0.080, -0.560, 0.088, -0.730, 0.055, -0.820);
  clipShape.bezierCurveTo(0.035, -0.855, -0.035, -0.855, -0.055, -0.820);
  clipShape.closePath();

  const clipGeom = new THREE.ExtrudeGeometry(clipShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  const clip = new THREE.Mesh(clipGeom, barrelMat);
  clip.rotation.x = Math.PI / 2 + 0.035;
  clip.position.set(0, 0.305, -0.730);
  pen.add(clip);

  const clip_tip_padGeom = new THREE.SphereGeometry(0.060, 20, 12);
  const clip_tip_pad = new THREE.Mesh(clip_tip_padGeom, barrelMat);
  clip_tip_pad.scale.set(0.72, 0.25, 1.18);
  clip_tip_pad.position.set(0, 0.257, 0.125);
  pen.add(clip_tip_pad);

  pen.rotation.y = -Math.PI / 4;

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