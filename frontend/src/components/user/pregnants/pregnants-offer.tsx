import React from 'react';

interface ActivityIcon {
  id: number;
  image: string;
  alt: string;
  bgColor: string;
}

const PregnancyKit: React.FC = () => {
  const activities: ActivityIcon[] = [
    { id: 1, image: '/assets/baby kicks.webp', alt: 'Baby Kicks', bgColor: 'bg-yellow-200' },
    { id: 2, image: '/assets/sweet bump.webp', alt: 'Sweet Bump', bgColor: 'bg-green-200' },
    { id: 3, image: '/assets/baby bloom.webp', alt: 'Baby Bloom', bgColor: 'bg-orange-200' },
    { id: 4, image: '/assets/little miracle.webp', alt: 'Little Miracle', bgColor: 'bg-blue-200' },
    { id: 5, image: '/assets/tiny cuddles.webp', alt: 'Tiny Cuddles', bgColor: 'bg-pink-200' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pregnancy Mental Health Kit
          </h1>

          {/* Activities Circle - Mobile View (Below Heading) */}
          <div className="flex justify-center md:hidden">
            <div className="relative w-[250px] h-[250px]">
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xs z-10">
                <div className="text-center">
                  <div>5 Activities</div>
                </div>
              </div>

              {/* Activity Icons arranged in circle - Mobile */}
              {activities.map((activity, index) => {
                const angle = (index * 72) - 90;
                const radius = 90;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={activity.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full ${activity.bgColor} border-2 border-white shadow-md flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:scale-105`}>
                        <img
                          src={activity.image}
                          alt={activity.alt}
                          className="w-14 h-14 object-cover rounded-full"
                        />
                      </div>
                      <div className="mt-2 bg-white/95 backdrop-blur-sm px-1 py-0.5 rounded-full shadow-sm min-w-[80px]">
                        <p className="text-[10px] font-semibold text-gray-800 text-center whitespace-nowrap">
                          {activity.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Section - Activities Circle (Tablet and Desktop) */}
          <div className="hidden md:flex justify-center order-2 lg:order-1">
            {/* Tablet Layout - Medium Circular */}
            <div className="block lg:hidden relative w-[350px] h-[350px]">
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm z-10">
                <div className="text-center">
                  <div>5 Activities</div>
                </div>
              </div>

              {/* Activity Icons arranged in circle - Tablet */}
              {activities.map((activity, index) => {
                const angle = (index * 72) - 90;
                const radius = 120;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={activity.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-24 h-24 rounded-full ${activity.bgColor} border-3 border-white shadow-lg flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:scale-105`}>
                        <img
                          src={activity.image}
                          alt={activity.alt}
                          className="w-20 h-20 object-cover rounded-full"
                        />
                      </div>
                      <div className="mt-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm min-w-[100px]">
                        <p className="text-xs font-semibold text-gray-800 text-center whitespace-nowrap">
                          {activity.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Layout - Large Circular */}
            <div className="hidden lg:block relative w-[520px] h-[520px]">
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm z-10">
                <div className="text-center">
                  <div>5 Activities Cards</div>
                </div>
              </div>

              {/* Activity Icons arranged in circle */}
              {activities.map((activity, index) => {
                const angle = (index * 72) - 90;
                const radius = 180;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={activity.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-36 h-36 rounded-full ${activity.bgColor} border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:scale-105`}>
                        <img
                          src={activity.image}
                          alt={activity.alt}
                          className="w-32 h-32 object-cover rounded-full"
                        />
                      </div>
                      <div className="mt-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg min-w-[120px]">
                        <p className="text-sm font-semibold text-gray-800 text-center whitespace-nowrap">
                          {activity.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="space-y-8 lg:space-y-10 order-1 lg:order-2">
            {/* Features List */}
            <div className="space-y-6 text-gray-800">
              <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-[#015F4A] bg-clip-text text-transparent tracking-tight text-center lg:text-left">
                Our Services for Pregnant Women
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="text-green-600 text-xl lg:text-2xl flex-shrink-0">📞</div>
                  <div className="text-gray-700 leading-relaxed font-medium text-sm lg:text-base">
                    <span className="font-bold text-gray-900">24*7 on-demand emotional support</span> - Immediate care and guidance whenever you need it
                  </div>
                </div>


                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="text-green-600 text-xl lg:text-2xl flex-shrink-0">🃏</div>
                  <div className="text-gray-700 leading-relaxed font-medium text-sm lg:text-base">
                    <span className="font-bold text-gray-900">Daily activity cards</span> - Engaging tasks to support your daily emotional and mental well-being
                  </div>
                </div>
                
                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="text-green-600 text-xl lg:text-2xl flex-shrink-0">🎥</div>
                  <div className="text-gray-700 leading-relaxed font-medium text-sm lg:text-base">
                    <span className="font-bold text-gray-900">Live video and audio counselling sessions</span> - Personalized support with expert counselors
                  </div>
                </div>
                
                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="text-green-600 text-xl lg:text-2xl flex-shrink-0">📊</div>
                  <div className="text-gray-700 leading-relaxed font-medium text-sm lg:text-base">
                    <span className="font-bold text-gray-900">Monthly progress monitoring</span> - Regular check-ins to track your well-being
                  </div>
                </div>

                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="text-green-600 text-xl lg:text-2xl flex-shrink-0">📔</div>
                  <div className="text-gray-700 leading-relaxed font-medium text-sm lg:text-base">
                    <span className="font-bold text-gray-900">Self-reflection journal</span> - A safe space to record thoughts, feelings, and milestones
                  </div>
                </div>

                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="text-green-600 text-xl lg:text-2xl flex-shrink-0">🎶</div>
                  <div className="text-gray-700 leading-relaxed font-medium text-sm lg:text-base">
                    <span className="font-bold text-gray-900">Music and guided meditation</span> - Curated playlists and mindfulness sessions to promote relaxation
                  </div>
                </div>

                

                {/* Pricing */}
                <div className="flex flex-col items-center lg:items-start gap-2 pt-4">
                  <div className="text-gray-900 text-xl lg:text-2xl font-bold">
                    ₹4,999 <span className="text-sm">+GST</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-red-500 text-lg lg:text-xl font-bold line-through">
                      ₹9,999 <span className="text-sm">+GST</span>
                    </span>
                    <span className="text-green-600 text-sm font-semibold">50% OFF</span>
                  </div>
                </div>

                {/* Description */}
                <div className="text-gray-700 text-sm lg:text-base leading-relaxed font-medium text-center lg:text-left">
                  We offer comprehensive support for your pregnancy journey with 24*7 emotional support, live counseling, monthly progress monitoring, a self-reflection journal, soothing music and guided meditation, and daily activity cards to enhance your well-being. Click "Connect Now" to message us on WhatsApp and learn more about how we can support you during this special time.
                </div>
              </div>
            </div>

            {/* Connect Button */}
            <div className="pt-6 lg:pt-8 text-center lg:text-left">
              <a 
                href="https://wa.me/+918943175522?text=I%20want%20to%20know%20more%20about%20the%20service"
                className="text-white font-semibold py-3 lg:py-4 px-8 lg:px-10 rounded-full transition-colors duration-200 shadow-lg hover:opacity-90 w-full lg:w-auto max-w-sm inline-block"
                style={{ backgroundColor: '#015F4A' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyKit;