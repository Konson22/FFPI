export default function TeamSection() {
    const teamMembers = [
        {
            name: 'Anok Athor Deng',
            role: 'Founder & Program Director',
            description:
                'Clinical officer by profession, innovator, and entrepreneur. Extensive knowledge in healthcare practices and family planning, with a passion for addressing reproductive health issues through innovative solutions.',
            image: '/images/teams/anok.jpeg',
            tag: 'Leadership',
            tagColor: 'bg-green-600 text-white',
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
            tagColor: 'bg-green-600 text-white',
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
            tagColor: 'bg-green-600 text-white',
            social: {
                linkedin: '#',
                twitter: '#',
            },
        },
        {
            name: 'Kon Akech',
            role: 'Full Stack Software Engineer',
            description:
                'Kon is a passionate full stack engineer who brings ideas to life through innovative, user-friendly digital solutions. He focuses on building seamless mobile and web experiences.',
            image: '/images/teams/konson.jpeg',
            tag: 'Engineering',
            tagColor: 'bg-green-600 text-white',
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
            tagColor: 'bg-green-500 text-white',
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
            tagColor: 'bg-green-600 text-white',
            social: {
                linkedin: '#',
                twitter: '#',
            },
        },
    ];

    return (
        <section className="bg-gradient-to-br from-gray-50 via-white to-green-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                        <span className="mr-2">👥</span>
                        Our Amazing Team
                    </div>
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                        Meet the
                        <span className="block bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
                            Innovators
                        </span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        A passionate team of healthcare professionals, engineers, and advocates working together to transform reproductive health
                        access across South Sudan and East Africa.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-600/5 to-green-700/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                            {/* Image Container */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Tag */}
                                <div className="absolute top-4 right-4">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${member.tagColor} backdrop-blur-sm`}
                                    >
                                        {member.tag}
                                    </span>
                                </div>

                                {/* Social Links */}
                                <div className="absolute bottom-4 left-4 flex space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a
                                        href={member.social.linkedin}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
                                    >
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={member.social.twitter}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
                                    >
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative p-6">
                                <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
                                    {member.name}
                                </h3>
                                <p className="mb-3 text-sm font-medium text-green-600">{member.role}</p>
                                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
                        <h3 className="mb-4 text-2xl font-bold drop-shadow-lg">Join Our Mission</h3>
                        <p className="mb-6 text-lg text-white/90">
                            Ready to make a difference in reproductive health? We're always looking for passionate individuals to join our team.
                        </p>
                        <button className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-green-700 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-xl">
                            View Open Positions
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
