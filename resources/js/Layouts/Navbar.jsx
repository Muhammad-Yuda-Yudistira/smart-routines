import { Link } from "@inertiajs/react";

export default function Navbar({user}) {
    console.log('user:', user)
    return (
        <div className="navbar bg-dark text-secondary-content shadow-2xl shadow-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            // xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Guides</a>
                        </li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li>
                                    <a>Submenu 1</a>
                                </li>
                                <li>
                                    <a>Submenu 2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a>Item 3</a>
                        </li>
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl" href={route('homepage')}>
                    Smart Routines
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href={route('guides.index')}>Guides</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    {user ? (<li>
                                <Link href={route('dashboard')}>Dashboard</Link>
                            </li>)
                    :
                    (<>
                        <li>
                            <Link href="/login" as="button">Login</Link>
                        </li>
                        <li>
                            <Link href="/register" as="button">Register</Link>
                        </li>
                    </>)}
                </ul>
            </div>
        </div>
    );
}
