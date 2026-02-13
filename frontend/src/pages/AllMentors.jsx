import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import MentorCard from '../components/MentorCard';
import { mentors, colleges } from '../mockData';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';

const AllMentors = () => {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMentors = mentors.filter(mentor => {
    const matchesCollege = selectedCollege === 'all' || mentor.collegeId === selectedCollege;
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mentor.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollege && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Mentors</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with students who are living the college experience right now. Get honest answers about what it's really like.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search mentors by name or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 w-full border-gray-300 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* College Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {colleges.map((college) => (
            <Button
              key={college.id}
              variant={selectedCollege === college.id ? 'default' : 'outline'}
              onClick={() => setSelectedCollege(college.id)}
              className={selectedCollege === college.id 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'border-gray-300 hover:border-indigo-500'}
            >
              {college.shortName}
            </Button>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} from {selectedCollege === 'all' ? 'all colleges' : colleges.find(c => c.id === selectedCollege)?.name}
        </p>

        {/* Mentor Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No mentors found matching your criteria.</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => {
                setSelectedCollege('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMentors;