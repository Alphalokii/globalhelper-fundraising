import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              About GlobalHelper
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
              Empowering change through innovative fundraising solutions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Our Story */}
          <div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">
                    Founded in 2014, GlobalHelper began as a simple idea: what if technology could connect
                    compassionate people with meaningful causes, regardless of geographical boundaries?
                  </p>
                  <p className="leading-relaxed">
                    Over the past <span className="font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">10 years</span>, we've grown from a small startup
                    to a comprehensive platform that has facilitated millions in donations across 50+ countries.
                    Our journey has been marked by continuous innovation, unwavering commitment to transparency,
                    and deep belief in the power of collective action.
                  </p>
                  <p className="leading-relaxed">
                    Today, we're proud to be the bridge between those who want to make a difference
                    and the causes that need support the most. Our platform combines cutting-edge technology
                    with human-centered design to create fundraising experiences that inspire action and
                    deliver real results.
                  </p>
                </div>

                {/* Timeline */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-6">Our Journey</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        2014
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">The Beginning</h4>
                        <p className="text-sm text-gray-400">Founded with a vision to democratize fundraising</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        2018
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Rapid Growth</h4>
                        <p className="text-sm text-gray-400">Launched mobile apps and expanded globally</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                        2020
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Innovation Era</h4>
                        <p className="text-sm text-gray-400">Introduced crypto payments and AI features</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        2026
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Global Impact</h4>
                        <p className="text-sm text-gray-400">Reached millions in donations and 100+ countries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Values */}
          <div className="space-y-8">
            {/* Impact Stats */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-6">
                  Our Impact
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">$50M+</div>
                    <div className="text-gray-400">Total Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">2.5M+</div>
                    <div className="text-gray-400">Lives Impacted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">150+</div>
                    <div className="text-gray-400">Countries Reached</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-2">10,000+</div>
                    <div className="text-gray-400">Active Campaigns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">98%</div>
                    <div className="text-gray-400">Transparency Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
                  Our Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 1.98 0 3.42.02 5.5l7.7 7.7 7.7 7.7 2.83 0 5.5-2.83 5.5-2.83 0-5.5L12 22l-7.7-7.7z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Transparency</h3>
                        <p className="text-sm text-gray-400">Every donation tracked, every fund accounted for</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m0 0l-4-4m4 4l-4-4m6 2v10a2 2 0 002 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v10z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Security</h3>
                        <p className="text-sm text-gray-400">Bank-level encryption and protection</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 4.35C10.85 4.35 0 8.5 1.65 0 8.5 1.65 0 8.5-1.65 0-8.5-1.65L12 18.35l-7.1-7.1-7.1-7.1z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Innovation</h3>
                        <p className="text-sm text-gray-400">Always improving, never settling</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-6">
                  Our Team
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300 mb-6">
                    Behind GlobalHelper is a diverse team of passionate individuals united by a common mission:
                    to make giving simple, transparent, and impactful. Our combined expertise spans technology,
                    design, finance, and social impact.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <div className="text-2xl font-bold text-white">50+</div>
                      </div>
                      <h3 className="font-semibold text-white">Dedicated Professionals</h3>
                      <p className="text-sm text-gray-400">Engineers, designers, and support staff</p>
                    </div>

                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <div className="text-2xl font-bold text-white">24/7</div>
                      </div>
                      <h3 className="font-semibold text-white">Global Support</h3>
                      <p className="text-sm text-gray-400">Always here to help you</p>
                    </div>

                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <div className="text-2xl font-bold text-white">10+</div>
                      </div>
                      <h3 className="font-semibold text-white">10+ Years Experience</h3>
                      <p className="text-sm text-gray-400">Average team experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="relative bg-slate-900/50 backdrop-blur-xl border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our platform leverages cutting-edge technology to ensure security, scalability, and exceptional user experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.75 17.25v1.5a.75.75 0 001.5h-1.5v1.5a.75.75 0 001.5 1.5v-1.5H9.75V17.25z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white">React & TypeScript</h3>
                <p className="text-sm text-gray-400">Modern, responsive frontend framework</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L3 7v10c0 1.657 3.343 3 5v6c0 1.657 3.343 3 5v6l9-4 9-4V5c0-1.657-3.343-3-5-3-1.65L12 22l-7.7-7.7z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white">Node.js & Express</h3>
                <p className="text-sm text-gray-400">Scalable backend infrastructure</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.35C10.85 4.35 0 8.5 1.65 0 8.5 1.65 0 8.5-1.65 0-8.5-1.65L12 18.35l-7.1-7.1-7.1z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white">TailwindCSS</h3>
                <p className="text-sm text-gray-400">Beautiful, utility-first CSS framework</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L3 7v10c0 1.657 3.343 3 5v6c0 1.657 3.343 3 5v6l9-4 9-4V5c0-1.657-3.343-3-5-3-1.65L12 22l-7.7-7.7z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white">Blockchain</h3>
                <p className="text-sm text-gray-400">Secure crypto payment processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-red-600/20 to-pink-600/20 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of donors who trust GlobalHelper to support causes they care about
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition"
              >
                Start Donating
              </a>
              <a
                href="/humanitarian-crises"
                className="bg-slate-900/50 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-800/50 transition"
              >
                View Crises
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
