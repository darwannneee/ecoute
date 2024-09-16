"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';
import { Lexend_Deca } from 'next/font/google';

// Import Image
import BrandEdintityImage from "@/public/assets/img/brand_identity.jpg";
import DigitalAgencyImage from "@/public/assets/img/digital_agency.jpg";
import ModelAgency from "@/public/assets/img/modelAgency.jpg";
import React from 'react';

const LexendDeca = Lexend_Deca({
  weight: '600',
  subsets: ['latin'],
});
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const objectRef = useRef<THREE.Object3D | null>(null); // Reference for the 3D object

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 1000);
    directionalLight.position.set(0, 0, 20).normalize();
    scene.add(directionalLight);

   // Load 3D Object
    const loader = new OBJLoader();
    loader.load('/assets/img/Logo_Ecoute.obj', (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x9986BD, // Hex color #9986BD
            metalness: 1,   // Fully metallic
            roughness: 0.05, // Adjust this value for reflection (0 = perfectly smooth, 1 = very rough)
            emissive: 0x0,  // No emissive lighting
            envMapIntensity: 1, // Environment reflection intensity
          });
        }
      });
      objectRef.current = object;
      object.position.set(0, 0, 0); // Set initial position of the object to the center
      scene.add(object);
    });

    // Adjust camera position based on screen size
    const adjustCameraPosition = () => {
      if (window.innerWidth < 768) {
        camera.position.z = 6;  // Set a fixed z-distance for mobile
      } else {
        camera.position.z = 5;
      }
    };

    adjustCameraPosition(); // Call the function on initial render

    // Update camera position on window resize
    window.addEventListener('resize', adjustCameraPosition);

    // Animation loop (continuous rotation)
    const animate = () => {
      requestAnimationFrame(animate); // Continuously request new animation frames

      if (objectRef.current) {
        objectRef.current.rotation.y += 0.005; // Continuous Y-axis rotation
        objectRef.current.scale.set(1, 1, 1); // Ensure scale is constant (no growing or shrinking)
      }

      // Render the scene continuously
      renderer.render(scene, camera);
    };

    animate(); // Start the animation loop

    // Resize listener
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="bg-black text-white h-screen">
      <div className="h-full">
        {/* 3D Object Section */}
        <div className="flex flex-col items-center justify-center relative h-full">
          <canvas ref={canvasRef} className="w-full h-full"></canvas> {/* Canvas for 3D Model */}
      
          {/* Text Below Canvas with full-width background and marquee effect */}
          <div className="absolute bottom-0 bg-[#9986BD] left-0 w-full flex justify-center items-center md:h-16 overflow-hidden">
            <div className="relative  w-full">
              <p className={`text-white text-2xl font-light px-4 ${LexendDeca.className}`} suppressHydrationWarning>
                {React.createElement('marquee', { direction: 'left' }, 'WEBSITE IS UNDER MAINTENANCE')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>  

  );
}
