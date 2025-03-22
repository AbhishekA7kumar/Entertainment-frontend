/**
 * All 500 responses should be diverted to this page.
 */
export function InternalServerError() {
    return (
        <div className="bg-black">
            <div className="flex flex-col justify-center items-center h-screen">
                <img 
                    src="/8488196.webp" 
                    alt="An animation illustrating a server error" 
                    className="w-[350px] mt-2"
                />

                {/* Text content */}
                <div className="text-white text-2xl p-8 rounded-lg text-center">
                    <p className="text-xl mt-4 font-bold">Give it another shot shortly!</p>
                </div>
            </div>
        </div>
    );
}
