import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { colleges } from '../mockData';
import { GraduationCap, MapPin, ArrowRight } from 'lucide-react';

const Colleges = () => {
  const navigate = useNavigate();
  const displayColleges = colleges.filter(c => c.id !== 'all');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-indigo-600 font-semibold mb-2">Partner Institutions</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore New-Gen Colleges</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get insider perspectives from students at India's most innovative tech institutions
          </p>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayColleges.map((college) => (
            <Card key={college.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{college.name}</h3>
                
                {college.location && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{college.location}</span>
                  </div>
                )}
                
                <p className="text-gray-600 mb-6">{college.description}</p>
                
                <div className="space-y-3">
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => navigate('/mentors')}
                  >
                    Talk to Students <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:border-indigo-500"
                    onClick={() => navigate(`/college/${college.id}`)}
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white rounded-2xl p-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not sure which college is right for you?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Talk to students from multiple colleges and make an informed decision
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8"
            onClick={() => navigate('/mentors')}
          >
            Browse All Mentors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Colleges;