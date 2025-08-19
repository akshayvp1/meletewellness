'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { contactService } from '@/services/user/contactService';

// Type definitions
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Real-time validation function for individual fields
  const validateField = (fieldName: string, value: string): string | undefined => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          return 'Full name is required';
        } else if (value.trim().length === 0 || /^\s+$/.test(value)) {
          return 'Name cannot contain only spaces';
        } else if (/^\d+$/.test(value.trim())) {
          return 'Name cannot contain only numbers';
        } else if (value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        break;

      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (value.trim()) {
          const phoneNumber = value.trim().replace(/\D/g, '');
          if (phoneNumber.length > 0 && phoneNumber.length < 10) {
            return 'Phone number must be exactly 10 digits';
          } else if (phoneNumber.length === 10 && !/^[9876]/.test(phoneNumber)) {
            return 'Phone number must start with 9, 8, 7, or 6';
          }
        }
        break;

      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        } else {
          const words = value.trim().split(/\s+/).filter(word => word.length > 0);
          if (words.length > 0 && words.length < 5) {
            return 'Message must contain at least 5 words';
          } else if (words.length > 100) {
            return 'Message cannot exceed 100 words';
          }
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate all fields
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const phoneError = validateField('phone', formData.phone);
    const messageError = validateField('message', formData.message);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (phoneError) newErrors.phone = phoneError;
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
     
    
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: digitsOnly
        }));
        
        // Real-time validation for phone
        const phoneError = validateField('phone', digitsOnly);
        setErrors(prev => ({
          ...prev,
          phone: phoneError
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Real-time validation for other fields
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the contactService.contactUs method
      await contactService.contactUs(formData);
      
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#015F4A' }}>
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help and answer any questions you might have.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Information - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-8 h-fit">
              <h2 className="text-2xl font-bold mb-8" style={{ color: '#015F4A' }}>
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#015F4A' }}
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Email</h3>
                    <p className="text-gray-600 text-sm mb-1">connect@meletewellness.com</p>
                    {/* <p className="text-gray-600 text-sm">support@company.com</p> */}
                  </div>
                </div>
                

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#015F4A' }}
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Phone</h3>
                    <p className="text-gray-600 text-sm mb-1">+91 8943175522</p>
                    <p className="text-gray-600 text-sm">+91 8089843380</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#015F4A' }}
                    >
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Melete Wellness</h3>
                    <p className="text-gray-600 text-sm mb-1">Room No. 35/2142 A ,Second Floor</p>
                    <p className="text-gray-600 text-sm">VK Tower, Mankavu, Kozhikode - 673007</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#015F4A' }}>
                  Business Hours
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monday - Sunday:</span>
                    <span className="text-gray-600 font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-700">Saturday:</span>
                    <span className="text-gray-600 font-medium">10:00 AM - 4:00 PM</span>
                  </div> */}
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-700">Sunday:</span>
                    <span className="text-gray-600 font-medium">Closed</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#015F4A' }}>
                Send us a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#015F4A' }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#015F4A' }}>
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 ${
                          errors.name 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-[#015F4A] focus:border-[#015F4A] hover:border-gray-400'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-[#015F4A] focus:border-[#015F4A] hover:border-gray-400'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 ${
                        errors.phone 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-[#015F4A] focus:border-[#015F4A] hover:border-gray-400'
                      }`}
                      placeholder="Enter 10-digit phone number"
                      maxLength={10}
                    />
                    {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      How can we help? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-opacity-20 ${
                        errors.message 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-[#015F4A] focus:border-[#015F4A] hover:border-gray-400'
                      }`}
                      placeholder="Tell us about your project or how we can assist you... (5-100 words)"
                    />
                    {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                    <div className="mt-1 text-xs text-gray-500">
                      Word count: {formData.message.trim() ? formData.message.trim().split(/\s+/).filter(word => word.length > 0).length : 0}/100
                      {formData.message.trim() && (
                        <span className={`ml-2 ${
                          (() => {
                            const wordCount = formData.message.trim().split(/\s+/).filter(word => word.length > 0).length;
                            if (wordCount < 5) return 'text-orange-500';
                            if (wordCount > 100) return 'text-red-500';
                            return 'text-green-500';
                          })()
                        }`}>
                          {(() => {
                            const wordCount = formData.message.trim().split(/\s+/).filter(word => word.length > 0).length;
                            if (wordCount < 5) return '(Need more words)';
                            if (wordCount > 100) return '(Too many words)';
                            return '✓ Word count good';
                          })()}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transition-all duration-200 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: '#015F4A' }}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold" style={{ color: '#015F4A' }}>
              Visit Our Office
            </h2>
            <p className="text-gray-600 mt-2">
              Find us at our convenient location
            </p>
          </div>
          <div className="h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.3286085910713!2d75.8019371750486!3d11.23721948894097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65988fe40bba5%3A0xc16bb3a826371125!2sMelete%20Wellness!5e0!3m2!1sen!2sin!4v1755071318032!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;