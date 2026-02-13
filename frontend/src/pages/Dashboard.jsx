import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, Video, FileText } from 'lucide-react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const lastBooking = JSON.parse(localStorage.getItem('lastBooking') || 'null');

  const upcomingSessions = lastBooking ? [
    {
      id: '1',
      mentor: lastBooking.mentor,
      date: lastBooking.date,
      time: lastBooking.time,
      type: lastBooking.sessionType === 'quick' ? 'Quick Chat' : 'Deep Dive',
      status: 'confirmed'
    }
  ] : [];

  const pastSessions = [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name || 'User'}!</h1>
          <p className="text-gray-600">Manage your mentorship sessions and bookings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Upcoming Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{upcomingSessions.length}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-indigo-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{pastSessions.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hours of Mentorship</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">{session.mentor}</h3>
                          <Badge className="bg-green-100 text-green-700">{session.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center">
                            <FileText size={16} className="mr-1" />
                            <span>{session.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" size="sm">
                          <Video size={16} className="mr-2" />
                          Join Meeting
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming sessions</h3>
                  <p className="text-gray-600 mb-6">Book a session with a mentor to get started!</p>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Browse Mentors
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No past sessions</h3>
                <p className="text-gray-600">Your completed sessions will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;