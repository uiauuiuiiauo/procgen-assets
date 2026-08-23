export default function generate(THREE) {
  const root = new THREE.Group();

  const white_paintMat = new THREE.MeshStandardMaterial({
    color: 0xe8e9e6,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const lower_hullMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const windowMat = new THREE.MeshPhysicalMaterial({
    color: 0x263238,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.15,
    ior: 1.5,
    transparent: true,
    opacity: 0.92,
  });
  const dark_interiorMat = new THREE.MeshStandardMaterial({
    color: 0x171a1a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const red_paintMat = new THREE.MeshStandardMaterial({
    color: 0xb00018,
    metalness: 0.0,
    roughness: 0.3,
  });
  const navigation_lightMat = new THREE.MeshStandardMaterial({
    color: 0xffffdd,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffffdd,
    emissiveIntensity: 1.0,
  });

  function createLoftGeometry(sections) {
    const positions = [];
    const indices = [];

    for (const section of sections) {
      positions.push(
        section.topWidth, section.topY, section.z,
        section.bottomWidth, section.bottomY, section.z
      );
    }

    for (let i = 0; i < sections.length - 1; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, c, b, d);
    }

    const end = (sections.length - 1) * 2;
    indices.push(0, 1, 2, 1, 3, 2);
    indices.push(end, end + 1, end + 2, end + 1, end + 3, end + 2);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createRod(start, end, radius, material, radialSegments = 10) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      radialSegments
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    root.add(mesh);
    return mesh;
  }

  function createCurveTube(points, radius, material, tubularSegments = 32) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      radius,
      8,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    root.add(mesh);
    return mesh;
  }

  const lower_hullSections = [
    { z: -2.35, topY: 0.38, topWidth: 0.72, bottomY: -0.42, bottomWidth: 0.58 },
    { z: -1.70, topY: 0.38, topWidth: 0.78, bottomY: -0.68, bottomWidth: 0.50 },
    { z: -0.80, topY: 0.38, topWidth: 0.80, bottomY: -0.78, bottomWidth: 0.42 },
    { z: 0.20, topY: 0.39, topWidth: 0.80, bottomY: -0.78, bottomWidth: 0.38 },
    { z: 1.10, topY: 0.40, topWidth: 0.76, bottomY: -0.68, bottomWidth: 0.32 },
    { z: 1.80, topY: 0.43, topWidth: 0.62, bottomY: -0.42, bottomWidth: 0.20 },
    { z: 2.35, topY: 0.52, topWidth: 0.28, bottomY: 0.08, bottomWidth: 0.055 },
    { z: 2.55, topY: 0.60, topWidth: 0.035, bottomY: 0.42, bottomWidth: 0.015 },
  ];
  const lower_hullGeom = createLoftGeometry(lower_hullSections);
  const lower_hull = new THREE.Mesh(lower_hullGeom, lower_hullMat);
  root.add(lower_hull);

  const upper_hullSections = [
    { z: -2.35, topY: 0.86, topWidth: 0.84, bottomY: 0.38, bottomWidth: 0.72 },
    { z: -1.70, topY: 0.90, topWidth: 0.88, bottomY: 0.38, bottomWidth: 0.78 },
    { z: -0.80, topY: 0.92, topWidth: 0.89, bottomY: 0.38, bottomWidth: 0.80 },
    { z: 0.20, topY: 0.95, topWidth: 0.88, bottomY: 0.39, bottomWidth: 0.80 },
    { z: 1.10, topY: 0.99, topWidth: 0.82, bottomY: 0.40, bottomWidth: 0.76 },
    { z: 1.80, topY: 1.04, topWidth: 0.68, bottomY: 0.43, bottomWidth: 0.62 },
    { z: 2.35, topY: 1.08, topWidth: 0.32, bottomY: 0.52, bottomWidth: 0.28 },
    { z: 2.55, topY: 1.09, topWidth: 0.04, bottomY: 0.60, bottomWidth: 0.035 },
  ];
  const upper_hullGeom = createLoftGeometry(upper_hullSections);
  const upper_hull = new THREE.Mesh(upper_hullGeom, white_paintMat);
  root.add(upper_hull);

  const upper_rub_rail_port = createCurveTube([
    new THREE.Vector3(-0.85, 0.87, -2.30),
    new THREE.Vector3(-0.89, 0.91, -1.20),
    new THREE.Vector3(-0.88, 0.95, 0.20),
    new THREE.Vector3(-0.81, 1.00, 1.35),
    new THREE.Vector3(-0.60, 1.06, 2.00),
    new THREE.Vector3(-0.20, 1.09, 2.42),
  ], 0.032, brushed_metalMat, 40);

  const upper_rub_rail_starboard = createCurveTube([
    new THREE.Vector3(0.85, 0.87, -2.30),
    new THREE.Vector3(0.89, 0.91, -1.20),
    new THREE.Vector3(0.88, 0.95, 0.20),
    new THREE.Vector3(0.81, 1.00, 1.35),
    new THREE.Vector3(0.60, 1.06, 2.00),
    new THREE.Vector3(0.20, 1.09, 2.42),
  ], 0.032, brushed_metalMat, 40);

  const lower_rub_rail_port = createCurveTube([
    new THREE.Vector3(-0.73, 0.40, -2.30),
    new THREE.Vector3(-0.79, 0.40, -1.20),
    new THREE.Vector3(-0.80, 0.40, 0.10),
    new THREE.Vector3(-0.74, 0.42, 1.30),
    new THREE.Vector3(-0.57, 0.47, 2.00),
    new THREE.Vector3(-0.20, 0.57, 2.40),
  ], 0.028, brushed_metalMat, 40);

  const lower_rub_rail_starboard = createCurveTube([
    new THREE.Vector3(0.73, 0.40, -2.30),
    new THREE.Vector3(0.79, 0.40, -1.20),
    new THREE.Vector3(0.80, 0.40, 0.10),
    new THREE.Vector3(0.74, 0.42, 1.30),
    new THREE.Vector3(0.57, 0.47, 2.00),
    new THREE.Vector3(0.20, 0.57, 2.40),
  ], 0.028, brushed_metalMat, 40);

  const cabinShape = new THREE.Shape();
  cabinShape.moveTo(-0.72, 0.93);
  cabinShape.lineTo(0.78, 0.95);
  cabinShape.lineTo(0.64, 1.58);
  cabinShape.lineTo(-0.48, 1.58);
  cabinShape.closePath();

  const cabinGeom = new THREE.ExtrudeGeometry(cabinShape, {
    depth: 1.24,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  const cabin = new THREE.Mesh(cabinGeom, white_paintMat);
  cabin.rotation.y = -Math.PI / 2;
  cabin.position.x = 0.62;
  root.add(cabin);

  const cabin_roofGeom = new THREE.BoxGeometry(1.46, 0.09, 1.55);
  const cabin_roof = new THREE.Mesh(cabin_roofGeom, white_paintMat);
  cabin_roof.position.set(0, 1.625, -0.02);
  root.add(cabin_roof);

  const roof_edgeGeom = new THREE.CylinderGeometry(0.055, 0.055, 1.46, 14);
  const roof_edges = new THREE.InstancedMesh(
    roof_edgeGeom,
    white_paintMat,
    2
  );
  const roof_edge_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    roof_edge_dummy.position.set(0, 1.61, i === 0 ? -0.795 : 0.755);
    roof_edge_dummy.rotation.set(0, 0, Math.PI / 2);
    roof_edge_dummy.updateMatrix();
    roof_edges.setMatrixAt(i, roof_edge_dummy.matrix);
  }
  roof_edges.instanceMatrix.needsUpdate = true;
  root.add(roof_edges);

  const side_window_framesGeom = new THREE.BoxGeometry(0.025, 0.40, 0.42);
  const side_window_frames = new THREE.InstancedMesh(
    side_window_framesGeom,
    brushed_metalMat,
    6
  );
  const side_windowsGeom = new THREE.BoxGeometry(0.026, 0.32, 0.34);
  const side_windows = new THREE.InstancedMesh(
    side_windowsGeom,
    windowMat,
    6
  );
  const side_window_dummy = new THREE.Object3D();
  const windowZ = [-0.45, 0.02, 0.47];
  let side_window_index = 0;
  for (const side of [-1, 1]) {
    for (const z of windowZ) {
      side_window_dummy.position.set(side * 0.635, 1.34, z);
      side_window_dummy.rotation.set(0, 0, 0);
      side_window_dummy.updateMatrix();
      side_window_frames.setMatrixAt(side_window_index, side_window_dummy.matrix);

      side_window_dummy.position.set(side * 0.652, 1.34, z);
      side_window_dummy.updateMatrix();
      side_windows.setMatrixAt(side_window_index, side_window_dummy.matrix);
      side_window_index++;
    }
  }
  side_window_frames.instanceMatrix.needsUpdate = true;
  side_windows.instanceMatrix.needsUpdate = true;
  root.add(side_window_frames, side_windows);

  const front_windshield_frameGeom = new THREE.BoxGeometry(1.08, 0.42, 0.03);
  const front_windshield_frame = new THREE.Mesh(
    front_windshield_frameGeom,
    brushed_metalMat
  );
  front_windshield_frame.position.set(0, 1.33, 0.705);
  front_windshield_frame.rotation.x = -0.23;
  root.add(front_windshield_frame);

  const front_windshieldGeom = new THREE.BoxGeometry(0.98, 0.34, 0.034);
  const front_windshield = new THREE.Mesh(front_windshieldGeom, windowMat);
  front_windshield.position.set(0, 1.335, 0.724);
  front_windshield.rotation.x = -0.23;
  root.add(front_windshield);

  const aft_cargo_wellGeom = new THREE.BoxGeometry(1.18, 0.035, 0.92);
  const aft_cargo_well = new THREE.Mesh(aft_cargo_wellGeom, dark_interiorMat);
  aft_cargo_well.position.set(0, 0.975, -1.18);
  root.add(aft_cargo_well);

  const aft_coverGeom = new THREE.BoxGeometry(1.36, 0.07, 1.00);
  const aft_cover = new THREE.Mesh(aft_coverGeom, white_paintMat);
  aft_cover.position.set(0, 1.105, -1.18);
  root.add(aft_cover);

  const aft_cover_edgeGeom = new THREE.BoxGeometry(0.035, 0.055, 1.04);
  const aft_cover_edges = new THREE.InstancedMesh(
    aft_cover_edgeGeom,
    brushed_metalMat,
    2
  );
  const aft_edge_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    aft_edge_dummy.position.set(i === 0 ? -0.69 : 0.69, 1.09, -1.18);
    aft_edge_dummy.updateMatrix();
    aft_cover_edges.setMatrixAt(i, aft_edge_dummy.matrix);
  }
  aft_cover_edges.instanceMatrix.needsUpdate = true;
  root.add(aft_cover_edges);

  const stern_transomGeom = new THREE.BoxGeometry(1.64, 0.48, 0.08);
  const stern_transom = new THREE.Mesh(stern_transomGeom, white_paintMat);
  stern_transom.position.set(0, 0.63, -2.33);
  root.add(stern_transom);

  const stern_openingGeom = new THREE.BoxGeometry(1.22, 0.25, 0.035);
  const stern_opening = new THREE.Mesh(stern_openingGeom, dark_interiorMat);
  stern_opening.position.set(0, 0.66, -2.375);
  root.add(stern_opening);

  const cockpit_coamingGeom = new THREE.BoxGeometry(0.07, 0.18, 1.12);
  const cockpit_coaming_port = new THREE.Mesh(
    cockpit_coamingGeom,
    white_paintMat
  );
  cockpit_coaming_port.position.set(-0.79, 1.00, -1.16);
  root.add(cockpit_coaming_port);

  const cockpit_coaming_starboard = new THREE.Mesh(
    cockpit_coamingGeom,
    white_paintMat
  );
  cockpit_coaming_starboard.position.set(0.79, 1.00, -1.16);
  root.add(cockpit_coaming_starboard);

  const cockpit_bollardsGeom = new THREE.CylinderGeometry(
    0.045,
    0.055,
    0.16,
    12
  );
  const cockpit_bollards = new THREE.InstancedMesh(
    cockpit_bollardsGeom,
    brushed_metalMat,
    4
  );
  const bollard_dummy = new THREE.Object3D();
  const bollard_positions = [
    [-0.58, -1.62],
    [0.58, -1.62],
    [-0.58, -0.70],
    [0.58, -0.70],
  ];
  for (let i = 0; i < bollard_positions.length; i++) {
    bollard_dummy.position.set(
      bollard_positions[i][0],
      1.13,
      bollard_positions[i][1]
    );
    bollard_dummy.updateMatrix();
    cockpit_bollards.setMatrixAt(i, bollard_dummy.matrix);
  }
  cockpit_bollards.instanceMatrix.needsUpdate = true;
  root.add(cockpit_bollards);

  const bow_rail_port = createRod(
    new THREE.Vector3(-0.62, 1.20, 1.72),
    new THREE.Vector3(-0.18, 1.43, 2.39),
    0.025,
    brushed_metalMat
  );
  const bow_rail_starboard = createRod(
    new THREE.Vector3(0.62, 1.20, 1.72),
    new THREE.Vector3(0.18, 1.43, 2.39),
    0.025,
    brushed_metalMat
  );
  const bow_rail_crossbar = createRod(
    new THREE.Vector3(-0.18, 1.43, 2.39),
    new THREE.Vector3(0.18, 1.43, 2.39),
    0.025,
    brushed_metalMat
  );
  const bow_rail_rear_crossbar = createRod(
    new THREE.Vector3(-0.62, 1.20, 1.72),
    new THREE.Vector3(0.62, 1.20, 1.72),
    0.022,
    brushed_metalMat
  );

  const bow_hatchGeom = new THREE.BoxGeometry(0.62, 0.035, 0.48);
  const bow_hatch = new THREE.Mesh(bow_hatchGeom, dark_interiorMat);
  bow_hatch.position.set(0, 1.025, 1.62);
  bow_hatch.rotation.x = -0.04;
  root.add(bow_hatch);

  const mast_pedestalGeom = new THREE.CylinderGeometry(
    0.16,
    0.21,
    0.34,
    18
  );
  const mast_pedestal = new THREE.Mesh(mast_pedestalGeom, white_paintMat);
  mast_pedestal.position.set(0, 1.82, 0.02);
  root.add(mast_pedestal);

  const mast_domeGeom = new THREE.SphereGeometry(0.18, 20, 12);
  const mast_dome = new THREE.Mesh(mast_domeGeom, white_paintMat);
  mast_dome.scale.set(1.0, 0.55, 1.0);
  mast_dome.position.set(0, 2.00, 0.02);
  root.add(mast_dome);

  const radar_barGeom = new THREE.BoxGeometry(0.72, 0.055, 0.075);
  const radar_bar = new THREE.Mesh(radar_barGeom, brushed_metalMat);
  radar_bar.position.set(0, 2.055, 0.02);
  root.add(radar_bar);

  const antennaGeom = new THREE.CylinderGeometry(0.009, 0.014, 1.02, 8);
  const antenna = new THREE.Mesh(antennaGeom, brushed_metalMat);
  antenna.position.set(0, 2.56, 0.02);
  antenna.rotation.z = -0.035;
  root.add(antenna);

  const radio_antennaGeom = new THREE.CylinderGeometry(
    0.007,
    0.009,
    0.42,
    8
  );
  const radio_antenna = new THREE.Mesh(
    radio_antennaGeom,
    brushed_metalMat
  );
  radio_antenna.position.set(0.34, 1.86, -0.26);
  root.add(radio_antenna);

  const navigation_lightGeom = new THREE.SphereGeometry(0.045, 14, 8);
  const navigation_light = new THREE.Mesh(
    navigation_lightGeom,
    navigation_lightMat
  );
  navigation_light.position.set(-0.42, 1.73, 0.42);
  root.add(navigation_light);

  const roof_ventGeom = new THREE.CylinderGeometry(0.055, 0.065, 0.10, 12);
  const roof_vents = new THREE.InstancedMesh(
    roof_ventGeom,
    brushed_metalMat,
    2
  );
  const roof_vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    roof_vent_dummy.position.set(i === 0 ? -0.25 : 0.25, 1.72, -0.40);
    roof_vent_dummy.updateMatrix();
    roof_vents.setMatrixAt(i, roof_vent_dummy.matrix);
  }
  roof_vents.instanceMatrix.needsUpdate = true;
  root.add(roof_vents);

  const porthole_rimsGeom = new THREE.CylinderGeometry(
    0.085,
    0.085,
    0.035,
    18
  );
  const porthole_rims = new THREE.InstancedMesh(
    porthole_rimsGeom,
    brushed_metalMat,
    2
  );
  const porthole_glassGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    0.042,
    18
  );
  const porthole_glass = new THREE.InstancedMesh(
    porthole_glassGeom,
    windowMat,
    2
  );
  const porthole_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    porthole_dummy.position.set(side * 0.885, 0.70, -0.28);
    porthole_dummy.rotation.set(0, 0, Math.PI / 2);
    porthole_dummy.updateMatrix();
    porthole_rims.setMatrixAt(i, porthole_dummy.matrix);

    porthole_dummy.position.set(side * 0.905, 0.70, -0.28);
    porthole_dummy.updateMatrix();
    porthole_glass.setMatrixAt(i, porthole_dummy.matrix);
  }
  porthole_rims.instanceMatrix.needsUpdate = true;
  porthole_glass.instanceMatrix.needsUpdate = true;
  root.add(porthole_rims, porthole_glass);

  const anchor_group = new THREE.Group();
  anchor_group.position.set(0, 0, 2.53);
  root.add(anchor_group);

  const anchor_shankGeom = new THREE.CylinderGeometry(
    0.045,
    0.058,
    1.18,
    14
  );
  const anchor_shank = new THREE.Mesh(anchor_shankGeom, red_paintMat);
  anchor_shank.position.set(0, 1.30, 0);
  anchor_group.add(anchor_shank);

  const anchor_ringGeom = new THREE.TorusGeometry(0.16, 0.045, 12, 28);
  const anchor_ring = new THREE.Mesh(anchor_ringGeom, red_paintMat);
  anchor_ring.position.set(0, 2.06, 0);
  anchor_group.add(anchor_ring);

  const anchor_stockGeom = new THREE.CylinderGeometry(
    0.038,
    0.038,
    0.52,
    12
  );
  const anchor_stock = new THREE.Mesh(anchor_stockGeom, red_paintMat);
  anchor_stock.rotation.z = Math.PI / 2;
  anchor_stock.position.set(0, 1.69, 0);
  anchor_group.add(anchor_stock);

  const anchor_left_arm = createCurveTube([
    new THREE.Vector3(0, 0.72, 0),
    new THREE.Vector3(-0.18, 0.52, 0),
    new THREE.Vector3(-0.43, 0.43, 0),
    new THREE.Vector3(-0.61, 0.66, 0),
  ], 0.055, red_paintMat, 24);
  anchor_group.add(anchor_left_arm);

  const anchor_right_arm = createCurveTube([
    new THREE.Vector3(0, 0.72, 0),
    new THREE.Vector3(0.18, 0.52, 0),
    new THREE.Vector3(0.43, 0.43, 0),
    new THREE.Vector3(0.61, 0.66, 0),
  ], 0.055, red_paintMat, 24);
  anchor_group.add(anchor_right_arm);

  const anchor_flukeGeom = new THREE.ConeGeometry(0.13, 0.30, 3);
  const anchor_left_fluke = new THREE.Mesh(
    anchor_flukeGeom,
    red_paintMat
  );
  anchor_left_fluke.position.set(-0.63, 0.76, 0);
  anchor_left_fluke.rotation.z = 0.28;
  anchor_group.add(anchor_left_fluke);

  const anchor_right_fluke = new THREE.Mesh(
    anchor_flukeGeom,
    red_paintMat
  );
  anchor_right_fluke.position.set(0.63, 0.76, 0);
  anchor_right_fluke.rotation.z = -0.28;
  anchor_group.add(anchor_right_fluke);

  const stern_fenderGeom = new THREE.TorusGeometry(0.23, 0.065, 12, 28);
  const stern_fender = new THREE.Mesh(stern_fenderGeom, red_paintMat);
  stern_fender.rotation.y = Math.PI / 2;
  stern_fender.position.set(0.91, 0.36, -2.38);
  root.add(stern_fender);

  const stern_fender_connector = createRod(
    new THREE.Vector3(0.72, 0.36, -2.31),
    new THREE.Vector3(0.91, 0.36, -2.38),
    0.035,
    red_paintMat
  );

  const stern_mooring_eyeGeom = new THREE.TorusGeometry(
    0.095,
    0.025,
    10,
    20
  );
  const stern_mooring_eye = new THREE.Mesh(
    stern_mooring_eyeGeom,
    brushed_metalMat
  );
  stern_mooring_eye.position.set(0, 0.75, -2.385);
  root.add(stern_mooring_eye);

  fitToUnitCube(root);
  return root;

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
}