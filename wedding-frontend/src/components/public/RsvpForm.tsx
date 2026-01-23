import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';

interface RsvpFormData {
  fullName: string;
  email: string;
  isAttending: boolean;
  numberOfGuests: number;
  dietaryRestrictions?: string;
}

// ============================================
// GET YOUR FREE ACCESS KEY FROM: https://web3forms.com
// Just enter your email - no signup needed!
// ============================================
const WEB3FORMS_ACCESS_KEY = '6edce817-5a76-4b40-81a2-82055524ccca';

const RsvpForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RsvpFormData>({
    defaultValues: {
      isAttending: true,
      numberOfGuests: 1,
    },
  });

  const isAttending = watch('isAttending');

  const onSubmit = async (data: RsvpFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `🎉 Wedding RSVP from ${data.fullName}`,
          from_name: 'Wedding RSVP',
          name: data.fullName,
          email: data.email,
          attending: data.isAttending ? '✅ Yes, attending!' : '❌ Regretfully declining',
          number_of_guests: data.isAttending ? data.numberOfGuests : 0,
          dietary_restrictions: data.dietaryRestrictions || 'None specified',
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error('Failed to submit');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="card text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 bg-wedding-sage rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-serif text-wedding-forest mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your RSVP has been received. We can't wait to celebrate with you!
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="btn-secondary"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card animate-slide-up">
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            {...register('fullName', { 
              required: 'Name is required',
              maxLength: { value: 100, message: 'Name is too long' }
            })}
            type="text"
            id="fullName"
            className="input-field"
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="email"
            id="email"
            className="input-field"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Attending */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Will you be attending? *
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setValue('isAttending', true)}
              className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                isAttending === true
                  ? 'bg-wedding-sage text-white border-wedding-sage'
                  : 'bg-white text-gray-600 border-wedding-dusty hover:border-wedding-sage'
              }`}
            >
              Joyfully Accept
            </button>
            <button
              type="button"
              onClick={() => setValue('isAttending', false)}
              className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                isAttending === false
                  ? 'bg-wedding-rose text-white border-wedding-rose'
                  : 'bg-white text-gray-600 border-wedding-dusty hover:border-wedding-rose'
              }`}
            >
              Regretfully Decline
            </button>
          </div>
        </div>

        {/* Number of Guests - only show if attending */}
        {isAttending && (
          <div className="animate-fade-in">
            <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Guests *
            </label>
            <select
              {...register('numberOfGuests', { 
                required: 'Please select number of guests',
                valueAsNumber: true 
              })}
              id="numberOfGuests"
              className="input-field"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Dietary Restrictions */}
        {isAttending && (
          <div className="animate-fade-in">
            <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Restrictions
            </label>
            <textarea
              {...register('dietaryRestrictions', {
                maxLength: { value: 500, message: 'Please keep it under 500 characters' }
              })}
              id="dietaryRestrictions"
              rows={3}
              className="input-field resize-none"
              placeholder="Any allergies or dietary requirements..."
            />
            {errors.dietaryRestrictions && (
              <p className="mt-1 text-sm text-red-500">{errors.dietaryRestrictions.message}</p>
            )}
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send RSVP
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default RsvpForm;
