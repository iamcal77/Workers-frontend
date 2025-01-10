import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import useAdminData from './Hooks/useAdminData';

function ProfileMenu() {
  const { users, loading, error } = useAdminData(); // Fetch users using the custom hook
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Retrieve saved profile image from localStorage
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
      setImagePreview(savedImage);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);
        setImagePreview(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get the current user (for example, the first user in the list)
  const currentUser = users.length > 0 ? users[0] : null;

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div className="text-red-500">{error}</div>; // Show error state

  return (
    <div className="relative">
      {/* Profile Icon */}
      <div className="cursor-pointer" onClick={toggleMenu}>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FaUserCircle className="text-3xl text-gray-600" />
          )}
        </div>
      </div>

      {/* Profile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-xl rounded-lg w-64 p-4 border border-gray-300 mt-2 z-50 transition-all duration-300 transform scale-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <CgProfile className="text-2xl text-gray-600" />
              )}
            </div>
            <div>
              {currentUser ? (
                <>
                  <h3 className="font-semibold text-lg text-gray-700">{currentUser.name}</h3>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">No user data available</p>
              )}
            </div>
          </div>

          <ul className="space-y-3">
            <li>
              <label
                htmlFor="file-upload"
                className="flex items-center space-x-3 p-2 hover:bg-gray-200 cursor-pointer rounded-md transition-all duration-300"
              >
                <FaCamera className="text-xl text-gray-700" />
                <span className="text-gray-700">Change Picture</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
