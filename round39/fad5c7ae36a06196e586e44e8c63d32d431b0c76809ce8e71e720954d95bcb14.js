export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "beacon_buoy";

  const orange_housingMat = new THREE.MeshStandardMaterial({
    color: 0xff6508,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xf21f18,
    metalness: 0.0,
    roughness: 0.3,
  });
  const dark_redMat = new THREE.MeshStandardMaterial({
    color: 0xa80f10,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubber_detailMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.8,
  });
  const beacon_lensMat = new THREE.MeshStandardMaterial({
    color: 0xff2f24,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.72,
  });
  const beacon_lightMat = new THREE.MeshStandardMaterial({
    color: 0xffe62e,
    emissive: 0xffe62e,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xe8e6df,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const label_printMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const label_red_printMat = new THREE.MeshStandardMaterial({
    color: 0xc94b45,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const rubber_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.86, 0.00),
    new THREE.Vector2(1.04, 0.035),
    new THREE.Vector2(1.18, 0.105),
    new THREE.Vector2(1.27, 0.205),
    new THREE.Vector2(1.31, 0.315),
    new THREE.Vector2(1.29, 0.405),
    new THREE.Vector2(1.23, 0.485),
    new THREE.Vector2(1.12, 0.535),
    new THREE.Vector2(0.00, 0.535),
  ];
  const rubber_baseGeom = new THREE.LatheGeometry(rubber_baseProfile, 64);
  const rubber_base = new THREE.Mesh(rubber_baseGeom, rubberMat);
  rubber_base.name = "rubber_base";
  root.add(rubber_base);

  const rubber_lower_beadGeom = new THREE.TorusGeometry(1.08, 0.025, 10, 64);
  const rubber_lower_bead = new THREE.Mesh(rubber_lower_beadGeom, rubber_detailMat);
  rubber_lower_bead.name = "rubber_lower_bead";
  rubber_lower_bead.rotation.x = Math.PI / 2;
  rubber_lower_bead.position.y = 0.055;
  root.add(rubber_lower_bead);

  const rubber_grooveGeom = new THREE.TorusGeometry(1.235, 0.018, 10, 64);
  const rubber_groove = new THREE.Mesh(rubber_grooveGeom, rubber_detailMat);
  rubber_groove.name = "rubber_groove";
  rubber_groove.rotation.x = Math.PI / 2;
  rubber_groove.position.y = 0.305;
  root.add(rubber_groove);

  const rubber_upper_lipGeom = new THREE.TorusGeometry(1.17, 0.055, 12, 64);
  const rubber_upper_lip = new THREE.Mesh(rubber_upper_lipGeom, rubberMat);
  rubber_upper_lip.name = "rubber_upper_lip";
  rubber_upper_lip.rotation.x = Math.PI / 2;
  rubber_upper_lip.position.y = 0.475;
  root.add(rubber_upper_lip);

  const base_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.30, 0.025, 1.075),
    new THREE.Vector3(0.30, 0.12, 1.19),
    new THREE.Vector3(0.30, 0.25, 1.283),
    new THREE.Vector3(0.30, 0.39, 1.265),
    new THREE.Vector3(0.30, 0.49, 1.15),
  ]);
  const base_seamGeom = new THREE.TubeGeometry(base_seamPath, 16, 0.008, 6, false);
  const base_seam = new THREE.Mesh(base_seamGeom, rubber_detailMat);
  base_seam.name = "base_seam";
  root.add(base_seam);

  const orange_housingProfile = [
    new THREE.Vector2(0.00, 0.445),
    new THREE.Vector2(1.05, 0.445),
    new THREE.Vector2(1.17, 0.475),
    new THREE.Vector2(1.25, 0.545),
    new THREE.Vector2(1.29, 0.645),
    new THREE.Vector2(1.285, 0.755),
    new THREE.Vector2(1.245, 0.865),
    new THREE.Vector2(1.14, 0.985),
    new THREE.Vector2(0.96, 1.105),
    new THREE.Vector2(0.72, 1.205),
    new THREE.Vector2(0.45, 1.275),
    new THREE.Vector2(0.20, 1.310),
    new THREE.Vector2(0.00, 1.320),
  ];
  const orange_housingGeom = new THREE.LatheGeometry(orange_housingProfile, 64);
  const orange_housing = new THREE.Mesh(orange_housingGeom, orange_housingMat);
  orange_housing.name = "orange_housing";
  root.add(orange_housing);

  const beacon_pedestalGeom = new THREE.CylinderGeometry(0.18, 0.27, 0.48, 40);
  const beacon_pedestal = new THREE.Mesh(beacon_pedestalGeom, red_plasticMat);
  beacon_pedestal.name = "beacon_pedestal";
  beacon_pedestal.position.y = 1.52;
  root.add(beacon_pedestal);

  const beacon_lower_collarGeom = new THREE.CylinderGeometry(0.205, 0.215, 0.075, 40);
  const beacon_lower_collar = new THREE.Mesh(beacon_lower_collarGeom, red_plasticMat);
  beacon_lower_collar.name = "beacon_lower_collar";
  beacon_lower_collar.position.y = 1.765;
  root.add(beacon_lower_collar);

  const beacon_collar_beadGeom = new THREE.TorusGeometry(0.185, 0.022, 10, 40);
  const beacon_collar_bead = new THREE.Mesh(beacon_collar_beadGeom, red_plasticMat);
  beacon_collar_bead.name = "beacon_collar_bead";
  beacon_collar_bead.rotation.x = Math.PI / 2;
  beacon_collar_bead.position.y = 1.795;
  root.add(beacon_collar_bead);

  const beacon_lensProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.175, 0.00),
    new THREE.Vector2(0.190, 0.045),
    new THREE.Vector2(0.178, 0.285),
    new THREE.Vector2(0.160, 0.345),
    new THREE.Vector2(0.110, 0.380),
    new THREE.Vector2(0.00, 0.390),
  ];
  const beacon_lensGeom = new THREE.LatheGeometry(beacon_lensProfile, 48);
  const beacon_lens = new THREE.Mesh(beacon_lensGeom, beacon_lensMat);
  beacon_lens.name = "beacon_lens";
  beacon_lens.position.y = 1.79;
  root.add(beacon_lens);

  const beacon_reflectorGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.025, 24);
  const beacon_reflector = new THREE.Mesh(beacon_reflectorGeom, beacon_lightMat);
  beacon_reflector.name = "beacon_reflector";
  beacon_reflector.rotation.x = Math.PI / 2;
  beacon_reflector.position.set(0, 1.985, 0.168);
  root.add(beacon_reflector);

  const beacon_lightGeom = new THREE.SphereGeometry(0.075, 24, 16);
  const beacon_light = new THREE.Mesh(beacon_lightGeom, beacon_lightMat);
  beacon_light.name = "beacon_light";
  beacon_light.scale.set(0.8, 1.0, 0.45);
  beacon_light.position.set(0, 1.985, 0.185);
  root.add(beacon_light);

  const beacon_lens_topGeom = new THREE.CylinderGeometry(0.11, 0.145, 0.025, 32);
  const beacon_lens_top = new THREE.Mesh(beacon_lens_topGeom, red_plasticMat);
  beacon_lens_top.name = "beacon_lens_top";
  beacon_lens_top.position.y = 2.17;
  root.add(beacon_lens_top);

  const side_port_collarGeom = new THREE.CylinderGeometry(0.155, 0.155, 0.12, 32);
  const side_port_collar = new THREE.Mesh(side_port_collarGeom, red_plasticMat);
  side_port_collar.name = "side_port_collar";
  side_port_collar.rotation.z = Math.PI / 2;
  side_port_collar.position.set(1.265, 0.72, 0.035);
  root.add(side_port_collar);

  const side_port_tubeGeom = new THREE.CylinderGeometry(0.13, 0.145, 0.25, 32);
  const side_port_tube = new THREE.Mesh(side_port_tubeGeom, red_plasticMat);
  side_port_tube.name = "side_port_tube";
  side_port_tube.rotation.z = Math.PI / 2;
  side_port_tube.position.set(1.375, 0.72, 0.035);
  root.add(side_port_tube);

  const side_port_rimGeom = new THREE.TorusGeometry(0.105, 0.027, 10, 32);
  const side_port_rim = new THREE.Mesh(side_port_rimGeom, red_plasticMat);
  side_port_rim.name = "side_port_rim";
  side_port_rim.rotation.y = Math.PI / 2;
  side_port_rim.position.set(1.505, 0.72, 0.035);
  root.add(side_port_rim);

  const side_port_recessGeom = new THREE.CircleGeometry(0.093, 32);
  const side_port_recess = new THREE.Mesh(side_port_recessGeom, dark_redMat);
  side_port_recess.name = "side_port_recess";
  side_port_recess.rotation.y = Math.PI / 2;
  side_port_recess.position.set(1.512, 0.72, 0.035);
  root.add(side_port_recess);

  const opposite_port_collar = new THREE.Mesh(side_port_collarGeom, red_plasticMat);
  opposite_port_collar.name = "opposite_port_collar";
  opposite_port_collar.rotation.z = Math.PI / 2;
  opposite_port_collar.position.set(-1.265, 0.72, 0.035);
  root.add(opposite_port_collar);

  const opposite_port_tube = new THREE.Mesh(side_port_tubeGeom, red_plasticMat);
  opposite_port_tube.name = "opposite_port_tube";
  opposite_port_tube.rotation.z = Math.PI / 2;
  opposite_port_tube.position.set(-1.375, 0.72, 0.035);
  root.add(opposite_port_tube);

  const opposite_port_rim = new THREE.Mesh(side_port_rimGeom, red_plasticMat);
  opposite_port_rim.name = "opposite_port_rim";
  opposite_port_rim.rotation.y = Math.PI / 2;
  opposite_port_rim.position.set(-1.505, 0.72, 0.035);
  root.add(opposite_port_rim);

  const opposite_port_recess = new THREE.Mesh(side_port_recessGeom, dark_redMat);
  opposite_port_recess.name = "opposite_port_recess";
  opposite_port_recess.rotation.y = -Math.PI / 2;
  opposite_port_recess.position.set(-1.512, 0.72, 0.035);
  root.add(opposite_port_recess);

  const labelShape = new THREE.Shape();
  labelShape.moveTo(-0.28, -0.085);
  labelShape.lineTo(0.23, -0.085);
  labelShape.bezierCurveTo(0.275, -0.085, 0.295, -0.055, 0.295, -0.015);
  labelShape.bezierCurveTo(0.295, 0.025, 0.275, 0.055, 0.23, 0.055);
  labelShape.lineTo(-0.28, 0.055);
  labelShape.bezierCurveTo(-0.325, 0.055, -0.345, 0.025, -0.345, -0.015);
  labelShape.bezierCurveTo(-0.345, -0.055, -0.325, -0.085, -0.28, -0.085);

  const labelGeom = new THREE.ShapeGeometry(labelShape, 16);
  const label = new THREE.Mesh(labelGeom, labelMat);
  label.name = "label";

  const labelAngle = 0.84;
  const labelRadius = 0.98;
  const labelTilt = 1.32;
  const labelNormal = new THREE.Vector3(
    Math.cos(labelAngle) * Math.sin(labelTilt),
    Math.cos(labelTilt),
    Math.sin(labelAngle) * Math.sin(labelTilt)
  ).normalize();
  const labelXAxis = new THREE.Vector3(
    Math.sin(labelAngle),
    0,
    -Math.cos(labelAngle)
  ).normalize();
  const labelYAxis = new THREE.Vector3().crossVectors(labelNormal, labelXAxis).normalize();
  const labelBasis = new THREE.Matrix4().makeBasis(labelXAxis, labelYAxis, labelNormal);
  label.quaternion.setFromRotationMatrix(labelBasis);
  label.position.set(
    Math.cos(labelAngle) * labelRadius,
    1.105,
    Math.sin(labelAngle) * labelRadius
  );
  label.position.addScaledVector(labelNormal, 0.012);
  root.add(label);

  const label_iconGeom = new THREE.RingGeometry(0.022, 0.030, 20);
  const label_icon = new THREE.Mesh(label_iconGeom, label_red_printMat);
  label_icon.name = "label_icon";
  label_icon.position.set(-0.18, -0.008, 0.004);
  label.add(label_icon);

  const label_symbol_barGeom = new THREE.BoxGeometry(0.055, 0.011, 0.003);
  const label_symbol_bar = new THREE.Mesh(label_symbol_barGeom, label_red_printMat);
  label_symbol_bar.name = "label_symbol_bar";
  label_symbol_bar.position.set(-0.125, -0.008, 0.004);
  label.add(label_symbol_bar);

  const label_text_line_1Geom = new THREE.BoxGeometry(0.13, 0.008, 0.003);
  const label_text_line_1 = new THREE.Mesh(label_text_line_1Geom, label_printMat);
  label_text_line_1.name = "label_text_line_1";
  label_text_line_1.position.set(0.055, 0.020, 0.004);
  label.add(label_text_line_1);

  const label_text_line_2Geom = new THREE.BoxGeometry(0.15, 0.008, 0.003);
  const label_text_line_2 = new THREE.Mesh(label_text_line_2Geom, label_printMat);
  label_text_line_2.name = "label_text_line_2";
  label_text_line_2.position.set(0.065, 0.000, 0.004);
  label.add(label_text_line_2);

  const label_text_line_3Geom = new THREE.BoxGeometry(0.115, 0.008, 0.003);
  const label_text_line_3 = new THREE.Mesh(label_text_line_3Geom, label_printMat);
  label_text_line_3.name = "label_text_line_3";
  label_text_line_3.position.set(0.045, -0.020, 0.004);
  label.add(label_text_line_3);

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