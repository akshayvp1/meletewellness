import React from 'react';
import Image from 'next/image';
import { Clock, GraduationCap, Leaf, CheckSquare, BookOpen, Headphones, Activity, Calendar, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { Sparkles } from 'lucide-react';

// Import images
import day from '@/../public/assets/day.webp';
import student from '@/../public/assets/student.webp';
import music from '@/../public/assets/music.webp';
import tracker from '@/../public/assets/mood-tracker.webp';
import breathing from '@/../public/assets/breathing.webp';
import todolist from '@/../public/assets/todo.webp';
import booking from '@/../public/assets/booking.webp';
import diary from '@/../public/assets/diary.webp';
import goal from '@/../public/assets/goal.webp';
import relaxation from '@/../public/assets/relaxation-tech.webp';
import activity from '@/../public/assets/activities.webp';
import habit from '@/../public/assets/habit.webp';

const SpecialtiesSection: React.FC = () => {
  const specialties = [
    {
      icon: Clock,
      title: "24/7 Mental Health Support",
      description: "Access professional mental health support anytime with our round-the-clock services.",
      image: day,
      alt: "24/7 mental health support illustration"
    },
    {
      icon: GraduationCap,
      title: "Student Mental Health Support",
      description: "Tailored resources to support students' academic success and emotional well-being.",
      image: student,
      alt: "Student mental health support image"
    },
    {
      icon: Leaf,
      title: "Relaxation Techniques",
      description: "Guided relaxation methods to reduce stress and enhance mental wellness.",
      image: relaxation,
      alt: "Relaxation techniques illustration"
    },
    {
      icon: CheckSquare,
      title: "Mental Health To-Do List",
      description: "Organize tasks to improve mental clarity and manage daily responsibilities.",
      image: todolist,
      alt: "Mental health to-do list image"
    },
    {
      icon: BookOpen,
      title: "Therapeutic Diary",
      description: "A private journaling space to reflect and process emotions for mental health.",
      image: diary,
      alt: "Therapeutic diary illustration"
    },
    {
      icon: Headphones,
      title: "Relaxation Music Therapy",
      description: "Curated playlists to promote relaxation and support mental well-being.",
      image: music,
      alt: "Relaxation music therapy image"
    },
    {
      icon: Activity,
      title: "Breathing Exercises",
      description: "Controlled breathing techniques to reduce anxiety and improve focus.",
      image: breathing,
      alt: "Breathing exercises illustration"
    },
    {
      icon: Calendar,
      title: "Instant Therapy Booking",
      description: "Schedule therapy sessions instantly with real-time availability.",
      image: booking,
      alt: "Instant therapy booking image"
    },
    {
      icon: TrendingUp,
      title: "Mood Tracker",
      description: "Monitor mood patterns to gain insights into your mental health journey.",
      image: tracker,
      alt: "Mood tracker illustration"
    },
    {
      icon: Activity,
      title: "Mental Health Activities",
      description: "Engaging activities to boost mood and foster a positive mindset.",
      image: activity,
      alt: "Mental health activities image"
    },
    {
      icon: Target,
      title: "Mental Health Goal Setting",
      description: "Set and track personal goals to support your mental wellness journey.",
      image: goal,
      alt: "Mental health goal setting illustration"
    },
    {
      icon: Lightbulb,
      title: "Healthy Habit Building",
      description: "Develop sustainable habits to promote long-term mental health.",
      image: habit,
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
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-full h-48 mb-4 bg-gray-50 rounded-lg overflow-hidden">
                <Image 
                  src={specialty.image} 
                  alt={specialty.alt}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="mb-4">
                <specialty.icon className="w-8 h-8 text-[#015F4A] mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{specialty.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{specialty.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <article className="bg-white rounded-2xl p-10 border border-[#015F4A]/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#015F4A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-[#015F4A]" />
            </div>
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">
              Professional Mental Health Excellence
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              MELETE combines innovative technology with licensed therapists to deliver comprehensive, 
              evidence-based mental health care, accessible anytime, anywhere.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SpecialtiesSection;