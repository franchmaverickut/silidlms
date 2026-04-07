import { useEffect, useRef, useState } from "react";
import { Move3d, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

export default function STLViewer({ url, height = 320, className = "" }) {
  const mountRef = useRef(null);
  const sceneRef = useRef({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url || !mountRef.current) return;

    let animId;
    let renderer;
    const el = mountRef.current;
    const w = el.clientWidth || 400;
    const h = height;

    setLoading(true);
    setError(null);

    const setup = async () => {
      const THREE = await import("three");
      const { STLLoader } = await import("three/examples/jsm/loaders/STLLoader.js");

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xdfe3e8);

      // Camera
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 100000);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir1 = new THREE.DirectionalLight(0xffffff, 0.9);
      dir1.position.set(5, 10, 7);
      scene.add(dir1);
      const dir2 = new THREE.DirectionalLight(0xffc87c, 0.3);
      dir2.position.set(-5, -5, -5);
      scene.add(dir2);

      // Grid
      const grid = new THREE.GridHelper(200, 40, 0xcccccc, 0xdddddd);
      scene.add(grid);

      // Orbit state
      let spherical = { theta: 0.5, phi: 1.1, radius: 100 };
      let target = new THREE.Vector3(0, 0, 0);
      let isDragging = false;
      let isRightDrag = false;
      let lastMouse = { x: 0, y: 0 };

      const updateCamera = () => {
        camera.position.set(
          target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta),
          target.y + spherical.radius * Math.cos(spherical.phi),
          target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
        );
        camera.lookAt(target);
      };
      updateCamera();

      const onMouseDown = (e) => { isDragging = true; isRightDrag = e.button === 2; lastMouse = { x: e.clientX, y: e.clientY }; };
      const onMouseMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastMouse.x;
        const dy = e.clientY - lastMouse.y;
        lastMouse = { x: e.clientX, y: e.clientY };
        if (isRightDrag) {
          const speed = 0.003 * spherical.radius;
          const right = new THREE.Vector3().crossVectors(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3().subVectors(camera.position, target).normalize()
          ).normalize();
          target.addScaledVector(right, dx * speed);
          target.y += dy * speed;
        } else {
          spherical.theta -= dx * 0.008;
          spherical.phi = Math.max(0.05, Math.min(Math.PI - 0.05, spherical.phi - dy * 0.008));
        }
        updateCamera();
      };
      const onMouseUp = () => { isDragging = false; };
      const onWheel = (e) => {
        e.preventDefault();
        spherical.radius = Math.max(1, spherical.radius * (1 + e.deltaY * 0.001));
        updateCamera();
      };
      const onContextMenu = (e) => e.preventDefault();

      el.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      el.addEventListener("wheel", onWheel, { passive: false });
      el.addEventListener("contextmenu", onContextMenu);

      // For GitHub/external URLs, route through our backend proxy to avoid CORS
      const needsProxy = url.includes("raw.githubusercontent.com") || url.includes("github.com");
      let loadUrl = url;
      if (needsProxy) {
        const res = await base44.functions.invoke("proxyStl", { url });
        const blob = new Blob([res.data], { type: "model/stl" });
        loadUrl = URL.createObjectURL(blob);
      }

      new STLLoader().load(
        loadUrl,
        (geometry) => {
          geometry.center();
          geometry.computeBoundingSphere();
          const r = geometry.boundingSphere.radius;
          spherical.radius = r * 3;
          grid.position.y = -(r * 0.9);
          target.set(0, 0, 0);
          updateCamera();

          const mat = new THREE.MeshPhongMaterial({ color: 0x888888, specular: 0xaaaaaa, shininess: 60 });
          const mesh = new THREE.Mesh(geometry, mat);
          scene.add(mesh);
          setLoading(false);
        },
        undefined,
        () => setError("Failed to load STL. Make sure the URL is publicly accessible.")
      );

      // Animate
      const animate = () => {
        animId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      sceneRef.current = { spherical, target, updateCamera };

      return () => {
        cancelAnimationFrame(animId);
        el.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        el.removeEventListener("wheel", onWheel);
        el.removeEventListener("contextmenu", onContextMenu);
        renderer.dispose();
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      };
    };

    let cleanup;
    setup().then(fn => { cleanup = fn; });

    return () => {
      if (cleanup) cleanup();
      else {
        cancelAnimationFrame(animId);
        if (renderer) {
          renderer.dispose();
          if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
        }
      }
    };
  }, [url, height]);

  const resetView = () => {
    const { spherical, target, updateCamera } = sceneRef.current;
    if (!updateCamera) return;
    target.set(0, 0, 0);
    spherical.theta = 0.5;
    spherical.phi = 1.1;
    updateCamera();
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-border/60 bg-[#dfe3e8] ${className}`} style={{ height }}>
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#dfe3e8]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground">Loading 3D model...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#dfe3e8]">
          <div className="text-center px-6">
            <Move3d className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{error}</p>
          </div>
        </div>
      )}
      <div ref={mountRef} className="w-full" style={{ height }} />
      {!loading && !error && (
        <>
          <div className="absolute bottom-3 right-3">
            <Button size="icon" variant="secondary" className="w-7 h-7 rounded-lg shadow-sm opacity-80 hover:opacity-100" onClick={resetView} title="Reset view">
              <RotateCcw size={12} />
            </Button>
          </div>
          <div className="absolute bottom-3 left-3 bg-black/30 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
            Drag to rotate • Scroll to zoom • Right-drag to pan
          </div>
        </>
      )}
    </div>
  );
}