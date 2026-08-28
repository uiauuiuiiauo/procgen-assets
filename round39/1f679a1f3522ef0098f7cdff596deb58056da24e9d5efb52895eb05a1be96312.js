export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "modern_glass_tower";

  const site_group = new THREE.Group();
  site_group.name = "site_group";
  const podium_group = new THREE.Group();
  podium_group.name = "podium_group";
  const tower_group = new THREE.Group();
  tower_group.name = "tower_group";
  const rooftop_group = new THREE.Group();
  rooftop_group.name = "rooftop_group";
  const landscaping_group = new THREE.Group();
  landscaping_group.name = "landscaping_group";
  root.add(site_group, podium_group, tower_group, rooftop_group, landscaping_group);

  const towerW = 1.08;
  const towerD = 0.72;
  const towerZ = -0.12;
  const towerBottom = 0.38;
  const towerH = 4.10;
  const towerTop = towerBottom + towerH;
  const floorCount = 44;
  const floorH = towerH / floorCount;
  const frontCols = 10;
  const sideCols = 7;

  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0xb9b5ad,
    metalness: 0.0,
    roughness: 0.8
  });
  const lightConcreteMat = new THREE.MeshStandardMaterial({
    color: 0xd4d0c9,
    metalness: 0.0,
    roughness: 0.8
  });
  const darkConcreteMat = new THREE.MeshStandardMaterial({
    color: 0x45494d,
    metalness: 0.0,
    roughness: 0.75
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x252b32,
    metalness: 0.6,
    roughness: 0.5
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x30363d,
    metalness: 0.6,
    roughness: 0.5
  });
  const towerFrontGlassMat = new THREE.MeshStandardMaterial({
    color: 0x536579,
    metalness: 0.1,
    roughness: 0.25
  });
  const towerSideGlassMat = new THREE.MeshStandardMaterial({
    color: 0x172b46,
    metalness: 0.1,
    roughness: 0.25
  });
  const podiumGlassMat = new THREE.MeshStandardMaterial({
    color: 0x263a4b,
    metalness: 0.1,
    roughness: 0.28
  });
  const interiorDarkMat = new THREE.MeshStandardMaterial({
    color: 0x111820,
    metalness: 0.0,
    roughness: 0.8
  });
  const warmOfficeMat = new THREE.MeshStandardMaterial({
    color: 0xffc76a,
    emissive: 0xffc76a,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const coolOfficeMat = new THREE.MeshStandardMaterial({
    color: 0x91b9d8,
    emissive: 0x91b9d8,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const grassMat = new THREE.MeshStandardMaterial({
    color: 0x344b2d,
    metalness: 0.0,
    roughness: 0.9
  });
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x594532,
    metalness: 0.0,
    roughness: 0.9
  });
  const foliageMat = new THREE.MeshStandardMaterial({
    color: 0x243d29,
    metalness: 0.0,
    roughness: 0.9
  });
  const carBodyMat = new THREE.MeshStandardMaterial({
    color: 0x343b43,
    metalness: 0.2,
    roughness: 0.45
  });
  const carWindowMat = new THREE.MeshStandardMaterial({
    color: 0x18232c,
    metalness: 0.0,
    roughness: 0.3
  });

  const unitBoxGeom = new THREE.BoxGeometry(1, 1, 1);
  const dummy = new THREE.Object3D();

  function pushBox(parts, x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0) {
    parts.push({ x, y, z, sx, sy, sz, rx, ry, rz });
  }

  function applyParts(mesh, parts) {
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.set(p.sx, p.sy, p.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const site_baseGeom = new THREE.BoxGeometry(3.20, 0.06, 1.72);
  const site_base = new THREE.Mesh(site_baseGeom, concreteMat);
  site_base.name = "site_base";
  site_base.position.set(0, 0.03, 0.04);
  site_group.add(site_base);

  const front_walkwayGeom = new THREE.BoxGeometry(3.08, 0.025, 0.20);
  const front_walkway = new THREE.Mesh(front_walkwayGeom, lightConcreteMat);
  front_walkway.name = "front_walkway";
  front_walkway.position.set(0, 0.077, 0.79);
  site_group.add(front_walkway);

  const left_lawnGeom = new THREE.BoxGeometry(0.78, 0.025, 0.66);
  const left_lawn = new THREE.Mesh(left_lawnGeom, grassMat);
  left_lawn.name = "left_lawn";
  left_lawn.position.set(-1.08, 0.078, 0.30);
  site_group.add(left_lawn);

  const right_lawnGeom = new THREE.BoxGeometry(0.48, 0.025, 0.66);
  const right_lawn = new THREE.Mesh(right_lawnGeom, grassMat);
  right_lawn.name = "right_lawn";
  right_lawn.position.set(1.28, 0.078, 0.30);
  site_group.add(right_lawn);

  const podium_ground_slabGeom = new THREE.BoxGeometry(2.72, 0.08, 1.30);
  const podium_ground_slab = new THREE.Mesh(podium_ground_slabGeom, darkConcreteMat);
  podium_ground_slab.name = "podium_ground_slab";
  podium_ground_slab.position.set(0, 0.12, 0.10);
  podium_group.add(podium_ground_slab);

  const podium_lower_coreGeom = new THREE.BoxGeometry(1.42, 0.36, 0.76);
  const podium_lower_core = new THREE.Mesh(podium_lower_coreGeom, interiorDarkMat);
  podium_lower_core.name = "podium_lower_core";
  podium_lower_core.position.set(0.12, 0.34, 0.08);
  podium_group.add(podium_lower_core);

  const podium_lower_glass_parts = [];
  pushBox(podium_lower_glass_parts, 0.12, 0.34, 0.472, 1.42, 0.36, 0.018);
  pushBox(podium_lower_glass_parts, -0.598, 0.34, 0.08, 0.018, 0.36, 0.76);
  pushBox(podium_lower_glass_parts, 0.838, 0.34, 0.08, 0.018, 0.36, 0.76);
  const podium_lower_glass = new THREE.InstancedMesh(
    unitBoxGeom,
    podiumGlassMat,
    podium_lower_glass_parts.length
  );
  podium_lower_glass.name = "podium_lower_glass";
  applyParts(podium_lower_glass, podium_lower_glass_parts);
  podium_group.add(podium_lower_glass);

  const podium_lower_frame_parts = [];
  for (let i = 0; i <= 8; i++) {
    const x = -0.598 + (1.42 * i) / 8;
    pushBox(podium_lower_frame_parts, x, 0.34, 0.486, 0.014, 0.38, 0.022);
  }
  for (const side of [-1, 1]) {
    const x = side < 0 ? -0.609 : 0.849;
    for (let i = 0; i <= 5; i++) {
      const z = -0.292 + (0.76 * i) / 5;
      pushBox(podium_lower_frame_parts, x, 0.34, z, 0.022, 0.38, 0.014);
    }
  }
  pushBox(podium_lower_frame_parts, 0.12, 0.34, 0.490, 1.45, 0.018, 0.026);
  const podium_lower_frame = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    podium_lower_frame_parts.length
  );
  podium_lower_frame.name = "podium_lower_frame";
  applyParts(podium_lower_frame, podium_lower_frame_parts);
  podium_group.add(podium_lower_frame);

  const podium_lower_column_parts = [];
  for (let i = 0; i <= 6; i++) {
    const x = -0.63 + (1.46 * i) / 6;
    pushBox(podium_lower_column_parts, x, 0.34, 0.515, 0.026, 0.40, 0.030);
  }
  const podium_lower_columns = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    podium_lower_column_parts.length
  );
  podium_lower_columns.name = "podium_lower_columns";
  applyParts(podium_lower_columns, podium_lower_column_parts);
  podium_group.add(podium_lower_columns);

  const podium_lower_light_parts = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 7; col++) {
      if ((row + col * 2) % 4 !== 0) {
        const x = -0.50 + col * 0.18;
        const y = 0.255 + row * 0.135;
        pushBox(podium_lower_light_parts, x, y, 0.456, 0.12, 0.065, 0.010);
      }
    }
  }
  const podium_lower_lights = new THREE.InstancedMesh(
    unitBoxGeom,
    warmOfficeMat,
    podium_lower_light_parts.length
  );
  podium_lower_lights.name = "podium_lower_lights";
  applyParts(podium_lower_lights, podium_lower_light_parts);
  podium_group.add(podium_lower_lights);

  const podium_lower_ceilingGeom = new THREE.BoxGeometry(2.42, 0.055, 1.18);
  const podium_lower_ceiling = new THREE.Mesh(podium_lower_ceilingGeom, lightConcreteMat);
  podium_lower_ceiling.name = "podium_lower_ceiling";
  podium_lower_ceiling.position.set(0, 0.555, 0.10);
  podium_group.add(podium_lower_ceiling);

  const podium_upper_coreGeom = new THREE.BoxGeometry(2.18, 0.29, 0.78);
  const podium_upper_core = new THREE.Mesh(podium_upper_coreGeom, interiorDarkMat);
  podium_upper_core.name = "podium_upper_core";
  podium_upper_core.position.set(0.12, 0.705, 0.05);
  podium_group.add(podium_upper_core);

  const podium_upper_glass_parts = [];
  pushBox(podium_upper_glass_parts, 0.12, 0.705, 0.447, 2.18, 0.29, 0.018);
  pushBox(podium_upper_glass_parts, -0.978, 0.705, 0.05, 0.018, 0.29, 0.78);
  pushBox(podium_upper_glass_parts, 1.218, 0.705, 0.05, 0.018, 0.29, 0.78);
  const podium_upper_glass = new THREE.InstancedMesh(
    unitBoxGeom,
    podiumGlassMat,
    podium_upper_glass_parts.length
  );
  podium_upper_glass.name = "podium_upper_glass";
  applyParts(podium_upper_glass, podium_upper_glass_parts);
  podium_group.add(podium_upper_glass);

  const podium_upper_frame_parts = [];
  for (let i = 0; i <= 11; i++) {
    const x = -0.978 + (2.18 * i) / 11;
    pushBox(podium_upper_frame_parts, x, 0.705, 0.461, 0.012, 0.31, 0.022);
  }
  for (const side of [-1, 1]) {
    const x = side < 0 ? -0.989 : 1.229;
    for (let i = 0; i <= 6; i++) {
      const z = -0.333 + (0.78 * i) / 6;
      pushBox(podium_upper_frame_parts, x, 0.705, z, 0.022, 0.31, 0.012);
    }
  }
  const podium_upper_frame = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    podium_upper_frame_parts.length
  );
  podium_upper_frame.name = "podium_upper_frame";
  applyParts(podium_upper_frame, podium_upper_frame_parts);
  podium_group.add(podium_upper_frame);

  const podium_upper_light_parts = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 10; col++) {
      if ((row * 3 + col) % 3 !== 0) {
        const x = -0.83 + col * 0.195;
        const y = 0.645 + row * 0.115;
        pushBox(podium_upper_light_parts, x, y, 0.429, 0.13, 0.060, 0.010);
      }
    }
  }
  const podium_upper_lights = new THREE.InstancedMesh(
    unitBoxGeom,
    warmOfficeMat,
    podium_upper_light_parts.length
  );
  podium_upper_lights.name = "podium_upper_lights";
  applyParts(podium_upper_lights, podium_upper_light_parts);
  podium_group.add(podium_upper_lights);

  const podium_roof_slabGeom = new THREE.BoxGeometry(2.52, 0.06, 1.16);
  const podium_roof_slab = new THREE.Mesh(podium_roof_slabGeom, lightConcreteMat);
  podium_roof_slab.name = "podium_roof_slab";
  podium_roof_slab.position.set(0, 0.885, 0.05);
  podium_group.add(podium_roof_slab);

  const podium_roof_parapetGeom = new THREE.BoxGeometry(2.42, 0.035, 1.06);
  const podium_roof_parapet = new THREE.Mesh(podium_roof_parapetGeom, roofMat);
  podium_roof_parapet.name = "podium_roof_parapet";
  podium_roof_parapet.position.set(0, 0.925, 0.05);
  podium_group.add(podium_roof_parapet);

  const tower_coreGeom = new THREE.BoxGeometry(0.76, 3.94, 0.52);
  const tower_core = new THREE.Mesh(tower_coreGeom, interiorDarkMat);
  tower_core.name = "tower_core";
  tower_core.position.set(0, 2.43, towerZ);
  tower_group.add(tower_core);

  const tower_front_glassGeom = new THREE.BoxGeometry(towerW, towerH, 0.018);
  const tower_front_glass = new THREE.Mesh(tower_front_glassGeom, towerFrontGlassMat);
  tower_front_glass.name = "tower_front_glass";
  tower_front_glass.position.set(0, towerBottom + towerH / 2, towerZ + towerD / 2);
  tower_group.add(tower_front_glass);

  const tower_rear_glassGeom = new THREE.BoxGeometry(towerW, towerH, 0.018);
  const tower_rear_glass = new THREE.Mesh(tower_rear_glassGeom, towerFrontGlassMat);
  tower_rear_glass.name = "tower_rear_glass";
  tower_rear_glass.position.set(0, towerBottom + towerH / 2, towerZ - towerD / 2);
  tower_group.add(tower_rear_glass);

  const tower_left_glassGeom = new THREE.BoxGeometry(0.018, towerH, towerD);
  const tower_left_glass = new THREE.Mesh(tower_left_glassGeom, towerSideGlassMat);
  tower_left_glass.name = "tower_left_glass";
  tower_left_glass.position.set(-towerW / 2, towerBottom + towerH / 2, towerZ);
  tower_group.add(tower_left_glass);

  const tower_right_glassGeom = new THREE.BoxGeometry(0.018, towerH, towerD);
  const tower_right_glass = new THREE.Mesh(tower_right_glassGeom, towerSideGlassMat);
  tower_right_glass.name = "tower_right_glass";
  tower_right_glass.position.set(towerW / 2, towerBottom + towerH / 2, towerZ);
  tower_group.add(tower_right_glass);

  const tower_front_vertical_parts = [];
  for (let i = 0; i <= frontCols; i++) {
    const x = -towerW / 2 + (towerW * i) / frontCols;
    pushBox(
      tower_front_vertical_parts,
      x,
      towerBottom + towerH / 2,
      towerZ + towerD / 2 + 0.017,
      0.010,
      towerH,
      0.018
    );
  }
  for (let i = 0; i <= frontCols; i++) {
    const x = -towerW / 2 + (towerW * i) / frontCols;
    pushBox(
      tower_front_vertical_parts,
      x,
      towerBottom + towerH / 2,
      towerZ - towerD / 2 - 0.017,
      0.010,
      towerH,
      0.018
    );
  }
  const tower_front_vertical_mullions = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    tower_front_vertical_parts.length
  );
  tower_front_vertical_mullions.name = "tower_front_vertical_mullions";
  applyParts(tower_front_vertical_mullions, tower_front_vertical_parts);
  tower_group.add(tower_front_vertical_mullions);

  const tower_front_horizontal_parts = [];
  for (let i = 0; i <= floorCount; i++) {
    const y = towerBottom + floorH * i;
    pushBox(
      tower_front_horizontal_parts,
      0,
      y,
      towerZ + towerD / 2 + 0.018,
      towerW + 0.012,
      0.009,
      0.020
    );
    pushBox(
      tower_front_horizontal_parts,
      0,
      y,
      towerZ - towerD / 2 - 0.018,
      towerW + 0.012,
      0.009,
      0.020
    );
  }
  const tower_front_horizontal_mullions = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    tower_front_horizontal_parts.length
  );
  tower_front_horizontal_mullions.name = "tower_front_horizontal_mullions";
  applyParts(tower_front_horizontal_mullions, tower_front_horizontal_parts);
  tower_group.add(tower_front_horizontal_mullions);

  const tower_side_vertical_parts = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i <= sideCols; i++) {
      const z = towerZ - towerD / 2 + (towerD * i) / sideCols;
      pushBox(
        tower_side_vertical_parts,
        side * (towerW / 2 + 0.017),
        towerBottom + towerH / 2,
        z,
        0.018,
        towerH,
        0.010
      );
    }
  }
  const tower_side_vertical_mullions = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    tower_side_vertical_parts.length
  );
  tower_side_vertical_mullions.name = "tower_side_vertical_mullions";
  applyParts(tower_side_vertical_mullions, tower_side_vertical_parts);
  tower_group.add(tower_side_vertical_mullions);

  const tower_side_horizontal_parts = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i <= floorCount; i++) {
      const y = towerBottom + floorH * i;
      pushBox(
        tower_side_horizontal_parts,
        side * (towerW / 2 + 0.018),
        y,
        towerZ,
        0.020,
        0.009,
        towerD + 0.012
      );
    }
  }
  const tower_side_horizontal_mullions = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    tower_side_horizontal_parts.length
  );
  tower_side_horizontal_mullions.name = "tower_side_horizontal_mullions";
  applyParts(tower_side_horizontal_mullions, tower_side_horizontal_parts);
  tower_group.add(tower_side_horizontal_mullions);

  const tower_corner_column_parts = [];
  for (const x of [-towerW / 2, towerW / 2]) {
    for (const z of [towerZ - towerD / 2, towerZ + towerD / 2]) {
      pushBox(
        tower_corner_column_parts,
        x,
        towerBottom + towerH / 2,
        z,
        0.027,
        towerH + 0.02,
        0.027
      );
    }
  }
  const tower_corner_columns = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    tower_corner_column_parts.length
  );
  tower_corner_columns.name = "tower_corner_columns";
  applyParts(tower_corner_columns, tower_corner_column_parts);
  tower_group.add(tower_corner_columns);

  const tower_floor_slab_parts = [];
  for (let i = 0; i <= floorCount; i++) {
    const y = towerBottom + floorH * i;
    pushBox(tower_floor_slab_parts, 0, y, towerZ, towerW - 0.055, 0.014, towerD - 0.055);
  }
  const tower_floor_slabs = new THREE.InstancedMesh(
    unitBoxGeom,
    darkConcreteMat,
    tower_floor_slab_parts.length
  );
  tower_floor_slabs.name = "tower_floor_slabs";
  applyParts(tower_floor_slabs, tower_floor_slab_parts);
  tower_group.add(tower_floor_slabs);

  const tower_warm_office_parts = [];
  const warmFloors = [8, 11, 12, 19, 20, 21, 31, 32, 38];
  for (let f of warmFloors) {
    for (let col = 0; col < 7; col++) {
      if ((f + col) % 4 !== 0) {
        const x = -0.40 + col * 0.13;
        const y = towerBottom + floorH * (f + 0.52);
        pushBox(
          tower_warm_office_parts,
          x,
          y,
          towerZ + towerD / 2 - 0.026,
          0.095,
          0.033,
          0.010
        );
      }
    }
  }
  const tower_warm_offices = new THREE.InstancedMesh(
    unitBoxGeom,
    warmOfficeMat,
    tower_warm_office_parts.length
  );
  tower_warm_offices.name = "tower_warm_offices";
  applyParts(tower_warm_offices, tower_warm_office_parts);
  tower_group.add(tower_warm_offices);

  const tower_cool_office_parts = [];
  const coolFloors = [5, 15, 25, 34, 40];
  for (let f of coolFloors) {
    for (let col = 0; col < 6; col++) {
      if ((f + col * 2) % 3 !== 0) {
        const x = -0.36 + col * 0.145;
        const y = towerBottom + floorH * (f + 0.50);
        pushBox(
          tower_cool_office_parts,
          x,
          y,
          towerZ + towerD / 2 - 0.024,
          0.105,
          0.036,
          0.009
        );
      }
    }
  }
  const tower_cool_offices = new THREE.InstancedMesh(
    unitBoxGeom,
    coolOfficeMat,
    tower_cool_office_parts.length
  );
  tower_cool_offices.name = "tower_cool_offices";
  applyParts(tower_cool_offices, tower_cool_office_parts);
  tower_group.add(tower_cool_offices);

  const lower_vertical_recessGeom = new THREE.BoxGeometry(0.038, 1.12, 0.038);
  const lower_vertical_recess = new THREE.Mesh(lower_vertical_recessGeom, frameMat);
  lower_vertical_recess.name = "lower_vertical_recess";
  lower_vertical_recess.position.set(-0.36, 1.33, towerZ + towerD / 2 + 0.035);
  tower_group.add(lower_vertical_recess);

  const lower_horizontal_recessGeom = new THREE.BoxGeometry(0.52, 0.040, 0.038);
  const lower_horizontal_recess = new THREE.Mesh(lower_horizontal_recessGeom, frameMat);
  lower_horizontal_recess.name = "lower_horizontal_recess";
  lower_horizontal_recess.position.set(-0.10, 1.88, towerZ + towerD / 2 + 0.035);
  tower_group.add(lower_horizontal_recess);

  const middle_vertical_recessGeom = new THREE.BoxGeometry(0.038, 1.06, 0.038);
  const middle_vertical_recess = new THREE.Mesh(middle_vertical_recessGeom, frameMat);
  middle_vertical_recess.name = "middle_vertical_recess";
  middle_vertical_recess.position.set(-0.36, 2.42, towerZ + towerD / 2 + 0.035);
  tower_group.add(middle_vertical_recess);

  const middle_horizontal_recessGeom = new THREE.BoxGeometry(0.52, 0.040, 0.038);
  const middle_horizontal_recess = new THREE.Mesh(middle_horizontal_recessGeom, frameMat);
  middle_horizontal_recess.name = "middle_horizontal_recess";
  middle_horizontal_recess.position.set(-0.10, 2.95, towerZ + towerD / 2 + 0.035);
  tower_group.add(middle_horizontal_recess);

  const tower_roof_capGeom = new THREE.BoxGeometry(towerW + 0.045, 0.035, towerD + 0.045);
  const tower_roof_cap = new THREE.Mesh(tower_roof_capGeom, roofMat);
  tower_roof_cap.name = "tower_roof_cap";
  tower_roof_cap.position.set(0, towerTop + 0.012, towerZ);
  rooftop_group.add(tower_roof_cap);

  const roof_railing_parts = [];
  const railZFront = towerZ + towerD / 2 + 0.012;
  const railZBack = towerZ - towerD / 2 - 0.012;
  const railXSide = towerW / 2 + 0.012;
  pushBox(roof_railing_parts, 0, towerTop + 0.105, railZFront, towerW + 0.03, 0.014, 0.014);
  pushBox(roof_railing_parts, 0, towerTop + 0.105, railZBack, towerW + 0.03, 0.014, 0.014);
  pushBox(roof_railing_parts, 0, towerTop + 0.052, railZFront, towerW + 0.03, 0.010, 0.010);
  pushBox(roof_railing_parts, 0, towerTop + 0.052, railZBack, towerW + 0.03, 0.010, 0.010);
  pushBox(roof_railing_parts, railXSide, towerTop + 0.105, towerZ, 0.014, 0.014, towerD + 0.03);
  pushBox(roof_railing_parts, -railXSide, towerTop + 0.105, towerZ, 0.014, 0.014, towerD + 0.03);
  pushBox(roof_railing_parts, railXSide, towerTop + 0.052, towerZ, 0.010, 0.010, towerD + 0.03);
  pushBox(roof_railing_parts, -railXSide, towerTop + 0.052, towerZ, 0.010, 0.010, towerD + 0.03);

  const railCountX = 10;
  const railCountZ = 7;
  for (let i = 0; i <= railCountX; i++) {
    const x = -towerW / 2 + (towerW * i) / railCountX;
    pushBox(roof_railing_parts, x, towerTop + 0.078, railZFront, 0.010, 0.11, 0.010);
    pushBox(roof_railing_parts, x, towerTop + 0.078, railZBack, 0.010, 0.11, 0.010);
  }
  for (let i = 0; i <= railCountZ; i++) {
    const z = towerZ - towerD / 2 + (towerD * i) / railCountZ;
    pushBox(roof_railing_parts, railXSide, towerTop + 0.078, z, 0.010, 0.11, 0.010);
    pushBox(roof_railing_parts, -railXSide, towerTop + 0.078, z, 0.010, 0.11, 0.010);
  }
  const roof_railing = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    roof_railing_parts.length
  );
  roof_railing.name = "roof_railing";
  applyParts(roof_railing, roof_railing_parts);
  rooftop_group.add(roof_railing);

  const treePositions = [
    [-1.38, 0.42],
    [-1.18, 0.39],
    [-0.96, 0.43],
    [-0.72, 0.40],
    [-0.48, 0.43],
    [-0.20, 0.42],
    [0.12, 0.41],
    [0.45, 0.43],
    [0.78, 0.40],
    [1.10, 0.43],
    [1.40, 0.40]
  ];

  const landscaping_tree_trunk_parts = [];
  const landscaping_tree_crown_parts = [];
  for (let i = 0; i < treePositions.length; i++) {
    const x = treePositions[i][0];
    const z = treePositions[i][1];
    const scale = 0.88 + (i % 3) * 0.08;
    pushBox(landscaping_tree_trunk_parts, x, 0.175 * scale, z, 0.026, 0.27 * scale, 0.026);
    pushBox(
      landscaping_tree_crown_parts,
      x,
      0.36 * scale,
      z,
      0.16 * scale,
      0.20 * scale,
      0.16 * scale,
      0,
      (i % 4) * 0.18,
      0
    );
    pushBox(
      landscaping_tree_crown_parts,
      x + 0.040 * scale,
      0.40 * scale,
      z + 0.010 * scale,
      0.10 * scale,
      0.13 * scale,
      0.10 * scale
    );
  }

  const landscaping_tree_trunks = new THREE.InstancedMesh(
    unitBoxGeom,
    trunkMat,
    landscaping_tree_trunk_parts.length
  );
  landscaping_tree_trunks.name = "landscaping_tree_trunks";
  applyParts(landscaping_tree_trunks, landscaping_tree_trunk_parts);
  landscaping_group.add(landscaping_tree_trunks);

  const landscaping_tree_crowns = new THREE.InstancedMesh(
    unitBoxGeom,
    foliageMat,
    landscaping_tree_crown_parts.length
  );
  landscaping_tree_crowns.name = "landscaping_tree_crowns";
  applyParts(landscaping_tree_crowns, landscaping_tree_crown_parts);
  landscaping_group.add(landscaping_tree_crowns);

  const car_bodyGeom = new THREE.BoxGeometry(0.28, 0.075, 0.12);
  const car_body = new THREE.Mesh(car_bodyGeom, carBodyMat);
  car_body.name = "car_body";
  car_body.position.set(-1.39, 0.125, 0.79);
  site_group.add(car_body);

  const car_cabinGeom = new THREE.BoxGeometry(0.17, 0.065, 0.105);
  const car_cabin = new THREE.Mesh(car_cabinGeom, carWindowMat);
  car_cabin.name = "car_cabin";
  car_cabin.position.set(-1.415, 0.185, 0.79);
  car_cabin.rotation.x = -0.08;
  site_group.add(car_cabin);

  const car_wheel_parts = [];
  for (const x of [-1.49, -1.29]) {
    pushBox(car_wheel_parts, x, 0.092, 0.734, 0.034, 0.034, 0.034);
    pushBox(car_wheel_parts, x, 0.092, 0.846, 0.034, 0.034, 0.034);
  }
  const car_wheels = new THREE.InstancedMesh(
    unitBoxGeom,
    frameMat,
    car_wheel_parts.length
  );
  car_wheels.name = "car_wheels";
  applyParts(car_wheels, car_wheel_parts);
  site_group.add(car_wheels);

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