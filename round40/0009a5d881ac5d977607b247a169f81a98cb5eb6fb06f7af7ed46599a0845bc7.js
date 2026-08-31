export default function generate(THREE) {
  const root = new THREE.Group();

  const cup_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc90032,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xe0002d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const recessed_lidMat = new THREE.MeshStandardMaterial({
    color: 0xc81b3c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xa80027,
    metalness: 0.0,
    roughness: 0.3,
  });
  const embossed_logoMat = new THREE.MeshStandardMaterial({
    color: 0xb5002b,
    metalness: 0.0,
    roughness: 0.3,
  });

  const cup_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.325, 0.000),
    new THREE.Vector2(0.350, 0.012),
    new THREE.Vector2(0.365, 0.035),
    new THREE.Vector2(0.365, 0.060),
    new THREE.Vector2(0.350, 0.082),
    new THREE.Vector2(0.345, 0.105),
    new THREE.Vector2(0.448, 0.865),
    new THREE.Vector2(0.458, 0.910),
    new THREE.Vector2(0.462, 0.940),
    new THREE.Vector2(0.000, 0.940),
  ];
  const cup_bodyGeom = new THREE.LatheGeometry(cup_bodyProfile, 64);
  const cup_body = new THREE.Mesh(cup_bodyGeom, cup_bodyMat);
  root.add(cup_body);

  const bottom_footGeom = new THREE.TorusGeometry(0.348, 0.018, 12, 64);
  const bottom_foot = new THREE.Mesh(bottom_footGeom, cup_bodyMat);
  bottom_foot.rotation.x = Math.PI / 2;
  bottom_foot.position.y = 0.042;
  root.add(bottom_foot);

  const bottom_seamGeom = new THREE.TorusGeometry(0.349, 0.005, 8, 64);
  const bottom_seam = new THREE.Mesh(bottom_seamGeom, seamMat);
  bottom_seam.rotation.x = Math.PI / 2;
  bottom_seam.position.y = 0.087;
  root.add(bottom_seam);

  const lid_shellProfile = [
    new THREE.Vector2(0.000, 0.925),
    new THREE.Vector2(0.458, 0.925),
    new THREE.Vector2(0.485, 0.938),
    new THREE.Vector2(0.505, 0.955),
    new THREE.Vector2(0.515, 0.975),
    new THREE.Vector2(0.510, 0.998),
    new THREE.Vector2(0.500, 1.040),
    new THREE.Vector2(0.488, 1.070),
    new THREE.Vector2(0.468, 1.092),
    new THREE.Vector2(0.445, 1.105),
    new THREE.Vector2(0.420, 1.103),
    new THREE.Vector2(0.398, 1.088),
    new THREE.Vector2(0.383, 1.065),
    new THREE.Vector2(0.372, 1.045),
    new THREE.Vector2(0.000, 1.045),
  ];
  const lid_shellGeom = new THREE.LatheGeometry(lid_shellProfile, 64);
  const lid_shell = new THREE.Mesh(lid_shellGeom, lidMat);
  root.add(lid_shell);

  const lid_center_panelGeom = new THREE.CylinderGeometry(
    0.371,
    0.371,
    0.010,
    64
  );
  const lid_center_panel = new THREE.Mesh(
    lid_center_panelGeom,
    recessed_lidMat
  );
  lid_center_panel.position.y = 1.049;
  root.add(lid_center_panel);

  const lid_lower_snap_ringGeom = new THREE.TorusGeometry(
    0.493,
    0.013,
    12,
    64
  );
  const lid_lower_snap_ring = new THREE.Mesh(
    lid_lower_snap_ringGeom,
    lidMat
  );
  lid_lower_snap_ring.rotation.x = Math.PI / 2;
  lid_lower_snap_ring.position.y = 0.952;
  root.add(lid_lower_snap_ring);

  const lid_outer_highlightGeom = new THREE.TorusGeometry(
    0.455,
    0.012,
    12,
    64
  );
  const lid_outer_highlight = new THREE.Mesh(
    lid_outer_highlightGeom,
    lidMat
  );
  lid_outer_highlight.rotation.x = Math.PI / 2;
  lid_outer_highlight.position.y = 1.094;
  root.add(lid_outer_highlight);

  const lid_inner_grooveGeom = new THREE.TorusGeometry(
    0.378,
    0.004,
    8,
    64
  );
  const lid_inner_groove = new THREE.Mesh(
    lid_inner_grooveGeom,
    seamMat
  );
  lid_inner_groove.rotation.x = Math.PI / 2;
  lid_inner_groove.position.y = 1.057;
  root.add(lid_inner_groove);

  const embossed_logo = new THREE.Group();
  embossed_logo.position.set(0, 1.058, 0.005);

  const logo_ringGeom = new THREE.TorusGeometry(0.018, 0.0024, 6, 24);
  const logo_ring = new THREE.Mesh(logo_ringGeom, embossed_logoMat);
  logo_ring.rotation.x = Math.PI / 2;
  logo_ring.scale.set(1.25, 0.65, 1);
  logo_ring.position.z = -0.012;
  embossed_logo.add(logo_ring);

  const logo_stemGeom = new THREE.BoxGeometry(0.005, 0.004, 0.030);
  const logo_stem = new THREE.Mesh(logo_stemGeom, embossed_logoMat);
  logo_stem.position.set(0.010, 0, 0.006);
  embossed_logo.add(logo_stem);

  const logo_baseGeom = new THREE.BoxGeometry(0.022, 0.004, 0.005);
  const logo_base = new THREE.Mesh(logo_baseGeom, embossed_logoMat);
  logo_base.position.set(0.002, 0, 0.020);
  embossed_logo.add(logo_base);

  root.add(embossed_logo);

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