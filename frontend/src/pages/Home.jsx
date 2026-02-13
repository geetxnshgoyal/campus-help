import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import MentorCard from '../components/MentorCard';
import { mentors, colleges, pricingPlans, faqs, features } from '../mockData';
import { ArrowRight, Gift, CheckCircle2, GitCompare, BookOpen, GraduationCap, Users, Briefcase, Check } from 'lucide-react';

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Hero Content */}
            <div className="lg:col-span-2">
              <div className="inline-block mb-6">
                <span className="text-sm px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium">
                  For applicants to NST, Vedam, NIAT & more
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Talk to real students.
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Choose the right college.
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Get real, honest insights from students currently studying at new-gen colleges. Ask about campus life, placements, faculty, and everything that matters before you join.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/mentors')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
                >
                  Book Session <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="px-8 py-6 text-lg border-gray-300 hover:border-indigo-500"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* NSAT Offer Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 border-0 text-white overflow-hidden relative">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Gift size={24} className="mr-2" />
                    <span className="text-lg font-bold">🎉 NSAT Offer!</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Get Your First Session FREE</h3>
                  <p className="mb-6 text-purple-100">
                    Register for NSAT using our link & get ₹300 off + a free mentorship session
                  </p>
                  <Button
                    className="w-full bg-white text-purple-700 hover:bg-purple-50 font-semibold"
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

      {/* Mentors Section */}
      <section id="mentors" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet top mentors</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with students who are living the college experience right now. Get honest answers about what it's really like.
            </p>
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
            Showing mentors from {selectedCollege === 'all' ? 'all colleges' : colleges.find(c => c.id === selectedCollege)?.name}
          </p>

          {/* Mentor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredMentors.slice(0, 6).map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/mentors')}
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              See All Mentors
            </Button>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-indigo-600 font-semibold mb-2">Partner Institutions</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore New-Gen Colleges</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get insider perspectives from students at India's most innovative tech institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {colleges.filter(c => c.id !== 'all').slice(0, 6).map((college) => (
              <Card key={college.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/colleges')}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{college.name}</h3>
                  <p className="text-gray-600 mb-4">{college.description}</p>
                  <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 p-0">
                    Explore Mentors <ArrowRight size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/colleges')}
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              View All Colleges
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-indigo-600 font-semibold mb-2">Why Choose Us</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Help You With</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get real insights from students who are living the experience right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-indigo-600" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-4">Ready to get started? Book a session with our mentors today.</p>
            <Button
              size="lg"
              onClick={() => navigate('/mentors')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Explore Mentors
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