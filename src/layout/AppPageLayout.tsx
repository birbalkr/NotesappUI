import { useEffect, useState } from "react";
import authHook from "../hook/authHook";
import { profile } from "../api/authApi";
import NoteNavbar from "../notes/components/NoteNavbar";
import { getAllNotes } from "../api/notesApi";
import { Outlet } from "react-router";
import NotesPage from "../notes/page/NotesPage";
import notesHooks from "../hook/notesHooks";

function AppPageLayout() {
    const [user, setUser] = useState<any>(null);
    const [notes, setNotes] = useState<any[]>([]);
    const { setLoadData, loadData } = notesHooks()

    const { navigate } = authHook();

    const apiData = async () => {

        try {
            const notesResponse = await getAllNotes();
            setNotes(notesResponse.notes);

            const profileResponse = await profile();
            setUser(profileResponse.data.user);

        } catch (error) {
            console.error("Error fetching data:", error);
            navigate("/auth/login");
        } finally {
            setLoadData(false);
        }
    }
    useEffect(() => {
        apiData();
    }, [loadData]);

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

