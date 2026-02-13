import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, GraduationCap, Gift, Award } from 'lucide-react';

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-indigo-200 overflow-hidden bg-white transform hover:-translate-y-2">
      <CardContent className="p-0">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        </div>

        {/* Avatar */}
        <div className="px-6 -mt-12 mb-4 relative z-10">
          <div className="relative inline-block">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <Award size={14} className="text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Name and Year */}
          <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">
            {mentor.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{mentor.year}</p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
              <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm font-bold text-gray-900">{mentor.rating}</span>
              <span className="text-xs text-gray-600 ml-1">({mentor.sessionsCompleted})</span>
            </div>
          </div>

          {/* College */}
          <div className="flex items-start text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
            <GraduationCap size={16} className="mr-2 text-indigo-600 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{mentor.college}</span>
          </div>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.expertise.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Price */}
          <div className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
            <p className="text-xs text-gray-600 mb-1">Starting from</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ₹{mentor.price}
              </span>
              <span className="text-sm font-normal text-gray-500 ml-2">/ session</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full border-2 border-gray-200 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 group/btn"
              onClick={() => navigate(`/mentor/${mentor.id}`)}
            >
              View Details
              <span className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate(`/book/${mentor.id}`)}
            >
              Book Session
            </Button>
            <div className="flex items-center justify-center text-xs text-indigo-600 py-2 bg-indigo-50 rounded-md border border-indigo-100">
              <Gift size={14} className="mr-1" />
              <span className="font-semibold">NSAT Offer - Free Session</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;