export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "paddle";

  const paddle_body = new THREE.Group();
  paddle_body.name = "paddle_body";
  root.add(paddle_body);

  const surface_pad = new THREE.Group();
  surface_pad.name = "surface_pad";
  root.add(surface_pad);

  const handle_detail = new THREE.Group();
  handle_detail.name = "handle_detail";
  root.add(handle_detail);

  const paddle_coreMat = new THREE.MeshStandardMaterial({
    color: 0xd8c8a8,
    metalness: 0.0,
    roughness: 0.6
  });

  const front_woodMat = new THREE.MeshStandardMaterial({
    color: 0xe7d4b4,
    metalness: 0.0,
    roughness: 0.6
  });

  const handle_woodMat = new THREE.MeshStandardMaterial({
    color: 0xecdcbd,
    metalness: 0.0,
    roughness: 0.6
  });

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0xd3ba94,
    metalness: 0.0,
    roughness: 0.9
  });

  const handle_grainMat = new THREE.MeshStandardMaterial({
    color: 0xddc39e,
    metalness: 0.0,
    roughness: 0.9
  });

  const surfaceMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8c5,
    metalness: 0.0,
    roughness: 0.8
  });

  const surface_fibersMat = new THREE.MeshStandardMaterial({
    color: 0xc9cbbb,
    metalness: 0.0,
    roughness: 0.8
  });

  const surface_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xbdbfaf,
    metalness: 0.0,
    roughness: 0.8
  });

  const paddle_coreShape = new THREE.Shape();
  paddle_coreShape.moveTo(-0.32, -1.62);
  paddle_coreShape.bezierCurveTo(-0.18, -1.67, 0.18, -1.67, 0.32, -1.62);
  paddle_coreShape.bezierCurveTo(0.29, -1.28, 0.26, -0.72, 0.26, -0.40);
  paddle_coreShape.bezierCurveTo(0.26, -0.18, 0.34, -0.02, 0.52, 0.12);
  paddle_coreShape.bezierCurveTo(0.72, 0.27, 0.86, 0.43, 0.90, 0.72);
  paddle_coreShape.bezierCurveTo(0.98, 1.24, 0.74, 1.78, 0.36, 2.05);
  paddle_coreShape.bezierCurveTo(0.16, 2.19, -0.16, 2.19, -0.36, 2.05);
  paddle_coreShape.bezierCurveTo(-0.74, 1.78, -0.98, 1.24, -0.90, 0.72);
  paddle_coreShape.bezierCurveTo(-0.86, 0.43, -0.72, 0.27, -0.52, 0.12);
  paddle_coreShape.bezierCurveTo(-0.34, -0.02, -0.26, -0.18, -0.26, -0.40);
  paddle_coreShape.bezierCurveTo(-0.26, -0.72, -0.29, -1.28, -0.32, -1.62);
  paddle_coreShape.closePath();

  const paddle_coreGeom = new THREE.ExtrudeGeometry(paddle_coreShape, {
    depth: 0.10,
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.022,
    bevelSegments: 3
  });
  const paddle_core = new THREE.Mesh(paddle_coreGeom, paddle_coreMat);
  paddle_core.name = "paddle_core";
  paddle_core.position.z = -0.05;
  paddle_body.add(paddle_core);

  const front_woodShape = new THREE.Shape();
  front_woodShape.moveTo(-0.29, -1.585);
  front_woodShape.bezierCurveTo(-0.16, -1.625, 0.16, -1.625, 0.29, -1.585);
  front_woodShape.bezierCurveTo(0.26, -1.22, 0.235, -0.66, 0.235, -0.40);
  front_woodShape.bezierCurveTo(0.235, -0.19, 0.31, -0.04, 0.49, 0.09);
  front_woodShape.bezierCurveTo(0.66, 0.22, 0.80, 0.34, 0.84, 0.43);
  front_woodShape.lineTo(-0.84, 0.43);
  front_woodShape.bezierCurveTo(-0.80, 0.34, -0.66, 0.22, -0.49, 0.09);
  front_woodShape.bezierCurveTo(-0.31, -0.04, -0.235, -0.19, -0.235, -0.40);
  front_woodShape.bezierCurveTo(-0.235, -0.66, -0.26, -1.22, -0.29, -1.585);
  front_woodShape.closePath();

  const front_woodGeom = new THREE.ExtrudeGeometry(front_woodShape, {
    depth: 0.012,
    steps: 1,
    curveSegments: 28,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const front_wood = new THREE.Mesh(front_woodGeom, front_woodMat);
  front_wood.name = "front_wood";
  front_wood.position.z = 0.068;
  paddle_body.add(front_wood);

  const handle_woodShape = new THREE.Shape();
  handle_woodShape.moveTo(-0.15, -1.545);
  handle_woodShape.bezierCurveTo(-0.08, -1.58, 0.08, -1.58, 0.15, -1.545);
  handle_woodShape.bezierCurveTo(0.14, -1.18, 0.13, -0.62, 0.13, -0.28);
  handle_woodShape.bezierCurveTo(0.13, -0.05, 0.18, 0.17, 0.245, 0.31);
  handle_woodShape.lineTo(-0.245, 0.31);
  handle_woodShape.bezierCurveTo(-0.18, 0.17, -0.13, -0.05, -0.13, -0.28);
  handle_woodShape.bezierCurveTo(-0.13, -0.62, -0.14, -1.18, -0.15, -1.545);
  handle_woodShape.closePath();

  const handle_woodGeom = new THREE.ExtrudeGeometry(handle_woodShape, {
    depth: 0.009,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.005,
    bevelSegments: 2
  });
  const handle_wood = new THREE.Mesh(handle_woodGeom, handle_woodMat);
  handle_wood.name = "handle_wood";
  handle_wood.position.z = 0.084;
  paddle_body.add(handle_wood);

  const handle_jointGeom = new THREE.BoxGeometry(0.48, 0.012, 0.008);
  const handle_joint = new THREE.Mesh(handle_jointGeom, wood_grainMat);
  handle_joint.name = "handle_joint";
  handle_joint.position.set(0, 0.305, 0.099);
  handle_detail.add(handle_joint);

  const head_grainGeom = new THREE.BoxGeometry(0.004, 0.09, 0.003);
  const head_grain = new THREE.InstancedMesh(head_grainGeom, wood_grainMat, 20);
  head_grain.name = "head_grain";
  const grain_transform = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const column = i % 10;
    const row = Math.floor(i / 10);
    const x = -0.68 + column * (1.36 / 9);
    const y = 0.145 + row * 0.105 + Math.sin(i * 1.7) * 0.008;
    grain_transform.position.set(x, y, 0.087);
    grain_transform.rotation.set(0, 0, Math.sin(i * 1.3) * 0.08);
    grain_transform.scale.set(1, 0.65 + 0.25 * (0.5 + 0.5 * Math.sin(i * 2.1)), 1);
    grain_transform.updateMatrix();
    head_grain.setMatrixAt(i, grain_transform.matrix);
  }
  head_grain.instanceMatrix.needsUpdate = true;
  handle_detail.add(head_grain);

  const handle_grainGeom = new THREE.BoxGeometry(0.004, 0.22, 0.003);
  const handle_grain = new THREE.InstancedMesh(handle_grainGeom, handle_grainMat, 14);
  handle_grain.name = "handle_grain";
  for (let i = 0; i < 14; i++) {
    const x = -0.105 + i * (0.21 / 13);
    const y = -1.34 + Math.sin(i * 1.9) * 0.07;
    grain_transform.position.set(x, y, 0.100);
    grain_transform.rotation.set(0, 0, Math.sin(i * 1.4) * 0.025);
    grain_transform.scale.set(1, 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(i * 2.3)), 1);
    grain_transform.updateMatrix();
    handle_grain.setMatrixAt(i, grain_transform.matrix);
  }
  handle_grain.instanceMatrix.needsUpdate = true;
  handle_detail.add(handle_grain);

  const surfaceShape = new THREE.Shape();
  surfaceShape.moveTo(-0.75, 0.43);
  surfaceShape.bezierCurveTo(-0.79, 0.52, -0.85, 0.66, -0.86, 0.82);
  surfaceShape.bezierCurveTo(-0.91, 1.25, -0.70, 1.73, -0.34, 2.00);
  surfaceShape.bezierCurveTo(-0.15, 2.13, 0.15, 2.13, 0.34, 2.00);
  surfaceShape.bezierCurveTo(0.70, 1.73, 0.91, 1.25, 0.86, 0.82);
  surfaceShape.bezierCurveTo(0.85, 0.66, 0.79, 0.52, 0.75, 0.43);
  surfaceShape.lineTo(-0.75, 0.43);
  surfaceShape.closePath();

  const surfaceGeom = new THREE.ExtrudeGeometry(surfaceShape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.014,
    bevelSegments: 3
  });

  const rear_surface = new THREE.Mesh(surfaceGeom, surfaceMat);
  rear_surface.name = "rear_surface";
  rear_surface.position.z = -0.086;
  surface_pad.add(rear_surface);

  const surface = new THREE.Mesh(surfaceGeom, surfaceMat);
  surface.name = "surface";
  surface.position.z = 0.068;
  surface_pad.add(surface);

  const fiber_data = [];
  for (let row = 0; row < 22; row++) {
    const y = 0.50 + row * 0.067;
    let half_width = 0.70;
    if (y > 1.00) {
      const q = (y - 1.00) / 1.05;
      half_width = 0.80 * Math.sqrt(Math.max(0, 1 - q * q));
    }
    for (let column = -12; column <= 12; column++) {
      const x = column * 0.064 + (row % 2) * 0.032;
      if (Math.abs(x) < half_width - 0.035) {
        fiber_data.push({
          x: x,
          y: y,
          angle: (((row * 7 + column + 40) % 7) - 3) * 0.12,
          scale: 0.72 + 0.22 * (0.5 + 0.5 * Math.sin(row * 2.3 + column * 1.7))
        });
      }
    }
  }

  const surface_fibersGeom = new THREE.BoxGeometry(0.018, 0.0035, 0.003);
  const surface_fibers = new THREE.InstancedMesh(
    surface_fibersGeom,
    surface_fibersMat,
    fiber_data.length
  );
  surface_fibers.name = "surface_fibers";
  const fiber_transform = new THREE.Object3D();
  for (let i = 0; i < fiber_data.length; i++) {
    const fiber = fiber_data[i];
    fiber_transform.position.set(fiber.x, fiber.y, 0.098);
    fiber_transform.rotation.set(0, 0, fiber.angle);
    fiber_transform.scale.set(fiber.scale, 1, 1);
    fiber_transform.updateMatrix();
    surface_fibers.setMatrixAt(i, fiber_transform.matrix);
  }
  surface_fibers.instanceMatrix.needsUpdate = true;
  surface_pad.add(surface_fibers);

  const speckle_positions = [];
  for (let i = 0; i < fiber_data.length; i += 6) {
    speckle_positions.push(fiber_data[i]);
  }

  const surface_specklesGeom = new THREE.CircleGeometry(0.0045, 8);
  const surface_speckles = new THREE.InstancedMesh(
    surface_specklesGeom,
    surface_specklesMat,
    speckle_positions.length
  );
  surface_speckles.name = "surface_speckles";
  for (let i = 0; i < speckle_positions.length; i++) {
    const speckle = speckle_positions[i];
    fiber_transform.position.set(speckle.x + 0.008, speckle.y + 0.004, 0.101);
    fiber_transform.rotation.set(0, 0, speckle.angle);
    fiber_transform.scale.set(0.7 + i * 0.001, 0.45, 1);
    fiber_transform.updateMatrix();
    surface_speckles.setMatrixAt(i, fiber_transform.matrix);
  }
  surface_speckles.instanceMatrix.needsUpdate = true;
  surface_pad.add(surface_speckles);

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