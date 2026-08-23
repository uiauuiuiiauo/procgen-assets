export default function generate(THREE) {
  const root = new THREE.Group();

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.3,
  });
  const copperHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xd59a7c,
    metalness: 0.5,
    roughness: 0.25,
  });
  const copperDarkMat = new THREE.MeshStandardMaterial({
    color: 0x713827,
    metalness: 0.5,
    roughness: 0.4,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x171313,
    metalness: 0.0,
    roughness: 0.3,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x9a7848,
    metalness: 0.6,
    roughness: 0.5,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x170f0d,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  function bodyRadiusAt(y) {
    if (y <= 0.08) return 0.62;
    if (y <= 0.25) return 0.62 - (y - 0.08) * 0.18;
    if (y <= 0.50) return 0.59 - (y - 0.25) * 0.24;
    if (y <= 0.72) return 0.53 - (y - 0.50) * 0.32;
    return Math.max(0.38, 0.46 - (y - 0.72) * 0.55);
  }

  function lidSurfaceY(radius) {
    return 0.862 - 0.18 * radius * radius;
  }

  const kettle_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.56, 0.00),
    new THREE.Vector2(0.61, 0.015),
    new THREE.Vector2(0.625, 0.055),
    new THREE.Vector2(0.62, 0.10),
    new THREE.Vector2(0.60, 0.20),
    new THREE.Vector2(0.57, 0.36),
    new THREE.Vector2(0.53, 0.55),
    new THREE.Vector2(0.48, 0.72),
    new THREE.Vector2(0.42, 0.82),
    new THREE.Vector2(0.38, 0.86),
    new THREE.Vector2(0.00, 0.86),
  ];
  const kettle_bodyGeom = new THREE.LatheGeometry(kettle_bodyProfile, 64);
  const kettle_body = new THREE.Mesh(kettle_bodyGeom, copperMat);
  root.add(kettle_body);

  const base_footGeom = new THREE.CylinderGeometry(0.61, 0.61, 0.025, 64);
  const base_foot = new THREE.Mesh(base_footGeom, copperDarkMat);
  base_foot.position.y = 0.0125;
  root.add(base_foot);

  const base_rimGeom = new THREE.TorusGeometry(0.602, 0.018, 10, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, copperHighlightMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.038;
  root.add(base_rim);

  const body_neckGeom = new THREE.CylinderGeometry(0.385, 0.395, 0.035, 64);
  const body_neck = new THREE.Mesh(body_neckGeom, copperMat);
  body_neck.position.y = 0.847;
  root.add(body_neck);

  const lidProfile = [
    new THREE.Vector2(0.00, 0.845),
    new THREE.Vector2(0.34, 0.845),
    new THREE.Vector2(0.415, 0.850),
    new THREE.Vector2(0.445, 0.862),
    new THREE.Vector2(0.435, 0.880),
    new THREE.Vector2(0.35, 0.895),
    new THREE.Vector2(0.22, 0.915),
    new THREE.Vector2(0.00, 0.930),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, copperMat);
  root.add(lid);

  const lid_seamGeom = new THREE.TorusGeometry(0.405, 0.008, 8, 64);
  const lid_seam = new THREE.Mesh(lid_seamGeom, openingMat);
  lid_seam.rotation.x = Math.PI / 2;
  lid_seam.position.y = 0.846;
  root.add(lid_seam);

  const lid_rimGeom = new THREE.TorusGeometry(0.425, 0.017, 10, 64);
  const lid_rim = new THREE.Mesh(lid_rimGeom, copperHighlightMat);
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.y = 0.866;
  root.add(lid_rim);

  const lid_knob_baseGeom = new THREE.CylinderGeometry(0.09, 0.105, 0.035, 32);
  const lid_knob_base = new THREE.Mesh(lid_knob_baseGeom, brassMat);
  lid_knob_base.position.y = 0.947;
  root.add(lid_knob_base);

  const lid_knob_stemGeom = new THREE.CylinderGeometry(0.052, 0.065, 0.055, 24);
  const lid_knob_stem = new THREE.Mesh(lid_knob_stemGeom, copperDarkMat);
  lid_knob_stem.position.y = 0.985;
  root.add(lid_knob_stem);

  const lid_knobGeom = new THREE.SphereGeometry(0.105, 32, 20);
  const lid_knob = new THREE.Mesh(lid_knobGeom, handleMat);
  lid_knob.position.y = 1.065;
  lid_knob.scale.set(1, 1.08, 1);
  root.add(lid_knob);

  const dimpleGeom = new THREE.SphereGeometry(1, 10, 7);
  const dimplePosition = dimpleGeom.attributes.position;
  for (let i = 0; i < dimplePosition.count; i++) {
    const x = dimplePosition.getX(i);
    const y = dimplePosition.getY(i);
    const z = dimplePosition.getZ(i);
    const radial = Math.min(1, x * x + y * y);
    dimplePosition.setZ(i, z - 0.42 * radial);
  }
  dimplePosition.needsUpdate = true;
  dimpleGeom.computeVertexNormals();

  const bodyRows = 12;
  const bodyColumns = 28;
  const body_dimples = new THREE.InstancedMesh(
    dimpleGeom,
    copperDarkMat,
    bodyRows * bodyColumns
  );
  const bodyDummy = new THREE.Object3D();
  const localNormal = new THREE.Vector3(0, 0, 1);
  let bodyDimpleIndex = 0;

  for (let row = 0; row < bodyRows; row++) {
    const y = 0.09 + row * 0.061;
    const radius = bodyRadiusAt(y);
    const radiusAbove = bodyRadiusAt(y + 0.002);
    const radiusBelow = bodyRadiusAt(y - 0.002);
    const slope = (radiusAbove - radiusBelow) / 0.004;

    for (let column = 0; column < bodyColumns; column++) {
      const stagger = row % 2 === 0 ? 0 : Math.PI / bodyColumns;
      const angle =
        column / bodyColumns * Math.PI * 2 +
        stagger +
        Math.sin(row * 1.7 + column * 0.9) * 0.018;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const normal = new THREE.Vector3(cosine, -slope, sine).normalize();
      const sizeVariation =
        0.86 + 0.18 * (0.5 + 0.5 * Math.sin(row * 2.1 + column * 1.37));

      bodyDummy.position
        .set(cosine * radius, y, sine * radius)
        .addScaledVector(normal, 0.001);
      bodyDummy.quaternion.setFromUnitVectors(localNormal, normal);
      bodyDummy.scale.set(
        0.035 * sizeVariation,
        0.031 * sizeVariation,
        0.012 * sizeVariation
      );
      bodyDummy.updateMatrix();
      body_dimples.setMatrixAt(bodyDimpleIndex++, bodyDummy.matrix);
    }
  }
  body_dimples.instanceMatrix.needsUpdate = true;
  body_dimples.frustumCulled = false;
  root.add(body_dimples);

  const lidRows = 6;
  const lidColumns = 24;
  const lid_dimples = new THREE.InstancedMesh(
    dimpleGeom,
    copperDarkMat,
    lidRows * lidColumns
  );
  const lidDummy = new THREE.Object3D();
  let lidDimpleIndex = 0;

  for (let row = 0; row < lidRows; row++) {
    const radius = 0.075 + row * 0.06;
    const y = lidSurfaceY(radius);
    const slope = -0.36 * radius;

    for (let column = 0; column < lidColumns; column++) {
      const angle =
        column / lidColumns * Math.PI * 2 +
        (row % 2) * Math.PI / lidColumns;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const normal = new THREE.Vector3(-slope * cosine, 1, -slope * sine).normalize();
      const sizeVariation =
        0.86 + 0.17 * (0.5 + 0.5 * Math.sin(row * 1.31 + column * 1.83));

      lidDummy.position
        .set(cosine * radius, y, sine * radius)
        .addScaledVector(normal, 0.001);
      lidDummy.quaternion.setFromUnitVectors(localNormal, normal);
      lidDummy.scale.set(
        0.027 * sizeVariation,
        0.024 * sizeVariation,
        0.009 * sizeVariation
      );
      lidDummy.updateMatrix();
      lid_dimples.setMatrixAt(lidDimpleIndex++, lidDummy.matrix);
    }
  }
  lid_dimples.instanceMatrix.needsUpdate = true;
  lid_dimples.frustumCulled = false;
  root.add(lid_dimples);

  const spoutPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.48, 0.52, 0.00),
      new THREE.Vector3(-0.60, 0.46, 0.00),
      new THREE.Vector3(-0.70, 0.55, 0.01),
      new THREE.Vector3(-0.76, 0.72, 0.02),
      new THREE.Vector3(-0.82, 0.89, 0.04),
      new THREE.Vector3(-0.96, 1.00, 0.12),
    ],
    false,
    "centripetal"
  );

  function spoutRadiusAt(t) {
    return 0.18 * (1 - t) + 0.085 * t + Math.sin(t * Math.PI) * 0.01;
  }

  function createVariableTubeGeometry(curve, tubularSegments, radialSegments) {
    const positions = [];
    const indices = [];
    const frames = curve.computeFrenetFrames(tubularSegments, false);

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const center = curve.getPointAt(t);
      const normal = frames.normals[i];
      const binormal = frames.binormals[i];
      const radius = spoutRadiusAt(t);

      for (let j = 0; j < radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        positions.push(
          center.x + radius * (cosine * normal.x + sine * binormal.x),
          center.y + radius * (cosine * normal.y + sine * binormal.y),
          center.z + radius * (cosine * normal.z + sine * binormal.z)
        );
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const nextJ = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + nextJ;
        const d = i * radialSegments + nextJ;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const spoutGeom = createVariableTubeGeometry(spoutPath, 36, 24);
  const spout = new THREE.Mesh(spoutGeom, copperMat);
  root.add(spout);

  const spoutStart = spoutPath.getPointAt(0);
  const spoutStartTangent = spoutPath.getTangentAt(0).normalize();
  const spout_base_collarGeom = new THREE.TorusGeometry(0.158, 0.014, 10, 40);
  const spout_base_collar = new THREE.Mesh(spout_base_collarGeom, copperDarkMat);
  spout_base_collar.position.copy(spoutStart);
  spout_base_collar.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutStartTangent
  );
  root.add(spout_base_collar);

  const spoutEnd = spoutPath.getPointAt(1);
  const spoutEndTangent = spoutPath.getTangentAt(1).normalize();

  const spout_lipGeom = new THREE.TorusGeometry(0.098, 0.014, 10, 40);
  const spout_lip = new THREE.Mesh(spout_lipGeom, copperHighlightMat);
  spout_lip.position.copy(spoutEnd);
  spout_lip.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutEndTangent
  );
  root.add(spout_lip);

  const spout_openingGeom = new THREE.CircleGeometry(0.088, 32);
  const spout_opening = new THREE.Mesh(spout_openingGeom, openingMat);
  spout_opening.position.copy(spoutEnd).addScaledVector(spoutEndTangent, 0.002);
  spout_opening.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutEndTangent
  );
  root.add(spout_opening);

  const spoutDimpleCount = 48;
  const spout_dimples = new THREE.InstancedMesh(
    dimpleGeom,
    copperDarkMat,
    spoutDimpleCount
  );
  const spoutDummy = new THREE.Object3D();
  const spoutFrames = spoutPath.computeFrenetFrames(36, false);
  let spoutDimpleIndex = 0;

  for (let i = 0; i < 24; i++) {
    const t = 0.06 + i / 23 * 0.82;
    const frameIndex = Math.round(t * 36);
    const center = spoutPath.getPointAt(t);
    const normal = spoutFrames.normals[frameIndex];
    const binormal = spoutFrames.binormals[frameIndex];

    for (let side = 0; side < 2; side++) {
      const angle = side === 0 ? 0.72 : Math.PI + 0.72;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const radius = spoutRadiusAt(t);
      const surfaceNormal = normal
        .clone()
        .multiplyScalar(cosine)
        .add(binormal.clone().multiplyScalar(sine))
        .normalize();

      spoutDummy.position
        .copy(center)
        .addScaledVector(surfaceNormal, radius + 0.001);
      spoutDummy.quaternion.setFromUnitVectors(localNormal, surfaceNormal);
      spoutDummy.scale.set(0.022, 0.019, 0.008);
      spoutDummy.updateMatrix();
      spout_dimples.setMatrixAt(spoutDimpleIndex++, spoutDummy.matrix);
    }
  }
  spout_dimples.instanceMatrix.needsUpdate = true;
  spout_dimples.frustumCulled = false;
  root.add(spout_dimples);

  const left_handle_bracePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.43, 0.76, 0.08),
      new THREE.Vector3(-0.50, 0.84, 0.08),
      new THREE.Vector3(-0.54, 1.00, 0.07),
      new THREE.Vector3(-0.54, 1.17, 0.05),
      new THREE.Vector3(-0.48, 1.30, 0.02),
    ],
    false,
    "centripetal"
  );
  const left_handle_braceGeom = new THREE.TubeGeometry(
    left_handle_bracePath,
    32,
    0.022,
    10,
    false
  );
  const left_handle_brace = new THREE.Mesh(left_handle_braceGeom, brassMat);
  root.add(left_handle_brace);

  const right_handle_bracePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.49, 0.60, 0.08),
      new THREE.Vector3(0.56, 0.64, 0.07),
      new THREE.Vector3(0.63, 0.69, 0.05),
      new THREE.Vector3(0.69, 0.76, 0.02),
    ],
    false,
    "centripetal"
  );
  const right_handle_braceGeom = new THREE.TubeGeometry(
    right_handle_bracePath,
    24,
    0.022,
    10,
    false
  );
  const right_handle_brace = new THREE.Mesh(right_handle_braceGeom, brassMat);
  root.add(right_handle_brace);

  const left_bracketGeom = new THREE.SphereGeometry(1, 20, 12);
  const left_bracket = new THREE.Mesh(left_bracketGeom, brassMat);
  left_bracket.position.set(-0.48, 0.79, 0.11);
  left_bracket.scale.set(0.052, 0.078, 0.025);
  left_bracket.rotation.z = -0.25;
  root.add(left_bracket);

  const right_bracketGeom = new THREE.SphereGeometry(1, 20, 12);
  const right_bracket = new THREE.Mesh(right_bracketGeom, brassMat);
  right_bracket.position.set(0.51, 0.61, 0.10);
  right_bracket.scale.set(0.045, 0.085, 0.026);
  right_bracket.rotation.z = -0.55;
  root.add(right_bracket);

  const bracket_rivetGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.014, 16);
  const left_bracket_rivet = new THREE.Mesh(bracket_rivetGeom, copperDarkMat);
  left_bracket_rivet.rotation.x = Math.PI / 2;
  left_bracket_rivet.position.set(-0.48, 0.79, 0.142);
  root.add(left_bracket_rivet);

  const right_bracket_rivet = new THREE.Mesh(bracket_rivetGeom, copperDarkMat);
  right_bracket_rivet.rotation.x = Math.PI / 2;
  right_bracket_rivet.position.set(0.51, 0.61, 0.134);
  root.add(right_bracket_rivet);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.48, 1.30, 0.02),
      new THREE.Vector3(-0.25, 1.43, 0.00),
      new THREE.Vector3(0.10, 1.49, 0.00),
      new THREE.Vector3(0.45, 1.43, 0.00),
      new THREE.Vector3(0.72, 1.25, 0.00),
      new THREE.Vector3(0.86, 0.98, 0.00),
      new THREE.Vector3(0.84, 0.75, 0.00),
      new THREE.Vector3(0.69, 0.76, 0.00),
    ],
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(handlePath, 72, 0.068, 18, false);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  root.add(handle);

  const handle_end_capGeom = new THREE.SphereGeometry(0.074, 24, 16);
  const left_handle_end_cap = new THREE.Mesh(handle_end_capGeom, handleMat);
  left_handle_end_cap.position.copy(handlePath.getPointAt(0));
  left_handle_end_cap.scale.set(1.15, 0.9, 1.0);
  left_handle_end_cap.rotation.z = -0.5;
  root.add(left_handle_end_cap);

  const right_handle_end_cap = new THREE.Mesh(handle_end_capGeom, handleMat);
  right_handle_end_cap.position.copy(handlePath.getPointAt(1));
  right_handle_end_cap.scale.set(1.15, 0.9, 1.0);
  right_handle_end_cap.rotation.z = 0.65;
  root.add(right_handle_end_cap);

  fitToUnitCube(root);
  return root;

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
}