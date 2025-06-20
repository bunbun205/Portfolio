'use client';

const Attributions = () => {
	return (
		<section className="py-10">
			<h2 className="text-2xl font-semibold mb-2">Attribution</h2>
			<p className="mb-4">
				If you use this project or its structure in any way, please include the following text in your credits or documentation:
			</p>
			<pre className="bg-gray-200 dark:bg-gray-800 text-sm p-4 rounded whitespace-pre-wrap overflow-x-auto">
{`Website template by Mayank Yadav (https://mayankyadav.dev)

Source code licensed under the MIT License.
Content (assets, text, artwork) © Mayank Yadav. Not for reuse without permission.`}
			</pre>
		</section>
	);
};

export default Attributions;
