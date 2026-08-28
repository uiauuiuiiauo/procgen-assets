export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "mixed_berry_tart";

  const crust_group = new THREE.Group();
  crust_group.name = "crust_group";
  root.add(crust_group);

  const filling_group = new THREE.Group();
  filling_group.name = "filling_group";
  root.add(filling_group);

  const fruit_group = new THREE.Group();
  fruit_group.name = "fruit_group";
  root.add(fruit_group);

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xf0c66f,
    metalness: 0.0,
    roughness: 0.86
  });
  const crustLightMat = new THREE.MeshStandardMaterial({
    color: 0xffdc91,
    metalness: 0.0,
    roughness: 0.82
  });
  const crustToastMat = new THREE.MeshStandardMaterial({
    color: 0xb8752f,
    metalness: 0.0,
    roughness: 0.88
  });
  const glazeMat = new THREE.MeshPhysicalMaterial({
    color: 0x8c0b2d,
    metalness: 0.0,
    roughness: 0.14,
    clearcoat: 0.9,
    clearcoatRoughness: 0.08
  });
  const blueberryMat = new THREE.MeshStandardMaterial({
    color: 0x4b6078,
    metalness: 0.0,
    roughness: 0.48
  });
  const blueberryBloomMat = new THREE.MeshStandardMaterial({
    color: 0xa6b7c7,
    metalness: 0.0,
    roughness: 0.72,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide
  });
  const calyxMat = new THREE.MeshStandardMaterial({
    color: 0x111820,
    metalness: 0.0,
    roughness: 0.82,
    side: THREE.DoubleSide
  });
  const raspberryMat = new THREE.MeshStandardMaterial({
    color: 0xb20d35,
    metalness: 0.0,
    roughness: 0.34
  });
  const raspberryDarkMat = new THREE.MeshStandardMaterial({
    color: 0x75071f,
    metalness: 0.0,
    roughness: 0.42
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffd8df,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide
  });

  function createFlutedSideGeometry() {
    const positions = [];
    const indices = [];
    const segments = 144;
    const flutes = 24;
    const levels = [
      { y: 0.00, radius: 1.17, amplitude: 0.018 },
      { y: 0.12, radius: 1.23, amplitude: 0.030 },
      { y: 0.34, radius: 1.34, amplitude: 0.052 },
      { y: 0.49, radius: 1.40, amplitude: 0.060 }
    ];

    for (let j = 0; j < levels.length; j++) {
      const level = levels[j];
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const wave = Math.cos(flutes * angle);
        const radius = level.radius + level.amplitude * wave;
        positions.push(
          Math.cos(angle) * radius,
          level.y,
          Math.sin(angle) * radius
        );
      }
    }

    for (let j = 0; j < levels.length - 1; j++) {
      for (let i = 0; i < segments; i++) {
        const a = j * (segments + 1) + i;
        const b = a + 1;
        const d = (j + 1) * (segments + 1) + i;
        const c = d + 1;
        indices.push(a, d, b, b, d, c);
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

  function createScallopedRimGeometry() {
    const positions = [];
    const indices = [];
    const segments = 144;
    const profile = [
      { radius: 1.17, height: 0.465, amplitude: 0.025, phase: 0.00 },
      { radius: 1.28, height: 0.535, amplitude: 0.045, amplitudeWave: 0.010 },
      { radius: 1.40, height: 0.500, amplitude: 0.060, amplitudeWave: 0.014 },
      { radius: 1.475, height: 0.405, amplitude: 0.067, amplitudeWave: 0.012 }
    ];

    for (let j = 0; j < profile.length; j++) {
      const ring = profile[j];
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const wave = Math.cos(24 * angle);
        const radius = ring.radius + ring.amplitude * wave;
        const y = ring.height + (ring.amplitudeWave || 0) * wave;
        positions.push(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
      }
    }

    for (let j = 0; j < profile.length - 1; j++) {
      for (let i = 0; i < segments; i++) {
        const a = j * (segments + 1) + i;
        const b = a + 1;
        const d = (j + 1) * (segments + 1) + i;
        const c = d + 1;
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

  const crust_baseGeom = new THREE.CylinderGeometry(1.18, 1.17, 0.08, 96);
  const crust_base = new THREE.Mesh(crust_baseGeom, crustMat);
  crust_base.name = "crust_base";
  crust_base.position.y = 0.04;
  crust_group.add(crust_base);

  const crust_sideGeom = createFlutedSideGeometry();
  const crust_side = new THREE.Mesh(crust_sideGeom, crustMat);
  crust_side.name = "crust_side";
  crust_group.add(crust_side);

  const crust_bottom_edgeGeom = new THREE.TorusGeometry(1.17, 0.035, 10, 96);
  const crust_bottom_edge = new THREE.Mesh(crust_bottom_edgeGeom, crustToastMat);
  crust_bottom_edge.name = "crust_bottom_edge";
  crust_bottom_edge.rotation.x = Math.PI / 2;
  crust_bottom_edge.position.y = 0.035;
  crust_group.add(crust_bottom_edge);

  const crust_rimGeom = createScallopedRimGeometry();
  const crust_rim = new THREE.Mesh(crust_rimGeom, crustLightMat);
  crust_rim.name = "crust_rim";
  crust_group.add(crust_rim);

  const crust_inner_edgeGeom = new THREE.TorusGeometry(1.17, 0.038, 10, 96);
  const crust_inner_edge = new THREE.Mesh(crust_inner_edgeGeom, crustToastMat);
  crust_inner_edge.name = "crust_inner_edge";
  crust_inner_edge.rotation.x = Math.PI / 2;
  crust_inner_edge.position.y = 0.466;
  crust_group.add(crust_inner_edge);

  const crust_rim_toastGeom = new THREE.SphereGeometry(1, 10, 6);
  const crust_rim_toast_marks = new THREE.InstancedMesh(
    crust_rim_toastGeom,
    crustToastMat,
    24
  );
  crust_rim_toast_marks.name = "crust_rim_toast_marks";
  const dummy = new THREE.Object3D();

  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    const radius = 1.405 + 0.018 * Math.cos(angle * 2);
    dummy.position.set(
      Math.cos(angle) * radius,
      0.505 + 0.006 * Math.cos(angle * 2),
      Math.sin(angle) * radius
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dummy.scale.set(
      0.050 + 0.008 * (i % 3),
      0.009,
      0.020 + 0.004 * (i % 2)
    );
    dummy.updateMatrix();
    crust_rim_toast_marks.setMatrixAt(i, dummy.matrix);
  }
  crust_rim_toast_marks.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_rim_toast_marks);

  const crust_side_toastGeom = new THREE.SphereGeometry(1, 8, 5);
  const crust_side_toast_marks = new THREE.InstancedMesh(
    crust_side_toastGeom,
    crustToastMat,
    48
  );
  crust_side_toast_marks.name = "crust_side_toast_marks";

  for (let i = 0; i < 48; i++) {
    const angle = i * 2.399963229728653;
    const y = 0.075 + ((i * 17) % 41) / 41 * 0.35;
    const t = y / 0.49;
    const amplitude = 0.018 + Math.max(0, Math.min(1, t)) * 0.042;
    const radius =
      1.17 +
      (1.40 - 1.17) * t +
      amplitude * Math.cos(24 * angle) +
      0.008;

    dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dummy.scale.set(
      0.018 + 0.006 * (i % 4),
      0.010 + 0.004 * (i % 3),
      0.004
    );
    dummy.updateMatrix();
    crust_side_toast_marks.setMatrixAt(i, dummy.matrix);
  }
  crust_side_toast_marks.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_side_toast_marks);

  const berry_glazeGeom = new THREE.CylinderGeometry(1.205, 1.19, 0.09, 96);
  const berry_glaze = new THREE.Mesh(berry_glazeGeom, glazeMat);
  berry_glaze.name = "berry_glaze";
  berry_glaze.position.y = 0.445;
  filling_group.add(berry_glaze);

  const berry_glaze_surfaceGeom = new THREE.SphereGeometry(1, 64, 20);
  const berry_glaze_surface = new THREE.Mesh(berry_glaze_surfaceGeom, glazeMat);
  berry_glaze_surface.name = "berry_glaze_surface";
  berry_glaze_surface.position.y = 0.485;
  berry_glaze_surface.scale.set(1.19, 0.065, 1.19);
  filling_group.add(berry_glaze_surface);

  const glaze_edgeGeom = new THREE.SphereGeometry(1, 12, 7);
  const glaze_edge = new THREE.InstancedMesh(glaze_edgeGeom, glazeMat, 20);
  glaze_edge.name = "glaze_edge";

  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2 + 0.08;
    const radius = 1.105 + 0.018 * Math.sin(i * 1.7);
    dummy.position.set(
      Math.cos(angle) * radius,
      0.493,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dummy.scale.set(
      0.105 + 0.012 * (i % 3),
      0.022,
      0.075 + 0.008 * (i % 2)
    );
    dummy.updateMatrix();
    glaze_edge.setMatrixAt(i, dummy.matrix);
  }
  glaze_edge.instanceMatrix.needsUpdate = true;
  filling_group.add(glaze_edge);

  const blueberry_data = [
    { x: -0.72, z: -0.79, r: 0.175 },
    { x: -0.10, z: -0.86, r: 0.185 },
    { x: 0.53, z: -0.77, r: 0.175 },
    { x: 0.88, z: -0.54, r: 0.190 },
    { x: -0.94, z: -0.48, r: 0.185 },
    { x: -0.42, z: -0.43, r: 0.195 },
    { x: 0.17, z: -0.47, r: 0.185 },
    { x: 0.70, z: -0.39, r: 0.190 },
    { x: -0.99, z: -0.04, r: 0.180 },
    { x: -0.49, z: -0.03, r: 0.190 },
    { x: 0.00, z: -0.08, r: 0.195 },
    { x: 0.50, z: -0.02, r: 0.185 },
    { x: 0.96, z: -0.06, r: 0.195 },
    { x: -0.76, z: 0.34, r: 0.190 },
    { x: -0.18, z: 0.31, r: 0.195 },
    { x: 0.37, z: 0.34, r: 0.185 },
    { x: 0.79, z: 0.38, r: 0.195 },
    { x: -0.55, z: 0.70, r: 0.180 },
    { x: 0.00, z: 0.72, r: 0.195 },
    { x: 0.56, z: 0.69, r: 0.185 }
  ];

  const blueberryGeom = new THREE.SphereGeometry(1, 24, 16);
  const blueberries = new THREE.InstancedMesh(
    blueberryGeom,
    blueberryMat,
    blueberry_data.length
  );
  blueberries.name = "blueberries";

  for (let i = 0; i < blueberry_data.length; i++) {
    const berry = blueberry_data[i];
    dummy.position.set(berry.x, 0.585, berry.z);
    dummy.rotation.set(0, i * 0.47, 0);
    dummy.scale.set(
      berry.r * (0.97 + 0.025 * (i % 3)),
      berry.r * (0.88 + 0.035 * (i % 2)),
      berry.r * (0.98 + 0.018 * ((i + 1) % 3))
    );
    dummy.updateMatrix();
    blueberries.setMatrixAt(i, dummy.matrix);
  }
  blueberries.instanceMatrix.needsUpdate = true;
  fruit_group.add(blueberries);

  const calyxShape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI / 2 + i / 10 * Math.PI * 2;
    const radius = i % 2 === 0 ? 1 : 0.42;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      calyxShape.moveTo(x, y);
    } else {
      calyxShape.lineTo(x, y);
    }
  }
  calyxShape.closePath();

  const blueberry_calyxesGeom = new THREE.ShapeGeometry(calyxShape);
  const blueberry_calyxes = new THREE.InstancedMesh(
    blueberry_calyxesGeom,
    calyxMat,
    blueberry_data.length
  );
  blueberry_calyxes.name = "blueberry_calyxes";

  const blueberry_calyx_rimsGeom = new THREE.RingGeometry(0.48, 1, 14);
  const blueberry_calyx_rims = new THREE.InstancedMesh(
    blueberry_calyx_rimsGeom,
    calyxMat,
    blueberry_data.length
  );
  blueberry_calyx_rims.name = "blueberry_calyx_rims";

  const blueberry_dimplesGeom = new THREE.CircleGeometry(1, 14);
  const blueberry_dimples = new THREE.InstancedMesh(
    blueberry_dimplesGeom,
    calyxMat,
    blueberry_data.length
  );
  blueberry_dimples.name = "blueberry_dimples";

  for (let i = 0; i < blueberry_data.length; i++) {
    const berry = blueberry_data[i];
    const topY = 0.585 + berry.r * (0.88 + 0.035 * (i % 2));

    dummy.position.set(berry.x, topY + 0.003, berry.z);
    dummy.rotation.set(-Math.PI / 2, 0, i * 0.63);
    dummy.scale.setScalar(berry.r * 0.22);
    dummy.updateMatrix();
    blueberry_calyxes.setMatrixAt(i, dummy.matrix);

    dummy.position.set(berry.x, topY + 0.002, berry.z);
    dummy.rotation.set(-Math.PI / 2, 0, i * 0.63);
    dummy.scale.setScalar(berry.r * 0.29);
    dummy.updateMatrix();
    blueberry_calyx_rims.setMatrixAt(i, dummy.matrix);

    dummy.position.set(berry.x, topY + 0.004, berry.z);
    dummy.rotation.set(-Math.PI / 2, 0, i * 0.63);
    dummy.scale.setScalar(berry.r * 0.095);
    dummy.updateMatrix();
    blueberry_dimples.setMatrixAt(i, dummy.matrix);
  }
  blueberry_calyxes.instanceMatrix.needsUpdate = true;
  blueberry_calyx_rims.instanceMatrix.needsUpdate = true;
  blueberry_dimples.instanceMatrix.needsUpdate = true;
  fruit_group.add(
    blueberry_calyx_rims,
    blueberry_calyxes,
    blueberry_dimples
  );

  const blueberry_bloomGeom = new THREE.CircleGeometry(1, 10);
  const blueberry_bloom = new THREE.InstancedMesh(
    blueberry_bloomGeom,
    blueberryBloomMat,
    blueberry_data.length * 2
  );
  blueberry_bloom.name = "blueberry_bloom";
  const outward = new THREE.Vector3();
  const decalForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < blueberry_data.length; i++) {
    const berry = blueberry_data[i];
    const sx = berry.r * (0.97 + 0.025 * (i % 3));
    const sy = berry.r * (0.88 + 0.035 * (i % 2));
    const sz = berry.r * (0.98 + 0.018 * ((i + 1) % 3));

    for (let j = 0; j < 2; j++) {
      const azimuth = i * 0.83 + j * 2.15;
      const elevation = 0.28 + 0.16 * ((i + j) % 3);
      outward.set(
        Math.cos(azimuth) * Math.cos(elevation),
        Math.sin(elevation),
        Math.sin(azimuth) * Math.cos(elevation)
      ).normalize();

      dummy.position.set(
        berry.x + outward.x / sx * (sx + 0.004),
        0.585 + outward.y / sy * (sy + 0.004),
        berry.z + outward.z / sz * (sz + 0.004)
      );
      dummy.quaternion.setFromUnitVectors(decalForward, outward);
      dummy.scale.set(
        0.020 + 0.006 * ((i + j) % 3),
        0.013 + 0.005 * (j % 2),
        1
      );
      dummy.updateMatrix();
      blueberry_bloom.setMatrixAt(i * 2 + j, dummy.matrix);
    }
  }
  blueberry_bloom.instanceMatrix.needsUpdate = true;
  fruit_group.add(blueberry_bloom);

  const raspberry_data = [
    { x: -0.58, z: -0.64, r: 0.165 },
    { x: 0.30, z: -0.62, r: 0.175 },
    { x: 0.76, z: -0.18, r: 0.170 },
    { x: -0.48, z: 0.18, r: 0.165 },
    { x: 0.17, z: 0.17, r: 0.175 },
    { x: 0.57, z: 0.51, r: 0.165 }
  ];

  const raspberry_coreGeom = new THREE.SphereGeometry(1, 20, 12);
  const raspberry_cores = new THREE.InstancedMesh(
    raspberry_coreGeom,
    raspberryMat,
    raspberry_data.length
  );
  raspberry_cores.name = "raspberry_cores";

  for (let i = 0; i < raspberry_data.length; i++) {
    const berry = raspberry_data[i];
    dummy.position.set(berry.x, 0.565, berry.z);
    dummy.rotation.set(0, i * 0.72, 0);
    dummy.scale.set(
      berry.r,
      berry.r * 0.78,
      berry.r * (0.96 + 0.02 * (i % 2))
    );
    dummy.updateMatrix();
    raspberry_cores.setMatrixAt(i, dummy.matrix);
  }
  raspberry_cores.instanceMatrix.needsUpdate = true;
  fruit_group.add(raspberry_cores);

  const raspberry_drupeletGeom = new THREE.SphereGeometry(1, 12, 8);
  const raspberry_drupelets = new THREE.InstancedMesh(
    raspberry_drupeletGeom,
    raspberryMat,
    raspberry_data.length * 16
  );
  raspberry_drupelets.name = "raspberry_drupelets";

  const raspberry_highlightsGeom = new THREE.CircleGeometry(1, 9);
  const raspberry_highlights = new THREE.InstancedMesh(
    raspberry_highlightsGeom,
    highlightMat,
    raspberry_data.length * 3
  );
  raspberry_highlights.name = "raspberry_highlights";

  let drupeletIndex = 0;
  let highlightIndex = 0;

  for (let i = 0; i < raspberry_data.length; i++) {
    const berry = raspberry_data[i];

    for (let k = 0; k < 9; k++) {
      const angle = k / 9 * Math.PI * 2 + i * 0.21;
      const radius = berry.r * 0.64;
      dummy.position.set(
        berry.x + Math.cos(angle) * radius,
        0.565 + berry.r * 0.25,
        berry.z + Math.sin(angle) * radius
      );
      dummy.rotation.set(0, angle, 0);
      dummy.scale.set(
        0.052 + 0.004 * (k % 2),
        0.047 + 0.004 * ((k + 1) % 2),
        0.052
      );
      dummy.updateMatrix();
      raspberry_drupelets.setMatrixAt(drupeletIndex++, dummy.matrix);
    }

    for (let k = 0; k < 7; k++) {
      const angle = k / 7 * Math.PI * 2 + i * 0.34 + 0.25;
      const radius = berry.r * 0.43;
      dummy.position.set(
        berry.x + Math.cos(angle) * radius,
        0.565 + berry.r * 0.49,
        berry.z + Math.sin(angle) * radius
      );
      dummy.rotation.set(0, angle, 0);
      dummy.scale.set(0.049, 0.045, 0.049);
      dummy.updateMatrix();
      raspberry_drupelets.setMatrixAt(drupeletIndex++, dummy.matrix);
    }

    for (let h = 0; h < 3; h++) {
      const angle = 0.45 + h * 1.92 + i * 0.31;
      const elevation = 0.58 + h * 0.12;
      outward.set(
        Math.cos(angle) * Math.cos(elevation),
        Math.sin(elevation),
        Math.sin(angle) * Math.cos(elevation)
      ).normalize();

      dummy.position.set(
        berry.x + outward.x * berry.r * 0.91,
        0.565 + outward.y * berry.r * 0.78,
        berry.z + outward.z * berry.r * 0.91
      );
      dummy.quaternion.setFromUnitVectors(decalForward, outward);
      dummy.scale.set(0.020, 0.011, 1);
      dummy.updateMatrix();
      raspberry_highlights.setMatrixAt(highlightIndex++, dummy.matrix);
    }
  }
  raspberry_drupelets.instanceMatrix.needsUpdate = true;
  raspberry_highlights.instanceMatrix.needsUpdate = true;
  fruit_group.add(raspberry_drupelets, raspberry_highlights);

  const sauce_drip_data = [
    { x: -0.88, z: 0.12, sx: 0.090, sy: 0.024, sz: 0.055 },
    { x: -0.67, z: 0.55, sx: 0.075, sy: 0.020, sz: 0.060 },
    { x: -0.28, z: 0.78, sx: 0.085, sy: 0.025, sz: 0.050 },
    { x: 0.31, z: 0.76, sx: 0.070, sy: 0.021, sz: 0.060 },
    { x: 0.82, z: 0.25, sx: 0.082, sy: 0.023, sz: 0.052 },
    { x: 0.72, z: -0.32, sx: 0.070, sy: 0.020, sz: 0.058 },
    { x: -0.61, z: -0.24, sx: 0.080, sy: 0.022, sz: 0.050 },
    { x: 0.02, z: 0.48, sx: 0.060, sy: 0.018, sz: 0.045 }
  ];
  const sauce_drips = new THREE.InstancedMesh(
    glaze_edgeGeom,
    glazeMat,
    sauce_drip_data.length
  );
  sauce_drips.name = "sauce_drips";

  for (let i = 0; i < sauce_drip_data.length; i++) {
    const drip = sauce_drip_data[i];
    dummy.position.set(drip.x, 0.523, drip.z);
    dummy.rotation.set(0, i * 0.69, 0);
    dummy.scale.set(drip.sx, drip.sy, drip.sz);
    dummy.updateMatrix();
    sauce_drips.setMatrixAt(i, dummy.matrix);
  }
  sauce_drips.instanceMatrix.needsUpdate = true;
  filling_group.add(sauce_drips);

  const glaze_bubbleGeom = new THREE.SphereGeometry(1, 12, 7);
  const glaze_bubbles = new THREE.InstancedMesh(
    glaze_bubbleGeom,
    glazeMat,
    14
  );
  glaze_bubbles.name = "glaze_bubbles";

  for (let i = 0; i < 14; i++) {
    const angle = i * 2.399963229728653;
    const radius = 0.18 + ((i * 7) % 13) / 13 * 0.78;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const normalizedRadius = Math.min(1, radius / 1.19);
    const y =
      0.485 +
      0.065 * Math.sqrt(Math.max(0, 1 - normalizedRadius * normalizedRadius));

    dummy.position.set(x, y + 0.003, z);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(
      0.025 + 0.006 * (i % 3),
      0.008 + 0.002 * (i % 2),
      0.020 + 0.005 * ((i + 1) % 3)
    );
    dummy.updateMatrix();
    glaze_bubbles.setMatrixAt(i, dummy.matrix);
  }
  glaze_bubbles.instanceMatrix.needsUpdate = true;
  filling_group.add(glaze_bubbles);

  const glaze_highlightGeom = new THREE.CircleGeometry(1, 9);
  const glaze_highlights = new THREE.InstancedMesh(
    glaze_highlightGeom,
    highlightMat,
    18
  );
  glaze_highlights.name = "glaze_highlights";

  for (let i = 0; i < 18; i++) {
    const angle = i * 2.17 + 0.3;
    const radius = 0.16 + ((i * 11) % 17) / 17 * 0.83;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const normalizedRadius = Math.min(1, radius / 1.19);
    const surfaceY =
      0.485 +
      0.065 * Math.sqrt(Math.max(0, 1 - normalizedRadius * normalizedRadius));
    const epsilon = 0.01;
    const dydx =
      (-0.13 * x) / (1.19 * 1.19) -
      (0.13 * z * Math.sin(angle) * epsilon) /
        (1.19 * 1.19 * Math.max(0.001, 1 - normalizedRadius));
    const dydz =
      (-0.13 * z) / (1.19 * 1.19) -
      (0.13 * x * Math.cos(angle) * epsilon) /
        (1.19 * 1.19 * Math.max(0.001, 1 - normalizedRadius));

    outward.set(-dydx, 1, -dydz).normalize();
    dummy.position.set(x, surfaceY + 0.003, z);
    dummy.quaternion.setFromUnitVectors(decalForward, outward);
    dummy.scale.set(
      0.018 + 0.006 * (i % 3),
      0.008 + 0.003 * ((i + 1) % 3),
      1
    );
    dummy.updateMatrix();
    glaze_highlights.setMatrixAt(i, dummy.matrix);
  }
  glaze_highlights.instanceMatrix.needsUpdate = true;
  filling_group.add(glaze_highlights);

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