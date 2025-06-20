'use client';

const TermsOfReuse = () => {
	return (
		<section className="py-10">
			<h2 className="text-2xl font-semibold mb-2">Terms of Reuse</h2>
			<p className="mb-2">
				You are permitted to use this website’s structure, layout, and codebase as a template for personal or commercial projects under the terms of the MIT license.
			</p>
			<p className="mb-2 font-semibold">You are <span className="text-red-600">not</span> permitted to reuse or redistribute the following:</p>
			<ul className="list-disc ml-6 mb-4">
				<li>3D models and environment art</li>
				<li>Character and hard-surface models</li>
				<li>Renderings and visual assets</li>
				<li>Written content, descriptions, and branding</li>
			</ul>
			<p className="mb-2">
				Reuse of any content not explicitly marked as public domain or externally licensed (e.g., via Creative Commons) is strictly prohibited without written permission.
			</p>
			<p>
				Exceptions apply only to publicly licensed assets which have been clearly credited or noted in the attribution section below.
			</p>
		</section>
	);
};

export default TermsOfReuse;
