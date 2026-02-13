import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import MentorCard from '../components/MentorCard';
import { mentorAPI, collegeAPI } from '../services/api';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/input';

const AllMentors = () => {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mentors, setMentors] = useState([]);
  const [colleges, setColleges] = useState([{ id: 'all', name: 'All', shortName: 'All' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch colleges
      const collegesRes = await collegeAPI.getAll();
      const collegesData = collegesRes.data.colleges.map(c => ({
        id: c._id,
        name: c.name,
        shortName: c.short_name
      }));
      setColleges([{ id: 'all', name: 'All', shortName: 'All' }, ...collegesData]);

      // Fetch mentors
      const mentorsRes = await mentorAPI.getAll({ limit: 100 });
      const mentorsData = mentorsRes.data.mentors.map(m => ({
        id: m._id,
        name: m.name,
        year: m.year,
        college: m.college_name,
        collegeId: m.college_id,
        rating: m.rating,
        price: m.price,
        image: m.profile_image,
        bio: m.bio,
        expertise: m.expertise,
        languages: m.languages,
        sessionsCompleted: m.sessions_completed
      }));
      setMentors(mentorsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMentors = mentors.filter(mentor => {
    const matchesCollege = selectedCollege === 'all' || mentor.collegeId === selectedCollege;
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mentor.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollege && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading mentors...</p>
        </div>
      </div>
    );
  }

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