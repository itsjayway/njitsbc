export default function Footer() {
    return <footer className="flex items-center justify-center bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-800 h-[20.23vh]">
        <p>
            © {new Date().getFullYear()} NJIT Skateboard Club. All rights
            reserved.
        </p>
    </footer>
}