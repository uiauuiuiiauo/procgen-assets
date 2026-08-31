export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "stone_pyramid";

  const pyramid_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf3ecd8,
    metalness: 0.0,
    roughness: 0.9,
    flatShading: true,
  });

  const baseHalf = 0.65;
  const pyramidHeight = 1.18;
  const bodyTopY = pyramidHeight;
  const slope = baseHalf / pyramidHeight;

  const pyramid_bodyGeom = new THREE.ConeGeometry(
    baseHalf * Math.sqrt(2),
    pyramidHeight,
    4,
    1,
    false
  );
  const pyramid_body = new THREE.Mesh(pyramid_bodyGeom, pyramid_bodyMat);
  pyramid_body.name = "pyramid_body";
  pyramid_body.rotation.y = Math.PI / 4;
  pyramid_body.position.y = pyramidHeight / 2;
  root.add(pyramid_body);

  const surface_details = new THREE.Group();
  surface_details.name = "surface_details";
  root.add(surface_details);

  const surface_speckles_darkMat = new THREE.MeshStandardMaterial({
    color: 0x5d5548,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const surface_speckles_brownMat = new THREE.MeshStandardMaterial({
    color: 0x9b7650,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const surface_speckles_grayMat = new THREE.MeshStandardMaterial({
    color: 0x89877f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const surface_speckles_tanMat = new THREE.MeshStandardMaterial({
    color: 0xc2a77d,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const surface_speckles_darkGeom = new THREE.CircleGeometry(0.006, 7);
  const surface_speckles_brownGeom = new THREE.CircleGeometry(0.011, 8);
  const surface_speckles_grayGeom = new THREE.CircleGeometry(0.014, 7);
  const surface_speckles_tanGeom = new THREE.CircleGeometry(0.019, 9);

  const surface_speckles_dark = new THREE.InstancedMesh(
    surface_speckles_darkGeom,
    surface_speckles_darkMat,
    240
  );
  surface_speckles_dark.name = "surface_speckles_dark";

  const surface_speckles_brown = new THREE.InstancedMesh(
    surface_speckles_brownGeom,
    surface_speckles_brownMat,
    120
  );
  surface_speckles_brown.name = "surface_speckles_brown";

  const surface_speckles_gray = new THREE.InstancedMesh(
    surface_speckles_grayGeom,
    surface_speckles_grayMat,
    100
  );
  surface_speckles_gray.name = "surface_speckles_gray";

  const surface_speckles_tan = new THREE.InstancedMesh(
    surface_speckles_tanGeom,
    surface_speckles_tanMat,
    60
  );
  surface_speckles_tan.name = "surface_speckles_tan";

  const faceNormals = [
    new THREE.Vector3(0, slope, 1).normalize(),
    new THREE.Vector3(1, slope, 0).normalize(),
    new THREE.Vector3(0, slope, -1).normalize(),
    new THREE.Vector3(-1, slope, 0).normalize(),
  ];
  const decalForward = new THREE.Vector3(0, 0, 1);
  const speckleDummy = new THREE.Object3D();

  function populateSpeckles(mesh, count, offset, baseScale) {
    for (let i = 0; i < count; i++) {
      const face = (i * 3 + offset) % 4;
      const levelIndex = (i * 17 + offset * 7) % 37;
      const uIndex = (i * 23 + offset * 11) % 41;
      const y = 0.055 + (levelIndex / 36) * 1.055;
      const halfWidth = baseHalf * (1 - y / pyramidHeight);
      const u = ((uIndex / 40) * 2 - 1) * halfWidth * 0.88;
      const faceNormal = faceNormals[face];

      let x = 0;
      let z = 0;
      if (face === 0) {
        x = u;
        z = halfWidth;
      } else if (face === 1) {
        x = halfWidth;
        z = -u;
      } else if (face === 2) {
        x = -u;
        z = -halfWidth;
      } else {
        x = -halfWidth;
        z = u;
      }

      const widthScale = baseScale * (0.55 + ((i * 5 + offset) % 9) * 0.1);
      const heightScale = baseScale * (0.22 + ((i * 7 + offset) % 7) * 0.065);

      speckleDummy.position.set(x, y, z).addScaledVector(faceNormal, 0.003);
      speckleDummy.quaternion.setFromUnitVectors(decalForward, faceNormal);
      speckleDummy.rotateZ(((i * 13 + offset) % 17) * 0.31);
      speckleDummy.scale.set(widthScale, heightScale, 1);
      speckleDummy.updateMatrix();
      mesh.setMatrixAt(i, speckleDummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  populateSpeckles(surface_speckles_dark, 240, 3, 1.15);
  populateSpeckles(surface_speckles_brown, 120, 7, 0.9);
  populateSpeckles(surface_speckles_gray, 100, 11, 0.8);
  populateSpeckles(surface_speckles_tan, 60, 17, 0.85);

  surface_details.add(
    surface_speckles_dark,
    surface_speckles_brown,
    surface_speckles_gray,
    surface_speckles_tan
  );

  const mineral_veins = new THREE.Group();
  mineral_veins.name = "mineral_veins";
  surface_details.add(mineral_veins);

  const mineral_vein_brownMat = new THREE.MeshStandardMaterial({
    color: 0x8f6742,
    metalness: 0.0,
    roughness: 0.9,
  });
  const mineral_vein_grayMat = new THREE.MeshStandardMaterial({
    color: 0x77766f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const mineral_vein_tanMat = new THREE.MeshStandardMaterial({
    color: 0xb99b70,
    metalness: 0.0,
    roughness: 0.9,
  });

  function surfacePoint(face, u, y, offset) {
    const halfWidth = baseHalf * (1 - y / pyramidHeight);
    const faceNormal = faceNormals[face];
    let point;

    if (face === 0) {
      point = new THREE.Vector3(u, y, halfWidth);
    } else if (face === 1) {
      point = new THREE.Vector3(halfWidth, y, -u);
    } else if (face === 2) {
      point = new THREE.Vector3(-u, y, -halfWidth);
    } else {
      point = new THREE.Vector3(-halfWidth, y, u);
    }
    return point.addScaledVector(faceNormal, offset);
  }

  function addVein(name, face, coordinates, radius, material) {
    const points = [];
    for (const coordinate of coordinates) {
      points.push(surfacePoint(face, coordinate[0], coordinate[1], 0.003));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 18, radius, 5, false);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mineral_veins.add(mesh);
    return mesh;
  }

  const front_lower_vein = addVein(
    "front_lower_vein",
    0,
    [
      [-0.43, 0.13],
      [-0.35, 0.18],
      [-0.28, 0.23],
      [-0.18, 0.28],
      [-0.07, 0.31],
    ],
    0.0022,
    mineral_vein_brownMat
  );

  const front_lower_branch = addVein(
    "front_lower_branch",
    0,
    [
      [-0.28, 0.23],
      [-0.31, 0.30],
      [-0.27, 0.36],
    ],
    0.0014,
    mineral_vein_tanMat
  );

  const front_middle_vein = addVein(
    "front_middle_vein",
    0,
    [
      [0.34, 0.39],
      [0.27, 0.43],
      [0.20, 0.49],
      [0.10, 0.54],
    ],
    0.0016,
    mineral_vein_grayMat
  );

  const front_upper_vein = addVein(
    "front_upper_vein",
    0,
    [
      [-0.20, 0.66],
      [-0.14, 0.72],
      [-0.09, 0.79],
      [-0.03, 0.84],
    ],
    0.0012,
    mineral_vein_grayMat
  );

  const right_long_vein = addVein(
    "right_long_vein",
    1,
    [
      [-0.42, 0.14],
      [-0.34, 0.20],
      [-0.25, 0.27],
      [-0.13, 0.32],
      [-0.02, 0.35],
    ],
    0.0021,
    mineral_vein_brownMat
  );

  const right_middle_vein = addVein(
    "right_middle_vein",
    1,
    [
      [0.36, 0.43],
      [0.28, 0.48],
      [0.19, 0.54],
      [0.08, 0.58],
    ],
    0.0015,
    mineral_vein_tanMat
  );

  const right_upper_vein = addVein(
    "right_upper_vein",
    1,
    [
      [-0.19, 0.68],
      [-0.13, 0.75],
      [-0.07, 0.82],
      [-0.02, 0.89],
    ],
    0.0011,
    mineral_vein_grayMat
  );

  const left_lower_vein = addVein(
    "left_lower_vein",
    3,
    [
      [-0.36, 0.16],
      [-0.28, 0.21],
      [-0.20, 0.25],
      [-0.11, 0.31],
    ],
    0.0016,
    mineral_vein_grayMat
  );

  const left_upper_vein = addVein(
    "left_upper_vein",
    3,
    [
      [0.27, 0.57],
      [0.19, 0.63],
      [0.12, 0.70],
      [0.05, 0.76],
    ],
    0.0012,
    mineral_vein_brownMat
  );

  const rear_vein = addVein(
    "rear_vein",
    2,
    [
      [-0.31, 0.24],
      [-0.23, 0.29],
      [-0.15, 0.35],
      [-0.05, 0.40],
    ],
    0.0014,
    mineral_vein_tanMat
  );

  const mineral_veinMat = new THREE.MeshStandardMaterial({
    color: 0x9a8b78,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const lower_mineral_patchGeom = new THREE.CircleGeometry(0.045, 7);
  const lower_mineral_patch = new THREE.Mesh(
    lower_mineral_patchGeom,
    mineral_veinMat
  );
  lower_mineral_patch.name = "lower_mineral_patch";
  lower_mineral_patch.position.copy(surfacePoint(0, -0.24, 0.14, 0.0035));
  lower_mineral_patch.quaternion.setFromUnitVectors(
    decalForward,
    faceNormals[0]
  );
  lower_mineral_patch.rotateZ(-0.35);
  lower_mineral_patch.scale.set(1.25, 0.55, 1);
  surface_details.add(lower_mineral_patch);

  const middle_mineral_patchGeom = new THREE.CircleGeometry(0.034, 7);
  const middle_mineral_patch = new THREE.Mesh(
    middle_mineral_patchGeom,
    mineral_veinMat
  );
  middle_mineral_patch.name = "middle_mineral_patch";
  middle_mineral_patch.position.copy(surfacePoint(1, 0.18, 0.47, 0.0035));
  middle_mineral_patch.quaternion.setFromUnitVectors(
    decalForward,
    faceNormals[1]
  );
  middle_mineral_patch.rotateZ(0.48);
  middle_mineral_patch.scale.set(1.1, 0.42, 1);
  surface_details.add(middle_mineral_patch);

  const upper_mineral_patchGeom = new THREE.CircleGeometry(0.025, 6);
  const upper_mineral_patch = new THREE.Mesh(
    upper_mineral_patchGeom,
    mineral_veinMat
  );
  upper_mineral_patch.name = "upper_mineral_patch";
  upper_mineral_patch.position.copy(surfacePoint(0, 0.12, 0.72, 0.0035));
  upper_mineral_patch.quaternion.setFromUnitVectors(
    decalForward,
    faceNormals[0]
  );
  upper_mineral_patch.rotateZ(-0.2);
  upper_mineral_patch.scale.set(1.3, 0.4, 1);
  surface_details.add(upper_mineral_patch);

  const apex_roundingGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const apex_rounding = new THREE.Mesh(apex_roundingGeom, pyramid_bodyMat);
  apex_rounding.name = "apex_rounding";
  apex_rounding.position.set(0, bodyTopY - 0.003, 0);
  apex_rounding.scale.set(0.78, 1.15, 0.78);
  root.add(apex_rounding);

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