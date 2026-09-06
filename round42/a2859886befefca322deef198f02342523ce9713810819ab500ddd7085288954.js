export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "round_container";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x252628,
    metalness: 0.0,
    roughness: 0.8,
  });

  const lidMat = new THREE.MeshStandardMaterial({
    color: 0x202123,
    metalness: 0.0,
    roughness: 0.3,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x070809,
    metalness: 0.0,
    roughness: 0.8,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.460, 0.000),
    new THREE.Vector2(0.486, 0.006),
    new THREE.Vector2(0.505, 0.022),
    new THREE.Vector2(0.516, 0.052),
    new THREE.Vector2(0.520, 0.095),
    new THREE.Vector2(0.520, 0.600),
    new THREE.Vector2(0.518, 0.640),
    new THREE.Vector2(0.510, 0.665),
    new THREE.Vector2(0.000, 0.670),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const bottom_rimGeom = new THREE.TorusGeometry(0.492, 0.008, 8, 64);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, seamMat);
  bottom_rim.name = "bottom_rim";
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = 0.012;
  root.add(bottom_rim);

  const lid_group = new THREE.Group();
  lid_group.name = "lid_group";
  root.add(lid_group);

  const lidProfile = [
    new THREE.Vector2(0.000, 0.653),
    new THREE.Vector2(0.490, 0.653),
    new THREE.Vector2(0.512, 0.661),
    new THREE.Vector2(0.526, 0.680),
    new THREE.Vector2(0.532, 0.710),
    new THREE.Vector2(0.532, 0.752),
    new THREE.Vector2(0.527, 0.778),
    new THREE.Vector2(0.516, 0.800),
    new THREE.Vector2(0.497, 0.817),
    new THREE.Vector2(0.470, 0.828),
    new THREE.Vector2(0.000, 0.833),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, lidMat);
  lid.name = "lid";
  lid_group.add(lid);

  const seam_ringGeom = new THREE.TorusGeometry(0.519, 0.006, 8, 64);
  const seam_ring = new THREE.Mesh(seam_ringGeom, seamMat);
  seam_ring.name = "seam_ring";
  seam_ring.rotation.x = Math.PI / 2;
  seam_ring.position.y = 0.665;
  lid_group.add(seam_ring);

  const top_edge_ringGeom = new THREE.TorusGeometry(0.518, 0.006, 8, 64);
  const top_edge_ring = new THREE.Mesh(top_edge_ringGeom, lidMat);
  top_edge_ring.name = "top_edge_ring";
  top_edge_ring.rotation.x = Math.PI / 2;
  top_edge_ring.position.y = 0.792;
  lid_group.add(top_edge_ring);

  const slotW = 0.380;
  const slotH = 0.048;
  const slotR = 0.014;
  const lid_slotShape = new THREE.Shape();
  lid_slotShape.moveTo(-slotW / 2 + slotR, -slotH / 2);
  lid_slotShape.lineTo(slotW / 2 - slotR, -slotH / 2);
  lid_slotShape.quadraticCurveTo(
    slotW / 2,
    -slotH / 2,
    slotW / 2,
    -slotH / 2 + slotR
  );
  lid_slotShape.lineTo(slotW / 2, slotH / 2 - slotR);
  lid_slotShape.quadraticCurveTo(
    slotW / 2,
    slotH / 2,
    slotW / 2 - slotR,
    slotH / 2
  );
  lid_slotShape.lineTo(-slotW / 2 + slotR, slotH / 2);
  lid_slotShape.quadraticCurveTo(
    -slotW / 2,
    slotH / 2,
    -slotW / 2,
    slotH / 2 - slotR
  );
  lid_slotShape.lineTo(-slotW / 2, -slotH / 2 + slotR);
  lid_slotShape.quadraticCurveTo(
    -slotW / 2,
    -slotH / 2,
    -slotW / 2 + slotR,
    -slotH / 2
  );

  const lid_slotGeom = new THREE.ExtrudeGeometry(lid_slotShape, {
    depth: 0.009,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 2,
    curveSegments: 8,
  });
  const lid_slot = new THREE.Mesh(lid_slotGeom, seamMat);
  lid_slot.name = "lid_slot";
  lid_slot.position.set(0, 0.704, 0.526);
  lid_group.add(lid_slot);

  const slot_lower_lipGeom = new THREE.BoxGeometry(0.348, 0.005, 0.008);
  const slot_lower_lip = new THREE.Mesh(slot_lower_lipGeom, lidMat);
  slot_lower_lip.name = "slot_lower_lip";
  slot_lower_lip.position.set(0, 0.678, 0.532);
  lid_group.add(slot_lower_lip);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}