export default function generate(THREE) {
  const root = new THREE.Group();

  const lower_pedestalMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.2,
    flatShading: true,
  });
  const upper_spireMat = lower_pedestalMat;

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x5a2d1c,
    metalness: 0.6,
    roughness: 0.2,
  });

  const side_angle = Math.PI / 6;
  const front_z = Math.cos(side_angle);

  const lower_pedestalGeom = new THREE.CylinderGeometry(
    0.19,
    0.34,
    1.0,
    6,
    1,
    false
  );
  const lower_pedestal = new THREE.Mesh(
    lower_pedestalGeom,
    lower_pedestalMat
  );
  lower_pedestal.rotation.y = Math.PI / 6;
  lower_pedestal.position.y = 0.5;
  root.add(lower_pedestal);

  const upper_spireGeom = new THREE.CylinderGeometry(
    0.018,
    0.19,
    3.0,
    6,
    1,
    false
  );
  const upper_spire = new THREE.Mesh(upper_spireGeom, upper_spireMat);
  upper_spire.rotation.y = Math.PI / 6;
  upper_spire.position.y = 2.5;
  root.add(upper_spire);

  const pedestal_seamGeom = new THREE.CylinderGeometry(
    0.193,
    0.193,
    0.009,
    6,
    1,
    false
  );
  const pedestal_seam = new THREE.Mesh(pedestal_seamGeom, seamMat);
  pedestal_seam.rotation.y = Math.PI / 6;
  pedestal_seam.position.y = 1.002;
  root.add(pedestal_seam);

  const base_rimGeom = new THREE.CylinderGeometry(
    0.342,
    0.342,
    0.018,
    6,
    1,
    false
  );
  const base_rim = new THREE.Mesh(base_rimGeom, seamMat);
  base_rim.rotation.y = Math.PI / 6;
  base_rim.position.y = 0.009;
  root.add(base_rim);

  const base_plateGeom = new THREE.CylinderGeometry(
    0.326,
    0.326,
    0.012,
    6,
    1,
    false
  );
  const base_plate = new THREE.Mesh(base_plateGeom, lower_pedestalMat);
  base_plate.rotation.y = Math.PI / 6;
  base_plate.position.y = 0.017;
  root.add(base_plate);

  const tip_capGeom = new THREE.CylinderGeometry(
    0.0185,
    0.0185,
    0.014,
    6,
    1,
    false
  );
  const tip_cap = new THREE.Mesh(tip_capGeom, lower_pedestalMat);
  tip_cap.rotation.y = Math.PI / 6;
  tip_cap.position.y = 4.004;
  root.add(tip_cap);

  function lowerRadiusAt(y) {
    return 0.34 + (0.19 - 0.34) * (y / 1.0);
  }

  const engraving_strokes = [
    [-0.050, 0.145, 0.004, 0.030],
    [-0.043, 0.158, 0.014, 0.004],
    [-0.043, 0.132, 0.014, 0.004],
    [-0.024, 0.145, 0.004, 0.030],
    [-0.017, 0.132, 0.014, 0.004],
    [-0.008, 0.145, 0.004, 0.030],
    [-0.001, 0.158, 0.014, 0.004],
    [-0.001, 0.145, 0.012, 0.004],
    [0.018, 0.145, 0.004, 0.030],
    [0.025, 0.158, 0.014, 0.004],
    [0.025, 0.145, 0.012, 0.004],
    [0.043, 0.145, 0.004, 0.030],
    [0.050, 0.158, 0.014, 0.004],
    [0.050, 0.132, 0.014, 0.004],
  ];

  const brand_engravingGeom = new THREE.BoxGeometry(1, 1, 1);
  const brand_engravingMat = seamMat;
  const brand_engraving = new THREE.InstancedMesh(
    brand_engravingGeom,
    brand_engravingMat,
    engraving_strokes.length
  );

  const engraving_matrix = new THREE.Matrix4();
  const engraving_position = new THREE.Vector3();
  const engraving_quaternion = new THREE.Quaternion();
  const engraving_scale = new THREE.Vector3();
  const engraving_axis = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < engraving_strokes.length; i++) {
    const stroke = engraving_strokes[i];
    const x = stroke[0];
    const y = stroke[1];
    const width = stroke[2];
    const height = stroke[3];
    const radius = lowerRadiusAt(y);
    const face_z = Math.sqrt(
      Math.max(0, radius * radius - x * x)
    ) * front_z;

    engraving_position.set(x, y, face_z + 0.0025);
    engraving_quaternion.setFromAxisAngle(
      engraving_axis,
      -Math.atan2(x, face_z)
    );
    engraving_scale.set(width, height, 0.0025);
    engraving_matrix.compose(
      engraving_position,
      engraving_quaternion,
      engraving_scale
    );
    brand_engraving.setMatrixAt(i, engraving_matrix);
  }

  brand_engraving.instanceMatrix.needsUpdate = true;
  root.add(brand_engraving);

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