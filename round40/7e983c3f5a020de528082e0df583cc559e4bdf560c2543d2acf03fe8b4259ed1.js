export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "oval_sapphire_ring";

  const ring_band = new THREE.Group();
  ring_band.name = "ring_band";
  root.add(ring_band);

  const ring_head = new THREE.Group();
  ring_head.name = "ring_head";
  root.add(ring_head);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const diamondMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.18,
    vertexColors: true,
    flatShading: true,
  });

  const center_sapphireMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.16,
    vertexColors: true,
    flatShading: true,
  });

  function createOvalGemGeometry(halfW, halfH, depth, palette) {
    const positions = [];
    const colors = [];
    const segments = 20;
    const outer = [];
    const table = [];
    const pavilion = [];
    const facetColors = [
      0x281043,
      0x4d2376,
      0x7040a0,
      0x9563c8,
      0x562784,
      0xb184dc,
      0x381559,
      0x7543a8,
    ];

    function pointAt(radius, angle, z) {
      return [
        Math.cos(angle) * halfW * radius,
        Math.sin(angle) * halfH * radius,
        z,
      ];
    }

    function addTriangle(a, b, c, colorValue) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      const color = new THREE.Color(colorValue);
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      outer.push(pointAt(1.0, angle, 0.0));
      table.push(pointAt(0.54, angle, depth * 0.46));
      pavilion.push(pointAt(0.98, angle, -depth * 0.12));
    }

    const tableCenter = [0, 0, depth * 0.52];
    const culet = [0, 0, -depth * 0.5];

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const colorA = facetColors[i % facetColors.length];
      const colorB = facetColors[(i + 3) % facetColors.length];
      const colorC = facetColors[(i + 5) % facetColors.length];

      addTriangle(outer[i], outer[next], table[next], colorA);
      addTriangle(outer[i], table[next], table[i], colorB);
      addTriangle(table[i], table[next], tableCenter, colorC);

      addTriangle(outer[next], outer[i], pavilion[i], colorB);
      addTriangle(outer[next], pavilion[i], pavilion[next], colorA);
      addTriangle(pavilion[next], pavilion[i], culet, colorC);
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
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createDiamondGeometry() {
    const positions = [];
    const colors = [];
    const segments = 12;
    const crown = [];
    const girdle = [];
    const facetColors = [
      0xffffff,
      0xdce8ff,
      0xf4f6ff,
      0xbfcdea,
      0xffffff,
      0xe8edf7,
    ];

    function pointAt(radius, angle) {
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0,
      ];
    }

    function addTriangle(a, b, c, colorValue) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      const color = new THREE.Color(colorValue);
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      crown.push(pointAt(0.46, angle));
      girdle.push(pointAt(1.0, angle));
    }

    const tableCenter = [0, 0, 0];
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      addTriangle(
        girdle[i],
        girdle[next],
        crown[next],
        facetColors[i % facetColors.length]
      );
      addTriangle(
        girdle[i],
        crown[next],
        crown[i],
        facetColors[(i + 2) % facetColors.length]
      );
      addTriangle(
        crown[i],
        crown[next],
        tableCenter,
        facetColors[(i + 4) % facetColors.length]
      );
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
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createEllipseTube(radius, tube, z) {
    const points = [];
    const pointCount = 48;
    for (let i = 0; i < pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * halfW * radius,
        Math.sin(angle) * halfH * radius,
        z
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 96, tube, 8, true);
  }

  const bandGeom = new THREE.TorusGeometry(0.72, 0.07, 14, 72);
  const band = new THREE.Mesh(bandGeom, silverMat);
  band.name = "band";
  band.rotation.x = Math.PI / 2;
  band.position.set(0, -0.18, -0.70);
  ring_band.add(band);

  const left_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.56, -0.18, -0.06),
    new THREE.Vector3(-0.50, -0.13, 0.04),
    new THREE.Vector3(-0.43, -0.07, 0.14),
    new THREE.Vector3(-0.37, -0.01, 0.22),
  ], false, "centripetal");
  const left_shoulderGeom = new THREE.TubeGeometry(
    left_shoulderPath,
    24,
    0.075,
    10,
    false
  );
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, silverMat);
  left_shoulder.name = "left_shoulder";
  ring_band.add(left_shoulder);

  const right_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.56, -0.18, -0.06),
    new THREE.Vector3(0.50, -0.13, 0.04),
    new THREE.Vector3(0.43, -0.07, 0.14),
    new THREE.Vector3(0.37, -0.01, 0.22),
  ], false, "centripetal");
  const right_shoulderGeom = new THREE.TubeGeometry(
    right_shoulderPath,
    24,
    0.075,
    10,
    false
  );
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, silverMat);
  right_shoulder.name = "right_shoulder";
  ring_band.add(right_shoulder);

  const halfW = 0.43;
  const halfH = 0.56;
  const settingCenterZ = 0.22;

  const setting_baseGeom = new THREE.CylinderGeometry(1, 1, 0.10, 48);
  const setting_base = new THREE.Mesh(setting_baseGeom, silverMat);
  setting_base.name = "setting_base";
  setting_base.rotation.x = Math.PI / 2;
  setting_base.scale.set(halfW * 1.18, 1, halfH * 1.16);
  setting_base.position.set(0, 0, 0.14);
  ring_head.add(setting_base);

  const lower_galleryGeom = createEllipseTube(1.10, 0.026, 0.18);
  const lower_gallery = new THREE.Mesh(lower_galleryGeom, silverMat);
  lower_gallery.name = "lower_gallery";
  ring_head.add(lower_gallery);

  const outer_galleryGeom = createEllipseTube(1.13, 0.032, 0.29);
  const outer_gallery = new THREE.Mesh(outer_galleryGeom, silverMat);
  outer_gallery.name = "outer_gallery";
  ring_head.add(outer_gallery);

  const inner_galleryGeom = createEllipseTube(1.02, 0.022, 0.31);
  const inner_gallery = new THREE.Mesh(inner_galleryGeom, silverMat);
  inner_gallery.name = "inner_gallery";
  ring_head.add(inner_gallery);

  const gallery_supportsGeom = new THREE.CylinderGeometry(
    0.016,
    0.016,
    0.14,
    8
  );
  const gallery_supports = new THREE.InstancedMesh(
    gallery_supportsGeom,
    silverMat,
    16
  );
  gallery_supports.name = "gallery_supports";
  const gallery_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    gallery_dummy.position.set(
      Math.cos(angle) * halfW * 1.10,
      Math.sin(angle) * halfH * 1.10,
      0.235
    );
    gallery_dummy.rotation.set(Math.PI / 2, 0, 0);
    gallery_dummy.scale.set(1, 1, 1);
    gallery_dummy.updateMatrix();
    gallery_supports.setMatrixAt(i, gallery_dummy.matrix);
  }
  gallery_supports.instanceMatrix.needsUpdate = true;
  ring_head.add(gallery_supports);

  const haloCount = 20;
  const haloRadius = 0.062;
  const halo_diamondsGeom = createDiamondGeometry();
  const halo_diamonds = new THREE.InstancedMesh(
    halo_diamondsGeom,
    diamondMat,
    haloCount
  );
  halo_diamonds.name = "halo_diamonds";

  const halo_dummy = new THREE.Object3D();
  for (let i = 0; i < haloCount; i++) {
    const angle = i / haloCount * Math.PI * 2;
    halo_dummy.position.set(
      Math.cos(angle) * halfW * 1.17,
      Math.sin(angle) * halfH * 1.17,
      0.375
    );
    halo_dummy.rotation.set(0, 0, angle);
    halo_dummy.scale.setScalar(haloRadius);
    halo_dummy.updateMatrix();
    halo_diamonds.setMatrixAt(i, halo_dummy.matrix);
  }
  halo_diamonds.instanceMatrix.needsUpdate = true;
  ring_head.add(halo_diamonds);

  const halo_beadsGeom = new THREE.SphereGeometry(0.022, 10, 6);
  const halo_beads = new THREE.InstancedMesh(
    halo_beadsGeom,
    silverMat,
    haloCount
  );
  halo_beads.name = "halo_beads";

  const bead_dummy = new THREE.Object3D();
  for (let i = 0; i < haloCount; i++) {
    const angle = (i + 0.5) / haloCount * Math.PI * 2;
    bead_dummy.position.set(
      Math.cos(angle) * halfW * 1.205,
      Math.sin(angle) * halfH * 1.205,
      0.34
    );
    bead_dummy.rotation.set(0, 0, 0);
    bead_dummy.scale.set(1, 1, 1);
    bead_dummy.updateMatrix();
    halo_beads.setMatrixAt(i, bead_dummy.matrix);
  }
  halo_beads.instanceMatrix.needsUpdate = true;
  ring_head.add(halo_beads);

  const center_sapphireGeom = createOvalGemGeometry(
    halfW,
    halfH,
    0.34,
    0x7040a0
  );
  const center_sapphire = new THREE.Mesh(
    center_sapphireGeom,
    center_sapphireMat
  );
  center_sapphire.name = "center_sapphire";
  center_sapphire.position.set(0, 0, settingCenterZ);
  ring_head.add(center_sapphire);

  const prong_stemsGeom = new THREE.CylinderGeometry(
    0.022,
    0.027,
    0.19,
    10
  );
  const prong_stems = new THREE.InstancedMesh(
    prong_stemsGeom,
    silverMat,
    4
  );
  prong_stems.name = "prong_stems";

  const prong_tipsGeom = new THREE.SphereGeometry(0.045, 14, 8);
  const prong_tips = new THREE.InstancedMesh(
    prong_tipsGeom,
    silverMat,
    4
  );
  prong_tips.name = "prong_tips";

  const prong_dummy = new THREE.Object3D();
  const tip_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    const x = Math.cos(angle) * halfW * 0.98;
    const y = Math.sin(angle) * halfH * 0.98;

    prong_dummy.position.set(x, y, 0.34);
    prong_dummy.rotation.set(Math.PI / 2, 0, 0);
    prong_dummy.scale.set(1, 1, 1);
    prong_dummy.updateMatrix();
    prong_stems.setMatrixAt(i, prong_dummy.matrix);

    tip_dummy.position.set(x, y, 0.425);
    tip_dummy.rotation.set(0, 0, 0);
    tip_dummy.scale.set(1, 1, 1);
    tip_dummy.updateMatrix();
    prong_tips.setMatrixAt(i, tip_dummy.matrix);
  }
  prong_stems.instanceMatrix.needsUpdate = true;
  prong_tips.instanceMatrix.needsUpdate = true;
  ring_head.add(prong_stems);
  ring_head.add(prong_tips);

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