import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">מדיניות פרטיות</h1>
      
      <div className="space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">
          עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
        </p>
        {/* Existing content of the privacy policy */}
      </div>
    </div>
  );
}