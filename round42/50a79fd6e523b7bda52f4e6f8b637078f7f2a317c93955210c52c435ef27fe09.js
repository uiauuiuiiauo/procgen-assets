export default function generate(THREE) {
  const root = new THREE.Group();

  function createRoundedShape(width, height, radius) {
    const halfW = width / 2;
    const halfH = height / 2;
    const r = Math.min(radius, halfW, halfH);
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + r, -halfH);
    shape.lineTo(halfW - r, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + r);
    shape.lineTo(halfW, halfH - r);
    shape.quadraticCurveTo(halfW, halfH, halfW - r, halfH);
    shape.lineTo(-halfW + r, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - r);
    shape.lineTo(-halfW, -halfH + r);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + r, -halfH);
    return shape;
  }

  function createRoundedPrismGeometry(width, height, depth, radius, bevel) {
    const shape = createRoundedShape(width, height, radius);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4
    });
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  function createRoundedPanelGeometry(width, panelDepth, radius, thickness, bevel) {
    const shape = createRoundedShape(width, panelDepth, radius);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geom.translate(0, 0, -thickness / 2);
    geom.rotateX(-Math.PI / 2);
    return geom;
  }

  const lower_shellMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.3
  });
  const upper_shellMat = new THREE.MeshStandardMaterial({
    color: 0x181a1d,
    metalness: 0.0,
    roughness: 0.3
  });
  const seam_bandMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.0,
    roughness: 0.8
  });
  const top_panelMat = new THREE.MeshStandardMaterial({
    color: 0x07080a,
    metalness: 0.0,
    roughness: 0.3
  });
  const button_bezelMat = new THREE.MeshStandardMaterial({
    color: 0x090a0c,
    metalness: 0.0,
    roughness: 0.3
  });
  const red_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xd9363e,
    metalness: 0.0,
    roughness: 0.3
  });
  const port_rimMat = new THREE.MeshStandardMaterial({
    color: 0x34383c,
    metalness: 0.0,
    roughness: 0.3
  });
  const port_cavityMat = new THREE.MeshStandardMaterial({
    color: 0x020303,
    metalness: 0.0,
    roughness: 0.8
  });
  const port_tongueMat = new THREE.MeshStandardMaterial({
    color: 0x25282b,
    metalness: 0.0,
    roughness: 0.8
  });

  const lower_shellGeom = createRoundedPrismGeometry(2.42, 0.48, 1.00, 0.20, 0.12);
  const lower_shell = new THREE.Mesh(lower_shellGeom, lower_shellMat);
  lower_shell.position.y = -0.15;
  root.add(lower_shell);

  const seam_bandGeom = createRoundedPrismGeometry(2.48, 0.026, 1.05, 0.18, 0.01);
  const seam_band = new THREE.Mesh(seam_bandGeom, seam_bandMat);
  seam_band.position.y = 0.055;
  root.add(seam_band);

  const upper_shellGeom = createRoundedPrismGeometry(2.42, 0.34, 1.00, 0.18, 0.11);
  const upper_shell = new THREE.Mesh(upper_shellGeom, upper_shellMat);
  upper_shell.position.y = 0.205;
  root.add(upper_shell);

  const top_panel_borderGeom = createRoundedPanelGeometry(2.18, 0.91, 0.20, 0.035, 0.012);
  const top_panel_border = new THREE.Mesh(top_panel_borderGeom, button_bezelMat);
  top_panel_border.position.set(-0.02, 0.474, 0);
  root.add(top_panel_border);

  const top_panelGeom = createRoundedPanelGeometry(2.08, 0.82, 0.17, 0.032, 0.012);
  const top_panel = new THREE.Mesh(top_panelGeom, top_panelMat);
  top_panel.position.set(-0.02, 0.497, 0);
  root.add(top_panel);

  const button_bezelGeom = createRoundedPanelGeometry(0.68, 0.49, 0.17, 0.045, 0.018);
  const button_bezel = new THREE.Mesh(button_bezelGeom, button_bezelMat);
  button_bezel.position.set(0.62, 0.526, 0);
  root.add(button_bezel);

  const red_buttonGeom = createRoundedPanelGeometry(0.52, 0.35, 0.13, 0.055, 0.022);
  const red_button = new THREE.Mesh(red_buttonGeom, red_buttonMat);
  red_button.position.set(0.62, 0.557, 0);
  root.add(red_button);

  const port_rimGeom = createRoundedPrismGeometry(0.40, 0.19, 0.025, 0.055, 0.008);
  const port_rim = new THREE.Mesh(port_rimGeom, port_rimMat);
  port_rim.rotation.y = Math.PI / 2;
  port_rim.position.set(-1.326, -0.105, 0.075);
  root.add(port_rim);

  const port_cavityGeom = createRoundedPrismGeometry(0.32, 0.115, 0.022, 0.035, 0.005);
  const port_cavity = new THREE.Mesh(port_cavityGeom, port_cavityMat);
  port_cavity.rotation.y = Math.PI / 2;
  port_cavity.position.set(-1.349, -0.105, 0.075);
  root.add(port_cavity);

  const port_tongueGeom = new THREE.BoxGeometry(0.018, 0.025, 0.205);
  const port_tongue = new THREE.Mesh(port_tongueGeom, port_tongueMat);
  port_tongue.position.set(-1.365, -0.128, 0.075);
  root.add(port_tongue);

  const port_labelMat = new THREE.MeshStandardMaterial({
    color: 0x55595d,
    metalness: 0.0,
    roughness: 0.8
  });
  const port_labelGeom = new THREE.BoxGeometry(0.012, 0.012, 0.065);
  const port_label = new THREE.Mesh(port_labelGeom, port_labelMat);
  port_label.position.set(-1.363, -0.015, 0.075);
  root.add(port_label);

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