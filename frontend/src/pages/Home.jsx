import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import MentorCard from '../components/MentorCard';
import { mentors, colleges, pricingPlans, faqs, features } from '../mockData';
import { ArrowRight, Gift, CheckCircle2, GitCompare, BookOpen, GraduationCap, Users, Briefcase, Check, Sparkles, Star, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState('all');

  const filteredMentors = selectedCollege === 'all'
    ? mentors
    : mentors.filter(m => m.collegeId === selectedCollege);

  const iconMap = {
    CheckCircle2,
    GitCompare,
    BookOpen,
    GraduationCap,
    Users,
    Briefcase
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white">
      {/* Hero Section with Enhanced Design */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Hero Content */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300">
                <Sparkles size={16} className="mr-2" />
                <span className="text-sm">For applicants to NST, Vedam, NIAT & more</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Talk to real students.
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Choose the right college.
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Get real, honest insights from students currently studying at new-gen colleges. Ask about campus life, placements, faculty, and everything that matters before you join.
              </p>

              {/* Stats Section */}
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Students Helped</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Star className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">95%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/mentors')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Book Session <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="px-8 py-6 text-lg border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Enhanced NSAT Offer Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 border-0 text-white overflow-hidden relative shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center mb-4">
                    <Gift size={24} className="mr-2 animate-bounce" />
                    <span className="text-lg font-bold">🎉 NSAT Offer!</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Get Your First Session FREE</h3>
                  <p className="mb-6 text-purple-100">
                    Register for NSAT using our link & get ₹300 off + a free mentorship session
                  </p>
                  <Button
                    className="w-full bg-white text-purple-700 hover:bg-purple-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => navigate('/nsat-offer')}
                  >
                    Claim Free Session <ArrowRight className="ml-2" size={18} />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section with Enhanced Design */}
      <section id="mentors" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
                Top Mentors
              </span>
            </div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Meet top mentors</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with students who are living the college experience right now. Get honest answers about what it's really like.
            </p>
          </div>

          {/* Enhanced College Filter with Chip Design */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {colleges.map((college) => (
              <button
                key={college.id}
                onClick={() => setSelectedCollege(college.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCollege === college.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-400 hover:shadow-md'
                }`}
              >
                {college.shortName}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredMentors.length}</span> mentor{filteredMentors.length !== 1 ? 's' : ''} from {selectedCollege === 'all' ? 'all colleges' : colleges.find(c => c.id === selectedCollege)?.name}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCollege('all')}
              className={selectedCollege === 'all' ? 'hidden' : 'text-indigo-600 hover:text-indigo-700'}
            >
              Clear Filter
            </Button>
          </div>

          {/* Mentor Grid with Stagger Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredMentors.slice(0, 6).map((mentor, index) => (
              <div
                key={mentor.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/mentors')}
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 px-8 py-6 text-lg"
            >
              See All {mentors.length} Mentors <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Colleges Section with Enhanced Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-block mb-4">
              <span className="text-sm px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                Partner Institutions
              </span>
            </div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Explore New-Gen Colleges</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get insider perspectives from students at India's most innovative tech institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {colleges.filter(c => c.id !== 'all').slice(0, 6).map((college, index) => (
              <Card 
                key={college.id} 
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-indigo-200 bg-white overflow-hidden transform hover:-translate-y-2"
                onClick={() => navigate('/colleges')}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <GraduationCap className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">{college.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{college.description}</p>
                  <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Explore Mentors <ArrowRight size={16} className="ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/colleges')}
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 px-8"
            >
              View All Colleges
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-block mb-4">
              <span className="text-sm px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">What We Help You With</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get real insights from students who are living the experience right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div 
                  key={index} 
                  className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-500 transform hover:scale-105 cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16 p-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to get started?</h3>
            <p className="text-xl text-indigo-100 mb-8">Book a session with our mentors today and make an informed decision</p>
            <Button
              size="lg"
              onClick={() => navigate('/mentors')}
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Mentors <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Affordable & Transparent</h2>
            <p className="text-xl text-gray-600">Get clarity on your college decision for less than a movie ticket.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-indigo-600 shadow-xl' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                {!plan.available && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Coming Soon
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={!plan.available}
                    onClick={() => navigate('/mentors')}
                  >
                    {plan.available ? `Choose ${plan.name}` : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-indigo-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Home;