const fs = require('fs');

const content = fs.readFileSync('frontend/src/app/page.tsx', 'utf8');

const startIdx = content.indexOf('      {/* ── PREMIUM FEATURES ── */}');
const endIdx = content.indexOf('    </div>\n  );\n}');

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find boundaries");
  process.exit(1);
}

const newSections = `      {/* ── STUNNING FEATURES ── */}
      <section className="py-32 relative overflow-hidden" id="how-it-works">
        {/* Deep background with glowing orbs */}
        <div className="absolute inset-0 bg-[#020205]"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4fc3f7]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#f5a623]/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-6 tracking-tight">Transparent Reliability</h2>
            <p className="text-xl md:text-2xl text-[#8a8a9a] max-w-3xl mx-auto font-light leading-relaxed">Engineered for peace of mind. A transit service combining technological precision with an uncompromising commitment to safety.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group rounded-[2rem] p-10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-4 border border-white/20 bg-white/5 backdrop-blur-2xl hover:bg-white/10 hover:border-white/40 hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center mb-8 relative z-10 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">📅</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">Smart Booking</h3>
              <p className="text-[#a0a4a8] text-lg leading-relaxed relative z-10">AI-optimized scheduling that adapts to your child's daily commute, ensuring the most efficient routes every single day.</p>
            </div>
            
            {/* Card 2 */}
            <div className="group rounded-[2rem] p-10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-4 border border-[#4fc3f7]/30 bg-[#4fc3f7]/10 backdrop-blur-2xl hover:bg-[#4fc3f7]/20 hover:border-[#4fc3f7]/60 hover:shadow-[0_20px_60px_rgba(79,195,247,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#4fc3f7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#4fc3f7]/30 to-[#4fc3f7]/10 border border-[#4fc3f7]/50 flex items-center justify-center mb-8 relative z-10 shadow-[inset_0_0_30px_rgba(79,195,247,0.3)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-5xl drop-shadow-[0_0_20px_rgba(79,195,247,1)]">📍</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">Live Tracking</h3>
              <p className="text-[#a0a4a8] text-lg leading-relaxed relative z-10">Real-time GPS updates delivered straight to your dashboard. Receive instant notifications instantly.</p>
            </div>
            
            {/* Card 3 */}
            <div className="group rounded-[2rem] p-10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-4 border border-[#10b981]/30 bg-[#10b981]/10 backdrop-blur-2xl hover:bg-[#10b981]/20 hover:border-[#10b981]/60 hover:shadow-[0_20px_60px_rgba(16,185,129,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#10b981]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#10b981]/30 to-[#10b981]/10 border border-[#10b981]/50 flex items-center justify-center mb-8 relative z-10 shadow-[inset_0_0_30px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-5xl drop-shadow-[0_0_20px_rgba(16,185,129,1)]">🛡️</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">Secure Handoff</h3>
              <p className="text-[#a0a4a8] text-lg leading-relaxed relative z-10">Rigorous, verified protocols with school personnel. Every transition is logged and authenticated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUNNING PRICING ── */}
      <section className="py-32 relative overflow-hidden" id="pricing">
        <div className="absolute inset-0 bg-[#020205]"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-6 tracking-tight">Flexible Memberships</h2>
            <p className="text-xl md:text-2xl text-[#8a8a9a] max-w-3xl mx-auto font-light leading-relaxed">Choose a premium schedule that effortlessly aligns with your family's dynamic lifestyle.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {/* Daily */}
            <div className="rounded-[2.5rem] p-12 flex flex-col border border-white/20 bg-white/5 backdrop-blur-3xl h-full transition-all duration-300 hover:bg-white/10 hover:border-white/40">
              <h4 className="text-lg font-bold text-[#8a8a9a] uppercase tracking-[0.2em] mb-4">Daily Pass</h4>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-7xl font-black text-white tracking-tight">$15</span>
                <span className="text-2xl text-[#6b6b80] font-medium">/day</span>
              </div>
              <ul className="space-y-6 mb-12 text-[#a0a4a8] text-lg flex-1">
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">✓</div> Single ride bookings</li>
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">✓</div> Standard support</li>
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">✓</div> Real-time tracking</li>
              </ul>
              <button className="w-full py-5 rounded-2xl font-bold text-lg text-white border-2 border-white/20 hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-300">Select Daily</button>
            </div>
            
            {/* Monthly (Most Popular - Ultra Glow) */}
            <div className="rounded-[2.5rem] p-14 border-2 border-[#f5a623] relative transform lg:-translate-y-8 shadow-[0_0_80px_rgba(245,166,35,0.3)] bg-gradient-to-b from-[#f5a623]/20 to-[#f5a623]/5 backdrop-blur-3xl h-full flex flex-col group overflow-hidden">
              <div className="absolute inset-0 bg-[#f5a623]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5a623]/30 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="absolute top-0 right-12 bg-gradient-to-r from-[#f5a623] to-[#ffb95f] text-black font-black text-sm px-6 py-2 rounded-b-xl uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(245,166,35,0.4)]">
                Most Popular
              </div>
              
              <h4 className="text-lg font-bold text-[#f5a623] uppercase tracking-[0.2em] mb-4 relative z-10">Monthly Prime</h4>
              <div className="flex items-baseline gap-2 mb-10 relative z-10">
                <span className="text-8xl font-black text-white tracking-tight">$250</span>
                <span className="text-2xl text-[#f5a623]/80 font-medium">/mo</span>
              </div>
              <ul className="space-y-6 mb-12 text-white text-lg flex-1 relative z-10">
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-[#f5a623] flex items-center justify-center text-black font-bold">✓</div> Guaranteed premium seat</li>
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-[#f5a623] flex items-center justify-center text-black font-bold">✓</div> 24/7 Priority support</li>
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-[#f5a623] flex items-center justify-center text-black font-bold">✓</div> Flexible changes</li>
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-[#f5a623] flex items-center justify-center text-black font-bold">✓</div> Multi-kid discount</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#f5a623] to-[#ffb95f] py-5 rounded-2xl font-black text-lg text-black hover:shadow-[0_0_40px_rgba(245,166,35,0.8)] hover:scale-[1.03] transition-all duration-300 mt-auto relative z-10">Subscribe Monthly</button>
            </div>
            
            {/* Term */}
            <div className="rounded-[2.5rem] p-12 flex flex-col border border-white/20 bg-white/5 backdrop-blur-3xl h-full transition-all duration-300 hover:bg-white/10 hover:border-white/40">
              <h4 className="text-lg font-bold text-[#8a8a9a] uppercase tracking-[0.2em] mb-4">Term Elite</h4>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-7xl font-black text-white tracking-tight">$800</span>
                <span className="text-2xl text-[#6b6b80] font-medium">/term</span>
              </div>
              <ul className="space-y-6 mb-12 text-[#a0a4a8] text-lg flex-1">
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">✓</div> Full term coverage</li>
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">✓</div> Dedicated driver</li>
                <li className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">✓</div> VIP safety protocols</li>
              </ul>
              <button className="w-full py-5 rounded-2xl font-bold text-lg text-white border-2 border-white/20 hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-300 mt-auto">Select Term</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREMIUM FOOTER ── */}
      <footer className="w-full py-20 border-t border-white/10 bg-[#020205] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#f5a623]/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="col-span-2 space-y-8">
            <Link href="/" className="inline-flex items-center gap-1 md:gap-2">
              <span className="text-4xl font-black tracking-tight text-[#f5a623]">Van</span>
              <span className="text-4xl font-black tracking-tight text-white">Mate</span>
            </Link>
            <p className="text-[#8a8a9a] max-w-sm text-lg leading-relaxed font-light">
              Architecting the future of school transport. Offering transparent reliability, elite fleets, and absolute safety for discerning parents globally.
            </p>
          </div>
          
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">Company</h4>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">About Us</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Careers</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">Legal</h4>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Privacy Policy</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Terms of Service</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#f5a623] transition-colors font-medium">Cookie Policy</Link>
          </div>
          
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">Connect</h4>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#4fc3f7] transition-colors font-medium">Twitter</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#0077b5] transition-colors font-medium">LinkedIn</Link>
            <Link href="#" className="text-[#8a8a9a] hover:text-[#e1306c] transition-colors font-medium">Instagram</Link>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="text-[#6b6b80] text-base font-medium">
            © ${new Date().getFullYear()} VanMate Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[#6b6b80] text-base font-medium">
            <span className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10"><div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div> Systems Operational</span>
          </div>
        </div>
      </footer>
`;

const newContent = content.substring(0, startIdx) + newSections + '\n    </div>\n  );\n}\n';

fs.writeFileSync('frontend/src/app/page.tsx', newContent);
console.log("Applied stunning premium redesign");
