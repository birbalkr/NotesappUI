import { useState } from "react";
import notesHooks from "../../hook/notesHooks";
import { createNoteAPi } from "../../api/notesApi";
import { logoutApi } from "../../api/authApi";

function NoteNavbar({ user, setLoadData }: any) {
    const { navigate, register, reset, handleSubmit } = notesHooks();

    const [showAddNote, setShowAddNote] = useState(false);
    console.log("user = ",user);
    

    const handleLogout = async () => {
        try {
            await logoutApi()
            navigate("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleAddNote = (data: any) => {
        const { title, description } = data;


        createNoteAPi({ title, description })
            .then((response) => {
                console.log("Note created successfully:", response);
            }).catch((error) => {
                console.error("Note creation failed:", error);
            })


        console.log("title -- >", title);

        reset();



        setLoadData(true);

        setShowAddNote(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    {/* Logo */}
                    <div
                        onClick={() => navigate("/notes")}
                        className="cursor-pointer text-xl font-bold text-gray-900"
                    >
                        NoteApp
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {/* Add Notes */}
                        <button
                            onClick={() => setShowAddNote(true)}
                            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            + Add Note
                        </button>

                        {/* Profile */}
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.profileImg || "https://i.pravatar.cc/100?img=12"}
                                // alt={user.name}
                                className="h-9 w-9 rounded-full object-cover"
                            />

                            <span className="text-sm font-medium text-gray-800">
                                {user?.name || "Guest"}
                            </span>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Add Note Dialog */}
            {showAddNote && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowAddNote(false)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Add New Note
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Create a new note for your collection.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowAddNote(false)}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(handleAddNote)}
                            className="space-y-4"
                        >
                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Title
                                </label>

                                <input
                                    {...register("title", { required: "Title is required" })}
                                    type="text"
                                    placeholder="Enter note title"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Note
                                </label>

                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    placeholder="Write your note..."
                                    rows={5}
                                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                                    required

                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddNote(false)}
                                    className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                                >
                                    Add Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default NoteNavbar;
