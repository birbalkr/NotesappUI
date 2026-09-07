import { useEffect, useState } from "react";
import authHook from "../hook/authHook";
import { profile } from "../api/authApi";
import NoteNavbar from "../notes/components/NoteNavbar";
import { getAllNotes } from "../api/notesApi";
import { Outlet } from "react-router";
import NotesPage from "../notes/page/NotesPage";
import notesHooks from "../hook/notesHooks";
import { isAuthenticated } from "../utils/authUtils";

function AppPageLayout() {
    const [user, setUser] = useState<any>(null);
    const [notes, setNotes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setLoadData, loadData } = notesHooks()

    const { navigate } = authHook();

    const apiData = async () => {
        // Check if user is authenticated
        if (!isAuthenticated()) {
            navigate("/auth/login");
            return;
        }

        try {
            const [notesResponse, profileResponse] = await Promise.all([
                getAllNotes(),
                profile()
            ]);
            
            console.log("all notes ", notesResponse.notes);
            setNotes(notesResponse.notes || []);

            setUser(profileResponse.data.user || profileResponse.user);

        } catch (error: any) {
            console.error("Error fetching data:", error);
            if (error.response?.status === 401) {
                navigate("/auth/login");
            }
        } finally {
            setIsLoading(false);
            setLoadData(false);
        }
    }
    useEffect(() => {
        apiData();
    }, [loadData]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
                    <p className="text-gray-600">Loading your notes...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NoteNavbar user={user} setLoadData={setLoadData} />
            <div className="mx-auto max-w-7xl p-6">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    My Notes
                </h1>
                <NotesPage notes={notes} setLoadData={setLoadData} />
            </div>
            <Outlet />
        </div>

    );
}

export default AppPageLayout;

