export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "segmented_metal_tool";

  const metal_body = new THREE.Group();
  metal_body.name = "metal_body";
  root.add(metal_body);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8,
  });

  const bottom_barrelProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.176, 0.000),
    new THREE.Vector2(0.190, 0.005),
    new THREE.Vector2(0.198, 0.016),
    new THREE.Vector2(0.201, 0.032),
    new THREE.Vector2(0.201, 1.090),
    new THREE.Vector2(0.200, 1.105),
    new THREE.Vector2(0.194, 1.116),
    new THREE.Vector2(0.000, 1.116),
  ];
  const bottom_barrelGeom = new THREE.LatheGeometry(bottom_barrelProfile, 64);
  const bottom_barrel = new THREE.Mesh(bottom_barrelGeom, silverMat);
  bottom_barrel.name = "bottom_barrel";
  metal_body.add(bottom_barrel);

  const lower_shaftProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.168, 0.000),
    new THREE.Vector2(0.177, 0.006),
    new THREE.Vector2(0.181, 0.017),
    new THREE.Vector2(0.181, 0.704),
    new THREE.Vector2(0.179, 0.716),
    new THREE.Vector2(0.171, 0.724),
    new THREE.Vector2(0.000, 0.724),
  ];
  const lower_shaftGeom = new THREE.LatheGeometry(lower_shaftProfile, 64);
  const lower_shaft = new THREE.Mesh(lower_shaftGeom, silverMat);
  lower_shaft.name = "lower_shaft";
  lower_shaft.position.y = 1.116;
  metal_body.add(lower_shaft);

  const upper_sleeveProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.193, 0.000),
    new THREE.Vector2(0.201, 0.006),
    new THREE.Vector2(0.205, 0.018),
    new THREE.Vector2(0.205, 0.756),
    new THREE.Vector2(0.203, 0.769),
    new THREE.Vector2(0.196, 0.779),
    new THREE.Vector2(0.000, 0.779),
  ];
  const upper_sleeveGeom = new THREE.LatheGeometry(upper_sleeveProfile, 64);
  const upper_sleeve = new THREE.Mesh(upper_sleeveGeom, silverMat);
  upper_sleeve.name = "upper_sleeve";
  upper_sleeve.position.y = 1.842;
  metal_body.add(upper_sleeve);

  const top_capProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.194, 0.000),
    new THREE.Vector2(0.202, 0.006),
    new THREE.Vector2(0.205, 0.018),
    new THREE.Vector2(0.205, 0.438),
    new THREE.Vector2(0.202, 0.452),
    new THREE.Vector2(0.193, 0.463),
    new THREE.Vector2(0.177, 0.468),
    new THREE.Vector2(0.000, 0.468),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 64);
  const top_cap = new THREE.Mesh(top_capGeom, silverMat);
  top_cap.name = "top_cap";
  top_cap.position.y = 2.621;
  metal_body.add(top_cap);

  const lower_seamGeom = new THREE.CylinderGeometry(0.194, 0.194, 0.006, 64);
  const lower_seam = new THREE.Mesh(lower_seamGeom, seamMat);
  lower_seam.name = "lower_seam";
  lower_seam.position.y = 1.119;
  root.add(lower_seam);

  const middle_seamGeom = new THREE.CylinderGeometry(0.184, 0.184, 0.006, 64);
  const middle_seam = new THREE.Mesh(middle_seamGeom, seamMat);
  middle_seam.name = "middle_seam";
  middle_seam.position.y = 1.839;
  root.add(middle_seam);

  const upper_seamGeom = new THREE.CylinderGeometry(0.198, 0.198, 0.006, 64);
  const upper_seam = new THREE.Mesh(upper_seamGeom, seamMat);
  upper_seam.name = "upper_seam";
  upper_seam.position.y = 2.618;
  root.add(upper_seam);

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