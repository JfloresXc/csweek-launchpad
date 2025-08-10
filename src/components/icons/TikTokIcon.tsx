import React from 'react';

interface TikTokIconProps {
  className?: string;
  size?: number;
}

export const TikTokIcon: React.FC<TikTokIconProps> = ({ className = '', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* TikTok Original Icon Design */}
      <path
        d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.419-1.95-1.419-3.338h-3.555v14.567c0 1.982-1.61 3.592-3.592 3.592s-3.592-1.61-3.592-3.592 1.61-3.592 3.592-3.592c.373 0 .731.057 1.069.162V8.9c-.338-.048-.685-.073-1.069-.073-3.818 0-6.918 3.1-6.918 6.918s3.1 6.918 6.918 6.918 6.918-3.1 6.918-6.918V9.329a9.764 9.764 0 0 0 5.708 1.837V7.833c-1.156 0-2.22-.373-3.08-1.004z"
        fill="currentColor"
      />
      {/* Musical note accent */}
      <circle
        cx="18"
        cy="6"
        r="1.5"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M16.5 4.5c0.5-0.5 1-0.8 1.5-0.8s1 0.3 1.5 0.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
};

export default TikTokIcon;