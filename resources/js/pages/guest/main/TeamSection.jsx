export default function TeamSection() {
    const teamMembers = [
        {
            name: 'Anok Athor Deng',
            role: 'Founder & Program Director',
            description:
                'Clinical officer by profession, innovator, and entrepreneur. Extensive knowledge in healthcare practices and family planning, with a passion for addressing reproductive health issues through innovative solutions.',
            image: '/images/teams/anok.jpeg',
            tag: 'Leadership',
            tagColor: 'from-emerald-500 to-green-600',
            social: {
                linkedin: '#',
                twitter: '#',
            },
        },
        {
            name: 'Wai Micheal',
            role: 'Full Stack Software Engineer',
            description:
                "Wai is a skilled full stack engineer with a strong focus on performance, security, and scalability. He plays a key role in developing and optimizing the Family Future platform's backend and frontend systems.",
            image: '/images/teams/wai-micheal.jpg',
            tag: 'Engineering',
            tagColor: 'from-green-500 to-emerald-600',
            social: {
                linkedin: '#',
                twitter: '#',
            },
        },
        {
            name: 'Konson Ak',
            role: 'Software Engineer',
            description:
                'Kon is a passionate full stack engineer who brings ideas to life through innovative, user-friendly digital solutions. He focuses on building seamless mobile and web experiences.',
            image: '/images/teams/konson.jpeg',
            tag: 'Engineering',
            tagColor: 'from-green-600 to-emerald-700',
            social: {
                linkedin: '#',
                twitter: '#',
            },
        },
        {
            name: 'Kuena James Dak',
            role: 'Communication & Cyber Security Expert',
            description:
                'Communication, cyber security and Visibility Expert from South Sudan, combining his background in Computer Science with a passion for social impact. An alumnus of the UNITAR Great Ideas Space.',
            image: '/images/teams/kuena-james-dak.jpeg',
            tag: 'Technology',
            tagColor: 'from-emerald-600 to-green-700',
            social: {
                linkedin: '#',
                twitter: '#',
            },
        },

        {
            name: 'Masudio Gladys',
            role: 'SRHR Expert',
            description:
                "Skilled SRHR expert with over 5 years of experience in the field. Holding a Bachelor's degree in Medicine, with a focus on reproductive health, she is currently working as an SRHR expert with UNFPA.",
            image: '/images/teams/masudio-gladys.jpeg',
            tag: 'Healthcare',
            tagColor: 'from-green-500 to-emerald-600',
            social: {
                linkedin: '#',
                twitter: '#',
            },
        },
        {
            name: 'Nyadak Suzan',
            role: 'SRHR Expert',
            description:
                "Skilled SRHR expert with over 5 years of experience in the field. Holding a Bachelor's degree in Medicine, with a focus on reproductive health, she is currently working as an SRHR expert with UNFPA.",
            image: '/images/teams/agnes-juan.jpeg',
            tag: 'Healthcare',
            tagColor: 'from-emerald-500 to-green-600',
            social: {
                linkedin: '#',
                twitter: '#',
            },
        },
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50/50 py-24">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-green-100/40 to-emerald-100/40 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-green-50/60 to-emerald-50/60 blur-3xl"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-20 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3 shadow-sm">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                        <span className="text-sm font-bold text-green-700">Our Amazing Team</span>
                    </div>
                    <h2 className="mb-8 text-5xl font-black text-gray-900 sm:text-6xl lg:text-7xl">
                        Meet the
                        <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
                            Innovators
                        </span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                        A passionate team of healthcare professionals, engineers, and advocates working together to transform reproductive health
                        access across South Sudan and East Africa.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-green-600/0 opacity-0 transition-opacity duration-500 group-hover:from-green-500/5 group-hover:via-emerald-500/5 group-hover:to-green-600/5 group-hover:opacity-100"></div>

                            {/* Image Container */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                {/* Tag */}
                                <div className="absolute top-5 right-5">
                                    <span
                                        className={`inline-flex items-center rounded-full bg-gradient-to-r ${member.tagColor} px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-sm`}
                                    >
                                        {member.tag}
                                    </span>
                                </div>

                                {/* Social Links - Visible on Hover */}
                                <div className="absolute bottom-5 left-5 flex gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                    <a
                                        href={member.social.linkedin}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/30"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={member.social.twitter}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/30"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative p-8">
                                <h3 className="mb-2 text-2xl font-black text-gray-900 transition-colors duration-300 group-hover:text-green-600">
                                    {member.name}
                                </h3>
                                <p className="mb-4 text-base font-bold text-green-600">{member.role}</p>
                                <p className="line-clamp-3 text-base leading-relaxed text-gray-600">{member.description}</p>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-green-100/50 transition-transform duration-500 group-hover:scale-150"></div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="group relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 p-12 text-white shadow-2xl">
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        
                        <div className="relative z-10">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span className="text-sm font-bold text-white">Join Our Team</span>
                            </div>
                            
                            <h3 className="mb-6 text-4xl font-black text-white">Join Our Mission</h3>
                            <p className="mb-10 text-xl leading-relaxed text-white/95">
                                Ready to make a difference in reproductive health? We're always looking for passionate individuals to join our team.
                            </p>
                            
                            <button className="group/btn relative overflow-hidden rounded-2xl bg-white px-10 py-5 text-lg font-bold text-green-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)]">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    View Open Positions
                                    <svg className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-100 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
