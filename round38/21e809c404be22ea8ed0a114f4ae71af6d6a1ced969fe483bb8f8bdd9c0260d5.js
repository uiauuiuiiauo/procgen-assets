export default function generate(THREE) {
  const root = new THREE.Group();

  const matW = 3.0;
  const matD = 3.0;
  const cornerR = 0.18;

  function roundedRectShape(width, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -depth / 2;
    const y1 = depth / 2;
    const r = Math.min(radius, width / 2, depth / 2);
    const shape = new THREE.Shape();

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();

    return shape;
  }

  function roundedRectGeometry(width, depth, radius, height, bevelSize, bevelThickness) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, depth, radius),
      {
        depth: height,
        steps: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize,
        bevelThickness
      }
    );
  }

  const blue_baseMat = new THREE.MeshStandardMaterial({
    color: 0x079ee8,
    metalness: 0.0,
    roughness: 0.3
  });
  const blue_baseGeom = roundedRectGeometry(
    matW,
    matD,
    cornerR,
    0.075,
    0.025,
    0.018
  );
  const blue_base = new THREE.Mesh(blue_baseGeom, blue_baseMat);
  blue_base.rotation.x = -Math.PI / 2;
  blue_base.position.y = 0.018;
  root.add(blue_base);

  const underside_panelMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8
  });
  const underside_panelGeom = roundedRectGeometry(
    matW - 0.09,
    matD - 0.09,
    cornerR - 0.025,
    0.024,
    0.012,
    0.008
  );
  const underside_panel = new THREE.Mesh(
    underside_panelGeom,
    underside_panelMat
  );
  underside_panel.rotation.x = -Math.PI / 2;
  underside_panel.position.y = -0.004;
  root.add(underside_panel);

  const black_top_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });
  const black_top_surfaceGeom = roundedRectGeometry(
    matW - 0.06,
    matD - 0.06,
    cornerR - 0.015,
    0.052,
    0.022,
    0.014
  );
  const black_top_surface = new THREE.Mesh(
    black_top_surfaceGeom,
    black_top_surfaceMat
  );
  black_top_surface.rotation.x = -Math.PI / 2;
  black_top_surface.position.y = 0.096;
  root.add(black_top_surface);

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