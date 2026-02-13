import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Star, GraduationCap, Gift } from 'lucide-react';

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
            />
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.year}</p>
            <div className="flex items-center mt-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-semibold text-gray-900">{mentor.rating}</span>
            </div>
          </div>
        </div>

        {/* College */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <GraduationCap size={16} className="mr-2 text-indigo-600" />
          <span>{mentor.college}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Starting from</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{mentor.price} <span className="text-sm font-normal text-gray-500">/ session</span>
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full border-gray-300 hover:border-indigo-500 hover:text-indigo-600"
            onClick={() => navigate(`/mentor/${mentor.id}`)}
          >
            View Details
          </Button>
          <Button
            className="w-full bg-slate-900 hover:bg-slate-800 text-white"
            onClick={() => navigate(`/book/${mentor.id}`)}
          >
            Book Session
          </Button>
          <div className="flex items-center justify-center text-xs text-indigo-600 py-2 bg-indigo-50 rounded-md">
            <Gift size={14} className="mr-1" />
            <span>NSAT Offer - Free Session</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;