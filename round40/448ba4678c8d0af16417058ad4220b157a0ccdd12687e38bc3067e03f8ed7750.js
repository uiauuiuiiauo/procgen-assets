export default function generate(THREE) {
  const root = new THREE.Group();

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });
  const goldHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xf0cf68,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedSilverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const faceMat = new THREE.MeshStandardMaterial({
    color: 0xe7ecef,
    metalness: 0.0,
    roughness: 0.4,
  });
  const outlineMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.5,
    roughness: 0.25,
  });

  function createStarShape(outerRadius, innerRadius) {
    const shape = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const angle = Math.PI / 2 + i * Math.PI / 5;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }

  function createKiteShape(length, halfWidth) {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.025);
    shape.lineTo(halfWidth, 0.16);
    shape.lineTo(0, length);
    shape.lineTo(-halfWidth, 0.16);
    shape.closePath();
    return shape;
  }

  function createFacetShape(length, halfWidth) {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.015);
    shape.lineTo(0, length - 0.012);
    shape.lineTo(-halfWidth, 0.16);
    shape.closePath();
    return shape;
  }

  const top_connectorGeom = new THREE.SphereGeometry(0.105, 24, 14);
  const top_connector = new THREE.Mesh(top_connectorGeom, goldMat);
  top_connector.position.set(0, 0.86, 0.015);
  top_connector.scale.set(0.78, 1.15, 0.62);
  root.add(top_connector);

  const top_loopGeom = new THREE.TorusGeometry(0.17, 0.055, 14, 48);
  const top_loop = new THREE.Mesh(top_loopGeom, goldMat);
  top_loop.position.set(0, 1.09, 0.02);
  top_loop.scale.set(1, 1.05, 1);
  root.add(top_loop);

  const top_loop_highlightGeom = new THREE.TorusGeometry(0.17, 0.017, 8, 48);
  const top_loop_highlight = new THREE.Mesh(top_loop_highlightGeom, goldHighlightMat);
  top_loop_highlight.position.set(0, 1.09, 0.078);
  top_loop_highlight.scale.set(1, 1.05, 1);
  root.add(top_loop_highlight);

  const medallion_backingGeom = new THREE.CylinderGeometry(0.875, 0.875, 0.12, 64);
  const medallion_backing = new THREE.Mesh(medallion_backingGeom, goldMat);
  medallion_backing.rotation.x = Math.PI / 2;
  root.add(medallion_backing);

  const medallion_faceGeom = new THREE.CylinderGeometry(0.742, 0.742, 0.04, 64);
  const medallion_face = new THREE.Mesh(medallion_faceGeom, faceMat);
  medallion_face.rotation.x = Math.PI / 2;
  medallion_face.position.z = 0.073;
  root.add(medallion_face);

  const outer_rimGeom = new THREE.TorusGeometry(0.815, 0.075, 16, 64);
  const outer_rim = new THREE.Mesh(outer_rimGeom, goldMat);
  outer_rim.position.z = 0.09;
  root.add(outer_rim);

  const outer_rim_highlightGeom = new THREE.TorusGeometry(0.815, 0.019, 8, 64);
  const outer_rim_highlight = new THREE.Mesh(outer_rim_highlightGeom, goldHighlightMat);
  outer_rim_highlight.position.z = 0.158;
  root.add(outer_rim_highlight);

  const inner_bezelGeom = new THREE.TorusGeometry(0.733, 0.023, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, goldMat);
  inner_bezel.position.z = 0.112;
  root.add(inner_bezel);

  const face_outlineGeom = new THREE.TorusGeometry(0.704, 0.009, 8, 64);
  const face_outline = new THREE.Mesh(face_outlineGeom, outlineMat);
  face_outline.position.z = 0.105;
  root.add(face_outline);

  const central_gold_diskGeom = new THREE.CylinderGeometry(0.39, 0.39, 0.025, 48);
  const central_gold_disk = new THREE.Mesh(central_gold_diskGeom, goldMat);
  central_gold_disk.rotation.x = Math.PI / 2;
  central_gold_disk.position.z = 0.103;
  root.add(central_gold_disk);

  const central_gold_borderGeom = new THREE.TorusGeometry(0.39, 0.021, 10, 48);
  const central_gold_border = new THREE.Mesh(central_gold_borderGeom, goldHighlightMat);
  central_gold_border.position.z = 0.12;
  root.add(central_gold_border);

  const compass_pointsShape = createKiteShape(0.69, 0.14);
  const compass_pointsGeom = new THREE.ExtrudeGeometry(compass_pointsShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const compass_points = new THREE.InstancedMesh(compass_pointsGeom, silverMat, 8);
  const compass_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    compass_dummy.position.set(0, 0, 0.128);
    compass_dummy.rotation.set(0, 0, i * Math.PI / 4);
    compass_dummy.scale.set(1, 1, 1);
    compass_dummy.updateMatrix();
    compass_points.setMatrixAt(i, compass_dummy.matrix);
  }
  compass_points.instanceMatrix.needsUpdate = true;
  root.add(compass_points);

  const compass_facetsShape = createFacetShape(0.69, 0.14);
  const compass_facetsGeom = new THREE.ExtrudeGeometry(compass_facetsShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: false,
  });
  const compass_facets = new THREE.InstancedMesh(compass_facetsGeom, polishedSilverMat, 8);
  const compass_facet_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    compass_facet_dummy.position.set(0, 0, 0.174);
    compass_facet_dummy.rotation.set(0, 0, i * Math.PI / 4);
    compass_facet_dummy.scale.set(1, 1, 1);
    compass_facet_dummy.updateMatrix();
    compass_facets.setMatrixAt(i, compass_facet_dummy.matrix);
  }
  compass_facets.instanceMatrix.needsUpdate = true;
  root.add(compass_facets);

  const starShape = createStarShape(0.15, 0.066);
  const starGeom = new THREE.ExtrudeGeometry(starShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.009,
    bevelSegments: 2,
  });

  const cardinal_stars = new THREE.InstancedMesh(starGeom, silverMat, 4);
  const cardinal_star_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    cardinal_star_dummy.position.set(
      Math.cos(angle) * 0.84,
      Math.sin(angle) * 0.84,
      0.15
    );
    cardinal_star_dummy.rotation.set(0, 0, -angle);
    cardinal_star_dummy.scale.set(1, 1, 1);
    cardinal_star_dummy.updateMatrix();
    cardinal_stars.setMatrixAt(i, cardinal_star_dummy.matrix);
  }
  cardinal_stars.instanceMatrix.needsUpdate = true;
  root.add(cardinal_stars);

  const diagonal_stars = new THREE.InstancedMesh(starGeom, silverMat, 4);
  const diagonal_star_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    diagonal_star_dummy.position.set(
      Math.cos(angle) * 0.56,
      Math.sin(angle) * 0.56,
      0.158
    );
    diagonal_star_dummy.rotation.set(0, 0, -angle);
    diagonal_star_dummy.scale.set(0.9, 0.9, 0.9);
    diagonal_star_dummy.updateMatrix();
    diagonal_stars.setMatrixAt(i, diagonal_star_dummy.matrix);
  }
  diagonal_stars.instanceMatrix.needsUpdate = true;
  root.add(diagonal_stars);

  const center_bossGeom = new THREE.SphereGeometry(0.115, 28, 16);
  const center_boss = new THREE.Mesh(center_bossGeom, polishedSilverMat);
  center_boss.position.set(0, 0, 0.205);
  center_boss.scale.set(1, 1, 0.55);
  root.add(center_boss);

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