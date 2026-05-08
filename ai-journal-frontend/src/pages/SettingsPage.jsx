// src/pages/SettingsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/layout/DashboardHeader";
import BottomNav from "../components/layout/BottomNav";
import { useAuth } from "../contexts/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, changePassword } = useAuth();
  const [nickname, setNickname] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setNickname(userData.nickname || "");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const handleSaveNickname = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        nickname: nickname.trim(),
        email: user.email,
        updatedAt: new Date()
      }, { merge: true });
      showMessage("Nickname updated successfully!", "success");
    } catch (error) {
      console.error("Error updating nickname:", error);
      showMessage("Failed to update nickname", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      showMessage("Please fill in all password fields", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage("New passwords do not match", "error");
      return;
    }

    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters long", "error");
      return;
    }

    try {
      setSaving(true);
      await changePassword(newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showMessage("Password updated successfully!", "success");
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.code === 'auth/requires-recent-login') {
        showMessage("Please log out and log back in to change your password", "error");
      } else {
        showMessage("Failed to change password", "error");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-f5f5f0 to-e8e8e0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-c8c8c0 border-t-5a7a5a rounded-full animate-spin" />
          <p className="mt-4 text-888880">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-f5f5f0 to-e8e8e0 pb-40">
        <DashboardHeader />
        
        <main className="max-w-4xl mx-auto px-4 md:px-8 pt-[100px]">
          <div className="mb-8">
            <h1 className="text-4xl font-light text-primary mb-2">Settings</h1>
            <p className="text-body-lg text-on-surface-variant">Manage your account preferences</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg border ${
              messageType === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">person</span>
                Profile Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Email Address
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-on-surface">{user?.email || 'No email available'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Nickname
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Enter your nickname"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                    <button
                      onClick={handleSaveNickname}
                      disabled={saving}
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">lock</span>
                Change Password
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={saving}
                  className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Updating..." : "Change Password"}
                </button>
              </div>
            </div>
          </div>
        </main>

        <BottomNav activePage="settings" onNavigate={navigate} />
      </div>
    </>
  );
}
