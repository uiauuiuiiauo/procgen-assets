export default function generate(THREE) {
  const root = new THREE.Group();
  const rainbow_barrel = new THREE.Group();
  const rear_assembly = new THREE.Group();
  const front_assembly = new THREE.Group();
  root.add(rainbow_barrel, rear_assembly, front_assembly);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_goldMat = new THREE.MeshStandardMaterial({
    color: 0x8f6518,
    metalness: 0.5,
    roughness: 0.25,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const boreMat = new THREE.MeshStandardMaterial({
    color: 0x160f05,
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

  function makeFacetMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.3,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
  }

  const red_glassMat = makeGlassMaterial(0xe51637);
  const blue_glassMat = makeGlassMaterial(0x006ee6);
  const green_glassMat = makeGlassMaterial(0x20bd19);
  const magenta_glassMat = makeGlassMaterial(0xd20a6d);

  const red_coreMat = makeFacetMaterial(0xb50925);
  const blue_coreMat = makeFacetMaterial(0x0046a8);
  const green_coreMat = makeFacetMaterial(0x087d0c);
  const magenta_coreMat = makeFacetMaterial(0x8e0647);

  const red_highlightMat = makeFacetMaterial(0xff668a);
  const blue_highlightMat = makeFacetMaterial(0x20baff);
  const green_highlightMat = makeFacetMaterial(0x76ff45);
  const magenta_highlightMat = makeFacetMaterial(0xff4aa9);

  const segmentLength = 0.88;
  const segmentCenters = [-1.18, -0.26, 0.66, 1.58];
  const transform = new THREE.Object3D();

  const glass_segmentGeom = new THREE.CylinderGeometry(
    0.42,
    0.42,
    segmentLength,
    10,
    1,
    false
  );

  const red_glass_segment = new THREE.Mesh(glass_segmentGeom, red_glassMat);
  red_glass_segment.rotation.z = -Math.PI / 2;
  red_glass_segment.position.x = segmentCenters[0];
  rainbow_barrel.add(red_glass_segment);

  const blue_glass_segment = new THREE.Mesh(glass_segmentGeom, blue_glassMat);
  blue_glass_segment.rotation.z = -Math.PI / 2;
  blue_glass_segment.position.x = segmentCenters[1];
  rainbow_barrel.add(blue_glass_segment);

  const green_glass_segment = new THREE.Mesh(glass_segmentGeom, green_glassMat);
  green_glass_segment.rotation.z = -Math.PI / 2;
  green_glass_segment.position.x = segmentCenters[2];
  rainbow_barrel.add(green_glass_segment);

  const magenta_glass_segment = new THREE.Mesh(glass_segmentGeom, magenta_glassMat);
  magenta_glass_segment.rotation.z = -Math.PI / 2;
  magenta_glass_segment.position.x = segmentCenters[3];
  rainbow_barrel.add(magenta_glass_segment);

  const inner_segmentGeom = new THREE.CylinderGeometry(
    0.18,
    0.18,
    segmentLength - 0.06,
    10
  );

  const red_inner_segment = new THREE.Mesh(inner_segmentGeom, red_coreMat);
  red_inner_segment.rotation.z = -Math.PI / 2;
  red_inner_segment.position.x = segmentCenters[0];
  rainbow_barrel.add(red_inner_segment);

  const blue_inner_segment = new THREE.Mesh(inner_segmentGeom, blue_coreMat);
  blue_inner_segment.rotation.z = -Math.PI / 2;
  blue_inner_segment.position.x = segmentCenters[1];
  rainbow_barrel.add(blue_inner_segment);

  const green_inner_segment = new THREE.Mesh(inner_segmentGeom, green_coreMat);
  green_inner_segment.rotation.z = -Math.PI / 2;
  green_inner_segment.position.x = segmentCenters[2];
  rainbow_barrel.add(green_inner_segment);

  const magenta_inner_segment = new THREE.Mesh(inner_segmentGeom, magenta_coreMat);
  magenta_inner_segment.rotation.z = -Math.PI / 2;
  magenta_inner_segment.position.x = segmentCenters[3];
  rainbow_barrel.add(magenta_inner_segment);

  const collarPositions = [-1.65, -0.72, 0.2, 1.12, 2.04];

  const collar_bodyGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.15, 32);
  const gold_collars = new THREE.InstancedMesh(
    collar_bodyGeom,
    goldMat,
    collarPositions.length
  );
  for (let i = 0; i < collarPositions.length; i++) {
    transform.position.set(collarPositions[i], 0, 0);
    transform.rotation.set(0, 0, -Math.PI / 2);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    gold_collars.setMatrixAt(i, transform.matrix);
  }
  gold_collars.instanceMatrix.needsUpdate = true;
  rainbow_barrel.add(gold_collars);

  const collar_rimGeom = new THREE.TorusGeometry(0.44, 0.055, 10, 32);
  const gold_collar_rims = new THREE.InstancedMesh(
    collar_rimGeom,
    goldMat,
    collarPositions.length * 2
  );
  let rimIndex = 0;
  for (let i = 0; i < collarPositions.length; i++) {
    for (const offset of [-0.082, 0.082]) {
      transform.position.set(collarPositions[i] + offset, 0, 0);
      transform.rotation.set(0, Math.PI / 2, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      gold_collar_rims.setMatrixAt(rimIndex++, transform.matrix);
    }
  }
  gold_collar_rims.instanceMatrix.needsUpdate = true;
  rainbow_barrel.add(gold_collar_rims);

  const highlightGeom = new THREE.BoxGeometry(segmentLength - 0.12, 0.026, 0.012);
  const facet_highlights = new THREE.InstancedMesh(highlightGeom, silverMat, 4);
  const highlightMaterials = [
    red_highlightMat,
    blue_highlightMat,
    green_highlightMat,
    magenta_highlightMat,
  ];
  for (let i = 0; i < segmentCenters.length; i++) {
    transform.position.set(segmentCenters[i], 0.17, 0.389);
    transform.rotation.set(0, 0, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    facet_highlights.setMatrixAt(i, transform.matrix);
    facet_highlights.setColorAt(i, new THREE.Color(highlightMaterials[i].color));
  }
  facet_highlights.instanceMatrix.needsUpdate = true;
  if (facet_highlights.instanceColor) {
    facet_highlights.instanceColor.needsUpdate = true;
  }
  rainbow_barrel.add(facet_highlights);

  const rear_housingGeom = new THREE.CylinderGeometry(
    0.5,
    0.48,
    1.08,
    32
  );
  const rear_housing = new THREE.Mesh(rear_housingGeom, goldMat);
  rear_housing.rotation.z = -Math.PI / 2;
  rear_housing.position.x = -2.22;
  rear_assembly.add(rear_housing);

  const rear_shoulderGeom = new THREE.CylinderGeometry(
    0.43,
    0.5,
    0.24,
    32
  );
  const rear_shoulder = new THREE.Mesh(rear_shoulderGeom, goldMat);
  rear_shoulder.rotation.z = -Math.PI / 2;
  rear_shoulder.position.x = -1.67;
  rear_assembly.add(rear_shoulder);

  const rear_bandGeom = new THREE.TorusGeometry(0.455, 0.035, 10, 32);
  const rear_bands = new THREE.InstancedMesh(rear_bandGeom, dark_goldMat, 3);
  const rearBandPositions = [-2.69, -2.55, -2.41];
  for (let i = 0; i < rearBandPositions.length; i++) {
    transform.position.set(rearBandPositions[i], 0, 0);
    transform.rotation.set(0, Math.PI / 2, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    rear_bands.setMatrixAt(i, transform.matrix);
  }
  rear_bands.instanceMatrix.needsUpdate = true;
  rear_assembly.add(rear_bands);

  const rear_end_rimGeom = new THREE.TorusGeometry(0.41, 0.04, 10, 32);
  const rear_end_rim = new THREE.Mesh(rear_end_rimGeom, goldMat);
  rear_end_rim.rotation.y = Math.PI / 2;
  rear_end_rim.position.x = -2.77;
  rear_assembly.add(rear_end_rim);

  const rear_neckGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.22, 24);
  const rear_neck = new THREE.Mesh(rear_neckGeom, silverMat);
  rear_neck.rotation.z = -Math.PI / 2;
  rear_neck.position.x = -2.87;
  rear_assembly.add(rear_neck);

  const rear_finialGeom = new THREE.SphereGeometry(0.29, 32, 16);
  const rear_finial = new THREE.Mesh(rear_finialGeom, silverMat);
  rear_finial.position.x = -3.13;
  rear_finial.scale.set(0.85, 1, 1);
  rear_assembly.add(rear_finial);

  const front_capProfile = [
    new THREE.Vector2(0.0, -0.34),
    new THREE.Vector2(0.43, -0.34),
    new THREE.Vector2(0.5, -0.28),
    new THREE.Vector2(0.53, -0.16),
    new THREE.Vector2(0.53, 0.17),
    new THREE.Vector2(0.49, 0.29),
    new THREE.Vector2(0.0, 0.34),
  ];
  const front_capGeom = new THREE.LatheGeometry(front_capProfile, 32);
  const front_cap = new THREE.Mesh(front_capGeom, goldMat);
  front_cap.rotation.z = -Math.PI / 2;
  front_cap.position.x = 2.41;
  front_assembly.add(front_cap);

  const front_cap_bandGeom = new THREE.TorusGeometry(0.47, 0.035, 10, 32);
  const front_cap_bands = new THREE.InstancedMesh(
    front_cap_bandGeom,
    dark_goldMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    transform.position.set(i === 0 ? 2.13 : 2.65, 0, 0);
    transform.rotation.set(0, Math.PI / 2, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    front_cap_bands.setMatrixAt(i, transform.matrix);
  }
  front_cap_bands.instanceMatrix.needsUpdate = true;
  front_assembly.add(front_cap_bands);

  const front_faceGeom = new THREE.CylinderGeometry(0.47, 0.47, 0.04, 32);
  const front_face = new THREE.Mesh(front_faceGeom, goldMat);
  front_face.rotation.z = -Math.PI / 2;
  front_face.position.x = 2.755;
  front_assembly.add(front_face);

  const front_bore_rimGeom = new THREE.TorusGeometry(0.11, 0.018, 10, 24);
  const front_bore_rim = new THREE.Mesh(front_bore_rimGeom, dark_goldMat);
  front_bore_rim.rotation.y = Math.PI / 2;
  front_bore_rim.position.x = 2.782;
  front_assembly.add(front_bore_rim);

  const front_boreGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.026, 24);
  const front_bore = new THREE.Mesh(front_boreGeom, boreMat);
  front_bore.rotation.z = -Math.PI / 2;
  front_bore.position.x = 2.791;
  front_assembly.add(front_bore);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}