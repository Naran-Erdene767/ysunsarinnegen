import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [Grid, setGrid] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch("https://api.polygon.io/v3/reference/dividends?apiKey=op25iGbHJFANOmS0e0DYJxVyRJd_XOhn");
                const result = await response.json();
                setData(result);
                setLoading(false);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const filteredData = data?.results?.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    ) || [];
    const router = useRouter();
    const Back = () => {
      router.push("/semester-4/lab-1");
    };
    return (
        <div className='min-h-screen w-full p-8'>
            <button
        onClick={Back}
        className="mt-8 h-16 w-36 cursor-pointer bg-indigo-600 text-white font-semibold rounded-lg shadow-xl hover:bg-indigo-700 transform transition duration-300 ease-in-out mb-6"
      >
        Go Back
      </button>
            <div className="flex items-center gap-4 mb-6 ml-4">
                <input
                    type="text"
                    placeholder="Search clothes..."
                    className="p-2 border border-gray-300 rounded w-96"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={() => setGrid(prev => !prev)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Grid
                </button>
            </div>

            <div
                className={`transition-all duration-300 w-full
        ${Grid
            ? 'flex flex-col gap-4 overflow-x-auto'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}
                `}
            >
                {loading ? (
                    <div className={`${inter.className} text-xl text-gray-400`}>
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="text-xl text-center text-gray-500">
                        No match
                    </div>
                ) : (
                    filteredData.map((item) => (
                        <div
                            key={item.id}
                            className={`
                                bg-purple-800 p-4 rounded-lg flex
                                ${Grid ? 'flex-row w-full h-40' : 'flex-col w-full h-96'}
                                justify-start items-center gap-4
                            `}
                        >
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                width={Grid ? 80 : 120}
                                height={Grid ? 80 : 120}
                                className="rounded-lg"
                            />
                            <div className="text-center md:text-left">
                                <h2 className={`${inter.className} ${Grid ? 'text-xl' : 'text-2xl'} text-white`}>
                                    {item.name}
                                </h2>
                                <p className={`${inter.className} text-white mt-2`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}