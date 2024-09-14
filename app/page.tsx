"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Navbar from "@/components/Navbar";
import { OBJLoader } from 'three-stdlib';
import { Lexend_Deca, Roboto, Cabin, Poppins } from 'next/font/google'


// Import Image
import BrandEdintityImage from "@/public/assets/img/brand_identity.jpg"
import DigitalAgencyImage from "@/public/assets/img/digital_agency.jpg"
import ModelAgency from "@/public/assets/img/modelAgency.jpg"

const LexendDeca = Lexend_Deca ({
  weight: '600',
  subsets: ['latin']
})

const RobotoFont = Roboto ({
  weight: '400',
  subsets: ['latin']
})

const CabinFont = Cabin ({
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const objectRef = useRef<THREE.Object3D | null>(null); // Reference for the 3D object
  const rotationYRef = useRef(0); // To store the Y rotation value independently of scroll event

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2).normalize();
    scene.add(directionalLight);

    // Load 3D Object
    const loader = new OBJLoader();
    loader.load('/assets/img/Logo_Ecoute.obj', (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhongMaterial({
            color: 0x9986BD, // Hex color #9986BD
            shininess: 100,  // Glossy effect
            specular: 0xaaaaaa, // Reflection highlights
          });
        }
      });
      objectRef.current = object;
      scene.add(object);
    });

    // Adjust camera position based on screen size
    const adjustCameraPosition = () => {
      if (window.innerWidth < 768) {
        // Mobile screen: move camera closer (but keep it fixed in z-axis)
        camera.position.z = 6;  // Set a fixed z-distance for mobile
      } else {
        // Desktop screen: default camera position
        camera.position.z = 5;
      }
    };

    adjustCameraPosition(); // Call the function on initial render

    // Update camera position on window resize
    window.addEventListener('resize', adjustCameraPosition);

    // Scroll listener for object rotation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotationSpeed = window.innerWidth < 768 ? 0.02 : 0.05; // Slower rotation on mobile

      // Adjust the Y rotation value based on scrollY, no scale or zoom
      if (objectRef.current) {
        rotationYRef.current = scrollY * rotationSpeed;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate); // Continuously request new animation frames

      if (objectRef.current) {
        // Apply rotation only, no scaling or zooming
        objectRef.current.rotation.y = rotationYRef.current;
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Grid layout for 3D Object and Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* 3D Object Section (Left) */}
        <div className="flex flex-col items-center justify-center relative">
          <canvas ref={canvasRef} className="w-full h-full"></canvas> {/* Canvas for 3D Model */}
          
         {/* Text Below Canvas */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center mb-4 md:bottom-10 md:left-auto md:w-auto md:ml-14">
            <p className={`text-base text-[#9986BD] font-light text-center md:text-right ${CabinFont.className}`}>
              TRANSFORMING IDEAS <br />
              INTO IMPACTFUL <br />
              VISUAL
            </p>
          </div>
        </div>

        {/* Text Content Section (Right) */}
        <div className="flex flex-col justify-center space-y-2 text-center md:text-right pt-10 md:mr-48 md:pt-40">
          <h2 className={`text-xl uppercase text-[#9986BD] ${RobotoFont.className} font-bold`}>GET IN TOUCH</h2>
          <h1 className={`text-8xl font-bold leading-[80px] text-white ${LexendDeca.className} font-bold`}>
            Your Voice,<br />
            Our
            <br />
            <span className='text-8xl'>Priority</span>
          </h1>
          <p className={`text-lg pt-3 font-light text-[#9986BD] ${CabinFont.className}`}>
            Listen - Connect - Evolve
          </p>
        </div>
      </div>

      {/* Discover What We Do */}
      <div className='grid md:grid-cols-2 pt-28 md:mx-40 md:py-20'>
        <div>
          <h1 className={`text-[#9986BD] text-5xl ${LexendDeca.className} md:mr-44`}>Discover What <br /> We Do</h1>
          <div className={`${CabinFont.className}`}>
            <h1 className='mr-44 mt-8'> <span className='font-bold'>Brand Digital</span>  adalah divisi yang bertanggung jawab untuk mengelola dan memperkuat kehadiran merek di ruang digital, melalui strategi yang terukur, inovatif, dan berfokus pada kebutuhan konsumen. Divisi ini memastikan bahwa setiap aspek dari identitas merek tercermin dengan konsisten di berbagai platform digital, baik itu melalui media sosial, website, maupun kampanye digital lainnya.</h1>
            <h1 className='mr-44 mt-8'> <span className='font-bold'>Brand Digital</span>  adalah divisi yang bertanggung jawab untuk mengelola dan memperkuat kehadiran merek di ruang digital, melalui strategi yang terukur, inovatif, dan berfokus pada kebutuhan konsumen. Divisi ini memastikan bahwa setiap aspek dari identitas merek tercermin dengan konsisten di berbagai platform digital, baik itu melalui media sosial, website, maupun kampanye digital lainnya.</h1>
            <h1 className='mr-44 mt-8'> <span className='font-bold'>Brand Digital</span>  adalah divisi yang bertanggung jawab untuk mengelola dan memperkuat kehadiran merek di ruang digital, melalui strategi yang terukur, inovatif, dan berfokus pada kebutuhan konsumen. Divisi ini memastikan bahwa setiap aspek dari identitas merek tercermin dengan konsisten di berbagai platform digital, baik itu melalui media sosial, website, maupun kampanye digital lainnya.</h1>
          </div>
          
        </div>

        <div className={`${LexendDeca.className}`}>
          <div className='relative w-[600px] h-60 mt-5'>
            {/* Overlay yang lebih gelap untuk background image */}
            <div
              className='absolute inset-0 bg-black opacity-30 hover:opacity-80 rounded-lg transition-opacity duration-300'
              style={{ backgroundImage: `url('${BrandEdintityImage.src}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
            ></div>

            {/* Teks yang diposisikan di tengah secara horizontal dan vertikal */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <h1 className={`${LexendDeca.className} text-2xl text-white text-center`}>Brand Digital</h1>
            </div>
          </div>

          <div className='relative w-[600px] h-60 mt-5'>
            {/* Overlay yang lebih gelap untuk background image */}
            <div
              className='absolute inset-0 bg-black opacity-50 hover:opacity-80 rounded-lg transition-opacity duration-300'
              style={{ backgroundImage: `url('${DigitalAgencyImage.src}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
            ></div>

            {/* Teks yang diposisikan di tengah secara horizontal dan vertikal */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <h1 className={`${LexendDeca.className} text-2xl text-white text-center`}>Digital Agency</h1>
            </div>
          </div>

          <div className='relative w-[600px] h-60 mt-5'>
            {/* Overlay yang lebih gelap untuk background image */}
            <div
              className='absolute inset-0 bg-black opacity-50 hover:opacity-80 rounded-lg transition-opacity duration-300'
              style={{ backgroundImage: `url('${ModelAgency.src}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
            ></div>

            {/* Teks yang diposisikan di tengah secara horizontal dan vertikal */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <h1 className={`${LexendDeca.className} text-2xl text-white text-center`}>Model Agency</h1>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}
