export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "jeweled_silver_bar";

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const white_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_silverMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_recessMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const gemstoneMat = new THREE.MeshStandardMaterial({
    color: 0xf8fbff,
    metalness: 0.0,
    roughness: 0.16,
    flatShading: true,
  });
  const gemstone_facetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  function roundedRectHole(width, height, radius) {
    const path = new THREE.Path();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    path.moveTo(x0 + radius, y0);
    path.quadraticCurveTo(x0, y0, x0, y0 + radius);
    path.lineTo(x0, y1 - radius);
    path.quadraticCurveTo(x0, y1, x0 + radius, y1);
    path.lineTo(x1 - radius, y1);
    path.quadraticCurveTo(x1, y1, x1, y1 - radius);
    path.lineTo(x1, y0 + radius);
    path.quadraticCurveTo(x1, y0, x1 - radius, y0);
    path.lineTo(x0 + radius, y0);
    path.closePath();
    return path;
  }

  function roundedPlateGeometry(width, height, radius, depth, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function roundedRingGeometry(
    outerWidth,
    outerHeight,
    outerRadius,
    innerWidth,
    innerHeight,
    innerRadius,
    depth,
    bevel
  ) {
    const shape = roundedRectShape(outerWidth, outerHeight, outerRadius);
    shape.holes.push(roundedRectHole(innerWidth, innerHeight, innerRadius));
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function createGemstoneFacets() {
    const positions = [];
    const colors = [];
    const palette = [
      [1.00, 1.00, 1.00],
      [0.70, 0.76, 0.84],
      [0.92, 0.96, 1.00],
      [0.54, 0.62, 0.73],
      [0.82, 0.87, 0.94],
      [1.00, 0.98, 0.88],
    ];
    const segments = 16;
    const innerRadius = 0.43;
    const outerRadius = 0.82;

    function point(radius, angle, z) {
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z,
      ];
    }

    function addTriangle(a, b, c, paletteIndex) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      const color = palette[paletteIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color[0], color[1], color[2]);
      }
    }

    for (let i = 0; i < segments; i++) {
      const angle0 = i / segments * Math.PI * 2;
      const angle1 = (i + 1) / segments * Math.PI * 2;
      const innerZ0 = i % 2 === 0 ? 0.18 : 0.145;
      const innerZ1 = i % 2 === 0 ? 0.145 : 0.18;
      const inner0 = point(innerRadius, angle0, innerZ0);
      const inner1 = point(innerRadius, angle1, innerZ1);
      const outer0 = point(outerRadius, angle0, 0.025);
      const outer1 = point(outerRadius, angle1, 0.025);
      const center = [0, 0, 0.225];

      addTriangle(center, inner0, inner1, i + 2);
      addTriangle(inner0, outer0, outer1, i * 3 + 1);
      addTriangle(inner0, outer1, inner1, i * 5 + 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const main_bodyGeom = roundedPlateGeometry(0.66, 3.45, 0.29, 0.24, 0.045);
  const main_body = new THREE.Mesh(main_bodyGeom, polished_silverMat);
  main_body.name = "main_body";
  body_group.add(main_body);

  const top_recessGeom = roundedPlateGeometry(0.50, 3.00, 0.18, 0.012, 0.005);
  const top_recess = new THREE.Mesh(top_recessGeom, dark_recessMat);
  top_recess.name = "top_recess";
  top_recess.position.z = 0.174;
  body_group.add(top_recess);

  const top_panelGeom = roundedPlateGeometry(0.44, 2.86, 0.145, 0.012, 0.005);
  const top_panel = new THREE.Mesh(top_panelGeom, brushed_silverMat);
  top_panel.name = "top_panel";
  top_panel.position.z = 0.187;
  body_group.add(top_panel);

  const top_bezelGeom = roundedRingGeometry(
    0.51, 3.01, 0.185,
    0.45, 2.91, 0.15,
    0.016, 0.004
  );
  const top_bezel = new THREE.Mesh(top_bezelGeom, polished_silverMat);
  top_bezel.name = "top_bezel";
  top_bezel.position.z = 0.197;
  body_group.add(top_bezel);

  const side_seamGeom = new THREE.BoxGeometry(0.012, 2.72, 0.016);
  const side_seams = new THREE.InstancedMesh(side_seamGeom, dark_recessMat, 2);
  side_seams.name = "side_seams";
  const side_seam_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    side_seam_dummy.position.set(i === 0 ? -0.334 : 0.334, 0, 0.132);
    side_seam_dummy.updateMatrix();
    side_seams.setMatrixAt(i, side_seam_dummy.matrix);
  }
  side_seams.instanceMatrix.needsUpdate = true;
  body_group.add(side_seams);

  const end_holeGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.018, 20);
  const end_holes = new THREE.InstancedMesh(end_holeGeom, dark_recessMat, 2);
  end_holes.name = "end_holes";
  const end_hole_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    end_hole_dummy.position.set(0, i === 0 ? -1.776 : 1.776, -0.01);
    end_hole_dummy.updateMatrix();
    end_holes.setMatrixAt(i, end_hole_dummy.matrix);
  }
  end_holes.instanceMatrix.needsUpdate = true;
  body_group.add(end_holes);

  const end_hole_rimGeom = new THREE.TorusGeometry(0.055, 0.009, 8, 24);
  const end_hole_rims = new THREE.InstancedMesh(
    end_hole_rimGeom,
    polished_silverMat,
    2
  );
  end_hole_rims.name = "end_hole_rims";
  const end_rim_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    end_rim_dummy.position.set(0, i === 0 ? -1.787 : 1.787, -0.01);
    end_rim_dummy.rotation.set(Math.PI / 2, 0, 0);
    end_rim_dummy.updateMatrix();
    end_hole_rims.setMatrixAt(i, end_rim_dummy.matrix);
  }
  end_hole_rims.instanceMatrix.needsUpdate = true;
  body_group.add(end_hole_rims);

  const jewel_group = new THREE.Group();
  jewel_group.name = "jewel_group";
  root.add(jewel_group);

  const large_stone_positions = [-0.99, -0.33, 0.33, 0.99];

  const large_stone_settingGeom = new THREE.CylinderGeometry(
    0.215, 0.215, 0.026, 24
  );
  const large_stone_settings = new THREE.InstancedMesh(
    large_stone_settingGeom,
    white_metalMat,
    large_stone_positions.length
  );
  large_stone_settings.name = "large_stone_settings";

  const setting_dummy = new THREE.Object3D();
  for (let i = 0; i < large_stone_positions.length; i++) {
    setting_dummy.position.set(0, large_stone_positions[i], 0.211);
    setting_dummy.rotation.set(Math.PI / 2, 0, 0);
    setting_dummy.updateMatrix();
    large_stone_settings.setMatrixAt(i, setting_dummy.matrix);
  }
  large_stone_settings.instanceMatrix.needsUpdate = true;
  jewel_group.add(large_stone_settings);

  const large_stone_crownGeom = new THREE.CylinderGeometry(
    0.145, 0.195, 0.052, 16
  );
  const large_stone_crowns = new THREE.InstancedMesh(
    large_stone_crownGeom,
    gemstoneMat,
    large_stone_positions.length
  );
  large_stone_crowns.name = "large_stone_crowns";

  const crown_dummy = new THREE.Object3D();
  for (let i = 0; i < large_stone_positions.length; i++) {
    crown_dummy.position.set(0, large_stone_positions[i], 0.247);
    crown_dummy.rotation.set(Math.PI / 2, 0, 0);
    crown_dummy.updateMatrix();
    large_stone_crowns.setMatrixAt(i, crown_dummy.matrix);
  }
  large_stone_crowns.instanceMatrix.needsUpdate = true;
  jewel_group.add(large_stone_crowns);

  const large_stone_facetGeom = createGemstoneFacets();
  const large_stone_facets = new THREE.InstancedMesh(
    large_stone_facetGeom,
    gemstone_facetMat,
    large_stone_positions.length
  );
  large_stone_facets.name = "large_stone_facets";

  const facet_dummy = new THREE.Object3D();
  for (let i = 0; i < large_stone_positions.length; i++) {
    facet_dummy.position.set(0, large_stone_positions[i], 0.274);
    facet_dummy.rotation.set(0, 0, i * Math.PI / 16);
    facet_dummy.scale.set(0.19, 0.19, 0.19);
    facet_dummy.updateMatrix();
    large_stone_facets.setMatrixAt(i, facet_dummy.matrix);
  }
  large_stone_facets.instanceMatrix.needsUpdate = true;
  jewel_group.add(large_stone_facets);

  const large_stone_prongGeom = new THREE.SphereGeometry(0.026, 12, 8);
  const large_stone_prongs = new THREE.InstancedMesh(
    large_stone_prongGeom,
    polished_silverMat,
    large_stone_positions.length * 4
  );
  large_stone_prongs.name = "large_stone_prongs";

  const large_prong_dummy = new THREE.Object3D();
  let large_prong_index = 0;
  for (let i = 0; i < large_stone_positions.length; i++) {
    for (let j = 0; j < 4; j++) {
      const angle = Math.PI / 4 + j * Math.PI / 2;
      large_prong_dummy.position.set(
        Math.cos(angle) * 0.174,
        large_stone_positions[i] + Math.sin(angle) * 0.174,
        0.273
      );
      large_prong_dummy.rotation.set(0, 0, 0);
      large_prong_dummy.scale.set(1, 1, 1);
      large_prong_dummy.updateMatrix();
      large_stone_prongs.setMatrixAt(
        large_prong_index++,
        large_prong_dummy.matrix
      );
    }
  }
  large_stone_prongs.instanceMatrix.needsUpdate = true;
  jewel_group.add(large_stone_prongs);

  const small_stone_positions = [-1.32, -0.66, 0, 0.66, 1.32];

  const small_stone_settingGeom = new THREE.CylinderGeometry(
    0.086, 0.086, 0.022, 18
  );
  const small_stone_settings = new THREE.InstancedMesh(
    small_stone_settingGeom,
    white_metalMat,
    small_stone_positions.length
  );
  small_stone_settings.name = "small_stone_settings";

  const small_setting_dummy = new THREE.Object3D();
  for (let i = 0; i < small_stone_positions.length; i++) {
    small_setting_dummy.position.set(0, small_stone_positions[i], 0.211);
    small_setting_dummy.rotation.set(Math.PI / 2, 0, 0);
    small_setting_dummy.updateMatrix();
    small_stone_settings.setMatrixAt(i, small_setting_dummy.matrix);
  }
  small_stone_settings.instanceMatrix.needsUpdate = true;
  jewel_group.add(small_stone_settings);

  const small_stone_crownGeom = new THREE.CylinderGeometry(
    0.052, 0.073, 0.038, 12
  );
  const small_stone_crowns = new THREE.InstancedMesh(
    small_stone_crownGeom,
    gemstoneMat,
    small_stone_positions.length
  );
  small_stone_crowns.name = "small_stone_crowns";

  const small_crown_dummy = new THREE.Object3D();
  for (let i = 0; i < small_stone_positions.length; i++) {
    small_crown_dummy.position.set(0, small_stone_positions[i], 0.244);
    small_crown_dummy.rotation.set(Math.PI / 2, 0, 0);
    small_crown_dummy.updateMatrix();
    small_stone_crowns.setMatrixAt(i, small_crown_dummy.matrix);
  }
  small_stone_crowns.instanceMatrix.needsUpdate = true;
  jewel_group.add(small_stone_crowns);

  const small_stone_facets = new THREE.InstancedMesh(
    large_stone_facetGeom,
    gemstone_facetMat,
    small_stone_positions.length
  );
  small_stone_facets.name = "small_stone_facets";

  const small_facet_dummy = new THREE.Object3D();
  for (let i = 0; i < small_stone_positions.length; i++) {
    small_facet_dummy.position.set(0, small_stone_positions[i], 0.263);
    small_facet_dummy.rotation.set(0, 0, (i + 2) * Math.PI / 16);
    small_facet_dummy.scale.set(0.073, 0.073, 0.073);
    small_facet_dummy.updateMatrix();
    small_stone_facets.setMatrixAt(i, small_facet_dummy.matrix);
  }
  small_stone_facets.instanceMatrix.needsUpdate = true;
  jewel_group.add(small_stone_facets);

  const small_stone_prongGeom = new THREE.SphereGeometry(0.014, 10, 7);
  const small_stone_prongs = new THREE.InstancedMesh(
    small_stone_prongGeom,
    polished_silverMat,
    small_stone_positions.length * 3
  );
  small_stone_prongs.name = "small_stone_prongs";

  const small_prong_dummy = new THREE.Object3D();
  let small_prong_index = 0;
  for (let i = 0; i < small_stone_positions.length; i++) {
    for (let j = 0; j < 3; j++) {
      const angle = Math.PI / 6 + j * Math.PI * 2 / 3;
      small_prong_dummy.position.set(
        Math.cos(angle) * 0.066,
        small_stone_positions[i] + Math.sin(angle) * 0.066,
        0.263
      );
      small_prong_dummy.rotation.set(0, 0, 0);
      small_prong_dummy.scale.set(1, 1, 1);
      small_prong_dummy.updateMatrix();
      small_stone_prongs.setMatrixAt(
        small_prong_index++,
        small_prong_dummy.matrix
      );
    }
  }
  small_stone_prongs.instanceMatrix.needsUpdate = true;
  jewel_group.add(small_stone_prongs);

  const pave_stoneGeom = new THREE.OctahedronGeometry(0.018, 0);
  const pave_stones = new THREE.InstancedMesh(
    pave_stoneGeom,
    gemstoneMat,
    28
  );
  pave_stones.name = "pave_stones";

  const pave_dummy = new THREE.Object3D();
  let pave_index = 0;
  for (let row = 0; row < 14; row++) {
    const y = -1.245 + row * 2.49 / 13;
    for (let side = 0; side < 2; side++) {
      const offset = row % 2 === 0 ? 0.01 : -0.01;
      const x = side === 0 ? -0.178 + offset : 0.178 - offset;
      pave_dummy.position.set(x, y, 0.219);
      pave_dummy.rotation.set(0, 0, Math.PI / 4);
      pave_dummy.scale.set(0.72, 0.72, 0.42);
      pave_dummy.updateMatrix();
      pave_stones.setMatrixAt(pave_index++, pave_dummy.matrix);
    }
  }
  pave_stones.instanceMatrix.needsUpdate = true;
  jewel_group.add(pave_stones);

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