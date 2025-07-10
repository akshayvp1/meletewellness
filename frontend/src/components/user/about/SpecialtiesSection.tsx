import React from 'react';
import Image from 'next/image';
import { 
  Clock, GraduationCap, Leaf, CheckSquare, BookOpen, Headphones,
  Activity, Calendar, TrendingUp, Target, Lightbulb, Sparkles
} from 'lucide-react';
import { SpecialtyItem } from '@/types/types';

const SpecialtiesSection: React.FC = () => {
  const specialties: SpecialtyItem[] = [
    {
      icon: Clock,
      title: "24/7 Mental Health Support",
      description: "Access professional mental health support anytime with our round-the-clock services.",
      image: "/assets/day.webp",
      alt: "24/7 mental health support illustration"
    },
    {
      icon: GraduationCap,
      title: "Student Mental Health Support",
      description: "Tailored resources to support students' academic success and emotional well-being.",
      image: "/assets/student.webp",
      alt: "Student mental health support image"
    },
    {
      icon: Leaf,
      title: "Relaxation Techniques",
      description: "Guided relaxation methods to reduce stress and enhance mental wellness.",
      image: "/assets/relaxation-tech.webp",
      alt: "Relaxation techniques illustration"
    },
    {
      icon: CheckSquare,
      title: "Mental Health To-Do List",
      description: "Organize tasks to improve mental clarity and manage daily responsibilities.",
      image: "/assets/todo.webp",
      alt: "Mental health to-do list image"
    },
    {
      icon: BookOpen,
      title: "Therapeutic Diary",
      description: "A private journaling space to reflect and process emotions for mental health.",
      image: "/assets/diary.webp",
      alt: "Therapeutic diary illustration"
    },
    {
      icon: Headphones,
      title: "Relaxation Music Therapy",
      description: "Curated playlists to promote relaxation and support mental well-being.",
      image: "/assets/music.webp",
      alt: "Relaxation music therapy image"
    },
    {
      icon: Activity,
      title: "Breathing Exercises",
      description: "Controlled breathing techniques to reduce anxiety and improve focus.",
      image: "/assets/breathing.webp",
      alt: "Breathing exercises illustration"
    },
    {
      icon: Calendar,
      title: "Instant Therapy Booking",
      description: "Schedule therapy sessions instantly with real-time availability.",
      image: "/assets/booking.webp",
      alt: "Instant therapy booking image"
    },
    {
      icon: TrendingUp,
      title: "Mood Tracker",
      description: "Monitor mood patterns to gain insights into your mental health journey.",
      image: "/assets/mood-tracker.webp",
      alt: "Mood tracker illustration"
    },
    {
      icon: Activity,
      title: "Mental Health Activities",
      description: "Engaging activities to boost mood and foster a positive mindset.",
      image: "/assets/activities.webp",
      alt: "Mental health activities image"
    },
    {
      icon: Target,
      title: "Mental Health Goal Setting",
      description: "Set and track personal goals to support your mental wellness journey.",
      image: "/assets/goal.webp",
      alt: "Mental health goal setting illustration"
    },
    {
      icon: Lightbulb,
      title: "Healthy Habit Building",
      description: "Develop sustainable habits to promote long-term mental health.",
      image: "/assets/habit.webp",
      alt: "Healthy habit building image"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="specialties-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="specialties-heading" className="text-4xl lg:text-5xl font-light mb-6 text-gray-900">
            Our Mental Health <span className="font-semibold text-[#015F4A]">Specialties</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our expert services tailored to diverse mental health needs, delivered with professional excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {specialties.map((specialty, index) => (
            <article key={index} className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#015F4A]/20 transition-all duration-300 hover:shadow-md">
              <div className="w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                <Image 
                  src={specialty.image} 
                  alt={specialty.alt} 
                  width={400}
                  height={300}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="w-12 h-12 bg-[#015F4A]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#015F4A] group-hover:scale-105 transition-all duration-300">
                <specialty.icon className="text-[#015F4A] group-hover:text-white transition-colors duration-300" size={20} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{specialty.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{specialty.description}</p>
            </article>
          ))}
        </div>
        
        <article className="bg-white rounded-2xl p-10 border border-[#015F4A]/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#015F4A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-[#015F4A]" aria-hidden="true" />
            </div>
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">Professional Mental Health Excellence</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              MELETE combines innovative technology with licensed therapists to deliver comprehensive, evidence-based mental health care, accessible anytime, anywhere.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SpecialtiesSection;