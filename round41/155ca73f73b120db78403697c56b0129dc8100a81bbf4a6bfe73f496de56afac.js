export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "jam_sandwich";

  const sponge_group = new THREE.Group();
  sponge_group.name = "sponge_group";
  root.add(sponge_group);

  const filling_group = new THREE.Group();
  filling_group.name = "filling_group";
  root.add(filling_group);

  const spongeMat = new THREE.MeshStandardMaterial({
    color: 0xfff0c2,
    metalness: 0.0,
    roughness: 0.9,
    emissive: 0xffe4a6,
    emissiveIntensity: 0.18,
  });

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xd6a052,
    metalness: 0.0,
    roughness: 0.9,
  });

  const darkCrustMat = new THREE.MeshStandardMaterial({
    color: 0xa96524,
    metalness: 0.0,
    roughness: 0.9,
  });

  const jamMat = new THREE.MeshPhysicalMaterial({
    color: 0xb94b43,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.18,
    ior: 1.4,
    transparent: true,
    opacity: 0.97,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08,
    emissive: 0x4a0908,
    emissiveIntensity: 0.12,
  });

  const jamHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xffb0a4,
    metalness: 0.0,
    roughness: 0.18,
    transparent: true,
    opacity: 0.68,
  });

  const poreMat = new THREE.MeshStandardMaterial({
    color: 0xd8bd72,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const crumbMat = new THREE.MeshStandardMaterial({
    color: 0xfff4cb,
    metalness: 0.0,
    roughness: 0.95,
  });

  function makeExtrudedShape(shape, depth, bevelSize, bevelThickness) {
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize,
      bevelThickness,
    });
  }

  const bottom_spongeShape = new THREE.Shape();
  bottom_spongeShape.moveTo(-0.66, -0.43);
  bottom_spongeShape.lineTo(0.66, -0.43);
  bottom_spongeShape.quadraticCurveTo(0.72, -0.43, 0.72, -0.37);
  bottom_spongeShape.lineTo(0.72, -0.10);
  bottom_spongeShape.quadraticCurveTo(0.72, -0.04, 0.66, -0.04);
  bottom_spongeShape.lineTo(-0.66, -0.04);
  bottom_spongeShape.quadraticCurveTo(-0.72, -0.04, -0.72, -0.10);
  bottom_spongeShape.lineTo(-0.72, -0.37);
  bottom_spongeShape.quadraticCurveTo(-0.72, -0.43, -0.66, -0.43);
  bottom_spongeShape.closePath();

  const bottom_spongeGeom = makeExtrudedShape(
    bottom_spongeShape,
    0.66,
    0.018,
    0.018
  );
  const bottom_sponge = new THREE.Mesh(bottom_spongeGeom, spongeMat);
  bottom_sponge.name = "bottom_sponge";
  bottom_sponge.position.z = -0.33;
  sponge_group.add(bottom_sponge);

  const top_spongeShape = new THREE.Shape();
  top_spongeShape.moveTo(-0.66, 0.14);
  top_spongeShape.lineTo(0.66, 0.14);
  top_spongeShape.quadraticCurveTo(0.72, 0.14, 0.72, 0.20);
  top_spongeShape.lineTo(0.72, 0.44);
  top_spongeShape.quadraticCurveTo(0.72, 0.50, 0.65, 0.50);
  top_spongeShape.lineTo(-0.65, 0.50);
  top_spongeShape.quadraticCurveTo(-0.72, 0.50, -0.72, 0.44);
  top_spongeShape.lineTo(-0.72, 0.20);
  top_spongeShape.quadraticCurveTo(-0.72, 0.14, -0.66, 0.14);
  top_spongeShape.closePath();

  const top_spongeGeom = makeExtrudedShape(
    top_spongeShape,
    0.66,
    0.018,
    0.018
  );
  const top_sponge = new THREE.Mesh(top_spongeGeom, spongeMat);
  top_sponge.name = "top_sponge";
  top_sponge.position.z = -0.33;
  sponge_group.add(top_sponge);

  const bottom_crustShape = new THREE.Shape();
  bottom_crustShape.moveTo(-0.67, -0.455);
  bottom_crustShape.lineTo(0.67, -0.455);
  bottom_crustShape.quadraticCurveTo(0.71, -0.455, 0.71, -0.432);
  bottom_crustShape.lineTo(0.71, -0.410);
  bottom_crustShape.lineTo(0.55, -0.416);
  bottom_crustShape.lineTo(0.38, -0.405);
  bottom_crustShape.lineTo(0.18, -0.418);
  bottom_crustShape.lineTo(-0.03, -0.407);
  bottom_crustShape.lineTo(-0.23, -0.419);
  bottom_crustShape.lineTo(-0.43, -0.408);
  bottom_crustShape.lineTo(-0.60, -0.417);
  bottom_crustShape.lineTo(-0.71, -0.410);
  bottom_crustShape.lineTo(-0.71, -0.432);
  bottom_crustShape.quadraticCurveTo(-0.71, -0.455, -0.67, -0.455);
  bottom_crustShape.closePath();

  const bottom_crustGeom = makeExtrudedShape(
    bottom_crustShape,
    0.67,
    0.006,
    0.006
  );
  const bottom_crust = new THREE.Mesh(bottom_crustGeom, crustMat);
  bottom_crust.name = "bottom_crust";
  bottom_crust.position.z = -0.335;
  sponge_group.add(bottom_crust);

  const top_back_crustShape = new THREE.Shape();
  top_back_crustShape.moveTo(-0.68, 0.493);
  top_back_crustShape.lineTo(0.68, 0.493);
  top_back_crustShape.lineTo(0.68, 0.530);
  top_back_crustShape.lineTo(0.52, 0.535);
  top_back_crustShape.lineTo(0.34, 0.529);
  top_back_crustShape.lineTo(0.15, 0.538);
  top_back_crustShape.lineTo(-0.05, 0.531);
  top_back_crustShape.lineTo(-0.25, 0.539);
  top_back_crustShape.lineTo(-0.45, 0.530);
  top_back_crustShape.lineTo(-0.68, 0.534);
  top_back_crustShape.closePath();

  const top_back_crustGeom = makeExtrudedShape(
    top_back_crustShape,
    0.035,
    0.004,
    0.004
  );
  const top_back_crust = new THREE.Mesh(top_back_crustGeom, crustMat);
  top_back_crust.name = "top_back_crust";
  top_back_crust.position.z = 0.31;
  sponge_group.add(top_back_crust);

  const jam_fillingShape = new THREE.Shape();
  jam_fillingShape.moveTo(-0.75, -0.08);
  jam_fillingShape.bezierCurveTo(-0.66, -0.13, -0.57, -0.11, -0.48, -0.14);
  jam_fillingShape.bezierCurveTo(-0.36, -0.17, -0.26, -0.11, -0.15, -0.13);
  jam_fillingShape.bezierCurveTo(-0.03, -0.16, 0.07, -0.10, 0.18, -0.13);
  jam_fillingShape.bezierCurveTo(0.31, -0.17, 0.42, -0.11, 0.52, -0.12);
  jam_fillingShape.bezierCurveTo(0.63, -0.13, 0.70, -0.09, 0.75, -0.07);
  jam_fillingShape.lineTo(0.75, 0.08);
  jam_fillingShape.bezierCurveTo(0.69, 0.12, 0.63, 0.10, 0.56, 0.13);
  jam_fillingShape.bezierCurveTo(0.47, 0.16, 0.38, 0.11, 0.29, 0.13);
  jam_fillingShape.bezierCurveTo(0.18, 0.16, 0.08, 0.10, -0.03, 0.12);
  jam_fillingShape.bezierCurveTo(-0.15, 0.15, -0.25, 0.10, -0.36, 0.13);
  jam_fillingShape.bezierCurveTo(-0.48, 0.16, -0.58, 0.10, -0.66, 0.12);
  jam_fillingShape.bezierCurveTo(-0.71, 0.13, -0.74, 0.10, -0.75, 0.08);
  jam_fillingShape.closePath();

  const jam_fillingGeom = makeExtrudedShape(
    jam_fillingShape,
    0.70,
    0.022,
    0.022
  );
  const jam_filling = new THREE.Mesh(jam_fillingGeom, jamMat);
  jam_filling.name = "jam_filling";
  jam_filling.position.z = -0.35;
  filling_group.add(jam_filling);

  const jam_foldPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.69, 0.075, 0.378),
    new THREE.Vector3(-0.58, 0.035, 0.381),
    new THREE.Vector3(-0.47, -0.025, 0.383),
    new THREE.Vector3(-0.34, -0.075, 0.384),
    new THREE.Vector3(-0.20, -0.055, 0.383),
    new THREE.Vector3(-0.07, -0.005, 0.381),
    new THREE.Vector3(0.08, 0.035, 0.379),
  ]);
  const jam_foldGeom = new THREE.TubeGeometry(
    jam_foldPath,
    32,
    0.012,
    8,
    false
  );
  const jam_fold = new THREE.Mesh(jam_foldGeom, jamHighlightMat);
  jam_fold.name = "jam_fold";
  filling_group.add(jam_fold);

  const jam_highlightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.08, 0.075, 0.379),
    new THREE.Vector3(0.20, 0.055, 0.381),
    new THREE.Vector3(0.34, 0.082, 0.380),
    new THREE.Vector3(0.48, 0.070, 0.379),
    new THREE.Vector3(0.61, 0.090, 0.377),
  ]);
  const jam_highlightGeom = new THREE.TubeGeometry(
    jam_highlightPath,
    24,
    0.005,
    6,
    false
  );
  const jam_highlight = new THREE.Mesh(
    jam_highlightGeom,
    jamHighlightMat
  );
  jam_highlight.name = "jam_highlight";
  filling_group.add(jam_highlight);

  const instance_dummy = new THREE.Object3D();

  function setInstance(
    mesh,
    index,
    x,
    y,
    z,
    sx,
    sy,
    sz,
    rx,
    ry,
    rz
  ) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.rotation.set(rx, ry, rz);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const jam_ridgesGeom = new THREE.SphereGeometry(1, 12, 8);
  const jam_ridges = new THREE.InstancedMesh(
    jam_ridgesGeom,
    jamHighlightMat,
    14
  );
  jam_ridges.name = "jam_ridges";

  for (let i = 0; i < 14; i++) {
    const x = -0.63 + i * 1.26 / 13;
    const y = 0.055 + Math.sin(i * 1.73) * 0.026;
    const sx = 0.045 + (i % 4) * 0.013;
    const sy = 0.006 + (i % 3) * 0.002;
    setInstance(
      jam_ridges,
      i,
      x,
      y,
      0.379,
      sx,
      sy,
      0.004,
      0,
      0,
      Math.sin(i * 0.91) * 0.32
    );
  }
  jam_ridges.instanceMatrix.needsUpdate = true;
  filling_group.add(jam_ridges);

  const jam_dripsGeom = new THREE.SphereGeometry(1, 12, 8);
  const jam_drips = new THREE.InstancedMesh(jam_dripsGeom, jamMat, 6);
  jam_drips.name = "jam_drips";

  for (let i = 0; i < 6; i++) {
    const x = -0.52 + i * 0.205;
    const sy = 0.026 + (i % 3) * 0.009;
    setInstance(
      jam_drips,
      i,
      x,
      -0.105 - sy * 0.35,
      0.374,
      0.034 + (i % 2) * 0.012,
      sy,
      0.020,
      0,
      0,
      Math.sin(i * 1.2) * 0.18
    );
  }
  jam_drips.instanceMatrix.needsUpdate = true;
  filling_group.add(jam_drips);

  const sponge_poresGeom = new THREE.CircleGeometry(1, 10);
  const sponge_pores = new THREE.InstancedMesh(
    sponge_poresGeom,
    poreMat,
    240
  );
  sponge_pores.name = "sponge_pores";

  let poreIndex = 0;

  for (let i = 0; i < 120; i++) {
    const u = ((i * 37 + 11) % 127) / 126;
    const v = ((i * 61 + 7) % 131) / 130;
    const x = -0.65 + u * 1.30;
    const y = -0.385 + v * 0.30;
    const base = 0.0045 + ((i * 19 + 3) % 13) * 0.00075;
    const large = i % 19 === 0 ? 1.65 : 1;
    const sx = base * large * (0.85 + ((i * 7) % 5) * 0.08);
    const sy = base * large * (0.70 + ((i * 11) % 6) * 0.09);
    const rz = ((i * 23) % 31) / 31 * Math.PI;
    setInstance(
      sponge_pores,
      poreIndex,
      x,
      y,
      0.352,
      sx,
      sy,
      1,
      0,
      0,
      rz
    );
    poreIndex++;
  }

  for (let i = 0; i < 120; i++) {
    const u = ((i * 43 + 5) % 127) / 126;
    const v = ((i * 67 + 9) % 131) / 130;
    const x = -0.65 + u * 1.30;
    const y = 0.19 + v * 0.275;
    const base = 0.0045 + ((i * 17 + 2) % 13) * 0.00075;
    const large = i % 23 === 0 ? 1.65 : 1;
    const sx = base * large * (0.85 + ((i * 5) % 5) * 0.08);
    const sy = base * large * (0.70 + ((i * 13) % 6) * 0.09);
    const rz = ((i * 29) % 37) / 37 * Math.PI;
    setInstance(
      sponge_pores,
      poreIndex,
      x,
      y,
      0.352,
      sx,
      sy,
      1,
      0,
      0,
      rz
    );
    poreIndex++;
  }

  sponge_pores.instanceMatrix.needsUpdate = true;
  sponge_group.add(sponge_pores);

  const sponge_crumbsGeom = new THREE.IcosahedronGeometry(1, 0);
  const sponge_crumbs = new THREE.InstancedMesh(
    sponge_crumbsGeom,
    crumbMat,
    112
  );
  sponge_crumbs.name = "sponge_crumbs";

  let crumbIndex = 0;

  for (let i = 0; i < 36; i++) {
    const x = -0.68 + i * 1.36 / 35;
    const y = 0.135 + Math.sin(i * 2.17) * 0.012;
    const z = 0.30 + Math.sin(i * 1.31) * 0.035;
    const s = 0.007 + (i % 5) * 0.0018;
    setInstance(
      sponge_crumbs,
      crumbIndex,
      x,
      y,
      z,
      s * 1.2,
      s,
      s,
      i * 0.31,
      i * 0.47,
      i * 0.23
    );
    crumbIndex++;
  }

  for (let i = 0; i < 36; i++) {
    const x = -0.68 + i * 1.36 / 35;
    const y = -0.045 + Math.sin(i * 2.03) * 0.010;
    const z = 0.30 + Math.sin(i * 1.43) * 0.035;
    const s = 0.007 + (i % 5) * 0.0018;
    setInstance(
      sponge_crumbs,
      crumbIndex,
      x,
      y,
      z,
      s * 1.2,
      s,
      s,
      i * 0.29,
      i * 0.41,
      i * 0.37
    );
    crumbIndex++;
  }

  for (let i = 0; i < 20; i++) {
    const x = -0.67 + i * 1.34 / 19;
    const y = -0.445 + Math.sin(i * 1.79) * 0.007;
    const z = 0.30 + Math.sin(i * 1.17) * 0.032;
    const s = 0.006 + (i % 4) * 0.0017;
    setInstance(
      sponge_crumbs,
      crumbIndex,
      x,
      y,
      z,
      s * 1.25,
      s,
      s,
      i * 0.33,
      i * 0.27,
      i * 0.43
    );
    crumbIndex++;
  }

  for (let i = 0; i < 20; i++) {
    const x = -0.67 + i * 1.34 / 19;
    const y = 0.505 + Math.sin(i * 1.61) * 0.006;
    const z = 0.30 + Math.sin(i * 1.39) * 0.032;
    const s = 0.006 + (i % 4) * 0.0017;
    setInstance(
      sponge_crumbs,
      crumbIndex,
      x,
      y,
      z,
      s * 1.25,
      s,
      s,
      i * 0.37,
      i * 0.29,
      i * 0.41
    );
    crumbIndex++;
  }

  sponge_crumbs.instanceMatrix.needsUpdate = true;
  sponge_group.add(sponge_crumbs);

  const crust_crumbsGeom = new THREE.IcosahedronGeometry(1, 0);
  const crust_crumbs = new THREE.InstancedMesh(
    crust_crumbsGeom,
    darkCrustMat,
    28
  );
  crust_crumbs.name = "crust_crumbs";

  for (let i = 0; i < 28; i++) {
    const x = -0.68 + i * 1.36 / 27;
    const y = -0.452 + Math.sin(i * 2.41) * 0.006;
    const z = 0.32 + Math.sin(i * 1.11) * 0.025;
    const s = 0.004 + (i % 4) * 0.0012;
    setInstance(
      crust_crumbs,
      i,
      x,
      y,
      z,
      s * 1.3,
      s,
      s,
      i * 0.37,
      i * 0.51,
      i * 0.29
    );
  }

  crust_crumbs.instanceMatrix.needsUpdate = true;
  sponge_group.add(crust_crumbs);

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