export default function generate(THREE) {
  const root = new THREE.Group();
  const container = new THREE.Group();
  const lid = new THREE.Group();
  root.add(container, lid);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd20b35,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xe0002d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xf21b43,
    metalness: 0.0,
    roughness: 0.3,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0xb5092b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0xc20a2d,
    metalness: 0.0,
    roughness: 0.3,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, -0.680),
    new THREE.Vector2(0.390, -0.680),
    new THREE.Vector2(0.420, -0.665),
    new THREE.Vector2(0.445, -0.630),
    new THREE.Vector2(0.455, -0.570),
    new THREE.Vector2(0.470, -0.400),
    new THREE.Vector2(0.500, -0.100),
    new THREE.Vector2(0.530, 0.200),
    new THREE.Vector2(0.555, 0.360),
    new THREE.Vector2(0.565, 0.405),
    new THREE.Vector2(0.000, 0.405),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  container.add(body);

  const bottom_footProfile = [
    new THREE.Vector2(0.000, -0.780),
    new THREE.Vector2(0.360, -0.780),
    new THREE.Vector2(0.395, -0.773),
    new THREE.Vector2(0.425, -0.750),
    new THREE.Vector2(0.440, -0.715),
    new THREE.Vector2(0.435, -0.680),
    new THREE.Vector2(0.405, -0.660),
    new THREE.Vector2(0.000, -0.660),
  ];
  const bottom_footGeom = new THREE.LatheGeometry(bottom_footProfile, 64);
  const bottom_foot = new THREE.Mesh(bottom_footGeom, bodyMat);
  container.add(bottom_foot);

  const bottom_seamGeom = new THREE.TorusGeometry(0.414, 0.008, 10, 64);
  const bottom_seam = new THREE.Mesh(bottom_seamGeom, grooveMat);
  bottom_seam.rotation.x = Math.PI / 2;
  bottom_seam.position.y = -0.665;
  container.add(bottom_seam);

  const lid_skirtProfile = [
    new THREE.Vector2(0.000, 0.395),
    new THREE.Vector2(0.565, 0.395),
    new THREE.Vector2(0.595, 0.408),
    new THREE.Vector2(0.625, 0.430),
    new THREE.Vector2(0.642, 0.462),
    new THREE.Vector2(0.640, 0.495),
    new THREE.Vector2(0.625, 0.525),
    new THREE.Vector2(0.605, 0.550),
    new THREE.Vector2(0.580, 0.570),
    new THREE.Vector2(0.552, 0.578),
    new THREE.Vector2(0.530, 0.570),
    new THREE.Vector2(0.512, 0.550),
    new THREE.Vector2(0.500, 0.525),
    new THREE.Vector2(0.000, 0.525),
  ];
  const lid_skirtGeom = new THREE.LatheGeometry(lid_skirtProfile, 64);
  const lid_skirt = new THREE.Mesh(lid_skirtGeom, lidMat);
  lid.add(lid_skirt);

  const lid_panelGeom = new THREE.CylinderGeometry(0.498, 0.498, 0.018, 64);
  const lid_panel = new THREE.Mesh(lid_panelGeom, lidMat);
  lid_panel.position.y = 0.529;
  lid.add(lid_panel);

  const outer_lid_rimGeom = new THREE.TorusGeometry(0.570, 0.022, 12, 64);
  const outer_lid_rim = new THREE.Mesh(outer_lid_rimGeom, highlightMat);
  outer_lid_rim.rotation.x = Math.PI / 2;
  outer_lid_rim.position.y = 0.568;
  lid.add(outer_lid_rim);

  const inner_lid_grooveGeom = new THREE.TorusGeometry(0.505, 0.006, 8, 64);
  const inner_lid_groove = new THREE.Mesh(inner_lid_grooveGeom, grooveMat);
  inner_lid_groove.rotation.x = Math.PI / 2;
  inner_lid_groove.position.y = 0.541;
  lid.add(inner_lid_groove);

  const lower_snap_bandGeom = new THREE.TorusGeometry(0.590, 0.012, 10, 64);
  const lower_snap_band = new THREE.Mesh(lower_snap_bandGeom, lidMat);
  lower_snap_band.rotation.x = Math.PI / 2;
  lower_snap_band.position.y = 0.407;
  lid.add(lower_snap_band);

  const lid_highlight_bandGeom = new THREE.TorusGeometry(0.627, 0.009, 10, 64);
  const lid_highlight_band = new THREE.Mesh(lid_highlight_bandGeom, highlightMat);
  lid_highlight_band.rotation.x = Math.PI / 2;
  lid_highlight_band.position.y = 0.510;
  lid.add(lid_highlight_band);

  const logo_curvePoints = [
    new THREE.Vector3(-0.040, 0.543, -0.020),
    new THREE.Vector3(-0.018, 0.543, -0.030),
    new THREE.Vector3(0.018, 0.543, -0.027),
    new THREE.Vector3(0.040, 0.543, -0.012),
    new THREE.Vector3(0.035, 0.543, 0.006),
    new THREE.Vector3(0.010, 0.543, 0.014),
    new THREE.Vector3(-0.018, 0.543, 0.010),
    new THREE.Vector3(-0.020, 0.543, -0.002),
    new THREE.Vector3(0.006, 0.543, -0.004),
    new THREE.Vector3(0.022, 0.543, 0.006),
    new THREE.Vector3(0.014, 0.543, 0.022),
    new THREE.Vector3(-0.008, 0.543, 0.027),
    new THREE.Vector3(-0.027, 0.543, 0.018),
  ];
  const logo_curve = new THREE.CatmullRomCurve3(
    logo_curvePoints,
    false,
    "centripetal"
  );
  const logo_markGeom = new THREE.TubeGeometry(logo_curve, 36, 0.0035, 6, false);
  const logo_mark = new THREE.Mesh(logo_markGeom, logoMat);
  lid.add(logo_mark);

  const logo_barGeom = new THREE.BoxGeometry(0.050, 0.005, 0.006);
  const logo_bar = new THREE.Mesh(logo_barGeom, logoMat);
  logo_bar.position.set(0.003, 0.543, -0.045);
  logo_bar.rotation.y = -0.08;
  lid.add(logo_bar);

  const logo_dotGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.005, 12);
  const logo_dot = new THREE.Mesh(logo_dotGeom, logoMat);
  logo_dot.position.set(0.038, 0.543, 0.025);
  lid.add(logo_dot);

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