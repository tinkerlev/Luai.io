import React from "react";
import {
  Github,
  Star,
  Shield,
  Server,
  Globe,
  Code,
  PhoneCall,
  Mail,
  MapPin,
} from "lucide-react";
import '../index.css'; // Ensure styles are applied

export const Colors = {
  primaryGradientFrom: "from-blue-600",
  primaryGradientTo: "to-purple-600",
  text: "text-white",
  background: "bg-slate-900",
  sectionBackground: "bg-slate-800",
};

// Typography components
export const GradientHeading = ({ children }) => (
  <h2
    className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md"
  >
    {children}
  </h2>
);

export const SectionTitle = ({ children }) => (
  <h3 className="text-5xl font-semibold text-white mb-2">{children}</h3>
);

export const SectionSubtext = ({ children }) => (
  <p className="text-slate-300 text-xl text-pretty mb-4">{children}</p>
);

// Button components
export const PrimaryButton = ({ children, full, ...props }) => (
  <button
    {...props}
    className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition ${full ? 'w-full' : ''}`}
  >
    {children}
  </button>
);

export const SecondaryButton = ({ children, ...props }) => (
  <button
    {...props}
    className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition"
  >
    {children}
  </button>
);

// Wrapper for icons
export const GradientIconWrapper = ({ children }) => (
  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
    {children}
  </div>
);

// Card-style container
export const CardContainer = ({ children }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-md text-white">
    {children}
  </div>
);

// Icon + title + text combo
export const IconTitleText = ({ icon: Icon, title, text }) => {
  if (!Icon) return null;  // Add safety check
  
  return (
    <div className="flex flex-col items-start gap-2">
      <GradientIconWrapper>
        {typeof Icon === 'function' ? <Icon size={32} /> : Icon}
      </GradientIconWrapper>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-slate-400 text-sm">{text}</p>
    </div>
  );
};

// Inputs
export const TextInput = ({ ...props }) => (
  <input
    {...props}
    className="w-full p-3 rounded-md bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export const TextArea = ({ ...props }) => (
  <textarea
    {...props}
    className="w-full p-3 rounded-md bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
);

// Optional: export icons if needed elsewhere
export const Icons = {
  Github,
  Star,
  Shield,
  Server,
  Globe,
  Code,
  PhoneCall,
  Mail,
  MapPin,
};
