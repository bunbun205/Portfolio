import React, { useState } from 'react'

function CommissionsForm() {
	const[packageType, setPackageType] = useState("basic");

  return (
    <form className='space-y-4'>
	<select
		className='w-full p-2 rounded bg-dark-background dark:bg-light-background text-dark-text dark:text-light-text'
		value={packageType}
		onChange={(e) => setPackageType(e.target.value) }
	>
		<option value="basic">Basic ($50)</option>
		<option value="premium">Premium ($100)</option>
		<option value="ultimate">Ultimate ($200)</option>
	</select>

	<input
		type='text'
		placeholder='Your Name'
		className='w-full p-2 rounded bg-dark-background dark:bg-light-background text-dark-text dark:text-light-text'
	/>

	<input
		type='email'
		placeholder='Your Email'
		className='w-full p-2 rounded bg-dark-background dark:bg-light-background text-dark-text dark:text-light-text'
	/>

	<button
		type='button'
		className='bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text px-4 py-2 rounded'
		onClick={() => alert("Redirect to payment page or backend")}>
			Proceed to Payment
	</button>
    </form>
  )
}

export default CommissionsForm