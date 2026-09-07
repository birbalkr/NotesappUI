import notesHooks from "../../hook/notesHooks";

function NotesPage({ notes, setLoadData }: any) {
    const { deleteNotes } = notesHooks();
    return (
        <div >
            {notes?.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
                    <p className="text-gray-500">
                        No notes found.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {notes?.map((note: any) => (
                        <div
                            key={note._id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-3 flex items-start justify-between gap-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {note.title}
                                </h2>

                                <button className="text-gray-400 hover:text-red-500" onClick={() => { deleteNotes(note._id); setLoadData(true) }}>
                                    🗑️
                                </button>
                            </div>

                            <p className="mb-5 text-sm leading-6 text-gray-600">
                                {note.description}
                            </p>

                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-xs text-gray-400">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default NotesPage;
