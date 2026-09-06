export default function generate(THREE) {
  const root = new THREE.Group();
  const wooden_block = new THREE.Group();
  wooden_block.name = "wooden_block";
  root.add(wooden_block);

  const block_length = 2.55;
  const block_height = 0.78;
  const block_depth = 0.82;
  const corner_radius = 0.15;
  const bevel_size = 0.055;
  const bevel_thickness = 0.07;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa96832,
    metalness: 0.0,
    roughness: 0.6
  });

  const end_capMat = new THREE.MeshStandardMaterial({
    color: 0x573326,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const top_grainMat = new THREE.MeshStandardMaterial({
    color: 0x4b281d,
    metalness: 0.0,
    roughness: 0.9
  });

  const side_grainMat = top_grainMat;

  const light_grainMat = new THREE.MeshStandardMaterial({
    color: 0xd28a45,
    metalness: 0.0,
    roughness: 0.6
  });

  const end_grainMat = new THREE.MeshStandardMaterial({
    color: 0x302019,
    metalness: 0.0,
    roughness: 0.9
  });

  const end_crackMat = new THREE.MeshStandardMaterial({
    color: 0x21130f,
    metalness: 0.0,
    roughness: 0.9
  });

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    return shape;
  }

  const bodyShape = makeRoundedRectShape(
    block_depth - bevel_size * 2,
    block_height - bevel_size * 2,
    corner_radius
  );

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: block_length - bevel_thickness * 2,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: bevel_thickness,
    bevelSize: bevel_size,
    bevelSegments: 5
  });

  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.rotation.y = Math.PI / 2;
  body.position.x = -block_length / 2 + bevel_thickness;
  wooden_block.add(body);

  const end_capShape = makeRoundedRectShape(
    block_depth - bevel_size * 2.2,
    block_height - bevel_size * 2.2,
    corner_radius * 0.82
  );
  const end_capGeom = new THREE.ShapeGeometry(end_capShape, 12);

  const front_end_cap = new THREE.Mesh(end_capGeom, end_capMat);
  front_end_cap.name = "front_end_cap";
  front_end_cap.rotation.y = Math.PI / 2;
  front_end_cap.position.x = block_length / 2 + 0.004;
  wooden_block.add(front_end_cap);

  const rear_end_cap = new THREE.Mesh(end_capGeom, end_capMat);
  rear_end_cap.name = "rear_end_cap";
  rear_end_cap.rotation.y = -Math.PI / 2;
  rear_end_cap.position.x = -block_length / 2 - 0.004;
  wooden_block.add(rear_end_cap);

  const top_grainGeom = new THREE.BoxGeometry(1, 0.006, 0.011);
  const top_grain_count = 34;
  const top_grain = new THREE.InstancedMesh(
    top_grainGeom,
    top_grainMat,
    top_grain_count
  );
  top_grain.name = "top_grain";

  const top_grain_transform = new THREE.Object3D();
  for (let i = 0; i < top_grain_count; i++) {
    const z = -0.27 + (((i * 13) % 37) / 36) * 0.54;
    const x = -1.08 + (((i * 17) % 41) / 40) * 2.16;
    const length = 0.16 + ((i * 7) % 13) * 0.047;
    const width_scale = 0.55 + ((i * 5) % 7) * 0.11;

    top_grain_transform.position.set(x, block_height / 2 + 0.004, z);
    top_grain_transform.rotation.set(0, 0, 0);
    top_grain_transform.scale.set(length, 1, width_scale);
    top_grain_transform.updateMatrix();
    top_grain.setMatrixAt(i, top_grain_transform.matrix);
  }
  top_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(top_grain);

  const side_grainGeom = new THREE.BoxGeometry(1, 0.009, 0.006);
  const side_grain_per_side = 28;
  const side_grain = new THREE.InstancedMesh(
    side_grainGeom,
    side_grainMat,
    side_grain_per_side * 2
  );
  side_grain.name = "side_grain";

  const side_grain_transform = new THREE.Object3D();
  let side_grain_index = 0;
  for (let side = 0; side < 2; side++) {
    const z = side === 0
      ? block_depth / 2 + 0.004
      : -block_depth / 2 - 0.004;

    for (let i = 0; i < side_grain_per_side; i++) {
      const y = -0.29 + (((i * 11 + side * 3) % 29) / 28) * 0.58;
      const x = -1.08 + (((i * 19 + side * 7) % 31) / 30) * 2.16;
      const length = 0.14 + ((i * 9 + side * 2) % 12) * 0.052;
      const height_scale = 0.55 + ((i * 3) % 6) * 0.12;

      side_grain_transform.position.set(x, y, z);
      side_grain_transform.rotation.set(0, 0, 0);
      side_grain_transform.scale.set(length, height_scale, 1);
      side_grain_transform.updateMatrix();
      side_grain.setMatrixAt(side_grain_index, side_grain_transform.matrix);
      side_grain_index++;
    }
  }
  side_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(side_grain);

  const top_highlightsGeom = new THREE.BoxGeometry(1, 0.004, 0.009);
  const top_highlights_count = 15;
  const top_highlights = new THREE.InstancedMesh(
    top_highlightsGeom,
    light_grainMat,
    top_highlights_count
  );
  top_highlights.name = "top_highlights";

  const top_highlights_transform = new THREE.Object3D();
  for (let i = 0; i < top_highlights_count; i++) {
    const z = -0.25 + (((i * 9 + 4) % 19) / 18) * 0.50;
    const x = -0.98 + (((i * 13 + 2) % 23) / 22) * 1.96;
    const length = 0.22 + ((i * 5) % 9) * 0.06;

    top_highlights_transform.position.set(
      x,
      block_height / 2 + 0.003,
      z
    );
    top_highlights_transform.rotation.set(0, 0, 0);
    top_highlights_transform.scale.set(length, 1, 0.65 + (i % 4) * 0.12);
    top_highlights_transform.updateMatrix();
    top_highlights.setMatrixAt(i, top_highlights_transform.matrix);
  }
  top_highlights.instanceMatrix.needsUpdate = true;
  wooden_block.add(top_highlights);

  const side_highlightsGeom = new THREE.BoxGeometry(1, 0.007, 0.004);
  const side_highlights_count = 18;
  const side_highlights = new THREE.InstancedMesh(
    side_highlightsGeom,
    light_grainMat,
    side_highlights_count
  );
  side_highlights.name = "side_highlights";

  const side_highlights_transform = new THREE.Object3D();
  for (let i = 0; i < side_highlights_count; i++) {
    const y = -0.27 + (((i * 7 + 3) % 19) / 18) * 0.54;
    const x = -1.0 + (((i * 11 + 1) % 21) / 20) * 2.0;
    const length = 0.18 + ((i * 3) % 8) * 0.055;

    side_highlights_transform.position.set(
      x,
      y,
      block_depth / 2 + 0.003
    );
    side_highlights_transform.rotation.set(0, 0, 0);
    side_highlights_transform.scale.set(length, 0.7 + (i % 3) * 0.15, 1);
    side_highlights_transform.updateMatrix();
    side_highlights.setMatrixAt(i, side_highlights_transform.matrix);
  }
  side_highlights.instanceMatrix.needsUpdate = true;
  wooden_block.add(side_highlights);

  const end_grainGeom = new THREE.BoxGeometry(0.006, 1, 0.008);
  const end_grain_count = 18;
  const end_grain = new THREE.InstancedMesh(
    end_grainGeom,
    end_grainMat,
    end_grain_count
  );
  end_grain.name = "end_grain";

  const end_grain_transform = new THREE.Object3D();
  for (let i = 0; i < end_grain_count; i++) {
    const z = -0.27 + (((i * 7) % 19) / 18) * 0.54;
    const y = -0.23 + (((i * 11 + 2) % 17) / 16) * 0.46;
    const length = 0.05 + ((i * 5) % 8) * 0.018;
    const angle = -0.65 + (((i * 3) % 11) / 10) * 1.3;

    end_grain_transform.position.set(
      block_length / 2 + 0.009,
      y,
      z
    );
    end_grain_transform.rotation.set(angle, 0, 0);
    end_grain_transform.scale.set(1, length, 0.7 + (i % 3) * 0.16);
    end_grain_transform.updateMatrix();
    end_grain.setMatrixAt(i, end_grain_transform.matrix);
  }
  end_grain.instanceMatrix.needsUpdate = true;
  wooden_block.add(end_grain);

  const end_crackPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(block_length / 2 + 0.012, 0.19, 0.11),
    new THREE.Vector3(block_length / 2 + 0.013, 0.12, 0.075),
    new THREE.Vector3(block_length / 2 + 0.012, 0.04, 0.09),
    new THREE.Vector3(block_length / 2 + 0.013, -0.05, 0.02),
    new THREE.Vector3(block_length / 2 + 0.012, -0.16, -0.01)
  ]);
  const end_crackGeom = new THREE.TubeGeometry(
    end_crackPath,
    20,
    0.008,
    6,
    false
  );
  const end_crack = new THREE.Mesh(end_crackGeom, end_crackMat);
  end_crack.name = "end_crack";
  wooden_block.add(end_crack);

  const end_crack_branchPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(block_length / 2 + 0.013, 0.045, 0.085),
    new THREE.Vector3(block_length / 2 + 0.014, 0.015, 0.14),
    new THREE.Vector3(block_length / 2 + 0.013, -0.04, 0.18)
  ]);
  const end_crack_branchGeom = new THREE.TubeGeometry(
    end_crack_branchPath,
    10,
    0.005,
    6,
    false
  );
  const end_crack_branch = new THREE.Mesh(
    end_crack_branchGeom,
    end_crackMat
  );
  end_crack_branch.name = "end_crack_branch";
  wooden_block.add(end_crack_branch);

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