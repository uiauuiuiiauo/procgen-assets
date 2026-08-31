export default function generate(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x7a3f22,
    metalness: 0.0,
    roughness: 0.6,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9b5b32,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3f2117,
    metalness: 0.0,
    roughness: 0.6,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a3c,
    metalness: 0.6,
    roughness: 0.2,
  });
  const agedBrassMat = new THREE.MeshStandardMaterial({
    color: 0x806426,
    metalness: 0.5,
    roughness: 0.35,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8dc,
    metalness: 0.0,
    roughness: 0.7,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x273039,
    metalness: 0.0,
    roughness: 0.8,
  });
  const fadedInkMat = new THREE.MeshStandardMaterial({
    color: 0x596168,
    metalness: 0.0,
    roughness: 0.8,
  });
  const needleMat = new THREE.MeshStandardMaterial({
    color: 0x8f3028,
    metalness: 0.0,
    roughness: 0.3,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });

  const outer_caseGeom = new THREE.CylinderGeometry(1.62, 1.62, 0.36, 64);
  const outer_case = new THREE.Mesh(outer_caseGeom, woodMat);
  outer_case.rotation.x = Math.PI / 2;
  root.add(outer_case);

  const case_front_plateGeom = new THREE.CylinderGeometry(1.55, 1.55, 0.09, 64);
  const case_front_plate = new THREE.Mesh(case_front_plateGeom, lightWoodMat);
  case_front_plate.rotation.x = Math.PI / 2;
  case_front_plate.position.z = 0.19;
  root.add(case_front_plate);

  const outer_wood_moldingGeom = new THREE.TorusGeometry(1.49, 0.105, 12, 64);
  const outer_wood_molding = new THREE.Mesh(outer_wood_moldingGeom, woodMat);
  outer_wood_molding.position.z = 0.27;
  root.add(outer_wood_molding);

  const carved_wood_bandGeom = new THREE.TorusGeometry(1.34, 0.155, 16, 64);
  const carved_wood_band = new THREE.Mesh(carved_wood_bandGeom, lightWoodMat);
  carved_wood_band.position.z = 0.29;
  root.add(carved_wood_band);

  const inner_wood_moldingGeom = new THREE.TorusGeometry(1.205, 0.075, 12, 64);
  const inner_wood_molding = new THREE.Mesh(inner_wood_moldingGeom, darkWoodMat);
  inner_wood_molding.position.z = 0.35;
  root.add(inner_wood_molding);

  const wood_grain_rings = new THREE.Group();
  const grainRadii = [1.245, 1.335, 1.425];
  for (let i = 0; i < grainRadii.length; i++) {
    const grainRingGeom = new THREE.TorusGeometry(grainRadii[i], 0.012, 6, 64);
    const grainRing = new THREE.Mesh(
      grainRingGeom,
      i === 1 ? lightWoodMat : darkWoodMat
    );
    grainRing.position.z = 0.424 - i * 0.004;
    wood_grain_rings.add(grainRing);
  }
  root.add(wood_grain_rings);

  const woodGrainGeom = new THREE.BoxGeometry(0.014, 0.105, 0.009);
  const wood_grain_marks = new THREE.InstancedMesh(
    woodGrainGeom,
    darkWoodMat,
    28
  );
  const grainMatrix = new THREE.Matrix4();
  const grainPosition = new THREE.Vector3();
  const grainQuaternion = new THREE.Quaternion();
  const grainScale = new THREE.Vector3();
  const grainEuler = new THREE.Euler();
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2;
    const radius = 1.335 + ((i % 3) - 1) * 0.025;
    grainPosition.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.448
    );
    grainEuler.set(0, 0, -angle + ((i % 4) - 1.5) * 0.035);
    grainQuaternion.setFromEuler(grainEuler);
    grainScale.set(1, 0.62 + (i % 5) * 0.08, 1);
    grainMatrix.compose(grainPosition, grainQuaternion, grainScale);
    wood_grain_marks.setMatrixAt(i, grainMatrix);
  }
  wood_grain_marks.instanceMatrix.needsUpdate = true;
  root.add(wood_grain_marks);

  const bezel_backplateGeom = new THREE.CylinderGeometry(1.17, 1.17, 0.11, 64);
  const bezel_backplate = new THREE.Mesh(bezel_backplateGeom, agedBrassMat);
  bezel_backplate.rotation.x = Math.PI / 2;
  bezel_backplate.position.z = 0.35;
  root.add(bezel_backplate);

  const brass_bezelGeom = new THREE.TorusGeometry(1.09, 0.075, 16, 64);
  const brass_bezel = new THREE.Mesh(brass_bezelGeom, brassMat);
  brass_bezel.position.z = 0.425;
  root.add(brass_bezel);

  const bezel_inner_lipGeom = new THREE.TorusGeometry(1.015, 0.025, 10, 64);
  const bezel_inner_lip = new THREE.Mesh(bezel_inner_lipGeom, brassMat);
  bezel_inner_lip.position.z = 0.465;
  root.add(bezel_inner_lip);

  const dial_faceGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.025, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.414;
  root.add(dial_face);

  const dialScaleGeom = new THREE.BoxGeometry(0.011, 1, 0.008);
  const dial_scale_marks = new THREE.InstancedMesh(
    dialScaleGeom,
    fadedInkMat,
    60
  );
  const scaleMatrix = new THREE.Matrix4();
  const scalePosition = new THREE.Vector3();
  const scaleQuaternion = new THREE.Quaternion();
  const scaleSize = new THREE.Vector3();
  const scaleEuler = new THREE.Euler();
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2;
    const major = i % 5 === 0;
    const medium = !major && i % 2 === 0;
    const length = major ? 0.17 : medium ? 0.115 : 0.078;
    const radius = 0.94 - length / 2;
    scalePosition.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.437
    );
    scaleEuler.set(0, 0, -angle);
    scaleQuaternion.setFromEuler(scaleEuler);
    scaleSize.set(major ? 1.35 : medium ? 1.05 : 0.72, length, 1);
    scaleMatrix.compose(scalePosition, scaleQuaternion, scaleSize);
    dial_scale_marks.setMatrixAt(i, scaleMatrix);
  }
  dial_scale_marks.instanceMatrix.needsUpdate = true;
  root.add(dial_scale_marks);

  const dial_inner_circleGeom = new THREE.TorusGeometry(0.73, 0.006, 6, 64);
  const dial_inner_circle = new THREE.Mesh(dial_inner_circleGeom, fadedInkMat);
  dial_inner_circle.position.z = 0.442;
  root.add(dial_inner_circle);

  const compass_rose = new THREE.Group();
  compass_rose.position.z = 0.448;

  const rayShape = new THREE.Shape();
  rayShape.moveTo(-0.5, 0);
  rayShape.lineTo(0.5, 0);
  rayShape.lineTo(0, 1);
  rayShape.closePath();

  const compass_rayGeom = new THREE.ShapeGeometry(rayShape);
  const compass_rose_rays_dark = new THREE.InstancedMesh(
    compass_rayGeom,
    inkMat,
    8
  );
  const compass_rose_rays_light = new THREE.InstancedMesh(
    compass_rayGeom,
    fadedInkMat,
    8
  );
  const rayMatrix = new THREE.Matrix4();
  const rayPosition = new THREE.Vector3(0, 0, 0);
  const rayQuaternion = new THREE.Quaternion();
  const rayScale = new THREE.Vector3();
  const rayEuler = new THREE.Euler();

  for (let i = 0; i < 8; i++) {
    const darkAngle = (i * 2 / 16) * Math.PI * 2;
    const darkLength = i % 2 === 0 ? 0.69 : 0.52;
    const darkWidth = i % 2 === 0 ? 0.19 : 0.145;
    rayEuler.set(0, 0, -darkAngle);
    rayQuaternion.setFromEuler(rayEuler);
    rayScale.set(darkWidth, darkLength, 1);
    rayMatrix.compose(rayPosition, rayQuaternion, rayScale);
    compass_rose_rays_dark.setMatrixAt(i, rayMatrix);

    const lightAngle = ((i * 2 + 1) / 16) * Math.PI * 2;
    const lightLength = i % 2 === 0 ? 0.43 : 0.48;
    rayEuler.set(0, 0, -lightAngle);
    rayQuaternion.setFromEuler(rayEuler);
    rayScale.set(0.115, lightLength, 1);
    rayMatrix.compose(rayPosition, rayQuaternion, rayScale);
    compass_rose_rays_light.setMatrixAt(i, rayMatrix);
  }
  compass_rose_rays_dark.instanceMatrix.needsUpdate = true;
  compass_rose_rays_light.instanceMatrix.needsUpdate = true;
  compass_rose.add(compass_rose_rays_dark);
  compass_rose.add(compass_rose_rays_light);

  const compass_accent_rays = new THREE.InstancedMesh(
    compass_rayGeom,
    needleMat,
    4
  );
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    rayEuler.set(0, 0, -angle);
    rayQuaternion.setFromEuler(rayEuler);
    rayScale.set(0.045, 0.57, 1);
    rayMatrix.compose(rayPosition, rayQuaternion, rayScale);
    compass_accent_rays.setMatrixAt(i, rayMatrix);
  }
  compass_accent_rays.instanceMatrix.needsUpdate = true;
  compass_rose.add(compass_accent_rays);
  root.add(compass_rose);

  const cardinalLabels = [
    ["N", 0],
    ["E", Math.PI / 2],
    ["S", Math.PI],
    ["W", Math.PI * 1.5],
  ];
  const cardinalSegments = [];
  const letterHalfHeight = 0.085;
  const letterHalfWidth = 0.055;

  function addCardinalStroke(angle, x1, y1, x2, y2) {
    const localX = (x1 + x2) / 2;
    const localY = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const phi = -angle;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const radius = 0.75;
    cardinalSegments.push({
      x: Math.sin(angle) * radius + cosPhi * localX - sinPhi * localY,
      y: Math.cos(angle) * radius + sinPhi * localX + cosPhi * localY,
      length: length,
      rotation: phi + Math.atan2(dy, dx) - Math.PI / 2,
    });
  }

  for (let i = 0; i < cardinalLabels.length; i++) {
    const letter = cardinalLabels[i][0];
    const angle = cardinalLabels[i][1];

    if (letter === "N") {
      addCardinalStroke(angle, -letterHalfWidth, -letterHalfHeight, -letterHalfWidth, letterHalfHeight);
      addCardinalStroke(angle, letterHalfWidth, -letterHalfHeight, letterHalfWidth, letterHalfHeight);
      addCardinalStroke(angle, -letterHalfWidth, letterHalfHeight, letterHalfWidth, -letterHalfHeight);
    } else if (letter === "E") {
      addCardinalStroke(angle, -letterHalfWidth, -letterHalfHeight, -letterHalfWidth, letterHalfHeight);
      addCardinalStroke(angle, -letterHalfWidth, letterHalfHeight, letterHalfWidth, letterHalfHeight);
      addCardinalStroke(angle, -letterHalfWidth, 0, letterHalfWidth * 0.7, 0);
      addCardinalStroke(angle, -letterHalfWidth, -letterHalfHeight, letterHalfWidth, -letterHalfHeight);
    } else if (letter === "S") {
      addCardinalStroke(angle, -letterHalfWidth, letterHalfHeight, letterHalfWidth, letterHalfHeight);
      addCardinalStroke(angle, -letterHalfWidth, letterHalfHeight, -letterHalfWidth, 0);
      addCardinalStroke(angle, -letterHalfWidth, 0, letterHalfWidth, 0);
      addCardinalStroke(angle, letterHalfWidth, 0, letterHalfWidth, -letterHalfHeight);
      addCardinalStroke(angle, -letterHalfWidth, -letterHalfHeight, letterHalfWidth, -letterHalfHeight);
    } else {
      addCardinalStroke(angle, -letterHalfWidth, letterHalfHeight, -letterHalfWidth * 0.5, -letterHalfHeight);
      addCardinalStroke(angle, -letterHalfWidth * 0.5, -letterHalfHeight, 0, letterHalfHeight * 0.2);
      addCardinalStroke(angle, 0, letterHalfHeight * 0.2, letterHalfWidth * 0.5, -letterHalfHeight);
      addCardinalStroke(angle, letterHalfWidth * 0.5, -letterHalfHeight, letterHalfWidth, letterHalfHeight);
    }
  }

  const cardinalLetterGeom = new THREE.BoxGeometry(0.024, 1, 0.009);
  const cardinal_letters = new THREE.InstancedMesh(
    cardinalLetterGeom,
    inkMat,
    cardinalSegments.length
  );
  const letterMatrix = new THREE.Matrix4();
  const letterPosition = new THREE.Vector3();
  const letterQuaternion = new THREE.Quaternion();
  const letterScale = new THREE.Vector3();
  const letterEuler = new THREE.Euler();
  for (let i = 0; i < cardinalSegments.length; i++) {
    const segment = cardinalSegments[i];
    letterPosition.set(segment.x, segment.y, 0.457);
    letterEuler.set(0, 0, segment.rotation);
    letterQuaternion.setFromEuler(letterEuler);
    letterScale.set(1, segment.length, 1);
    letterMatrix.compose(letterPosition, letterQuaternion, letterScale);
    cardinal_letters.setMatrixAt(i, letterMatrix);
  }
  cardinal_letters.instanceMatrix.needsUpdate = true;
  root.add(cardinal_letters);

  const needleShape = new THREE.Shape();
  needleShape.moveTo(-0.045, 0.02);
  needleShape.lineTo(-0.022, 0.76);
  needleShape.lineTo(0, 0.91);
  needleShape.lineTo(0.022, 0.76);
  needleShape.lineTo(0.045, 0.02);
  needleShape.lineTo(0, -0.08);
  needleShape.closePath();

  const compass_needleGeom = new THREE.ShapeGeometry(needleShape);
  const compass_needle = new THREE.Mesh(compass_needleGeom, needleMat);
  compass_needle.rotation.z = 0.13;
  compass_needle.position.z = 0.466;
  root.add(compass_needle);

  const center_hub_baseGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.06, 32);
  const center_hub_base = new THREE.Mesh(center_hub_baseGeom, agedBrassMat);
  center_hub_base.rotation.x = Math.PI / 2;
  center_hub_base.position.z = 0.475;
  root.add(center_hub_base);

  const center_hub_ringGeom = new THREE.TorusGeometry(0.135, 0.025, 10, 32);
  const center_hub_ring = new THREE.Mesh(center_hub_ringGeom, brassMat);
  center_hub_ring.position.z = 0.507;
  root.add(center_hub_ring);

  const center_hub_capGeom = new THREE.SphereGeometry(0.105, 24, 12);
  const center_hub_cap = new THREE.Mesh(center_hub_capGeom, brassMat);
  center_hub_cap.scale.set(1, 1, 0.48);
  center_hub_cap.position.z = 0.515;
  root.add(center_hub_cap);

  const glass_coverGeom = new THREE.CylinderGeometry(0.995, 0.995, 0.012, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.rotation.x = Math.PI / 2;
  glass_cover.position.z = 0.535;
  root.add(glass_cover);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.17);
  leafShape.bezierCurveTo(-0.09, -0.10, -0.10, 0.07, 0, 0.18);
  leafShape.bezierCurveTo(0.10, 0.07, 0.09, -0.10, 0, -0.17);
  leafShape.closePath();
  const leafGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 2,
  });

  const top_wood_leaf_cluster = new THREE.Group();
  const topLeafAngles = [-0.72, -0.36, 0, 0.36, 0.72];
  for (let i = 0; i < topLeafAngles.length; i++) {
    const topLeaf = new THREE.Mesh(leafGeom, i % 2 === 0 ? woodMat : lightWoodMat);
    topLeaf.position.set(
      Math.sin(topLeafAngles[i]) * 0.16,
      1.49 + Math.cos(topLeafAngles[i]) * 0.04,
      0.405
    );
    topLeaf.rotation.z = -topLeafAngles[i];
    topLeaf.scale.set(0.82, 0.88, 1);
    top_wood_leaf_cluster.add(topLeaf);
  }
  root.add(top_wood_leaf_cluster);

  const bottom_wood_leaf_cluster = new THREE.Group();
  const bottomLeafAngles = [-0.55, 0, 0.55];
  for (let i = 0; i < bottomLeafAngles.length; i++) {
    const bottomLeaf = new THREE.Mesh(leafGeom, i === 1 ? lightWoodMat : woodMat);
    bottomLeaf.position.set(
      Math.sin(bottomLeafAngles[i]) * 0.12,
      -1.50,
      0.405
    );
    bottomLeaf.rotation.z = Math.PI - bottomLeafAngles[i];
    bottomLeaf.scale.set(0.75, 0.82, 1);
    bottom_wood_leaf_cluster.add(bottomLeaf);
  }
  root.add(bottom_wood_leaf_cluster);

  const side_wood_leaf = new THREE.Mesh(leafGeom, lightWoodMat);
  side_wood_leaf.position.set(-1.49, -0.38, 0.31);
  side_wood_leaf.rotation.z = Math.PI / 2;
  side_wood_leaf.scale.set(0.72, 0.72, 1);
  root.add(side_wood_leaf);

  const top_collar_bandGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.10, 32);
  const top_collar_band = new THREE.Mesh(top_collar_bandGeom, darkWoodMat);
  top_collar_band.position.set(0, 1.60, 0.08);
  root.add(top_collar_band);

  const top_collarGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.16, 32);
  const top_collar = new THREE.Mesh(top_collarGeom, agedBrassMat);
  top_collar.position.set(0, 1.69, 0.10);
  root.add(top_collar);

  const top_collar_lipGeom = new THREE.TorusGeometry(0.36, 0.055, 10, 32);
  const top_collar_lip = new THREE.Mesh(top_collar_lipGeom, brassMat);
  top_collar_lip.rotation.x = Math.PI / 2;
  top_collar_lip.position.set(0, 1.73, 0.10);
  root.add(top_collar_lip);

  const loop_mountGeom = new THREE.SphereGeometry(0.22, 24, 12);
  const loop_mount = new THREE.Mesh(loop_mountGeom, agedBrassMat);
  loop_mount.scale.set(1, 0.82, 0.62);
  loop_mount.position.set(0, 1.86, 0.10);
  root.add(loop_mount);

  const suspension_loopGeom = new THREE.TorusGeometry(0.46, 0.07, 14, 48);
  const suspension_loop = new THREE.Mesh(suspension_loopGeom, brassMat);
  suspension_loop.position.set(0, 2.31, 0.08);
  root.add(suspension_loop);

  const bottom_finial_baseGeom = new THREE.SphereGeometry(0.13, 20, 10);
  const bottom_finial_base = new THREE.Mesh(bottom_finial_baseGeom, darkWoodMat);
  bottom_finial_base.scale.set(1.15, 0.78, 0.75);
  bottom_finial_base.position.set(0, -1.64, 0.02);
  root.add(bottom_finial_base);

  const bottom_finial = new THREE.Mesh(leafGeom, agedBrassMat);
  bottom_finial.rotation.z = Math.PI;
  bottom_finial.position.set(0, -1.66, 0.22);
  bottom_finial.scale.set(0.62, 0.62, 1);
  root.add(bottom_finial);

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