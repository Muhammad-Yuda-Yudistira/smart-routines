import { Link, Head } from "@inertiajs/react";
import List from "@/Components/Routines/List";

export default function Routines() {
    return (
        <>
            <Head title="Routines" />
            <div className="container text-center m-10 mx-16 w-full box-border">
                <div className="title-box mb-10">
                    <h1 className="text-5xl">Your Routines</h1>
                    <p>thrusday, 26 oktober 2023</p>
                </div>
                <List />
            </div>
        </>
    );
}
