"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { editProfile,logout ,changePassword} from "@/app/actions/auth"

type ProfileProps = {
  profile: {
    username: string;
    email: string;
  };
};

export function Profile({ profile }: ProfileProps) {
  const [username, setName] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const router = useRouter()

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await editProfile({ username, email });
      console.log("Profile updated:", { username, email });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const handleSavePassword = async () => {
    setIsChangingPassword(false);
    try {
      await changePassword(password);
      console.log("Password updated successfully");
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  const handleLogout = async() => {
    await logout()
    router.push('/')
    
    
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          {isEditing ? (
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          ) : (
            <p className="text-gray-700">{username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          {isEditing ? (
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          ) : (
            <p className="text-gray-700">{email}</p>
          )}
        </div>
        {isChangingPassword && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              New Password:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-2"
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-2"
          onClick={isChangingPassword ? handleSavePassword : handleChangePassword}
        >
          {isChangingPassword ? "Save Password" : "Change Password"}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleLogout }
        >
          Logout 
        </button>
      </div>
    </div>
  );
}



