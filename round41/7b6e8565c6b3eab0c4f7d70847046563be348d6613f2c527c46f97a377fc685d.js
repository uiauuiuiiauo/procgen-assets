export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "sailboat_emblem";

  const sail_assembly = new THREE.Group();
  sail_assembly.name = "sail_assembly";
  root.add(sail_assembly);

  const hull_assembly = new THREE.Group();
  hull_assembly.name = "hull_assembly";
  root.add(hull_assembly);

  const navyMat = new THREE.MeshStandardMaterial({
    color: 0x173778,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const darkNavyMat = new THREE.MeshStandardMaterial({
    color: 0x0d285e,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f4,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  function makeShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return shape;
  }

  function makeExtrudedGeometry(points, depth, bevelSize) {
    const options = bevelSize > 0
      ? {
          depth,
          steps: 1,
          bevelEnabled: true,
          bevelThickness: bevelSize,
          bevelSize,
          bevelSegments: 2,
        }
      : {
          depth,
          steps: 1,
          bevelEnabled: false,
        };
    return new THREE.ExtrudeGeometry(makeShape(points), options);
  }

  const left_sailGeom = makeExtrudedGeometry([
    [-0.035, 0.12],
    [-1.28, 0.12],
    [-0.035, 2.50],
  ], 0.055, 0.004);
  const left_sail = new THREE.Mesh(left_sailGeom, navyMat);
  left_sail.name = "left_sail";
  left_sail.position.z = -0.0275;
  sail_assembly.add(left_sail);

  const right_sailGeom = makeExtrudedGeometry([
    [0.035, 0.12],
    [0.035, 2.68],
    [0.14, 2.70],
    [1.29, 0.12],
  ], 0.055, 0.004);
  const right_sail = new THREE.Mesh(right_sailGeom, navyMat);
  right_sail.name = "right_sail";
  right_sail.position.z = -0.0275;
  sail_assembly.add(right_sail);

  const right_sail_upper_foldGeom = makeExtrudedGeometry([
    [0.043, 0.14],
    [0.043, 2.675],
    [0.080, 2.66],
    [0.080, 0.14],
  ], 0.006, 0);
  const right_sail_upper_fold = new THREE.Mesh(
    right_sail_upper_foldGeom,
    darkNavyMat
  );
  right_sail_upper_fold.name = "right_sail_upper_fold";
  right_sail_upper_fold.position.z = 0.031;
  sail_assembly.add(right_sail_upper_fold);

  const upper_white_stripeShape = new THREE.Shape();
  upper_white_stripeShape.moveTo(0.045, 1.56);
  upper_white_stripeShape.lineTo(0.045, 1.31);
  upper_white_stripeShape.bezierCurveTo(
    0.42, 1.05,
    0.82, 0.58,
    1.18, 0.15
  );
  upper_white_stripeShape.lineTo(1.35, 0.15);
  upper_white_stripeShape.bezierCurveTo(
    0.98, 0.68,
    0.50, 1.30,
    0.045, 1.56
  );
  upper_white_stripeShape.closePath();

  const upper_white_stripeGeom = new THREE.ExtrudeGeometry(
    upper_white_stripeShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: false,
    }
  );
  const upper_white_stripe = new THREE.Mesh(
    upper_white_stripeGeom,
    whiteMat
  );
  upper_white_stripe.name = "upper_white_stripe";
  upper_white_stripe.position.z = 0.033;
  sail_assembly.add(upper_white_stripe);

  const lower_white_stripeShape = new THREE.Shape();
  lower_white_stripeShape.moveTo(0.045, 0.98);
  lower_white_stripeShape.lineTo(0.045, 0.70);
  lower_white_stripeShape.bezierCurveTo(
    0.30, 0.50,
    0.52, 0.30,
    0.68, 0.15
  );
  lower_white_stripeShape.lineTo(0.83, 0.15);
  lower_white_stripeShape.bezierCurveTo(
    0.66, 0.36,
    0.39, 0.68,
    0.045, 0.98
  );
  lower_white_stripeShape.closePath();

  const lower_white_stripeGeom = new THREE.ExtrudeGeometry(
    lower_white_stripeShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: false,
    }
  );
  const lower_white_stripe = new THREE.Mesh(
    lower_white_stripeGeom,
    whiteMat
  );
  lower_white_stripe.name = "lower_white_stripe";
  lower_white_stripe.position.z = 0.034;
  sail_assembly.add(lower_white_stripe);

  const mastGeom = makeExtrudedGeometry([
    [-0.030, 0.12],
    [0.030, 0.12],
    [0.030, 2.68],
    [-0.015, 2.68],
    [-0.030, 2.50],
  ], 0.022, 0.002);
  const mast = new THREE.Mesh(mastGeom, darkNavyMat);
  mast.name = "mast";
  mast.position.z = 0.038;
  sail_assembly.add(mast);

  const right_sail_leechGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.14, 2.70, 0.047),
      new THREE.Vector3(1.29, 0.12, 0.047)
    ),
    8,
    0.009,
    6,
    false
  );
  const right_sail_leech = new THREE.Mesh(
    right_sail_leechGeom,
    darkNavyMat
  );
  right_sail_leech.name = "right_sail_leech";
  sail_assembly.add(right_sail_leech);

  const left_sail_footGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-1.28, 0.12, 0.043),
      new THREE.Vector3(-0.035, 0.12, 0.043)
    ),
    6,
    0.007,
    6,
    false
  );
  const left_sail_foot = new THREE.Mesh(left_sail_footGeom, darkNavyMat);
  left_sail_foot.name = "left_sail_foot";
  sail_assembly.add(left_sail_foot);

  const hullGeom = makeExtrudedGeometry([
    [-1.43, -0.06],
    [-1.39, 0.05],
    [1.43, 0.05],
    [1.43, -0.06],
  ], 0.070, 0.004);
  const hull = new THREE.Mesh(hullGeom, navyMat);
  hull.name = "hull";
  hull.position.z = -0.035;
  hull_assembly.add(hull);

  const deck_trimGeom = makeExtrudedGeometry([
    [-1.39, 0.045],
    [-1.31, 0.105],
    [1.36, 0.105],
    [1.40, 0.045],
  ], 0.012, 0);
  const deck_trim = new THREE.Mesh(deck_trimGeom, darkNavyMat);
  deck_trim.name = "deck_trim";
  deck_trim.position.z = 0.038;
  hull_assembly.add(deck_trim);

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