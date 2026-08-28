export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_folding_stand";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x765137,
    metalness: 0.0,
    roughness: 0.9,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4b3021,
    metalness: 0.0,
    roughness: 0.9,
  });
  const edgeWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6b43,
    metalness: 0.0,
    roughness: 0.9,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x2f2119,
    metalness: 0.0,
    roughness: 0.9,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.5,
  });

  function makeRoundedPanelGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const grainGeom = new THREE.BoxGeometry(0.006, 1, 0.003);

  function createWoodGrain(width, height, count, z) {
    const grain = new THREE.InstancedMesh(grainGeom, grainMat, count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const xFactor = ((i * 37 + 5) % 101) / 100;
      const yFactor = ((i * 53 + 17) % 97) / 96;
      const lengthFactor = ((i * 29 + 11) % 89) / 88;
      const x = -width * 0.39 + width * 0.78 * xFactor;
      const span = height * (0.18 + 0.55 * lengthFactor);
      const rawY = -height * 0.43 + height * 0.86 * yFactor;
      const y = Math.max(
        -height / 2 + span / 2 + 0.025,
        Math.min(height / 2 - span / 2 - 0.025, rawY)
      );

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, 0, ((i % 7) - 3) * 0.008);
      dummy.scale.set(0.65 + (i % 3) * 0.22, span, 1);
      dummy.updateMatrix();
      grain.setMatrixAt(i, dummy.matrix);
    }

    grain.instanceMatrix.needsUpdate = true;
    return grain;
  }

  const rear_supportGeom = makeRoundedPanelGeometry(
    0.38,
    1.18,
    0.105,
    0.075,
    0.012
  );
  const rear_support = new THREE.Mesh(rear_supportGeom, woodMat);
  rear_support.name = "rear_support";
  rear_support.position.set(0.02, 0.59, -0.20);
  rear_support.rotation.x = 0.20;
  root.add(rear_support);

  const rear_support_grain = createWoodGrain(0.38, 1.18, 15, 0.066);
  rear_support_grain.name = "rear_support_grain";
  rear_support.add(rear_support_grain);

  const rear_support_edge_wearGeom = new THREE.BoxGeometry(0.014, 1.02, 0.004);
  const rear_support_edge_wear = new THREE.Mesh(
    rear_support_edge_wearGeom,
    edgeWoodMat
  );
  rear_support_edge_wear.name = "rear_support_edge_wear";
  rear_support_edge_wear.position.set(0.169, 0.015, 0.068);
  rear_support_edge_wear.rotation.z = -0.01;
  rear_support.add(rear_support_edge_wear);

  const top_foldGeom = makeRoundedPanelGeometry(
    0.40,
    0.58,
    0.105,
    0.085,
    0.012
  );
  const top_fold = new THREE.Mesh(top_foldGeom, woodMat);
  top_fold.name = "top_fold";
  top_fold.position.set(0.02, 1.29, -0.07);
  top_fold.rotation.x = -0.18;
  root.add(top_fold);

  const top_fold_grain = createWoodGrain(0.40, 0.58, 10, 0.066);
  top_fold_grain.name = "top_fold_grain";
  top_fold.add(top_fold_grain);

  const top_fold_edge_wearGeom = new THREE.BoxGeometry(0.016, 0.43, 0.004);
  const top_fold_edge_wear = new THREE.Mesh(
    top_fold_edge_wearGeom,
    edgeWoodMat
  );
  top_fold_edge_wear.name = "top_fold_edge_wear";
  top_fold_edge_wear.position.set(0.178, -0.01, 0.068);
  top_fold_edge_wear.rotation.z = 0.012;
  top_fold.add(top_fold_edge_wear);

  const inner_liningGeom = makeRoundedPanelGeometry(
    0.27,
    0.41,
    0.008,
    0.025,
    0.002
  );
  const inner_lining = new THREE.Mesh(inner_liningGeom, darkWoodMat);
  inner_lining.name = "inner_lining";
  inner_lining.position.set(-0.075, 1.29, 0.002);
  inner_lining.rotation.x = -0.18;
  root.add(inner_lining);

  const inner_lining_grain = createWoodGrain(0.27, 0.41, 7, 0.009);
  inner_lining_grain.name = "inner_lining_grain";
  inner_lining.add(inner_lining_grain);

  const front_panel_group = new THREE.Group();
  front_panel_group.name = "front_panel_group";
  front_panel_group.position.set(0, 0.63, 0.075);
  front_panel_group.rotation.x = -0.18;
  root.add(front_panel_group);

  const front_panelGeom = makeRoundedPanelGeometry(
    0.50,
    1.22,
    0.14,
    0.085,
    0.015
  );
  const front_panel = new THREE.Mesh(front_panelGeom, woodMat);
  front_panel.name = "front_panel";
  front_panel_group.add(front_panel);

  const front_panel_grain = createWoodGrain(0.50, 1.22, 22, 0.088);
  front_panel_grain.name = "front_panel_grain";
  front_panel_group.add(front_panel_grain);

  const front_panel_edge_wearGeom = new THREE.BoxGeometry(
    0.018,
    1.04,
    0.004
  );
  const front_panel_edge_wear = new THREE.Mesh(
    front_panel_edge_wearGeom,
    edgeWoodMat
  );
  front_panel_edge_wear.name = "front_panel_edge_wear";
  front_panel_edge_wear.position.set(0.222, 0.01, 0.09);
  front_panel_edge_wear.rotation.z = -0.008;
  front_panel_group.add(front_panel_edge_wear);

  const bottom_edge_wearGeom = new THREE.BoxGeometry(0.34, 0.014, 0.004);
  const bottom_edge_wear = new THREE.Mesh(bottom_edge_wearGeom, edgeWoodMat);
  bottom_edge_wear.name = "bottom_edge_wear";
  bottom_edge_wear.position.set(-0.015, -0.585, 0.09);
  bottom_edge_wear.rotation.z = 0.01;
  front_panel_group.add(bottom_edge_wear);

  const top_edge_wearGeom = new THREE.BoxGeometry(0.36, 0.013, 0.004);
  const top_edge_wear = new THREE.Mesh(top_edge_wearGeom, edgeWoodMat);
  top_edge_wear.name = "top_edge_wear";
  top_edge_wear.position.set(0, 0.588, 0.09);
  top_edge_wear.rotation.z = -0.008;
  front_panel_group.add(top_edge_wear);

  const front_knotGeom = new THREE.CircleGeometry(0.018, 16);
  const front_knot = new THREE.Mesh(front_knotGeom, grainMat);
  front_knot.name = "front_knot";
  front_knot.position.set(-0.13, -0.31, 0.091);
  front_knot.scale.set(0.65, 1.4, 1);
  front_knot.rotation.z = 0.22;
  front_panel_group.add(front_knot);

  const upper_fastenerGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.018,
    24
  );
  const upper_fastener = new THREE.Mesh(upper_fastenerGeom, silverMat);
  upper_fastener.name = "upper_fastener";
  upper_fastener.rotation.x = Math.PI / 2;
  upper_fastener.position.set(-0.145, 0.39, 0.099);
  front_panel_group.add(upper_fastener);

  const upper_fastener_centerGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.007,
    16
  );
  const upper_fastener_center = new THREE.Mesh(
    upper_fastener_centerGeom,
    darkMetalMat
  );
  upper_fastener_center.name = "upper_fastener_center";
  upper_fastener_center.rotation.x = Math.PI / 2;
  upper_fastener_center.position.set(-0.145, 0.39, 0.111);
  front_panel_group.add(upper_fastener_center);

  const upper_fastener_slotGeom = new THREE.BoxGeometry(
    0.006,
    0.027,
    0.004
  );
  const upper_fastener_slot_a = new THREE.Mesh(
    upper_fastener_slotGeom,
    silverMat
  );
  upper_fastener_slot_a.name = "upper_fastener_slot_a";
  upper_fastener_slot_a.position.set(-0.145, 0.39, 0.116);
  upper_fastener_slot_a.rotation.z = Math.PI / 4;
  front_panel_group.add(upper_fastener_slot_a);

  const upper_fastener_slot_b = new THREE.Mesh(
    upper_fastener_slotGeom,
    silverMat
  );
  upper_fastener_slot_b.name = "upper_fastener_slot_b";
  upper_fastener_slot_b.position.set(-0.145, 0.39, 0.116);
  upper_fastener_slot_b.rotation.z = -Math.PI / 4;
  front_panel_group.add(upper_fastener_slot_b);

  const side_pivot_washerGeom = new THREE.CylinderGeometry(
    0.047,
    0.047,
    0.014,
    20
  );
  const side_pivot_washer = new THREE.Mesh(
    side_pivot_washerGeom,
    darkMetalMat
  );
  side_pivot_washer.name = "side_pivot_washer";
  side_pivot_washer.rotation.z = Math.PI / 2;
  side_pivot_washer.position.set(0.274, 0.35, -0.005);
  front_panel_group.add(side_pivot_washer);

  const side_pivot_capGeom = new THREE.SphereGeometry(0.038, 18, 10);
  const side_pivot_cap = new THREE.Mesh(side_pivot_capGeom, silverMat);
  side_pivot_cap.name = "side_pivot_cap";
  side_pivot_cap.position.set(0.288, 0.35, -0.005);
  side_pivot_cap.scale.set(0.45, 1, 0.82);
  front_panel_group.add(side_pivot_cap);

  const lower_pivot_pinGeom = new THREE.CylinderGeometry(
    0.026,
    0.026,
    0.17,
    16
  );
  const lower_pivot_pin = new THREE.Mesh(
    lower_pivot_pinGeom,
    brushedMetalMat
  );
  lower_pivot_pin.name = "lower_pivot_pin";
  lower_pivot_pin.rotation.z = Math.PI / 2;
  lower_pivot_pin.position.set(0, -0.43, -0.04);
  front_panel_group.add(lower_pivot_pin);

  const rear_footGeom = new THREE.CylinderGeometry(
    0.033,
    0.039,
    0.18,
    14
  );
  const rear_foot = new THREE.Mesh(rear_footGeom, brushedMetalMat);
  rear_foot.name = "rear_foot";
  rear_foot.position.set(0.02, 0.07, -0.35);
  root.add(rear_foot);

  const rear_foot_capGeom = new THREE.SphereGeometry(0.038, 14, 8);
  const rear_foot_cap = new THREE.Mesh(rear_foot_capGeom, brushedMetalMat);
  rear_foot_cap.name = "rear_foot_cap";
  rear_foot_cap.position.set(0.02, 0.006, -0.35);
  rear_foot_cap.scale.set(1, 0.35, 1);
  root.add(rear_foot_cap);

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