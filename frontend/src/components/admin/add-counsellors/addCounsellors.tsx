"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import { User, Upload, X, Plus, MapPin, BookOpen, Globe, Award, Briefcase, Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import Cropper from 'react-easy-crop';
import adminAuthService from '@/services/AuthService';
import AuthService from '@/services/AuthService';

interface FormData {
  name: string;
  qualification: string;
  expertise: string[];
  languages: string[];
  counsellingTypes: string[];
  experience: number;
  location: string;
  image: File | null;
  imageUrl?: string;
  bio: string;
  email: string;
  phone: string;
  specialization: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  qualification?: string;
  experience?: number;
  location?: string;
  bio?: string;
  specialization?: string;
  expertise?: string;
  languages?: string;
  counsellingTypes?: string;
  image?: string;
  general?: string;
}

interface ArrayFieldSelectorProps {
  title: string;
  field: keyof Pick<FormData, 'expertise' | 'languages' | 'counsellingTypes'>;
  options: string[];
  icon: React.ElementType;
  error?: string;
}

const AddCounsellor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    qualification: '',
    expertise: [],
    languages: [],
    counsellingTypes: [],
    experience: 0,
    location: '',
    image: null,
    bio: '',
    email: '',
    phone: '',
    specialization: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // Predefined options
  const expertiseOptions: string[] = [
    'Anxiety', 'Relationship Issues', 'Career Guidance', 'Depression',
    'Family Therapy', 'Addiction Recovery', 'Trauma', 'Child Counselling',
    'Couples Therapy', 'Grief Counselling', 'Stress Management',
    'PTSD', 'Eating Disorders', 'Exam-Related Issues', 'Behavioural issues', 'Academic backwardness ',
    'Psycho Education', 'Adolescents', 'General Psychiatry', 'Developmental Disorders',
    'Addiction & Substance Use Disorders', 'Sleep-Related Concerns', 'Identity Confusion & Emotional Difficulties',
    'Online Counselling', 'Screen Addiction', 'Anger Issues', 'Porn Addiction', 'Phobias', 'Obsessive Compulsive Tendencies',
    'Personality Disorders', 'Relaxation Technique', 'Psychological Assessments','Parental counselling'
  ];

  const languageOptions: string[] = [
    'English', 'Malayalam', 'Tamil',
    'Hindi'
  ];

  const counsellingTypeOptions: string[] = [
    'Individual', 'Group', 'Family Counselling',
    'Couples Counselling', 'Online Therapy', 'Phone Counselling',
    'Walk-in Sessions', 'Emergency Support'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<File> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise(resolve => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
          resolve(file);
        }
      }, 'image/jpeg');
    });
  };

  const handleCrop = async () => {
    if (imageToCrop && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
        setFormData(prev => ({
          ...prev,
          image: croppedImage
        }));
        setErrors(prev => ({
          ...prev,
          image: undefined
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setShowCropper(false);
          setImageToCrop(null);
        };
        reader.readAsDataURL(croppedImage);
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          image: 'Failed to crop image.'
        }));
        toast.error('Failed to crop image.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const handleArrayFieldChange = (
    field: keyof Pick<FormData, 'expertise' | 'languages' | 'counsellingTypes'>,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
    setErrors(prev => ({
      ...prev,
      [field]: undefined
    }));
  };

  const removeArrayItem = (
    field: keyof Pick<FormData, 'expertise' | 'languages' | 'counsellingTypes'>,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== value)
    }));
    setErrors(prev => ({
      ...prev,
      [field]: undefined
    }));
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be 100 characters or less.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format.';
    }

    if (formData.email.trim()) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required when email is provided.';
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits, start with 6, 7, 8, or 9, and contain only numbers.';
      }
    } else if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits, start with 6, 7, 8, or 9, and contain only numbers.';
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required.';
    } else if (formData.qualification.trim().length > 200) {
      newErrors.qualification = 'Qualification must be 200 characters or less.';
    }

    if (!formData.experience) {
      newErrors.experience ;
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    } else if (formData.location.trim().length > 100) {
      newErrors.location = 'Location must be 100 characters or less.';
    }

    if (formData.bio.trim().length > 1000) {
      newErrors.bio = 'Bio must be 1000 characters or less.';
    }

    if (formData.specialization.trim().length > 200) {
      newErrors.specialization = 'Specialization must be 200 characters or less.';
    }

    if (formData.expertise.length === 0) {
      newErrors.expertise = 'At least one expertise area is required.';
    }

    if (formData.languages.length === 0) {
      newErrors.languages = 'At least one language is required.';
    }

    if (formData.counsellingTypes.length === 0) {
      newErrors.counsellingTypes = 'At least one counselling type is required.';
    }

    if (formData.image) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = 'Image must be JPEG, PNG, or GIF.';
      } else if (formData.image.size > 5 * 1024 * 1024) {
        newErrors.image = 'Image must be less than 5MB.';
      }
    }

    return newErrors;
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', 'ad-upload');
    cloudinaryFormData.append('folder', 'melete/counsellor');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dedrcfbxf/image/upload', {
        method: 'POST',
        body: cloudinaryFormData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error('Please correct the form errors.');
      }

      let imageUrl = '';
      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      const counsellorData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        qualification: formData.qualification.trim(),
        location: formData.location.trim(),
        bio: formData.bio.trim(),
        specialization: formData.specialization.trim(),
        imageUrl,
        image: undefined
      };

      await adminAuthService.addCounsellor(counsellorData);

      setFormData({
        name: '',
        qualification: '',
        expertise: [],
        languages: [],
        counsellingTypes: [],
        experience: 0,
        location: '',
        image: null,
        bio: '',
        email: '',
        phone: '',
        specialization: '',
      });
      setImagePreview(null);
      toast.success('Counsellor added successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error: any) {
      console.error('Error adding counsellor:', error);
      if (error.message !== 'Please correct the form errors.') {
        setErrors({ general: error.message || 'Error adding counsellor. Please try again.' });
      }
      toast.error(error.message || 'Error adding counsellor.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await AuthService.getCounsellors();
        console.log(fetchedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  const ArrayFieldSelector: React.FC<ArrayFieldSelectorProps> = ({ title, field, options, icon: Icon, error }) => (
    <div className="space-y-3">
      <label className="flex items-center text-sm font-semibold text-gray-700">
        <Icon className="w-4 h-4 mr-2 text-[#0A4F43]" />
        {title}
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData[field].includes(option)}
              onChange={() => handleArrayFieldChange(field, option)}
              className="w-4 h-4 text-[#0A4F43] border-gray-300 rounded focus:ring-[#0A4F43] focus:ring-2"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      
      {formData[field].length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {formData[field].map((item: string) => (
            <span
              key={item}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#0A4F43] text-white"
            >
              {item}
              <button
                type="button"
                onClick={() => removeArrayItem(field, item)}
                className="ml-2 hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      
      {error && (
        <p className="text-red-700 text-sm mt-2">{error}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Counsellor</h1>
        <p className="text-gray-600">Fill in the details to add a new counsellor to the platform</p>
      </div>

      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {errors.general}
        </div>
      )}

      <div className="space-y-8">
        {/* Profile Image Upload */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Camera className="w-5 h-5 mr-2 text-[#0A4F43]" />
            Profile Image
          </h2>
          
          {showCropper && imageToCrop ? (
            <div className="relative">
              <div className="relative w-full h-64">
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCropper(false);
                    setImageToCrop(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCrop}
                  className="px-4 py-2 bg-[#0A4F43] text-white rounded-lg hover:bg-[#083d33] transition-colors"
                >
                  Crop Image
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <div className="relative">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageToCrop(imagePreview);
                        setShowCropper(true);
                      }}
                      className="absolute top-0 right-0 bg-[#0A4F43] text-white rounded-full p-1.5 hover:bg-[#083d33] transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white bg-gray-200 shadow-lg">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="inline-flex items-center px-4 py-2 bg-[#0A4F43] text-white rounded-lg hover:bg-[#083d33] transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Recommended: Square image, at least 200x200px
                </p>
                {errors.image && (
                  <p className="text-red-700 text-sm mt-2">{errors.image}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Basic Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-[#0A4F43]" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0A4F43] focus:border-transparent transition-all ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-red-700 text-sm mt-2">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0A4F43] focus:border-transparent transition-all ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-700 text-sm mt-2">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number {formData.email.trim() && '*'}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0A4F43] focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-700 text-sm mt-2">{errors.phone}</p>
              )}
              {formData.email.trim() && (
                <p className="text-sm text-gray-500 mt-1">
                  Phone number is required when email is provided
                </p>
              )}
            </div>
            
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-[#0A4F43]" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0A4F43] focus:border-transparent transition-all ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="City, State/Country"
              />
              {errors.location && (
                <p className="text-red-700 text-sm mt-2">{errors.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-[#0A4F43]" />
            Professional Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 mr-2 text-[#0A4F43]" />
                Qualification *
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0A4F43] focus:border-transparent transition-all ${
                  errors.qualification ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., MA Psychology, PhD Clinical Psychology"
              />
              {errors.qualification && (
                <p className="text-red-700 text-sm mt-2">{errors.qualification}</p>
              )}
            </div>
            
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 mr-2 text-[#0A4F43]" />
                Years of Experience *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0A4F43] focus:border-transparent transition-all ${
                  errors.experience ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1</option>
                <option value="2-5">1+</option>
                <option value="6-10">2+</option>
                <option value="11-15">3+</option>
                <option value="15+">4+</option>
              </select>
              {errors.experience && (
                <p className="text-red-700 text-sm mt-2">{errors.experience}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Professional Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0A4F43] focus:border-transparent transition-all ${
                errors.bio ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Brief professional background and approach to counselling..."
            />
            {errors.bio && (
              <p className="text-red-700 text-sm mt-2">{errors.bio}</p>
            )}
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Areas of Expertise</h2>
          <ArrayFieldSelector
            title="Expertise Areas"
            field="expertise"
            options={expertiseOptions}
            icon={Award}
            error={errors.expertise}
          />
        </div>

        {/* Languages */}
        <div className="bg-gray-50 rounded-xl p-6">
          <ArrayFieldSelector
            title="Languages Spoken"
            field="languages"
            options={languageOptions}
            icon={Globe}
            error={errors.languages}
          />
        </div>

        {/* Counselling Types */}
        <div className="bg-gray-50 rounded-xl p-6">
          <ArrayFieldSelector
            title="Counselling Services Offered"
            field="counsellingTypes"
            options={counsellingTypeOptions}
            icon={User}
            error={errors.counsellingTypes}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: '',
                qualification: '',
                expertise: [],
                languages: [],
                counsellingTypes: [],
                experience: 0,
                location: '',
                image: null,
                bio: '',
                email: '',
                phone: '',
                specialization: ''
              });
              setImagePreview(null);
              setErrors({});
              setShowCropper(false);
              setImageToCrop(null);
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#0A4F43] text-white rounded-lg hover:bg-[#083d33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding Counsellor...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Counsellor
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCounsellor;