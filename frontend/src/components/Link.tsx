import { useNavigate } from "react-router-dom";
interface LinkProps {
    path: string;
    children: React.ReactNode;
}
export default function Link({ path, children }: LinkProps) {
    const navigate = useNavigate();
    return (<a
        className="text-2xl font-bold cursor-pointer hover:text-njit-red"
        href={path} onClick={(e) => {
        e.preventDefault();
        navigate(path);
    }}>{children}</a>);
}