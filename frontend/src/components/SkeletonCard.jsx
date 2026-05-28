import React from "react";

const SkeletonCard = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="skeleton h-4 w-20" />
    <div className="skeleton h-6 w-3/4" />
    <div className="space-y-2">
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-5/6" />
    </div>
    <div className="flex justify-between items-center pt-2">
      <div className="skeleton h-3 w-24" />
      <div className="skeleton h-3 w-20" />
    </div>
  </div>
);

export default SkeletonCard;
