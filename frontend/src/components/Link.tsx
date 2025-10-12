import { useNavigate } from "react-router-dom";
import classes from "../utils/classes";
interface LinkProps {
    path: string;
    className?: string;
    children: React.ReactNode;
}
export default function Link({ path, className, children }: LinkProps) {
    const navigate = useNavigate();
    return (<a
        className={classes("text-2xl font-bold cursor-pointer",
            className
        )}
        href={path} onClick={(e) => {
            e.preventDefault();
            navigate(path);
        }}>{children}</a>);
}