const fs = require('fs');
const content = fs.readFileSync('frontend/src/components/ScrollAnimation.tsx', 'utf8');

const returnIdx = content.indexOf('  return (\n    <div ref={containerRef} className="w-full h-screen');
if (returnIdx === -1) {
  console.error("Could not find return statement");
  process.exit(1);
}

const newReturn = `  return (
    <div ref={containerRef} className="w-full h-screen bg-[#f5f5f7] relative overflow-hidden flex flex-col justify-center items-center">
      {/* Light Mode Gradient */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#f5f5f7] via-[#f5f5f7]/80 to-transparent z-10 pointer-events-none"></div>

      {/* Floating Apple-Esque Text Overlay */}
      <div ref={textRef} className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20 w-full px-4 flex justify-center pointer-events-none">
        <div className="max-w-4xl w-full p-6 flex flex-col items-center text-center space-y-4">
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-[#0071e3] tracking-widest uppercase text-xs md:text-sm animate-pulse">
              Scroll to explore
            </span>
            <h1 className="text-5xl md:text-[4.5rem] font-bold text-[#1d1d1f] leading-[1.05] tracking-tight">
              The Future of <br/>
              <span className="text-[#86868b]">School Commutes.</span>
            </h1>
          </div>
          <p className="text-[#86868b] max-w-xl text-lg md:text-xl font-medium mt-4">
            Experience the next generation of student transport. Real-time tracking, AI-optimized routing, and absolute safety.
          </p>
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-multiply"></canvas>
    </div>
  );
}
`;

const newContent = content.substring(0, returnIdx) + newReturn;
fs.writeFileSync('frontend/src/components/ScrollAnimation.tsx', newContent);
console.log("Updated ScrollAnimation for Light Mode");
