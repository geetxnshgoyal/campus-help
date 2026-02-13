import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Calendar } from '../components/ui/calendar';
import { Textarea } from '../components/ui/textarea';
import { mentors } from '../mockData';
import { Calendar as CalendarIcon, Clock, IndianRupee, CheckCircle } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const BookSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = mentors.find(m => m.id === id);
  
  const [sessionType, setSessionType] = useState('quick');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);

  const sessionTypes = [
    { id: 'quick', name: 'Quick Chat', duration: '15 min', price: 49 },
    { id: 'deep', name: 'Deep Dive', duration: '30 min', price: 98 }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const handleBooking = () => {
    if (!selectedTime) {
      toast({
        title: 'Please select a time slot',
        description: 'Choose a time that works for you',
        variant: 'destructive'
      });
      return;
    }

    // Mock booking
    localStorage.setItem('lastBooking', JSON.stringify({
      mentor: mentor.name,
      sessionType,
      date: selectedDate.toDateString(),
      time: selectedTime,
      notes
    }));

    setBookingComplete(true);
  };

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

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
              <p className="text-lg text-gray-600 mb-8">
                Your session with {mentor.name} has been scheduled for {selectedDate.toDateString()} at {selectedTime}.
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-indigo-700 mb-2">
                  You'll receive a confirmation email with the meeting link shortly.
                </p>
                <p className="text-xs text-indigo-600">
                  Please check your email for further instructions.
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/mentors')}
                >
                  Book Another Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Session</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mentor Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-gray-600">{mentor.year}</p>
                    <p className="text-sm text-gray-500">{mentor.college}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Type */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Session Type</h3>
                <RadioGroup value={sessionType} onValueChange={setSessionType} className="space-y-3">
                  {sessionTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-3 border rounded-lg p-4 hover:border-indigo-500 transition-colors">
                      <RadioGroupItem value={type.id} id={type.id} />
                      <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-900">{type.name}</p>
                            <p className="text-sm text-gray-600">{type.duration} video call</p>
                          </div>
                          <p className="font-semibold text-gray-900">₹{type.price}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CalendarIcon className="mr-2" size={20} />
                  Select Date
                </h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2" size={20} />
                  Select Time Slot
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      onClick={() => setSelectedTime(time)}
                      className={selectedTime === time ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes (Optional)</h3>
                <Textarea
                  placeholder="Let the mentor know what you'd like to discuss..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Session Type</p>
                    <p className="font-semibold text-gray-900">
                      {sessionTypes.find(t => t.id === sessionType)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {sessionTypes.find(t => t.id === sessionType)?.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">{selectedDate.toDateString()}</p>
                  </div>
                  {selectedTime && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Time</p>
                      <p className="font-semibold text-gray-900">{selectedTime}</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Session Fee</span>
                    <span className="font-semibold text-gray-900">
                      ₹{sessionTypes.find(t => t.id === sessionType)?.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">
                      ₹{sessionTypes.find(t => t.id === sessionType)?.price}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  onClick={handleBooking}
                  size="lg"
                >
                  <IndianRupee className="mr-2" size={20} />
                  Proceed to Payment
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You can cancel or reschedule up to 6 hours before the session
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSession;