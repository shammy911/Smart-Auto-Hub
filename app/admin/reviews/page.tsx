"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus,
    Video,
    ExternalLink,
    Edit,
    Trash2,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
    getVideoReviews,
    addVideoReview,
    deleteVideoReview,
} from "@/app/actions/videoActions";
import { toast } from "sonner";

export default function VideoReviewsPage() {
    const [videoReviews, setVideoReviews] = useState<any[]>([]);
    const [newVideo, setNewVideo] = useState({
        title: "",
        description: "",
        videoId: "",
    });
    const [deleteVideoId, setDeleteVideoId] = useState<string | number | null>(null);

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            const result = await getVideoReviews();
            if (result.success) {
                setVideoReviews(result.data);
            }
        } catch (error) {
            console.error("Failed to load videos", error);
        }
    };

    const handleAddVideo = async () => {
        // Basic Validation
        if (!newVideo.title || !newVideo.videoId) {
            toast.error("Please fill in Title and VideoId");
            return;
        }

        // Call the server action
        const result = await addVideoReview(newVideo);

        if (result.success) {
            toast.success("Video Review added successfully");
            setNewVideo({ title: "", description: "", videoId: "" }); // Resets form
            loadVideos();
        } else {
            toast.error("Failed to add video");
        }
    };

    const handleDeleteVideo = async (videoId: string | number) => {
        const result = await deleteVideoReview(videoId);

        if (result.success) {
            toast.success("Video review removed from homepage");
            loadVideos(); // Refreshes the List
        } else {
            toast.error("Failed to remove the video");
        }
        setDeleteVideoId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">
                        Video Reviews Management
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage YouTube video reviews displayed on homepage
                    </p>
                </div>
            </div>

            {/* Add New Video Form */}
            <div className="bg-secondary/30 rounded-lg border border-border p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Add New Video Review</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                            Video Title
                        </label>
                        <Input
                            placeholder="e.g., 2023 Toyota Camry Full Review"
                            value={newVideo.title}
                            onChange={(e) =>
                                setNewVideo({ ...newVideo, title: e.target.value })
                            }
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            className="w-full px-4 py-2 rounded bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                            placeholder="Brief description of the video content..."
                            value={newVideo.description}
                            onChange={(e) =>
                                setNewVideo({
                                    ...newVideo,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            YouTube Video ID
                        </label>
                        <Input
                            placeholder="e.g., dQw4w9WgXcQ"
                            value={newVideo.videoId}
                            onChange={(e) =>
                                setNewVideo({ ...newVideo, videoId: e.target.value })
                            }
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Find this in the YouTube URL: youtube.com/watch?v=
                            <strong>VIDEO_ID</strong>
                        </p>
                    </div>
                    <div className="flex items-end">
                        <Button className="w-full" onClick={handleAddVideo}>
                            <Plus size={18} className="mr-2" />
                            Add Video
                        </Button>
                    </div>
                </div>
            </div>

            {/* Existing Videos List */}
            <div className="space-y-4">
                <h3 className="font-bold text-lg">
                    Published Videos ({videoReviews.length})
                </h3>
                {videoReviews.length === 0 ? (
                    <p className="text-muted-foreground">No videos published yet.</p>
                ) : (
                    videoReviews.map((video) => (
                        <div
                            key={video.id}
                            className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-secondary/30 transition"
                        >
                            <div className="relative h-24 w-40 flex-shrink-0 bg-secondary rounded overflow-hidden group">
                                <img
                                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Video size={24} className="text-white" />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-semibold text-base mb-1">
                                    {video.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                    {video.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>Uploaded: {video.uploadDate}</span>
                                    <span>{video.views} views</span>
                                    <span>ID: {video.videoId}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                        window.open(
                                            `https://www.youtube.com/watch?v=${video.videoId}`,
                                            "_blank",
                                        )
                                    }
                                >
                                    <ExternalLink size={16} />
                                </Button>
                                <Button size="sm" variant="ghost">
                                    <Edit size={16} />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Remove Video</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to remove this video from
                                                the homepage? This cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <div className="flex justify-end gap-3">
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDeleteVideo(video.id)}
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                Remove
                                            </AlertDialogAction>
                                        </div>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
