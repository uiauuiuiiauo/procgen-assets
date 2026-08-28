export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_jewelry_box";

  const boxW = 3.2;
  const boxD = 2.75;
  const bodyBottom = 0.3;
  const bodyTop = 1.53;
  const bodyH = bodyTop - bodyBottom;
  const panelBottom = 0.4;
  const panelTop = 1.43;
  const panelH = panelTop - panelBottom;
  const frontSurfaceZ = 1.36;
  const sideSurfaceX = 1.58;
  const topSurfaceY = 1.955;

  const antique_goldMat = new THREE.MeshStandardMaterial({
    color: 0xb38a4b,
    metalness: 0.6,
    roughness: 0.32
  });
  const relief_goldMat = new THREE.MeshStandardMaterial({
    color: 0xc8a35d,
    metalness: 0.55,
    roughness: 0.28,
    side: THREE.DoubleSide
  });
  const recessed_bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x4b3822,
    metalness: 0.45,
    roughness: 0.55
  });
  const seam_blackMat = new THREE.MeshStandardMaterial({
    color: 0x17120d,
    metalness: 0.0,
    roughness: 0.8
  });
  const pearl_panelMat = new THREE.MeshStandardMaterial({
    color: 0xeadde2,
    metalness: 0.0,
    roughness: 0.4
  });
  const cyan_pearlMat = new THREE.MeshStandardMaterial({
    color: 0xb9dfd8,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide
  });
  const pink_pearlMat = new THREE.MeshStandardMaterial({
    color: 0xe6c3d5,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.52,
    side: THREE.DoubleSide
  });
  const lavender_pearlMat = new THREE.MeshStandardMaterial({
    color: 0xcfc9e8,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide
  });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
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

  function roundedSlabGeometry(w, d, h, r, bevel) {
    return new THREE.ExtrudeGeometry(roundedRectShape(w, d, r), {
      depth: h,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
  }

  function roundedRectPoints(w, d, r, y) {
    const points = [];
    const corners = [
      [w / 2 - r, d / 2 - r, 0],
      [-w / 2 + r, d / 2 - r, Math.PI / 2],
      [-w / 2 + r, -d / 2 + r, Math.PI],
      [w / 2 - r, -d / 2 + r, Math.PI * 1.5]
    ];
    for (const corner of corners) {
      for (let i = 0; i <= 4; i++) {
        const a = corner[2] + i * Math.PI / 8;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(a) * r,
          y,
          corner[1] + Math.sin(a) * r
        ));
      }
    }
    return points;
  }

  function makeRoundedTube(w, d, r, y, radius, material) {
    const curve = new THREE.CatmullRomCurve3(
      roundedRectPoints(w, d, r, y),
      true,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 72, radius, 8, true),
      material
    );
  }

  function makeSurfaceTube(points, radius, material, segments = 24) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 7, false),
      material
    );
  }

  function addInstanced(mesh, matrices) {
    for (let i = 0; i < matrices.length; i++) {
      mesh.setMatrixAt(i, matrices[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    root.add(mesh);
  }

  function reliefMatrix(x, y, z, nx, ny, nz, sx, sy, sz, angle = 0) {
    const normal = new THREE.Vector3(nx, ny, nz).normalize();
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    if (angle !== 0) {
      orientation.multiply(
        new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 0, 1),
          angle
        )
      );
    }
    return new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      orientation,
      new THREE.Vector3(sx, sy, sz)
    );
  }

  const box_feetGeom = new THREE.SphereGeometry(1, 18, 10);
  const box_feetMatrices = [];
  for (const x of [-1.39, 1.39]) {
    for (const z of [-1.12, 1.12]) {
      box_feetMatrices.push(
        new THREE.Matrix4().compose(
          new THREE.Vector3(x, 0.08, z),
          new THREE.Quaternion(),
          new THREE.Vector3(0.19, 0.1, 0.18)
        )
      );
    }
  }
  const box_feet = new THREE.InstancedMesh(
    box_feetGeom,
    antique_goldMat,
    box_feetMatrices.length
  );
  box_feet.name = "box_feet";
  addInstanced(box_feet, box_feetMatrices);

  const lower_plinthGeom = roundedSlabGeometry(3.55, 3.05, 0.18, 0.15, 0.025);
  const lower_plinth = new THREE.Mesh(lower_plinthGeom, antique_goldMat);
  lower_plinth.name = "lower_plinth";
  lower_plinth.rotation.x = Math.PI / 2;
  lower_plinth.position.y = 0.31;
  root.add(lower_plinth);

  const lower_frame_railGeom = roundedSlabGeometry(3.43, 2.93, 0.14, 0.12, 0.018);
  const lower_frame_rail = new THREE.Mesh(lower_frame_railGeom, antique_goldMat);
  lower_frame_rail.name = "lower_frame_rail";
  lower_frame_rail.rotation.x = Math.PI / 2;
  lower_frame_rail.position.y = 0.42;
  root.add(lower_frame_rail);

  const body_coreGeom = new THREE.BoxGeometry(boxW, bodyH, boxD);
  const body_core = new THREE.Mesh(body_coreGeom, antique_goldMat);
  body_core.name = "body_core";
  body_core.position.y = bodyBottom + bodyH / 2;
  root.add(body_core);

  const front_pearl_panelGeom = new THREE.BoxGeometry(3.02, panelH, 0.035);
  const front_pearl_panel = new THREE.Mesh(front_pearl_panelGeom, pearl_panelMat);
  front_pearl_panel.name = "front_pearl_panel";
  front_pearl_panel.position.set(0, panelBottom + panelH / 2, 1.34);
  root.add(front_pearl_panel);

  const back_pearl_panel = new THREE.Mesh(front_pearl_panelGeom, pearl_panelMat);
  back_pearl_panel.name = "back_pearl_panel";
  back_pearl_panel.position.set(0, panelBottom + panelH / 2, -1.34);
  root.add(back_pearl_panel);

  const side_pearl_panelGeom = new THREE.BoxGeometry(0.035, panelH, 2.55);
  const right_pearl_panel = new THREE.Mesh(side_pearl_panelGeom, pearl_panelMat);
  right_pearl_panel.name = "right_pearl_panel";
  right_pearl_panel.position.set(1.56, panelBottom + panelH / 2, 0);
  root.add(right_pearl_panel);

  const left_pearl_panel = new THREE.Mesh(side_pearl_panelGeom, pearl_panelMat);
  left_pearl_panel.name = "left_pearl_panel";
  left_pearl_panel.position.set(-1.56, panelBottom + panelH / 2, 0);
  root.add(left_pearl_panel);

  const corner_postsGeom = new THREE.CylinderGeometry(0.09, 0.09, 1.17, 16);
  const corner_postsMatrices = [];
  for (const x of [-1.56, 1.56]) {
    for (const z of [-1.29, 1.29]) {
      corner_postsMatrices.push(
        new THREE.Matrix4().makeTranslation(x, 0.91, z)
      );
    }
  }
  const corner_posts = new THREE.InstancedMesh(
    corner_postsGeom,
    antique_goldMat,
    corner_postsMatrices.length
  );
  corner_posts.name = "corner_posts";
  addInstanced(corner_posts, corner_postsMatrices);

  const corner_post_capsGeom = new THREE.SphereGeometry(0.11, 14, 8);
  const corner_post_capsMatrices = [];
  for (const x of [-1.56, 1.56]) {
    for (const z of [-1.29, 1.29]) {
      for (const y of [0.34, 1.49]) {
        corner_post_capsMatrices.push(
          new THREE.Matrix4().compose(
            new THREE.Vector3(x, y, z),
            new THREE.Quaternion(),
            new THREE.Vector3(1, 0.72, 1)
          )
        );
      }
    }
  }
  const corner_post_caps = new THREE.InstancedMesh(
    corner_post_capsGeom,
    relief_goldMat,
    corner_post_capsMatrices.length
  );
  corner_post_caps.name = "corner_post_caps";
  addInstanced(corner_post_caps, corner_post_capsMatrices);

  const front_back_upper_railsGeom = new THREE.BoxGeometry(3.28, 0.12, 0.11);
  const front_back_upper_railsMatrices = [
    new THREE.Matrix4().makeTranslation(0, 1.48, 1.39),
    new THREE.Matrix4().makeTranslation(0, 1.48, -1.39)
  ];
  const front_back_upper_rails = new THREE.InstancedMesh(
    front_back_upper_railsGeom,
    antique_goldMat,
    2
  );
  front_back_upper_rails.name = "front_back_upper_rails";
  addInstanced(front_back_upper_rails, front_back_upper_railsMatrices);

  const side_upper_railsGeom = new THREE.BoxGeometry(0.11, 0.12, 2.68);
  const side_upper_railsMatrices = [
    new THREE.Matrix4().makeTranslation(1.61, 1.48, 0),
    new THREE.Matrix4().makeTranslation(-1.61, 1.48, 0)
  ];
  const side_upper_rails = new THREE.InstancedMesh(
    side_upper_railsGeom,
    antique_goldMat,
    2
  );
  side_upper_rails.name = "side_upper_rails";
  addInstanced(side_upper_rails, side_upper_railsMatrices);

  const front_back_lower_trimGeom = new THREE.BoxGeometry(3.36, 0.055, 0.075);
  const front_back_lower_trimMatrices = [
    new THREE.Matrix4().makeTranslation(0, 0.43, 1.43),
    new THREE.Matrix4().makeTranslation(0, 0.43, -1.43)
  ];
  const front_back_lower_trim = new THREE.InstancedMesh(
    front_back_lower_trimGeom,
    relief_goldMat,
    2
  );
  front_back_lower_trim.name = "front_back_lower_trim";
  addInstanced(front_back_lower_trim, front_back_lower_trimMatrices);

  const side_lower_trimGeom = new THREE.BoxGeometry(0.075, 0.055, 2.83);
  const side_lower_trimMatrices = [
    new THREE.Matrix4().makeTranslation(1.64, 0.43, 0),
    new THREE.Matrix4().makeTranslation(-1.64, 0.43, 0)
  ];
  const side_lower_trim = new THREE.InstancedMesh(
    side_lower_trimGeom,
    relief_goldMat,
    2
  );
  side_lower_trim.name = "side_lower_trim";
  addInstanced(side_lower_trim, side_lower_trimMatrices);

  const lower_front_grooveGeom = new THREE.BoxGeometry(3.25, 0.025, 0.025);
  const lower_front_groove = new THREE.Mesh(lower_front_grooveGeom, recessed_bronzeMat);
  lower_front_groove.name = "lower_front_groove";
  lower_front_groove.position.set(0, 0.33, 1.535);
  root.add(lower_front_groove);

  const lower_right_grooveGeom = new THREE.BoxGeometry(0.025, 0.025, 2.78);
  const lower_right_groove = new THREE.Mesh(lower_right_grooveGeom, recessed_bronzeMat);
  lower_right_groove.name = "lower_right_groove";
  lower_right_groove.position.set(1.755, 0.33, 0);
  root.add(lower_right_groove);

  const lower_trim_beadGeom = new THREE.BoxGeometry(0.085, 0.075, 0.035);
  const lower_trim_beadMatrices = [];
  for (let i = 0; i < 27; i++) {
    const x = -1.48 + i * 2.96 / 26;
    lower_trim_beadMatrices.push(
      reliefMatrix(x, 0.33, 1.555, 0, 0, 1, 1, 1, 1, i % 2 ? 0.32 : -0.32)
    );
    reliefMatrix(-x, 0.33, -1.555, 0, 0, -1, 1, 1, 1, i % 2 ? -0.32 : 0.32);
  }
  for (let i = 0; i < 22; i++) {
    const z = -1.19 + i * 2.38 / 21;
    lower_trim_beadMatrices.push(
      reliefMatrix(1.775, 0.33, z, 1, 0, 0, 1, 1, 1, Math.PI / 2 + (i % 2 ? 0.32 : -0.32))
    );
    reliefMatrix(-1.775, 0.33, -z, -1, 0, 0, 1, 1, 1, Math.PI / 2 + (i % 2 ? -0.32 : 0.32));
  }
  const lower_trim_beads = new THREE.InstancedMesh(
    lower_trim_beadGeom,
    recessed_bronzeMat,
    lower_trim_beadMatrices.length
  );
  lower_trim_beads.name = "lower_trim_beads";
  addInstanced(lower_trim_beads, lower_trim_beadMatrices);

  const lid_seam_frontGeom = new THREE.BoxGeometry(3.31, 0.045, 0.035);
  const lid_seam_front = new THREE.Mesh(lid_seam_frontGeom, seam_blackMat);
  lid_seam_front.name = "lid_seam_front";
  lid_seam_front.position.set(0, 1.555, 1.43);
  root.add(lid_seam_front);

  const lid_seam_rightGeom = new THREE.BoxGeometry(0.035, 0.045, 2.79);
  const lid_seam_right = new THREE.Mesh(lid_seam_rightGeom, seam_blackMat);
  lid_seam_right.name = "lid_seam_right";
  lid_seam_right.position.set(1.65, 1.555, 0);
  root.add(lid_seam_right);

  const lid_lower_slabGeom = roundedSlabGeometry(3.55, 3.03, 0.17, 0.15, 0.025);
  const lid_lower_slab = new THREE.Mesh(lid_lower_slabGeom, antique_goldMat);
  lid_lower_slab.name = "lid_lower_slab";
  lid_lower_slab.rotation.x = Math.PI / 2;
  lid_lower_slab.position.y = 1.69;
  root.add(lid_lower_slab);

  const lid_upper_slabGeom = roundedSlabGeometry(3.68, 3.16, 0.19, 0.17, 0.028);
  const lid_upper_slab = new THREE.Mesh(lid_upper_slabGeom, antique_goldMat);
  lid_upper_slab.name = "lid_upper_slab";
  lid_upper_slab.rotation.x = Math.PI / 2;
  lid_upper_slab.position.y = 1.87;
  root.add(lid_upper_slab);

  const lid_pearl_insetGeom = roundedSlabGeometry(3.27, 2.75, 0.055, 0.12, 0.012);
  const lid_pearl_inset = new THREE.Mesh(lid_pearl_insetGeom, pearl_panelMat);
  lid_pearl_inset.name = "lid_pearl_inset";
  lid_pearl_inset.rotation.x = Math.PI / 2;
  lid_pearl_inset.position.y = 1.94;
  root.add(lid_pearl_inset);

  const lid_outer_rim = makeRoundedTube(3.58, 3.06, 0.16, 1.895, 0.055, antique_goldMat);
  lid_outer_rim.name = "lid_outer_rim";
  root.add(lid_outer_rim);

  const lid_inner_rim = makeRoundedTube(3.31, 2.79, 0.13, 1.963, 0.035, relief_goldMat);
  lid_inner_rim.name = "lid_inner_rim";
  root.add(lid_inner_rim);

  const lid_lower_rim = makeRoundedTube(3.51, 2.98, 0.14, 1.7, 0.035, recessed_bronzeMat);
  lid_lower_rim.name = "lid_lower_rim";
  root.add(lid_lower_rim);

  const lid_beadGeom = new THREE.SphereGeometry(1, 12, 8);
  const lid_beadMatrices = [];
  for (let i = 0; i < 26; i++) {
    const x = -1.48 + i * 2.96 / 25;
    lid_beadMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, 1.89, 1.515),
        new THREE.Quaternion(),
        new THREE.Vector3(0.045, 0.035, 0.025)
      )
    );
    lid_beadMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(-x, 1.89, -1.515),
        new THREE.Quaternion(),
        new THREE.Vector3(0.045, 0.035, 0.025)
      )
    );
  }
  for (let i = 0; i < 21; i++) {
    const z = -1.18 + i * 2.36 / 20;
    lid_beadMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(1.755, 1.89, z),
        new THREE.Quaternion(),
        new THREE.Vector3(0.025, 0.035, 0.045)
      )
    );
    lid_beadMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(-1.755, 1.89, -z),
        new THREE.Quaternion(),
        new THREE.Vector3(0.025, 0.035, 0.045)
      )
    );
  }
  const lid_edge_beads = new THREE.InstancedMesh(
    lid_beadGeom,
    relief_goldMat,
    lid_beadMatrices.length
  );
  lid_edge_beads.name = "lid_edge_beads";
  addInstanced(lid_edge_beads, lid_beadMatrices);

  const lid_rosetteGeom = new THREE.TorusGeometry(0.085, 0.018, 8, 18);
  const lid_rosetteMatrices = [];
  for (const x of [-1.47, 1.47]) {
    for (const z of [-1.17, 1.17]) {
      lid_rosetteMatrices.push(
        reliefMatrix(x, 1.976, z, 0, 1, 0, 1, 1, 1, Math.PI / 2)
      );
    }
  }
  const lid_corner_rosettes = new THREE.InstancedMesh(
    lid_rosetteGeom,
    relief_goldMat,
    lid_rosetteMatrices.length
  );
  lid_corner_rosettes.name = "lid_corner_rosettes";
  addInstanced(lid_corner_rosettes, lid_rosetteMatrices);

  const pearl_patchGeom = new THREE.CircleGeometry(1, 28);

  const front_cyan_patch = new THREE.Mesh(pearl_patchGeom, cyan_pearlMat);
  front_cyan_patch.name = "front_cyan_patch";
  front_cyan_patch.position.set(-0.62, 0.94, frontSurfaceZ + 0.004);
  front_cyan_patch.scale.set(0.5, 0.26, 1);
  root.add(front_cyan_patch);

  const front_pink_patch = new THREE.Mesh(pearl_patchGeom, pink_pearlMat);
  front_pink_patch.name = "front_pink_patch";
  front_pink_patch.position.set(0.72, 0.92, frontSurfaceZ + 0.005);
  front_pink_patch.scale.set(0.46, 0.29, 1);
  root.add(front_pink_patch);

  const front_lavender_patch = new THREE.Mesh(pearl_patchGeom, lavender_pearlMat);
  front_lavender_patch.name = "front_lavender_patch";
  front_lavender_patch.position.set(0.08, 0.67, frontSurfaceZ + 0.006);
  front_lavender_patch.scale.set(0.55, 0.2, 1);
  root.add(front_lavender_patch);

  const right_cyan_patch = new THREE.Mesh(pearl_patchGeom, cyan_pearlMat);
  right_cyan_patch.name = "right_cyan_patch";
  right_cyan_patch.position.set(sideSurfaceX + 0.004, 0.96, -0.48);
  right_cyan_patch.rotation.y = Math.PI / 2;
  right_cyan_patch.scale.set(0.45, 0.25, 1);
  root.add(right_cyan_patch);

  const right_pink_patch = new THREE.Mesh(pearl_patchGeom, pink_pearlMat);
  right_pink_patch.name = "right_pink_patch";
  right_pink_patch.position.set(sideSurfaceX + 0.005, 0.82, 0.55);
  right_pink_patch.rotation.y = Math.PI / 2;
  right_pink_patch.scale.set(0.46, 0.28, 1);
  root.add(right_pink_patch);

  const top_cyan_patch = new THREE.Mesh(pearl_patchGeom, cyan_pearlMat);
  top_cyan_patch.name = "top_cyan_patch";
  top_cyan_patch.position.set(-0.62, topSurfaceY, 0.2);
  top_cyan_patch.rotation.x = -Math.PI / 2;
  top_cyan_patch.scale.set(0.58, 0.34, 1);
  root.add(top_cyan_patch);

  const top_pink_patch = new THREE.Mesh(pearl_patchGeom, pink_pearlMat);
  top_pink_patch.name = "top_pink_patch";
  top_pink_patch.position.set(0.72, topSurfaceY + 0.001, -0.25);
  top_pink_patch.rotation.x = -Math.PI / 2;
  top_pink_patch.scale.set(0.52, 0.3, 1);
  root.add(top_pink_patch);

  const top_lavender_patch = new THREE.Mesh(pearl_patchGeom, lavender_pearlMat);
  top_lavender_patch.name = "top_lavender_patch";
  top_lavender_patch.position.set(0.05, topSurfaceY + 0.002, 0.72);
  top_lavender_patch.rotation.x = -Math.PI / 2;
  top_lavender_patch.scale.set(0.5, 0.22, 1);
  root.add(top_lavender_patch);

  const top_outer_border = makeRoundedTube(3.18, 2.66, 0.15, 1.978, 0.025, relief_goldMat);
  top_outer_border.name = "top_outer_border";
  root.add(top_outer_border);

  const top_inner_border = makeRoundedTube(2.96, 2.43, 0.13, 1.98, 0.018, antique_goldMat);
  top_inner_border.name = "top_inner_border";
  root.add(top_inner_border);

  const top_corner_medallionsGeom = new THREE.TorusGeometry(0.23, 0.035, 9, 28);
  const top_corner_medallionsMatrices = [];
  for (const x of [-1.22, 1.22]) {
    for (const z of [-0.96, 0.96]) {
      top_corner_medallionsMatrices.push(
        reliefMatrix(x, 1.997, z, 0, 1, 0, 1, 1, 1, Math.PI / 2)
      );
    }
  }
  const top_corner_medallions = new THREE.InstancedMesh(
    top_corner_medallionsGeom,
    relief_goldMat,
    top_corner_medallionsMatrices.length
  );
  top_corner_medallions.name = "top_corner_medallions";
  addInstanced(top_corner_medallions, top_corner_medallionsMatrices);

  const top_corner_centersGeom = new THREE.SphereGeometry(1, 14, 8);
  const top_corner_centersMatrices = [];
  for (const x of [-1.22, 1.22]) {
    for (const z of [-0.96, 0.96]) {
      top_corner_centersMatrices.push(
        new THREE.Matrix4().compose(
          new THREE.Vector3(x, 2.015, z),
          new THREE.Quaternion(),
          new THREE.Vector3(0.09, 0.025, 0.09)
        )
      );
    }
  }
  const top_corner_centers = new THREE.InstancedMesh(
    top_corner_centersGeom,
    antique_goldMat,
    top_corner_centersMatrices.length
  );
  top_corner_centers.name = "top_corner_centers";
  addInstanced(top_corner_centers, top_corner_centersMatrices);

  const top_front_scroll_left = makeSurfaceTube([
    new THREE.Vector3(-1.0, 1.995, 0.91),
    new THREE.Vector3(-0.82, 1.995, 0.76),
    new THREE.Vector3(-0.58, 1.995, 0.82),
    new THREE.Vector3(-0.47, 1.995, 1.02),
    new THREE.Vector3(-0.27, 1.995, 1.08),
    new THREE.Vector3(-0.13, 1.995, 0.93),
    new THREE.Vector3(-0.27, 1.995, 0.79),
    new THREE.Vector3(-0.48, 1.995, 0.86)
  ], 0.025, relief_goldMat, 34);
  top_front_scroll_left.name = "top_front_scroll_left";
  root.add(top_front_scroll_left);

  const top_front_scroll_right = makeSurfaceTube([
    new THREE.Vector3(1.0, 1.995, 0.91),
    new THREE.Vector3(0.82, 1.995, 0.76),
    new THREE.Vector3(0.58, 1.995, 0.82),
    new THREE.Vector3(0.47, 1.995, 1.02),
    new THREE.Vector3(0.27, 1.995, 1.08),
    new THREE.Vector3(0.13, 1.995, 0.93),
    new THREE.Vector3(0.27, 1.995, 0.79),
    new THREE.Vector3(0.48, 1.995, 0.86)
  ], 0.025, relief_goldMat, 34);
  top_front_scroll_right.name = "top_front_scroll_right";
  root.add(top_front_scroll_right);

  const top_rear_scroll_left = makeSurfaceTube([
    new THREE.Vector3(-1.0, 1.995, -0.91),
    new THREE.Vector3(-0.8, 1.995, -0.75),
    new THREE.Vector3(-0.56, 1.995, -0.82),
    new THREE.Vector3(-0.44, 1.995, -1.03),
    new THREE.Vector3(-0.24, 1.995, -1.07),
    new THREE.Vector3(-0.12, 1.995, -0.91),
    new THREE.Vector3(-0.27, 1.995, -0.77)
  ], 0.024, relief_goldMat, 30);
  top_rear_scroll_left.name = "top_rear_scroll_left";
  root.add(top_rear_scroll_left);

  const top_rear_scroll_right = makeSurfaceTube([
    new THREE.Vector3(1.0, 1.995, -0.91),
    new THREE.Vector3(0.8, 1.995, -0.75),
    new THREE.Vector3(0.56, 1.995, -0.82),
    new THREE.Vector3(0.44, 1.995, -1.03),
    new THREE.Vector3(0.24, 1.995, -1.07),
    new THREE.Vector3(0.12, 1.995, -0.91),
    new THREE.Vector3(0.27, 1.995, -0.77)
  ], 0.024, relief_goldMat, 30);
  top_rear_scroll_right.name = "top_rear_scroll_right";
  root.add(top_rear_scroll_right);

  const top_left_side_scroll = makeSurfaceTube([
    new THREE.Vector3(-1.34, 1.996, -0.67),
    new THREE.Vector3(-1.2, 1.996, -0.48),
    new THREE.Vector3(-1.27, 1.996, -0.27),
    new THREE.Vector3(-1.1, 1.996, -0.1),
    new THREE.Vector3(-1.14, 1.996, 0.12),
    new THREE.Vector3(-1.31, 1.996, 0.27),
    new THREE.Vector3(-1.36, 1.996, 0.48),
    new THREE.Vector3(-1.2, 1.996, 0.68)
  ], 0.024, relief_goldMat, 34);
  top_left_side_scroll.name = "top_left_side_scroll";
  root.add(top_left_side_scroll);

  const top_right_side_scroll = makeSurfaceTube([
    new THREE.Vector3(1.34, 1.996, -0.67),
    new THREE.Vector3(1.2, 1.996, -0.48),
    new THREE.Vector3(1.27, 1.996, -0.27),
    new THREE.Vector3(1.1, 1.996, -0.1),
    new THREE.Vector3(1.14, 1.996, 0.12),
    new THREE.Vector3(1.31, 1.996, 0.27),
    new THREE.Vector3(1.36, 1.996, 0.48),
    new THREE.Vector3(1.2, 1.996, 0.68)
  ], 0.024, relief_goldMat, 34);
  top_right_side_scroll.name = "top_right_side_scroll";
  root.add(top_right_side_scroll);

  const top_scroll_curlGeom = new THREE.TorusGeometry(0.13, 0.024, 8, 22);
  const top_scroll_curlMatrices = [
    reliefMatrix(-0.48, 2.005, 0.86, 0, 1, 0, 1, 1, 1, Math.PI / 2),
    reliefMatrix(0.48, 2.005, 0.86, 0, 1, 0, 1, 1, 1, Math.PI / 2),
    reliefMatrix(-1.26, 2.005, -0.26, 0, 1, 0, 0.85, 0.85, 1, Math.PI / 2),
    reliefMatrix(1.26, 2.005, -0.26, 0, 1, 0, 0.85, 0.85, 1, Math.PI / 2),
    reliefMatrix(-0.25, 2.005, -0.91, 0, 1, 0, 0.8, 0.8, 1, Math.PI / 2),
    reliefMatrix(0.25, 2.005, -0.91, 0, 1, 0, 0.8, 0.8, 1, Math.PI / 2)
  ];
  const top_scroll_curls = new THREE.InstancedMesh(
    top_scroll_curlGeom,
    relief_goldMat,
    top_scroll_curlMatrices.length
  );
  top_scroll_curls.name = "top_scroll_curls";
  addInstanced(top_scroll_curls, top_scroll_curlMatrices);

  const top_leafGeom = new THREE.SphereGeometry(1, 14, 8);
  const topLeafData = [
    [-1.08, -0.78, -0.55, 0.2, 0.08],
    [-0.9, -1.0, -1.0, 0.19, 0.075],
    [-0.66, -0.86, -0.65, 0.18, 0.07],
    [-1.3, -0.45, -0.2, 0.18, 0.07],
    [-1.25, 0.2, 0.15, 0.18, 0.07],
    [-1.15, 0.69, 0.55, 0.2, 0.075],
    [-0.9, 1.0, 1.0, 0.19, 0.08],
    [-0.65, 0.88, 0.65, 0.18, 0.07],
    [1.08, -0.78, 0.55, 0.2, 0.08],
    [0.9, -1.0, 1.0, 0.19, 0.075],
    [0.66, -0.86, 0.65, 0.18, 0.07],
    [1.3, -0.45, 0.2, 0.18, 0.07],
    [1.25, 0.2, -0.15, 0.18, 0.07],
    [1.15, 0.69, -0.55, 0.2, 0.075],
    [0.9, 1.0, -1.0, 0.19, 0.08],
    [0.65, 0.88, -0.65, 0.18, 0.07],
    [-0.78, 0.73, -0.4, 0.16, 0.06],
    [0.78, 0.73, 0.4, 0.16, 0.06],
    [-0.62, -0.72, 0.45, 0.16, 0.06],
    [0.62, -0.72, -0.45, 0.16, 0.06]
  ];
  const top_leafMatrices = [];
  for (const leaf of topLeafData) {
    top_leafMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(leaf[0], 2.012, leaf[1]),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, leaf[2], 0)),
        new THREE.Vector3(leaf[3], 0.026, leaf[4])
      )
    );
  }
  const top_foliate_leaves = new THREE.InstancedMesh(
    top_leafGeom,
    relief_goldMat,
    top_leafMatrices.length
  );
  top_foliate_leaves.name = "top_foliate_leaves";
  addInstanced(top_foliate_leaves, top_leafMatrices);

  const top_beadGeom = new THREE.SphereGeometry(1, 12, 8);
  const top_beadMatrices = [];
  for (let i = 0; i < 13; i++) {
    const x = -1.08 + i * 2.16 / 12;
    top_beadMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, 2.012, 1.08),
        new THREE.Quaternion(),
        new THREE.Vector3(0.035, 0.024, 0.035)
      )
    );
    top_beadMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(-x, 2.012, -1.08),
        new THREE.Quaternion(),
        new THREE.Vector3(0.035, 0.024, 0.035)
      )
    );
  }
  for (let i = 0; i < 9; i++) {
    const z = -0.7 + i * 1.4 / 8;
    top_beadMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(1.4, 2.012, z),
        new THREE.Quaternion(),
        new THREE.Vector3(0.035, 0.024, 0.035)
      )
    );
    top_beadMatrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(-1.4, 2.012, -z),
        new THREE.Quaternion(),
        new THREE.Vector3(0.035, 0.024, 0.035)
      )
    );
  }
  const top_border_beads = new THREE.InstancedMesh(
    top_beadGeom,
    relief_goldMat,
    top_beadMatrices.length
  );
  top_border_beads.name = "top_border_beads";
  addInstanced(top_border_beads, top_beadMatrices);

  const central_dancer_skirtShape = new THREE.Shape();
  central_dancer_skirtShape.moveTo(-0.13, 0.18);
  central_dancer_skirtShape.quadraticCurveTo(-0.22, -0.03, -0.38, -0.3);
  central_dancer_skirtShape.quadraticCurveTo(-0.18, -0.34, -0.07, -0.27);
  central_dancer_skirtShape.quadraticCurveTo(0.0, -0.39, 0.09, -0.27);
  central_dancer_skirtShape.quadraticCurveTo(0.2, -0.34, 0.38, -0.29);
  central_dancer_skirtShape.quadraticCurveTo(0.22, -0.03, 0.13, 0.18);
  central_dancer_skirtShape.closePath();
  const central_dancer_skirtGeom = new THREE.ExtrudeGeometry(
    central_dancer_skirtShape,
    {
      depth: 0.045,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2
    }
  );
  const central_dancer_skirt = new THREE.Mesh(central_dancer_skirtGeom, relief_goldMat);
  central_dancer_skirt.name = "central_dancer_skirt";
  central_dancer_skirt.rotation.x = Math.PI / 2;
  central_dancer_skirt.position.set(0, 2.045, 0.04);
  root.add(central_dancer_skirt);

  const central_dancer_torsoGeom = new THREE.SphereGeometry(1, 18, 10);
  const central_dancer_torso = new THREE.Mesh(central_dancer_torsoGeom, relief_goldMat);
  central_dancer_torso.name = "central_dancer_torso";
  central_dancer_torso.position.set(0, 2.052, -0.04);
  central_dancer_torso.scale.set(0.16, 0.05, 0.27);
  root.add(central_dancer_torso);

  const central_dancer_headGeom = new THREE.SphereGeometry(1, 16, 10);
  const central_dancer_head = new THREE.Mesh(central_dancer_headGeom, relief_goldMat);
  central_dancer_head.name = "central_dancer_head";
  central_dancer_head.position.set(0.02, 2.06, -0.36);
  central_dancer_head.scale.set(0.12, 0.052, 0.13);
  root.add(central_dancer_head);

  const central_dancer_hairGeom = new THREE.SphereGeometry(1, 14, 8);
  const central_dancer_hair = new THREE.Mesh(central_dancer_hairGeom, antique_goldMat);
  central_dancer_hair.name = "central_dancer_hair";
  central_dancer_hair.position.set(-0.035, 2.066, -0.405);
  central_dancer_hair.scale.set(0.13, 0.045, 0.11);
  root.add(central_dancer_hair);

  const central_dancer_beltGeom = new THREE.BoxGeometry(0.3, 0.045, 0.065);
  const central_dancer_belt = new THREE.Mesh(central_dancer_beltGeom, antique_goldMat);
  central_dancer_belt.name = "central_dancer_belt";
  central_dancer_belt.position.set(0, 2.06, 0.15);
  root.add(central_dancer_belt);

  const central_dancer_neckGeom = new THREE.CylinderGeometry(0.055, 0.065, 0.1, 12);
  const central_dancer_neck = new THREE.Mesh(central_dancer_neckGeom, relief_goldMat);
  central_dancer_neck.name = "central_dancer_neck";
  central_dancer_neck.rotation.x = Math.PI / 2;
  central_dancer_neck.position.set(0, 2.055, -0.235);
  root.add(central_dancer_neck);

  function topPoint(x, z) {
    return new THREE.Vector3(x, 2.075, z);
  }

  const central_dancer_left_upper_arm = makeSurfaceTube([
    topPoint(-0.11, -0.12),
    topPoint(-0.34, -0.23),
    topPoint(-0.56, -0.31),
    topPoint(-0.72, -0.48)
  ], 0.043, relief_goldMat);
  central_dancer_left_upper_arm.name = "central_dancer_left_upper_arm";
  root.add(central_dancer_left_upper_arm);

  const central_dancer_left_forearm = makeSurfaceTube([
    topPoint(-0.72, -0.48),
    topPoint(-0.86, -0.55),
    topPoint(-1.0, -0.48),
    topPoint(-1.08, -0.58)
  ], 0.038, relief_goldMat);
  central_dancer_left_forearm.name = "central_dancer_left_forearm";
  root.add(central_dancer_left_forearm);

  const central_dancer_right_upper_arm = makeSurfaceTube([
    topPoint(0.11, -0.12),
    topPoint(0.34, -0.23),
    topPoint(0.56, -0.31),
    topPoint(0.72, -0.48)
  ], 0.043, relief_goldMat);
  central_dancer_right_upper_arm.name = "central_dancer_right_upper_arm";
  root.add(central_dancer_right_upper_arm);

  const central_dancer_right_forearm = makeSurfaceTube([
    topPoint(0.72, -0.48),
    topPoint(0.86, -0.55),
    topPoint(1.0, -0.48),
    topPoint(1.08, -0.58)
  ], 0.038, relief_goldMat);
  central_dancer_right_forearm.name = "central_dancer_right_forearm";
  root.add(central_dancer_right_forearm);

  const central_dancer_left_leg = makeSurfaceTube([
    topPoint(-0.11, 0.25),
    topPoint(-0.25, 0.43),
    topPoint(-0.43, 0.58),
    topPoint(-0.62, 0.55)
  ], 0.047, relief_goldMat);
  central_dancer_left_leg.name = "central_dancer_left_leg";
  root.add(central_dancer_left_leg);

  const central_dancer_right_leg = makeSurfaceTube([
    topPoint(0.1, 0.25),
    topPoint(0.27, 0.42),
    topPoint(0.46, 0.57),
    topPoint(0.66, 0.52)
  ], 0.047, relief_goldMat);
  central_dancer_right_leg.name = "central_dancer_right_leg";
  root.add(central_dancer_right_leg);

  const central_dancer_left_sash = makeSurfaceTube([
    topPoint(-0.1, 0.13),
    topPoint(-0.28, 0.28),
    topPoint(-0.44, 0.43),
    topPoint(-0.56, 0.62)
  ], 0.022, antique_goldMat);
  central_dancer_left_sash.name = "central_dancer_left_sash";
  root.add(central_dancer_left_sash);

  const central_dancer_right_sash = makeSurfaceTube([
    topPoint(0.1, 0.13),
    topPoint(0.28, 0.28),
    topPoint(0.44, 0.43),
    topPoint(0.56, 0.62)
  ], 0.022, antique_goldMat);
  central_dancer_right_sash.name = "central_dancer_right_sash";
  root.add(central_dancer_right_sash);

  const top_figure_robeShape = new THREE.Shape();
  top_figure_robeShape.moveTo(-0.1, 0.15);
  top_figure_robeShape.quadraticCurveTo(-0.16, -0.05, -0.27, -0.31);
  top_figure_robeShape.quadraticCurveTo(-0.1, -0.34, 0, -0.28);
  top_figure_robeShape.quadraticCurveTo(0.1, -0.34, 0.27, -0.3);
  top_figure_robeShape.quadraticCurveTo(0.16, -0.05, 0.1, 0.15);
  top_figure_robeShape.closePath();
  const top_figure_robeGeom = new THREE.ExtrudeGeometry(top_figure_robeShape, {
    depth: 0.04,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });

  function createTopFigure(name, x, z, scale, rotation) {
    const group = new THREE.Group();
    group.name = name;
    group.position.set(x, 2.0, z);
    group.rotation.y = rotation;
    group.scale.setScalar(scale);

    const robe = new THREE.Mesh(top_figure_robeGeom, relief_goldMat);
    robe.name = name + "_robe";
    robe.rotation.x = Math.PI / 2;
    robe.position.y = 0.05;
    group.add(robe);

    const torso = new THREE.Mesh(
      new THREE.SphereGeometry(1, 14, 8),
      relief_goldMat
    );
    torso.name = name + "_torso";
    torso.position.set(0, 0.055, -0.08);
    torso.scale.set(0.12, 0.04, 0.18);
    group.add(torso);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 14, 8),
      relief_goldMat
    );
    head.name = name + "_head";
    head.position.set(0.02, 0.06, -0.34);
    group.add(head);

    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 12, 8),
      antique_goldMat
    );
    hair.name = name + "_hair";
    hair.position.set(-0.025, 0.063, -0.375);
    group.add(hair);

    const left_arm = makeSurfaceTube([
      new THREE.Vector3(-0.08, 0.065, -0.12),
      new THREE.Vector3(-0.27, 0.065, -0.22),
      new THREE.Vector3(-0.43, 0.065, -0.36)
    ], 0.034, relief_goldMat, 16);
    left_arm.name = name + "_left_arm";
    group.add(left_arm);

    const right_arm = makeSurfaceTube([
      new THREE.Vector3(0.08, 0.065, -0.12),
      new THREE.Vector3(0.27, 0.065, -0.22),
      new THREE.Vector3(0.43, 0.065, -0.36)
    ], 0.034, relief_goldMat, 16);
    right_arm.name = name + "_right_arm";
    group.add(right_arm);

    const left_leg = makeSurfaceTube([
      new THREE.Vector3(-0.07, 0.06, 0.13),
      new THREE.Vector3(-0.17, 0.06, 0.34),
      new THREE.Vector3(-0.29, 0.06, 0.49)
    ], 0.035, relief_goldMat, 16);
    left_leg.name = name + "_left_leg";
    group.add(left_leg);

    const right_leg = makeSurfaceTube([
      new THREE.Vector3(0.07, 0.06, 0.13),
      new THREE.Vector3(0.19, 0.06, 0.33),
      new THREE.Vector3(0.32, 0.06, 0.47)
    ], 0.035, relief_goldMat, 16);
    right_leg.name = name + "_right_leg";
    group.add(right_leg);

    const hands = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.045, 10, 7),
      relief_goldMat,
      4
    );
    hands.name = name + "_hands_and_feet";
    const handPositions = [
      [-0.43, 0.066, -0.36],
      [0.43, 0.066, -0.36],
      [-0.29, 0.066, 0.49],
      [0.32, 0.066, 0.47]
    ];
    for (let i = 0; i < handPositions.length; i++) {
      hands.setMatrixAt(
        i,
        new THREE.Matrix4().makeTranslation(
          handPositions[i][0],
          handPositions[i][1],
          handPositions[i][2]
        )
      );
    }
    hands.instanceMatrix.needsUpdate = true;
    group.add(hands);

    return group;
  }

  const top_left_figure = createTopFigure("top_left_figure", -0.94, 0.03, 0.72, -0.72);
  root.add(top_left_figure);

  const top_right_figure = createTopFigure("top_right_figure", 0.94, 0.03, 0.72, 0.72);
  root.add(top_right_figure);

  const top_rear_left_figure = createTopFigure("top_rear_left_figure", -0.58, -0.7, 0.58, 0.34);
  root.add(top_rear_left_figure);

  const top_rear_right_figure = createTopFigure("top_rear_right_figure", 0.58, -0.7, 0.58, -0.34);
  root.add(top_rear_right_figure);

  const top_front_left_figure = createTopFigure("top_front_left_figure", -0.68, 0.73, 0.56, -0.28);
  root.add(top_front_left_figure);

  const top_front_right_figure = createTopFigure("top_front_right_figure", 0.68, 0.73, 0.56, 0.28);
  root.add(top_front_right_figure);

  const front_left_vine = makeSurfaceTube([
    new THREE.Vector3(-1.43, 0.55, 1.378),
    new THREE.Vector3(-1.28, 0.72, 1.378),
    new THREE.Vector3(-1.34, 0.94, 1.378),
    new THREE.Vector3(-1.17, 1.12, 1.378),
    new THREE.Vector3(-0.99, 1.04, 1.378),
    new THREE.Vector3(-1.04, 0.88, 1.378),
    new THREE.Vector3(-1.2, 0.86, 1.378)
  ], 0.022, relief_goldMat);
  front_left_vine.name = "front_left_vine";
  root.add(front_left_vine);

  const front_right_vine = makeSurfaceTube([
    new THREE.Vector3(1.43, 0.55, 1.378),
    new THREE.Vector3(1.28, 0.72, 1.378),
    new THREE.Vector3(1.34, 0.94, 1.378),
    new THREE.Vector3(1.17, 1.12, 1.378),
    new THREE.Vector3(0.99, 1.04, 1.378),
    new THREE.Vector3(1.04, 0.88, 1.378),
    new THREE.Vector3(1.2, 0.86, 1.378)
  ], 0.022, relief_goldMat);
  front_right_vine.name = "front_right_vine";
  root.add(front_right_vine);

  const right_front_vine = makeSurfaceTube([
    new THREE.Vector3(1.596, 0.54, 1.12),
    new THREE.Vector3(1.596, 0.73, 0.96),
    new THREE.Vector3(1.596, 0.96, 1.02),
    new THREE.Vector3(1.596, 1.12, 0.83),
    new THREE.Vector3(1.596, 1.03, 0.64),
    new THREE.Vector3(1.596, 0.87, 0.69)
  ], 0.022, relief_goldMat);
  right_front_vine.name = "right_front_vine";
  root.add(right_front_vine);

  const right_rear_vine = makeSurfaceTube([
    new THREE.Vector3(1.596, 0.54, -1.12),
    new THREE.Vector3(1.596, 0.73, -0.96),
    new THREE.Vector3(1.596, 0.96, -1.02),
    new THREE.Vector3(1.596, 1.12, -0.83),
    new THREE.Vector3(1.596, 1.03, -0.64),
    new THREE.Vector3(1.596, 0.87, -0.69)
  ], 0.022, relief_goldMat);
  right_rear_vine.name = "right_rear_vine";
  root.add(right_rear_vine);

  const side_figure_robeShape = new THREE.Shape();
  side_figure_robeShape.moveTo(-0.1, 0.18);
  side_figure_robeShape.quadraticCurveTo(-0.17, -0.12, -0.28, -0.5);
  side_figure_robeShape.quadraticCurveTo(-0.08, -0.55, 0, -0.48);
  side_figure_robeShape.quadraticCurveTo(0.08, -0.55, 0.28, -0.49);
  side_figure_robeShape.quadraticCurveTo(0.17, -0.12, 0.1, 0.18);
  side_figure_robeShape.closePath();
  const side_figure_robeGeom = new THREE.ExtrudeGeometry(side_figure_robeShape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const side_figure_headGeom = new THREE.SphereGeometry(1, 14, 9);
  const side_figure_limbGeom = new THREE.CylinderGeometry(1, 1, 1, 8);

  function createSideFigure(name, x, z, scale, facing, mirror) {
    const group = new THREE.Group();
    group.name = name;
    group.position.set(x, 0.43, z);
    group.scale.setScalar(scale);

    const robe = new THREE.Mesh(side_figure_robeGeom, relief_goldMat);
    robe.name = name + "_robe";
    robe.rotation.y = facing;
    group.add(robe);

    const torso = new THREE.Mesh(side_figure_headGeom, relief_goldMat);
    torso.name = name + "_torso";
    torso.position.set(0, 0.39, 0.025);
    torso.rotation.y = facing;
    torso.scale.set(0.13, 0.22, 0.055);
    group.add(torso);

    const head = new THREE.Mesh(side_figure_headGeom, relief_goldMat);
    head.name = name + "_head";
    head.position.set(mirror * 0.025, 0.68, 0.055);
    head.scale.set(0.115, 0.13, 0.06);
    group.add(head);

    const hair = new THREE.Mesh(side_figure_headGeom, antique_goldMat);
    hair.name = name + "_hair";
    hair.position.set(-mirror * 0.035, 0.715, 0.018);
    hair.scale.set(0.12, 0.115, 0.05);
    group.add(hair);

    const neck = new THREE.Mesh(side_figure_headGeom, relief_goldMat);
    neck.name = name + "_neck";
    neck.position.set(0, 0.555, 0.035);
    neck.scale.set(0.045, 0.07, 0.04);
    group.add(neck);

    const shoulderY = 0.49;
    const handY = mirror * 0.22;
    const outerHandX = mirror * 0.39;
    const innerHandX = -mirror * 0.25;
    const outerFootX = mirror * 0.19;
    const innerFootX = -mirror * 0.16;
    const segments = [
      [-mirror * 0.08, shoulderY, 0.06, outerHandX, handY, 0.07],
      [mirror * 0.08, shoulderY, 0.06, innerHandX, handY + 0.12, 0.07],
      [-0.06, 0.0, 0.055, outerFootX, -0.49, 0.055],
      [0.07, 0.0, 0.055, innerFootX, -0.48, 0.055]
    ];
    const limbs = new THREE.InstancedMesh(
      side_figure_limbGeom,
      relief_goldMat,
      segments.length
    );
    limbs.name = name + "_limbs";
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const start = new THREE.Vector3(segment[0], segment[1], segment[2]);
      const end = new THREE.Vector3(segment[3], segment[4], segment[5]);
      const direction = end.clone().sub(start);
      const length = direction.length();
      const orientation = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.clone().normalize()
      );
      limbs.setMatrixAt(
        i,
        new THREE.Matrix4().compose(
          start.clone().add(end).multiplyScalar(0.5),
          orientation,
          new THREE.Vector3(0.038, length, 0.038)
        )
      );
    }
    limbs.instanceMatrix.needsUpdate = true;
    group.add(limbs);

    const hands = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.05, 10, 7),
      relief_goldMat,
      4
    );
    hands.name = name + "_hands_and_feet";
    const positions = [
      [outerHandX, handY, 0.075],
      [innerHandX, handY + 0.12, 0.075],
      [outerFootX, -0.5, 0.065],
      [innerFootX, -0.49, 0.065]
    ];
    for (let i = 0; i < positions.length; i++) {
      hands.setMatrixAt(
        i,
        new THREE.Matrix4().makeTranslation(
          positions[i][0],
          positions[i][1],
          positions[i][2]
        )
      );
    }
    hands.instanceMatrix.needsUpdate = true;
    group.add(hands);

    return group;
  }

  const front_left_dancer = createSideFigure("front_left_dancer", -1.08, 1.382, 0.82, 0, 1);
  root.add(front_left_dancer);

  const front_left_child = createSideFigure("front_left_child", -0.58, 1.383, 0.62, 0, 1);
  root.add(front_left_child);

  const front_center_dancer = createSideFigure("front_center_dancer", -0.05, 1.384, 0.78, 0, 1);
  root.add(front_center_dancer);

  const front_right_child = createSideFigure("front_right_child", 0.48, 1.383, 0.63, 0, -1);
  root.add(front_right_child);

  const front_right_dancer = createSideFigure("front_right_dancer", 1.0, 1.382, 0.82, 0, -1);
  root.add(front_right_dancer);

  const right_front_dancer = createSideFigure("right_front_dancer", 1.605, 0.82, 0.78, Math.PI / 2, -1);
  root.add(right_front_dancer);

  const right_center_child = createSideFigure("right_center_child", 1.606, 0.18, 0.62, Math.PI / 2, -1);
  root.add(right_center_child);

  const right_rear_dancer = createSideFigure("right_rear_dancer", 1.605, -0.58, 0.8, Math.PI / 2, -1);
  root.add(right_rear_dancer);

  const left_side_dancer = createSideFigure("left_side_dancer", -1.605, 0.48, 0.78, -Math.PI / 2, 1);
  root.add(left_side_dancer);

  const front_left_corner_flourish = makeSurfaceTube([
    new THREE.Vector3(-1.47, 1.18, 1.39),
    new THREE.Vector3(-1.34, 1.34, 1.39),
    new THREE.Vector3(-1.18, 1.27, 1.39),
    new THREE.Vector3(-1.22, 1.1, 1.39),
    new THREE.Vector3(-1.39, 1.04, 1.39),
    new THREE.Vector3(-1.45, 0.88, 1.39)
  ], 0.025, relief_goldMat, 28);
  front_left_corner_flourish.name = "front_left_corner_flourish";
  root.add(front_left_corner_flourish);

  const front_right_corner_flourish = makeSurfaceTube([
    new THREE.Vector3(1.47, 1.18, 1.39),
    new THREE.Vector3(1.34, 1.34, 1.39),
    new THREE.Vector3(1.18, 1.27, 1.39),
    new THREE.Vector3(1.22, 1.1, 1.39),
    new THREE.Vector3(1.39, 1.04, 1.39),
    new THREE.Vector3(1.45, 0.88, 1.39)
  ], 0.025, relief_goldMat, 28);
  front_right_corner_flourish.name = "front_right_corner_flourish";
  root.add(front_right_corner_flourish);

  const front_inner_left_flourish = makeSurfaceTube([
    new THREE.Vector3(-0.82, 0.53, 1.397),
    new THREE.Vector3(-0.72, 0.68, 1.397),
    new THREE.Vector3(-0.78, 0.84, 1.397),
    new THREE.Vector3(-0.66, 0.96, 1.397),
    new THREE.Vector3(-0.55, 0.87, 1.397)
  ], 0.019, relief_goldMat, 22);
  front_inner_left_flourish.name = "front_inner_left_flourish";
  root.add(front_inner_left_flourish);

  const front_inner_right_flourish = makeSurfaceTube([
    new THREE.Vector3(0.82, 0.53, 1.397),
    new THREE.Vector3(0.72, 0.68, 1.397),
    new THREE.Vector3(0.78, 0.84, 1.397),
    new THREE.Vector3(0.66, 0.96, 1.397),
    new THREE.Vector3(0.55, 0.87, 1.397)
  ], 0.019, relief_goldMat, 22);
  front_inner_right_flourish.name = "front_inner_right_flourish";
  root.add(front_inner_right_flourish);

  const front_figure_canesGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.72, 8);
  const front_figure_canesMatrices = [
    reliefMatrix(-1.35, 0.82, 1.425, 0, 0, 1, 1, 1, 1, -0.55),
    reliefMatrix(1.28, 0.84, 1.425, 0, 0, 1, 1, 1, 1, 0.55),
    reliefMatrix(0.72, 0.78, 1.425, 0, 0, 1, 1, 1, 1, -0.42)
  ];
  const front_figure_canes = new THREE.InstancedMesh(
    front_figure_canesGeom,
    relief_goldMat,
    front_figure_canesMatrices.length
  );
  front_figure_canes.name = "front_figure_canes";
  addInstanced(front_figure_canes, front_figure_canesMatrices);

  const side_figure_canesGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.72, 8);
  const side_figure_canesMatrices = [
    reliefMatrix(1.64, 0.84, 1.05, 1, 0, 0, 1, 1, 1, 0.5),
    reliefMatrix(1.64, 0.82, -0.83, 1, 0, 0, 1, 1, 1, -0.5),
    reliefMatrix(1.64, 0.76, -0.1, 1, 0, 0, 1, 1, 1, 0.35)
  ];
  const side_figure_canes = new THREE.InstancedMesh(
    side_figure_canesGeom,
    relief_goldMat,
    side_figure_canesMatrices.length
  );
  side_figure_canes.name = "side_figure_canes";
  addInstanced(side_figure_canes, side_figure_canesMatrices);

  const side_leafGeom = new THREE.SphereGeometry(1, 12, 8);
  const frontLeafData = [
    [-1.4, 1.17, -0.55], [-1.27, 1.3, -0.9], [-1.16, 1.11, 0.55],
    [-0.86, 0.72, -0.35], [-0.72, 0.91, 0.7], [-0.36, 0.66, -0.6],
    [-0.18, 0.88, 0.55], [0.24, 0.65, -0.55], [0.43, 0.91, 0.65],
    [0.78, 0.7, -0.7], [1.16, 1.11, -0.55], [1.27, 1.3, 0.9],
    [1.4, 1.17, 0.55], [-0.98, 1.22, 0.2], [0.95, 1.22, -0.2]
  ];
  const front_side_leafMatrices = [];
  for (const leaf of frontLeafData) {
    front_side_leafMatrices.push(
      reliefMatrix(
        leaf[0],
        leaf[1],
        1.405,
        0,
        0,
        1,
        0.12,
        0.045,
        0.025,
        leaf[2]
      )
    );
  }
  const front_side_leaves = new THREE.InstancedMesh(
    side_leafGeom,
    relief_goldMat,
    front_side_leafMatrices.length
  );
  front_side_leaves.name = "front_side_leaves";
  addInstanced(front_side_leaves, front_side_leafMatrices);

  const rightLeafData = [
    [1.08, 1.16, 0.55], [0.93, 1.29, -0.65], [0.72, 1.08, 0.55],
    [0.52, 0.7, -0.45], [0.22, 0.94, 0.7], [-0.08, 0.66, -0.55],
    [-0.34, 0.91, 0.62], [-0.62, 0.68, -0.65], [-0.86, 1.08, 0.55],
    [-1.06, 1.26, -0.6], [-1.18, 0.88, 0.4]
  ];
  const right_side_leafMatrices = [];
  for (const leaf of rightLeafData) {
    right_side_leafMatrices.push(
      reliefMatrix(
        1.635,
        leaf[1],
        leaf[0],
        1,
        0,
        0,
        0.025,
        0.045,
        0.12,
        leaf[2]
      )
    );
  }
  const right_side_leaves = new THREE.InstancedMesh(
    side_leafGeom,
    relief_goldMat,
    right_side_leafMatrices.length
  );
  right_side_leaves.name = "right_side_leaves";
  addInstanced(right_side_leaves, right_side_leafMatrices);

  const side_scroll_curlsGeom = new THREE.TorusGeometry(0.13, 0.021, 8, 20);
  const side_scroll_curlsMatrices = [
    reliefMatrix(-1.39, 1.12, 1.41, 0, 0, 1, 1, 1, 1, 0),
    reliefMatrix(1.39, 1.12, 1.41, 0, 0, 1, 1, 1, 1, 0),
    reliefMatrix(-0.72, 0.88, 1.41, 0, 0, 1, 0.75, 0.75, 1, 0),
    reliefMatrix(0.72, 0.88, 1.41, 0, 0, 1, 0.75, 0.75, 1, 0),
    reliefMatrix(1.64, 1.12, 1.05, 1, 0, 0, 1, 1, 1, Math.PI / 2),
    reliefMatrix(1.64, 1.1, -0.92, 1, 0, 0, 1, 1, 1, Math.PI / 2),
    reliefMatrix(1.64, 0.86, -0.08, 1, 0, 0, 0.75, 0.75, 1, Math.PI / 2)
  ];
  const side_scroll_curls = new THREE.InstancedMesh(
    side_scroll_curlsGeom,
    relief_goldMat,
    side_scroll_curlsMatrices.length
  );
  side_scroll_curls.name = "side_scroll_curls";
  addInstanced(side_scroll_curls, side_scroll_curlsMatrices);

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