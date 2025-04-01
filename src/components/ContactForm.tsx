// src/components/ContactForm.js
// import { useForm } from '@formspree/react'

export default function ContactForm() {
  // const [state, handleSubmit] = useForm('your-formspree-id')

  return (
    <form className="space-y-6">
      <div>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-3 rounded-lg border"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Message</label>
        <textarea
          name="message"
          className="w-full p-3 rounded-lg border h-32"
          required
        />
      </div>
      <button
        type="submit"
        // disabled={state.submitting}
        className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
      >
        Send Message
      </button>
    </form>
  );
}
