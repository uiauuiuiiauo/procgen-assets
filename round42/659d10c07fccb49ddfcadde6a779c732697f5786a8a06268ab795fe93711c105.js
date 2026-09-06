export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "red_wooden_clatter";

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const slat_group = new THREE.Group();
  slat_group.name = "slat_group";
  root.add(slat_group);

  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  root.add(hardware_group);

  const red_woodMat = new THREE.MeshStandardMaterial({
    color: 0xc92f38,
    metalness: 0.0,
    roughness: 0.6
  });

  const dark_red_woodMat = new THREE.MeshStandardMaterial({
    color: 0x7d1820,
    metalness: 0.0,
    roughness: 0.6
  });

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x68131a,
    metalness: 0.0,
    roughness: 0.9
  });

  const connectorMat = new THREE.MeshStandardMaterial({
    color: 0x916342,
    metalness: 0.5,
    roughness: 0.5
  });

  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const screw_slotMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.8
  });

  function createRoundedPrism(width, depth, height, radius, bevel) {
    const halfW = width * 0.5;
    const halfD = depth * 0.5;
    const r = Math.min(radius, halfW, halfD);
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + r, -halfD);
    shape.lineTo(halfW - r, -halfD);
    shape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + r);
    shape.lineTo(halfW, halfD - r);
    shape.quadraticCurveTo(halfW, halfD, halfW - r, halfD);
    shape.lineTo(-halfW + r, halfD);
    shape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - r);
    shape.lineTo(-halfW, -halfD + r);
    shape.quadraticCurveTo(-halfW, -halfD, -halfW + r, -halfD);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -height * 0.5);
    geometry.rotateX(-Math.PI * 0.5);
    return geometry;
  }

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, rz);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const end_blocksGeom = createRoundedPrism(1.18, 0.50, 0.34, 0.075, 0.018);
  const end_blocks = new THREE.InstancedMesh(end_blocksGeom, red_woodMat, 2);
  end_blocks.name = "end_blocks";
  setInstance(end_blocks, 0, 0, 0.00, -1.43, 0, 0, 0, 1, 1, 1);
  setInstance(end_blocks, 1, 0, 0.00, 1.43, 0, 0, 0, 1, 1, 1);
  end_blocks.instanceMatrix.needsUpdate = true;
  frame_group.add(end_blocks);

  const end_block_feetGeom = createRoundedPrism(1.02, 0.39, 0.14, 0.055, 0.014);
  const end_block_feet = new THREE.InstancedMesh(end_block_feetGeom, dark_red_woodMat, 2);
  end_block_feet.name = "end_block_feet";
  setInstance(end_block_feet, 0, 0, -0.215, -1.43, 0, 0, 0, 1, 1, 1);
  setInstance(end_block_feet, 1, 0, -0.215, 1.43, 0, 0, 0, 1, 1, 1);
  end_block_feet.instanceMatrix.needsUpdate = true;
  frame_group.add(end_block_feet);

  const inner_side_railsGeom = createRoundedPrism(0.17, 2.30, 0.18, 0.045, 0.012);
  const inner_side_rails = new THREE.InstancedMesh(inner_side_railsGeom, dark_red_woodMat, 2);
  inner_side_rails.name = "inner_side_rails";
  setInstance(inner_side_rails, 0, -0.40, 0.105, 0, 0, 0, 0, 1, 1, 1);
  setInstance(inner_side_rails, 1, 0.40, 0.105, 0, 0, 0, 0, 1, 1, 1);
  inner_side_rails.instanceMatrix.needsUpdate = true;
  frame_group.add(inner_side_rails);

  const rail_grain_linesGeom = new THREE.BoxGeometry(0.010, 0.004, 1);
  const rail_grain_lines = new THREE.InstancedMesh(rail_grain_linesGeom, wood_grainMat, 8);
  rail_grain_lines.name = "rail_grain_lines";
  const rail_grain_data = [
    [-0.435, -0.48, 1.20],
    [-0.365, 0.34, 1.38],
    [-0.425, 0.72, 0.72],
    [-0.375, -0.76, 0.62],
    [0.435, -0.36, 1.34],
    [0.365, 0.48, 1.12],
    [0.425, 0.78, 0.66],
    [0.375, -0.78, 0.70]
  ];
  for (let i = 0; i < rail_grain_data.length; i++) {
    const data = rail_grain_data[i];
    setInstance(rail_grain_lines, i, data[0], 0.209, data[1], 0, 0, 0, 1, 1, data[2]);
  }
  rail_grain_lines.instanceMatrix.needsUpdate = true;
  frame_group.add(rail_grain_lines);

  const slat_lengths = [1.10, 1.30, 1.48, 1.58, 1.52, 1.34, 1.12];
  const slat_yaws = [-0.035, 0.025, -0.018, 0.012, -0.014, 0.022, -0.025];
  const slat_centers_x = [-0.15, -0.12, -0.08, -0.02, 0.05, 0.12, 0.18];
  const slat_centers_z = [-0.84, -0.56, -0.28, 0.00, 0.28, 0.56, 0.84];
  const slat_count = slat_lengths.length;

  const top_slatsGeom = createRoundedPrism(1.0, 0.225, 0.075, 0.048, 0.012);
  const top_slats = new THREE.InstancedMesh(top_slatsGeom, red_woodMat, slat_count);
  top_slats.name = "top_slats";
  for (let i = 0; i < slat_count; i++) {
    setInstance(
      top_slats,
      i,
      slat_centers_x[i],
      0.235,
      slat_centers_z[i],
      0,
      slat_yaws[i],
      0,
      slat_lengths[i],
      1,
      1
    );
  }
  top_slats.instanceMatrix.needsUpdate = true;
  slat_group.add(top_slats);

  const slat_grain_linesGeom = new THREE.BoxGeometry(1, 0.003, 0.007);
  const slat_grain_lines = new THREE.InstancedMesh(
    slat_grain_linesGeom,
    wood_grainMat,
    slat_count * 2
  );
  slat_grain_lines.name = "slat_grain_lines";

  let grain_index = 0;
  for (let i = 0; i < slat_count; i++) {
    const yaw = slat_yaws[i];
    const centerX = slat_centers_x[i];
    const centerZ = slat_centers_z[i];
    const length = slat_lengths[i];

    for (let j = 0; j < 2; j++) {
      const localX = ((i + j) % 2 === 0 ? -0.13 : 0.16) * length;
      const localZ = j === 0 ? -0.052 : 0.050;
      const x = centerX + Math.cos(yaw) * localX + Math.sin(yaw) * localZ;
      const z = centerZ - Math.sin(yaw) * localX + Math.cos(yaw) * localZ;
      const lineLength = length * (j === 0 ? 0.50 : 0.36);

      setInstance(
        slat_grain_lines,
        grain_index,
        x,
        0.294,
        z,
        0,
        yaw,
        0,
        lineLength,
        1,
        1
      );
      grain_index++;
    }
  }
  slat_grain_lines.instanceMatrix.needsUpdate = true;
  slat_group.add(slat_grain_lines);

  const connector_z = [-0.70, -0.42, -0.14, 0.14, 0.42, 0.70];
  const connector_barsGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.88, 10);
  const connector_bars = new THREE.InstancedMesh(
    connector_barsGeom,
    connectorMat,
    connector_z.length
  );
  connector_bars.name = "connector_bars";
  for (let i = 0; i < connector_z.length; i++) {
    setInstance(
      connector_bars,
      i,
      0,
      0.175,
      connector_z[i],
      0,
      0,
      Math.PI * 0.5,
      1,
      1,
      1
    );
  }
  connector_bars.instanceMatrix.needsUpdate = true;
  hardware_group.add(connector_bars);

  const connector_spacersGeom = new THREE.CylinderGeometry(0.046, 0.046, 0.075, 10);
  const connector_spacers = new THREE.InstancedMesh(
    connector_spacersGeom,
    connectorMat,
    connector_z.length * 2
  );
  connector_spacers.name = "connector_spacers";

  let spacer_index = 0;
  for (let i = 0; i < connector_z.length; i++) {
    setInstance(connector_spacers, spacer_index++, -0.40, 0.175, connector_z[i], 0, 0, 0, 1, 1, 1);
    setInstance(connector_spacers, spacer_index++, 0.40, 0.175, connector_z[i], 0, 0, 0, 1, 1, 1);
  }
  connector_spacers.instanceMatrix.needsUpdate = true;
  hardware_group.add(connector_spacers);

  const screw_data = [];
  for (let i = 0; i < slat_count; i++) {
    const localX = 0.36;
    const localZ = 0;
    const x = slat_centers_x[i] + Math.cos(slat_yaws[i]) * localX;
    const z = slat_centers_z[i] - Math.sin(slat_yaws[i]) * localX;
    screw_data.push([x, 0.298, z, 1]);
  }

  screw_data.push([-0.22, 0.198, -1.43, 1.25]);
  screw_data.push([0.22, 0.198, 1.43, 1.25]);

  const screw_headsGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 18);
  const screw_heads = new THREE.InstancedMesh(screw_headsGeom, screwMat, screw_data.length);
  screw_heads.name = "screw_heads";

  const screw_head_rimsGeom = new THREE.TorusGeometry(0.036, 0.005, 6, 18);
  const screw_head_rims = new THREE.InstancedMesh(
    screw_head_rimsGeom,
    screwMat,
    screw_data.length
  );
  screw_head_rims.name = "screw_head_rims";

  const screw_slotsGeom = new THREE.BoxGeometry(0.052, 0.004, 0.010);
  const screw_slots = new THREE.InstancedMesh(
    screw_slotsGeom,
    screw_slotMat,
    screw_data.length
  );
  screw_slots.name = "screw_slots";

  for (let i = 0; i < screw_data.length; i++) {
    const data = screw_data[i];
    const scale = data[3];

    setInstance(screw_heads, i, data[0], data[1], data[2], 0, 0, 0, scale, 1, scale);
    setInstance(
      screw_head_rims,
      i,
      data[0],
      data[1] + 0.011,
      data[2],
      Math.PI * 0.5,
      0,
      0,
      scale,
      scale,
      scale
    );
    setInstance(
      screw_slots,
      i,
      data[0],
      data[1] + 0.012,
      data[2],
      0,
      i * 0.47,
      0,
      scale,
      1,
      scale
    );
  }

  screw_heads.instanceMatrix.needsUpdate = true;
  screw_head_rims.instanceMatrix.needsUpdate = true;
  screw_slots.instanceMatrix.needsUpdate = true;
  hardware_group.add(screw_heads, screw_head_rims, screw_slots);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(root);
  return root;
}