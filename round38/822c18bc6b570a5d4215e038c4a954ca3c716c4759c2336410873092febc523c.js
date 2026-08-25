export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "star_necklace";

  const pendant_group = new THREE.Group();
  pendant_group.name = "pendant_group";
  root.add(pendant_group);

  const chain_group = new THREE.Group();
  chain_group.name = "chain_group";
  root.add(chain_group);

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const gemstoneMat = new THREE.MeshStandardMaterial({
    color: 0x0055c9,
    metalness: 0.0,
    roughness: 0.3,
  });

  const gemstone_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x071b55,
    metalness: 0.0,
    roughness: 0.7,
  });

  const gemstone_deepMat = new THREE.MeshStandardMaterial({
    color: 0x061966,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const gemstone_royalMat = new THREE.MeshStandardMaterial({
    color: 0x0755d9,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const gemstone_cyanMat = new THREE.MeshStandardMaterial({
    color: 0x00bceb,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const gemstone_electricMat = new THREE.MeshStandardMaterial({
    color: 0x008cff,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const gemstone_violetMat = new THREE.MeshStandardMaterial({
    color: 0x29227f,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const gemstone_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x8cecff,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const gemstone_glowMat = new THREE.MeshStandardMaterial({
    color: 0x00eaff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x00eaff,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide,
  });

  const gemstone_haloMat = new THREE.MeshStandardMaterial({
    color: 0x00bfff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x00bfff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const gemstone_white_glowMat = new THREE.MeshStandardMaterial({
    color: 0xf2ffff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xf2ffff,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide,
  });

  function createStarPoints(outerRadius, innerRadius) {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const angle = Math.PI / 2 + i * Math.PI / 5;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      points.push(
        new THREE.Vector2(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius
        )
      );
    }
    return points;
  }

  function createStarShape(outerRadius, innerRadius) {
    const points = createStarPoints(outerRadius, innerRadius);
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i].x, points[i].y);
    }
    shape.closePath();
    return shape;
  }

  function createPolygonShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i].x, points[i].y);
    }
    shape.closePath();
    return shape;
  }

  const star_center_y = -0.43;

  const star_settingShape = createStarShape(0.72, 0.34);
  const star_settingGeom = new THREE.ExtrudeGeometry(star_settingShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.014,
    bevelSegments: 3,
  });
  const star_setting = new THREE.Mesh(
    star_settingGeom,
    polished_silverMat
  );
  star_setting.name = "star_setting";
  star_setting.position.set(0, star_center_y, -0.04);
  pendant_group.add(star_setting);

  const gemstone_bezel_rimShape = createStarShape(0.695, 0.328);
  const gemstone_bezel_rimGeom = new THREE.ExtrudeGeometry(
    gemstone_bezel_rimShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.006,
      bevelSegments: 2,
    }
  );
  const gemstone_bezel_rim = new THREE.Mesh(
    gemstone_bezel_rimGeom,
    polished_silverMat
  );
  gemstone_bezel_rim.name = "gemstone_bezel_rim";
  gemstone_bezel_rim.position.set(0, star_center_y, 0.038);
  pendant_group.add(gemstone_bezel_rim);

  const gemstoneShape = createStarShape(0.67, 0.313);
  const gemstoneGeom = new THREE.ExtrudeGeometry(gemstoneShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.name = "gemstone";
  gemstone.position.set(0, star_center_y, 0.052);
  pendant_group.add(gemstone);

  const gemstone_facets = new THREE.Group();
  gemstone_facets.name = "gemstone_facets";
  pendant_group.add(gemstone_facets);

  const facet_center = new THREE.Vector2(0, -0.015);
  const facet_points = createStarPoints(0.655, 0.302);

  for (let i = 0; i < 10; i++) {
    const next = (i + 1) % 10;
    const gemstone_facetShape = createPolygonShape([
      facet_center,
      facet_points[i],
      facet_points[next],
    ]);
    const gemstone_facetGeom = new THREE.ShapeGeometry(
      gemstone_facetShape
    );
    const facet_material =
      i === 1 || i === 9
        ? gemstone_cyanMat
        : i % 2 === 0
          ? gemstone_royalMat
          : gemstone_deepMat;
    const gemstone_facet = new THREE.Mesh(
      gemstone_facetGeom,
      facet_material
    );
    gemstone_facet.name = "gemstone_facet_" + i;
    gemstone_facet.position.set(0, star_center_y, 0.071);
    gemstone_facets.add(gemstone_facet);
  }

  const upper_left_facetShape = createPolygonShape([
    new THREE.Vector2(0, -0.02),
    new THREE.Vector2(-0.62, 0.15),
    new THREE.Vector2(-0.25, 0.02),
  ]);
  const upper_left_facetGeom = new THREE.ShapeGeometry(
    upper_left_facetShape
  );
  const upper_left_facet = new THREE.Mesh(
    upper_left_facetGeom,
    gemstone_electricMat
  );
  upper_left_facet.name = "upper_left_facet";
  upper_left_facet.position.set(0, star_center_y, 0.073);
  gemstone_facets.add(upper_left_facet);

  const upper_right_facetShape = createPolygonShape([
    new THREE.Vector2(0, -0.02),
    new THREE.Vector2(0.25, 0.02),
    new THREE.Vector2(0.62, 0.15),
  ]);
  const upper_right_facetGeom = new THREE.ShapeGeometry(
    upper_right_facetShape
  );
  const upper_right_facet = new THREE.Mesh(
    upper_right_facetGeom,
    gemstone_violetMat
  );
  upper_right_facet.name = "upper_right_facet";
  upper_right_facet.position.set(0, star_center_y, 0.0735);
  gemstone_facets.add(upper_right_facet);

  const left_wing_facetShape = createPolygonShape([
    new THREE.Vector2(0, -0.02),
    new THREE.Vector2(-0.27, -0.22),
    new THREE.Vector2(-0.38, -0.62),
  ]);
  const left_wing_facetGeom = new THREE.ShapeGeometry(
    left_wing_facetShape
  );
  const left_wing_facet = new THREE.Mesh(
    left_wing_facetGeom,
    gemstone_violetMat
  );
  left_wing_facet.name = "left_wing_facet";
  left_wing_facet.position.set(0, star_center_y, 0.073);
  gemstone_facets.add(left_wing_facet);

  const right_wing_facetShape = createPolygonShape([
    new THREE.Vector2(0, -0.02),
    new THREE.Vector2(0.38, -0.62),
    new THREE.Vector2(0.27, -0.22),
  ]);
  const right_wing_facetGeom = new THREE.ShapeGeometry(
    right_wing_facetShape
  );
  const right_wing_facet = new THREE.Mesh(
    right_wing_facetGeom,
    gemstone_electricMat
  );
  right_wing_facet.name = "right_wing_facet";
  right_wing_facet.position.set(0, star_center_y, 0.073);
  gemstone_facets.add(right_wing_facet);

  const top_point_facetShape = createPolygonShape([
    new THREE.Vector2(0, -0.02),
    new THREE.Vector2(-0.14, 0.28),
    new THREE.Vector2(0, 0.63),
    new THREE.Vector2(0.14, 0.28),
  ]);
  const top_point_facetGeom = new THREE.ShapeGeometry(
    top_point_facetShape
  );
  const top_point_facet = new THREE.Mesh(
    top_point_facetGeom,
    gemstone_royalMat
  );
  top_point_facet.name = "top_point_facet";
  top_point_facet.position.set(0, star_center_y, 0.073);
  gemstone_facets.add(top_point_facet);

  const gemstone_swirlShape = new THREE.Shape();
  gemstone_swirlShape.moveTo(-0.56, 0.17);
  gemstone_swirlShape.bezierCurveTo(
    -0.34,
    0.10,
    -0.12,
    -0.04,
    0.02,
    -0.18
  );
  gemstone_swirlShape.bezierCurveTo(
    0.14,
    -0.31,
    0.20,
    -0.48,
    0.28,
    -0.62
  );
  gemstone_swirlShape.lineTo(0.37, -0.60);
  gemstone_swirlShape.bezierCurveTo(
    0.27,
    -0.40,
    0.20,
    -0.25,
    0.08,
    -0.13
  );
  gemstone_swirlShape.bezierCurveTo(
    -0.08,
    0.01,
    -0.31,
    0.18,
    -0.55,
    0.24
  );
  gemstone_swirlShape.closePath();

  const gemstone_swirlGeom = new THREE.ShapeGeometry(
    gemstone_swirlShape
  );
  const gemstone_swirl = new THREE.Mesh(
    gemstone_swirlGeom,
    gemstone_highlightMat
  );
  gemstone_swirl.name = "gemstone_swirl";
  gemstone_swirl.position.set(0, star_center_y, 0.075);
  gemstone_facets.add(gemstone_swirl);

  const right_swirlShape = new THREE.Shape();
  right_swirlShape.moveTo(-0.02, -0.08);
  right_swirlShape.bezierCurveTo(
    0.12,
    0.02,
    0.32,
    0.12,
    0.57,
    0.17
  );
  right_swirlShape.bezierCurveTo(
    0.37,
    0.15,
    0.22,
    0.08,
    0.06,
    -0.01
  );
  right_swirlShape.closePath();

  const right_swirlGeom = new THREE.ShapeGeometry(right_swirlShape);
  const right_swirl = new THREE.Mesh(
    right_swirlGeom,
    gemstone_cyanMat
  );
  right_swirl.name = "right_swirl";
  right_swirl.position.set(0, star_center_y, 0.0755);
  gemstone_facets.add(right_swirl);

  const gemstone_specklesGeom = new THREE.CircleGeometry(0.009, 10);
  const gemstone_speckles = new THREE.InstancedMesh(
    gemstone_specklesGeom,
    gemstone_highlightMat,
    18
  );
  gemstone_speckles.name = "gemstone_speckles";

  const speckle_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.09 + (i % 5) * 0.065;
    const scale = 0.65 + (i % 4) * 0.22;
    speckle_dummy.position.set(
      Math.cos(angle) * radius,
      star_center_y + Math.sin(angle) * radius,
      0.077
    );
    speckle_dummy.rotation.set(0, 0, 0);
    speckle_dummy.scale.set(scale, scale, 1);
    speckle_dummy.updateMatrix();
    gemstone_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  gemstone_speckles.instanceMatrix.needsUpdate = true;
  gemstone_facets.add(gemstone_speckles);

  const gemstone_dark_specklesGeom = new THREE.CircleGeometry(0.008, 10);
  const gemstone_dark_speckles = new THREE.InstancedMesh(
    gemstone_dark_specklesGeom,
    gemstone_deepMat,
    9
  );
  gemstone_dark_speckles.name = "gemstone_dark_speckles";

  const dark_speckle_dummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    const angle = 0.7 + i * 2.15;
    const radius = 0.13 + (i % 4) * 0.075;
    const scale = 0.55 + (i % 3) * 0.25;
    dark_speckle_dummy.position.set(
      Math.cos(angle) * radius,
      star_center_y + Math.sin(angle) * radius,
      0.0775
    );
    dark_speckle_dummy.rotation.set(0, 0, 0);
    dark_speckle_dummy.scale.set(scale, scale, 1);
    dark_speckle_dummy.updateMatrix();
    gemstone_dark_speckles.setMatrixAt(
      i,
      dark_speckle_dummy.matrix
    );
  }
  gemstone_dark_speckles.instanceMatrix.needsUpdate = true;
  gemstone_facets.add(gemstone_dark_speckles);

  const gemstone_center_y = star_center_y - 0.02;

  const gemstone_center_haloGeom = new THREE.CircleGeometry(
    0.115,
    28
  );
  const gemstone_center_halo = new THREE.Mesh(
    gemstone_center_haloGeom,
    gemstone_haloMat
  );
  gemstone_center_halo.name = "gemstone_center_halo";
  gemstone_center_halo.position.set(
    0,
    gemstone_center_y,
    0.079
  );
  gemstone_facets.add(gemstone_center_halo);

  const gemstone_center_glowGeom = new THREE.CircleGeometry(
    0.068,
    24
  );
  const gemstone_center_glow = new THREE.Mesh(
    gemstone_center_glowGeom,
    gemstone_glowMat
  );
  gemstone_center_glow.name = "gemstone_center_glow";
  gemstone_center_glow.position.set(
    0,
    gemstone_center_y,
    0.080
  );
  gemstone_facets.add(gemstone_center_glow);

  const gemstone_center_flashGeom = new THREE.CircleGeometry(
    0.029,
    20
  );
  const gemstone_center_flash = new THREE.Mesh(
    gemstone_center_flashGeom,
    gemstone_white_glowMat
  );
  gemstone_center_flash.name = "gemstone_center_flash";
  gemstone_center_flash.position.set(
    0,
    gemstone_center_y,
    0.081
  );
  gemstone_facets.add(gemstone_center_flash);

  const gemstone_center_raysGeom = new THREE.PlaneGeometry(
    0.012,
    0.18
  );
  const gemstone_center_rays = new THREE.InstancedMesh(
    gemstone_center_raysGeom,
    gemstone_glowMat,
    8
  );
  gemstone_center_rays.name = "gemstone_center_rays";

  const ray_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const length_scale = 0.72 + (i % 3) * 0.18;
    ray_dummy.position.set(
      Math.cos(angle) * 0.09,
      gemstone_center_y + Math.sin(angle) * 0.09,
      0.0805
    );
    ray_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    ray_dummy.scale.set(0.75, length_scale, 1);
    ray_dummy.updateMatrix();
    gemstone_center_rays.setMatrixAt(i, ray_dummy.matrix);
  }
  gemstone_center_rays.instanceMatrix.needsUpdate = true;
  gemstone_facets.add(gemstone_center_rays);

  const jump_ringGeom = new THREE.TorusGeometry(
    0.065,
    0.011,
    10,
    28
  );
  const jump_ring = new THREE.Mesh(
    jump_ringGeom,
    polished_silverMat
  );
  jump_ring.name = "jump_ring";
  jump_ring.position.set(0, 0.37, 0.035);
  pendant_group.add(jump_ring);

  const bailShape = new THREE.Shape();
  bailShape.moveTo(-0.045, 0);
  bailShape.lineTo(-0.095, 0.31);
  bailShape.lineTo(0.095, 0.31);
  bailShape.lineTo(0.045, 0);
  bailShape.closePath();

  const bailGeom = new THREE.ExtrudeGeometry(bailShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 3,
  });
  const bail = new THREE.Mesh(bailGeom, polished_silverMat);
  bail.name = "bail";
  bail.position.set(0, 0.40, 0.05);
  pendant_group.add(bail);

  const bail_highlightGeom = new THREE.BoxGeometry(
    0.018,
    0.22,
    0.006
  );
  const bail_highlight = new THREE.Mesh(
    bail_highlightGeom,
    polished_silverMat
  );
  bail_highlight.name = "bail_highlight";
  bail_highlight.position.set(-0.025, 0.56, 0.094);
  bail_highlight.rotation.z = -0.08;
  pendant_group.add(bail_highlight);

  const chain_linksGeom = new THREE.TorusGeometry(
    0.034,
    0.0065,
    8,
    20
  );
  const chain_links = new THREE.InstancedMesh(
    chain_linksGeom,
    polished_silverMat,
    32
  );
  chain_links.name = "chain_links";

  const chain_dummy = new THREE.Object3D();
  const local_up = new THREE.Vector3(0, 1, 0);
  let chain_index = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < 16; i++) {
      const t = (i + 0.25) / 16;
      const x = side * (0.075 + 0.49 * t);
      const y = 0.69 + 0.78 * t + 0.04 * t * t;
      const dx = side * 0.49;
      const dy = 0.78 + 0.08 * t;
      const tangent = new THREE.Vector3(dx, dy, 0).normalize();
      const align_quaternion = new THREE.Quaternion().setFromUnitVectors(
        local_up,
        tangent
      );
      const twist =
        (i + (side < 0 ? 1 : 0)) % 2 === 0 ? 0.72 : -0.72;
      const twist_quaternion = new THREE.Quaternion().setFromAxisAngle(
        tangent,
        twist
      );

      chain_dummy.position.set(x, y, 0.018);
      chain_dummy.quaternion
        .copy(twist_quaternion)
        .multiply(align_quaternion);
      chain_dummy.scale.set(0.72, 1.25, 1);
      chain_dummy.updateMatrix();
      chain_links.setMatrixAt(chain_index, chain_dummy.matrix);
      chain_index++;
    }
  }

  chain_links.instanceMatrix.needsUpdate = true;
  chain_group.add(chain_links);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, rootObject) {
    const box = new THREE.Box3().setFromObject(rootObject);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    rootObject.scale.setScalar(scale);
    rootObject.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}