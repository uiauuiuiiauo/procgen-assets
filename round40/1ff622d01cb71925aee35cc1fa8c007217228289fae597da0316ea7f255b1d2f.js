export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "root";

  const object_assembly = new THREE.Group();
  object_assembly.name = "object_assembly";
  root.add(object_assembly);

  const wooden_handleMat = new THREE.MeshStandardMaterial({
    color: 0x985526,
    metalness: 0.0,
    roughness: 0.6,
  });

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x3d2115,
    metalness: 0.0,
    roughness: 0.9,
  });

  const end_grainMat = new THREE.MeshStandardMaterial({
    color: 0x63371f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const end_grain_ringMat = new THREE.MeshStandardMaterial({
    color: 0x45271a,
    metalness: 0.0,
    roughness: 0.9,
  });

  const metal_sleeveMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x171412,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const wooden_handleProfile = [
    new THREE.Vector2(0.000, -1.300),
    new THREE.Vector2(0.180, -1.290),
    new THREE.Vector2(0.340, -1.250),
    new THREE.Vector2(0.430, -1.180),
    new THREE.Vector2(0.465, -1.080),
    new THREE.Vector2(0.470, -0.900),
    new THREE.Vector2(0.465, -0.650),
    new THREE.Vector2(0.455, -0.380),
    new THREE.Vector2(0.445, -0.120),
    new THREE.Vector2(0.440, 0.080),
    new THREE.Vector2(0.440, 0.200),
    new THREE.Vector2(0.000, 0.200),
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(wooden_handleProfile, 64);
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, wooden_handleMat);
  wooden_handle.name = "wooden_handle";
  object_assembly.add(wooden_handle);

  const handle_end_capGeom = new THREE.CircleGeometry(0.375, 48);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, end_grainMat);
  handle_end_cap.name = "handle_end_cap";
  handle_end_cap.rotation.x = Math.PI / 2;
  handle_end_cap.position.y = -1.302;
  object_assembly.add(handle_end_cap);

  const end_grain_ring_innerGeom = new THREE.TorusGeometry(0.165, 0.005, 6, 48);
  const end_grain_ring_inner = new THREE.Mesh(
    end_grain_ring_innerGeom,
    end_grain_ringMat
  );
  end_grain_ring_inner.name = "end_grain_ring_inner";
  end_grain_ring_inner.rotation.x = Math.PI / 2;
  end_grain_ring_inner.position.y = -1.307;
  object_assembly.add(end_grain_ring_inner);

  const end_grain_ring_outerGeom = new THREE.TorusGeometry(0.285, 0.006, 6, 56);
  const end_grain_ring_outer = new THREE.Mesh(
    end_grain_ring_outerGeom,
    end_grain_ringMat
  );
  end_grain_ring_outer.name = "end_grain_ring_outer";
  end_grain_ring_outer.rotation.x = Math.PI / 2;
  end_grain_ring_outer.position.y = -1.307;
  object_assembly.add(end_grain_ring_outer);

  const handle_holeGeom = new THREE.CircleGeometry(0.052, 24);
  const handle_hole = new THREE.Mesh(handle_holeGeom, openingMat);
  handle_hole.name = "handle_hole";
  handle_hole.rotation.x = Math.PI / 2;
  handle_hole.position.y = -1.312;
  object_assembly.add(handle_hole);

  const handle_hole_rimGeom = new THREE.TorusGeometry(0.066, 0.012, 8, 32);
  const handle_hole_rim = new THREE.Mesh(handle_hole_rimGeom, wood_grainMat);
  handle_hole_rim.name = "handle_hole_rim";
  handle_hole_rim.rotation.x = Math.PI / 2;
  handle_hole_rim.position.y = -1.310;
  object_assembly.add(handle_hole_rim);

  function handleRadiusAt(y) {
    if (y < -1.18) {
      const t = (y + 1.30) / 0.12;
      return 0.18 + Math.max(0, Math.min(1, t)) * 0.25;
    }
    if (y < -0.90) {
      const t = (y + 1.18) / 0.28;
      return 0.43 + Math.max(0, Math.min(1, t)) * 0.04;
    }
    const t = (y + 0.90) / 1.10;
    return 0.47 - Math.max(0, Math.min(1, t)) * 0.03;
  }

  const wood_grainGeom = new THREE.CylinderGeometry(0.006, 0.006, 1, 6);
  const wood_grain_count = 52;
  const wood_grain = new THREE.InstancedMesh(
    wood_grainGeom,
    wood_grainMat,
    wood_grain_count
  );
  wood_grain.name = "wood_grain";

  const grain_dummy = new THREE.Object3D();
  for (let i = 0; i < wood_grain_count; i++) {
    const angle =
      (i / wood_grain_count) * Math.PI * 2 + (i % 5) * 0.035;
    const y =
      -1.145 + (((i * 11) % wood_grain_count) / (wood_grain_count - 1)) * 1.20;
    const length = 0.055 + ((i * 7) % 9) * 0.018;
    const radius = handleRadiusAt(y) + 0.003;

    grain_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    grain_dummy.rotation.set(0, angle, 0);
    grain_dummy.scale.set(1, length, 1);
    grain_dummy.updateMatrix();
    wood_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  wood_grain.instanceMatrix.needsUpdate = true;
  object_assembly.add(wood_grain);

  const metal_sleeveProfile = [
    new THREE.Vector2(0.440, 0.140),
    new THREE.Vector2(0.443, 0.190),
    new THREE.Vector2(0.455, 0.350),
    new THREE.Vector2(0.475, 0.650),
    new THREE.Vector2(0.495, 0.950),
    new THREE.Vector2(0.515, 1.220),
    new THREE.Vector2(0.525, 1.320),
    new THREE.Vector2(0.520, 1.370),
  ];
  const metal_sleeveGeom = new THREE.LatheGeometry(metal_sleeveProfile, 64);
  const metal_sleeve = new THREE.Mesh(metal_sleeveGeom, metal_sleeveMat);
  metal_sleeve.name = "metal_sleeve";
  object_assembly.add(metal_sleeve);

  const joint_seamGeom = new THREE.TorusGeometry(0.443, 0.009, 8, 56);
  const joint_seam = new THREE.Mesh(joint_seamGeom, openingMat);
  joint_seam.name = "joint_seam";
  joint_seam.rotation.x = Math.PI / 2;
  joint_seam.position.y = 0.165;
  object_assembly.add(joint_seam);

  const sleeve_brush_linesGeom = new THREE.CylinderGeometry(
    0.0025,
    0.0025,
    1,
    5
  );
  const sleeve_brush_lines_count = 24;
  const sleeve_brush_lines = new THREE.InstancedMesh(
    sleeve_brush_linesGeom,
    polished_metalMat,
    sleeve_brush_lines_count
  );
  sleeve_brush_lines.name = "sleeve_brush_lines";

  const brush_dummy = new THREE.Object3D();
  for (let i = 0; i < sleeve_brush_lines_count; i++) {
    const angle =
      (i / sleeve_brush_lines_count) * Math.PI * 2 + (i % 3) * 0.04;
    const y = 0.32 + (((i * 5) % 23) / 22) * 0.88;
    const t = (y - 0.32) / 0.88;
    const radius = 0.455 + t * 0.061 + 0.003;
    const length = 0.12 + ((i * 7) % 6) * 0.035;

    brush_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    brush_dummy.rotation.set(0, angle, 0);
    brush_dummy.scale.set(1, length, 1);
    brush_dummy.updateMatrix();
    sleeve_brush_lines.setMatrixAt(i, brush_dummy.matrix);
  }
  sleeve_brush_lines.instanceMatrix.needsUpdate = true;
  object_assembly.add(sleeve_brush_lines);

  const rim_shadow_bandGeom = new THREE.TorusGeometry(0.518, 0.016, 8, 64);
  const rim_shadow_band = new THREE.Mesh(rim_shadow_bandGeom, openingMat);
  rim_shadow_band.name = "rim_shadow_band";
  rim_shadow_band.rotation.x = Math.PI / 2;
  rim_shadow_band.position.y = 1.326;
  object_assembly.add(rim_shadow_band);

  const rolled_rimGeom = new THREE.TorusGeometry(0.535, 0.048, 16, 72);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, polished_metalMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 1.385;
  object_assembly.add(rolled_rim);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.455,
    0.475,
    0.19,
    48,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, openingMat);
  inner_wall.name = "inner_wall";
  inner_wall.position.y = 1.285;
  object_assembly.add(inner_wall);

  const inner_openingGeom = new THREE.CircleGeometry(0.472, 48);
  const inner_opening = new THREE.Mesh(inner_openingGeom, openingMat);
  inner_opening.name = "inner_opening";
  inner_opening.rotation.x = -Math.PI / 2;
  inner_opening.position.y = 1.188;
  object_assembly.add(inner_opening);

  object_assembly.rotation.set(-0.32, 0, -0.92);

  function fitToUnitCube(THREE, target) {
    const box = new THREE.Box3().setFromObject(target);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    target.scale.setScalar(scale);
    target.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(THREE, root);
  return root;
}