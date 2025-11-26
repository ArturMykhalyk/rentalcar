'use client';

import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import toast, { Toaster } from 'react-hot-toast';

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: undefined as Date | undefined,
    comment: '',
  });

  const [openCalendar, setOpenCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Your car has been successfully booked!');
      setForm({ name: '', email: '', date: undefined, comment: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-light rounded-[10px] p-8 w-full bg-white relative">
      <h3 className="text-xl text-start font-semibold mb-2">Book your car now</h3>
      <p className="text-base text-start text-gray mb-6">
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={form.name}
          onChange={handleChange}
          className="bg-inputs px-5 py-2.5 text-gray rounded-xl focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
          className="bg-inputs px-5 py-2.5 text-gray rounded-xl focus:outline-none"
        />

        {/* Календар */}
        <div className="relative">
          <input
            readOnly
            onClick={() => setOpenCalendar(!openCalendar)}
            placeholder="Booking date"
            value={form.date ? format(form.date, 'MMMM d, yyyy') : ''}
            className="bg-inputs px-5 py-2.5 text-gray rounded-xl w-full focus:outline-none cursor-pointer"
          />
          {openCalendar && (
            <div className="absolute z-50 mt-2 left-20 rounded-lg border bg-white">
              <DayPicker
                mode="single"
                locale={enGB}
                navLayout="around"
                selected={form.date}
                onSelect={(selectedDate) => {
                  setForm((prev) => ({ ...prev, date: selectedDate }));
                  setOpenCalendar(false);
                }}
                classNames={{
                  today: `text-button font-semibold `,
                  selected: `bg-button rounded-full text-white`,
                }}
              />
            </div>
          )}
        </div>

        <textarea
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
          className="bg-inputs text-gray px-5 py-2.5 rounded-xl  leading-tight focus:outline-none resize-none "
          rows={3}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-button hover:bg-button-hover disabled:opacity-60 w-39 mx-auto text-base mt-2  cursor-pointer text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
