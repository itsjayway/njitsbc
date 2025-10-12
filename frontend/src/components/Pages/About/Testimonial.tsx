interface TestimonialProps {
    quote: string;
    author: string;
    gradYear: number;
}
export default function Testimonial(
    { quote, author, gradYear }: TestimonialProps
) {
    return (
        <div className="space-y-4">
            <blockquote className="border-l-4 border-njit-red pl-4 italic">
                {quote}
            </blockquote>
            <cite className="block text-right font-bold">
                - {author}, '{gradYear}
            </cite>
        </div>
    );
}