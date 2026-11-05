
{/*  TopNavBar  */}
<nav className="bg-surface/60 backdrop-blur-xl text-primary font-body-md text-body-md fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
<div className="flex justify-between items-center max-w-7xl mx-auto px-10 h-20">
<a className="font-headline-sm text-headline-sm font-extrabold text-secondary hover:opacity-80 transition-opacity" href="#">VanMate</a>
<div className="hidden md:flex gap-8 items-center">
<a className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/10 duration-300 px-3 py-2 rounded-lg" href="#how-it-works">How it Works</a>
<a className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/10 duration-300 px-3 py-2 rounded-lg" href="#pricing">Pricing</a>
<a className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/10 duration-300 px-3 py-2 rounded-lg" href="#tracking">Tracking</a>
<a className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/10 duration-300 px-3 py-2 rounded-lg" href="#reviews">Reviews</a>
</div>
<button className="bg-secondary text-surface font-label-bold text-label-bold px-6 py-2.5 rounded-full hover:bg-secondary-fixed transition-colors active:scale-95 duration-150">
                Book Now
            </button>
</div>
</nav>
{/*  Hero Section  */}
<section className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop py-20 md:py-32 grid md:grid-cols-2 gap-gutter items-center relative">
<div className="absolute inset-0 bg-secondary/5 blur-[100px] rounded-full pointer-events-none -z-10 w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
<div className="space-y-stack-lg z-10">
<h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
                Safe, Reliable School Transport for the Modern Parent
            </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Experience peace of mind with real-time tracking, vetted professional drivers, and a premium fleet designed for safety and comfort.
            </p>
<div className="flex gap-4">
<button className="bg-secondary text-surface font-label-bold text-label-bold px-8 py-4 rounded-full hover:bg-secondary-fixed transition-colors shadow-[0_0_20px_rgba(255,185,95,0.3)] hover:shadow-[0_0_30px_rgba(255,185,95,0.5)]">
                    Book Your Spot
                </button>
<button className="glass-panel text-on-surface font-label-bold text-label-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
                    View Routes
                </button>
</div>
</div>
<div className="relative z-10 flex justify-center md:justify-end">
<img alt="3D illustration of a modern, sleek school bus floating on a clean background." className="w-full max-w-[500px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-[bounce_4s_ease-in-out_infinite]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF-L8SxQghkS8P6_KR9Yl1MVZ7_8Yu1MnVqFPgtOmLqDqZKYLNpzWGzP0xbbWEHlZSlkGRujlnQFujjXXUO2vXVWEk0GxzDFC_gq-7rdp75O6XfIvwXX-PfriQ_u30J9zpUf5nWoNqwi3r8XBn93YKcWN-al9R3fu3lsGIRrKVYZdMirCipUGPy1HgMdxkTEmkieYUoaRTPdBytOL7dS5BA98FoyI-hnRbszEFzp9kvbvHajTSjaV8JCZ7_ei21jK76sdYnzFdmjY"/>
</div>
</section>
{/*  How it Works  */}
<section className="py-20 bg-surface-container-lowest" id="how-it-works">
<div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
<div className="text-center mb-16">
<h2 className="font-headline-md text-headline-md text-on-surface mb-4">Transparent Reliability</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Seamless management from booking to drop-off, designed for absolute calm.</p>
</div>
<div className="grid md:grid-cols-3 gap-8">
{/*  Card 1  */}
<div className="glass-panel rounded-xl p-8 glass-panel-hover flex flex-col items-center text-center">
<div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-secondary text-3xl" data-icon="calendar_month">calendar_month</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Easy Booking</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Flexible scheduling for daily commutes or specific terms with just a few taps.</p>
</div>
{/*  Card 2  */}
<div className="glass-panel rounded-xl p-8 glass-panel-hover flex flex-col items-center text-center relative overflow-hidden">
<div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 blur-3xl rounded-full"></div>
<div className="w-16 h-16 rounded-full bg-tertiary/10 border border-tertiary/20 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-tertiary text-3xl" data-icon="location_on">location_on</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Real-time Tracking</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Live GPS updates and notifications ensure you always know exactly where they are.</p>
</div>
{/*  Card 3  */}
<div className="glass-panel rounded-xl p-8 glass-panel-hover flex flex-col items-center text-center">
<div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="verified_user">verified_user</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Safe Drop-off</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Secure handover protocols with verified educational institution personnel.</p>
</div>
</div>
</div>
</section>
{/*  Pricing  */}
<section className="py-20 relative overflow-hidden" id="pricing">
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-variant/20 via-surface to-surface pointer-events-none"></div>
<div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop relative z-10">
<div className="text-center mb-16">
<h2 className="font-headline-md text-headline-md text-on-surface mb-4">Flexible Plans</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Choose the schedule that fits your family's needs.</p>
</div>
<div className="grid md:grid-cols-3 gap-8 items-center">
{/*  Daily  */}
<div className="glass-panel rounded-xl p-8 flex flex-col">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Daily</h3>
<div className="font-headline-lg text-headline-lg text-on-surface mb-6">$15<span className="text-body-md text-on-surface-variant font-normal">/day</span></div>
<ul className="space-y-4 mb-8 text-on-surface-variant">
<li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> One-off bookings</li>
<li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Standard support</li>
</ul>
<button className="w-full glass-panel text-on-surface font-label-bold text-label-bold py-3 rounded-full hover:bg-white/10 transition-colors mt-auto">Select Daily</button>
</div>
{/*  Monthly (Popular)  */}
<div className="glass-panel rounded-xl p-8 border-secondary/30 relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(255,185,95,0.1)] bg-white/10">
<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-surface font-label-bold text-label-sm px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Monthly</h3>
<div className="font-headline-lg text-headline-lg text-on-surface mb-6">$250<span className="text-body-md text-on-surface-variant font-normal">/mo</span></div>
<ul className="space-y-4 mb-8 text-on-surface-variant">
<li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Guaranteed seat</li>
<li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Priority support</li>
<li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Flexible changes</li>
</ul>
<button className="w-full bg-secondary text-surface font-label-bold text-label-bold py-3 rounded-full hover:bg-secondary-fixed transition-colors mt-auto shadow-[0_0_15px_rgba(255,185,95,0.3)]">Subscribe Monthly</button>
</div>
{/*  Term  */}
<div className="glass-panel rounded-xl p-8 flex flex-col">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Term</h3>
<div className="font-headline-lg text-headline-lg text-on-surface mb-6">$800<span className="text-body-md text-on-surface-variant font-normal">/term</span></div>
<ul className="space-y-4 mb-8 text-on-surface-variant">
<li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Full term coverage</li>
<li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Dedicated driver</li>
</ul>
<button className="w-full glass-panel text-on-surface font-label-bold text-label-bold py-3 rounded-full hover:bg-white/10 transition-colors mt-auto">Select Term</button>
</div>
</div>
</div>
</section>
{/*  Footer  */}
<footer className="bg-surface-container-lowest text-on-surface font-label-sm text-label-sm w-full py-12 border-t border-white/5 bg-surface-dim">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-10">
<div className="space-y-4">
<div className="font-headline-sm text-headline-sm font-bold text-secondary">VanMate</div>
<p className="text-on-surface-variant max-w-xs">Premium school transport solutions offering transparent reliability for discerning parents.</p>
</div>
<div className="flex flex-col gap-3">
<a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a>
<a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</a>
</div>
<div className="flex flex-col gap-3">
<a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">Safety Standards</a>
<a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">Contact Us</a>
</div>
<div className="flex items-end md:justify-end text-on-surface-variant">
                © 2024 VanMate Transport Solutions. All rights reserved.
            </div>
</div>
</footer>
