export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "diamond_cufflink_pair";

  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  function createGemstoneGeometry() {
    const positions = [];
    const colors = [];
    const segments = 24;
    const inner = [];
    const middle = [];
    const outer_front = [];
    const outer_back = [];

    const facetPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xdcecf2),
      new THREE.Color(0x9fb6c2),
      new THREE.Color(0xf5e6c7),
      new THREE.Color(0xcbd8ff),
      new THREE.Color(0xffffff),
      new THREE.Color(0x56636b),
      new THREE.Color(0xe8fbf4),
    ];

    function point(radius, angle, z) {
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
      );
    }

    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const offsetAngle = angle + Math.PI / segments;
      inner.push(point(0.19, angle, 0.30));
      middle.push(point(0.43, offsetAngle, 0.20));
      outer_front.push(point(0.68, angle, 0.04));
      outer_back.push(point(0.68, angle, -0.07));
    }

    function addTriangle(a, b, c, colorIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = facetPalette[colorIndex % facetPalette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const tableCenter = new THREE.Vector3(0, 0, 0.31);
    const pavilionPoint = new THREE.Vector3(0, 0, -0.38);

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;

      addTriangle(tableCenter, inner[i], inner[next], i + 1);

      addTriangle(inner[i], middle[i], middle[next], i * 3 + 2);
      addTriangle(inner[i], middle[next], inner[next], i * 5 + 4);

      addTriangle(middle[i], outer_front[i], outer_front[next], i * 2 + 3);
      addTriangle(middle[i], outer_front[next], middle[next], i * 4 + 1);

      addTriangle(outer_front[i], outer_back[i], outer_back[next], i + 5);
      addTriangle(outer_front[i], outer_back[next], outer_front[next], i + 2);

      addTriangle(outer_back[i], pavilionPoint, outer_back[next], i * 3 + 5);
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

  const gemstoneGeom = createGemstoneGeometry();
  const setting_ringGeom = new THREE.TorusGeometry(0.665, 0.045, 12, 48);
  const gallery_ringGeom = new THREE.TorusGeometry(0.59, 0.032, 10, 40);
  const rear_basketGeom = new THREE.CylinderGeometry(
    0.22, 0.14, 0.20, 24
  );
  const prong_stemGeom = new THREE.CylinderGeometry(
    0.055, 0.072, 0.30, 12
  );
  const prong_capGeom = new THREE.SphereGeometry(0.115, 18, 10);
  const hinge_barrelGeom = new THREE.CylinderGeometry(
    0.095, 0.095, 0.34, 18
  );
  const hinge_endGeom = new THREE.SphereGeometry(0.105, 16, 10);
  const connector_neckGeom = new THREE.CylinderGeometry(
    0.105, 0.105, 0.20, 18
  );
  const connector_collarGeom = new THREE.TorusGeometry(
    0.105, 0.022, 8, 24
  );
  const toggle_bodyGeom = new THREE.CapsuleGeometry(0.13, 0.62, 6, 14);
  const toggle_faceGeom = new THREE.CapsuleGeometry(0.095, 0.48, 5, 12);
  const pivot_capGeom = new THREE.CylinderGeometry(
    0.09, 0.09, 0.035, 18
  );

  function createCufflink(prefix) {
    const cufflink = new THREE.Group();
    cufflink.name = prefix;

    const face = new THREE.Group();
    face.name = prefix + "_face";
    cufflink.add(face);

    const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
    gemstone.name = prefix + "_gemstone";
    gemstone.scale.setScalar(0.82);
    gemstone.renderOrder = 1;
    face.add(gemstone);

    const setting_ring = new THREE.Mesh(setting_ringGeom, silverMat);
    setting_ring.name = prefix + "_setting_ring";
    setting_ring.position.z = -0.015;
    face.add(setting_ring);

    const gallery_ring = new THREE.Mesh(gallery_ringGeom, chromeMat);
    gallery_ring.name = prefix + "_gallery_ring";
    gallery_ring.position.z = -0.13;
    face.add(gallery_ring);

    const rear_basket = new THREE.Mesh(rear_basketGeom, brushedMat);
    rear_basket.name = prefix + "_rear_basket";
    rear_basket.rotation.x = Math.PI / 2;
    rear_basket.position.z = -0.22;
    face.add(rear_basket);

    const prong_stems = new THREE.InstancedMesh(
      prong_stemGeom,
      chromeMat,
      4
    );
    prong_stems.name = prefix + "_prong_stems";

    const prong_caps = new THREE.InstancedMesh(
      prong_capGeom,
      chromeMat,
      4
    );
    prong_caps.name = prefix + "_prong_caps";

    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < 4; i++) {
      const angle = Math.PI / 4 + i * Math.PI / 2;
      const radial = new THREE.Vector3(
        Math.cos(angle),
        Math.sin(angle),
        0
      );

      dummy.position.set(
        radial.x * 0.64,
        radial.y * 0.64,
        0.105
      );
      dummy.quaternion.setFromUnitVectors(up, radial);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      prong_stems.setMatrixAt(i, dummy.matrix);

      dummy.position.set(
        radial.x * 0.69,
        radial.y * 0.69,
        0.22
      );
      dummy.quaternion.set(0, 0, 0, 1);
      dummy.scale.set(1.0, 0.88, 1.15);
      dummy.updateMatrix();
      prong_caps.setMatrixAt(i, dummy.matrix);
    }

    prong_stems.instanceMatrix.needsUpdate = true;
    prong_caps.instanceMatrix.needsUpdate = true;
    face.add(prong_stems, prong_caps);

    const hinge_barrel = new THREE.Mesh(hinge_barrelGeom, chromeMat);
    hinge_barrel.name = prefix + "_hinge_barrel";
    hinge_barrel.rotation.x = Math.PI / 2;
    hinge_barrel.position.set(0, 0, -0.36);
    cufflink.add(hinge_barrel);

    const hinge_front_cap = new THREE.Mesh(hinge_endGeom, silverMat);
    hinge_front_cap.name = prefix + "_hinge_front_cap";
    hinge_front_cap.position.set(0, 0, -0.255);
    cufflink.add(hinge_front_cap);

    const hinge_rear_cap = new THREE.Mesh(hinge_endGeom, silverMat);
    hinge_rear_cap.name = prefix + "_hinge_rear_cap";
    hinge_rear_cap.position.set(0, 0, -0.465);
    cufflink.add(hinge_rear_cap);

    const connector_neck = new THREE.Mesh(connector_neckGeom, chromeMat);
    connector_neck.name = prefix + "_connector_neck";
    connector_neck.rotation.x = Math.PI / 2;
    connector_neck.position.set(0, 0, -0.53);
    cufflink.add(connector_neck);

    const connector_collar = new THREE.Mesh(
      connector_collarGeom,
      brushedMat
    );
    connector_collar.name = prefix + "_connector_collar";
    connector_collar.position.set(0, 0, -0.59);
    cufflink.add(connector_collar);

    const toggle = new THREE.Group();
    toggle.name = prefix + "_toggle";
    toggle.position.set(0, 0, -0.82);
    toggle.rotation.y = Math.PI / 2;
    cufflink.add(toggle);

    const toggle_body = new THREE.Mesh(toggle_bodyGeom, silverMat);
    toggle_body.name = prefix + "_toggle_body";
    toggle_body.scale.z = 0.72;
    toggle.add(toggle_body);

    const toggle_face = new THREE.Mesh(toggle_faceGeom, brushedMat);
    toggle_face.name = prefix + "_toggle_face";
    toggle_face.position.z = 0.105;
    toggle_face.scale.z = 0.42;
    toggle.add(toggle_face);

    const toggle_pivot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.115, 0.115, 0.27, 18),
      chromeMat
    );
    toggle_pivot.name = prefix + "_toggle_pivot";
    toggle_pivot.rotation.z = Math.PI / 2;
    toggle_pivot.position.set(0, 0, 0.07);
    toggle.add(toggle_pivot);

    const pivot_cap_front = new THREE.Mesh(pivot_capGeom, chromeMat);
    pivot_cap_front.name = prefix + "_pivot_cap_front";
    pivot_cap_front.rotation.z = Math.PI / 2;
    pivot_cap_front.position.set(0.145, 0, 0.07);
    toggle.add(pivot_cap_front);

    const pivot_cap_rear = new THREE.Mesh(pivot_capGeom, chromeMat);
    pivot_cap_rear.name = prefix + "_pivot_cap_rear";
    pivot_cap_rear.rotation.z = Math.PI / 2;
    pivot_cap_rear.position.set(-0.145, 0, 0.07);
    toggle.add(pivot_cap_rear);

    const spring_slot = new THREE.Mesh(
      new THREE.BoxGeometry(0.055, 0.25, 0.018),
      darkMetalMat
    );
    spring_slot.name = prefix + "_spring_slot";
    spring_slot.position.set(0, 0, 0.158);
    toggle.add(spring_slot);

    return cufflink;
  }

  const left_cufflink = createCufflink("left_cufflink");
  left_cufflink.position.set(-0.95, 0.50, 0.12);
  left_cufflink.rotation.set(-0.18, -0.68, -0.08);
  root.add(left_cufflink);

  const right_cufflink = createCufflink("right_cufflink");
  right_cufflink.position.set(0.95, 0.50, 0.12);
  right_cufflink.rotation.set(-0.18, 0.68, 0.08);
  root.add(right_cufflink);

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