import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { mentors, reviews } from '../mockData';
import { Star, GraduationCap, Briefcase, Globe, MessageSquare, Calendar, Gift } from 'lucide-react';

const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = mentors.find(m => m.id === id);
  const mentorReviews = reviews.filter(r => r.mentorId === id);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mentor not found</h2>
          <Button onClick={() => navigate('/mentors')}>Back to Mentors</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{mentor.name}</h1>
                    <p className="text-lg text-gray-600 mb-2">{mentor.year}</p>
                    <div className="flex items-center mb-4">
                      <Star size={20} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-lg font-semibold text-gray-900 mr-2">{mentor.rating}</span>
                      <span className="text-gray-600">({mentor.sessionsCompleted} sessions)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700 mb-4">
                  <GraduationCap size={20} className="mr-2 text-indigo-600" />
                  <span>{mentor.college}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-indigo-50 text-indigo-700">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center text-gray-700 mb-6">
                  <Globe size={18} className="mr-2" />
                  <span>Languages: {mentor.languages.join(', ')}</span>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center text-indigo-700 mb-2">
                    <Gift size={20} className="mr-2" />
                    <span className="font-semibold">NSAT Offer - Get Your First Session FREE!</span>
                  </div>
                  <p className="text-sm text-indigo-600">
                    Register for NSAT using our link & get ₹300 off + this mentorship session for free
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    onClick={() => navigate(`/book/${mentor.id}`)}
                  >
                    <Calendar className="mr-2" size={20} />
                    Book Session - ₹{mentor.price}
                  </Button>
                  <Button size="lg" variant="outline">
                    <MessageSquare className="mr-2" size={20} />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({mentorReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About Me</h3>
                <p className="text-gray-700 mb-6">{mentor.bio}</p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">What I Can Help You With</h3>
                <ul className="space-y-2">
                  {mentor.expertise.map((exp, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-indigo-600 mr-2">•</span>
                      {exp}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {mentorReviews.length > 0 ? (
                mentorReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.studentName}</h4>
                          <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-600">
                    No reviews yet. Be the first to book a session and leave a review!
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MentorProfile;