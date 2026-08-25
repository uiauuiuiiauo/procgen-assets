export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "covered_casserole";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf4f4f2,
    metalness: 0.0,
    roughness: 0.4,
  });

  const knobMat = new THREE.MeshStandardMaterial({
    color: 0xb8bec1,
    metalness: 0.0,
    roughness: 0.4,
  });

  const rim_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
  });

  const steam_ventMat = new THREE.MeshStandardMaterial({
    color: 0x4a4b49,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, -0.90),
    new THREE.Vector2(0.56, -0.90),
    new THREE.Vector2(0.68, -0.87),
    new THREE.Vector2(0.79, -0.82),
    new THREE.Vector2(0.87, -0.73),
    new THREE.Vector2(0.92, -0.62),
    new THREE.Vector2(0.94, -0.48),
    new THREE.Vector2(0.94, 0.22),
    new THREE.Vector2(0.95, 0.31),
    new THREE.Vector2(0.98, 0.37),
    new THREE.Vector2(1.00, 0.42),
    new THREE.Vector2(0.99, 0.48),
    new THREE.Vector2(0.95, 0.52),
    new THREE.Vector2(0.00, 0.52),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const upper_collarGeom = new THREE.TorusGeometry(0.94, 0.055, 16, 64);
  const upper_collar = new THREE.Mesh(upper_collarGeom, bodyMat);
  upper_collar.name = "upper_collar";
  upper_collar.rotation.x = Math.PI / 2;
  upper_collar.position.y = 0.40;
  root.add(upper_collar);

  const rim_shadowGeom = new THREE.TorusGeometry(0.955, 0.035, 12, 64);
  const rim_shadow = new THREE.Mesh(rim_shadowGeom, rim_shadowMat);
  rim_shadow.name = "rim_shadow";
  rim_shadow.rotation.x = Math.PI / 2;
  rim_shadow.position.y = 0.49;
  root.add(rim_shadow);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.02, -0.09);
  handleShape.bezierCurveTo(0.08, -0.12, 0.27, -0.13, 0.39, -0.10);
  handleShape.bezierCurveTo(0.48, -0.07, 0.51, 0.01, 0.47, 0.08);
  handleShape.bezierCurveTo(0.43, 0.15, 0.34, 0.17, 0.24, 0.14);
  handleShape.lineTo(-0.02, 0.08);
  handleShape.closePath();

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.20,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  handleGeom.translate(0, 0, -0.10);

  const right_handle = new THREE.Mesh(handleGeom, bodyMat);
  right_handle.name = "right_handle";
  right_handle.position.set(0.84, 0.34, 0);
  root.add(right_handle);

  const left_handle = new THREE.Mesh(handleGeom, bodyMat);
  left_handle.name = "left_handle";
  left_handle.position.set(-0.84, 0.34, 0);
  left_handle.rotation.z = Math.PI;
  root.add(left_handle);

  const lid_domeProfile = [
    new THREE.Vector2(0.00, 0.48),
    new THREE.Vector2(0.80, 0.48),
    new THREE.Vector2(0.88, 0.50),
    new THREE.Vector2(0.91, 0.54),
    new THREE.Vector2(0.89, 0.60),
    new THREE.Vector2(0.83, 0.67),
    new THREE.Vector2(0.73, 0.74),
    new THREE.Vector2(0.60, 0.81),
    new THREE.Vector2(0.44, 0.87),
    new THREE.Vector2(0.27, 0.91),
    new THREE.Vector2(0.12, 0.93),
    new THREE.Vector2(0.00, 0.935),
  ];
  const lid_domeGeom = new THREE.LatheGeometry(lid_domeProfile, 64);
  const lid_dome = new THREE.Mesh(lid_domeGeom, bodyMat);
  lid_dome.name = "lid_dome";
  root.add(lid_dome);

  const lid_rimGeom = new THREE.TorusGeometry(0.94, 0.075, 18, 64);
  const lid_rim = new THREE.Mesh(lid_rimGeom, bodyMat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.y = 0.53;
  root.add(lid_rim);

  const knob_baseProfile = [
    new THREE.Vector2(0.00, 0.90),
    new THREE.Vector2(0.15, 0.90),
    new THREE.Vector2(0.18, 0.93),
    new THREE.Vector2(0.18, 0.98),
    new THREE.Vector2(0.16, 1.03),
    new THREE.Vector2(0.15, 1.08),
    new THREE.Vector2(0.00, 1.09),
  ];
  const knob_baseGeom = new THREE.LatheGeometry(knob_baseProfile, 48);
  const knob_base = new THREE.Mesh(knob_baseGeom, knobMat);
  knob_base.name = "knob_base";
  root.add(knob_base);

  const knob_capProfile = [
    new THREE.Vector2(0.00, 1.06),
    new THREE.Vector2(0.18, 1.06),
    new THREE.Vector2(0.25, 1.08),
    new THREE.Vector2(0.30, 1.12),
    new THREE.Vector2(0.31, 1.17),
    new THREE.Vector2(0.28, 1.22),
    new THREE.Vector2(0.22, 1.25),
    new THREE.Vector2(0.13, 1.27),
    new THREE.Vector2(0.00, 1.275),
  ];
  const knob_capGeom = new THREE.LatheGeometry(knob_capProfile, 48);
  const knob_cap = new THREE.Mesh(knob_capGeom, knobMat);
  knob_cap.name = "knob_cap";
  root.add(knob_cap);

  const steam_ventGeom = new THREE.CircleGeometry(0.035, 20);
  const steam_vent = new THREE.Mesh(steam_ventGeom, steam_ventMat);
  steam_vent.name = "steam_vent";

  const ventNormal = new THREE.Vector3(0.16, 0.97, 0.15).normalize();
  steam_vent.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    ventNormal
  );
  steam_vent.rotateZ(-0.45);
  steam_vent.scale.set(0.62, 1.28, 1);
  steam_vent.position.set(0.47, 0.84, 0.45);
  steam_vent.position.addScaledVector(ventNormal, 0.008);
  root.add(steam_vent);

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