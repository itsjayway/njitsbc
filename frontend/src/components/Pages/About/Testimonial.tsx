interface TestimonialProps {
    quote: string;
    author: string;
    gradYear: number;
    link?: string;
}
export default function Testimonial(
    { quote, author, gradYear, link }: TestimonialProps
) {
    return (
        <div className="">
            <blockquote className="border-l-4 border-njit-red pl-4 italic">
                {quote}
            </blockquote>
            <cite className="block text-right font-bold">
                - {author}, '{gradYear}{link && (<a href={link} target="_blank"> 🔗</a>)}
            </cite>
        </div>
    );
}