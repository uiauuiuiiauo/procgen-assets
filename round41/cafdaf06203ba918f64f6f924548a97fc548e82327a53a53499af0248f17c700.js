export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "amber_bracelet";

  const outerR = 1.18;
  const innerR = 0.82;
  const bandH = 0.28;
  const centerR = (outerR + innerR) * 0.5;
  const crossRadius = (outerR - innerR) * 0.5;
  const verticalRadius = bandH * 0.5;

  const bracelet_bandMat = new THREE.MeshPhysicalMaterial({
    color: 0xe3aa62,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    thickness: 0.35,
    attenuationColor: 0xd99a50,
    attenuationDistance: 1.1,
    clearcoat: 0.7,
    clearcoatRoughness: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const turquoise_stoneMat = new THREE.MeshStandardMaterial({
    color: 0x79cfd0,
    metalness: 0.0,
    roughness: 0.4
  });

  const turquoise_inclusionMat = new THREE.MeshStandardMaterial({
    color: 0x367f80,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const amber_cloudMat = new THREE.MeshStandardMaterial({
    color: 0xf3d7a5,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.15,
    depthWrite: false
  });

  const amber_fissureMat = new THREE.MeshStandardMaterial({
    color: 0x75401f,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.48,
    depthWrite: false
  });

  function createAnnularBandGeometry(innerRadius, outerRadius, height, bevel) {
    const profile = [];
    const edgeSteps = 6;

    profile.push(new THREE.Vector2(innerRadius + bevel, -height * 0.5));
    profile.push(new THREE.Vector2(outerRadius - bevel, -height * 0.5));

    for (let i = 1; i <= edgeSteps; i++) {
      const a = -Math.PI * 0.5 + (Math.PI * 0.5 * i) / edgeSteps;
      profile.push(new THREE.Vector2(
        outerRadius - bevel + Math.cos(a) * bevel,
        -height * 0.5 + bevel + Math.sin(a) * bevel
      ));
    }

    profile.push(new THREE.Vector2(outerRadius, height * 0.5 - bevel));

    for (let i = 1; i <= edgeSteps; i++) {
      const a = (Math.PI * 0.5 * i) / edgeSteps;
      profile.push(new THREE.Vector2(
        outerRadius - bevel + Math.cos(a) * bevel,
        height * 0.5 - bevel + Math.sin(a) * bevel
      ));
    }

    profile.push(new THREE.Vector2(innerRadius + bevel, height * 0.5));

    for (let i = 1; i <= edgeSteps; i++) {
      const a = Math.PI * 0.5 + (Math.PI * 0.5 * i) / edgeSteps;
      profile.push(new THREE.Vector2(
        innerRadius + bevel + Math.cos(a) * bevel,
        height * 0.5 - bevel + Math.sin(a) * bevel
      ));
    }

    profile.push(new THREE.Vector2(innerRadius, -height * 0.5 + bevel));

    for (let i = 1; i <= edgeSteps; i++) {
      const a = Math.PI + (Math.PI * 0.5 * i) / edgeSteps;
      profile.push(new THREE.Vector2(
        innerRadius + bevel + Math.cos(a) * bevel,
        -height * 0.5 + bevel + Math.sin(a) * bevel
      ));
    }

    profile.push(new THREE.Vector2(innerRadius + bevel, -height * 0.5));

    return new THREE.LatheGeometry(profile, 96);
  }

  function bandSurfacePose(angle, y, extra) {
    const normalizedY = Math.min(
      0.98,
      Math.abs(y) / Math.max(0.001, verticalRadius)
    );
    const radialOffset = crossRadius * Math.sqrt(
      Math.max(0, 1 - normalizedY * normalizedY)
    );
    const radius = centerR + radialOffset + extra;
    const normal = new THREE.Vector3(
      Math.cos(angle) * radialOffset / crossRadius,
      y / verticalRadius,
      Math.sin(angle) * radialOffset / crossRadius
    ).normalize();
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    return { position, normal };
  }

  function placeOnBand(mesh, angle, y, extra) {
    const pose = bandSurfacePose(angle, y, extra);
    mesh.position.copy(pose.position);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      pose.normal
    );
  }

  function createEllipseTubeGeometry(rx, ry, tubeRadius) {
    const points = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(a) * rx,
        Math.sin(a) * ry,
        0
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 64, tubeRadius, 8, true);
  }

  const bracelet_bandGeom = createAnnularBandGeometry(
    innerR,
    outerR,
    bandH,
    0.055
  );
  const bracelet_band = new THREE.Mesh(
    bracelet_bandGeom,
    bracelet_bandMat
  );
  bracelet_band.name = "bracelet_band";
  bracelet_band.renderOrder = 2;
  root.add(bracelet_band);

  const inner_edge_rimGeom = new THREE.TorusGeometry(
    innerR + 0.015,
    0.012,
    8,
    96
  );
  const inner_edge_rim = new THREE.Mesh(
    inner_edge_rimGeom,
    bracelet_bandMat
  );
  inner_edge_rim.name = "inner_edge_rim";
  inner_edge_rim.rotation.x = Math.PI / 2;
  inner_edge_rim.position.y = 0.098;
  inner_edge_rim.renderOrder = 2;
  root.add(inner_edge_rim);

  const outer_edge_rimGeom = new THREE.TorusGeometry(
    outerR - 0.014,
    0.011,
    8,
    96
  );
  const outer_edge_rim = new THREE.Mesh(
    outer_edge_rimGeom,
    bracelet_bandMat
  );
  outer_edge_rim.name = "outer_edge_rim";
  outer_edge_rim.rotation.x = Math.PI / 2;
  outer_edge_rim.position.y = 0.098;
  outer_edge_rim.renderOrder = 2;
  root.add(outer_edge_rim);

  const amber_cloudsGeom = new THREE.SphereGeometry(1, 16, 8);
  const amber_clouds = new THREE.InstancedMesh(
    amber_cloudsGeom,
    amber_cloudMat,
    12
  );
  amber_clouds.name = "amber_clouds";
  amber_clouds.renderOrder = 1;

  const cloudMatrix = new THREE.Matrix4();
  const cloudQuaternion = new THREE.Quaternion();
  const cloudScale = new THREE.Vector3();
  const localNormal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2 + 0.17;
    const y = -0.085 + (i % 4) * 0.055;
    const position = bandSurfacePose(angle, y, 0.004).position;
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();

    cloudQuaternion.setFromUnitVectors(localNormal, normal);
    cloudScale.set(
      0.07 + (i % 3) * 0.018,
      0.035 + (i % 2) * 0.018,
      0.006
    );
    cloudMatrix.compose(position, cloudQuaternion, cloudScale);
    amber_clouds.setMatrixAt(i, cloudMatrix);
  }
  amber_clouds.instanceMatrix.needsUpdate = true;
  root.add(amber_clouds);

  const amber_fissures = new THREE.Group();
  amber_fissures.name = "amber_fissures";
  const fissureAngles = [0.34, 1.22, 2.18, 3.58, 4.66, 5.42];

  for (let i = 0; i < fissureAngles.length; i++) {
    const points = [];
    const baseAngle = fissureAngles[i];
    for (let j = 0; j < 6; j++) {
      const angle = baseAngle + (j - 2.5) * 0.012;
      const y = -0.095 + j * 0.038 +
        Math.sin((i + 1) * (j + 1)) * 0.007;
      points.push(bandSurfacePose(angle, y, 0.007).position);
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const fissureGeom = new THREE.TubeGeometry(
      curve,
      18,
      0.0045,
      6,
      false
    );
    const fissure = new THREE.Mesh(fissureGeom, amber_fissureMat);
    fissure.name = "amber_fissure_" + i;
    fissure.renderOrder = 1;
    amber_fissures.add(fissure);
  }
  root.add(amber_fissures);

  const stone_setting = new THREE.Group();
  stone_setting.name = "stone_setting";
  placeOnBand(stone_setting, 0.72, -0.005, 0.02);
  root.add(stone_setting);

  const turquoise_backingGeom = new THREE.CylinderGeometry(
    1,
    1,
    0.026,
    40
  );
  const turquoise_backing = new THREE.Mesh(
    turquoise_backingGeom,
    polished_metalMat
  );
  turquoise_backing.name = "turquoise_backing";
  turquoise_backing.rotation.x = Math.PI / 2;
  turquoise_backing.scale.set(0.17, 1, 0.205);
  turquoise_backing.position.z = 0.013;
  stone_setting.add(turquoise_backing);

  const turquoise_bezelGeom = createEllipseTubeGeometry(
    0.158,
    0.193,
    0.018
  );
  const turquoise_bezel = new THREE.Mesh(
    turquoise_bezelGeom,
    polished_metalMat
  );
  turquoise_bezel.name = "turquoise_bezel";
  turquoise_bezel.position.z = 0.041;
  stone_setting.add(turquoise_bezel);

  const turquoise_stoneGeom = new THREE.SphereGeometry(1, 36, 18);
  const turquoise_stone = new THREE.Mesh(
    turquoise_stoneGeom,
    turquoise_stoneMat
  );
  turquoise_stone.name = "turquoise_stone";
  turquoise_stone.scale.set(0.142, 0.177, 0.035);
  turquoise_stone.position.z = 0.043;
  stone_setting.add(turquoise_stone);

  const turquoise_inclusionsGeom = new THREE.CircleGeometry(0.012, 12);
  const turquoise_inclusions = new THREE.InstancedMesh(
    turquoise_inclusionsGeom,
    turquoise_inclusionMat,
    5
  );
  turquoise_inclusions.name = "turquoise_inclusions";

  const inclusionPositions = [
    [-0.055, 0.060],
    [0.047, 0.083],
    [0.066, -0.030],
    [-0.032, -0.078],
    [0.006, 0.012]
  ];
  const inclusionMatrix = new THREE.Matrix4();
  const inclusionQuaternion = new THREE.Quaternion();
  const inclusionScale = new THREE.Vector3();

  for (let i = 0; i < inclusionPositions.length; i++) {
    const x = inclusionPositions[i][0];
    const y = inclusionPositions[i][1];
    const nx = x / 0.142;
    const ny = y / 0.177;
    const surface = Math.sqrt(
      Math.max(0, 1 - nx * nx - ny * ny)
    );
    const position = new THREE.Vector3(
      x,
      y,
      0.043 + 0.035 * surface + 0.002
    );
    const size = 0.55 + (i % 3) * 0.18;
    inclusionScale.set(size, size * 0.75, 1);
    inclusionMatrix.compose(
      position,
      inclusionQuaternion,
      inclusionScale
    );
    turquoise_inclusions.setMatrixAt(i, inclusionMatrix);
  }
  turquoise_inclusions.instanceMatrix.needsUpdate = true;
  stone_setting.add(turquoise_inclusions);

  const setting_claspGeom = new THREE.CylinderGeometry(
    0.023,
    0.023,
    0.045,
    16
  );
  const setting_clasp = new THREE.Mesh(
    setting_claspGeom,
    polished_metalMat
  );
  setting_clasp.name = "setting_clasp";
  setting_clasp.rotation.x = Math.PI / 2;
  setting_clasp.position.set(-0.172, -0.01, 0.025);
  stone_setting.add(setting_clasp);

  const clasp_group = new THREE.Group();
  clasp_group.name = "clasp_group";
  clasp_group.rotation.y = -2.18;
  root.add(clasp_group);

  const clasp_bodyGeom = new THREE.BoxGeometry(0.24, 0.30, 0.14);
  const clasp_body = new THREE.Mesh(
    clasp_bodyGeom,
    polished_metalMat
  );
  clasp_body.name = "clasp_body";
  clasp_body.position.set(0, 0, 1.04);
  clasp_group.add(clasp_body);

  const clasp_inner_plateGeom = new THREE.BoxGeometry(
    0.18,
    0.22,
    0.018
  );
  const clasp_inner_plate = new THREE.Mesh(
    clasp_inner_plateGeom,
    brushed_metalMat
  );
  clasp_inner_plate.name = "clasp_inner_plate";
  clasp_inner_plate.position.set(0, -0.005, 0.956);
  clasp_group.add(clasp_inner_plate);

  const clasp_top_capGeom = new THREE.BoxGeometry(0.28, 0.045, 0.20);
  const clasp_top_cap = new THREE.Mesh(
    clasp_top_capGeom,
    polished_metalMat
  );
  clasp_top_cap.name = "clasp_top_cap";
  clasp_top_cap.position.set(0, 0.166, 1.055);
  clasp_group.add(clasp_top_cap);

  const clasp_bottom_footGeom = new THREE.BoxGeometry(
    0.17,
    0.04,
    0.16
  );
  const clasp_bottom_foot = new THREE.Mesh(
    clasp_bottom_footGeom,
    polished_metalMat
  );
  clasp_bottom_foot.name = "clasp_bottom_foot";
  clasp_bottom_foot.position.set(0, -0.164, 1.025);
  clasp_group.add(clasp_bottom_foot);

  const clasp_hinge_pinGeom = new THREE.CylinderGeometry(
    0.027,
    0.027,
    0.27,
    18
  );
  const clasp_hinge_pin = new THREE.Mesh(
    clasp_hinge_pinGeom,
    polished_metalMat
  );
  clasp_hinge_pin.name = "clasp_hinge_pin";
  clasp_hinge_pin.rotation.z = Math.PI / 2;
  clasp_hinge_pin.position.set(0, 0.115, 1.095);
  clasp_group.add(clasp_hinge_pin);

  const clasp_rivetGeom = new THREE.CylinderGeometry(
    0.032,
    0.032,
    0.018,
    20
  );
  const clasp_rivet = new THREE.Mesh(
    clasp_rivetGeom,
    brushed_metalMat
  );
  clasp_rivet.name = "clasp_rivet";
  clasp_rivet.rotation.x = Math.PI / 2;
  clasp_rivet.position.set(0.055, 0.015, 0.938);
  clasp_group.add(clasp_rivet);

  const clasp_rivet_centerGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    0.021,
    16
  );
  const clasp_rivet_center = new THREE.Mesh(
    clasp_rivet_centerGeom,
    polished_metalMat
  );
  clasp_rivet_center.name = "clasp_rivet_center";
  clasp_rivet_center.rotation.x = Math.PI / 2;
  clasp_rivet_center.position.set(0.055, 0.015, 0.928);
  clasp_group.add(clasp_rivet_center);

  const clasp_slotGeom = new THREE.BoxGeometry(0.105, 0.014, 0.009);
  const clasp_slot = new THREE.Mesh(
    clasp_slotGeom,
    brushed_metalMat
  );
  clasp_slot.name = "clasp_slot";
  clasp_slot.position.set(-0.015, -0.075, 0.943);
  clasp_group.add(clasp_slot);

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