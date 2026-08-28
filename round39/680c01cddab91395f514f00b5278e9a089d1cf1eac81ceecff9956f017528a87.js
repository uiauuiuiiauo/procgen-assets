export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "galaxy_orb";

  const orbR = 1.0;
  const surfaceR = 1.006;
  const coreR = 0.97;

  const galaxy_coreGeom = new THREE.SphereGeometry(coreR, 64, 32);
  const galaxy_coreMat = new THREE.MeshStandardMaterial({
    color: 0x062b70,
    emissive: 0x032765,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.55,
  });
  const galaxy_core = new THREE.Mesh(galaxy_coreGeom, galaxy_coreMat);
  galaxy_core.name = "galaxy_core";
  root.add(galaxy_core);

  const deep_space_patchesGeom = new THREE.SphereGeometry(0.3, 24, 14);
  const deep_space_patchesMat = new THREE.MeshStandardMaterial({
    color: 0x01153f,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
  });
  const deepSpaceNormals = [
    new THREE.Vector3(-0.25, 0.35, 0.9).normalize(),
    new THREE.Vector3(0.35, 0.25, 0.9).normalize(),
    new THREE.Vector3(-0.15, -0.35, 0.92).normalize(),
    new THREE.Vector3(0.45, -0.25, 0.86).normalize(),
    new THREE.Vector3(-0.55, -0.1, 0.83).normalize(),
    new THREE.Vector3(0.12, 0.6, 0.79).normalize(),
    new THREE.Vector3(0.55, 0.5, 0.66).normalize(),
    new THREE.Vector3(-0.6, 0.45, 0.66).normalize(),
    new THREE.Vector3(0.2, -0.65, 0.73).normalize(),
    new THREE.Vector3(-0.45, -0.6, 0.66).normalize(),
    new THREE.Vector3(0.75, 0.05, 0.66).normalize(),
    new THREE.Vector3(-0.75, 0.1, 0.65).normalize(),
    new THREE.Vector3(0.35, 0.7, -0.63).normalize(),
    new THREE.Vector3(-0.4, -0.25, -0.88).normalize(),
    new THREE.Vector3(0.15, 0.45, -0.88).normalize(),
    new THREE.Vector3(0.55, -0.5, -0.67).normalize(),
    new THREE.Vector3(-0.6, -0.55, -0.58).normalize(),
    new THREE.Vector3(0.7, 0.3, -0.64).normalize(),
  ];
  const deep_space_patches = new THREE.InstancedMesh(
    deep_space_patchesGeom,
    deep_space_patchesMat,
    deepSpaceNormals.length
  );
  deep_space_patches.name = "deep_space_patches";
  const patchDummy = new THREE.Object3D();
  const patchForward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < deepSpaceNormals.length; i++) {
    const normal = deepSpaceNormals[i];
    patchDummy.position.copy(normal).multiplyScalar(0.974);
    patchDummy.quaternion.setFromUnitVectors(patchForward, normal);
    patchDummy.scale.set(
      0.95 + (i % 4) * 0.11,
      0.68 + (i % 3) * 0.1,
      0.04
    );
    patchDummy.updateMatrix();
    deep_space_patches.setMatrixAt(i, patchDummy.matrix);
  }
  deep_space_patches.instanceMatrix.needsUpdate = true;
  root.add(deep_space_patches);

  const nebula_cloudsGeom = new THREE.SphereGeometry(0.16, 18, 10);
  const cyan_nebula_cloudsMat = new THREE.MeshStandardMaterial({
    color: 0x00bde8,
    emissive: 0x00bde8,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const blue_nebula_cloudsMat = new THREE.MeshStandardMaterial({
    color: 0x174fd5,
    emissive: 0x174fd5,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  const violet_nebula_cloudsMat = new THREE.MeshStandardMaterial({
    color: 0x7048d8,
    emissive: 0x7048d8,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
  });

  function populateClouds(mesh, count, phase, radialBase) {
    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < count; i++) {
      const y = -0.88 + 1.76 * ((i + 0.5) / count);
      const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
      const angle = phase + i * 2.399963229728653;
      const normal = new THREE.Vector3(
        Math.cos(angle) * ringRadius,
        y,
        Math.sin(angle) * ringRadius
      );
      const radial = radialBase + 0.025 * (i % 5);
      dummy.position.copy(normal).multiplyScalar(radial);
      dummy.quaternion.setFromUnitVectors(up, normal);
      dummy.rotateY(phase + i * 0.71);
      dummy.scale.set(
        0.75 + 0.18 * (i % 4),
        0.11 + 0.025 * (i % 3),
        0.58 + 0.14 * ((i + 1) % 4)
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const cyan_nebula_clouds = new THREE.InstancedMesh(
    nebula_cloudsGeom,
    cyan_nebula_cloudsMat,
    24
  );
  cyan_nebula_clouds.name = "cyan_nebula_clouds";
  populateClouds(cyan_nebula_clouds, 24, 0.35, 0.9);
  root.add(cyan_nebula_clouds);

  const blue_nebula_clouds = new THREE.InstancedMesh(
    nebula_cloudsGeom,
    blue_nebula_cloudsMat,
    18
  );
  blue_nebula_clouds.name = "blue_nebula_clouds";
  populateClouds(blue_nebula_clouds, 18, 1.7, 0.92);
  root.add(blue_nebula_clouds);

  const violet_nebula_clouds = new THREE.InstancedMesh(
    nebula_cloudsGeom,
    violet_nebula_cloudsMat,
    14
  );
  violet_nebula_clouds.name = "violet_nebula_clouds";
  populateClouds(violet_nebula_clouds, 14, 3.05, 0.91);
  root.add(violet_nebula_clouds);

  const star_fieldGeom = new THREE.SphereGeometry(0.0065, 7, 5);
  const star_fieldMat = new THREE.MeshStandardMaterial({
    color: 0x8ff5ff,
    emissive: 0x8ff5ff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
  });
  const starCount = 420;
  const star_field = new THREE.InstancedMesh(
    star_fieldGeom,
    star_fieldMat,
    starCount
  );
  star_field.name = "star_field";
  const starDummy = new THREE.Object3D();
  for (let i = 0; i < starCount; i++) {
    const y = 1 - 2 * ((i + 0.5) / starCount);
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * 2.399963229728653;
    const radius = 0.965 + 0.006 * (i % 4);
    starDummy.position.set(
      Math.cos(angle) * ringRadius * radius,
      y * radius,
      Math.sin(angle) * ringRadius * radius
    );
    const size = i % 47 === 0 ? 2.2 : i % 13 === 0 ? 1.45 : 0.65 + 0.12 * (i % 5);
    starDummy.scale.setScalar(size);
    starDummy.updateMatrix();
    star_field.setMatrixAt(i, starDummy.matrix);
  }
  star_field.instanceMatrix.needsUpdate = true;
  root.add(star_field);

  const white_star_fieldMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
  });
  const whiteStarCount = 90;
  const white_star_field = new THREE.InstancedMesh(
    star_fieldGeom,
    white_star_fieldMat,
    whiteStarCount
  );
  white_star_field.name = "white_star_field";
  for (let i = 0; i < whiteStarCount; i++) {
    const y = 1 - 2 * ((i + 0.35) / whiteStarCount);
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = 0.8 + i * 2.399963229728653;
    const radius = 0.972 + 0.004 * (i % 3);
    starDummy.position.set(
      Math.cos(angle) * ringRadius * radius,
      y * radius,
      Math.sin(angle) * ringRadius * radius
    );
    const size = i % 19 === 0 ? 2.0 : 0.9 + 0.16 * (i % 4);
    starDummy.scale.setScalar(size);
    starDummy.updateMatrix();
    white_star_field.setMatrixAt(i, starDummy.matrix);
  }
  white_star_field.instanceMatrix.needsUpdate = true;
  root.add(white_star_field);

  const surface_streaksGeom = new THREE.SphereGeometry(1, 8, 5);
  const surface_streaksMat = new THREE.MeshStandardMaterial({
    color: 0x20eaff,
    emissive: 0x20eaff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
  });
  const streakNormals = [
    new THREE.Vector3(-0.3, 0.45, 0.84).normalize(),
    new THREE.Vector3(0.25, 0.5, 0.83).normalize(),
    new THREE.Vector3(0.55, 0.2, 0.8).normalize(),
    new THREE.Vector3(-0.5, 0.1, 0.86).normalize(),
    new THREE.Vector3(0.1, -0.25, 0.96).normalize(),
    new THREE.Vector3(0.5, -0.45, 0.74).normalize(),
    new THREE.Vector3(-0.25, -0.65, 0.72).normalize(),
    new THREE.Vector3(-0.6, -0.35, 0.72).normalize(),
    new THREE.Vector3(0.7, 0.4, 0.58).normalize(),
    new THREE.Vector3(-0.1, 0.75, 0.65).normalize(),
    new THREE.Vector3(0.2, 0.15, 0.97).normalize(),
    new THREE.Vector3(-0.4, -0.1, 0.91).normalize(),
    new THREE.Vector3(0.4, 0.65, 0.64).normalize(),
    new THREE.Vector3(-0.65, 0.55, 0.51).normalize(),
    new THREE.Vector3(0.65, -0.15, 0.74).normalize(),
    new THREE.Vector3(-0.15, -0.8, 0.58).normalize(),
    new THREE.Vector3(0.35, -0.7, 0.63).normalize(),
    new THREE.Vector3(-0.45, 0.75, 0.48).normalize(),
  ];
  const surface_streaks = new THREE.InstancedMesh(
    surface_streaksGeom,
    surface_streaksMat,
    streakNormals.length
  );
  surface_streaks.name = "surface_streaks";
  const streakDummy = new THREE.Object3D();
  const streakForward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < streakNormals.length; i++) {
    const normal = streakNormals[i];
    streakDummy.position.copy(normal).multiplyScalar(1.002);
    streakDummy.quaternion.setFromUnitVectors(streakForward, normal);
    streakDummy.rotateZ(-0.8 + i * 0.37);
    streakDummy.scale.set(
      0.011 + 0.003 * (i % 3),
      0.035 + 0.009 * (i % 4),
      0.003
    );
    streakDummy.updateMatrix();
    surface_streaks.setMatrixAt(i, streakDummy.matrix);
  }
  surface_streaks.instanceMatrix.needsUpdate = true;
  root.add(surface_streaks);

  const flareDirections = [
    new THREE.Vector3(-0.42, 0.34, 0.85).normalize(),
    new THREE.Vector3(0.48, 0.45, 0.75).normalize(),
    new THREE.Vector3(0.62, -0.2, 0.76).normalize(),
    new THREE.Vector3(-0.55, -0.32, 0.77).normalize(),
    new THREE.Vector3(0.18, -0.62, 0.76).normalize(),
    new THREE.Vector3(-0.12, 0.72, 0.68).normalize(),
    new THREE.Vector3(0.22, 0.08, 0.97).normalize(),
    new THREE.Vector3(-0.68, 0.1, 0.72).normalize(),
    new THREE.Vector3(0.42, -0.58, 0.69).normalize(),
    new THREE.Vector3(-0.2, -0.45, 0.87).normalize(),
    new THREE.Vector3(0.72, 0.18, 0.67).normalize(),
    new THREE.Vector3(-0.35, -0.72, 0.6).normalize(),
  ];

  const flare_centersGeom = new THREE.SphereGeometry(0.018, 12, 8);
  const flare_centersMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
  });
  const flare_centers = new THREE.InstancedMesh(
    flare_centersGeom,
    flare_centersMat,
    flareDirections.length
  );
  flare_centers.name = "flare_centers";

  const flare_horizontal_raysGeom = new THREE.SphereGeometry(1, 10, 6);
  const flare_horizontal_raysMat = new THREE.MeshStandardMaterial({
    color: 0x8fffff,
    emissive: 0x8fffff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
  });
  const flare_vertical_raysGeom = flare_horizontal_raysGeom;
  const flare_vertical_raysMat = flare_horizontal_raysMat;
  const flare_horizontal_rays = new THREE.InstancedMesh(
    flare_horizontal_raysGeom,
    flare_horizontal_raysMat,
    flareDirections.length
  );
  flare_horizontal_rays.name = "flare_horizontal_rays";
  const flare_vertical_rays = new THREE.InstancedMesh(
    flare_vertical_raysGeom,
    flare_vertical_raysMat,
    flareDirections.length
  );
  flare_vertical_rays.name = "flare_vertical_rays";

  const flareDummy = new THREE.Object3D();
  const flareForward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < flareDirections.length; i++) {
    const normal = flareDirections[i];
    flareDummy.position.copy(normal).multiplyScalar(1.008);
    flareDummy.quaternion.setFromUnitVectors(flareForward, normal);
    flareDummy.scale.setScalar(i % 4 === 0 ? 1.4 : 0.9 + 0.12 * (i % 3));
    flareDummy.updateMatrix();
    flare_centers.setMatrixAt(i, flareDummy.matrix);

    flareDummy.position.copy(normal).multiplyScalar(1.006);
    flareDummy.quaternion.setFromUnitVectors(flareForward, normal);
    flareDummy.scale.set(0.07 + 0.012 * (i % 3), 0.007, 0.003);
    flareDummy.updateMatrix();
    flare_horizontal_rays.setMatrixAt(i, flareDummy.matrix);

    flareDummy.scale.set(0.007, 0.09 + 0.012 * ((i + 1) % 3), 0.003);
    flareDummy.updateMatrix();
    flare_vertical_rays.setMatrixAt(i, flareDummy.matrix);
  }
  flare_centers.instanceMatrix.needsUpdate = true;
  flare_horizontal_rays.instanceMatrix.needsUpdate = true;
  flare_vertical_rays.instanceMatrix.needsUpdate = true;
  root.add(flare_horizontal_rays, flare_vertical_rays, flare_centers);

  const reflection_panelsGeom = new THREE.SphereGeometry(
    1.014,
    18,
    10,
    Math.PI / 2 - 0.36,
    0.72,
    Math.PI / 2 - 0.28,
    0.56
  );
  const reflection_panelsMat = new THREE.MeshBasicMaterial({
    color: 0xdce8f2,
    transparent: true,
    opacity: 0.52,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const panelDirections = [
    new THREE.Vector3(-0.38, 0.2, 0.9).normalize(),
    new THREE.Vector3(0.38, 0.18, 0.9).normalize(),
  ];
  const reflection_panels = new THREE.InstancedMesh(
    reflection_panelsGeom,
    reflection_panelsMat,
    panelDirections.length
  );
  reflection_panels.name = "reflection_panels";
  const panelDummy = new THREE.Object3D();
  const panelUp = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < panelDirections.length; i++) {
    panelDummy.position.set(0, 0, 0);
    panelDummy.quaternion.setFromUnitVectors(panelUp, panelDirections[i]);
    panelDummy.scale.set(1, 1, 1);
    panelDummy.updateMatrix();
    reflection_panels.setMatrixAt(i, panelDummy.matrix);
  }
  reflection_panels.instanceMatrix.needsUpdate = true;
  root.add(reflection_panels);

  const geodesic_wireframeGeom = new THREE.CylinderGeometry(
    0.004,
    0.004,
    1,
    6
  );
  const geodesic_wireframeMat = new THREE.MeshStandardMaterial({
    color: 0x1769b8,
    metalness: 0.5,
    roughness: 0.25,
  });
  const wireframeSegments = [];
  const ringLevels = [-0.9, -0.68, -0.4, 0, 0.38, 0.68, 0.9];
  const ringOffsets = [0.18, 0.58, 0.28, 0.66, 0.34, 0.62, 0.12];
  const ringCounts = [5, 7, 9, 10, 9, 7, 5];
  const ringNodes = [];

  for (let level = 0; level < ringLevels.length; level++) {
    const nodes = [];
    const y = ringLevels[level];
    const radius = Math.sqrt(1 - y * y) * 1.01;
    const count = ringCounts[level];
    const offset = ringOffsets[level];
    for (let i = 0; i < count; i++) {
      const angle = offset + (i / count) * Math.PI * 2;
      nodes.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }
    ringNodes.push(nodes);
  }

  for (let level = 0; level < ringNodes.length; level++) {
    const nodes = ringNodes[level];
    for (let i = 0; i < nodes.length; i++) {
      wireframeSegments.push([nodes[i], nodes[(i + 1) % nodes.length]]);
    }
  }

  for (let level = 0; level < ringNodes.length - 1; level++) {
    const lower = ringNodes[level];
    const upper = ringNodes[level + 1];
    for (let i = 0; i < lower.length; i++) {
      let bestNode = upper[0];
      let bestDistance = lower[i].distanceToSquared(upper[0]);
      for (let j = 1; j < upper.length; j++) {
        const distance = lower[i].distanceToSquared(upper[j]);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestNode = upper[j];
        }
      }
      wireframeSegments.push([lower[i], bestNode]);
    }
  }

  const geodesic_wireframe = new THREE.InstancedMesh(
    geodesic_wireframeGeom,
    geodesic_wireframeMat,
    wireframeSegments.length
  );
  geodesic_wireframe.name = "geodesic_wireframe";
  const wireframeDummy = new THREE.Object3D();
  const wireframeUp = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < wireframeSegments.length; i++) {
    const start = wireframeSegments[i][0];
    const end = wireframeSegments[i][1];
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    wireframeDummy.position.copy(start).add(end).multiplyScalar(0.5);
    wireframeDummy.quaternion.setFromUnitVectors(
      wireframeUp,
      direction.normalize()
    );
    wireframeDummy.scale.set(1, length, 1);
    wireframeDummy.updateMatrix();
    geodesic_wireframe.setMatrixAt(i, wireframeDummy.matrix);
  }
  geodesic_wireframe.instanceMatrix.needsUpdate = true;
  root.add(geodesic_wireframe);

  const nodeCount = 32;
  const wireframe_nodesGeom = new THREE.SphereGeometry(0.014, 10, 7);
  const wireframe_nodesMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const wireframe_nodes = new THREE.InstancedMesh(
    wireframe_nodesGeom,
    wireframe_nodesMat,
    nodeCount
  );
  wireframe_nodes.name = "wireframe_nodes";
  const nodeDummy = new THREE.Object3D();
  let nodeIndex = 0;
  for (let level = 1; level < ringNodes.length - 1; level++) {
    const nodes = ringNodes[level];
    for (let i = 0; i < nodes.length; i++) {
      nodeDummy.position.copy(nodes[i]);
      nodeDummy.scale.setScalar(level === 3 ? 1.2 : 0.9);
      nodeDummy.updateMatrix();
      wireframe_nodes.setMatrixAt(nodeIndex, nodeDummy.matrix);
      nodeIndex++;
    }
  }
  wireframe_nodes.instanceMatrix.needsUpdate = true;
  root.add(wireframe_nodes);

  const outer_shellGeom = new THREE.SphereGeometry(orbR, 64, 32);
  const outer_shellMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8dcff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  const outer_shell = new THREE.Mesh(outer_shellGeom, outer_shellMat);
  outer_shell.name = "outer_shell";
  root.add(outer_shell);

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