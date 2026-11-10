"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RealtimeListener() {
  const router = useRouter();

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = () => {
      // Instantly refresh server data upon receiving a hub signal
      router.refresh();
    };

    return () => {
      eventSource.close();
    };
  }, [router]);

  return null;
}