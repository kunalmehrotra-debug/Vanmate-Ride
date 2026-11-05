const fs = require('fs');
const content = fs.readFileSync('frontend/src/app/page.tsx', 'utf8');
const startIdx = content.indexOf('      {/* ── STITCH HOW IT WORKS ── */}');
const endIdx = content.indexOf('    </div>', startIdx);
if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find boundaries");
  process.exit(1);
}

const newSections = `      {/* ── PREMIUM FEATURES ── */}
      <section className="py-24 relative overflow-hidden" id="how-it-works">
        <div className="absolute inset-0 bg-[#06060a]"></div>
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#a0a4a8] mb-6 tracking-tight">Transparent Reliability</h2>
            <p className="text-lg md:text-xl text-[#6b6b80] max-w-2xl mx-auto font-light">Seamless management from booking to drop-off, engineered for absolute peace of mind.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group rounded-[2rem] p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 border border-white/5 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-xl hover:shadow-[0_20px_40px_rgba(245,166,35,0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#f5a623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f5a623]/20 to-[#f5a623]/5 border border-[#f5a623]/30 flex items-center justify-center mb-8 relative z-10 shadow-[inset_0_0_20px_rgba(245,166,35,0.2)]">
                <span className="text-4xl drop-shadow-[0_0_10px_rgba(245,166,35,0.8)]">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Smart Booking</h3>
              <p className="text-[#a0a4a8] leading-relaxed relative z-10">Flexible scheduling for daily commutes or specific terms with just a few intuitive taps on your device.</p>
            </div>
            
            {/* Card 2 */}
            <div className="group rounded-[2rem] p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 border border-[#4fc3f7]/20 bg-gradient-to-b from-[#4fc3f7]/[0.08] to-transparent backdrop-blur-xl hover:shadow-[0_20px_40px_rgba(79,195,247,0.15)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#4fc3f7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4fc3f7]/20 blur-[50px] rounded-full group-hover:bg-[#4fc3f7]/30 transition-colors duration-500"></div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4fc3f7]/20 to-[#4fc3f7]/5 border border-[#4fc3f7]/30 flex items-center justify-center mb-8 relative z-10 shadow-[inset_0_0_20px_rgba(79,195,247,0.2)]">
                <span className="text-4xl drop-shadow-[0_0_10px_rgba(79,195,247,0.8)]">📍</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Live Tracking</h3>
              <p className="text-[#a0a4a8] leading-relaxed relative z-10">Military-grade GPS updates and push notifications ensure you know their exact location instantly.</p>
            </div>
            
            {/* Card 3 */}
            <div className="group rounded-[2rem] p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 border border-white/5 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-xl hover:shadow-[0_20px_40px_rgba(167,139,250,0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#a78bfa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a78bfa]/20 to-[#a78bfa]/5 border border-[#a78bfa]/30 flex items-center justify-center mb-8 relative z-10 shadow-[inset_0_0_20px_rgba(167,139,250,0.2)]">
                <span className="text-4xl drop-shadow-[0_0_10px_rgba(167,139,250,0.8)]">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Secure Handoff</h3>
              <p className="text-[#a0a4a8] leading-relaxed relative z-10">Strict verification protocols with educational institution personnel guarantee 100% safe drop-offs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREMIUM PRICING ── */}
      <section className="py-24 relative overflow-hidden" id="pricing">
        <div className="absolute inset-0 bg-[#0a0a0f]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(245,166,35,0.08)_0%,_transparent_70%)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#a0a4a8] mb-6 tracking-tight">Flexible Memberships</h2>
            <p className="text-lg md:text-xl text-[#6b6b80] max-w-2xl mx-auto font-light">Choose a premium schedule that effortlessly aligns with your family's dynamic lifestyle.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {/* Daily */}
            <div className="rounded-[2.5rem] p-10 flex flex-col border border-white/5 bg-white/[0.02] backdrop-blur-3xl h-full transition-all duration-300 hover:bg-white/[0.04]">
              <h3 className="text-2xl font-bold text-white mb-2">Daily Pass</h3>
              <div className="text-6xl font-black text-white mb-8 tracking-tight">$15<span className="text-xl text-[#6b6b80] font-medium tracking-normal">/day</span></div>
              <ul className="space-y-5 mb-10 text-[#a0a4a8] flex-1">
                <li className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">✓</div> One-off bookings</li>
                <li className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">✓</div> Standard support</li>
              </ul>
              <button className="w-full py-4 rounded-2xl font-bold text-white border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300">Select Daily</button>
            </div>
            
            {/* Monthly (Popular) */}
            <div className="rounded-[2.5rem] p-12 border border-[#f5a623]/40 relative transform lg:-translate-y-6 shadow-[0_30px_60px_rgba(245,166,35,0.15)] bg-gradient-to-b from-[#1a140a] to-[#0a0a0f] backdrop-blur-3xl h-full flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f5a623] to-[#e69000] text-[#1a1000] font-black text-xs px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(245,166,35,0.3)]">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-[#f5a623] mb-2">Monthly Prime</h3>
              <div className="text-7xl font-black text-white mb-8 tracking-tight">$250<span className="text-xl text-[#6b6b80] font-medium tracking-normal">/mo</span></div>
              <ul className="space-y-5 mb-10 text-white flex-1">
                <li className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-[#f5a623]/20 flex items-center justify-center text-[#f5a623] text-xs">✓</div> Guaranteed premium seat</li>
                <li className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-[#f5a623]/20 flex items-center justify-center text-[#f5a623] text-xs">✓</div> 24/7 Priority support</li>
                <li className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-[#f5a623]/20 flex items-center justify-center text-[#f5a623] text-xs">✓</div> Ultra-flexible changes</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#f5a623] to-[#e69000] py-4 rounded-2xl font-bold text-[#1a1000] hover:shadow-[0_0_25px_rgba(245,166,35,0.5)] hover:scale-[1.02] transition-all duration-300 mt-auto">Subscribe Monthly</button>
            </div>
            
            {/* Term */}
            <div className="rounded-[2.5rem] p-10 flex flex-col border border-white/5 bg-white/[0.02] backdrop-blur-3xl h-full transition-all duration-300 hover:bg-white/[0.04]">
              <h3 className="text-2xl font-bold text-white mb-2">Term Elite</h3>
              <div className="text-6xl font-black text-white mb-8 tracking-tight">$800<span className="text-xl text-[#6b6b80] font-medium tracking-normal">/term</span></div>
              <ul className="space-y-5 mb-10 text-[#a0a4a8] flex-1">
                <li className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">✓</div> Full term coverage</li>
                <li className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">✓</div> Dedicated driver</li>
              </ul>
              <button className="w-full py-4 rounded-2xl font-bold text-white border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 mt-auto">Select Term</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREMIUM FOOTER ── */}
      <footer className="w-full py-16 border-t border-white/10 bg-[#06060a] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#f5a623]/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-1 md:gap-2">
              <span className="text-3xl font-black tracking-tight text-[#f5a623]">Van</span>
              <span className="text-3xl font-black tracking-tight text-[#f0f0f8]">Mate</span>
            </Link>
            <p className="text-[#6b6b80] max-w-sm text-base leading-relaxed font-light">
              Architecting the future of school transport. Offering transparent reliability, elite fleets, and absolute safety for discerning parents globally.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm mb-2">Company</h4>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">About Us</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Careers</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm mb-2">Legal</h4>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Privacy Policy</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Terms of Service</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Cookie Policy</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm mb-2">Connect</h4>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#4fc3f7] transition-colors font-medium">Twitter</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#0077b5] transition-colors font-medium">LinkedIn</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#e1306c] transition-colors font-medium">Instagram</Link>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <div className="text-[#6b6b80] text-sm font-medium">
            © ${new Date().getFullYear()} VanMate Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[#6b6b80] text-sm font-medium">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div> Systems Operational</span>
          </div>
        </div>
      </footer>
`;

const newContent = content.substring(0, startIdx) + newSections + content.substring(endIdx);
fs.writeFileSync('frontend/src/app/page.tsx', newContent);
