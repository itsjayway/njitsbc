import Testimonial from "./Testimonial";

export default function About() {
    return (
        <div className="flex flex-grow flex-col md:flex-row gap-y-10 bg-gradient-to-b from-njit-navy to-njit-navy-dark text-gray-100 p-8 justify-center">
            <div className="flex flex-col gap-y-3 max-w-4xl px-10">
                <h1 className="text-4xl font-bold mb-4">About NJIT Skate Club</h1>
                <p className="text-xl">
                    The NJIT Skate Club (NJITSBC) is comprised of diverse and dedicated NJIT students and alumni who share a passion for all things skating.
                </p>
                <h2 className="text-2xl font-semibold">Club History</h2>
                <p className="text-xl">
                    Gaining official status in 2023, NJITSBC has quickly become a vibrant community for skating enthusiasts at NJIT. Some highlights of our journey include:
                </p>
                <ul className="list-disc list-inside">
                    <li>Establishing permitted, community obstacles for use on campus including a mini ramp, rails, and a box.</li>
                    <li>"Kickflip for Coins" Fundraising</li>
                    <li>Collaborating with NJIT and partner campus organizations for events</li>
                </ul>
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p className="text-xl italic">
                    Fostering a welcoming and inclusive community for skaters of all levels at NJIT to overcome obstacles (literally and figuratively), develop multifaceted skills, and cultivate a love for the sport.
                </p>
            </div>
            <div className="max-w-4xl px-10">
                <h1 className="text-4xl font-semibold mb-4">What's the Word?</h1>
                <Testimonial
                    quote="The homies hold a special place in my heart. No questions asked, anyone on campus has always been down to skate between classes and support each other. Passing through NJIT would not have been the same without them."
                    author="Jibran A."
                    gradYear={23}
                />
            </div>
        </div>
    );
}