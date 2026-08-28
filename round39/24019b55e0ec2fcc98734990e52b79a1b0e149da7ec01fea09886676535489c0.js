export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "necklace";

  const pendant = new THREE.Group();
  pendant.name = "pendant";
  root.add(pendant);

  const chain = new THREE.Group();
  chain.name = "chain";
  root.add(chain);

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const recessed_silverMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const gemstoneMat = new THREE.MeshStandardMaterial({
    color: 0x45b77d,
    metalness: 0.0,
    roughness: 0.3
  });

  const gemstone_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xe9ffff,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.62,
    depthWrite: false
  });

  const gemstone_cyan_glowMat = new THREE.MeshStandardMaterial({
    color: 0x52efd0,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.48,
    depthWrite: false
  });

  const gemstone_gold_glowMat = new THREE.MeshStandardMaterial({
    color: 0xd7cf63,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });

  const gemstone_lavender_glowMat = new THREE.MeshStandardMaterial({
    color: 0xc8b5ef,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.4,
    depthWrite: false
  });

  const outer_spiral_points = [
    new THREE.Vector3(-0.275, -0.205, 0.024),
    new THREE.Vector3(-0.220, -0.285, 0.024),
    new THREE.Vector3(-0.085, -0.355, 0.024),
    new THREE.Vector3(0.085, -0.365, 0.024),
    new THREE.Vector3(0.225, -0.305, 0.024),
    new THREE.Vector3(0.315, -0.180, 0.024),
    new THREE.Vector3(0.335, -0.015, 0.024),
    new THREE.Vector3(0.305, 0.155, 0.024),
    new THREE.Vector3(0.215, 0.275, 0.024),
    new THREE.Vector3(0.075, 0.330, 0.024),
    new THREE.Vector3(-0.080, 0.315, 0.024),
    new THREE.Vector3(-0.200, 0.245, 0.024),
    new THREE.Vector3(-0.260, 0.135, 0.024),
    new THREE.Vector3(-0.265, 0.015, 0.024),
    new THREE.Vector3(-0.215, -0.085, 0.024),
    new THREE.Vector3(-0.125, -0.145, 0.024),
    new THREE.Vector3(-0.015, -0.165, 0.024),
    new THREE.Vector3(0.105, -0.145, 0.024),
    new THREE.Vector3(0.195, -0.085, 0.024),
    new THREE.Vector3(0.225, 0.005, 0.024),
    new THREE.Vector3(0.195, 0.090, 0.024),
    new THREE.Vector3(0.120, 0.135, 0.024)
  ];

  const outer_spiralCurve = new THREE.CatmullRomCurve3(
    outer_spiral_points,
    false,
    "centripetal",
    0.5
  );
  const outer_spiralGeom = new THREE.TubeGeometry(
    outer_spiralCurve,
    160,
    0.030,
    12,
    false
  );
  const outer_spiral = new THREE.Mesh(outer_spiralGeom, polished_silverMat);
  outer_spiral.name = "outer_spiral";
  pendant.add(outer_spiral);

  const spiral_end_capGeom = new THREE.SphereGeometry(0.0305, 16, 10);
  const spiral_end_caps = new THREE.InstancedMesh(
    spiral_end_capGeom,
    polished_silverMat,
    2
  );
  spiral_end_caps.name = "spiral_end_caps";
  const spiral_cap_dummy = new THREE.Object3D();
  const spiral_cap_positions = [
    outer_spiral_points[0],
    outer_spiral_points[outer_spiral_points.length - 1]
  ];
  for (let i = 0; i < spiral_cap_positions.length; i++) {
    spiral_cap_dummy.position.copy(spiral_cap_positions[i]);
    spiral_cap_dummy.rotation.set(0, 0, 0);
    spiral_cap_dummy.scale.set(1, 1, 1);
    spiral_cap_dummy.updateMatrix();
    spiral_end_caps.setMatrixAt(i, spiral_cap_dummy.matrix);
  }
  spiral_end_caps.instanceMatrix.needsUpdate = true;
  pendant.add(spiral_end_caps);

  const outer_bezelGeom = new THREE.TorusGeometry(0.166, 0.014, 12, 64);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, polished_silverMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.set(0, 0.055, 0.052);
  pendant.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.143, 0.008, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, recessed_silverMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.set(0, 0.055, 0.061);
  pendant.add(inner_bezel);

  const gemstoneGeom = new THREE.SphereGeometry(1, 40, 24);
  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.name = "gemstone";
  gemstone.position.set(0, 0.055, 0.070);
  gemstone.scale.set(0.132, 0.150, 0.056);
  pendant.add(gemstone);

  const gemstone_highlightGeom = new THREE.SphereGeometry(1, 20, 12);
  const gemstone_highlight = new THREE.Mesh(
    gemstone_highlightGeom,
    gemstone_highlightMat
  );
  gemstone_highlight.name = "gemstone_highlight";
  gemstone_highlight.position.set(-0.042, 0.108, 0.123);
  gemstone_highlight.scale.set(0.027, 0.047, 0.004);
  gemstone_highlight.rotation.z = -0.28;
  pendant.add(gemstone_highlight);

  const gemstone_cyan_glowGeom = new THREE.SphereGeometry(1, 20, 12);
  const gemstone_cyan_glow = new THREE.Mesh(
    gemstone_cyan_glowGeom,
    gemstone_cyan_glowMat
  );
  gemstone_cyan_glow.name = "gemstone_cyan_glow";
  gemstone_cyan_glow.position.set(0.050, 0.025, 0.119);
  gemstone_cyan_glow.scale.set(0.034, 0.050, 0.004);
  gemstone_cyan_glow.rotation.z = 0.32;
  pendant.add(gemstone_cyan_glow);

  const gemstone_gold_glowGeom = new THREE.SphereGeometry(1, 20, 12);
  const gemstone_gold_glow = new THREE.Mesh(
    gemstone_gold_glowGeom,
    gemstone_gold_glowMat
  );
  gemstone_gold_glow.name = "gemstone_gold_glow";
  gemstone_gold_glow.position.set(-0.052, 0.012, 0.117);
  gemstone_gold_glow.scale.set(0.043, 0.052, 0.004);
  gemstone_gold_glow.rotation.z = -0.42;
  pendant.add(gemstone_gold_glow);

  const gemstone_lavender_glowGeom = new THREE.SphereGeometry(1, 20, 12);
  const gemstone_lavender_glow = new THREE.Mesh(
    gemstone_lavender_glowGeom,
    gemstone_lavender_glowMat
  );
  gemstone_lavender_glow.name = "gemstone_lavender_glow";
  gemstone_lavender_glow.position.set(-0.020, 0.112, 0.121);
  gemstone_lavender_glow.scale.set(0.038, 0.031, 0.004);
  gemstone_lavender_glow.rotation.z = 0.2;
  pendant.add(gemstone_lavender_glow);

  const attachment_ringGeom = new THREE.TorusGeometry(0.034, 0.0075, 10, 36);

  const left_attachment_ring = new THREE.Mesh(
    attachment_ringGeom,
    polished_silverMat
  );
  left_attachment_ring.name = "left_attachment_ring";
  left_attachment_ring.position.set(-0.285, 0.305, 0.018);
  left_attachment_ring.rotation.z = 0.50;
  left_attachment_ring.scale.set(0.86, 1.14, 1);
  pendant.add(left_attachment_ring);

  const right_attachment_ring = new THREE.Mesh(
    attachment_ringGeom,
    polished_silverMat
  );
  right_attachment_ring.name = "right_attachment_ring";
  right_attachment_ring.position.set(0.285, 0.305, 0.018);
  right_attachment_ring.rotation.z = -0.50;
  right_attachment_ring.scale.set(0.86, 1.14, 1);
  pendant.add(right_attachment_ring);

  const chain_linkGeom = new THREE.TorusGeometry(0.027, 0.0055, 8, 28);
  const chain_link_count = 10;

  const left_chain_links = new THREE.InstancedMesh(
    chain_linkGeom,
    polished_silverMat,
    chain_link_count
  );
  left_chain_links.name = "left_chain_links";
  left_chain_links.frustumCulled = false;
  chain.add(left_chain_links);

  const right_chain_links = new THREE.InstancedMesh(
    chain_linkGeom,
    polished_silverMat,
    chain_link_count
  );
  right_chain_links.name = "right_chain_links";
  right_chain_links.frustumCulled = false;
  chain.add(right_chain_links);

  function populateChain(instanced_mesh, side) {
    const link_dummy = new THREE.Object3D();
    const link_start = new THREE.Vector3(side * 0.300, 0.338, 0.012);
    const link_end = new THREE.Vector3(side * 0.620, 1.000, 0.012);
    const link_dx = link_end.x - link_start.x;
    const link_dy = link_end.y - link_start.y;
    const link_length = Math.sqrt(link_dx * link_dx + link_dy * link_dy);
    const link_ux = link_dx / link_length;
    const link_uy = link_dy / link_length;
    const alignment = Math.atan2(-link_ux, link_uy);

    for (let i = 0; i < chain_link_count; i++) {
      const t = i / (chain_link_count - 1);
      link_dummy.position.set(
        link_start.x + link_dx * t,
        link_start.y + link_dy * t,
        link_start.z + (i % 2) * 0.004
      );
      link_dummy.rotation.set(
        0,
        i % 2 === 0 ? 0.72 : -0.72,
        alignment
      );
      link_dummy.scale.set(0.82, 1.28, 1);
      link_dummy.updateMatrix();
      instanced_mesh.setMatrixAt(i, link_dummy.matrix);
    }
    instanced_mesh.instanceMatrix.needsUpdate = true;
  }

  populateChain(left_chain_links, -1);
  populateChain(right_chain_links, 1);

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