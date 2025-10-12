import wip from "../../assets/images/wip.png";

export default function Spots() {
    return <div className="flex flex-col font-black justify-around items-center flex-grow bg-gray-800 text-4xl text-white">
        <h1 className="">Setting up...</h1>
        <img src={wip} alt="Work in Progress" />
        <h1 className="">Come back soon!</h1>
        </div>;
}