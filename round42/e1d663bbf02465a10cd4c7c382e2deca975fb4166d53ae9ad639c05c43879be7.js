export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_glass_flute";

  const body_assembly = new THREE.Group();
  body_assembly.name = "body_assembly";
  root.add(body_assembly);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const dark_boreMat = new THREE.MeshStandardMaterial({
    color: 0x160e08,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeGlassMaterial(color) {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.95,
      ior: 1.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }

  const red_glassMat = makeGlassMaterial(0xe20b3f);
  const blue_glassMat = makeGlassMaterial(0x006ee6);
  const green_glassMat = makeGlassMaterial(0x20c817);
  const magenta_glassMat = makeGlassMaterial(0xd00078);

  const inner_coreGeom = new THREE.CylinderGeometry(0.105, 0.105, 2.24, 24);
  const inner_core = new THREE.Mesh(inner_coreGeom, dark_boreMat);
  inner_core.name = "inner_core";
  inner_core.rotation.z = -Math.PI / 2;
  inner_core.position.x = 0.25;
  body_assembly.add(inner_core);

  const segmentLength = 0.56;
  const segmentGeom = new THREE.CylinderGeometry(
    0.245,
    0.245,
    segmentLength,
    12,
    1,
    false
  );

  const red_glass_segment = new THREE.Mesh(segmentGeom, red_glassMat);
  red_glass_segment.name = "red_glass_segment";
  red_glass_segment.rotation.z = -Math.PI / 2;
  red_glass_segment.position.x = -0.83;
  body_assembly.add(red_glass_segment);

  const blue_glass_segment = new THREE.Mesh(segmentGeom, blue_glassMat);
  blue_glass_segment.name = "blue_glass_segment";
  blue_glass_segment.rotation.z = -Math.PI / 2;
  blue_glass_segment.position.x = -0.27;
  body_assembly.add(blue_glass_segment);

  const green_glass_segment = new THREE.Mesh(segmentGeom, green_glassMat);
  green_glass_segment.name = "green_glass_segment";
  green_glass_segment.rotation.z = -Math.PI / 2;
  green_glass_segment.position.x = 0.29;
  body_assembly.add(green_glass_segment);

  const magenta_glass_segment = new THREE.Mesh(segmentGeom, magenta_glassMat);
  magenta_glass_segment.name = "magenta_glass_segment";
  magenta_glass_segment.rotation.z = -Math.PI / 2;
  magenta_glass_segment.position.x = 0.85;
  body_assembly.add(magenta_glass_segment);

  const collar_positions = [-1.12, -0.55, 0.01, 0.57, 1.13];
  const collar_major_radius = 0.278;
  const collar_tube_radius = 0.052;
  const collarGeom = new THREE.TorusGeometry(
    collar_major_radius,
    collar_tube_radius,
    12,
    36
  );

  const collars = new THREE.InstancedMesh(
    collarGeom,
    goldMat,
    collar_positions.length
  );
  collars.name = "collars";

  const collar_rotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, Math.PI / 2, 0)
  );
  const unit_scale = new THREE.Vector3(1, 1, 1);
  const instance_matrix = new THREE.Matrix4();

  for (let i = 0; i < collar_positions.length; i++) {
    instance_matrix.compose(
      new THREE.Vector3(collar_positions[i], 0, 0),
      collar_rotation,
      unit_scale
    );
    collars.setMatrixAt(i, instance_matrix);
  }
  collars.instanceMatrix.needsUpdate = true;
  body_assembly.add(collars);

  const collar_faceGeom = new THREE.RingGeometry(0.225, 0.325, 36);
  const collar_faces = new THREE.InstancedMesh(
    collar_faceGeom,
    goldMat,
    collar_positions.length * 2
  );
  collar_faces.name = "collar_faces";

  let collar_face_index = 0;
  for (let i = 0; i < collar_positions.length; i++) {
    for (const side of [-1, 1]) {
      const x = collar_positions[i] + side * collar_tube_radius;
      const rotation = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, side * Math.PI / 2, 0)
      );
      instance_matrix.compose(
        new THREE.Vector3(x, 0, 0),
        rotation,
        unit_scale
      );
      collar_faces.setMatrixAt(collar_face_index++, instance_matrix);
    }
  }
  collar_faces.instanceMatrix.needsUpdate = true;
  body_assembly.add(collar_faces);

  const rear_housing_profile = [
    new THREE.Vector2(0.000, -0.400),
    new THREE.Vector2(0.170, -0.400),
    new THREE.Vector2(0.225, -0.375),
    new THREE.Vector2(0.275, -0.325),
    new THREE.Vector2(0.300, -0.245),
    new THREE.Vector2(0.305, 0.205),
    new THREE.Vector2(0.292, 0.275),
    new THREE.Vector2(0.260, 0.335),
    new THREE.Vector2(0.220, 0.375),
    new THREE.Vector2(0.000, 0.375),
  ];
  const rear_housingGeom = new THREE.LatheGeometry(rear_housing_profile, 40);
  const rear_housing = new THREE.Mesh(rear_housingGeom, goldMat);
  rear_housing.name = "rear_housing";
  rear_housing.rotation.z = -Math.PI / 2;
  rear_housing.position.x = -1.55;
  body_assembly.add(rear_housing);

  const rear_trim_ringGeom = new THREE.TorusGeometry(0.294, 0.014, 10, 36);
  const rear_trim_positions = [-1.80, -1.73, -1.24];
  const rear_trim_rings = new THREE.InstancedMesh(
    rear_trim_ringGeom,
    goldMat,
    rear_trim_positions.length
  );
  rear_trim_rings.name = "rear_trim_rings";

  for (let i = 0; i < rear_trim_positions.length; i++) {
    instance_matrix.compose(
      new THREE.Vector3(rear_trim_positions[i], 0, 0),
      collar_rotation,
      unit_scale
    );
    rear_trim_rings.setMatrixAt(i, instance_matrix);
  }
  rear_trim_rings.instanceMatrix.needsUpdate = true;
  body_assembly.add(rear_trim_rings);

  const rear_groove_ringGeom = new THREE.TorusGeometry(0.299, 0.006, 8, 36);
  const rear_groove_positions = [-1.765, -1.275];
  const rear_groove_rings = new THREE.InstancedMesh(
    rear_groove_ringGeom,
    dark_boreMat,
    rear_groove_positions.length
  );
  rear_groove_rings.name = "rear_groove_rings";

  for (let i = 0; i < rear_groove_positions.length; i++) {
    instance_matrix.compose(
      new THREE.Vector3(rear_groove_positions[i], 0, 0),
      collar_rotation,
      unit_scale
    );
    rear_groove_rings.setMatrixAt(i, instance_matrix);
  }
  rear_groove_rings.instanceMatrix.needsUpdate = true;
  body_assembly.add(rear_groove_rings);

  const silver_connector_profile = [
    new THREE.Vector2(0.000, -0.205),
    new THREE.Vector2(0.105, -0.205),
    new THREE.Vector2(0.112, -0.160),
    new THREE.Vector2(0.100, -0.105),
    new THREE.Vector2(0.073, -0.045),
    new THREE.Vector2(0.060, 0.105),
    new THREE.Vector2(0.082, 0.155),
    new THREE.Vector2(0.000, 0.175),
  ];
  const silver_connectorGeom = new THREE.LatheGeometry(
    silver_connector_profile,
    32
  );
  const silver_connector = new THREE.Mesh(silver_connectorGeom, silverMat);
  silver_connector.name = "silver_connector";
  silver_connector.rotation.z = -Math.PI / 2;
  silver_connector.position.x = -2.045;
  body_assembly.add(silver_connector);

  const silver_end_capGeom = new THREE.SphereGeometry(0.175, 32, 18);
  const silver_end_cap = new THREE.Mesh(silver_end_capGeom, silverMat);
  silver_end_cap.name = "silver_end_cap";
  silver_end_cap.scale.set(0.82, 1, 1);
  silver_end_cap.position.x = -2.295;
  body_assembly.add(silver_end_cap);

  const front_cap_profile = [
    new THREE.Vector2(0.000, -0.250),
    new THREE.Vector2(0.215, -0.250),
    new THREE.Vector2(0.270, -0.225),
    new THREE.Vector2(0.300, -0.170),
    new THREE.Vector2(0.305, -0.090),
    new THREE.Vector2(0.292, 0.075),
    new THREE.Vector2(0.270, 0.165),
    new THREE.Vector2(0.240, 0.220),
    new THREE.Vector2(0.000, 0.220),
  ];
  const front_capGeom = new THREE.LatheGeometry(front_cap_profile, 40);
  const front_cap = new THREE.Mesh(front_capGeom, goldMat);
  front_cap.name = "front_cap";
  front_cap.rotation.z = -Math.PI / 2;
  front_cap.position.x = 1.38;
  body_assembly.add(front_cap);

  const front_cap_trimGeom = new THREE.TorusGeometry(0.292, 0.014, 10, 36);
  const front_cap_trim = new THREE.InstancedMesh(
    front_cap_trimGeom,
    goldMat,
    2
  );
  front_cap_trim.name = "front_cap_trim";

  const front_trim_positions = [1.17, 1.525];
  for (let i = 0; i < front_trim_positions.length; i++) {
    instance_matrix.compose(
      new THREE.Vector3(front_trim_positions[i], 0, 0),
      collar_rotation,
      unit_scale
    );
    front_cap_trim.setMatrixAt(i, instance_matrix);
  }
  front_cap_trim.instanceMatrix.needsUpdate = true;
  body_assembly.add(front_cap_trim);

  const front_end_faceGeom = new THREE.CircleGeometry(0.238, 40);
  const front_end_face = new THREE.Mesh(front_end_faceGeom, goldMat);
  front_end_face.name = "front_end_face";
  front_end_face.rotation.y = Math.PI / 2;
  front_end_face.position.x = 1.603;
  body_assembly.add(front_end_face);

  const front_boreGeom = new THREE.CircleGeometry(0.073, 28);
  const front_bore = new THREE.Mesh(front_boreGeom, dark_boreMat);
  front_bore.name = "front_bore";
  front_bore.rotation.y = Math.PI / 2;
  front_bore.position.x = 1.608;
  body_assembly.add(front_bore);

  const front_bore_rimGeom = new THREE.TorusGeometry(0.078, 0.009, 8, 28);
  const front_bore_rim = new THREE.Mesh(front_bore_rimGeom, goldMat);
  front_bore_rim.name = "front_bore_rim";
  front_bore_rim.rotation.y = Math.PI / 2;
  front_bore_rim.position.x = 1.611;
  body_assembly.add(front_bore_rim);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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