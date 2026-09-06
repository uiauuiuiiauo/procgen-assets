export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "marker";

  const marker_assembly = new THREE.Group();
  marker_assembly.name = "marker_assembly";
  marker_assembly.rotation.z = -0.70;
  root.add(marker_assembly);

  const yellow_barrelMat = new THREE.MeshStandardMaterial({
    color: 0xffee00,
    metalness: 0.0,
    roughness: 0.3,
  });

  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x17191d,
    metalness: 0.0,
    roughness: 0.3,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x090a0c,
    metalness: 0.0,
    roughness: 0.8,
  });

  const yellow_barrelProfile = [
    new THREE.Vector2(0.00, -1.47),
    new THREE.Vector2(0.20, -1.47),
    new THREE.Vector2(0.245, -1.42),
    new THREE.Vector2(0.270, -1.31),
    new THREE.Vector2(0.270, 1.31),
    new THREE.Vector2(0.255, 1.41),
    new THREE.Vector2(0.215, 1.49),
    new THREE.Vector2(0.00, 1.49),
  ];
  const yellow_barrelGeom = new THREE.LatheGeometry(yellow_barrelProfile, 48);
  const yellow_barrel = new THREE.Mesh(yellow_barrelGeom, yellow_barrelMat);
  yellow_barrel.name = "yellow_barrel";
  marker_assembly.add(yellow_barrel);

  const front_noseMat = black_plasticMat;
  const front_noseProfile = [
    new THREE.Vector2(0.00, -2.02),
    new THREE.Vector2(0.055, -2.01),
    new THREE.Vector2(0.105, -1.96),
    new THREE.Vector2(0.165, -1.84),
    new THREE.Vector2(0.220, -1.66),
    new THREE.Vector2(0.250, -1.53),
    new THREE.Vector2(0.245, -1.40),
    new THREE.Vector2(0.00, -1.40),
  ];
  const front_noseGeom = new THREE.LatheGeometry(front_noseProfile, 48);
  const front_nose = new THREE.Mesh(front_noseGeom, front_noseMat);
  front_nose.name = "front_nose";
  marker_assembly.add(front_nose);

  const front_collarMat = black_plasticMat;
  const front_collarGeom = new THREE.CylinderGeometry(0.252, 0.252, 0.105, 48);
  const front_collar = new THREE.Mesh(front_collarGeom, front_collarMat);
  front_collar.name = "front_collar";
  front_collar.position.y = -1.445;
  marker_assembly.add(front_collar);

  const front_seam_ringMat = seamMat;
  const front_seam_ringGeom = new THREE.TorusGeometry(0.244, 0.009, 8, 48);
  const front_seam_ring = new THREE.Mesh(front_seam_ringGeom, front_seam_ringMat);
  front_seam_ring.name = "front_seam_ring";
  front_seam_ring.rotation.x = Math.PI / 2;
  front_seam_ring.position.y = -1.605;
  marker_assembly.add(front_seam_ring);

  const rear_capMat = black_plasticMat;
  const rear_capProfile = [
    new THREE.Vector2(0.00, 1.42),
    new THREE.Vector2(0.240, 1.42),
    new THREE.Vector2(0.282, 1.47),
    new THREE.Vector2(0.294, 1.57),
    new THREE.Vector2(0.294, 1.96),
    new THREE.Vector2(0.280, 2.04),
    new THREE.Vector2(0.245, 2.10),
    new THREE.Vector2(0.00, 2.10),
  ];
  const rear_capGeom = new THREE.LatheGeometry(rear_capProfile, 48);
  const rear_cap = new THREE.Mesh(rear_capGeom, rear_capMat);
  rear_cap.name = "rear_cap";
  marker_assembly.add(rear_cap);

  const rear_cap_seamMat = seamMat;
  const rear_cap_seamGeom = new THREE.TorusGeometry(0.284, 0.010, 8, 48);
  const rear_cap_seam = new THREE.Mesh(rear_cap_seamGeom, rear_cap_seamMat);
  rear_cap_seam.name = "rear_cap_seam";
  rear_cap_seam.rotation.x = Math.PI / 2;
  rear_cap_seam.position.y = 1.885;
  marker_assembly.add(rear_cap_seam);

  const rear_end_faceMat = black_plasticMat;
  const rear_end_faceGeom = new THREE.CylinderGeometry(0.224, 0.224, 0.012, 48);
  const rear_end_face = new THREE.Mesh(rear_end_faceGeom, rear_end_faceMat);
  rear_end_face.name = "rear_end_face";
  rear_end_face.position.y = 2.105;
  marker_assembly.add(rear_end_face);

  const clipMat = black_plasticMat;
  const clipShape = new THREE.Shape();
  clipShape.moveTo(0.255, 1.94);
  clipShape.lineTo(0.350, 1.94);
  clipShape.bezierCurveTo(0.435, 1.94, 0.480, 1.875, 0.480, 1.79);
  clipShape.lineTo(0.480, 1.50);
  clipShape.bezierCurveTo(0.480, 1.385, 0.430, 1.305, 0.350, 1.29);
  clipShape.lineTo(0.265, 1.29);
  clipShape.lineTo(0.265, 1.415);
  clipShape.lineTo(0.345, 1.415);
  clipShape.bezierCurveTo(0.375, 1.420, 0.390, 1.455, 0.390, 1.505);
  clipShape.lineTo(0.390, 1.775);
  clipShape.bezierCurveTo(0.390, 1.820, 0.365, 1.850, 0.330, 1.850);
  clipShape.lineTo(0.255, 1.850);
  clipShape.closePath();

  const clipGeom = new THREE.ExtrudeGeometry(clipShape, {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.010,
    bevelSize: 0.008,
    bevelSegments: 3,
    curveSegments: 12,
  });
  const clip = new THREE.Mesh(clipGeom, clipMat);
  clip.name = "clip";
  clip.position.z = -0.0375;
  marker_assembly.add(clip);

  const clip_anchorMat = black_plasticMat;
  const clip_anchorGeom = new THREE.BoxGeometry(0.105, 0.155, 0.115);
  const clip_anchor = new THREE.Mesh(clip_anchorGeom, clip_anchorMat);
  clip_anchor.name = "clip_anchor";
  clip_anchor.position.set(0.292, 1.875, 0);
  marker_assembly.add(clip_anchor);

  const clip_tipMat = black_plasticMat;
  const clip_tipGeom = new THREE.SphereGeometry(0.060, 20, 12);
  const clip_tip = new THREE.Mesh(clip_tipGeom, clip_tipMat);
  clip_tip.name = "clip_tip";
  clip_tip.scale.set(0.72, 1.18, 0.70);
  clip_tip.position.set(0.305, 1.315, 0);
  marker_assembly.add(clip_tip);

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