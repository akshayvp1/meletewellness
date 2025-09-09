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

  const cardImages = [
    { id: 1, image: '/images/pregnancy-card-1.png', bgColor: 'bg-yellow-100' },
    { id: 2, image: '/images/pregnancy-card-2.png', bgColor: 'bg-orange-100' },
    { id: 3, image: '/images/pregnancy-card-3.png', bgColor: 'bg-teal-100' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Pregnancy Mental Health Kit
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Activities Circle */}
        <div className="flex justify-center">
          <div className="relative w-[500px] h-[500px]">
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm z-10">
              <div className="text-center">
                <div className="text-xs">5 Activities</div>
              </div>
            </div>

            {/* Activity Icons arranged in circle */}
            {activities.map((activity, index) => {
              const angle = (index * 72) - 90; // 360/5 = 72 degrees apart, -90 to start at top
              const radius = 170; // Increased radius to utilize full space
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={activity.id}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div className={`w-44 h-44 rounded-full ${activity.bgColor} border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative`}>
                    <img
                      src={activity.image}
                      alt={activity.alt}
                      className="w-40 h-40 object-cover rounded-full"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                      <p className="text-xs font-semibold text-gray-800 text-center whitespace-nowrap">
                        {activity.alt}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section - Cards and Content */}
        <div className="space-y-8">
          {/* Floating Cards */}
          <div className="flex justify-center lg:justify-start mb-8">
            <div className="relative w-80 h-44">
              {cardImages.map((card, index) => (
                <div
                  key={card.id}
                  className={`absolute w-32 h-40 ${card.bgColor} rounded-xl shadow-xl border-3 border-white overflow-hidden transition-transform hover:scale-105`}
                  style={{
                    left: `${index * 60}px`,
                    top: `${Math.sin(index * 0.5) * 20}px`,
                    transform: `rotate(${(index - 1) * 12}deg)`,
                    zIndex: cardImages.length - index,
                  }}
                >
                  <img
                    src={card.image}
                    alt={`Pregnancy card ${card.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="flex gap-6 justify-center lg:justify-start mt-20 items-center">
            <div className="text-white px-6 py-3 rounded-lg font-bold text-xl" style={{ backgroundColor: '#015F4A' }}>
              ₹4,999
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-500 text-sm font-medium">MRP</span>
              <span className="text-red-500 text-lg font-bold line-through">₹9,999</span>
              <span className="text-green-600 text-sm font-semibold">50% OFF</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4 text-gray-800">
            <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-[#015F4A] bg-clip-text text-transparent tracking-tight">
              Our Services for Pregnant Women
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-green-600 text-xl">📞</div>
                <div className="text-gray-700 leading-relaxed font-medium text-sm">
                  <span className="font-bold text-gray-900">24 x 7 Support</span> - Continuous care and guidance throughout pregnancy
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-green-600 text-xl">🧘‍♀️</div>
                <div className="text-gray-700 leading-relaxed font-medium text-sm">
                  <span className="font-bold text-gray-900">5 Wellness Activities</span> - Specially designed sessions for each stage of pregnancy
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-green-600 text-xl">📔</div>
                <div className="text-gray-700 leading-relaxed font-medium text-sm">
                  <span className="font-bold text-gray-900">Pregnancy Journal (Diary)</span> - A safe space to record thoughts, feelings, and milestones
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-700 text-sm leading-relaxed font-medium">
            We provide round-the-clock support to ensure mothers feel safe, cared for, and guided during their pregnancy journey. Our wellness activities focus on physical, emotional, and mental well-being, while the pregnancy journal helps capture every special moment and track personal progress.
          </div>

          {/* Connect Button */}
          <div className="pt-6">
            <button 
              className="text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg hover:opacity-90"
              style={{ backgroundColor: '#015F4A' }}
            >
              Connect Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PregnancyKit;