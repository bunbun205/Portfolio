import React from 'react'

export default function ContactForm() {
  return (
    <form className='space-y-4'>
	<input
		type='text'
		placeholder='Your Name'
		className='w-full p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text'
	/>
	<input
		type='email'
		placeholder='Your Email'
		className='w-full p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text'
	/>
	<input
		type='text'
		placeholder='Your Message'
		className='w-full h-25 p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text'
	/>

	<button type='submit' className='bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text px-4 py-2 rounded'>
		Send Message
	</button>
    </form>
  );
};