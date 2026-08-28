export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "round_pedestal_table";

  const pedestal_assembly = new THREE.Group();
  pedestal_assembly.name = "pedestal_assembly";
  root.add(pedestal_assembly);

  const tabletop_assembly = new THREE.Group();
  tabletop_assembly.name = "tabletop_assembly";
  root.add(tabletop_assembly);

  const white_lacquerMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2f0,
    metalness: 0.0,
    roughness: 0.3
  });
  const pale_woodMat = new THREE.MeshStandardMaterial({
    color: 0xe5d8c3,
    metalness: 0.0,
    roughness: 0.6
  });
  const raw_woodMat = new THREE.MeshStandardMaterial({
    color: 0xc9b18d,
    metalness: 0.0,
    roughness: 0.9
  });
  const plywood_layerMat = new THREE.MeshStandardMaterial({
    color: 0xb89d79,
    metalness: 0.0,
    roughness: 0.9
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.8
  });

  const base_footGeom = new THREE.CylinderGeometry(0.86, 0.86, 0.018, 64);
  const base_foot = new THREE.Mesh(base_footGeom, rubberMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.009;
  pedestal_assembly.add(base_foot);

  const pedestal_baseProfile = [
    new THREE.Vector2(0.00, 0.018),
    new THREE.Vector2(0.78, 0.018),
    new THREE.Vector2(0.85, 0.025),
    new THREE.Vector2(0.89, 0.050),
    new THREE.Vector2(0.90, 0.078),
    new THREE.Vector2(0.885, 0.110),
    new THREE.Vector2(0.84, 0.142),
    new THREE.Vector2(0.72, 0.165),
    new THREE.Vector2(0.00, 0.165)
  ];
  const pedestal_baseGeom = new THREE.LatheGeometry(pedestal_baseProfile, 64);
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, white_lacquerMat);
  pedestal_base.name = "pedestal_base";
  pedestal_assembly.add(pedestal_base);

  const pedestal_base_rimGeom = new THREE.TorusGeometry(0.872, 0.018, 10, 64);
  const pedestal_base_rim = new THREE.Mesh(pedestal_base_rimGeom, white_lacquerMat);
  pedestal_base_rim.name = "pedestal_base_rim";
  pedestal_base_rim.rotation.x = Math.PI / 2;
  pedestal_base_rim.position.y = 0.068;
  pedestal_assembly.add(pedestal_base_rim);

  const pedestal_columnGeom = new THREE.CylinderGeometry(0.19, 0.19, 1.53, 48);
  const pedestal_column = new THREE.Mesh(pedestal_columnGeom, white_lacquerMat);
  pedestal_column.name = "pedestal_column";
  pedestal_column.position.y = 0.925;
  pedestal_assembly.add(pedestal_column);

  const pedestal_bottom_collarGeom = new THREE.TorusGeometry(0.174, 0.016, 10, 48);
  const pedestal_bottom_collar = new THREE.Mesh(pedestal_bottom_collarGeom, white_lacquerMat);
  pedestal_bottom_collar.name = "pedestal_bottom_collar";
  pedestal_bottom_collar.rotation.x = Math.PI / 2;
  pedestal_bottom_collar.position.y = 0.17;
  pedestal_assembly.add(pedestal_bottom_collar);

  const pedestal_top_collarGeom = new THREE.CylinderGeometry(0.23, 0.21, 0.08, 48);
  const pedestal_top_collar = new THREE.Mesh(pedestal_top_collarGeom, white_lacquerMat);
  pedestal_top_collar.name = "pedestal_top_collar";
  pedestal_top_collar.position.y = 1.68;
  pedestal_assembly.add(pedestal_top_collar);

  const central_mounting_blockGeom = new THREE.BoxGeometry(0.38, 0.14, 0.38);
  const central_mounting_block = new THREE.Mesh(central_mounting_blockGeom, white_lacquerMat);
  central_mounting_block.name = "central_mounting_block";
  central_mounting_block.position.y = 1.74;
  pedestal_assembly.add(central_mounting_block);

  const lower_round_tabletopGeom = new THREE.CylinderGeometry(0.96, 0.96, 0.07, 64);
  const lower_round_tabletop = new THREE.Mesh(lower_round_tabletopGeom, white_lacquerMat);
  lower_round_tabletop.name = "lower_round_tabletop";
  lower_round_tabletop.position.y = 1.82;
  tabletop_assembly.add(lower_round_tabletop);

  const lower_round_edge_bandGeom = new THREE.CylinderGeometry(
    0.963,
    0.963,
    0.028,
    64,
    1,
    true
  );
  const lower_round_edge_band = new THREE.Mesh(lower_round_edge_bandGeom, pale_woodMat);
  lower_round_edge_band.name = "lower_round_edge_band";
  lower_round_edge_band.position.y = 1.836;
  tabletop_assembly.add(lower_round_edge_band);

  const lower_round_plywood_layerGeom = new THREE.TorusGeometry(0.955, 0.005, 6, 64);
  const lower_round_plywood_layers = new THREE.InstancedMesh(
    lower_round_plywood_layerGeom,
    plywood_layerMat,
    3
  );
  lower_round_plywood_layers.name = "lower_round_plywood_layers";
  const lower_layer_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    lower_layer_dummy.position.set(0, 1.822 + i * 0.014, 0);
    lower_layer_dummy.rotation.set(Math.PI / 2, 0, 0);
    lower_layer_dummy.updateMatrix();
    lower_round_plywood_layers.setMatrixAt(i, lower_layer_dummy.matrix);
  }
  lower_round_plywood_layers.instanceMatrix.needsUpdate = true;
  tabletop_assembly.add(lower_round_plywood_layers);

  const lower_round_top_veneerGeom = new THREE.CylinderGeometry(0.94, 0.94, 0.024, 64);
  const lower_round_top_veneer = new THREE.Mesh(lower_round_top_veneerGeom, pale_woodMat);
  lower_round_top_veneer.name = "lower_round_top_veneer";
  lower_round_top_veneer.position.y = 1.868;
  tabletop_assembly.add(lower_round_top_veneer);

  const leaf_inner_radius = 0.88;
  const leaf_outer_radius = 1.35;
  const leaf_half_angle = 0.942;
  const leaf_arc_steps = 20;

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(
    Math.cos(-leaf_half_angle) * leaf_inner_radius,
    Math.sin(-leaf_half_angle) * leaf_inner_radius
  );
  leaf_shape.lineTo(
    Math.cos(-leaf_half_angle) * leaf_outer_radius,
    Math.sin(-leaf_half_angle) * leaf_outer_radius
  );
  for (let i = 1; i <= leaf_arc_steps; i++) {
    const angle = -leaf_half_angle + (2 * leaf_half_angle * i) / leaf_arc_steps;
    leaf_shape.lineTo(
      Math.cos(angle) * leaf_outer_radius,
      Math.sin(angle) * leaf_outer_radius
    );
  }
  leaf_shape.lineTo(
    Math.cos(leaf_half_angle) * leaf_inner_radius,
    Math.sin(leaf_half_angle) * leaf_inner_radius
  );
  for (let i = leaf_arc_steps - 1; i >= 0; i--) {
    const angle = -leaf_half_angle + (2 * leaf_half_angle * i) / leaf_arc_steps;
    leaf_shape.lineTo(
      Math.cos(angle) * leaf_inner_radius,
      Math.sin(angle) * leaf_inner_radius
    );
  }
  leaf_shape.closePath();

  const leafGeom = new THREE.ExtrudeGeometry(leaf_shape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 1
  });

  const left_leaf = new THREE.Mesh(leafGeom, white_lacquerMat);
  left_leaf.name = "left_leaf";
  left_leaf.rotation.x = -Math.PI / 2;
  left_leaf.position.y = 1.81;
  tabletop_assembly.add(left_leaf);

  const right_leaf = new THREE.Mesh(leafGeom, white_lacquerMat);
  right_leaf.name = "right_leaf";
  right_leaf.rotation.x = -Math.PI / 2;
  right_leaf.scale.x = -1;
  right_leaf.position.y = 1.81;
  tabletop_assembly.add(right_leaf);

  const leaf_veneerGeom = new THREE.ShapeGeometry(leaf_shape, 20);

  const left_leaf_veneer = new THREE.Mesh(leaf_veneerGeom, pale_woodMat);
  left_leaf_veneer.name = "left_leaf_veneer";
  left_leaf_veneer.rotation.x = -Math.PI / 2;
  left_leaf_veneer.position.y = 1.879;
  tabletop_assembly.add(left_leaf_veneer);

  const right_leaf_veneer = new THREE.Mesh(leaf_veneerGeom, pale_woodMat);
  right_leaf_veneer.name = "right_leaf_veneer";
  right_leaf_veneer.rotation.x = -Math.PI / 2;
  right_leaf_veneer.scale.x = -1;
  right_leaf_veneer.position.y = 1.879;
  tabletop_assembly.add(right_leaf_veneer);

  const leaf_layerGeom = new THREE.ExtrudeGeometry(leaf_shape, {
    depth: 0.005,
    steps: 1,
    bevelEnabled: false
  });
  const leaf_plywood_layers = new THREE.InstancedMesh(
    leaf_layerGeom,
    plywood_layerMat,
    6
  );
  leaf_plywood_layers.name = "leaf_plywood_layers";
  const leaf_layer_dummy = new THREE.Object3D();
  const leaf_layer_heights = [1.824, 1.838, 1.852];
  let leaf_layer_index = 0;
  for (let i = 0; i < 3; i++) {
    leaf_layer_dummy.position.set(0, leaf_layer_heights[i], 0);
    leaf_layer_dummy.rotation.set(-Math.PI / 2, 0, 0);
    leaf_layer_dummy.scale.set(1, 1, 1);
    leaf_layer_dummy.updateMatrix();
    leaf_plywood_layers.setMatrixAt(leaf_layer_index++, leaf_layer_dummy.matrix);

    leaf_layer_dummy.rotation.set(-Math.PI / 2, 0, 0);
    leaf_layer_dummy.scale.set(-1, 1, 1);
    leaf_layer_dummy.updateMatrix();
    leaf_plywood_layers.setMatrixAt(leaf_layer_index++, leaf_layer_dummy.matrix);
  }
  leaf_plywood_layers.instanceMatrix.needsUpdate = true;
  tabletop_assembly.add(leaf_plywood_layers);

  const leaf_outer_trimGeom = new THREE.TorusGeometry(
    leaf_outer_radius,
    0.012,
    8,
    40,
    leaf_half_angle * 2
  );
  const leaf_outer_trim = new THREE.InstancedMesh(
    leaf_outer_trimGeom,
    white_lacquerMat,
    2
  );
  leaf_outer_trim.name = "leaf_outer_trim";
  const outer_trim_dummy = new THREE.Object3D();

  outer_trim_dummy.position.set(0, 1.84, 0);
  outer_trim_dummy.rotation.set(Math.PI / 2, 0, -leaf_half_angle);
  outer_trim_dummy.updateMatrix();
  leaf_outer_trim.setMatrixAt(0, outer_trim_dummy.matrix);

  outer_trim_dummy.rotation.set(Math.PI / 2, 0, Math.PI + leaf_half_angle);
  outer_trim_dummy.updateMatrix();
  leaf_outer_trim.setMatrixAt(1, outer_trim_dummy.matrix);
  leaf_outer_trim.instanceMatrix.needsUpdate = true;
  tabletop_assembly.add(leaf_outer_trim);

  const leaf_end_trimGeom = new THREE.BoxGeometry(
    leaf_outer_radius - leaf_inner_radius,
    0.045,
    0.018
  );
  const leaf_end_trims = new THREE.InstancedMesh(
    leaf_end_trimGeom,
    raw_woodMat,
    4
  );
  leaf_end_trims.name = "leaf_end_trims";
  const end_trim_dummy = new THREE.Object3D();
  const leaf_end_angles = [
    leaf_half_angle,
    -leaf_half_angle,
    Math.PI - leaf_half_angle,
    Math.PI + leaf_half_angle
  ];
  const end_trim_radius = (leaf_inner_radius + leaf_outer_radius) / 2;
  for (let i = 0; i < leaf_end_angles.length; i++) {
    const angle = leaf_end_angles[i];
    end_trim_dummy.position.set(
      Math.cos(angle) * end_trim_radius,
      1.838,
      Math.sin(angle) * end_trim_radius
    );
    end_trim_dummy.rotation.set(0, -angle, 0);
    end_trim_dummy.updateMatrix();
    leaf_end_trims.setMatrixAt(i, end_trim_dummy.matrix);
  }
  leaf_end_trims.instanceMatrix.needsUpdate = true;
  tabletop_assembly.add(leaf_end_trims);

  const rail_angle = leaf_half_angle;
  const rail_radius = 0.9;
  const extension_railGeom = new THREE.BoxGeometry(0.48, 0.035, 0.045);

  const left_extension_rail = new THREE.Mesh(extension_railGeom, brushed_metalMat);
  left_extension_rail.name = "left_extension_rail";
  left_extension_rail.position.set(
    Math.cos(rail_angle) * rail_radius,
    1.785,
    Math.sin(rail_angle) * rail_radius
  );
  left_extension_rail.rotation.y = -rail_angle;
  tabletop_assembly.add(left_extension_rail);

  const right_extension_rail = new THREE.Mesh(extension_railGeom, brushed_metalMat);
  right_extension_rail.name = "right_extension_rail";
  right_extension_rail.position.set(
    Math.cos(rail_angle) * rail_radius,
    1.785,
    -Math.sin(rail_angle) * rail_radius
  );
  right_extension_rail.rotation.y = rail_angle;
  tabletop_assembly.add(right_extension_rail);

  const rail_channelGeom = new THREE.BoxGeometry(0.39, 0.009, 0.012);

  const left_rail_channel = new THREE.Mesh(rail_channelGeom, dark_metalMat);
  left_rail_channel.name = "left_rail_channel";
  left_rail_channel.position.set(
    Math.cos(rail_angle) * 0.91,
    1.806,
    Math.sin(rail_angle) * 0.91
  );
  left_rail_channel.rotation.y = -rail_angle;
  tabletop_assembly.add(left_rail_channel);

  const right_rail_channel = new THREE.Mesh(rail_channelGeom, dark_metalMat);
  right_rail_channel.name = "right_rail_channel";
  right_rail_channel.position.set(
    Math.cos(rail_angle) * 0.91,
    1.806,
    -Math.sin(rail_angle) * 0.91
  );
  right_rail_channel.rotation.y = rail_angle;
  tabletop_assembly.add(right_rail_channel);

  const rail_fastenerGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.012, 12);
  const rail_fasteners = new THREE.InstancedMesh(
    rail_fastenerGeom,
    dark_metalMat,
    4
  );
  rail_fasteners.name = "rail_fasteners";
  const fastener_dummy = new THREE.Object3D();
  const rail_directions = [
    new THREE.Vector3(Math.cos(rail_angle), 0, Math.sin(rail_angle)),
    new THREE.Vector3(Math.cos(rail_angle), 0, -Math.sin(rail_angle))
  ];
  let fastener_index = 0;
  for (let i = 0; i < rail_directions.length; i++) {
    const direction = rail_directions[i];
    for (const radius of [0.75, 1.07]) {
      fastener_dummy.position.set(
        direction.x * radius,
        1.808,
        direction.z * radius
      );
      fastener_dummy.rotation.set(0, 0, 0);
      fastener_dummy.updateMatrix();
      rail_fasteners.setMatrixAt(fastener_index++, fastener_dummy.matrix);
    }
  }
  rail_fasteners.instanceMatrix.needsUpdate = true;
  tabletop_assembly.add(rail_fasteners);

  const upper_round_tabletopProfile = [
    new THREE.Vector2(0.00, 0.000),
    new THREE.Vector2(0.77, 0.000),
    new THREE.Vector2(0.84, 0.008),
    new THREE.Vector2(0.885, 0.026),
    new THREE.Vector2(0.915, 0.055),
    new THREE.Vector2(0.925, 0.088),
    new THREE.Vector2(0.920, 0.120),
    new THREE.Vector2(0.900, 0.148),
    new THREE.Vector2(0.860, 0.170),
    new THREE.Vector2(0.780, 0.180),
    new THREE.Vector2(0.00, 0.180)
  ];
  const upper_round_tabletopGeom = new THREE.LatheGeometry(
    upper_round_tabletopProfile,
    64
  );
  const upper_round_tabletop = new THREE.Mesh(
    upper_round_tabletopGeom,
    white_lacquerMat
  );
  upper_round_tabletop.name = "upper_round_tabletop";
  upper_round_tabletop.position.y = 1.88;
  tabletop_assembly.add(upper_round_tabletop);

  const upper_round_shadow_seamGeom = new THREE.TorusGeometry(0.845, 0.008, 8, 64);
  const upper_round_shadow_seam = new THREE.Mesh(
    upper_round_shadow_seamGeom,
    dark_metalMat
  );
  upper_round_shadow_seam.name = "upper_round_shadow_seam";
  upper_round_shadow_seam.rotation.x = Math.PI / 2;
  upper_round_shadow_seam.position.y = 1.884;
  tabletop_assembly.add(upper_round_shadow_seam);

  const upper_round_edge_bandGeom = new THREE.TorusGeometry(0.907, 0.015, 10, 64);
  const upper_round_edge_band = new THREE.Mesh(
    upper_round_edge_bandGeom,
    white_lacquerMat
  );
  upper_round_edge_band.name = "upper_round_edge_band";
  upper_round_edge_band.rotation.x = Math.PI / 2;
  upper_round_edge_band.position.y = 1.965;
  tabletop_assembly.add(upper_round_edge_band);

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

  fitToUnitCube(root);
  return root;
}