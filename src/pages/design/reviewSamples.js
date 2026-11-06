// DESIGN FIXTURES ONLY. Imported solely by the development-only route.
// User-provided names and copy following a request for fictional testimonials.
// Not evidence of the named people's actual experience or approval.
const copy = [
  ['Sarah Mitchell', 'Communication', 'A smooth process', 'Working with Hanova Devs was a great experience. Their team understood our requirements, communicated clearly, and made the entire development process smooth and professional.'],
  ['Daniel Roberts', 'Communication', 'Ready to help', 'What impressed me most about Hanova Devs was their responsiveness. Whenever we had a question or requested an adjustment, their team was available and ready to help.'],
  ['Ahmed Farooq', 'Partnership', 'A partnership mindset', 'Hanova Devs approaches every project like a genuine business partnership rather than just another development contract. Their dedication and professionalism really stand out.'],
  ['Emily Carter', 'Communication', 'Informed at every stage', 'Excellent communication throughout the project. The team kept us informed, listened carefully to our feedback, and made sure we were comfortable with every decision.'],
  ['Michael Anderson', 'Partnership', 'A technology partner', 'We were looking for a reliable technology partner, and Hanova Devs demonstrated exactly the kind of commitment and technical understanding we needed.'],
  ['Ayesha Malik', 'Collaboration', 'Understanding the business', 'Their ability to understand business challenges and translate them into practical digital solutions is impressive. A professional and cooperative team.'],
  ['James Wilson', 'Collaboration', 'Feedback taken seriously', 'One of the best things about working with Hanova Devs is how seriously they take client feedback. They are patient, attentive, and always willing to discuss improvements.'],
  ['Olivia Bennett', 'Communication', 'An open process', 'A very positive collaboration. The team was transparent about the development process and maintained consistent communication from the beginning.'],
  ['Hassan Raza', 'Partnership', 'Trust and communication', 'Hanova Devs understands that strong partnerships are built on trust and communication. They were professional, approachable, and committed to delivering quality work.'],
  ['Sophia Reynolds', 'Communication', 'Technical ideas made clear', 'From our first discussion, their team was organized and responsive. They made technical conversations easy to understand and genuinely valued our input.'],
  ['William Thompson', 'Collaboration', 'Beyond the task list', 'I appreciated their attention to detail and willingness to explore different solutions. They focused on understanding our actual business needs rather than simply completing tasks.'],
  ['Fatima Noor', 'Collaboration', 'Easy to work together', 'The team at Hanova Devs is friendly, knowledgeable, and easy to collaborate with. Their communication style makes working together comfortable and productive.'],
  ['Christopher Evans', 'Partnership', 'A sense of responsibility', 'Hanova Devs showed a strong sense of responsibility during our collaboration. Their professional attitude and commitment to maintaining a good working relationship were impressive.'],
  ['Zain Abdullah', 'Collaboration', 'Involved throughout', 'Very cooperative team with a modern approach to software development. They actively listen to suggestions and make clients feel involved throughout the process.'],
  ['Isabella Martinez', 'Collaboration', 'Flexible and focused', 'What stood out was their flexibility and client-focused attitude. They took the time to understand our expectations and communicated their recommendations clearly.'],
  ['Ethan Parker', 'Communication', 'Approachable and professional', 'Good communication can make a huge difference in any development project, and Hanova Devs understands that. Their team was approachable, professional, and easy to work with.'],
  ['Noor Ahmed', 'Partnership', 'A productive relationship', 'I really appreciated how they handled discussions and feedback. They were respectful, responsive, and genuinely interested in building a productive long-term relationship.'],
  ['Benjamin Clarke', 'Partnership', 'Technology meets business', 'Hanova Devs brings a refreshing combination of technical knowledge and business understanding. Their collaborative approach makes them a promising technology partner.'],
  ['Rachel Adams', 'Partnership', 'An extension of the team', 'The experience felt more like working with an extension of our own team. Their willingness to communicate, collaborate, and consider different perspectives made the process enjoyable.'],
  ['David Harrison', 'Partnership', 'Partnership at the centre', 'Professionalism, consistent communication, and a strong commitment to client satisfaction are what define Hanova Devs. Their partnership-oriented approach is something businesses can truly value.'],
]

export const reviewSamples = copy.map(([author, category, title, quote], index) => ({
  id: `sample-${String(index + 1).padStart(2, '0')}`,
  author,
  role: 'Unverified draft attribution',
  company: '',
  category, title, quote,
  tone: ['mint', 'ivory', 'navy'][index % 3],
  sample: true,
  approvedForPublication: false,
}))
