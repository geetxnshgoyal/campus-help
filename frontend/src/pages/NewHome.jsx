import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import MentorCard from '../components/MentorCard';
import { mentorAPI, collegeAPI } from '../services/api';
import { ArrowRight, Heart, MessageCircle, Sparkles, Users, ChevronRight, Quote, Play } from 'lucide-react';

const NewHome = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [mentorsRes, collegesRes] = await Promise.all([
        mentorAPI.getAll({ limit: 50 }),
        collegeAPI.getAll()
      ]);
      
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
      setColleges(collegesRes.data.colleges);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stories = [
    {
      title: "I almost made the wrong choice...",
      quote: "I was about to join a college just because of the brochure. Then I talked to Harsh, a 2nd year student there. He told me the real story - the good, the bad, everything. Best decision ever.",
      author: "Rahul, Now studying at NST",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      title: "They saved me ₹15 lakhs",
      quote: "I was going to take a huge loan for an expensive college. After talking to students there, I realized a better college with better placements costs half. My parents are so relieved.",
      author: "Priya, Future Engineer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      title: "Found my tribe before joining",
      quote: "Talking to current students helped me understand the culture. Now I'm not just joining a college, I'm joining a community I already feel connected to.",
      author: "Arjun, Incoming Student",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      {/* Immersive Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            {/* Story Hook */}
            <div className="inline-block mb-8 animate-fadeInUp">
              <div className="flex items-center justify-center gap-2 text-purple-600 mb-4">
                <Heart className="animate-pulse" size={20} />
                <span className="text-sm font-semibold tracking-wide uppercase">Your College Journey Starts Here</span>
              </div>
            </div>

            {/* Main Story Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              Before you pay lakhs,
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                hear the real stories.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              Your seniors lived it. They know the truth about campus life, placements, faculty, and everything your brochure won't tell you.
            </p>

            {/* Emotional CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <Button
                size="lg"
                onClick={() => navigate('/mentors')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-7 text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 group"
              >
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={24} />
                Talk to Real Students (₹49 only)
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-10 py-7 text-lg group"
              >
                <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                See Success Stories
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-1">₹15L+</div>
                <div className="text-sm text-gray-600">Saved in Wrong Decisions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-1">4.9/5</div>
                <div className="text-sm text-gray-600">Student Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Sparkles className="mx-auto mb-4 animate-pulse" size={40} />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Real Students. Real Stories.</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              These are not testimonials. These are life-changing conversations.
            </p>
          </div>

          {/* Story Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Card 
                key={index}
                className={`bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                  activeStory === index ? 'ring-4 ring-purple-400' : ''
                }`}
                onClick={() => setActiveStory(index)}
              >
                <CardContent className="p-8">
                  <Quote className="text-purple-300 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-4 text-white">{story.title}</h3>
                  <p className="text-purple-100 mb-6 italic leading-relaxed">"{story.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={story.image} alt={story.author} className="w-12 h-12 rounded-full border-2 border-purple-300" />
                    <div>
                      <p className="font-semibold text-white">{story.author}</p>
                      <p className="text-sm text-purple-300">Real Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full font-semibold mb-6">
                The Hard Truth
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                College brochures lie.
                <br />
                Admission counselors sell.
                <br />
                <span className="text-purple-600">Your seniors tell the truth.</span>
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p className="flex items-start gap-3">
                  <span className="text-red-500 text-2xl">✗</span>
                  <span>Brochures show perfect campus, hide the reality</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-500 text-2xl">✗</span>
                  <span>Websites promise 100% placement, reality is different</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-500 text-2xl">✗</span>
                  <span>You pay ₹15-20 lakhs without knowing the truth</span>
                </p>
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 shadow-2xl">
                <CardContent className="p-8">
                  <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full font-semibold mb-6">
                    The Solution
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Talk to students who are living it right now
                  </h3>
                  <div className="space-y-4 text-lg text-gray-700">
                    <p className="flex items-start gap-3">
                      <span className="text-green-500 text-2xl">✓</span>
                      <span>Real campus life, not marketing photos</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-green-500 text-2xl">✓</span>
                      <span>Actual placement numbers, not inflated stats</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-green-500 text-2xl">✓</span>
                      <span>Save lakhs by making the right choice</span>
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/mentors')}
                    className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6"
                  >
                    Start Your Journey
                    <ChevronRight className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Guides Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Users className="mx-auto mb-4 text-purple-600" size={48} />
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Meet Your Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Not just mentors. These are students like you who've walked the path you're about to take.
            </p>
          </div>

          {!loading && mentors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {mentors.slice(0, 6).map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => navigate('/mentors')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-12 py-6 text-lg"
            >
              Meet All {mentors.length} Students
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why ₹49 Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Why only ₹49?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Because we remember what it's like to be a confused student. Your college decision is too important to be based on marketing. For less than a movie ticket, get the truth that could save you years of regret and lakhs of rupees.
          </p>
          <div className="inline-block bg-white rounded-2xl shadow-2xl p-8 border-4 border-purple-200">
            <div className="text-6xl font-extrabold text-purple-600 mb-2">₹49</div>
            <div className="text-gray-600 mb-4">15-minute honest conversation</div>
            <div className="text-sm text-gray-500">vs. ₹15-20 lakhs wrong decision</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Your Future. Your Choice. Your Story.
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Don't let a brochure decide the next 4 years of your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/mentors')}
              className="bg-white text-purple-600 hover:bg-purple-50 px-12 py-8 text-xl font-bold shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105"
            >
              Talk to Students Now
              <ArrowRight className="ml-3" size={24} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewHome;
