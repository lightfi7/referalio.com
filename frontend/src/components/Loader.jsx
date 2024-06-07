import { Logo } from "./Logo";

const Loader = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-white relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-cyan-500 border-t-transparent absolute"></div>
        </div >
    );
};

export default Loader;