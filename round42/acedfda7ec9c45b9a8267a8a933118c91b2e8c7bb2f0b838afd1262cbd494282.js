export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "carbonated_water_glass";

  const glass_vessel = new THREE.Group();
  glass_vessel.name = "glass_vessel";
  root.add(glass_vessel);

  const liquid_contents = new THREE.Group();
  liquid_contents.name = "liquid_contents";
  root.add(liquid_contents);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8e2e2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0f5f3,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.82,
    ior: 1.33,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const water_surfaceMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.72,
    ior: 1.33,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });

  const bubble_shellMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const base_footProfile = [
    new THREE.Vector2(0.000, 0.012),
    new THREE.Vector2(0.190, 0.012),
    new THREE.Vector2(0.270, 0.017),
    new THREE.Vector2(0.305, 0.030),
    new THREE.Vector2(0.315, 0.045),
    new THREE.Vector2(0.305, 0.061),
    new THREE.Vector2(0.270, 0.076),
    new THREE.Vector2(0.215, 0.091),
    new THREE.Vector2(0.185, 0.108),
    new THREE.Vector2(0.000, 0.108)
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile, 64);
  const base_foot = new THREE.Mesh(base_footGeom, glassMat);
  base_foot.name = "base_foot";
  base_foot.renderOrder = 3;
  glass_vessel.add(base_foot);

  const base_outer_ringGeom = new THREE.TorusGeometry(0.292, 0.011, 10, 64);
  const base_outer_ring = new THREE.Mesh(base_outer_ringGeom, glass_edgeMat);
  base_outer_ring.name = "base_outer_ring";
  base_outer_ring.rotation.x = Math.PI / 2;
  base_outer_ring.position.y = 0.036;
  base_outer_ring.renderOrder = 4;
  glass_vessel.add(base_outer_ring);

  const base_inner_ringGeom = new THREE.TorusGeometry(0.194, 0.008, 10, 64);
  const base_inner_ring = new THREE.Mesh(base_inner_ringGeom, glass_edgeMat);
  base_inner_ring.name = "base_inner_ring";
  base_inner_ring.rotation.x = Math.PI / 2;
  base_inner_ring.position.y = 0.096;
  base_inner_ring.renderOrder = 4;
  glass_vessel.add(base_inner_ring);

  const glass_bodyProfile = [
    new THREE.Vector2(0.184, 0.088),
    new THREE.Vector2(0.191, 0.130),
    new THREE.Vector2(0.203, 0.240),
    new THREE.Vector2(0.216, 0.480),
    new THREE.Vector2(0.236, 0.820),
    new THREE.Vector2(0.258, 1.180),
    new THREE.Vector2(0.282, 1.550),
    new THREE.Vector2(0.305, 1.900),
    new THREE.Vector2(0.327, 2.190),
    new THREE.Vector2(0.343, 2.300),
    new THREE.Vector2(0.348, 2.332),
    new THREE.Vector2(0.342, 2.350),
    new THREE.Vector2(0.326, 2.350),
    new THREE.Vector2(0.321, 2.326),
    new THREE.Vector2(0.316, 2.190),
    new THREE.Vector2(0.294, 1.900),
    new THREE.Vector2(0.271, 1.550),
    new THREE.Vector2(0.248, 1.180),
    new THREE.Vector2(0.226, 0.820),
    new THREE.Vector2(0.206, 0.480),
    new THREE.Vector2(0.193, 0.240),
    new THREE.Vector2(0.174, 0.145),
    new THREE.Vector2(0.174, 0.110),
    new THREE.Vector2(0.184, 0.088)
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glassMat);
  glass_body.name = "glass_body";
  glass_body.renderOrder = 3;
  glass_vessel.add(glass_body);

  const top_rimGeom = new THREE.TorusGeometry(0.337, 0.011, 12, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, glass_edgeMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 2.337;
  top_rim.renderOrder = 4;
  glass_vessel.add(top_rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.322, 0.005, 8, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, glass_edgeMat);
  inner_rim.name = "inner_rim";
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 2.329;
  inner_rim.renderOrder = 4;
  glass_vessel.add(inner_rim);

  const waterBottom = 0.145;
  const waterTop = 1.720;
  const waterHeight = waterTop - waterBottom;
  const waterBottomR = 0.169;
  const waterTopR = 0.282;

  const water_volumeGeom = new THREE.CylinderGeometry(
    waterTopR,
    waterBottomR,
    waterHeight,
    64,
    1,
    false
  );
  const water_volume = new THREE.Mesh(water_volumeGeom, waterMat);
  water_volume.name = "water_volume";
  water_volume.position.y = waterBottom + waterHeight / 2;
  water_volume.renderOrder = 1;
  liquid_contents.add(water_volume);

  const water_surfaceGeom = new THREE.CircleGeometry(waterTopR, 64);
  const water_surface = new THREE.Mesh(water_surfaceGeom, water_surfaceMat);
  water_surface.name = "water_surface";
  water_surface.rotation.x = -Math.PI / 2;
  water_surface.position.y = waterTop + 0.003;
  water_surface.renderOrder = 2;
  liquid_contents.add(water_surface);

  const water_meniscusGeom = new THREE.TorusGeometry(
    waterTopR - 0.006,
    0.006,
    8,
    64
  );
  const water_meniscus = new THREE.Mesh(water_meniscusGeom, water_surfaceMat);
  water_meniscus.name = "water_meniscus";
  water_meniscus.rotation.x = Math.PI / 2;
  water_meniscus.position.y = waterTop + 0.005;
  water_meniscus.renderOrder = 2;
  liquid_contents.add(water_meniscus);

  const water_bottom_meniscusGeom = new THREE.TorusGeometry(
    waterBottomR - 0.005,
    0.005,
    8,
    48
  );
  const water_bottom_meniscus = new THREE.Mesh(
    water_bottom_meniscusGeom,
    water_surfaceMat
  );
  water_bottom_meniscus.name = "water_bottom_meniscus";
  water_bottom_meniscus.rotation.x = Math.PI / 2;
  water_bottom_meniscus.position.y = waterBottom + 0.008;
  water_bottom_meniscus.renderOrder = 2;
  liquid_contents.add(water_bottom_meniscus);

  const bubble_count = 1050;
  const bubblesGeom = new THREE.SphereGeometry(1, 8, 6);
  const bubbles = new THREE.InstancedMesh(
    bubblesGeom,
    bubbleMat,
    bubble_count
  );
  bubbles.name = "bubbles";
  bubbles.renderOrder = 2;
  bubbles.frustumCulled = false;

  const bubble_shellsGeom = new THREE.SphereGeometry(1, 7, 5);
  const bubble_shells = new THREE.InstancedMesh(
    bubble_shellsGeom,
    bubble_shellMat,
    bubble_count
  );
  bubble_shells.name = "bubble_shells";
  bubble_shells.renderOrder = 2;
  bubble_shells.frustumCulled = false;

  const bubble_dummy = new THREE.Object3D();
  const bubble_shell_dummy = new THREE.Object3D();
  const bubble_min_y = waterBottom + 0.025;
  const bubble_max_y = waterTop - 0.025;

  for (let i = 0; i < bubble_count; i++) {
    const height_fraction = ((i * 613) % 1051) / 1050;
    const radial_fraction = ((i * 307) % 1049) / 1048;
    const angle_fraction = ((i * 577) % 1043) / 1042;
    const size_fraction = ((i * 43) % 101) / 100;
    const shape_fraction = ((i * 31) % 97) / 96;
    const style = i % 16;

    const y = bubble_min_y + (bubble_max_y - bubble_min_y) * height_fraction;
    const angle =
      angle_fraction * Math.PI * 2 +
      Math.sin(i * 0.73) * 0.12;
    const local_radius =
      waterBottomR +
      (waterTopR - waterBottomR) *
        ((y - waterBottom) / waterHeight);

    let radial_factor = 0.88 * Math.sqrt(radial_fraction);
    if (style < 2) {
      radial_factor *= 0.18;
    } else if (style === 2 || style === 3) {
      radial_factor *= 0.58;
    } else if (style === 4) {
      radial_factor = Math.min(0.9, radial_factor * 0.82 + 0.12);
    }

    const wall_margin = style < 4 ? 0.004 : 0.014;
    const max_x = Math.max(
      0.004,
      local_radius * radial_factor - wall_margin
    );
    const x = Math.cos(angle) * max_x;
    const z = Math.sin(angle) * max_x;

    let size = 0.0022 + size_fraction * 0.0048;
    if (style < 4) size *= 0.72;
    if (style < 2) size *= 0.65;
    if (style === 6 || style === 12) size *= 1.3;

    const sx = size * (0.84 + shape_fraction * 0.18);
    const sy = size * (0.88 + (1 - shape_fraction) * 0.24);
    const sz = size * (0.86 + shape_fraction * 0.16);

    bubble_dummy.position.set(x, y, z);
    bubble_dummy.scale.set(sx, sy, sz);
    bubble_dummy.rotation.set(0, 0, 0);
    bubble_dummy.updateMatrix();
    bubbles.setMatrixAt(i, bubble_dummy.matrix);

    bubble_shell_dummy.position.set(x, y, z);
    bubble_shell_dummy.scale.set(sx * 1.24, sy * 1.24, sz * 1.24);
    bubble_shell_dummy.rotation.set(0, 0, 0);
    bubble_shell_dummy.updateMatrix();
    bubble_shells.setMatrixAt(i, bubble_shell_dummy.matrix);
  }

  bubbles.instanceMatrix.needsUpdate = true;
  bubble_shells.instanceMatrix.needsUpdate = true;
  liquid_contents.add(bubbles);
  liquid_contents.add(bubble_shells);

  const surface_bubble_count = 120;
  const surface_bubbles = new THREE.InstancedMesh(
    bubblesGeom,
    bubbleMat,
    surface_bubble_count
  );
  surface_bubbles.name = "surface_bubbles";
  surface_bubbles.renderOrder = 2;
  surface_bubbles.frustumCulled = false;

  const surface_bubble_dummy = new THREE.Object3D();
  for (let i = 0; i < surface_bubble_count; i++) {
    const radial_fraction =
      (((i * 47) % surface_bubble_count) / surface_bubble_count) * 0.98;
    const angle =
      (((i * 73) % surface_bubble_count) / surface_bubble_count) *
      Math.PI * 2;
    const radius = waterTopR * 0.93 * Math.sqrt(radial_fraction);
    const size =
      0.0035 +
      (((i * 19) % 29) / 28) * 0.0055;

    surface_bubble_dummy.position.set(
      Math.cos(angle) * radius,
      waterTop + 0.006 + ((i * 7) % 4) * 0.0012,
      Math.sin(angle) * radius
    );
    surface_bubble_dummy.scale.set(size, size * 0.62, size);
    surface_bubble_dummy.rotation.set(0, 0, 0);
    surface_bubble_dummy.updateMatrix();
    surface_bubbles.setMatrixAt(i, surface_bubble_dummy.matrix);
  }
  surface_bubbles.instanceMatrix.needsUpdate = true;
  liquid_contents.add(surface_bubbles);

  const reflectionGeom = new THREE.SphereGeometry(1, 16, 8);

  const left_reflection = new THREE.Mesh(reflectionGeom, reflectionMat);
  left_reflection.name = "left_reflection";
  left_reflection.position.set(-0.145, 1.965, 0.294);
  left_reflection.rotation.y = -0.45;
  left_reflection.scale.set(0.026, 0.245, 0.003);
  left_reflection.renderOrder = 5;
  glass_vessel.add(left_reflection);

  const right_reflection = new THREE.Mesh(reflectionGeom, reflectionMat);
  right_reflection.name = "right_reflection";
  right_reflection.position.set(0.175, 1.930, 0.286);
  right_reflection.rotation.y = 0.52;
  right_reflection.scale.set(0.018, 0.205, 0.003);
  right_reflection.renderOrder = 5;
  glass_vessel.add(right_reflection);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}