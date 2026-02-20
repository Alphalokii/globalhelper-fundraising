import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About GlobalHelper
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Empowering change through innovative fundraising solutions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Our Story */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  Founded in 2014, GlobalHelper began as a simple idea: what if technology could connect 
                  compassionate people with meaningful causes, regardless of geographical boundaries?
                </p>
                <p className="leading-relaxed">
                  Over the past <span className="font-bold text-indigo-600">10 years</span>, we've grown from a small startup 
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
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Journey</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      2014
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">The Beginning</h4>
                      <p className="text-sm text-gray-600">Founded with a vision to democratize fundraising</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      2018
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Rapid Growth</h4>
                      <p className="text-sm text-gray-600">Launched mobile apps and expanded globally</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      2020
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Innovation Era</h4>
                      <p className="text-sm text-gray-600">Introduced crypto payments and AI features</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      2024
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Global Impact</h4>
                      <p className="text-sm text-gray-600">Reached millions in donations and 100+ countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Values */}
          <div className="space-y-8">
            {/* Impact Stats */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Impact
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">$50M+</div>
                  <div className="text-gray-600">Total Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">2.5M+</div>
                  <div className="text-gray-600">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
                  <div className="text-gray-600">Countries Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Active Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-600">Transparency Rate</div>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 1.98 0 3.42.02 5.5l7.7 7.7 7.7 7.7 2.83 0 5.5-2.83 5.5-2.83 0-5.5L12 22l-7.7-7.7z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Transparency</h3>
                      <p className="text-sm text-gray-600">Every donation tracked, every fund accounted for</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m0 0l-4-4m4 4l-4-4m6 2v10a2 2 0 002 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v10z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Security</h3>
                      <p className="text-sm text-gray-600">Bank-level encryption and protection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.35C10.85 4.35 0 8.5 1.65 0 8.5 1.65 0 8.5-1.65 0-8.5-1.65L12 18.35l-7.1-7.1-7.1-7.1z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Innovation</h3>
                      <p className="text-sm text-gray-600">Always improving, never settling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Team
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 mb-6">
                  Behind GlobalHelper is a diverse team of passionate individuals united by a common mission: 
                  to make giving simple, transparent, and impactful. Our combined expertise spans technology, 
                  design, finance, and social impact.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <div className="text-2xl font-bold text-indigo-600">50+</div>
                    </div>
                    <h3 className="font-semibold text-gray-900">Dedicated Professionals</h3>
                    <p className="text-sm text-gray-600">Engineers, designers, and support staff</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <div className="text-2xl font-bold text-green-600">24/7</div>
                    </div>
                    <h3 className="font-semibold text-gray-900">Global Support</h3>
                    <p className="text-sm text-gray-600">Always here to help you</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <div className="text-2xl font-bold text-purple-600">10+</div>
                    </div>
                    <h3 className="font-semibold text-gray-900">Years Experience</h3>
                    <p className="text-sm text-gray-600">Average team experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge technology to ensure security, scalability, and exceptional user experience
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.75 17.25v1.5a.75.75 0 001.5h-1.5v1.5a.75.75 0 001.5 1.5v-1.5H9.75V17.25z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">React & TypeScript</h3>
              <p className="text-sm text-gray-600">Modern, responsive frontend framework</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v10c0 1.657 3.343 3 5v6c0 1.657 3.343 3 5v6l9-4 9-4V5c0-1.657-3.343-3-5-3-1.65L12 22l-7.7-7.7z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Node.js & Express</h3>
              <p className="text-sm text-gray-600">Scalable backend infrastructure</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.35C10.85 4.35 0 8.5 1.65 0 8.5 1.65 0 8.5-1.65 0-8.5-1.65L12 18.35l-7.1-7.1-7.1z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">TailwindCSS</h3>
              <p className="text-sm text-gray-600">Beautiful, utility-first CSS framework</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v10c0 1.657 3.343 3 5v6c0 1.657 3.343 3 5v6l9-4 9-4V5c0-1.657-3.343-3-5-3-1.65L12 22l-7.7-7.7z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Blockchain</h3>
              <p className="text-sm text-gray-600">Secure crypto payment processing</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of donors who trust GlobalHelper to support causes they care about
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
              >
                Start Donating
              </a>
              <a
                href="/campaigns"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
              >
                Browse Campaigns
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
