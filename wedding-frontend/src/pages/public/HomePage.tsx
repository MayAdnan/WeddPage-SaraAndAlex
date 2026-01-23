import React from 'react';
import CountdownTimer from '../../components/public/CountdownTimer';
import RsvpForm from '../../components/public/RsvpForm';
import { MapPin, Calendar, Clock, Mail, Phone, Shirt, Heart } from 'lucide-react';

// ============================================
// EDIT YOUR WEDDING INFO HERE
// ============================================
const WEDDING_INFO = {
  brideName: 'Sara',
  groomName: 'Alex',
  weddingDate: '2026-06-15T14:00:00',
  ceremonyTime: '2026-06-15T14:00:00',
  receptionTime: '2026-06-15T17:00:00',
  venueName: 'Rose Garden Estate',
  venueAddress: '123 Garden Lane, Beautiful City',
  description: 'Join us as we celebrate our love and begin our journey together. Your presence would make our special day even more memorable.',
  dressCode: 'Semi-formal / Garden Party Attire',
  contactEmail: 'wedding@saraandalex.com',
  contactPhone: '+1 (555) 123-4567',
};
// ============================================

const HomePage: React.FC = () => {
  const weddingInfo = WEDDING_INFO;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-wedding-ivory">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #D4A5A5 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, #9CAF88 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative z-10 text-center px-4 py-20">
          {/* Decorative element */}
          <div className="mb-8">
            <Heart className="w-8 h-8 mx-auto text-wedding-gold animate-float" fill="#D4AF37" />
          </div>

          {/* Names */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-script text-wedding-forest mb-4">
            {weddingInfo.brideName} & {weddingInfo.groomName}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-wedding-dusty font-light mb-2">
            Are Getting Married
          </p>

          <div className="decorative-line my-8" />

          {/* Date */}
          <p className="text-2xl md:text-3xl font-serif text-wedding-forest mb-12">
            {formatDate(weddingInfo.weddingDate)}
          </p>

          {/* Countdown */}
          <CountdownTimer targetDate={weddingInfo.weddingDate} />

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-wedding-sage rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-wedding-sage rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      {weddingInfo.description && (
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Our Story</h2>
            <div className="decorative-line mb-8" />
            <p className="text-lg text-gray-600 leading-relaxed">
              {weddingInfo.description}
            </p>
          </div>
        </section>
      )}

      {/* Event Details Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Celebration Details</h2>
          <div className="decorative-line mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ceremony */}
            {weddingInfo.ceremonyTime && (
              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-wedding-blush rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-wedding-rose" />
                </div>
                <h3 className="text-2xl font-serif text-wedding-forest mb-4">Ceremony</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-wedding-sage" />
                    {formatTime(weddingInfo.ceremonyTime)}
                  </p>
                </div>
              </div>
            )}

            {/* Reception */}
            {weddingInfo.receptionTime && (
              <div className="card text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-wedding-blush rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-wedding-rose" />
                </div>
                <h3 className="text-2xl font-serif text-wedding-forest mb-4">Reception</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-wedding-sage" />
                    {formatTime(weddingInfo.receptionTime)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Venue */}
          <div className="card text-center mt-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-wedding-blush rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-wedding-rose" />
            </div>
            <h3 className="text-2xl font-serif text-wedding-forest mb-4">Venue</h3>
            <p className="text-xl text-gray-700 mb-2">{weddingInfo.venueName}</p>
            {weddingInfo.venueAddress && (
              <p className="text-gray-600">{weddingInfo.venueAddress}</p>
            )}
          </div>

          {/* Dress Code */}
          {weddingInfo.dressCode && (
            <div className="card text-center mt-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-wedding-blush rounded-full flex items-center justify-center">
                <Shirt className="w-8 h-8 text-wedding-rose" />
              </div>
              <h3 className="text-2xl font-serif text-wedding-forest mb-4">Dress Code</h3>
              <p className="text-gray-600">{weddingInfo.dressCode}</p>
            </div>
          )}
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-white/50 to-wedding-blush/30">
        <div className="max-w-xl mx-auto">
          <h2 className="section-title text-center">RSVP</h2>
          <div className="decorative-line mb-4" />
          <p className="text-center text-gray-600 mb-8">
            Kindly respond by your earliest convenience
          </p>
          <RsvpForm />
        </div>
      </section>

      {/* Contact Section */}
      {(weddingInfo.contactEmail || weddingInfo.contactPhone) && (
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-serif text-wedding-forest mb-6">Questions?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {weddingInfo.contactEmail && (
                <a
                  href={`mailto:${weddingInfo.contactEmail}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-wedding-sage transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {weddingInfo.contactEmail}
                </a>
              )}
              {weddingInfo.contactPhone && (
                <a
                  href={`tel:${weddingInfo.contactPhone}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-wedding-sage transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {weddingInfo.contactPhone}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        <p className="font-script text-2xl text-wedding-dusty mb-2">
          {weddingInfo.brideName} & {weddingInfo.groomName}
        </p>
        <p className="text-sm">© 2026 • Made with love</p>
      </footer>
    </div>
  );
};

export default HomePage;
