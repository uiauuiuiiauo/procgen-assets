export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "precision_tweezers";

  const tweezers = new THREE.Group();
  tweezers.name = "tweezers_assembly";
  root.add(tweezers);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.25,
  });

  function createArmGeometry() {
    const sections = [
      { x: -3.45, cz: -0.012, ht: 0.012, hw: 0.035 },
      { x: -3.15, cz: -0.002, ht: 0.018, hw: 0.052 },
      { x: -2.55, cz:  0.012, ht: 0.028, hw: 0.075 },
      { x: -1.55, cz:  0.030, ht: 0.045, hw: 0.105 },
      { x: -0.70, cz:  0.045, ht: 0.055, hw: 0.125 },
      { x:  0.00, cz:  0.050, ht: 0.060, hw: 0.140 },
      { x:  1.20, cz:  0.052, ht: 0.065, hw: 0.150 },
      { x:  2.40, cz:  0.052, ht: 0.067, hw: 0.155 },
      { x:  3.10, cz:  0.052, ht: 0.067, hw: 0.155 },
      { x:  3.24, cz:  0.052, ht: 0.064, hw: 0.151 },
      { x:  3.33, cz:  0.052, ht: 0.052, hw: 0.140 },
      { x:  3.38, cz:  0.052, ht: 0.030, hw: 0.125 },
    ];

    const ring = [
      [-0.65,  1.00],
      [ 0.65,  1.00],
      [ 0.92,  0.72],
      [ 1.00,  0.00],
      [ 0.92, -0.72],
      [ 0.65, -1.00],
      [-0.65, -1.00],
      [-0.92, -0.72],
      [-1.00,  0.00],
      [-0.92,  0.72],
    ];

    const positions = [];
    const indices = [];
    const ringCount = ring.length;

    for (const section of sections) {
      for (const point of ring) {
        positions.push(
          section.x,
          section.cz + point[1] * section.ht,
          point[0] * section.hw
        );
      }
    }

    for (let i = 0; i < sections.length - 1; i++) {
      for (let j = 0; j < ringCount; j++) {
        const next = (j + 1) % ringCount;
        const a = i * ringCount + j;
        const b = i * ringCount + next;
        const c = (i + 1) * ringCount + next;
        const d = (i + 1) * ringCount + j;
        indices.push(a, b, c, a, c, d);
      }
    }

    const leftCenter = positions.length / 3;
    positions.push(sections[0].x, sections[0].cz, 0);
    for (let j = 0; j < ringCount; j++) {
      indices.push(leftCenter, (j + 1) % ringCount, j);
    }

    const rightCenter = positions.length / 3;
    const last = sections[sections.length - 1];
    positions.push(last.x, last.cz, 0);
    const rightStart = (sections.length - 1) * ringCount;
    for (let j = 0; j < ringCount; j++) {
      indices.push(
        rightCenter,
        rightStart + j,
        rightStart + (j + 1) % ringCount
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const upper_armGeom = createArmGeometry();
  const upper_armMat = silverMat;
  const upper_arm = new THREE.Mesh(upper_armGeom, upper_armMat);
  upper_arm.name = "upper_arm";
  tweezers.add(upper_arm);

  const lower_armGeom = upper_armGeom;
  const lower_armMat = silverMat;
  const lower_arm = new THREE.Mesh(lower_armGeom, lower_armMat);
  lower_arm.name = "lower_arm";
  lower_arm.scale.set(1, -0.82, 0.72);
  tweezers.add(lower_arm);

  const upper_edgePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-3.18, 0.018, 0.000),
      new THREE.Vector3(-2.55, 0.045, 0.000),
      new THREE.Vector3(-1.55, 0.078, 0.000),
      new THREE.Vector3(-0.70, 0.102, 0.000),
      new THREE.Vector3( 0.00, 0.112, 0.000),
      new THREE.Vector3( 1.20, 0.118, 0.000),
      new THREE.Vector3( 2.40, 0.120, 0.000),
      new THREE.Vector3( 3.10, 0.120, 0.000),
      new THREE.Vector3( 3.30, 0.100, 0.000),
    ],
    false,
    "centripetal"
  );
  const upper_edgeGeom = new THREE.TubeGeometry(
    upper_edgePath,
    48,
    0.004,
    6,
    false
  );
  const upper_edgeMat = polishedMat;
  const upper_edge = new THREE.Mesh(upper_edgeGeom, upper_edgeMat);
  upper_edge.name = "upper_edge";
  tweezers.add(upper_edge);

  const center_seamPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-3.28, -0.004, 0.038),
      new THREE.Vector3(-2.55, -0.010, 0.058),
      new THREE.Vector3(-1.55, -0.020, 0.078),
      new THREE.Vector3(-0.70, -0.027, 0.092),
      new THREE.Vector3( 0.00, -0.030, 0.103),
      new THREE.Vector3( 1.20, -0.032, 0.110),
      new THREE.Vector3( 2.40, -0.033, 0.113),
      new THREE.Vector3( 3.10, -0.033, 0.113),
      new THREE.Vector3( 3.30, -0.030, 0.105),
    ],
    false,
    "centripetal"
  );
  const center_seamGeom = new THREE.TubeGeometry(
    center_seamPath,
    48,
    0.006,
    6,
    false
  );
  const center_seamMat = seamMat;
  const center_seam = new THREE.Mesh(center_seamGeom, center_seamMat);
  center_seam.name = "center_seam";
  tweezers.add(center_seam);

  fitToUnitCube(THREE, root);
  return root;

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
}