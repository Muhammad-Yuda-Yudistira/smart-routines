import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, routines }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="menu-title">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-second overflow-hidden shadow-sm sm:rounded-lg h-96 flex items-center justify-center">
                        <p className="text-center text-8xl text-main">Welcome Back</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
