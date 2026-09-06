export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "purple_trumpet_flower";

  const bloom = new THREE.Group();
  bloom.name = "bloom";
  root.add(bloom);

  const corolla = new THREE.Group();
  corolla.name = "corolla";
  bloom.add(corolla);

  const reproductive_parts = new THREE.Group();
  reproductive_parts.name = "reproductive_parts";
  bloom.add(reproductive_parts);

  const petal_count = 6;
  const petal_length = 1.0;

  function petalHalfWidth(v) {
    const wave = Math.max(0, Math.sin(Math.PI * v));
    return 0.025 + 0.06 * v + 0.44 * Math.pow(wave, 0.72) * (0.9 + 0.1 * v);
  }

  function petalSurfaceZ(v, u) {
    const wave = Math.max(0, Math.sin(Math.PI * v));
    const funnel = -0.14 + 0.2 * Math.pow(1 - v, 1.8);
    const cupping = 0.07 * u * u * Math.pow(wave, 1.2);
    const rim_ripple =
      0.016 * Math.sin(v * 14.0 + u * 2.2) * Math.pow(v, 5);
    const edge_ripple =
      0.012 * Math.sin(u * Math.PI * 3.0) * Math.pow(Math.abs(u), 4);
    return funnel + cupping + rim_ripple + edge_ripple;
  }

  function createPetalGeometry() {
    const length_segments = 24;
    const width_segments = 14;
    const row_size = width_segments + 1;
    const surface_count = (length_segments + 1) * row_size;
    const positions = [];
    const colors = [];
    const indices = [];

    const base_color = new THREE.Color(0xdffcff);
    const inner_color = new THREE.Color(0x98b9ff);
    const outer_color = new THREE.Color(0x7258d2);
    const edge_color = new THREE.Color(0x8b70e2);
    const color = new THREE.Color();

    for (let layer = 0; layer < 2; layer++) {
      for (let iy = 0; iy <= length_segments; iy++) {
        const v = iy / length_segments;
        const half_width = petalHalfWidth(v);

        for (let ix = 0; ix <= width_segments; ix++) {
          const u = ix / width_segments * 2 - 1;
          const x = u * half_width;
          const y = v * petal_length;
          const top_z = petalSurfaceZ(v, u);
          const thickness = 0.018 + 0.004 * (1 - v);
          const z = layer === 0 ? top_z : top_z - thickness;

          positions.push(x, y, z);

          if (layer === 0) {
            if (v < 0.42) {
              color.copy(base_color).lerp(inner_color, v / 0.42);
            } else {
              color.copy(inner_color).lerp(
                outer_color,
                (v - 0.42) / 0.58
              );
            }
            const edge_factor =
              Math.pow(Math.abs(u), 3) * Math.sin(Math.PI * v) * 0.14;
            color.lerp(edge_color, edge_factor);
          } else {
            color.copy(inner_color).lerp(outer_color, 0.25 + v * 0.75);
            color.multiplyScalar(0.82);
          }
          colors.push(color.r, color.g, color.b);
        }
      }
    }

    for (let iy = 0; iy < length_segments; iy++) {
      for (let ix = 0; ix < width_segments; ix++) {
        const a = iy * row_size + ix;
        const b = a + 1;
        const c = a + row_size;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);

        const ab = surface_count + a;
        const bb = surface_count + b;
        const cb = surface_count + c;
        const db = surface_count + d;
        indices.push(ab, cb, bb, bb, cb, db);
      }
    }

    for (let iy = 0; iy < length_segments; iy++) {
      const left_top = iy * row_size;
      const left_next_top = left_top + row_size;
      const left_bottom = surface_count + left_top;
      const left_next_bottom = surface_count + left_next_top;
      indices.push(
        left_top,
        left_next_top,
        left_bottom,
        left_bottom,
        left_next_top,
        left_next_bottom
      );

      const right_top = iy * row_size + width_segments;
      const right_next_top = right_top + row_size;
      const right_bottom = surface_count + right_top;
      const right_next_bottom = surface_count + right_next_top;
      indices.push(
        right_top,
        right_bottom,
        right_next_top,
        right_bottom,
        right_next_bottom,
        right_next_top
      );
    }

    for (let ix = 0; ix < width_segments; ix++) {
      const base_top_a = ix;
      const base_top_b = ix + 1;
      const base_bottom_a = surface_count + ix;
      const base_bottom_b = surface_count + ix + 1;
      indices.push(
        base_top_a,
        base_bottom_a,
        base_top_b,
        base_bottom_a,
        base_bottom_b,
        base_top_b
      );

      const tip_start = length_segments * row_size;
      const tip_top_a = tip_start + ix;
      const tip_top_b = tip_start + ix + 1;
      const tip_bottom_a = surface_count + tip_top_a;
      const tip_bottom_b = surface_count + tip_top_b;
      indices.push(
        tip_top_a,
        tip_top_b,
        tip_bottom_a,
        tip_bottom_b,
        tip_top_b,
        tip_bottom_b
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const petalGeom = createPetalGeometry();
  const petalMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    vertexColors: true,
    side: THREE.DoubleSide
  });

  const petals = new THREE.InstancedMesh(petalGeom, petalMat, petal_count);
  petals.name = "petals";
  corolla.add(petals);

  const petal_angles = [0, 0.94, 1.9, 3.03, 4.05, 5.18];
  const petal_width_scales = [0.96, 1.06, 0.92, 1.02, 0.98, 1.08];
  const petal_length_scales = [1.08, 1.0, 1.06, 1.07, 0.98, 1.02];
  const petal_depth_offsets = [-0.035, -0.015, 0.01, 0.025, 0.0, -0.02];
  const petal_tilts = [0.025, -0.035, 0.04, -0.02, 0.03, -0.04];
  const petal_rolls = [-0.03, 0.025, -0.02, 0.035, -0.025, 0.02];
  const petal_matrices = [];
  const petal_dummy = new THREE.Object3D();

  for (let i = 0; i < petal_count; i++) {
    petal_dummy.position.set(0, 0, petal_depth_offsets[i]);
    petal_dummy.rotation.set(
      petal_tilts[i],
      petal_rolls[i],
      petal_angles[i]
    );
    petal_dummy.scale.set(
      petal_width_scales[i],
      petal_length_scales[i],
      1
    );
    petal_dummy.updateMatrix();
    const matrix = petal_dummy.matrix.clone();
    petal_matrices.push(matrix);
    petals.setMatrixAt(i, matrix);
  }
  petals.instanceMatrix.needsUpdate = true;

  function createVeinGeometry(base_width, end_width, radius) {
    const points = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const v = 0.1 + 0.79 * t;
      const target_width =
        base_width + (end_width - base_width) * t;
      const u = target_width / petalHalfWidth(v);
      points.push(
        new THREE.Vector3(
          target_width,
          v * petal_length,
          petalSurfaceZ(v, u) + 0.007
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 24, radius, 6, false);
  }

  function configureRadialInstances(mesh, angle_offset) {
    const transform_dummy = new THREE.Object3D();
    let index = 0;

    for (let i = 0; i < petal_count; i++) {
      for (const side of [-1, 1]) {
        transform_dummy.position.set(0, 0, 0);
        transform_dummy.rotation.set(0, 0, 0);
        transform_dummy.scale.set(1, 1, 1);
        transform_dummy.updateMatrix();

        const side_matrix = new THREE.Matrix4().makeScale(side, 1, 1);
        const final_matrix = new THREE.Matrix4().multiplyMatrices(
          petal_matrices[i],
          side_matrix
        );
        final_matrix.multiply(transform_dummy.matrix);
        mesh.setMatrixAt(index, final_matrix);
        index++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.rotateZ(angle_offset);
  }

  const petal_veins = new THREE.Group();
  petal_veins.name = "petal_veins";
  corolla.add(petal_veins);

  const central_veinGeom = createVeinGeometry(0, 0, 0.0045);
  const central_veinMat = new THREE.MeshStandardMaterial({
    color: 0x654fc0,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.28
  });
  const central_veins = new THREE.InstancedMesh(
    central_veinGeom,
    central_veinMat,
    petal_count * 2
  );
  central_veins.name = "central_veins";
  configureRadialInstances(central_veins, 0);
  petal_veins.add(central_veins);

  const inner_veinGeom = createVeinGeometry(-0.07, -0.19, 0.0034);
  const inner_veinMat = new THREE.MeshStandardMaterial({
    color: 0x715bd2,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.23
  });
  const inner_veins = new THREE.InstancedMesh(
    inner_veinGeom,
    inner_veinMat,
    petal_count * 2
  );
  inner_veins.name = "inner_veins";
  configureRadialInstances(inner_veins, -0.105);
  petal_veins.add(inner_veins);

  const outer_veinGeom = createVeinGeometry(-0.15, -0.35, 0.0031);
  const outer_veinMat = new THREE.MeshStandardMaterial({
    color: 0x604ac0,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.2
  });
  const outer_veins = new THREE.InstancedMesh(
    outer_veinGeom,
    outer_veinMat,
    petal_count * 2
  );
  outer_veins.name = "outer_veins";
  configureRadialInstances(outer_veins, -0.22);
  petal_veins.add(outer_veins);

  const central_throatGeom = new THREE.CylinderGeometry(
    0.115,
    0.05,
    0.22,
    32,
    2,
    true
  );
  const central_throatMat = new THREE.MeshStandardMaterial({
    color: 0xcbd8ff,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const central_throat = new THREE.Mesh(
    central_throatGeom,
    central_throatMat
  );
  central_throat.name = "central_throat";
  central_throat.rotation.x = Math.PI / 2;
  central_throat.position.z = 0.04;
  reproductive_parts.add(central_throat);

  const throat_rimGeom = new THREE.TorusGeometry(0.112, 0.009, 8, 32);
  const throat_rimMat = new THREE.MeshStandardMaterial({
    color: 0xe0e8ff,
    metalness: 0.0,
    roughness: 0.7
  });
  const throat_rim = new THREE.Mesh(throat_rimGeom, throat_rimMat);
  throat_rim.name = "throat_rim";
  throat_rim.position.z = 0.153;
  reproductive_parts.add(throat_rim);

  const pistilGeom = new THREE.CylinderGeometry(0.012, 0.014, 0.36, 10);
  const pistilMat = new THREE.MeshStandardMaterial({
    color: 0xd8d5f2,
    metalness: 0.0,
    roughness: 0.7
  });
  const pistil = new THREE.Mesh(pistilGeom, pistilMat);
  pistil.name = "pistil";
  pistil.rotation.x = Math.PI / 2;
  pistil.position.set(0, 0.01, 0.33);
  reproductive_parts.add(pistil);

  const stigma_lobesGeom = new THREE.SphereGeometry(1, 12, 8);
  const stigma_lobesMat = new THREE.MeshStandardMaterial({
    color: 0xc7b8e8,
    metalness: 0.0,
    roughness: 0.7
  });
  const stigma_lobes = new THREE.InstancedMesh(
    stigma_lobesGeom,
    stigma_lobesMat,
    3
  );
  stigma_lobes.name = "stigma_lobes";
  const stigma_dummy = new THREE.Object3D();

  for (let i = 0; i < 3; i++) {
    const angle = i / 3 * Math.PI * 2;
    stigma_dummy.position.set(
      Math.cos(angle) * 0.027,
      0.01 + Math.sin(angle) * 0.027,
      0.515
    );
    stigma_dummy.rotation.set(0, 0, angle);
    stigma_dummy.scale.set(0.038, 0.022, 0.027);
    stigma_dummy.updateMatrix();
    stigma_lobes.setMatrixAt(i, stigma_dummy.matrix);
  }
  stigma_lobes.instanceMatrix.needsUpdate = true;
  reproductive_parts.add(stigma_lobes);

  const stamen_data = [
    [-0.13, 0.17, 0.44, -0.38],
    [0.14, 0.16, 0.47, 0.36],
    [-0.04, 0.25, 0.39, -0.72],
    [0.08, -0.03, 0.43, 0.18],
    [-0.16, -0.02, 0.36, -0.42]
  ];

  const filamentsGeom = new THREE.CylinderGeometry(0.011, 0.013, 1, 10);
  const filamentsMat = new THREE.MeshStandardMaterial({
    color: 0xd9d7f3,
    metalness: 0.0,
    roughness: 0.7
  });
  const filaments = new THREE.InstancedMesh(
    filamentsGeom,
    filamentsMat,
    stamen_data.length
  );
  filaments.name = "filaments";

  const anthersGeom = new THREE.SphereGeometry(1, 14, 9);
  const anthersMat = new THREE.MeshStandardMaterial({
    color: 0xb9a7dc,
    metalness: 0.0,
    roughness: 0.7
  });
  const anthers = new THREE.InstancedMesh(
    anthersGeom,
    anthersMat,
    stamen_data.length
  );
  anthers.name = "anthers";

  const filament_dummy = new THREE.Object3D();
  const anther_dummy = new THREE.Object3D();
  const y_axis = new THREE.Vector3(0, 1, 0);
  const start = new THREE.Vector3();
  const end = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const midpoint = new THREE.Vector3();

  for (let i = 0; i < stamen_data.length; i++) {
    const data = stamen_data[i];
    start.set(data[0] * 0.18, data[1] * 0.18, 0.145);
    end.set(data[0], data[1], data[2]);
    direction.subVectors(end, start);
    const filament_length = direction.length();
    direction.normalize();
    midpoint.addVectors(start, end).multiplyScalar(0.5);

    filament_dummy.position.copy(midpoint);
    filament_dummy.quaternion.setFromUnitVectors(y_axis, direction);
    filament_dummy.scale.set(1, filament_length, 1);
    filament_dummy.updateMatrix();
    filaments.setMatrixAt(i, filament_dummy.matrix);

    anther_dummy.position.copy(end);
    anther_dummy.quaternion.setFromUnitVectors(y_axis, direction);
    anther_dummy.scale.set(0.034, 0.057, 0.029);
    anther_dummy.updateMatrix();
    anthers.setMatrixAt(i, anther_dummy.matrix);
  }

  filaments.instanceMatrix.needsUpdate = true;
  anthers.instanceMatrix.needsUpdate = true;
  reproductive_parts.add(filaments);
  reproductive_parts.add(anthers);

  fitToUnitCube(THREE, root);
  return root;

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
}