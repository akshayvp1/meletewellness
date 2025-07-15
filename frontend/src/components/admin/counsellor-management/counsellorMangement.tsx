"use client"
import React, { useState, useEffect } from 'react';
import { Star, Users, Clock, MapPin, Lock, Unlock, Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cropper from 'react-easy-crop';
import AuthService from '@/services/AuthService';

interface Consultant {
  id: string;
  name: string;
  qualification: string;
  expertise: string[];
  languages: string[];
  counsellingTypes: string[];
  experience: number;
  location: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
  specialization: string;
  rating: number;
  sessions: number;
  isBlocked: boolean;
}

interface CounsellorCardProps {
  consultant: Consultant;
  onToggleBlock: (id: string, updatedCounsellor: Consultant) => void;
  onEdit: (consultant: Consultant) => void;
}

const CounsellorCard: React.FC<CounsellorCardProps> = ({ consultant, onToggleBlock, onEdit }) => {
  const [showConfirm, setShowConfirm] = useState<{ action: 'block' | 'unblock'; counsellorId: string } | null>(null);

  const handleBlockCounsellor = async (counsellorId: string) => {
    try {
      console.log('Attempting to block counsellor:', counsellorId);
      const updatedCounsellor = await AuthService.blockCounsellor(counsellorId);
      console.log('Block successful:', updatedCounsellor);
      setShowConfirm(null);
      onToggleBlock(counsellorId, updatedCounsellor);
      toast.success(`${consultant.name} has been blocked.`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } catch (error: any) {
      console.error('Error blocking counsellor:', error);
      toast.error(error.message || 'Failed to block counsellor.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  };

  const handleUnblockCounsellor = async (counsellorId: string) => {
    try {
      console.log('Attempting to unblock counsellor:', counsellorId);
      const updatedCounsellor = await AuthService.unblockCounsellor(counsellorId);
      console.log('Unblock successful:', updatedCounsellor);
      setShowConfirm(null);
      onToggleBlock(counsellorId, updatedCounsellor);
      toast.success(`${consultant.name} has been unblocked.`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } catch (error: any) {
      console.error('Error unblocking counsellor:', error);
      toast.error(error.message || 'Failed to unblock counsellor.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  };

  const handleConfirmAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Confirm action triggered:', showConfirm);
    if (showConfirm) {
      if (showConfirm.action === 'block') {
        handleBlockCounsellor(showConfirm.counsellorId);
      } else if (showConfirm.action === 'unblock') {
        handleUnblockCounsellor(showConfirm.counsellorId);
      }
      setShowConfirm(null);
    }
  };

  const handleCancelAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Cancel action triggered');
    setShowConfirm(null);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggle button clicked, isBlocked:', consultant.isBlocked);
    setShowConfirm({ action: consultant.isBlocked ? 'unblock' : 'block', counsellorId: consultant.id });
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200 overflow-hidden max-w-sm ${
        consultant.isBlocked ? 'bg-gray-100' : ''
      }`}
    >
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-xs w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {showConfirm.action === 'unblock' ? 'Unblock' : 'Block'} {consultant.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to {showConfirm.action === 'unblock' ? 'unblock' : 'block'} this counsellor?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleConfirmAction}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-700 transition-all"
                aria-label="Confirm action"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelAction}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-all"
                aria-label="Cancel action"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={consultant.image}
              alt={`Profile of ${consultant.name}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-teal-600"
            />
            <div className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {consultant.experience}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{consultant.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{consultant.qualification}</p>
            <div className="flex items-center gap-3 text-sm mt-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                <span className="font-semibold">{consultant.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span>{consultant.sessions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {consultant.expertise.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200 truncate max-w-[100px]"
              >
                {skill}
              </span>
            ))}
            {consultant.expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200">
                +{consultant.expertise.length - 3}
              </span>
            )}
          </div>
        </div>
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="font-medium w-20 flex-shrink-0">Languages:</span>
            <span className="truncate">{consultant.languages.join(', ') || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-20 flex-shrink-0">Specialties:</span>
            <span className="truncate">{consultant.counsellingTypes.join(', ') || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="truncate">{consultant.specialization || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="truncate">{consultant.location || 'N/A'}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleToggleClick}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 relative z-10 ${
              consultant.isBlocked
                ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
            }`}
            aria-label={consultant.isBlocked ? `Unblock ${consultant.name}` : `Block ${consultant.name}`}
          >
            {consultant.isBlocked ? (
              <>
                <Unlock className="w-4 h-4 mr-2 inline" />
                Unblock
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2 inline" />
                Block
              </>
            )}
          </button>
          <button
            onClick={() => onEdit(consultant)}
            className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-all duration-200 relative z-10"
            aria-label={`Edit ${consultant.name}`}
          >
            <Edit className="w-4 h-4 inline mr-2" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

interface EditCounsellorFormProps {
  consultant: Consultant;
  onClose: () => void;
  onUpdate: (updatedConsultant: Consultant) => void;
}

const expertiseOptions: string[] = [
  'Anxiety', 'Relationship Issues', 'Career Guidance', 'Depression',
  'Family Therapy', 'Addiction Recovery', 'Trauma', 'Child Counselling',
  'Couples Counselling', 'Grief Counselling', 'Stress Management',
  'PTSD', 'Eating Disorders', 'Exam-Related Issues','Behavioural issues','Academic backwardness ',
  'Psycho Education','Adolescents','General Psychiatry','Developmental Disorders',
  'Addiction & Substance Use Disorders','Sleep-Related Concerns','Identity Confusion & Emotional Difficulties',
  'Online Counselling','Screen Addiction',"Anger Issues",'Porn Addiction','Phobias','Obsessive Compulsive Tendencies',
  'Personality Disorders','Relaxation Technique','Psychological Assessments','Parental counselling'
];

const languageOptions: string[] = [
  'English', 'Malayalam', 'Tamil', 'Hindi'
];

const counsellingTypeOptions: string[] = [
  'Individual', 'Group', 'Family Counselling', 'Couples Counselling',
  'Online Therapy', 'Phone Counselling', 'Walk-in Sessions', 'Emergency Support'
];

const EditCounsellorForm: React.FC<EditCounsellorFormProps> = ({ consultant, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: consultant.name,
    qualification: consultant.qualification,
    expertise: consultant.expertise,
    languages: consultant.languages,
    counsellingTypes: consultant.counsellingTypes,
    experience: consultant.experience,
    location: consultant.location,
    bio: consultant.bio,
    email: consultant.email,
    phone: consultant.phone,
    specialization: consultant.specialization,
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(consultant.image);
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: 'expertise' | 'languages' | 'counsellingTypes', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value]
    }));
  };

  const handleRemoveItem = (field: 'expertise' | 'languages' | 'counsellingTypes', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item: string) => item !== value)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file.', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB.', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
        return;
      }
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
        setImageFile(croppedImage);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setShowCropper(false);
          setImageToCrop(null);
        };
        reader.readAsDataURL(croppedImage);
      } catch (error) {
        toast.error('Failed to crop image.', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
      }
    }
  };

  const handleEditImage = () => {
    setImageToCrop(imagePreview);
    setShowCropper(true);
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', 'ad-upload');
    cloudinaryFormData.append('folder', 'melete/counsellor');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dedrcfbxf/image/upload', {
        method: 'POST',
        body: cloudinaryFormData,
      });
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      }
      throw new Error('Failed to upload image to Cloudinary');
    } catch (error: any) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = consultant.image;
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const updatedData: Consultant = {
        ...consultant,
        name: formData.name.trim(),
        qualification: formData.qualification.trim(),
        expertise: formData.expertise,
        languages: formData.languages,
        counsellingTypes: formData.counsellingTypes,
        experience: formData.experience,
        location: formData.location.trim(),
        image: imageUrl,
        bio: formData.bio.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        specialization: formData.specialization.trim(),
        isBlocked: consultant.isBlocked,
      };

      await AuthService.updateCounsellor(consultant.id, updatedData);
      toast.success('Counsellor updated successfully.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      onUpdate(updatedData);
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update counsellor.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
      if (imageFile) {
        URL.revokeObjectURL(imagePreview);
      }
    }
  };

  const availableExpertise = expertiseOptions.filter((option) => !formData.expertise.includes(option));
  const availableLanguages = languageOptions.filter((option) => !formData.languages.includes(option));
  const availableCounsellingTypes = counsellingTypeOptions.filter((option) => !formData.counsellingTypes.includes(option));

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">Edit Counsellor</h3>
            <button
              onClick={() => {
                onClose();
                setShowCropper(false);
                setImageToCrop(null);
                if (imageFile) {
                  URL.revokeObjectURL(imagePreview);
                }
              }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {showCropper && imageToCrop ? (
          <div className="p-6">
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
                  if (imageFile) {
                    URL.revokeObjectURL(imagePreview);
                    setImageFile(null);
                    setImagePreview(consultant.image);
                  }
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCrop}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-all"
              >
                Crop Image
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-sm"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-2 right-2 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600 transition-colors shadow-md"
                >
                  <Edit className="w-5 h-5" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview !== consultant.image && (
                  <button
                    type="button"
                    onClick={handleEditImage}
                    className="absolute top-2 right-2 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600 transition-colors shadow-md"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                <div className="mb-2">
                  {formData.expertise.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 mr-2 mb-2 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('expertise', item)}
                        className="ml-2 text-teal-700 hover:text-teal-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <select
                  onChange={(e) => handleSelectChange('expertise', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  disabled={availableExpertise.length === 0}
                >
                  <option value="">Add expertise</option>
                  {availableExpertise.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                <div className="mb-2">
                  {formData.languages.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 mr-2 mb-2 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('languages', item)}
                        className="ml-2 text-teal-700 hover:text-teal-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <select
                  onChange={(e) => handleSelectChange('languages', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  disabled={availableLanguages.length === 0}
                >
                  <option value="">Add language</option>
                  {availableLanguages.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Counselling Types</label>
                <div className="mb-2">
                  {formData.counsellingTypes.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 mr-2 mb-2 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('counsellingTypes', item)}
                        className="ml-2 text-teal-700 hover:text-teal-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <select
                  onChange={(e) => handleSelectChange('counsellingTypes', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  disabled={availableCounsellingTypes.length === 0}
                >
                  <option value="">Add counselling type</option>
                  {availableCounsellingTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  rows={5}
                />
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                aria-label="Save changes"
              >
                {loading ? 'Submitting...' : 'Update Counsellor'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setShowCropper(false);
                  setImageToCrop(null);
                  if (imageFile) {
                    URL.revokeObjectURL(imagePreview);
                  }
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const CounsellorManagement: React.FC = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingConsultant, setEditingConsultant] = useState<Consultant | null>(null);

  const specializationFilters: string[] = [
    'All',
    'Anxiety',
    'Depression',
    'PTSD',
    'Relationships',
    'Child Psychology',
    'Addiction',
  ];

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        setLoading(true);
        const response = await AuthService.getCounsellors();
        setConsultants(response);
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to load counsellors.';
        setError(errorMessage);
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCounsellors();
  }, []);

  const handleToggleBlock = (id: string, updatedCounsellor: Consultant) => {
    console.log('Updating state for counsellor:', id, updatedCounsellor.isBlocked);
    setConsultants((prev) =>
      prev.map((c) => (c.id === id ? updatedCounsellor : c))
    );
  };

  const handleEdit = (consultant: Consultant) => {
    setEditingConsultant(consultant);
  };

  const handleUpdate = (updatedConsultant: Consultant) => {
    setConsultants((prev) =>
      prev.map((c) => (c.id === updatedConsultant.id ? updatedConsultant : c))
    );
  };

  const filteredConsultants = consultants.filter((consultant) => {
    const matchesFilter =
      selectedFilter === 'All' ||
      consultant.expertise.some((exp) =>
        exp.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    const matchesSearch =
      searchTerm === '' ||
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.expertise.some((exp) =>
        exp.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Counsellor Management</h1>
          <p className="text-gray-600 mt-2">Manage and oversee licensed mental health professionals.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-teal-600 focus:border-teal-600"
                aria-label="Search counsellors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {specializationFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label={`Filter by ${filter}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-t-teal-600 border-gray-200 rounded-full animate-spin" />
            <p className="text-gray-600 mt-2">Loading counsellors...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && filteredConsultants.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredConsultants.map((consultant) => (
              <CounsellorCard
                key={consultant.id}
                consultant={consultant}
                onToggleBlock={handleToggleBlock}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredConsultants.length === 0 && (
          <div className="text-center py-8">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2-8a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mt-2">No counsellors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {editingConsultant && (
          <EditCounsellorForm
            consultant={editingConsultant}
            onClose={() => setEditingConsultant(null)}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default CounsellorManagement;